import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Rating } from '../components/common/Rating';
import { BookingWidget } from '../components/booking/BookingWidget';
import { StickyMobileCTA } from '../components/booking/StickyMobileCTA';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { experiencesApi } from '../services/api/experiencesApi';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ErrorState } from '../components/common/ErrorState';
import { Clock, MapPin, ShieldCheck, Check, X, Info, Sparkles, Camera, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getLocalizedExperience } from '../data/experiences';

export const ExperienceDetailsPage = ({ slugOverride }) => {
  const { slug: paramsSlug } = useParams();
  const slug = slugOverride || paramsSlug;
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [rawExperience, setRawExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  // Modal State for Dedicated Step Gallery Lightbox
  const [activeStepGallery, setActiveStepGallery] = useState(null);
  const [activeModalImgIdx, setActiveModalImgIdx] = useState(0);

  useEffect(() => {
    fetchExperience();
  }, [slug]);

  const fetchExperience = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await experiencesApi.getBySlug(slug);
      setRawExperience(res.data);
    } catch (err) {
      setError(isAr ? "تعذر تحميل تفاصيل الرحلة." : "Failed to load experience details.");
    } finally {
      setLoading(false);
    }
  };

  const experience = rawExperience ? getLocalizedExperience(rawExperience, i18n.language) : null;

  if (loading) {
    return (
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">
        <LoadingSkeleton type="card" count={3} />
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-4">
        <ErrorState onRetry={fetchExperience} />
      </div>
    );
  }

  const getCategoryFallbackImage = (cat) => {
    if (['yacht', 'snorkeling', 'diving', 'parasailing', 'banana', 'sea', 'romantic', 'dolphin'].includes(cat)) {
      return '/images/sea/ras-mohammed-luxury-yacht.jpg';
    }
    if (['dahab', 'excursions', 'catherine', 'taba', 'nuweiba'].includes(cat)) {
      return '/images/excursions/dahab/dahab-blue-hole-lagoon.jpg';
    }
    return '/images/real/atv-quad.jpg';
  };

  const images = experience.images && experience.images.length > 0
    ? experience.images
    : [getCategoryFallbackImage(experience.category)];

  const highlights = experience.highlights || [];
  const included = experience.included || [];
  const excluded = experience.excluded || [];
  const importantInfo = experience.importantInfo || (isAr ? [
    "الالتزام بجدول المواعيد المحدد للتجمع والانتقال من الفندق",
    "إحضار جواز السفر أو بطاقة الهوية الشخصية",
    "ارتداء ملابس ونظارة مريحة مناسبة لظروف الرحلة",
    "اتباع تعليمات السلامة الصادرة من المرشد وطاقم العمل"
  ] : [
    "Please adhere to the pickup schedule.",
    "Bring your passport or photo ID.",
    "Wear comfortable clothing suitable for the experience.",
    "Follow safety instructions given by the guide/crew."
  ]);
  const overviewText = experience.fullDescription || experience.description || experience.shortDescription || '';

  const openStepGallery = (title, time, stepImages, initialIdx = 0) => {
    setActiveStepGallery({
      title,
      time,
      images: stepImages
    });
    setActiveModalImgIdx(initialIdx);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": experience.title,
    "description": experience.shortDescription,
    "image": images,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": experience.rating,
      "reviewCount": experience.reviewsCount
    },
    "offers": {
      "@type": "Offer",
      "price": experience.startingPrice,
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="pt-28 pb-24 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={experience.title}
        description={experience.shortDescription}
        structuredData={structuredData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

        {/* Title Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              {experience.categoryLabel}
            </span>
            <Rating score={experience.rating} count={experience.reviewsCount} />
            <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F97316]" /> {experience.location}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
            {experience.title}
          </h1>
        </div>

        {/* Image Gallery Showcase with 3D Sphere Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 aspect-[16/9] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] rounded-3xl overflow-hidden shadow-xl bg-slate-950 border border-sky-100/90 relative group p-4 sm:p-6 flex flex-col justify-between [perspective:1200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, rotateY: 75, scale: 0.8, filter: 'blur(8px)' }}
                animate={{ opacity: 1, rotateY: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, rotateY: -75, scale: 0.8, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={images[activeImage] || images[0]}
                  alt={experience.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getCategoryFallbackImage(experience.category);
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/40 pointer-events-none"></div>

            {/* Top Overlapping Breadcrumbs */}
            <div className="relative z-10">
              <Breadcrumbs items={[{ label: isAr ? 'الرحلات والتجارب' : 'Experiences', link: '/experiences' }, { label: experience.title }]} variant="hero" />
            </div>
          </div>

          {/* Thumbnails Stack: 3D Spheres with Motion */}
          <div className="flex flex-row lg:flex-col items-center justify-center gap-5 py-2 lg:py-0 [perspective:1000px]">
            {images.slice(0, 3).map((img, idx) => {
              const isActive = activeImage === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  whileHover={{ rotateY: 25, rotateX: -15, scale: 1.15, z: 20 }}
                  whileTap={{ scale: 0.9, rotateY: 180 }}
                  animate={{
                    y: isActive ? [0, -5, 0] : 0,
                    rotateY: isActive ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    rotateY: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                    type: 'spring',
                    stiffness: 300,
                    damping: 18
                  }}
                  className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden transition-all duration-300 group/thumb shrink-0 shadow-2xl cursor-pointer ${
                    isActive
                      ? 'ring-4 ring-[#0284C7] ring-offset-2 ring-offset-white scale-110 shadow-[0_12px_30px_-3px_rgba(2,132,199,0.6)] z-10'
                      : 'ring-2 ring-slate-200/90 opacity-75 hover:opacity-100'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#0284C7] via-[#38BDF8] to-[#F97316] opacity-70 blur-[4px] pointer-events-none"
                    />
                  )}
                  <img
                    src={img}
                    alt="Gallery thumbnail"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getCategoryFallbackImage(experience.category);
                    }}
                    className="w-full h-full object-cover rounded-full group-hover/thumb:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-black/70 pointer-events-none shadow-[inset_0_-8px_16px_rgba(0,0,0,0.65),inset_0_4px_8px_rgba(255,255,255,0.4)]" />
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-[#0284C7] bg-[#0284C7]/15 pointer-events-none" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout: Details Left vs Booking Widget Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-10">
            
            {/* Quick Stats Bar */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-sky-100 shadow-md grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'المدة الزمنية' : 'Duration'}</span>
                  <span className="font-bold text-slate-900">{experience.duration}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 text-[#F97316] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'مكان التجمع' : 'Pickup'}</span>
                  <span className="font-bold text-slate-900">{isAr ? 'استقبال الفندق' : 'Hotel Lobby'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'سياسة الإلغاء' : 'Cancellation'}</span>
                  <span className="font-bold text-slate-900">{isAr ? 'مجاني حتى 24س' : 'Free up to 24h'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">{isAr ? 'تأكيد الحجز' : 'Confirmation'}</span>
                  <span className="font-bold text-slate-900">{isAr ? 'تأكيد فوري بالواتساب' : 'Instant SMS/WA'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-4">
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                {isAr ? 'نظرة عامة على التجربة' : 'Experience Overview'}
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                {overviewText}
              </p>

              {highlights.length > 0 && (
                <>
                  <h3 className="text-lg font-bold font-heading text-slate-900 pt-4">
                    {isAr ? 'أبرز مميزات الرحلة' : 'Highlights'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-800">
                    {highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#F97316] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Included vs Excluded (ABOVE ITINERARY) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-100 shadow-md space-y-3">
                <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-500" />
                  {isAr ? 'الخدمات المشمولة في الرحلة' : "What's Included"}
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 font-normal">
                  {included.map((inc, i) => (
                    <li key={i} className="flex items-baseline gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-red-100 shadow-md space-y-3">
                <h4 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                  <X className="w-5 h-5 text-red-400" />
                  {isAr ? 'غير مشمول في التكلفة' : "What's Excluded"}
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 font-normal">
                  {excluded.map((exc, i) => (
                    <li key={i} className="flex items-baseline gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0"></span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Info / Guidelines (ABOVE ITINERARY) */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-4 border border-sky-400/30 shadow-2xl">
              <div className="flex items-center gap-2 font-bold text-sky-300 text-sm">
                <Info className="w-5 h-5 text-[#F97316]" />
                {isAr ? 'تعليمات وإرشادات مهمة للرحلة' : 'Important Trip Guidelines & What to Bring'}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-normal">
                {importantInfo.map((info, i) => (
                  <li key={i}>• {info}</li>
                ))}
              </ul>
            </div>

            {/* Detailed Itinerary (Clean cards without step photos or time badges) */}
            {experience.itinerary && experience.itinerary.length > 0 && (
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    {isAr ? 'برنامج وخط سير الرحلة' : 'Trip Itinerary'}
                  </h3>
                  <span className="text-xs font-semibold text-[#0284C7] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full w-fit">
                    {isAr ? 'خطوات مفصلة' : 'Detailed Timeline'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.itinerary.map((step, idx) => {
                    const stepNum = step.step || (idx + 1);
                    return (
                    <div
                      key={idx}
                      className="bg-slate-50/90 p-4 rounded-2xl border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all shadow-xs flex flex-col justify-between space-y-1.5 text-start rtl:text-right"
                      dir={isAr ? "rtl" : "ltr"}
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#0284C7] text-white text-sm font-black flex items-center justify-center shadow-md">
                          {stepNum}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 font-heading leading-snug">{step.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal mt-1">{step.desc?.replace(/^\.+|\.+$/g, '')}</p>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Right Desktop Booking Widget */}
          <div className="hidden lg:block lg:col-span-1">
            <BookingWidget experience={experience} />
          </div>

        </div>

        {/* FAQs */}
        <div className="pt-8 space-y-6">
          <FAQAccordion category={experience.category} showSearch={false} />
        </div>

      </div>

      {/* Sticky Mobile CTA Bar */}
      <StickyMobileCTA experience={experience} />

      {/* Dedicated Step Photo Gallery Lightbox Modal */}
      {activeStepGallery && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setActiveStepGallery(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#38BDF8] block">
                  {activeStepGallery.time}
                </span>
                <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#F97316]" />
                  {activeStepGallery.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveStepGallery(null)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image View */}
            <div className="relative aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
              <img
                src={activeStepGallery.images[activeModalImgIdx] || activeStepGallery.images[0]}
                alt={activeStepGallery.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getCategoryFallbackImage(experience.category);
                }}
                className="w-full h-full object-cover"
              />

              {/* Prev / Next buttons if multiple images */}
              {activeStepGallery.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveModalImgIdx((prev) => (prev > 0 ? prev - 1 : activeStepGallery.images.length - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition backdrop-blur-md shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setActiveModalImgIdx((prev) => (prev < activeStepGallery.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white transition backdrop-blur-md shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Thumbnails Strip */}
            {activeStepGallery.images.length > 1 && (
              <div className="flex items-center justify-center gap-3 pt-2">
                {activeStepGallery.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveModalImgIdx(i)}
                    className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition ${
                      activeModalImgIdx === i ? 'border-[#38BDF8] scale-105 ring-2 ring-[#38BDF8]/40' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ExperienceDetailsPage;
