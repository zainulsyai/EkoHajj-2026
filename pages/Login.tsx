
import React, { useState } from 'react';
import { ArrowRight, User, Lock, Building2, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setLoading(true);
      setTimeout(() => {
        onLogin();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#064E3B] relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND ASSETS (Matching Dashboard Hero/Sidebar) --- */}
      <div className="absolute inset-0 pointer-events-none">
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          
          {/* Gradient Orbs */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#10B981] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#D4AF37] rounded-full blur-[100px] opacity-20 animate-pulse delay-1000"></div>
          
          {/* Islamic Geometric Pattern Overlay (Subtle) */}
          <div className="absolute inset-0 opacity-5" style={{ 
              backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', 
              backgroundSize: '30px 30px' 
          }}></div>
      </div>

      {/* --- LOGIN CARD (Matching Dashboard GlassCard Style) --- */}
      <div className="w-full max-w-md px-6 relative z-10 animate-fade-in-up">
        
        {/* Card Container - White Glass to match Dashboard Cards */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden relative">
            
            {/* Top Decoration */}
            <div className="h-2 w-full bg-gradient-to-r from-[#064E3B] via-[#10B981] to-[#D4AF37]"></div>

            <div className="p-8 md:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#064E3B] text-white shadow-xl shadow-[#064E3B]/20 mb-4 ring-4 ring-[#064E3B]/5 transform rotate-3">
                        <Building2 size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-[#064E3B] font-playfair mb-1">
                        EkoHajj <span className="text-[#D4AF37]">2026</span>
                    </h1>
                    <p className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase">
                        Sistem Monitoring Terintegrasi
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Username / ID Panitia</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#064E3B] transition-colors">
                                <User size={18} />
                            </div>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukkan Username / ID Panitia"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/10 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                         <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                         <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#064E3B] transition-colors">
                                <Lock size={18} />
                            </div>
                            <input 
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-12 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:bg-white focus:border-[#064E3B] focus:ring-4 focus:ring-[#064E3B]/10 outline-none transition-all"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#064E3B] focus:ring-[#064E3B]" />
                            <span className="text-xs font-medium text-gray-500">Ingat Saya</span>
                        </label>
                        <a href="#" className="text-xs font-bold text-[#D4AF37] hover:text-[#b08d24] transition-colors">Lupa Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-4 bg-[#064E3B] hover:bg-[#053d2e] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#064E3B]/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                             <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>MEMUAT...</span>
                             </>
                        ) : (
                             <>
                                <span>Masuk</span>
                             </>
                        )}
                    </button>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 font-medium tracking-wide">
                            Belum punya akun?{' '}
                            <a href="#" className="text-[#064E3B] font-bold hover:text-[#053d2e] hover:underline transition-all">
                                Daftar Akun
                            </a>
                        </p>
                    </div>
                </form>
            </div>

             {/* Footer inside card */}
             <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                 <p className="text-[10px] text-gray-400">
                    &copy; 2026 Kementerian Haji dan Umrah RI.
                 </p>
            </div>
        </div>

        {/* Floating Tag */}
        <div className="mt-8 text-center animate-fade-in delay-300">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-emerald-100 text-[10px] font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
                System Status: Online & Stable
            </div>
        </div>

      </div>
    </div>
  );
};
