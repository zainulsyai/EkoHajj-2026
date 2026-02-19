import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { DataEntryPortal } from './pages/DataEntryPortal';
import { Reports } from './pages/Reports';
import { Visualization } from './pages/Visualization';
import { SpiceForm } from './pages/forms/SpiceForm';
import { RTEForm } from './pages/forms/RTEForm';
import { TenantForm } from './pages/forms/TenantForm';
import { ExpeditionForm } from './pages/forms/ExpeditionForm';
import { TelecomForm } from './pages/forms/TelecomForm';
import { RiceForm } from './pages/forms/RiceForm';
import { Page, Status } from './types';
import { GlassCard } from './components/GlassCard';
import { Construction, Clock, ArrowLeft } from 'lucide-react';
import { DataProvider } from './contexts/DataContext';

const PlaceholderPage: React.FC<{ title: string; onNavigate: (page: Page) => void }> = ({ title, onNavigate }) => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] relative p-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <GlassCard className="max-w-lg w-full flex flex-col items-center text-center p-10 md:p-14 border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative z-10">
            <div className="relative mb-10 group cursor-default">
                <div className="absolute inset-0 bg-[#064E3B]/20 blur-2xl rounded-full animate-pulse"></div>
                <div className="relative w-28 h-28 bg-gradient-to-br from-[#ffffff] to-[#f0f4f8] rounded-[2rem] flex items-center justify-center border border-white/80 shadow-2xl transform rotate-6 group-hover:rotate-3 transition-all duration-500 ease-out">
                    <div className="bg-[#064E3B]/10 p-5 rounded-2xl">
                         <Construction size={48} className="text-[#064E3B] drop-shadow-sm" />
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-[#D4AF37] to-[#FBBF24] text-white p-2.5 rounded-xl shadow-lg border-2 border-white transform -rotate-6 group-hover:rotate-0 transition-all duration-500">
                         <Clock size={20} className="" /> 
                    </div>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-[#064E3B] mb-3 tracking-tight">{title}</h2>
            
            <div className="flex items-center gap-3 mb-6 justify-center opacity-80">
                <span className="h-0.5 w-10 bg-gradient-to-r from-transparent to-[#D4AF37] rounded-full"></span>
                <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase">Dalam Pengembangan</span>
                <span className="h-0.5 w-10 bg-gradient-to-l from-transparent to-[#D4AF37] rounded-full"></span>
            </div>

            <p className="text-gray-500 mb-10 leading-relaxed max-w-sm mx-auto font-medium">
                Modul ini sedang dalam tahap pengembangan intensif untuk melengkapi Ekosistem Ekonomi Haji 2026.
            </p>

            <button 
                onClick={() => onNavigate(Page.DASHBOARD)}
                className="group relative px-8 py-3.5 bg-white border border-gray-200/80 text-gray-600 font-bold rounded-xl shadow-sm hover:shadow-xl hover:border-[#D4AF37]/50 hover:text-[#064E3B] transition-all duration-300 overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#FBBF24]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-2.5">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Kembali ke Dashboard
                </span>
            </button>
        </GlassCard>
    </div>
);

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Status>(Status.ALL);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage(Page.LOGIN);
  };

  const navigateToPortal = () => setCurrentPage(Page.DATA_ENTRY_PORTAL);

  const renderContent = () => {
    switch (currentPage) {
      case Page.DASHBOARD:
        return <Dashboard />;
      case Page.DATA_ENTRY_PORTAL:
        return <DataEntryPortal onNavigate={setCurrentPage} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} />;
      case Page.REPORTS:
        return <Reports />;
      case Page.VISUALIZATION:
        return <Visualization />;
      case Page.FORM_BUMBU:
        return <SpiceForm onBack={navigateToPortal} />;
      case Page.FORM_RICE:
        return <RiceForm onBack={navigateToPortal} />;
      case Page.FORM_RTE:
        return <RTEForm onBack={navigateToPortal} />;
      case Page.FORM_TENANT:
        return <TenantForm onBack={navigateToPortal} />;
      case Page.FORM_EXPEDITION:
        return <ExpeditionForm onBack={navigateToPortal} />;
      case Page.FORM_TELECOM:
        return <TelecomForm onBack={navigateToPortal} />;
      case Page.SETTINGS:
        return <PlaceholderPage title="Pengaturan Sistem" onNavigate={setCurrentPage} />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) return <Login onLogin={handleLogin} />;

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter}>
      {renderContent()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;