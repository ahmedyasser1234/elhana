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
import { Clock, MapPin, ShieldCheck, Check, X, Info, Sparkles, Camera, Maximize2, ChevronLeft, ChevronRight, Star, Quote, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { getLocalizedExperience } from '../data/experiences';
import { getTourReviews } from '../data/reviews';

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
  const [tourReviews, setTourReviews] = useState([]);

  useEffect(() => {
    fetchExperience();
  }, [slug]);

  useEffect(() => {
    if (slug) {
      setTourReviews(getTourReviews(slug, rawExperience?.title));
    }
  }, [slug, rawExperience]);

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
  const isAtvOrBuggy = Boolean(
    ['atv-quad-bike-safari', 'dune-buggy-adventure', 'super-desert-combo-safari', 'luxury-polaris-canam-buggy-safari'].includes(slug) ||
    experience?.category === 'safari' || experience?.category === 'atv' || experience?.category === 'buggy' ||
    experience?.title?.toLowerCase().includes('atv') || experience?.title?.toLowerCase().includes('quad') ||
    experience?.title?.includes('باجي') || experience?.title?.includes('كواد')
  );

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

          {/* Price Clarity Note for ATV & Buggies */}
          {isAtvOrBuggy && (
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-300/80 text-amber-950 font-black text-xs sm:text-sm shadow-xs mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span>
                {isAr 
                  ? 'السعر للمركبة الـ ATV المزدوجة (لشخصين) — وليس للفرد الواحد.' 
                  : 'Price is per double ATV vehicle (for 2 people) — not per individual person.'}
              </span>
            </div>
          )}
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

            {/* 2. Included vs Excluded (قوائم مرئية ومنظمة بعلامات ✓ و ✕) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-emerald-200/80 shadow-md space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm shrink-0">
                    ✓
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider block">
                      {isAr ? 'مشمول في الحجز' : 'Inclusive'}
                    </span>
                    <h4 className="text-base font-black text-slate-900 font-heading">
                      {isAr ? 'يشمل السعر:' : "What's Included:"}
                    </h4>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
                  {included.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[11px] font-black shrink-0">
                        ✓
                      </span>
                      <span className="leading-relaxed">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-rose-200/80 shadow-md space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-rose-100">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-black text-sm shrink-0">
                    ✕
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-rose-500 tracking-wider block">
                      {isAr ? 'إضافات ومصاريف اختيارية' : 'Not Included'}
                    </span>
                    <h4 className="text-base font-black text-slate-900 font-heading">
                      {isAr ? 'لا يشمل / إضافات:' : "What's Excluded / Extras:"}
                    </h4>
                  </div>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700 font-semibold">
                  {excluded.map((exc, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-500 border border-rose-300 flex items-center justify-center text-[11px] font-black shrink-0">
                        ✕
                      </span>
                      <span className="leading-relaxed">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. Participation Requirements & Safety (متطلبات المشاركة ومعلومات السلامة) */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-sky-100">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0284C7] flex items-center justify-center border border-sky-200 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#0284C7] tracking-wider block">
                    {isAr ? 'معايير الأمان والشروط' : 'Safety & Eligibility'}
                  </span>
                  <h3 className="text-xl font-black font-heading text-slate-900">
                    {isAr ? 'متطلبات المشاركة ومعلومات السلامة' : 'Participation & Safety Requirements'}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Driver Requirements */}
                <div className="bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                    {isAr ? 'متطلبات السائق:' : 'Driver Requirements:'}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-baseline gap-2">
                      <span className="text-[#0284C7] font-black">•</span>
                      <span>
                        <strong className="text-slate-900">{isAr ? 'الحد الأدنى لسن القيادة:' : 'Minimum Driving Age:'}</strong>{' '}
                        {isAr ? '14+ سنة للقيادة الفردية المستقلة (الأعمار الأصغر يمكنهم الركوب كمرافق خلف سائق بالغ).' : '14+ years for independent solo driving (younger children ride as passengers with an adult).'}
                      </span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <span className="text-emerald-600 font-black">•</span>
                      <span>
                        <strong className="text-slate-900">{isAr ? 'رخصة القيادة:' : 'Driver License:'}</strong>{' '}
                        <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {isAr ? 'لا يتطلب رخصة قيادة إطلاقاً' : 'No driver’s license required'}
                        </span>
                        {isAr ? ' — يتم تقديم شرح وتجربة قيادة قصيرة قبل انطلاق الرحلة.' : ' — Full practical briefing & test drive provided before start.'}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Safety Rules */}
                <div className="bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    {isAr ? 'قواعد السلامة والمرافقة:' : 'Safety & Guidance Rules:'}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    <li className="flex items-baseline gap-2">
                      <span className="text-emerald-600 font-black">•</span>
                      <span>
                        <strong className="text-slate-900">{isAr ? 'خوذات الأمان:' : 'Safety Helmets:'}</strong>{' '}
                        {isAr ? 'ارتداء خوذة الأمان المعقمة والموفرة إلزامي طوال مسار القيادة لسلامتك.' : 'Wearing the provided sanitized safety helmet is mandatory at all times.'}
                      </span>
                    </li>
                    <li className="flex items-baseline gap-2">
                      <span className="text-emerald-600 font-black">•</span>
                      <span>
                        <strong className="text-slate-900">{isAr ? 'مرافقة المرشد:' : 'Expert Desert Guide:'}</strong>{' '}
                        {isAr ? 'مرشد صحراوي معتمد يتقدم القافلة، ويُرجى الالتزام بالسرعة المحددة دون الخروج عن المسار.' : 'Certified desert guide leads the group; please maintain safe convoy speed.'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. What to Bring & What to Wear (ماذا تحضر وماذا ترتدي؟) */}
            <div className="bg-gradient-to-br from-amber-50/80 via-white to-sky-50/60 rounded-3xl p-6 md:p-8 border border-amber-200/90 shadow-md space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-amber-200/60">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg border border-amber-200 shrink-0">
                  🎒
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-amber-700 tracking-wider block">
                    {isAr ? 'نصائح للاستعداد المسبق' : 'Preparation Checklist'}
                  </span>
                  <h3 className="text-xl font-black font-heading text-slate-900">
                    {isAr ? 'ماذا تحضر وماذا ترتدي؟' : 'What to Bring & What to Wear?'}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 text-xs">
                {/* 1. Clothes */}
                <div className="bg-white/95 p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div className="text-xl">👕</div>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs">{isAr ? 'ملابس مريحة' : 'Comfortable Clothes'}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal mt-0.5">
                      {isAr ? 'ملابس رياضية ومريحة يمكن أن تتعرض للغبار أو الطين أثناء القيادة.' : 'Casual athletic clothes that can comfortably handle dust or sand.'}
                    </p>
                  </div>
                </div>

                {/* 2. Shoes */}
                <div className="bg-white/95 p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div className="text-xl">👟</div>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs">{isAr ? 'أحذية مغلقة من الأمام' : 'Closed-toe Shoes'}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal mt-0.5">
                      {isAr ? 'حذاء رياضي مغلق بالكامل (يُفضل تجنب الشبشب أو الصنادل المفتوحة).' : 'Sneakers or closed sports shoes (avoid flip-flops or open sandals).'}
                    </p>
                  </div>
                </div>

                {/* 3. Sunscreen & Sunglasses */}
                <div className="bg-white/95 p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div className="text-xl">🕶️</div>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs">{isAr ? 'واقي شمس ونظارات' : 'Sunscreen & Glasses'}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal mt-0.5">
                      {isAr ? 'نظارة شمسية لحماية العينين من الغبار وأشعة شمس سيناء وكريم واقي.' : 'Sunglasses to protect your eyes from bright desert sun and dust.'}
                    </p>
                  </div>
                </div>

                {/* 4. Scarf / Bandana */}
                <div className="bg-white/95 p-4 rounded-2xl border border-amber-100 shadow-2xs space-y-1.5 flex flex-col justify-between">
                  <div className="text-xl">🧣</div>
                  <div>
                    <h5 className="font-black text-slate-900 text-xs">{isAr ? 'الشال أو الباندانا' : 'Scarf / Bandana'}</h5>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-normal mt-0.5">
                      {isAr ? 'كوفية أو باندانا لتغطية الأنف والوجه من الرمال (متاح شراؤها بمركز السفاري).' : 'Keffiyeh or bandana to cover mouth & nose (available at center).'}
                    </p>
                  </div>
                </div>
              </div>
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

            {/* Tour Reviews Section (آخر تقييمين للرحلة - 2 Latest Tour Reviews) */}
            {tourReviews && tourReviews.length > 0 && (
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-sky-100 shadow-md space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0284C7] uppercase tracking-wider mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{isAr ? 'تقييمات موثقة من ضيوفنا' : 'Verified Traveler Reviews'}</span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-slate-900">
                      {isAr ? 'تقييمات العملاء لهذه الرحلة' : 'Customer Reviews for this Tour'}
                    </h3>
                  </div>

                  {/* Add Review Button */}
                  <Link
                    to={`/leave-review?tour=${slug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-50 hover:bg-[#0284C7] text-[#0284C7] hover:text-white border border-sky-200 hover:border-transparent text-xs font-extrabold transition-all duration-300 shadow-xs active:scale-95 group w-fit cursor-pointer"
                  >
                    <MessageSquarePlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{isAr ? 'أضف تقييمك لهذه الرحلة' : 'Review this Tour'}</span>
                  </Link>
                </div>

                {/* 2 Tour Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tourReviews.map((rev, idx) => {
                    const reviewComment = typeof rev.text === 'object' 
                      ? (rev.text[i18n.language] || rev.text['ar'] || rev.text['en']) 
                      : rev.text;

                    return (
                      <div
                        key={rev.id || idx}
                        className="bg-slate-50/90 hover:bg-white rounded-2xl p-5 border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-amber-400">
                              {[...Array(rev.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <Quote className="w-6 h-6 text-sky-200" />
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed font-medium italic line-clamp-4">
                            "{reviewComment}"
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/70 flex items-center gap-3">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            loading="lazy"
                            width="36"
                            height="36"
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-400/30 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-black text-slate-900 truncate flex items-center gap-1.5">
                              <span>{rev.name}</span>
                              <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                                ✓ {isAr ? 'حجز مؤكد' : 'Verified'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-semibold truncate">
                              {rev.country} • {rev.date}
                            </div>
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
          className="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4"
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
