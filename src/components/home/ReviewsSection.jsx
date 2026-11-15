import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { DEFAULT_REVIEWS } from '../../data/reviews';

export const ReviewsSection = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang || 'en';
  const isAr = lang === 'ar';

  const [allReviews, setAllReviews] = useState(DEFAULT_REVIEWS);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 45;

  // Load user reviews submitted locally
  useEffect(() => {
    try {
      const localReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
      if (localReviews.length > 0) {
        const mappedLocal = localReviews.map(r => ({
          id: r.id || `local-${Date.now()}-${Math.random()}`,
          name: r.name || (isAr ? 'عميل مسافر' : 'Verified Traveler'),
          country: r.country || (isAr ? 'نزيل فندقي' : 'Hotel Guest'),
          date: r.date || '2026',
          rating: Number(r.rating) || 5,
          tour: r.tourTitle || (isAr ? 'رحلة ممتعة مع الهنا' : 'El Hana Excursion'),
          tourEn: r.tourTitle || 'El Hana Excursion',
          text: r.text || { ar: r.comment || '', en: r.comment || '' },
          avatar: r.avatar || `https://i.pravatar.cc/150?u=${r.id || 'guest'}`
        }));
        setAllReviews([...mappedLocal, ...DEFAULT_REVIEWS]);
      }
    } catch (err) {
      console.error("Local reviews load error:", err);
    }
  }, [isAr]);

  // Responsive itemsPerPage:
  // Desktop (>= 1024px): Strictly 4 cards in 1 single row
  // Tablet (640px - 1023px): 2 cards in 1 single row
  // Mobile (< 640px): 1 card per row
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(4);
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(allReviews.length / itemsPerPage);

  // Auto-flip every 30 seconds
  useEffect(() => {
    if (totalPages <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [totalPages, currentPage, isPaused]);

  // Reset page when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  // Strictly 1 Single Row of reviews
  const displayedReviews = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return allReviews.slice(start, start + itemsPerPage);
  }, [allReviews, currentPage, itemsPerPage]);

  const handlePrev = () => {
    if (totalPages <= 1) return;
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    if (totalPages <= 1) return;
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Touch event handlers for mobile swiping
  const onTouchStartHandler = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandler = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // RTL navigation
    if (isAr) {
      if (isLeftSwipe) handleNext();
      if (isRightSwipe) handlePrev();
    } else {
      if (isLeftSwipe) handleNext();
      if (isRightSwipe) handlePrev();
    }
  };

  const NextIcon = isAr ? ChevronLeft : ChevronRight;
  const PrevIcon = isAr ? ChevronRight : ChevronLeft;

  return (
    <section 
      aria-label={isAr ? "تقييمات وآراء العملاء" : "Customer Reviews"}
      className="w-full min-h-[calc(100svh-var(--header-h))] flex flex-col justify-center py-10 md:py-16 bg-gradient-to-b from-slate-50 via-sky-50/25 to-white text-slate-800 relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#0284C7]/6 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 md:space-y-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 text-[#0284C7] text-xs font-bold uppercase tracking-wider border border-sky-200 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-[#0284C7]" />
            <span>{isAr ? 'تقييمات موثقة من ضيوفنا' : 'Verified Traveler Reviews'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            {isAr ? 'ماذا يقول ' : 'What '} 
            <span className="text-[#0284C7]">{isAr ? 'عملاؤنا' : 'Travelers'}</span> 
            {isAr ? ' عنا؟' : ' Say'}
          </h2>

          {/* Compact Golden Rating Badge */}
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-slate-900 font-black text-sm font-mono">4.9 / 5.0</span>
            <span className="text-slate-500 text-xs font-medium border-s border-slate-200 ps-2 ms-1">
              {isAr ? 'أكثر من 1,280 تقييم موثق' : '1,280+ verified reviews'}
            </span>
          </div>
        </div>

        {/* ── THE CAROUSEL: SINGLE ROW ONLY (4 Cards on Desktop) + TWO PROMINENT ARROWS ── */}
        <div className="relative py-2 px-3 sm:px-6 lg:px-8">
          
          {/* Arrow 1: Previous */}
          {totalPages > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label={isAr ? "السابق" : "Previous"}
              className="absolute -start-1 sm:-start-3 lg:-start-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-sky-50 text-slate-800 hover:text-[#0284C7] shadow-[0_8px_30px_rgba(0,0,0,0.16)] border-2 border-slate-200 hover:border-[#0284C7] flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
            >
              <PrevIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          )}

          {/* Single Row of Cards (صف واحد فقط: 4 كروت ديسكتوب - 2 تابلت - 1 موبايل) */}
          <div 
            onTouchStart={onTouchStartHandler}
            onTouchMove={onTouchMoveHandler}
            onTouchEnd={onTouchEndHandler}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 px-3 sm:px-4 transition-all duration-500"
          >
            {displayedReviews.map((rev) => {
              const reviewComment = typeof rev.text === 'object' 
                ? (rev.text[lang] || rev.text['ar'] || rev.text['en']) 
                : rev.text;

              return (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#0284C7]/40 transition-all duration-300 flex flex-col justify-between space-y-4 group relative"
                >
                  <div className="space-y-3 relative">
                    <div className="flex items-center justify-between">
                      {/* Golden Stars matching rating */}
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <Quote className="w-7 h-7 text-sky-100 group-hover:text-sky-200 transition-colors" />
                    </div>

                    {/* Quoted Comment */}
                    <p className="text-xs text-slate-700 leading-relaxed font-medium line-clamp-4 italic">
                      "{reviewComment}"
                    </p>
                  </div>

                  {/* Tour & Client Metadata */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-sky-50 text-[#0369A1] border border-sky-100/80 truncate max-w-full">
                      {isAr ? (rev.tour || 'رحلة شرم الشيخ') : (rev.tourEn || rev.tour)}
                    </div>

                    <div className="flex items-center gap-3">
                      <img 
                        src={rev.avatar} 
                        alt={rev.name}
                        loading="lazy" 
                        width="40"
                        height="40"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500/30 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-black text-slate-900 truncate">
                          {rev.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-semibold truncate">
                          {rev.country} • {rev.date}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Arrow 2: Next */}
          {totalPages > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label={isAr ? "التالي" : "Next"}
              className="absolute -end-1 sm:-end-3 lg:-end-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white hover:bg-sky-50 text-slate-800 hover:text-[#0284C7] shadow-[0_8px_30px_rgba(0,0,0,0.16)] border-2 border-slate-200 hover:border-[#0284C7] flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
            >
              <NextIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          )}

        </div>

        {/* Pagination Dots Indicator */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx)}
                aria-label={isAr ? `الانتقال إلى المجموعة ${idx + 1}` : `Go to set ${idx + 1}`}
                className="w-8 h-8 inline-flex items-center justify-center cursor-pointer rounded-full hover:bg-slate-100 transition"
              >
                <span
                  className={`block transition-all duration-300 rounded-full pointer-events-none ${
                    currentPage === idx 
                      ? 'w-7 h-2 bg-[#0284C7]' 
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Single Button: "أضف تقييمك" */}
        <div className="flex items-center justify-center pt-2">
          <Link
            to="/leave-review"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white text-xs sm:text-sm font-black transition-all shadow-lg shadow-sky-600/25 hover:shadow-sky-600/40 active:scale-95 cursor-pointer"
          >
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>{isAr ? 'أضف تقييمك' : 'Leave a Review'}</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;