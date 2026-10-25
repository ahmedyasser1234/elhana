import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { FilterSidebar } from '../components/experiences/FilterSidebar';
import { ExperienceGrid } from '../components/experiences/ExperienceGrid';
import { experiencesApi } from '../services/api/experiencesApi';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

export const AllExperiencesPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState(120);
  const [sortBy, setSortBy] = useState('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await experiencesApi.getAll({
        category: selectedCategory,
        search: searchQuery,
        maxPrice,
        sortBy
      });
      setExperiences(res.data);
    } catch (err) {
      console.error("Failed to load experiences", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(120);
    setSortBy('popular');
  };

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "جميع رحلات وتجارب شرم الشيخ" : "All Experiences & Safaris in Sharm El Sheikh"}
        description={isAr ? "استكشف أكثر من 12 رحلة سفاري، يخوت VIP، وألعاب مائية في شرم الشيخ." : "Browse 12+ Sharm El Sheikh desert quad safaris, VIP yacht cruises, snorkeling, and diving."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

        {/* Taller Luxury Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-10 md:p-14 min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-between border border-sky-400/30 shadow-2xl">
          <img
            src="/images/real/atv-quad-hero.png"
            alt="All Experiences Sharm"
            className="absolute inset-0 w-full h-full object-cover object-top filter brightness-75 transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent rtl:bg-gradient-to-l"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-slate-950/30"></div>

          {/* Top Overlapping Breadcrumbs */}
          <div className="relative z-10">
            <Breadcrumbs items={[{ label: t('nav.activities') }]} variant="hero" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4 pt-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0284C7]/25 border border-[#0284C7]/50 text-[#38BDF8] font-extrabold text-xs uppercase tracking-wider backdrop-blur-md shadow-md">
              <Sparkles className="w-4 h-4 text-[#F97316]" /> <span>{isAr ? "سوق التجارب السياحية" : "Activity Marketplace"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight drop-shadow-md">
              {t('experiences.featuredTitle')}
            </h1>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium drop-shadow-sm">
              {t('experiences.featuredSubtitle')}
            </p>
          </div>
        </div>

        {/* Filter Bar Action */}
        <div className="flex justify-end">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#0284C7] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#0369A1] transition"
          >
            <SlidersHorizontal className="w-4 h-4 text-white" />
            <span>{isAr ? "تصفية الرحلات" : "Filter Experiences"}</span>
          </button>
        </div>

        {/* Grid Layout with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (Expanded width to fill available space gracefully) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onReset={handleReset}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm p-4 flex justify-end">
              <div className="w-full max-w-sm bg-white rounded-3xl p-6 overflow-y-auto h-full space-y-6 shadow-2xl">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <span className="font-bold text-slate-900">{isAr ? "الفلاتر" : "Filters"}</span>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-slate-500 font-bold text-sm">✕</button>
                </div>
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => { setSelectedCategory(cat); setMobileFilterOpen(false); }}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  maxPrice={maxPrice}
                  onMaxPriceChange={setMaxPrice}
                  sortBy={sortBy}
                  onSortByChange={setSortBy}
                  onReset={handleReset}
                />
              </div>
            </div>
          )}

          {/* Experiences Grid */}
          <div className="lg:col-span-8 xl:col-span-9">
            <ExperienceGrid
              experiences={experiences}
              loading={loading}
              onResetFilter={handleReset}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default AllExperiencesPage;
