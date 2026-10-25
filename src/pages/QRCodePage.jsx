import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Share2, Download, Printer, ExternalLink, QrCode, UserCheck, Compass, Check, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/common/SEOHead';
import { getGuides } from '../services/guidesService';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';

export const QRCodePage = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang || 'en';
  const isAr = lang === 'ar';

  const [activeTab, setActiveTab] = useState('guides'); // 'guides' | 'tours' | 'general'
  const [guides, setGuides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    setGuides(getGuides());
  }, []);

  const origin = window.location.origin;

  const copyLink = (url, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const shareLink = (url, title) => {
    if (navigator.share) {
      navigator.share({ title, url });
    } else {
      copyLink(url, title);
    }
  };

  // Filtered Lists
  const filteredGuides = guides.filter(g =>
    (g.name + ' ' + (g.nameEn || '') + ' ' + g.specialty).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const localizedTours = EXPERIENCES.map(e => getLocalizedExperience(e, lang));
  const filteredTours = localizedTours.filter(t =>
    (t.title + ' ' + (t.categoryLabel || '')).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-28 pb-20 bg-gradient-to-b from-sky-50/60 via-slate-50 to-white min-h-screen text-slate-900">
      <SEOHead
        title={isAr ? "مركز رموز QR لتقييم الرحلات والمرشدين | مجموعة الهنا" : "QR Code Center for Tours & Guides | El Hana Group"}
        description={isAr ? "مسح وتحميل رموز QR الذكية لتقييم كل رحلة وكل مرشد سياحي بصورة مستقلة ومباشرة." : "Scan, download, and share dedicated QR codes for each tour and guide."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0284C7]/10 border border-[#0284C7]/30 text-[#0284C7] font-extrabold text-xs uppercase tracking-wider">
            <QrCode className="w-4 h-4" />
            <span>{isAr ? "نظام التقييم الذكي بـ QR Code" : "Smart QR Review System"}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading text-slate-900">
            {isAr ? "رموز QR المخصصة للرحلات والمرشدين" : "Dedicated QR Codes for Tours & Guides"}
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            {isAr
              ? "لكل رحلة ولكل مرشد سياحي كود QR خاص به. دَع العميل يمسحه بكاميرا هاتفه في نهاية الرحلة أو في الحافلة لترك تقييمه مباشرةً."
              : "Every tour and guide has a dedicated QR code. Customers can scan directly to leave their private review."}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <button
              onClick={() => setActiveTab('guides')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                activeTab === 'guides'
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{isAr ? "كيو آر كود المرشدين" : "Guides QR Codes"}</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-white/20">{guides.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('tours')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                activeTab === 'tours'
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{isAr ? "كيو آر كود كل رحلة" : "Tours QR Codes"}</span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-white/20">{EXPERIENCES.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{isAr ? "التقييم العام" : "General QR"}</span>
            </button>
          </div>
        </div>

        {/* Search Bar (Guides & Tours) */}
        {activeTab !== 'general' && (
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isAr ? (activeTab === 'guides' ? "ابحث باسم المرشد أو التخصص..." : "ابحث باسم الرحلة...") : "Search..."}
              className="w-full px-4 py-3 pr-10 rtl:pr-10 rtl:pl-4 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:border-[#0284C7]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 rtl:right-auto rtl:left-3.5 top-3.5" />
          </div>
        )}

        {/* ── TAB 1: GUIDES QR CODES ────────────────────────────── */}
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => {
              const reviewUrl = `${origin}/review-guide?guideId=${guide.id}`;
              const isCopied = copiedId === guide.id;

              return (
                <div
                  key={guide.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  {/* Guide Header */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                    <img
                      src={guide.photo}
                      alt={guide.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-sky-500 shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-base font-black text-slate-900 truncate">
                          {isAr ? guide.name : (guide.nameEn || guide.name)}
                        </h3>
                      </div>
                      <p className="text-xs text-[#0284C7] font-bold truncate">
                        {isAr ? guide.specialty : (guide.specialtyEn || guide.specialty)}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {guide.badge}
                      </span>
                    </div>
                  </div>

                  {/* QR Code Container */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center space-y-3">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 inline-block">
                      <QRCodeSVG
                        id={`qr-guide-${guide.id}`}
                        value={reviewUrl}
                        size={170}
                        bgColor={"#ffffff"}
                        fgColor={"#0f172a"}
                        level={"H"}
                        includeMargin={false}
                      />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-500 text-center">
                      {isAr ? "امسح لتقييم هذا المرشد سرياً" : "Scan to review this guide"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => copyLink(reviewUrl, guide.id)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{isCopied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'مشاركة' : 'Share')}</span>
                    </button>

                    <a
                      href={reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0284C7] font-bold text-xs transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isAr ? 'فتح الصفحة' : 'Open Page'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TAB 2: TOURS QR CODES ─────────────────────────────── */}
        {activeTab === 'tours' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => {
              const reviewUrl = `${origin}/leave-review?tour=${tour.slug}`;
              const isCopied = copiedId === tour.slug;

              return (
                <div
                  key={tour.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  {/* Tour Header */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                    <img
                      src={tour.images?.[0] || '/images/real/atv-quad.jpg'}
                      alt={tour.title}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-[#0284C7] shadow-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-sky-50 text-[#0284C7] border border-sky-100 mb-0.5">
                        {tour.categoryLabel}
                      </span>
                      <h3 className="text-sm font-black text-slate-900 truncate">
                        {tour.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-bold">
                        {isAr ? `يبدأ من $${tour.startingPrice}` : `From $${tour.startingPrice}`}
                      </p>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center justify-center space-y-3">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 inline-block">
                      <QRCodeSVG
                        id={`qr-tour-${tour.slug}`}
                        value={reviewUrl}
                        size={170}
                        bgColor={"#ffffff"}
                        fgColor={"#0f172a"}
                        level={"H"}
                        includeMargin={false}
                      />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-500 text-center">
                      {isAr ? "كيو آر كود مخصص لتقييم هذه الرحلة" : "Dedicated QR to review this tour"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => copyLink(reviewUrl, tour.slug)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{isCopied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'مشاركة' : 'Share')}</span>
                    </button>

                    <a
                      href={reviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0284C7] font-bold text-xs transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isAr ? 'معاينة النموذج' : 'Preview Form'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TAB 3: GENERAL REVIEW QR ──────────────────────────── */}
        {activeTab === 'general' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-center space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                {isAr ? "كود التقييم العام للشركة" : "General Company Review QR"}
              </h2>
              <p className="text-xs text-slate-500">
                {isAr ? "كود عام لتقييم أي رحلة من رحلات مجموعة الهنا" : "Universal review link for all El Hana Group experiences"}
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 inline-block shadow-inner">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 inline-block">
                <QRCodeSVG
                  value={`${origin}/leave-review`}
                  size={220}
                  bgColor={"#ffffff"}
                  fgColor={"#0f172a"}
                  level={"H"}
                  includeMargin={false}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => shareLink(`${origin}/leave-review`, 'El Hana Group Review')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>{isAr ? "مشاركة الرابط العام" : "Share General Link"}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default QRCodePage;
