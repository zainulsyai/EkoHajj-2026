
import React, { useMemo, useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ReferenceLine, Sector } from 'recharts';
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

    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const renderActiveShape = (props: any) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

        return (
            <g>
                <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#6B7280" className="text-[10px] font-medium uppercase tracking-wider">
                    {payload.name.length > 15 ? `${payload.name.substring(0, 15)}...` : payload.name}
                </text>
                <text x={cx} y={cy + 5} dy={8} textAnchor="middle" fill={fill} className="text-3xl font-bold font-playfair">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                <text x={cx} y={cy + 25} dy={8} textAnchor="middle" fill="#9CA3AF" className="text-[10px] font-medium">
                    {`${Math.floor(value).toLocaleString()} User`}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 8}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 8}
                    outerRadius={outerRadius + 12}
                    fill={fill}
                />
            </g>
        );
    };

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
         return Object.keys(categories).map(key => {
             const revenue = categories[key];
             // Mock target as slightly higher or lower for visual interest
             const target = revenue * (0.9 + Math.random() * 0.3); 
             return {
                 subject: key,
                 revenue: revenue,
                 target: target,
                 fullMark: Math.max(...Object.values(categories)) * 1.2
             };
         });
    }, [tenantData, multiplier]);

    // 5. Rice Price Comparison (New)
    const dataRicePrice = useMemo(() => {
        return riceData
            .filter(r => r.isUsed && r.companyName)
            .map(r => ({
                name: r.companyName,
                price: parseFloat(r.price) || 0,
                origin: parseFloat(r.productPrice) || 0
            }))
            .sort((a, b) => b.price - a.price); // Sort by price descending
    }, [riceData]);

    const avgRicePrice = useMemo(() => {
        if (dataRicePrice.length === 0) return 0;
        return dataRicePrice.reduce((acc, curr) => acc + curr.price, 0) / dataRicePrice.length;
    }, [dataRicePrice]);

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
                <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
                    {/* Time Filter Toggle */}
                    <div className="relative flex-1 sm:flex-none">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20 text-white font-bold text-[10px] hover:bg-white/20 transition-all w-full sm:min-w-[140px] justify-between shadow-lg shadow-black/5"
                        >
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-[#D4AF37]/20 rounded-md">
                                    <Filter size={12} className="text-[#D4AF37]" />
                                </div>
                                <div className="flex flex-col items-start text-left">
                                    <span className="text-[8px] text-emerald-100/70 font-normal uppercase tracking-wider leading-none mb-0.5">Filter</span>
                                    <span className="leading-none truncate max-w-[80px] sm:max-w-none">{filterLabel[timeFilter]}</span>
                                </div>
                            </div>
                            <ChevronDown size={14} className={`text-emerald-200 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isFilterOpen && (
                            <div className="absolute top-full left-0 mt-2 w-full sm:w-48 bg-white/95 backdrop-blur-xl border border-white/40 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in-up origin-top-left">
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
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 h-full min-h-[38px] flex-shrink-0">
                        <div className="text-right">
                            <p className="text-[8px] text-emerald-100 uppercase tracking-wide hidden sm:block">Status Data</p>
                            <p className="text-[10px] font-bold text-white leading-none">Live<span className="hidden sm:inline"> Monitoring</span></p>
                        </div>
                        <div className="relative w-2 h-2 flex items-center justify-center">
                            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                            <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                        </div>
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
                        className="!bg-white/70 h-full min-h-[450px]"
                        action={<div className="p-2 bg-emerald-50 rounded-lg text-emerald-700"><BarChart3 size={18}/></div>}
                    >
                        <div className="h-[350px] md:h-[400px] mt-4 w-full">
                             {isLoading ? <ChartSkeleton /> : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dataPriceComparison} margin={{ top: 20, right: 10, left: 0, bottom: 20 }} barGap={2}>
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
                                        <XAxis dataKey="name" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} dy={10} fontWeight={500} interval={0} angle={-15} textAnchor="end" height={60} />
                                        <YAxis fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                                        <Tooltip cursor={{fill: '#F3F4F6', radius: 8}} content={<CustomTooltip unit="SAR" />} />
                                        <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '12px'}} />
                                        
                                        <Bar dataKey="makkah" name="Makkah" fill="url(#gradMakkah)" radius={[6, 6, 0, 0]} barSize={20} />
                                        <Bar dataKey="madinah" name="Madinah" fill="url(#gradMadinah)" radius={[6, 6, 0, 0]} barSize={20} />
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
                        className="!bg-white/70 h-full min-h-[450px]"
                        action={<div className="p-2 bg-blue-50 rounded-lg text-blue-700"><Radio size={18}/></div>}
                    >
                        <div className="flex flex-col h-[380px]">
                            <div className="h-[200px] w-full relative -mt-2">
                                {isLoading ? <PieSkeleton /> : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie 
                                                activeIndex={activeIndex}
                                                activeShape={renderActiveShape}
                                                data={dataTelcoShare} 
                                                cx="50%" 
                                                cy="50%" 
                                                innerRadius={60} 
                                                outerRadius={80} 
                                                paddingAngle={4} 
                                                dataKey="value"
                                                cornerRadius={4}
                                                stroke="none"
                                                onMouseEnter={onPieEnter}
                                            >
                                                {dataTelcoShare.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                            
                            {!isLoading && dataTelcoShare.length > 0 && (
                                <div className="mt-auto px-1 pb-2">
                                    <div className="grid grid-cols-2 gap-2">
                                        {dataTelcoShare.map((entry, index) => (
                                            <div 
                                                key={index} 
                                                className={`flex flex-col p-2 rounded-lg transition-all cursor-pointer border ${activeIndex === index ? 'bg-blue-50 border-blue-100 shadow-sm' : 'bg-gray-50/50 hover:bg-gray-50 border-transparent'}`}
                                                onMouseEnter={() => setActiveIndex(index)}
                                            >
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <div className="w-2 h-2 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: entry.color }}></div>
                                                    <span className={`text-[10px] font-bold truncate leading-tight ${activeIndex === index ? 'text-blue-900' : 'text-gray-700'}`}>
                                                        {entry.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[9px] text-gray-400 font-medium">{Math.floor(entry.value).toLocaleString()}</span>
                                                    <span className={`text-[10px] font-bold ${activeIndex === index ? 'text-blue-700' : 'text-gray-900'}`}>
                                                        {((entry.value / dataTelcoShare.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
                    className="!bg-white/70 min-h-[450px]"
                    action={<div className="p-2 bg-green-50 rounded-lg text-green-700"><ShoppingCart size={18}/></div>}
                >
                    <div className="h-[350px] md:h-[400px] mt-6">
                        {isLoading ? <ChartSkeleton /> : (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dataRicePrice} margin={{ top: 20, right: 30, left: 10, bottom: 5 }} layout="vertical" barCategoryGap="20%">
                                    <defs>
                                        <linearGradient id="gradRicePrice" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.8}/>
                                            <stop offset="100%" stopColor={COLORS.primaryLight} stopOpacity={1}/>
                                        </linearGradient>
                                        <linearGradient id="gradRiceOrigin" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor={COLORS.neutral} stopOpacity={0.4}/>
                                            <stop offset="100%" stopColor={COLORS.neutral} stopOpacity={0.7}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                                    <XAxis type="number" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                                    <YAxis dataKey="name" type="category" width={120} fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} fontWeight={500} />
                                    <Tooltip cursor={{fill: '#F3F4F6'}} content={<CustomTooltip unit="SAR" />} />
                                    <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                                    
                                    <Bar dataKey="price" name="Harga Jual" fill="url(#gradRicePrice)" radius={[0, 4, 4, 0]} barSize={16} />
                                    <Bar dataKey="origin" name="Harga Asal" fill="url(#gradRiceOrigin)" radius={[0, 4, 4, 0]} barSize={16} />
                                    
                                    <ReferenceLine x={avgRicePrice} stroke="#EF4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Rata-rata', fill: '#EF4444', fontSize: 10 }} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </GlassCard>

                {/* 4. RADAR CHART (Tenant) */}
                <GlassCard 
                    title="Distribusi Revenue Tenant" 
                    subtitle={`Analisis Pendapatan (SAR) - ${timeFilter === 'all' ? 'Total' : timeFilter}`} 
                    className="!bg-white/70 min-h-[450px]"
                    action={<div className="p-2 bg-purple-50 rounded-lg text-purple-700"><TrendingUp size={18}/></div>}
                >
                    <div className="h-[350px] md:h-[400px] mt-6">
                        {isLoading ? <PieSkeleton /> : (
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataHotelRevenue}>
                                    <defs>
                                        <radialGradient id="gradRadarRevenue" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                            <stop offset="0%" stopColor={COLORS.secondary} stopOpacity={0.1}/>
                                            <stop offset="100%" stopColor={COLORS.secondary} stopOpacity={0.6}/>
                                        </radialGradient>
                                    </defs>
                                    <PolarGrid stroke="#E5E7EB" strokeDasharray="4 4" />
                                    <PolarAngleAxis dataKey="subject" fontSize={11} tick={{ fill: '#4B5563', fontWeight: 'bold' }} />
                                    <PolarRadiusAxis angle={30} stroke="none" />
                                    
                                    <Radar 
                                        name="Target (SAR)" 
                                        dataKey="target" 
                                        stroke="#9CA3AF" 
                                        strokeWidth={2} 
                                        strokeDasharray="4 4"
                                        fill="none" 
                                        fillOpacity={0} 
                                    />
                                    
                                    <Radar 
                                        name="Revenue (SAR)" 
                                        dataKey="revenue" 
                                        stroke={COLORS.secondary} 
                                        strokeWidth={3} 
                                        fill="url(#gradRadarRevenue)" 
                                        fillOpacity={0.6} 
                                    />
                                    
                                    <Tooltip content={<CustomTooltip unit="SAR" />} />
                                    <Legend iconType="circle" wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} />
                                </RadarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </GlassCard>

            </div>
        </div>
    );
};
