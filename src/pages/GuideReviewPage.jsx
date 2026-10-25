import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Star, Send, CheckCircle2, ShieldCheck, UserCheck, HeartHandshake, Phone, ArrowLeft, Clock, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/common/SEOHead';
import { getGuides, getGuideById, submitGuideReview } from '../services/guidesService';
import { EXPERIENCES } from '../data/experiences';

export const GuideReviewPage = () => {
  const { currentLang } = useLanguage();
  const isAr = currentLang === 'ar';
  const [searchParams] = useSearchParams();
  const queryGuideId = searchParams.get('guideId') || searchParams.get('id');

  const [guides, setGuides] = useState([]);
  const [selectedGuideId, setSelectedGuideId] = useState(queryGuideId || '');
  const [selectedGuide, setSelectedGuide] = useState(null);

  // Ratings
  const [overallRating, setOverallRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [punctuality, setPunctuality] = useState(5);
  const [knowledge, setKnowledge] = useState(5);
  const [hospitality, setHospitality] = useState(5);
  const [safety, setSafety] = useState(5);

  // Form Fields
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCountry, setClientCountry] = useState('');
  const [tourTaken, setTourTaken] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const list = getGuides();
    setGuides(list);

    if (queryGuideId) {
      const g = list.find(item => item.id === queryGuideId);
      if (g) {
        setSelectedGuideId(g.id);
        setSelectedGuide(g);
      }
    } else if (list.length > 0 && !selectedGuideId) {
      setSelectedGuideId(list[0].id);
      setSelectedGuide(list[0]);
    }
  }, [queryGuideId]);

  useEffect(() => {
    if (selectedGuideId && guides.length > 0) {
      const g = guides.find(item => item.id === selectedGuideId);
      setSelectedGuide(g || null);
    }
  }, [selectedGuideId, guides]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGuide) return;

    const review = {
      guideId: selectedGuide.id,
      guideName: selectedGuide.name,
      clientName: clientName.trim() || (isAr ? 'زائر' : 'Guest'),
      clientPhone: clientPhone.trim() || 'N/A',
      clientCountry: clientCountry.trim() || 'N/A',
      tourTaken: tourTaken.trim() || (isAr ? 'رحلة سياحية' : 'Tour'),
      rating: overallRating,
      punctuality,
      knowledge,
      hospitality,
      safety,
      comment: comment.trim(),
      feedback: comment.trim()
    };

    submitGuideReview(review);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-28 pb-20 bg-gradient-to-b from-sky-50/60 via-white to-slate-50 min-h-screen text-slate-900">
      <SEOHead
        title={isAr ? "تقييم المرشد السياحي | مجموعة الهنا" : "Tour Guide Review | El Hana Group"}
        description={isAr ? "شاركنا رأيك وتقييمك السري للمرشد السياحي الذي رافقك خلال رحلتك." : "Rate your tour guide privately to help us maintain 5-star service quality."}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-emerald-100 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto border-4 border-emerald-100 shadow-md animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
                {isAr ? 'شكراً جزيلاً لتقييمك!' : 'Thank You for Your Feedback!'}
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {isAr
                  ? `تم استلام تقييمك الخاص بالمرشد (${selectedGuide?.name || 'المرشد'}) بنجاح، ووصل مباشرةً إلى إدارة مجموعة الهنا. رأيك يساعدنا دوماً على تقديم أعلى مستويات الخدمة والراحة لضيوفنا.`
                  : `Your review for (${selectedGuide?.name || 'Guide'}) has been received and sent directly to management. Your feedback ensures 5-star experiences.`}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isAr ? 'تقييمك سري ومحفوظ للإدارة فقط' : 'Your review is strictly private to management'}</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition"
              >
                {isAr ? 'العودة للرئيسية' : 'Return Home'}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setComment('');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition cursor-pointer"
              >
                {isAr ? 'إرسال تقييم آخر' : 'Submit Another Review'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Header Title */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 font-extrabold text-xs uppercase tracking-wider border border-amber-500/20">
                <Award className="w-3.5 h-3.5" />
                <span>{isAr ? 'تقييم جودة الخدمة والمرافقين' : 'Guide Performance Rating'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black font-heading text-slate-900">
                {isAr ? 'تقييم المرشد السياحي' : 'Rate Your Tour Guide'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                {isAr
                  ? 'رأيك يهمنا جداً! تقييمك سري ومباشر للإدارة لمساعدتنا في مكافأة المتميزين وتطوير الأداء.'
                  : 'Your honest feedback goes directly to management to ensure premium quality standards.'}
              </p>
            </div>

            {/* Guide Profile Card */}
            {selectedGuide && (
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                <img
                  src={selectedGuide.photo}
                  alt={selectedGuide.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#0284C7] shadow-md shadow-sky-500/15 shrink-0"
                />
                <div className="text-center sm:text-right rtl:sm:text-right space-y-1.5 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                      {isAr ? selectedGuide.name : (selectedGuide.nameEn || selectedGuide.name)}
                    </h2>
                    <span className="inline-block text-[11px] font-bold text-[#0284C7] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 self-center sm:self-auto">
                      {selectedGuide.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {isAr ? selectedGuide.specialty : (selectedGuide.specialtyEn || selectedGuide.specialty)}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-1 flex-wrap pt-1 text-[11px] text-slate-500">
                    <span className="font-bold">{isAr ? 'اللغات:' : 'Languages:'}</span>
                    {selectedGuide.languages?.map((lang, idx) => (
                      <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded-md font-semibold text-slate-700">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* If multiple guides, allow choosing */}
            {guides.length > 1 && (
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                <label className="text-xs font-bold text-slate-700 shrink-0">
                  {isAr ? 'تغيير المرشد:' : 'Select Guide:'}
                </label>
                <select
                  value={selectedGuideId}
                  onChange={(e) => setSelectedGuideId(e.target.value)}
                  className="w-full max-w-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0284C7]"
                >
                  {guides.map((g) => (
                    <option key={g.id} value={g.id}>
                      {isAr ? g.name : (g.nameEn || g.name)} ({isAr ? g.specialty : g.specialtyEn})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Review Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">

              {/* Overall Star Rating */}
              <div className="text-center space-y-2 pb-4 border-b border-slate-100">
                <label className="text-sm font-extrabold text-slate-800 block">
                  {isAr ? 'التقييم العام للمرشد' : 'Overall Guide Rating'}
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setOverallRating(star)}
                      className="p-1 cursor-pointer transition transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-9 h-9 sm:w-10 sm:h-10 ${
                          (hoverRating || overallRating) >= star
                            ? 'text-amber-400 fill-amber-400 drop-shadow-md'
                            : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-xs font-bold text-amber-600">
                  {overallRating === 5 && (isAr ? 'ممتاز جداً 🌟🌟🌟🌟🌟' : 'Excellent 🌟🌟🌟🌟🌟')}
                  {overallRating === 4 && (isAr ? 'جيد جداً 👍' : 'Very Good 👍')}
                  {overallRating === 3 && (isAr ? 'متوسط 👌' : 'Average 👌')}
                  {overallRating <= 2 && (isAr ? 'يحتاج إلى تحسين ⚠️' : 'Needs Improvement ⚠️')}
                </div>
              </div>

              {/* Sub-Criteria Breakdown */}
              <div className="space-y-3.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  {isAr ? 'تقييم معايير الرحلة بالتفصيل:' : 'Detailed Rating Criteria:'}
                </div>

                {/* 1. Punctuality */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-slate-700">
                    {isAr ? 'الالتزام بالمواعيد والوقت' : 'Punctuality & Timekeeping'}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setPunctuality(s)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${punctuality >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Knowledge & Explanation */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-slate-700">
                    {isAr ? 'المعلومات والشرح والأسلوب' : 'Knowledge & Explanations'}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setKnowledge(s)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${knowledge >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Hospitality & Politeness */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-slate-700">
                    {isAr ? 'اللباقة وحسن الاستقبال والأمانة' : 'Hospitality & Politeness'}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setHospitality(s)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${hospitality >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Safety & Guest Care */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-slate-700">
                    {isAr ? 'الأمان والسلامة والاهتمام بالضيوف' : 'Safety & Care'}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSafety(s)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${safety >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isAr ? 'اسمك الكريم (اختياري)' : 'Your Name (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={isAr ? "مثال: م. أحمد عبد الله" : "e.g. John Doe"}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isAr ? 'رقم الهاتف / واتساب (اختياري للتواصل)' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+20 100 000 0000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isAr ? 'الدولة / الجنسية' : 'Country'}
                  </label>
                  <input
                    type="text"
                    value={clientCountry}
                    onChange={(e) => setClientCountry(e.target.value)}
                    placeholder={isAr ? "مثال: مصر، السعودية، إيطاليا..." : "e.g. UK, Germany..."}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {isAr ? 'الرحلة التي رافقك بها' : 'Tour Taken'}
                  </label>
                  <select
                    value={tourTaken}
                    onChange={(e) => setTourTaken(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white transition"
                  >
                    <option value="">{isAr ? 'اختر الرحلة...' : 'Select tour...'}</option>
                    <option value="سفاري بيتش باجي وكار باجي">{isAr ? 'سفاري بيتش باجي وكار باجي' : 'ATV / Buggy Safari'}</option>
                    <option value="العشاء البدوي والحفلة">{isAr ? 'العشاء البدوي والحفلة' : 'Bedouin Dinner & Show'}</option>
                    <option value="يخت VIP الجزيرة البيضاء">{isAr ? 'يخت VIP الجزيرة البيضاء' : 'VIP Yacht Cruise'}</option>
                    <option value="غوص السكوبا وسنوركلينج">{isAr ? 'غوص السكوبا وسنوركلينج' : 'Scuba Diving / Snorkeling'}</option>
                    <option value="رحلة دهب والبلو هول">{isAr ? 'رحلة دهب والبلو هول' : 'Dahab & Blue Hole'}</option>
                    <option value="سانت كاترين وجبل موسى">{isAr ? 'سانت كاترين وجبل موسى' : 'St. Catherine & Mount Sinai'}</option>
                    <option value="عروض الدلافين">{isAr ? 'عروض الدلافين' : 'Dolphin Experience'}</option>
                    <option value="أخرى">{isAr ? 'رحلة أخرى' : 'Other'}</option>
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isAr ? 'رأيك وملاحظاتك الشخصية على أداء المرشد' : 'Comments and Observations'}
                </label>
                <textarea
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={isAr ? "اكتب تعليقك بصراحة... هل كان متعاوناً؟ هل لديك أي ملاحظة ترغب في إيصالها للإدارة؟" : "Share your honest feedback. Was the guide helpful? Any recommendations?"}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#0284C7] focus:bg-white transition"
                ></textarea>
              </div>

              {/* Secret Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                <span>
                  {isAr
                    ? '🔒 تنبيه: هذه التقييمات سرية ومحمية تماماً ولا يطلع عليها إلا إدارة مجموعة الهنا مباشرةً لضمان المصداقية.'
                    : '🔒 Confidential: These reviews are private and accessible exclusively by management.'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0284C7] via-[#0369A1] to-[#075985] text-white font-extrabold text-sm shadow-xl shadow-sky-600/25 hover:shadow-sky-600/40 hover:scale-[1.01] transition transform cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'إرسال التقييم السري للإدارة' : 'Submit Private Review to Management'}</span>
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};

export default GuideReviewPage;
