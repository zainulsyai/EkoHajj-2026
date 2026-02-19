
import React from 'react';
import { Calendar } from 'lucide-react';

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  currentDate: string;
  children?: React.ReactNode;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, currentDate, children, className = '' }) => {
  return (
    <div className={`bg-[#064E3B] rounded-[2rem] px-8 py-6 md:px-10 text-white relative overflow-hidden shadow-xl shadow-[#064E3B]/20 min-h-[140px] flex flex-col justify-center ${className}`}>
        {/* Ambient Background Effects */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[80px] opacity-30 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#D4AF37] rounded-full blur-[60px] opacity-20 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
            <div>
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-[10px] uppercase tracking-widest mb-1.5">
                    <Calendar size={12} /> <span>{currentDate}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-1.5 leading-tight">
                    {title}
                </h1>
                <p className="text-emerald-100/80 text-xs max-w-lg leading-relaxed">
                    {subtitle}
                </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
                {children}
            </div>
        </div>
    </div>
  );
};
