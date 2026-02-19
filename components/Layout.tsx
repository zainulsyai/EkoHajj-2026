import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { User, Bell, AlignLeft } from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#333333] font-sans overflow-x-hidden relative selection:bg-[#D4AF37]/30">
      
      {/* Ambient Background Elements for Glassmorphism */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[#064E3B]/10 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-[#D4AF37]/15 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[30vw] h-[30vw] bg-[#10B981]/10 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        isOpen={sidebarOpen}
      />

      <div className={`relative z-10 transition-[margin-left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${sidebarOpen ? 'ml-72' : 'ml-24'} min-h-screen flex flex-col will-change-[margin-left]`}>
        
        {/* Frosted Header */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-white/40 px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm transition-all">
          
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-500 hover:text-[#D4AF37] transition-colors rounded-lg hover:bg-white/50"
             >
                <AlignLeft size={24} />
             </button>
             
             {/* Page Title */}
             <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-[#064E3B]">
                    {currentPage === Page.DASHBOARD ? 'DASHBOARD EKOSISTEM EKONOMI HAJI' : currentPage.replace(/_/g, ' ').replace('FORM', '').trim()}
                </h2>
                <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">Kementerian Haji dan Umrah RI</p>
             </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            
            <button className="relative p-2.5 bg-white/50 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 text-gray-500 hover:text-[#064E3B] transition-all shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200/60">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-800">Direktur Jenderal</p>
                    <p className="text-[10px] text-[#D4AF37] font-bold tracking-wider uppercase">Pengembangan Ekosistem</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#064E3B] to-[#042f24] p-0.5 shadow-lg shadow-[#064E3B]/20 cursor-pointer hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center">
                        <User size={20} className="text-white" />
                    </div>
                </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 flex-1 relative">
           {children}
        </main>
        
        {/* Footer - Dark Gray as per PDF Page 6 */}
        <footer className="bg-[#1f2937]/90 backdrop-blur-md border-t border-white/10 py-6 px-8 mt-auto text-white">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
                <p>© 2026 Kementerian Haji dan Umrah RI. Hak Cipta Dilindungi.</p>
                <div className="flex gap-6 mt-2 md:mt-0 font-medium">
                    <a href="#" className="hover:text-[#D4AF37] transition-colors">Bantuan</a>
                    <a href="#" className="hover:text-[#D4AF37] transition-colors">Kebijakan Privasi</a>
                    <a href="#" className="hover:text-[#D4AF37] transition-colors">Kontak Kami</a>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
};