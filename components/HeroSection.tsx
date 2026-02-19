
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  currentDate: string;
  children?: React.ReactNode;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, currentDate, children, className = '' }) => {
  return (
    <div className={`bg-[#064E3B] rounded-[2.5rem] px-8 py-8 md:px-12 text-white relative shadow-2xl shadow-[#064E3B]/20 min-h-[180px] flex flex-col justify-center border border-white/5 ${className}`}>
        {/* Ambient Background Effects - Wrapped in a container to clip overflow without clipping dropdowns */}
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-[#10B981] to-[#064E3B] rounded-full blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37] rounded-full blur-[100px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full pl-1.5 pr-5 py-1.5 mb-5 shadow-lg shadow-black/5 group hover:bg-white/15 transition-all duration-300 cursor-default">
                    <div className="p-1.5 bg-gradient-to-br from-[#D4AF37] to-[#B45309] rounded-full shadow-inner">
                        <Calendar size={14} className="text-white drop-shadow-sm" />
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-white font-semibold text-xs tracking-wide">{currentDate}</span>
                        <span className="w-1 h-1 rounded-full bg-white/40"></span>
                        <span className="text-[#D4AF37] font-bold text-[10px] tracking-wider uppercase font-mono">1447 H</span>
                    </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-4 leading-tight tracking-tight drop-shadow-sm">
                    {title}
                </h1>
                <p className="text-emerald-50/80 text-sm md:text-base max-w-2xl leading-relaxed font-light tracking-wide">
                    {subtitle}
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto mt-2 lg:mt-0">
                {children}
            </div>
        </div>
    </div>
  );
};
