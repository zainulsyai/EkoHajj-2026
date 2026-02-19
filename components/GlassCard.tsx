import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', title, subtitle, action }) => {
  return (
    <div className={`group relative bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-2xl backdrop-saturate-150 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-white/80 ${className}`}>
      
      {/* Glossy reflection effect */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70"></div>
      <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
      
      {(title || subtitle) && (
        <div className="px-8 py-6 border-b border-gray-100/50 flex items-start md:items-center justify-between relative z-10 bg-white/30">
          <div className="space-y-1">
             {title && <h3 className="text-lg font-bold text-[#064E3B] tracking-tight leading-tight">{title}</h3>}
             {subtitle && <p className="text-xs font-medium text-gray-500 tracking-wide">{subtitle}</p>}
          </div>
          {action && <div className="ml-4">{action}</div>}
        </div>
      )}
      
      <div className="p-8 relative z-10">
        {children}
      </div>
    </div>
  );
};