import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Star, Send, CheckCircle2, Phone, Compass, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEOHead } from '../components/common/SEOHead';
import { WHATSAPP_PHONE } from '../components/common/WhatsAppButton';
import { notificationsApi } from '../services/api/notificationsApi';
import { EXPERIENCES, getLocalizedExperience } from '../data/experiences';

const LeaveReviewPage = () => {
  const { currentLang, isRTL } = useLanguage();
  const lang = currentLang || 'en';
  const isAr = lang === 'ar';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tourSlug = searchParams.get('tour') || '';
  const rawTour = EXPERIENCES.find(e => e.slug === tourSlug || e.id === tourSlug);
  const selectedTour = rawTour ? getLocalizedExperience(rawTour, lang) : null;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    phone: '',
    reviewText: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [deviceId, setDeviceId] = useState('');

  // Generate or retrieve a unique "Device ID" / "User ID" to act as a pseudo-login token
  useEffect(() => {
    let id = localStorage.getItem('elhana_user_id');
    if (!id) {
      id = 'USER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      localStorage.setItem('elhana_user_id', id);
    }
    setDeviceId(id);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      id: Date.now(),
      deviceId: deviceId,
      name: formData.name || 'Guest',
      country: formData.country || 'International',
      phone: formData.phone || 'N/A',
      tourSlug: tourSlug || null,
      tourTitle: selectedTour?.title || null,
      date: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
      rating: rating,
      text: {
        en: formData.reviewText,
        ar: formData.reviewText,
        ru: formData.reviewText,
        it: formData.reviewText,
        de: formData.reviewText,
        es: formData.reviewText
      },
      avatar: `https://i.pravatar.cc/150?u=${deviceId}`
    };

    const existingReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    localStorage.setItem('userReviews', JSON.stringify([newReview, ...existingReviews]));

    // Send background alert
    notificationsApi.sendReviewNotification(newReview);

    const message = `*🌟 New Client Review Submitted!*\n\n*ID:* ${deviceId}\n*Name:* ${newReview.name}\n*Phone:* ${newReview.phone}\n*Country:* ${newReview.country}\n*Rating:* ${rating} Stars\n*Review:* "${formData.reviewText}"`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE.replace('+', '')}?text=${encodeURIComponent(message)}`;

    setSubmitted(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      navigate('/');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-slate-100">
          <div className="w-24 h-24 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6 border-8 border-emerald-100/50">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
            {lang === 'ar' ? 'شكراً لتقييمك!' : 'Thank you for your review!'}
          </h2>
          <p className="text-slate-500 mb-6 font-medium text-lg leading-relaxed">
            {lang === 'ar' 
              ? 'تم استلام تقييمك بنجاح. رأيك يساعدنا دائماً لنكون الأفضل، نراك مجدداً قريباً.' 
              : 'Your review was submitted successfully. Your feedback helps us grow. See you soon!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-24 sm:pt-28 pb-12" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead 
        title={lang === 'ar' ? 'أضف تقييمك | الهناء جروب' : 'Leave a Review | El Hana Group'}
        description="Share your feedback about your desert safari or sea trip experience in Sharm El Sheikh."
      />
      
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-[#0f172a] px-6 py-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img
               src={selectedTour?.images?.[0] || "/images/real/atv-quad.jpg"}
               alt="Review Cover"
               className="w-full h-full object-cover filter brightness-[0.35] contrast-125 transition-transform duration-1000 hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-sm mx-auto space-y-1">
            {selectedTour && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>{selectedTour.title}</span>
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              {selectedTour
                ? (isAr ? `تقييم: ${selectedTour.title}` : `Rate: ${selectedTour.title}`)
                : (lang === 'ar' ? 'كيف كانت تجربتك؟' : 'How was your experience?')}
            </h1>
            <p className="text-sky-200 text-sm font-medium opacity-90">
              {lang === 'ar' ? 'رأيك يصنع الفارق ويساعدنا على تقديم أروع الرحلات' : 'Your feedback helps us provide the best tours'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Star Rating Select */}
          <div className="text-center space-y-3 pb-5 border-b border-slate-100">
            <label className="block text-sm font-extrabold text-[#0284C7] uppercase tracking-wider">
              {lang === 'ar' ? 'اضغط لتقييم الرحلة' : 'Tap to rate'}
            </label>
            <div className="flex items-center justify-center gap-2" dir="ltr">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform ${
                    star <= (hoverRating || rating)
                      ? 'bg-gradient-to-br from-amber-100 to-amber-50 text-amber-500 scale-110 shadow-lg border border-amber-200'
                      : 'bg-slate-50 text-slate-300 hover:bg-slate-100 border border-slate-100'
                  }`}
                >
                  <Star className={`w-6 h-6 ${star <= (hoverRating || rating) ? 'fill-amber-500' : ''}`} />
                </button>
              ))}
            </div>
            <p className="text-amber-500 font-extrabold text-sm mt-1">
              {rating === 5 && (lang === 'ar' ? 'ممتاز!' : 'Excellent!')}
              {rating === 4 && (lang === 'ar' ? 'جيد جداً!' : 'Very Good!')}
              {rating === 3 && (lang === 'ar' ? 'مقبول' : 'Average')}
              {rating < 3 && (lang === 'ar' ? 'نأسف لذلك' : 'We are sorry')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={lang === 'ar' ? 'اكتب اسمك' : 'Your Name'}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">{lang === 'ar' ? 'دولة الإقامة' : 'Country'}</label>
              <input
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                placeholder={lang === 'ar' ? 'مثال: مصر، روسيا..' : 'Your Country'}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'ar' ? 'رقم الهاتف (الواتساب)' : 'WhatsApp Number'}</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              dir="ltr"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+20 1xxxxxxxxx"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
            />
            <p className="text-[11px] text-slate-400">{lang === 'ar' ? 'رقمك في أمان ويستخدم فقط للتحقق من هويتك' : 'Your number is secure & used only for verification'}</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">{lang === 'ar' ? 'كيف كانت الرحلة؟' : 'Your Review'}</label>
            <textarea
              name="reviewText"
              required
              rows="3"
              value={formData.reviewText}
              onChange={handleChange}
              placeholder={lang === 'ar' ? 'شاركنا تفاصيل تجربتك...' : 'Share the details of your experience...'}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#0284C7] hover:bg-[#0369a1] text-white font-bold text-base py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <span>{lang === 'ar' ? 'نشر التقييم' : 'Submit Review'}</span>
            <Send className="w-5 h-5" />
          </button>

        </form>
      </div>
    </div>
  );
};

export default LeaveReviewPage;
