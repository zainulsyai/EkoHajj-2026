
import React from 'react';
import { LayoutDashboard, BarChart3, PieChart, Settings, LogOut, BookOpen } from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout, isOpen }) => {
  const isDataActive = currentPage.toString().startsWith('FORM') || currentPage === Page.DATA_ENTRY_PORTAL;

  return (
    <aside className={`fixed left-0 top-0 h-full transition-all duration-500 cubic-bezier(0.25, 0.1, 0.25, 1) z-30 ${isOpen ? 'w-72' : 'w-24'} 
       bg-[#064E3B] shadow-[10px_0_30px_rgba(0,0,0,0.15)] border-r border-white/5 flex flex-col overflow-hidden`}>
       
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981] opacity-20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Brand Header */}
      <div className="h-24 flex items-center justify-center border-b border-white/10 relative z-10 bg-gradient-to-b from-[#064E3B] to-transparent">
         <div className={`flex items-center gap-3 transition-all duration-300 ${!isOpen && 'flex-col gap-1 scale-90'}`}>
            {/* Logo */}
            <div className="relative w-12 h-12 flex items-center justify-center group cursor-default">
                <div className="absolute inset-0 bg-[#D4AF37] rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-[#D4AF37] to-[#B4941F] rounded-xl flex items-center justify-center text-[#064E3B] shadow-xl border border-white/20 transform group-hover:scale-105 transition-transform duration-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6 drop-shadow-sm">
                        <path d="M3 21h18M5 21V7l8-4 8 4v14" />
                    </svg>
                </div>
            </div>
            {isOpen && (
                <div className="leading-tight animate-fade-in-up">
                    <h1 className="font-bold text-xl tracking-tight text-white drop-shadow-md font-playfair">EkoHajj <span className="text-[#D4AF37]">2026</span></h1>
                    <span className="text-[9px] text-white/60 tracking-[0.2em] uppercase font-semibold block mt-0.5">System Dashboard</span>
                </div>
            )}
         </div>
      </div>

      <nav className="flex-1 overflow-y-auto custom-scrollbar py-8 px-4 space-y-2 relative z-10">
        {/* Beranda */}
        <MenuItem 
            icon={LayoutDashboard} 
            label="Beranda" 
            isActive={currentPage === Page.DASHBOARD} 
            onClick={() => onNavigate(Page.DASHBOARD)} 
            isOpen={isOpen}
        />

        {/* Data Pengisian - Direct Link */}
        <MenuItem
            icon={BookOpen}
            label="Data Pengisian"
            isActive={isDataActive}
            onClick={() => onNavigate(Page.DATA_ENTRY_PORTAL)}
            isOpen={isOpen}
        />

        {/* Laporan Otomatis */}
        <MenuItem 
            icon={BarChart3} 
            label="Laporan Otomatis" 
            isActive={currentPage === Page.REPORTS} 
            onClick={() => onNavigate(Page.REPORTS)} 
            isOpen={isOpen}
        />

        {/* Grafik & Visualisasi */}
        <MenuItem 
            icon={PieChart} 
            label="Grafik & Visualisasi" 
            isActive={currentPage === Page.VISUALIZATION} 
            onClick={() => onNavigate(Page.VISUALIZATION)} 
            isOpen={isOpen}
        />

        {/* Pengaturan */}
        <MenuItem 
            icon={Settings} 
            label="Pengaturan" 
            isActive={currentPage === Page.SETTINGS} 
            onClick={() => onNavigate(Page.SETTINGS)} 
            isOpen={isOpen}
        />
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5 bg-[#042f24] relative z-10">
        <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-red-300/80 hover:bg-red-500/10 hover:text-red-200 transition-all duration-300 group border border-transparent hover:border-red-500/20 ${!isOpen && 'justify-center'}`}
        >
            <div className="relative transition-transform duration-300 group-hover:scale-110 group-hover:-translate-x-1">
                <LogOut size={20} strokeWidth={2} />
            </div>
            {isOpen && <span className="font-medium text-sm tracking-wide group-hover:translate-x-1 transition-transform duration-300">Keluar System</span>}
        </button>
      </div>
    </aside>
  );
};

const MenuItem = ({ icon: Icon, label, isActive, onClick, isOpen }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden group
            ${isActive 
                ? 'bg-gradient-to-r from-[#ffffff]/10 to-transparent text-white border border-white/10 shadow-lg' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent hover:shadow-md'
            } ${!isOpen && 'justify-center'}`}
    >
        {/* Active Indicator Line */}
        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-[#D4AF37] rounded-r-full shadow-[0_0_10px_#D4AF37]"></div>}
        
        {/* Icon with hover animation */}
        <div className={`relative flex items-center justify-center transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
             <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={`transition-colors duration-300 ${isActive ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'group-hover:text-white'}`} />
        </div>
        
        {isOpen && (
            <span className={`text-sm tracking-wide transition-all duration-300 ${isActive ? 'font-bold translate-x-1' : 'font-medium group-hover:translate-x-1'}`}>
                {label}
            </span>
        )}
    </button>
);
