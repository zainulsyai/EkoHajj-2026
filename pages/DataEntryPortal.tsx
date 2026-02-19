
import React, { useState, useMemo } from 'react';
import { Page, Status } from '../types';
import { ChefHat, UtensilsCrossed, Store, Truck, Signal, ArrowRight, Activity, CheckCircle2, Clock, History, Search, X, ChevronRight, Calendar, ShoppingCart } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { HeroSection } from '../components/HeroSection';

interface DataEntryPortalProps {
    onNavigate: (page: Page) => void;
    statusFilter: Status;
    onStatusFilterChange: (status: Status) => void;
}

const portalItems = [
    { id: 'bumbu', title: "Bumbu Pasta", subtitle: "Makkah & Madinah", description: "Monitoring penggunaan 28 jenis bumbu dan harga pasar.", icon: ChefHat, targetPage: Page.FORM_BUMBU, status: 'draft', progress: 40, lastUpdate: 'Baru saja', color: '#064E3B' },
    { id: 'beras', title: "Monitoring Beras", subtitle: "Stok & Kualitas", description: "Data beras premium dan volume distribusi.", icon: ShoppingCart, targetPage: Page.FORM_RICE, status: 'pending', progress: 0, lastUpdate: '-', color: '#059669' },
    { id: 'rte', title: "Makanan Siap Saji", subtitle: "Distribusi RTE", description: "Monitoring porsi dan perusahaan penyedia.", icon: UtensilsCrossed, targetPage: Page.FORM_RTE, status: 'pending', progress: 0, lastUpdate: '-', color: '#D4AF37' },
    { id: 'tenant', title: "Potensi Ekonomi", subtitle: "Survei Hotel & Tenant", description: "Sewa toko dan produk bestseller.", icon: Store, targetPage: Page.FORM_TENANT, status: 'pending', progress: 0, lastUpdate: '-', color: '#1E3A8A' },
    { id: 'expedition', title: "Ekspedisi", subtitle: "Kargo Jemaah", description: "Harga kargo per kilo dan berat volume.", icon: Truck, targetPage: Page.FORM_EXPEDITION, status: 'draft', progress: 15, lastUpdate: '1 jam lalu', color: '#B45309' },
    { id: 'telecom', title: "Telekomunikasi", subtitle: "Provider Jemaah", description: "Survei penggunaan RoaMax dan provider.", icon: Signal, targetPage: Page.FORM_TELECOM, status: 'pending', progress: 0, lastUpdate: '-', color: '#7C3AED' }
];

