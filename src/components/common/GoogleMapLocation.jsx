import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LOCATIONS = [
  {
    id: 'naama',
    title: { ar: 'مكتب وشاطئ خليج نعمة', en: 'Naama Bay Main Hub & Marina' },
    address: { ar: 'شارع الملك فهد، خليج نعمة، شرم الشيخ', en: 'King Fahd St, Naama Bay, Sharm El Sheikh' },
    coords: '27.9158,34.3299',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14138.804907153723!2d34.3200!3d27.9150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145330364d9753c1%3A0xb35a7b8e05c87910!2sNaama%20Bay%2C%20Sharm%20El%20Sheikh!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg'
  },
  {
    id: 'airport',
    title: { ar: 'مكتب استقبال المطار 24/7', en: 'Sharm El Sheikh Airport Terminal (SSH)' },
    address: { ar: 'صالة الوصول، مطار شرم الشيخ الدولي', en: 'Arrivals Terminal, Sharm El Sheikh Int. Airport' },
    coords: '27.9774,34.3950',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131.258410978931!2d34.3850!3d27.9770!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1453360b64d1f8ed%3A0x6b4f7a6cfbf66861!2sSharm%20El%20Sheikh%20International%20Airport!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg'
  },
  {
    id: 'safari',
    title: { ar: 'مركز السفاري الصحراوي', en: 'Sinai Desert Quad Safari Base Camp' },
    address: { ar: 'وادي خرومي، صحراء شرم الشيخ', en: 'Khromi Valley, Sharm El Sheikh Desert' },
    coords: '27.9500,34.2800',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28277.5!2d34.2800!3d27.9500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1453300000000000%3A0x0!2sSinai%20Desert!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg'
  }
];

export const GoogleMapLocation = ({ className = '', defaultLocationId = 'naama' }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [selectedLoc, setSelectedLoc] = useState(
    LOCATIONS.find(l => l.id === defaultLocationId) || LOCATIONS[0]
  );

  return (
    <div className={`bg-white rounded-3xl border border-sky-100 shadow-xl overflow-hidden ${className}`}>
      
      {/* Header Tabs */}
      <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0284C7]/20 border border-[#0284C7]/40 flex items-center justify-center text-[#38BDF8]">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-bold text-base font-heading text-white">
              {isAr ? 'مواقعنا ومراكز انطلاق الرحلات' : 'Our Meeting & Departure Hubs'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? 'شرم الشيخ، جنوب سيناء، مصر' : 'Sharm El Sheikh, South Sinai, Egypt'}
            </p>
          </div>
        </div>

        {/* Location Selector Chips */}
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map(loc => (
            <button
              key={loc.id}
              onClick={() => setSelectedLoc(loc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                selectedLoc.id === loc.id
                  ? 'bg-[#0284C7] text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{loc.title[isAr ? 'ar' : 'en']}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Embed Frame */}
      <div className="relative w-full h-[380px] sm:h-[450px] bg-slate-100">
        <iframe
          title={selectedLoc.title[isAr ? 'ar' : 'en']}
          src={selectedLoc.embedUrl}
          className="w-full h-full border-0 filter contrast-[1.05] saturate-[1.1]"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Floating Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-sky-100 shadow-2xl space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#0284C7]">
                {isAr ? 'الموقع المباشر' : 'Active Location'}
              </span>
              <h4 className="font-extrabold text-sm text-slate-900 leading-snug">
                {selectedLoc.title[isAr ? 'ar' : 'en']}
              </h4>
            </div>
            <a
              href={`https://maps.google.com/?q=${selectedLoc.coords}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-sky-50 hover:bg-[#0284C7] hover:text-white text-[#0284C7] flex items-center justify-center transition shrink-0 border border-sky-100"
              title={isAr ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
            <span>{selectedLoc.address[isAr ? 'ar' : 'en']}</span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default GoogleMapLocation;
