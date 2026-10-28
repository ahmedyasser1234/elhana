import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';
import { getWhatsAppLink } from './WhatsAppButton';
import { useBooking } from '../../context/BookingContext';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isAr = i18n.language === 'ar';
  const { openAdventureModal } = useBooking();

  const [scrolled, setScrolled] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [safariDropdown, setSafariDropdown] = useState(false);
  const [seaDropdown, setSeaDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);

  useEffect(() => {
    let scrollStopTimer = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);

      // On mobile screens (< 1024px): hide navbar during scrolling, show when scrolling stops
      if (window.innerWidth < 1024) {
        if (mobileMenuOpen) {
          setMobileNavVisible(true);
          return;
        }

        // Always show if near the top
        if (currentScrollY < 25) {
          setMobileNavVisible(true);
          if (scrollStopTimer) clearTimeout(scrollStopTimer);
          return;
        }

        // Active scrolling -> hide navbar immediately
        setMobileNavVisible(false);

        // When user stops scrolling -> reappear smoothly
        if (scrollStopTimer) clearTimeout(scrollStopTimer);
        scrollStopTimer = setTimeout(() => {
          setMobileNavVisible(true);
        }, 260);
      } else {
        setMobileNavVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
    };
  }, [mobileMenuOpen]);

  // Lock / unlock body scroll when mobile menu opens/closes
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close everything on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSafariDropdown(false);
    setSeaDropdown(false);
    setMoreDropdown(false);
  }, [location]);

  const safariLinks = [
    {
      title: isAr ? 'رحلات البيتش باجي' : 'ATV Quad Safaris',
      path: '/safari',
      desc: isAr ? 'مركبات 250cc كواد سنجل ودبل في الصحراء' : '250cc Quads Single & Double'
    },
    {
      title: isAr ? 'سفاري الكار باجي الفاخر Polaris & Can-Am' : 'Luxury Buggy (Polaris & Can-Am)',
      path: '/buggy-tours',
      desc: isAr ? 'Polaris 5 مقاعد و Can-Am 1000cc' : 'Polaris 5-seater & Can-Am 1000cc Turbo'
    },
    {
      title: isAr ? 'السهرة والعشاء البدوي' : 'Bedouin Experience',
      path: '/bedouin-experience',
      desc: isAr ? 'عشاء، شو، وتلسكوب النجوم' : 'Dinner, show & stargazing'
    },
    {
      title: isAr ? 'ركوب الجمال بالصحراء' : 'Camel Riding',
      path: '/camel-riding',
      desc: isAr ? 'قافلة الصحراء الذهبية' : 'Desert caravan'
    },
    {
      title: isAr ? 'ركوب الخيل بسيناء' : 'Horse Riding',
      path: '/horse-riding',
      desc: isAr ? 'مسارات جبلية وشاطئية' : 'Desert & beach trails'
    },
  ];

  const seaLinks = [
    { title: isAr ? 'عرض الدلافين والسباحة مع الدلافين' : 'Dolphin Show & Swim', path: '/dolphin-experience', desc: isAr ? 'عروض استعراضية والسباحة مع الدلافين' : 'Family show & swim pool session' },
    { title: isAr ? 'رحلات اليخوت VIP والجزيرة البيضاء' : 'VIP Yacht Cruises', path: '/yacht-trips', desc: isAr ? 'الجزيرة البيضاء ورأس محمد' : 'White Island & Ras Mohammed' },
    { title: isAr ? 'رحلات السنوركلينج' : 'Snorkeling Trips', path: '/snorkeling', desc: isAr ? 'شعاب جزيرة تيران' : 'Tiran & coral reefs' },
    { title: isAr ? 'غطس السكوبا والغواصة' : 'Scuba Diving', path: '/diving', desc: isAr ? 'غطس استكشافي للمبتدئين' : 'Intro & PADI dives' },
    { title: isAr ? 'طيران الباراشوت' : 'Parasailing Flight', path: '/parasailing', desc: isAr ? 'تحليق فوق خليج نعمة' : 'Fly high over Naama Bay' },
    { title: isAr ? 'الألعاب المائية والبنانا' : 'Banana & Tube Rides', path: '/banana-boat', desc: isAr ? 'ألعاب بحرية ممتعة' : 'Fun water rides' },
  ];

  const moreLinks = [
    { title: isAr ? 'معرض الرحلات والصور' : 'Tour Gallery', path: '/gallery', desc: isAr ? 'صور وفيديوهات من رحلاتنا' : 'Photos & videos of our tours' },
    { title: isAr ? 'خدمات مطار VIP' : 'VIP Airport Service', path: '/airport-vip', desc: isAr ? 'استقبال ووداع خاص بالمطار' : 'Meet & assist VIP service' },
    { title: isAr ? 'خدمة الانتقالات والتوصيل' : 'Hotel Transfers', path: '/transfers', desc: isAr ? 'توصيل خاص بسيارات حديثة' : 'Private & comfortable transfers' },
    { title: isAr ? 'من نحن' : 'About Us', path: '/about', desc: isAr ? 'نبذة عن مجموعة الهنا للسياحة' : 'About El Hana Group' },
    { title: isAr ? 'تواصل معنا' : 'Contact Us', path: '/contact', desc: isAr ? 'خدمة العملاء والدعم على مدار 24/7' : '24/7 Support & Reservations' },
  ];

  const isSafariActive = location.pathname.includes('safari') || location.pathname.includes('atv') || location.pathname.includes('buggy') || location.pathname.includes('bedouin') || location.pathname.includes('camel') || location.pathname.includes('horse');
  const isSeaActive = location.pathname.includes('sea') || location.pathname.includes('yacht') || location.pathname.includes('snorkeling') || location.pathname.includes('diving') || location.pathname.includes('parasailing') || location.pathname.includes('banana') || location.pathname.includes('dolphin');
  const isMoreActive = ['/gallery', '/airport-vip', '/transfers', '/about', '/contact'].includes(location.pathname);

  return (
    <>
      {/* ── HEADER ────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 transform will-change-transform ${
          !mobileNavVisible && !mobileMenuOpen
            ? 'max-lg:-translate-y-full max-lg:opacity-0 pointer-events-none lg:pointer-events-auto lg:translate-y-0 lg:opacity-100'
            : 'translate-y-0 opacity-100'
        } ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl text-slate-900 shadow-lg py-2.5 border-b border-sky-100/80'
            : 'bg-white/85 backdrop-blur-md text-slate-900 py-3 border-b border-sky-100/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group shrink-0" title="El Hana Group">
              <img
                src="/logo.png"
                alt="El Hana Group Logo"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border-2 border-[#0284C7] shadow-md shadow-[#0284C7]/20 group-hover:scale-105 transition duration-300"
              />
              <span className="font-extrabold text-base md:text-lg tracking-tight text-slate-900 group-hover:text-[#0284C7] transition hidden sm:inline-block font-heading">
                El Hana Group
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                to="/"
                className={`px-3 py-2 text-xs font-extrabold rounded-xl transition whitespace-nowrap ${location.pathname === '/' ? 'text-[#0284C7] bg-sky-50' : 'text-slate-700 hover:text-[#0284C7] hover:bg-sky-50/60'}`}
              >
                {t('nav.home')}
              </Link>

              {/* Safari Dropdown */}
              <div className="relative py-1" onMouseEnter={() => setSafariDropdown(true)} onMouseLeave={() => setSafariDropdown(false)}>
                <Link
                  to="/safari"
                  className={`px-3 py-2 text-xs font-extrabold rounded-xl flex items-center gap-1 transition whitespace-nowrap ${isSafariActive ? 'text-[#0284C7] bg-sky-50' : 'text-slate-700 hover:text-[#0284C7] hover:bg-sky-50/60'}`}
                >
                  <span>{t('nav.safari')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${safariDropdown ? 'rotate-180 text-[#0284C7]' : ''}`} />
                </Link>
                {safariDropdown && (
                  <div className={`absolute top-full pt-1.5 w-72 z-[1100] ${isAr ? 'right-0' : 'left-0'}`}>
                    <div className="bg-white backdrop-blur-2xl border border-sky-100 rounded-2xl p-2 shadow-2xl space-y-1">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold text-[#0284C7] tracking-wider border-b border-slate-100">
                        {isAr ? 'مغامرات الصحراء وسيناء' : 'Desert & Sinai Safaris'}
                      </div>
                      {safariLinks.map((item, idx) => (
                        <Link key={idx} to={item.path} onClick={() => setSafariDropdown(false)} className="block px-3 py-2 rounded-xl hover:bg-sky-50 transition group">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7]">{item.title}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sea Trips Dropdown */}
              <div className="relative py-1" onMouseEnter={() => setSeaDropdown(true)} onMouseLeave={() => setSeaDropdown(false)}>
                <Link
                  to="/sea-trips"
                  className={`px-3 py-2 text-xs font-extrabold rounded-xl flex items-center gap-1 transition whitespace-nowrap ${isSeaActive ? 'text-[#0284C7] bg-sky-50' : 'text-slate-700 hover:text-[#0284C7] hover:bg-sky-50/60'}`}
                >
                  <span>{t('nav.seaTrips')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${seaDropdown ? 'rotate-180 text-[#0284C7]' : ''}`} />
                </Link>
                {seaDropdown && (
                  <div className={`absolute top-full pt-1.5 w-72 z-[1100] ${isAr ? 'right-0' : 'left-0'}`}>
                    <div className="bg-white backdrop-blur-2xl border border-sky-100 rounded-2xl p-2 shadow-2xl space-y-1">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold text-[#0284C7] tracking-wider border-b border-slate-100">
                        {isAr ? 'رحلات البحر الأحمر والدلافين' : 'Red Sea & Dolphin Cruises'}
                      </div>
                      {seaLinks.map((item, idx) => (
                        <Link key={idx} to={item.path} onClick={() => setSeaDropdown(false)} className="block px-3 py-2 rounded-xl hover:bg-sky-50 transition group">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7]">{item.title}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/excursions"
                className={`px-3 py-2 text-xs font-extrabold rounded-xl transition whitespace-nowrap ${location.pathname === '/excursions' ? 'text-[#0284C7] bg-sky-50' : 'text-slate-700 hover:text-[#0284C7] hover:bg-sky-50/60'}`}
              >
                <span>{isAr ? 'رحلات سيناء (دهب، كاترين، طابا، نويبع)' : 'Sinai Excursions'}</span>
              </Link>

              <Link
                to="/experiences"
                className={`px-3 py-2 text-xs font-extrabold rounded-xl transition whitespace-nowrap ${location.pathname === '/experiences' ? 'text-[#0284C7] bg-sky-50' : 'text-slate-700 hover:text-[#0284C7] hover:bg-sky-50/60'}`}
              >
                {t('nav.activities')}
              </Link>

              {/* More Dropdown */}
              <div className="relative py-1" onMouseEnter={() => setMoreDropdown(true)} onMouseLeave={() => setMoreDropdown(false)}>
                <button
                  className={`px-3 py-2 text-xs font-extrabold rounded-xl flex items-center gap-1 transition whitespace-nowrap ${isMoreActive ? 'text-[#0284C7] bg-sky-50' : 'text-slate-700 hover:text-[#0284C7] hover:bg-sky-50/60'}`}
                >
                  <span>{isAr ? 'المزيد' : 'More'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdown ? 'rotate-180 text-[#0284C7]' : ''}`} />
                </button>
                {moreDropdown && (
                  <div className={`absolute top-full pt-1.5 w-64 z-[1100] ${isAr ? 'right-0' : 'left-0'}`}>
                    <div className="bg-white backdrop-blur-2xl border border-sky-100 rounded-2xl p-2 shadow-2xl space-y-1">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold text-[#0284C7] tracking-wider border-b border-slate-100">
                        {isAr ? 'الخدمات والمعلومات' : 'Services & Info'}
                      </div>
                      {moreLinks.map((item, idx) => (
                        <Link key={idx} to={item.path} onClick={() => setMoreDropdown(false)} className="block px-3 py-2 rounded-xl hover:bg-sky-50 transition group">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#0284C7]">{item.title}</div>
                          <div className="text-[11px] text-slate-500 font-normal">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop right controls */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <CurrencySwitcher />
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => openAdventureModal()}
                className="bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-extrabold px-5 py-2.5 text-xs md:text-sm tracking-wide rounded-xl shadow-lg shadow-[#0284C7]/25 hover:scale-[1.03] transition duration-300 whitespace-nowrap cursor-pointer"
              >
                <span>{t('nav.bookAdventure')}</span>
              </button>
            </div>

            {/* Mobile header controls (switchers + burger) */}
            <div className="flex lg:hidden items-center gap-1.5">
              <CurrencySwitcher />
              <LanguageSwitcher />
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="p-2 text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#0284C7]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER – 100% FIXED HEADER BAR THAT NEVER SCROLLS AWAY ── */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[99999] flex flex-col bg-white"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: '#ffffff',
          }}
        >
          {/* 1. FIXED TOP HEADER BAR - Cannot scroll! Always stays pinned at top */}
          <div className="w-full h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shadow-xs shrink-0 z-30">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 group"
            >
              <img
                src="/logo.png"
                alt="El Hana Group Logo"
                className="w-9 h-9 rounded-full border-2 border-[#0284C7] object-cover shadow-xs group-hover:scale-105 transition"
              />
              <span className="font-black text-base tracking-tight text-slate-900 group-hover:text-[#0284C7] transition font-heading">
                El Hana Group
              </span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-600 transition duration-200 active:scale-95 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* 2. SCROLLABLE MENU CONTENT (Everything under the fixed header) */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 space-y-2">

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-3 px-3 rounded-xl hover:bg-sky-50 text-[#0284C7] font-bold text-sm border-b border-slate-100"
            >
              {t('nav.home')}
            </Link>

            {/* Safari group */}
            <div className="border-b border-slate-100 pb-2 pt-1">
              <Link
                to="/safari"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-orange-50 transition"
              >
                <span className="text-slate-900 font-extrabold text-sm">{t('nav.safari')}</span>
                <span className="text-[10px] text-[#F97316] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 ml-2 rtl:mr-2 rtl:ml-0 shrink-0 font-bold">
                  {isAr ? 'رحلات الصحراء' : 'Desert Safaris'}
                </span>
              </Link>
              <div className="mt-1 space-y-0.5 pl-3 rtl:pr-3 rtl:pl-0">
                {safariLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col py-2.5 px-3 rounded-xl hover:bg-orange-50 transition"
                  >
                    <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    <span className="text-[11px] text-slate-500">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sea Trips group */}
            <div className="border-b border-slate-100 pb-2 pt-1">
              <Link
                to="/sea-trips"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-sky-50 transition"
              >
                <span className="text-slate-900 font-extrabold text-sm">{t('nav.seaTrips')}</span>
                <span className="text-[10px] text-[#0284C7] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 ml-2 rtl:mr-2 rtl:ml-0 shrink-0 font-bold">
                  {isAr ? 'الأنشطة البحرية' : 'Sea Cruises'}
                </span>
              </Link>
              <div className="mt-1 space-y-0.5 pl-3 rtl:pr-3 rtl:pl-0">
                {seaLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col py-2.5 px-3 rounded-xl hover:bg-sky-50 transition"
                  >
                    <span className="text-xs font-bold text-slate-800">{item.title}</span>
                    <span className="text-[11px] text-slate-500">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/excursions"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-3 px-3 rounded-xl hover:bg-slate-50 text-slate-800 font-bold text-sm border-b border-slate-100"
            >
              {isAr ? 'رحلات سيناء (دهب، كاترين، طابا، نويبع)' : 'Sinai Excursions (Dahab, Taba...)'}
            </Link>

            <Link
              to="/experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-3 px-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-sm border-b border-slate-100"
            >
              {t('nav.activities')}
            </Link>

            {moreLinks.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex flex-col py-3 px-3 rounded-xl hover:bg-slate-50 transition border-b border-slate-100"
              >
                <span className="text-sm font-bold text-slate-800">{item.title}</span>
                <span className="text-[11px] text-slate-500">{item.desc}</span>
              </Link>
            ))}

            {/* CTA buttons */}
            <div className="space-y-3 pt-5 pb-8">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAdventureModal();
                }}
                className="w-full py-4 bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-extrabold rounded-2xl flex items-center justify-center shadow-xl shadow-[#0284C7]/20 transition text-sm cursor-pointer"
              >
                {t('nav.bookAdventure')}
              </button>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#25D366] hover:bg-[#22c55e] text-white font-bold rounded-2xl flex items-center justify-center shadow-xl transition text-sm cursor-pointer"
              >
                {t('common.askWhatsapp')}
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
