import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [], variant = 'default' }) => {
  const isHero = variant === 'hero' || variant === 'glass';

  const containerClasses = isHero
    ? "inline-flex items-center gap-1.5 sm:gap-2 text-xs text-slate-200 py-1.5 px-3.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 shadow-xl overflow-x-auto no-scrollbar max-w-full"
    : "flex items-center gap-2 text-xs text-slate-600 py-3 overflow-x-auto no-scrollbar max-w-full";

  const linkHover = isHero
    ? "hover:text-[#38BDF8] text-slate-300 transition font-medium shrink-0"
    : "hover:text-[#0284C7] transition shrink-0";

  const activeText = isHero
    ? "font-bold text-white whitespace-nowrap truncate max-w-[180px] sm:max-w-none"
    : "font-semibold text-slate-900 whitespace-nowrap truncate max-w-[180px] sm:max-w-none";

  const chevronClass = isHero
    ? "w-3 h-3 text-slate-400 shrink-0 rtl:rotate-180"
    : "w-3 h-3 text-slate-400 shrink-0 rtl:rotate-180";

  return (
    <nav className={containerClasses}>
      <Link to="/" className={`flex items-center gap-1.5 ${linkHover}`}>
        <Home className="w-3.5 h-3.5 text-[#F97316]" />
        <span className="whitespace-nowrap">Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className={chevronClass} />
          {item.link ? (
            <Link to={item.link} className={`${linkHover} whitespace-nowrap`}>
              {item.label}
            </Link>
          ) : (
            <span className={activeText}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
