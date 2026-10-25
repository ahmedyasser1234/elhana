import React from 'react';

export const WHATSAPP_PHONE = "+201044790588";
export const WHATSAPP_DISPLAY = "01044790588";
export const CALL_PHONE = "+20110077330";
export const CALL_DISPLAY = "0110077330";

export const getWhatsAppLink = (message = "مرحباً! أود الاستفسار وحجز إحدى رحلات مجموعة الهنا في شرم الشيخ.") => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE.replace('+', '')}?text=${encoded}`;
};

// Official WhatsApp SVG Icon
export const WhatsAppIcon = ({ className = "w-7 h-7" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={`${className} fill-current`} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.7-.51-5.232-1.4l-.375-.218-3.892 1.02 1.038-3.792-.246-.39C2.45 15.498 1.9 13.568 1.9 11.53c0-5.503 4.477-9.98 9.98-9.98 2.664 0 5.168 1.039 7.051 2.922 1.884 1.884 2.92 4.387 2.919 7.052 0 5.503-4.477 9.98-9.979 9.98m0-21.841C5.395.002.005 5.392 0 11.996c0 2.107.548 4.164 1.59 5.975L0 24l6.171-1.619C7.904 23.364 9.923 24 12.05 24c6.604 0 11.995-5.39 11.997-11.994.001-3.202-1.243-6.213-3.504-8.477C18.28 1.265 15.268.002 12.051.002z" />
  </svg>
);

export const WhatsAppButton = ({ message, label, variant = "floating", className = "" }) => {
  const link = getWhatsAppLink(message);

  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 left-6 z-50 group select-none">
        {/* Tooltip with Brand Styling */}
        <div className="absolute bottom-full left-0 mb-3 hidden group-hover:flex items-center gap-2 bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-2xl border border-emerald-500/30 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
          <span>تواصل معنا عبر واتساب ({WHATSAPP_DISPLAY})</span>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className={`flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#25D366] via-[#128C7E] to-[#25D366] text-white rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 relative border-2 border-white ${className}`}
        >
          {/* Animated Pulsing Glow Ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#25D366] via-[#34D399] to-[#25D366] opacity-60 blur-xs animate-ping pointer-events-none" style={{ animationDuration: '2.5s' }}></span>
          
          <WhatsAppIcon className="w-7 h-7 text-white relative z-10 drop-shadow-md" />
        </a>
      </div>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white font-extrabold px-5 py-3 rounded-2xl shadow-lg shadow-[#25D366]/25 hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all duration-200 border border-white/20 ${className}`}
    >
      <WhatsAppIcon className="w-5 h-5 text-white" />
      <span>{label || "تواصل عبر الواتساب"}</span>
    </a>
  );
};

export default WhatsAppButton;
