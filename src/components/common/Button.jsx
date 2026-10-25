import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false
}) => {
  const base = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-[#0284C7] text-white hover:bg-[#0369A1] hover:scale-[1.02] shadow-lg shadow-[#0284C7]/25",
    secondary: "bg-[#0F172A] text-white hover:bg-[#0284C7] hover:scale-[1.02] shadow-md",
    sea: "bg-[#0284C7] text-white hover:bg-[#0369A1] hover:scale-[1.02] shadow-lg shadow-[#0284C7]/25",
    outline: "border border-white/40 text-white bg-transparent hover:bg-white hover:text-[#0F172A] hover:scale-[1.02]",
    outlineDark: "border border-[#E2E8F0] text-[#0F172A] bg-transparent hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7] hover:scale-[1.02]",
    ghost: "text-[#0F172A] hover:bg-[#F1F5F9] hover:text-[#0284C7]",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#20ba5a] hover:scale-[1.02] shadow-lg shadow-[#25D366]/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base font-extrabold",
    xl: "px-7 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-black rounded-2xl"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
