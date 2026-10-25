import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionTitle } from '../components/common/SectionTitle';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { contactApi } from '../services/api/contactApi';
import { Mail, MapPin, MessageCircle, Clock, Send, Phone, Camera, Share2 } from 'lucide-react';
import { getWhatsAppLink, WHATSAPP_DISPLAY, CALL_DISPLAY, CALL_PHONE } from '../components/common/WhatsAppButton';
import { GoogleMapLocation } from '../components/common/GoogleMapLocation';

export const ContactUsPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const res = await contactApi.sendMessage(data);
      showToast(res.message || (isAr ? 'تم إرسال رسالتك بنجاح! سنتردد عليك فوراً.' : 'Message sent successfully!'), 'success');
      reset();
    } catch (err) {
      showToast(isAr ? 'تعذر إرسال الرسالة، يرجى التواصل عبر الواتساب.' : 'Failed to submit form. Please contact via WhatsApp.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-sky-50 via-white to-orange-50/60 relative overflow-hidden text-slate-900">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none"></div>

      <SEOHead
        title={isAr ? "اتصل بنا | مجموعة الهنا للسياحة والسفاري بشرم الشيخ" : "Contact Us | El Hana Group Sharm El Sheikh"}
        description={isAr ? "تواصل مع فريق مجموعة الهنا في شرم الشيخ عبر الواتساب أو الهاتف للاستفسار وحجز رحلات السفاري واليخوت." : "Get in touch with El Hana Group in Sharm El Sheikh via WhatsApp, Phone, or Email for custom adventure bookings and hotel transfers."}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <Breadcrumbs items={[{ label: t('nav.contact') }]} />

        <SectionTitle
          badge={isAr ? "تواصل معنا" : "Get In Touch"}
          title={isAr ? "نحن هنا لمساعدتك في التخطيط لعطلتك" : "We Are Here to Assist Your Vacation"}
          subtitle={isAr ? "هل لديك استفسار عن رحلات البيتش باجي، اليخوت، أو التوصيل؟ تواصل مع فريقنا المحلي في أي وقت." : "Have questions about quad biking, yacht charters, or hotel transfers? Contact our local team anytime."}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Info Cards */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6 border border-sky-400/30 shadow-2xl">
              <h3 className="text-xl font-bold font-heading text-white">{isAr ? "معلومات التواصل المباشر" : "Direct Contact"}</h3>

              <div className="space-y-4 text-xs text-slate-300">
                {/* WhatsApp */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 transition group border border-emerald-500/30"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
                  </div>
                  <div>
                    <div className="font-bold text-emerald-300 group-hover:text-emerald-200">{isAr ? "واتساب مباشر للحجز" : "WhatsApp Direct Booking"}</div>
                    <div className="text-[11px] text-slate-200 font-semibold font-mono" dir="ltr">{WHATSAPP_DISPLAY} (+201044790588)</div>
                  </div>
                </a>

                {/* Direct Phone Call */}
                <a
                  href={`tel:${CALL_PHONE}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/80 hover:bg-[#0284C7]/20 transition group border border-slate-700"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white flex items-center justify-center font-bold shrink-0 shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white group-hover:text-[#38BDF8]">{isAr ? "اتصال هاتفي مباشر" : "Direct Phone Call"}</div>
                    <div className="text-[11px] text-slate-300 font-semibold font-mono" dir="ltr">{CALL_DISPLAY} (+20110077330)</div>
                  </div>
                </a>

                {/* Social Media Links */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://web.facebook.com/profile.php?id=61583787661164"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1877F2]/15 border border-[#1877F2]/30 hover:bg-[#1877F2]/30 text-white text-xs font-bold transition"
                  >
                    <Share2 className="w-4 h-4 text-[#1877F2]" />
                    <span>فيسبوك</span>
                  </a>

                  <a
                    href="https://www.instagram.com/el_hana_group/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-amber-500/15 to-purple-600/15 border border-purple-500/30 hover:border-purple-500/60 text-white text-xs font-bold transition"
                  >
                    <Camera className="w-4 h-4 text-pink-400" />
                    <span>إنستغرام</span>
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 text-[#38BDF8] flex items-center justify-center font-bold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{isAr ? "البريد الإلكتروني" : "Email Us"}</div>
                    <div className="text-[11px] text-slate-400 font-mono">info@elhanagroup.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-[#0284C7]/20 text-[#38BDF8] flex items-center justify-center font-bold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{isAr ? "مقر الشركة وموقعنا" : "Local Office & Location"}</div>
                    <div className="text-[11px] text-slate-300 font-bold">{isAr ? "منطقة السفاري، شرم الشيخ، مصر" : "Safari Area, Sharm El Sheikh, Egypt"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-[#F97316]/20 text-[#F97316] flex items-center justify-center font-bold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{isAr ? "ساعات العمل" : "Working Hours"}</div>
                    <div className="text-[11px] text-slate-400">{isAr ? "7 أيام في الأسبوع: 07:00 ص – 11:30 م" : "7 Days a Week: 07:00 AM – 11:30 PM"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-sky-100 shadow-xl space-y-6">
            <h3 className="text-2xl font-bold font-heading text-slate-900">{isAr ? "أرسل لنا رسالة فورية" : "Send Us a Message"}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{t('checkout.fullName')} *</label>
                  <input
                    type="text"
                    {...register('fullName', { required: true })}
                    placeholder={isAr ? "أحمد محمود" : "John Doe"}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                  />
                  {errors.fullName && <p className="text-[10px] text-red-500">{isAr ? 'الاسم مطلوب' : 'Full name is required'}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{t('checkout.email')} *</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    placeholder="example@mail.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                  />
                  {errors.email && <p className="text-[10px] text-red-500">{isAr ? 'البريد الإلكتروني مطلوب' : 'Email address is required'}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{t('checkout.whatsapp')}</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    placeholder="+20 100 123 4567"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{t('checkout.hotelName')}</label>
                  <input
                    type="text"
                    {...register('hotelName')}
                    placeholder={isAr ? "مثال: ريكسوس، الباتروس..." : "e.g. Rixos, Albatros..."}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">{isAr ? "كيف يمكننا مساعدتك؟ *" : "How Can We Help You? *"}</label>
                <textarea
                  rows="4"
                  {...register('message', { required: true })}
                  placeholder={isAr ? "اكتب تفاصيل الرحلة المراد حجزها أو التاريخ أو استفسارك..." : "Tell us what activity you'd like to book, date, or any special requests..."}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:border-[#0284C7]"
                ></textarea>
                {errors.message && <p className="text-[10px] text-red-500">{isAr ? 'الرسالة مطلوبة' : 'Please enter a message'}</p>}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={submitting}
                className="w-full md:w-auto"
                icon={Send}
              >
                {submitting ? (isAr ? 'جاري الإرسال...' : 'Sending Message...') : (isAr ? 'إرسال الرسالة' : 'Send Message')}
              </Button>
            </form>
          </div>

        </div>

        {/* Interactive Google Map Hub */}
        <div className="pt-6">
          <GoogleMapLocation defaultLocationId="naama" />
        </div>

      </div>
    </div>
  );
};

export default ContactUsPage;
