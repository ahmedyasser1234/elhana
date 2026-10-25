import React from 'react';

export const SectionTitle = ({
  badge = null,
  title,
  subtitle = null,
  center = true,
  dark = false,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${center ? 'text-center max-w-3xl mx-auto' : 'text-start rtl:text-right'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-[#0284C7]/15 border border-[#0284C7]/30 text-[#0284C7] font-extrabold text-xs tracking-wider uppercase">
          <span>{badge}</span>
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black tracking-tight font-heading ${dark ? 'text-white' : 'text-[#0F172A]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed ${dark ? 'text-slate-300' : 'text-[#64748B]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
