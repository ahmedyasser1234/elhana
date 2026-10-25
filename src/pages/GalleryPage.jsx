import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, Play, X, Sparkles, Filter, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/common/SEOHead';
import { getWhatsAppLink } from '../components/common/WhatsAppButton';
import { galleryCategories, galleryItems } from '../data/galleryData';

export const GalleryPage = () => {
  const { currentLang, isRTL } = useLanguage();
  const lang = currentLang || 'en';

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const getLocalizedText = (obj) => {
    if (!obj) return '';
    return obj[lang] || obj['en'] || obj['ar'] || '';
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <SEOHead
        title={lang === 'ar' ? 'معرض صور وفيديوهات الرحلات' : 'Photo & Video Gallery'}
        description={lang === 'ar' ? 'استعرض أجمل صور وفيديوهات رحلات البيتش باجي، اليخوت، العشاء البدوي، والغطس في شرم الشيخ مع الهناء جروب.' : 'Explore real trip photos and videos from Sharm El Sheikh safaris, yacht cruises, Bedouin dinners, and diving with El Hana Group.'}
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/real/atv-quad.jpg"
            alt="El Hana Group Trips Gallery"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/real/atv-quad-hero.png';
            }}
            className="w-full h-full object-cover object-center filter brightness-50 contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-950/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/40 backdrop-blur-md text-[#38BDF8] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-[#F97316]" />
            <span>{lang === 'ar' ? 'معرض الذكريات الحية' : 'Live Experience Gallery'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
            {lang === 'ar' ? (
              <>معرض <span className="gold-gradient-text">الصور والفيديوهات</span> للرحلات</>
            ) : (
              <>Trips <span className="gold-gradient-text">Photos & Videos</span> Gallery</>
            )}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'عش تفاصيل المغامرة بنفسك واكتشف صور وفيديوهات الرحلات الحقيقية مع الهناء جروب في شرم الشيخ'
              : 'Explore authentic photos and video highlights from our real desert safaris, yacht cruises, and sea adventures.'
            }
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS NAVBAR */}
      <section className="sticky top-[65px] z-40 bg-slate-950/90 backdrop-blur-xl border-y border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max mx-auto">
            {galleryCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#0284C7] text-white shadow-lg shadow-[#0284C7]/30 scale-105'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {cat.id === 'video' && <Video className="w-3.5 h-3.5 text-[#F97316]" />}
                  {cat.id === 'all' && <Filter className="w-3.5 h-3.5 text-sky-400" />}
                  <span>{getLocalizedText(cat.label)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MEDIA GRID GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/80 shadow-xl hover:shadow-[#0284C7]/20 hover:border-[#0284C7]/60 transition duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Media Thumbnail Container */}
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-950">
                <img
                  src={item.src}
                  alt={getLocalizedText(item.title)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = item.fallbackSrc;
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 filter brightness-90 group-hover:brightness-105"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition duration-300"></div>

                {/* Badge (Photo / Video Tag) */}
                <div className="absolute top-3 left-3 z-10">
                  {item.type === 'video' ? (
                    <span className="px-3 py-1 rounded-full bg-[#F97316] text-white text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Play className="w-3 h-3 fill-current" />
                      <span>{lang === 'ar' ? 'فيديو' : 'Video'}</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-[#0284C7]/90 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                      <Camera className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'صورة' : 'Photo'}</span>
                    </span>
                  )}
                </div>

                {/* Play Icon Pulse Overlay for Videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-[#F97316]/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition duration-300 border-2 border-white/40">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Action Footer */}
              <div className="p-5 relative z-10 flex flex-col justify-between flex-1 bg-slate-900/90 border-t border-slate-800">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#38BDF8] transition duration-300 line-clamp-2">
                  {getLocalizedText(item.title)}
                </h3>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span className="flex items-center gap-1 text-sky-400 group-hover:translate-x-1 transition duration-300">
                    <span>{lang === 'ar' ? 'عرض المكبر' : 'View Fullscreen'}</span>
                    {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LIGHTBOX MODAL VIEWER */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80">
              <h4 className="text-base sm:text-lg font-bold text-white line-clamp-1 pr-4">
                {getLocalizedText(selectedMedia.title)}
              </h4>
              <button
                onClick={() => setSelectedMedia(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Media Body */}
            <div className="relative w-full bg-black min-h-[300px] max-h-[70vh] flex items-center justify-center overflow-hidden">
              {selectedMedia.type === 'video' && selectedMedia.videoUrl ? (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  {selectedMedia.videoUrl.endsWith('.mp4') ? (
                    <video 
                      src={selectedMedia.videoUrl} 
                      controls 
                      autoPlay 
                      className="max-w-full max-h-[70vh] w-auto h-auto object-contain mx-auto"
                      style={{ maxHeight: '70vh' }}
                    />
                  ) : (
                    <iframe
                      src={selectedMedia.videoUrl}
                      title={getLocalizedText(selectedMedia.title)}
                      className="w-full h-full border-0 aspect-video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              ) : (
                <img
                  src={selectedMedia.src}
                  alt={getLocalizedText(selectedMedia.title)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = selectedMedia.fallbackSrc;
                  }}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                />
              )}
            </div>

            {/* Modal Action Bar */}
            <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 text-center sm:text-right">
                <span>{lang === 'ar' ? 'الهناء جروب لتنظيم ورحلات شرم الشيخ' : 'El Hana Group Tourism & Safaris'}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {selectedMedia.linkPath && (
                  <Link
                    to={selectedMedia.linkPath}
                    onClick={() => setSelectedMedia(null)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-700"
                  >
                    <span>{lang === 'ar' ? 'تفاصيل الرحلة' : 'Trip Details'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-extrabold flex items-center justify-center gap-1.5 transition shadow-lg shadow-[#25D366]/20"
                >
                  <span>{lang === 'ar' ? 'حجز هذه التجربة' : 'Book on WhatsApp'}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default GalleryPage;