export const DataEntryPortal: React.FC<DataEntryPortalProps> = ({ onNavigate, statusFilter, onStatusFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, riceData } = useData();
    const currentDate = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return [];
        const lowerTerm = searchTerm.toLowerCase();
        const results: any[] = [];

        // 1. Search Bumbu Makkah (28 items)
        bumbuMakkah.forEach(i => {
            if (i.name.toLowerCase().includes(lowerTerm) || (i.companyName && i.companyName.toLowerCase().includes(lowerTerm))) {
                results.push({ 
                    type: 'Bumbu (Makkah)', 
                    title: i.name, 
                    subtitle: i.companyName || 'Supplier belum diisi', 
                    icon: ChefHat, 
                    page: Page.FORM_BUMBU, 
                    color: '#064E3B' 
                });
            }
        });

        // 2. Search Bumbu Madinah (28 items)
        bumbuMadinah.forEach(i => {
            if (i.name.toLowerCase().includes(lowerTerm) || (i.companyName && i.companyName.toLowerCase().includes(lowerTerm))) {
                results.push({ 
                    type: 'Bumbu (Madinah)', 
                    title: i.name, 
                    subtitle: i.companyName || 'Supplier belum diisi', 
                    icon: ChefHat, 
                    page: Page.FORM_BUMBU, 
                    color: '#064E3B' 
                });
            }
        });

        // 3. Search Rice
        riceData.forEach(i => i.companyName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Beras', title: i.companyName, subtitle: i.riceType, icon: ShoppingCart, page: Page.FORM_RICE, color: '#059669' }));
        
        // 4. Search RTE
        rteData.forEach(i => i.companyName.toLowerCase().includes(lowerTerm) && results.push({ type: 'RTE', title: i.companyName, subtitle: i.menu, icon: UtensilsCrossed, page: Page.FORM_RTE, color: '#D4AF37' }));
        
        // 5. Search Tenant
        tenantData.forEach(i => i.shopName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Tenant', title: i.shopName, subtitle: i.productType, icon: Store, page: Page.FORM_TENANT, color: '#1E3A8A' }));
        
        // 6. Search Expedition
        expeditionData.forEach(i => i.companyName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Ekspedisi', title: i.companyName, subtitle: `${i.weight} Kg`, icon: Truck, page: Page.FORM_EXPEDITION, color: '#B45309' }));
        
        // 7. Search Telecom
        telecomData.forEach(i => i.providerName.toLowerCase().includes(lowerTerm) && results.push({ type: 'Telco', title: i.providerName, subtitle: i.roamingPackage, icon: Signal, page: Page.FORM_TELECOM, color: '#7C3AED' }));
        
        return results;
    }, [searchTerm, bumbuMakkah, bumbuMadinah, rteData, tenantData, expeditionData, telecomData, riceData]);

    return (
        <div className="space-y-6 pb-10 animate-fade-in-up font-sans">
            
            <HeroSection
                title={<span>Pusat Input Data <span className="text-[#D4AF37]">Monitoring</span></span>}
                subtitle="Kelola input dan validasi data lapangan untuk seluruh sektor ekosistem haji secara real-time."
                currentDate={currentDate}
                statusFilter={statusFilter}
                onStatusFilterChange={onStatusFilterChange}
            >
                {/* Search Bar - Height matched to Badge */}
                <div className="relative group/search w-full md:w-64">
                    <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center shadow-lg transition-all focus-within:bg-white/20 focus-within:border-white/40 focus-within:shadow-xl px-2 min-h-[38px]">
                        <div className="pl-2 text-emerald-200 group-focus-within/search:text-[#D4AF37] transition-colors"><Search size={16} /></div>
                        <input 
                            type="text" 
                            value={searchTerm} 
                            onChange={e => setSearchTerm(e.target.value)} 
                            placeholder="Cari data (mis: Bumbu Rendang)..." 
                            className="w-full bg-transparent border-none py-2 px-3 text-white placeholder-emerald-200/50 text-xs font-bold focus:ring-0 tracking-wide" 
                        />
                    </div>
                </div>
            </HeroSection>

            {searchTerm ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.length > 0 ? searchResults.map((r, idx) => (
                        <button key={idx} onClick={() => onNavigate(r.page)} className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-sm hover:shadow-xl transition-all text-left group overflow-hidden relative">
                             {/* Watermark for Search Results */}
                             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" style={{ color: r.color }}>
                                <r.icon size={60} />
                             </div>
                            <div className="p-3 rounded-2xl text-white shadow-md relative z-10" style={{ backgroundColor: r.color }}>
                                <r.icon size={20} />
                            </div>
                            <div className="flex-1 relative z-10 min-w-0">
                                <p className="text-[9px] font-bold uppercase truncate" style={{ color: r.color }}>{r.type}</p>
                                <h4 className="text-sm font-bold text-gray-800 truncate">{r.title}</h4>
                                <p className="text-[10px] text-gray-500 truncate">{r.subtitle}</p>
                            </div>
                            <ArrowRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform relative z-10 flex-shrink-0" />
                        </button>
                    )) : (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 text-gray-400">
                            <Search size={48} className="opacity-20 mb-4" />
                            <p className="text-sm font-medium">Data tidak ditemukan untuk "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portalItems.map(item => (
                        <button key={item.id} onClick={() => onNavigate(item.targetPage)} className="group relative flex flex-col justify-between text-left h-[160px] bg-white/60 backdrop-blur-sm border border-white/60 rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 overflow-hidden">
                            
                             {/* Visual Background (Watermark) - MATCHING DASHBOARD STAT CARD */}
                             <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" style={{ color: item.color }}>
                                <item.icon size={80} />
                             </div>

                             {/* Top Row: Icon & Badge */}
                            <div className="flex justify-between items-start relative z-10">
                                {/* ICON CARD STYLE MATCHING DASHBOARD */}
                                <div className="p-3 rounded-2xl text-white shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style={{ backgroundColor: item.color }}>
                                    <item.icon size={24} strokeWidth={2} />
                                </div>
                                <div className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 border backdrop-blur-sm ${item.status === 'draft' ? 'bg-amber-50/80 text-amber-700 border-amber-100' : 'bg-gray-50/80 text-gray-400 border-gray-100'}`}>
                                    {item.status === 'draft' ? <History size={8} /> : <Activity size={8} />}
                                    <span>{item.status === 'draft' ? 'Draft' : 'Belum'}</span>
                                </div>
                            </div>

                            {/* Middle: Content (Pushed to bottom by justify-between) */}
                            <div className="relative z-10 mt-2">
                                <span className="text-[9px] font-bold uppercase tracking-widest block mb-1" style={{ color: item.color }}>{item.subtitle}</span>
                                <h3 className="text-sm font-bold text-gray-800 group-hover:text-[#064E3B] transition-colors font-playfair leading-tight mb-1">{item.title}</h3>
                                <p className="text-[10px] text-gray-500 font-medium leading-relaxed line-clamp-2 w-[90%]">{item.description}</p>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute bottom-5 right-5 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-[#064E3B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300 z-20">
                                <ChevronRight size={12} />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
