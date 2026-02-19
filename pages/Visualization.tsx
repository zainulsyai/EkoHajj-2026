
import React, { useMemo, useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceLine } from 'recharts';
import { useData } from '../contexts/DataContext';
import { PieChart as PieIcon, TrendingUp, Info, BarChart3, MapPin, Activity, Radio, Calendar, Filter, ChevronDown, Check, ShoppingCart } from 'lucide-react';
import { ChartSkeleton, PieSkeleton } from '../components/Skeletons';
import { HeroSection } from '../components/HeroSection';

export const Visualization: React.FC = () => {
    const { bumbuMakkah, bumbuMadinah, telecomActive, telecomData, expeditionData, tenantData, riceData, isLoading } = useData();
    const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    // Filter State: Time based
    const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Helper to simulate data scaling
    const getMultiplier = () => {
        switch (timeFilter) {
            case 'today': return 0.05;
            case 'week': return 0.25;
            case 'month': return 0.8;
            default: return 1;
        }
    };
    const multiplier = getMultiplier();

    // --- COLOR PALETTE ---
    const COLORS = {
        primary: '#064E3B',    // Emerald Dark
        primaryLight: '#10B981', // Emerald
        accent: '#D4AF37',     // Gold
        accentLight: '#FBBF24', // Amber
        secondary: '#0F766E',  // Teal
        neutral: '#9CA3AF',    // Gray
        danger: '#EF4444'      // Red
    };

    const PIE_COLORS = [COLORS.primary, COLORS.accent, COLORS.secondary, '#1E40AF', '#B91C1C'];

    const filterLabel = {
        all: 'Semua Data',
        today: 'Hari Ini',
        week: '1 Minggu',
        month: '1 Bulan'
    };

    // --- DATA PREPARATION ---

    // 1. Price Comparison & Average - Adjusted for Time Context
    const dataPriceComparison = useMemo(() => {
        const common = bumbuMakkah.filter(i => i.isUsed).slice(0, 6).map(makkahItem => {
            const madinahItem = bumbuMadinah.find(m => m.name === makkahItem.name);
            const fluctuation = timeFilter === 'today' ? 0.95 : timeFilter === 'week' ? 1.02 : 1;
            
            const makkahPrice = (parseFloat(makkahItem.price) || 0) * fluctuation;
            const madinahPrice = (madinahItem ? (parseFloat(madinahItem.price) || 0) : 0) * fluctuation;

            return {
                name: makkahItem.name.replace('Bumbu ', ''),
                makkah: makkahPrice,
                madinah: madinahPrice,
                avg: (makkahPrice + madinahPrice) / 2
            };
        });
        return common;
    }, [bumbuMakkah, bumbuMadinah, timeFilter]);

    // 2. Telecom Share (Donut Data)
    const dataTelcoShare = useMemo(() => {
        return telecomData.map((item, index) => ({
            name: item.providerName,
            value: (Math.random() * 100 * multiplier), // Mock value if not tracked
            color: PIE_COLORS[index % PIE_COLORS.length]
        })).filter(i => i.value > 0);
    }, [telecomData, multiplier]);

    // 3. Expedition Trend (Area Chart)
    const dataExpeditionTrend = useMemo(() => {
        return expeditionData.map((item, i) => ({
            name: item.companyName.split(' ')[0],
            berat: Math.floor((parseFloat(item.weight) || 0) * multiplier),
            biaya: parseFloat(item.pricePerKg) || 0
        }));
    }, [expeditionData, multiplier]);

    // 4. Tenant Revenue (Radar)
    const dataHotelRevenue = useMemo(() => {
         const categories: Record<string, number> = {};
         tenantData.forEach(t => {
             const cat = t.productType || 'Lainnya';
             const val = (parseFloat(t.rentCost) || 0) * multiplier;
             categories[cat] = (categories[cat] || 0) + val;
         });
         return Object.keys(categories).map(key => ({
             subject: key,
             revenue: categories[key],
             fullMark: Math.max(...Object.values(categories)) * 1.2
         }));
    }, [tenantData, multiplier]);

    // 5. Rice Price Comparison (New)
    const dataRicePrice = useMemo(() => {
        return riceData.filter(r => r.isUsed && r.companyName).map(r => ({
            name: r.companyName,
            price: parseFloat(r.price) || 0,
            origin: parseFloat(r.productPrice) || 0
        }));
    }, [riceData]);

    // --- CUSTOM COMPONENTS ---

    const CustomTooltip = ({ active, payload, label, unit = '' }: any) => {
        if (active && payload && payload.length) {
            return (
            <div className="bg-white/90 backdrop-blur-xl border border-white/60 p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] text-xs z-50 min-w-[160px]">
                {label && <p className="font-bold text-[#064E3B] mb-3 font-playfair border-b border-gray-100 pb-2">{label}</p>}
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between gap-4 mb-2 last:mb-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full shadow-sm ring-1 ring-white" style={{ backgroundColor: entry.color || entry.fill }}></div>
                            <span className="font-semibold text-gray-600 capitalize">{entry.name}</span>
                        </div>
                        <span className="font-bold text-gray-800 tabular-nums">
                            {entry.value.toLocaleString()} <span className="text-[10px] text-gray-400 font-medium ml-0.5">{unit}</span>
                        </span>
                    </div>
                ))}
            </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 animate-fade-in-up pb-10">
            {/* HERO SECTION */}
            <HeroSection
                title={<span>Analisis <span className="text-[#D4AF37]">Tren & Statistik</span></span>}
                subtitle="Visualisasi mendalam mengenai performa ekosistem haji, distribusi layanan, dan pergerakan harga 2026."
                currentDate={currentDate}
            >
                {/* Time Filter Toggle */}
                <div className="relative">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white font-bold text-[10px] hover:bg-white/20 transition-all min-w-[140px] justify-between shadow-lg shadow-black/5"
                    >
                        <div className="flex items-center gap-2">
                            <div className="p-1 bg-[#D4AF37]/20 rounded-md">
                                <Filter size={12} className="text-[#D4AF37]" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[8px] text-emerald-100/70 font-normal uppercase tracking-wider leading-none mb-0.5">Filter Waktu</span>
                                <span className="leading-none">{filterLabel[timeFilter]}</span>
                            </div>
                        </div>
                        <ChevronDown size={14} className={`text-emerald-200 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isFilterOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-white/40 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-up origin-top-left">
                            <div className="p-1">
                                {(['all', 'today', 'week', 'month'] as const).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setTimeFilter(key);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-between group
                                            ${timeFilter === key 
                                                ? 'bg-[#064E3B]/5 text-[#064E3B]' 
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-[#064E3B]'}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {timeFilter === key ? <Check size={12} className="text-[#D4AF37]" /> : <span className="w-3"></span>}
                                            {filterLabel[key]}
                                        </span>
                                        {timeFilter === key && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 h-full min-h-[38px]">
                    <div className="text-right">
                        <p className="text-[8px] text-emerald-100 uppercase tracking-wide">Status Data</p>
                        <p className="text-[10px] font-bold text-white leading-none">Live Monitoring</p>
                    </div>
                    <div className="relative w-2 h-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                </div>
            </HeroSection>

            {/* CHART ROW 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. COMPARISON CHART (Bar) */}
                <div className="lg:col-span-2">
                    <GlassCard 
                        title="Komparasi Harga Bumbu" 
                        subtitle={`Rata-rata Harga Pasar (SAR) - ${timeFilter === 'all' ? 'Periode 2026' : timeFilter}`} 
                        className="!bg-white/70 h-full min-h-[400px]"
                        action={<div className="p-2 bg-emerald-50 rounded-lg text-emerald-700"><BarChart3 size={18}/></div>}
                    >
                        <div className="h-[350px] mt-4 w-full">
                             {isLoading ? <ChartSkeleton /> : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dataPriceComparison} margin={{ top: 20, right: 30, left: 10, bottom: 5 }} barGap={2}>
                                        <defs>
                                            <linearGradient id="gradMakkah" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={COLORS.primary} stopOpacity={1}/>
                                                <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0.7}/>
                                            </linearGradient>
                                            <linearGradient id="gradMadinah" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={COLORS.accent} stopOpacity={1}/>
                                                <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0.7}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                        <XAxis dataKey="name" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} dy={10} fontWeight={500} />
                                        <YAxis fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                                        <Tooltip cursor={{fill: '#F3F4F6', radius: 8}} content={<CustomTooltip unit="SAR" />} />
                                        <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                                        
                                        <Bar dataKey="makkah" name="Makkah" fill="url(#gradMakkah)" radius={[6, 6, 0, 0]} barSize={24} />
                                        <Bar dataKey="madinah" name="Madinah" fill="url(#gradMadinah)" radius={[6, 6, 0, 0]} barSize={24} />
                                    </BarChart>
                                </ResponsiveContainer>
                             )}
                        </div>
                    </GlassCard>
                </div>

                {/* 2. DONUT CHART (Telco) */}
                <div className="lg:col-span-1">
                    <GlassCard 
                        title="Market Share Telco" 
                        subtitle="Estimasi Pengguna Aktif" 
                        className="!bg-white/70 h-full min-h-[400px]"
                        action={<div className="p-2 bg-blue-50 rounded-lg text-blue-700"><Radio size={18}/></div>}
                    >
                        <div className="h-[350px] mt-4 relative flex items-center justify-center">
                            {isLoading ? <PieSkeleton /> : (
                                <>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie 
                                                data={dataTelcoShare} 
                                                cx="50%" 
                                                cy="50%" 
                                                innerRadius={80} 
                                                outerRadius={110} 
                                                paddingAngle={5} 
                                                dataKey="value"
                                                cornerRadius={8}
                                                stroke="none"
                                            >
                                                {dataTelcoShare.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{fontSize: '11px', fontWeight: 600}} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                        <span className="text-4xl font-bold text-[#064E3B] font-playfair">{dataTelcoShare.length}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Provider</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* CHART ROW 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 3. Rice Price Comparison */}
                <GlassCard 
                    title="Harga Beras Premium" 
                    subtitle="Perbandingan Harga per Perusahaan (SAR)" 
                    className="!bg-white/70 min-h-[400px]"
                    action={<div className="p-2 bg-green-50 rounded-lg text-green-700"><ShoppingCart size={18}/></div>}
                >
                    <div className="h-[320px] mt-6">
                        {isLoading ? <ChartSkeleton /> : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dataRicePrice} margin={{ top: 20, right: 30, left: 10, bottom: 5 }} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                    <XAxis type="number" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                                    <YAxis dataKey="name" type="category" width={100} fontSize={10} stroke="#6B7280" tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{fill: '#F3F4F6'}} content={<CustomTooltip unit="SAR" />} />
                                    <Bar dataKey="price" name="Harga Jual" fill={COLORS.primary} radius={[0, 4, 4, 0]} barSize={12} />
                                    <Bar dataKey="origin" name="Harga Asal" fill={COLORS.neutral} radius={[0, 4, 4, 0]} barSize={12} />
                                    <Legend iconType="circle" />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </GlassCard>

                {/* 4. RADAR CHART (Tenant) */}
                <GlassCard 
                    title="Distribusi Revenue Tenant" 
                    subtitle={`Analisis Pendapatan (SAR) - ${timeFilter === 'all' ? 'Total' : timeFilter}`} 
                    className="!bg-white/70 min-h-[400px]"
                    action={<div className="p-2 bg-purple-50 rounded-lg text-purple-700"><TrendingUp size={18}/></div>}
                >
                    <div className="h-[320px] mt-6">
                        {isLoading ? <PieSkeleton /> : (
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataHotelRevenue}>
                                    <PolarGrid stroke="#E5E7EB" strokeDasharray="4 4" />
                                    <PolarAngleAxis dataKey="subject" fontSize={11} tick={{ fill: '#4B5563', fontWeight: 'bold' }} />
                                    <PolarRadiusAxis angle={30} stroke="none" />
                                    <Radar 
                                        name="Revenue (SAR)" 
                                        dataKey="revenue" 
                                        stroke={COLORS.secondary} 
                                        strokeWidth={3} 
                                        fill={COLORS.secondary} 
                                        fillOpacity={0.3} 
                                    />
                                    <Tooltip content={<CustomTooltip unit="SAR" />} />
                                </RadarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </GlassCard>

            </div>
        </div>
    );
};
