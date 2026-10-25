import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { getLocalizedFaqs } from '../../data/faqs';

export const FAQAccordion = ({
  category = null,
  defaultCategory = 'all',
  showCategories = true,
  showSearch = true,
  items = null
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const isAr = lang === 'ar';

  const initialCat = category || defaultCategory;
  const { categories: FAQ_CATEGORIES, faqs: FAQS } = getLocalizedFaqs(lang);

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync activeCategory when prop changes
  useEffect(() => {
    setActiveCategory(category || defaultCategory);
  }, [category, defaultCategory]);

  let sourceFaqs = items || FAQS;
  let filtered = sourceFaqs;

  // Filter by category if a specific category is chosen
  if (activeCategory !== 'all') {
    filtered = sourceFaqs.filter(f => 
      f.category === activeCategory || 
      f.category === 'general' || 
      f.category === 'safety' || 
      f.category === 'payments'
    );
    // If no questions in this specific category, fallback to all source FAQs
    if (filtered.length === 0) {
      filtered = sourceFaqs;
    }
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(f => f.question.toLowerCase().includes(query) || f.answer.toLowerCase().includes(query));
  }

  // Auto-open first question
  useEffect(() => {
    if (filtered.length > 0 && (openId === null || !filtered.some(f => f.id === openId))) {
      setOpenId(filtered[0].id);
    }
  }, [filtered]);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const placeholderText = isAr
    ? "ابحث في الأسئلة (مثال: التوصيل، البيتش باجي، الدفع، الإلغاء)..."
    : "Search questions (e.g. pickup, quad shoes, payment, cancellation)...";

  const noResultsText = isAr
    ? "لم نجد أي أسئلة تطابق بحثك. تواصل معنا مباشرة عبر الواتساب!"
    : "No questions matched your search. Please ask us directly on WhatsApp!";

  // Only render categories pills if explicitly requested and on 'all' tab
  const renderCategoriesPills = showCategories && initialCat === 'all';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Category Pills & Search */}
      {(renderCategoriesPills || showSearch) && (
        <div className="space-y-4">
          {showSearch && (
            <div className="relative">
              <Search className={`w-5 h-5 text-stone-400 absolute top-1/2 -translate-y-1/2 ${isAr ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholderText}
                className={`w-full py-3 bg-white border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:border-[#D4AF37] shadow-sm ${
                  isAr ? 'pr-12 pl-4' : 'pl-12 pr-4'
                }`}
              />
            </div>
          )}

          {renderCategoriesPills && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    activeCategory === cat.id
                      ? 'bg-stone-900 text-white shadow-md'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Accordion list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs md:text-sm">
            {noResultsText}
          </div>
        ) : (
          filtered.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition duration-200"
              >
                <button
                  onClick={() => toggleOpen(item.id)}
                  className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-[#B8860B] transition"
                >
                  <span className="text-sm md:text-base font-heading flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    {item.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs md:text-sm text-stone-600 leading-relaxed border-t border-stone-100/80 animate-in fade-in duration-200">
                    <div className="pt-3 pr-8 rtl:pr-8 rtl:pl-0 pl-8">{item.answer}</div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default FAQAccordion;
