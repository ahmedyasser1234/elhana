import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Car,
  Users,
  Briefcase,
  MapPin,
  Clock,
  ShieldCheck,
  PlaneTakeoff,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { VEHICLE_TYPES } from '../../data/transfers';

export const TransfersSection = () => {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const isAr = i18n.language === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const popularRoutes = [
    {
      from: isAr ? 'مطار شرم الشيخ' : 'Sharm Airport',
      to: isAr ? 'خليج نعمة / الهضبة' : 'Naama Bay / Hadaba',
      price: 15,
      time: isAr ? '15 - 20 دقيقة' : '15-20 mins'
    },
    {
      from: isAr ? 'مطار شرم الشيخ' : 'Sharm Airport',
      to: isAr ? 'خليج نبق' : 'Nabq Bay',
      price: 20,
      time: isAr ? '15 دقيقة' : '15 mins'
    },
    {
      from: isAr ? 'شرم الشيخ' : 'Sharm El Sheikh',
      to: isAr ? 'دهب (الممشى والبلو هول)' : 'Dahab Town & Blue Hole',
      price: 40,
      time: isAr ? 'ساعة و 15 دقيقة' : '1h 15m'
    },
    {
      from: isAr ? 'شرم الشيخ' : 'Sharm El Sheikh',
      to: isAr ? 'سانت كاترين وجبل موسى' : 'Saint Catherine & Mount Sinai',
      price: 65,
      time: isAr ? 'ساعتان ونصف' : '2.5 hours'
    },
    {
      from: isAr ? 'شرم الشيخ' : 'Sharm El Sheikh',
      to: isAr ? 'مارينا ويخوت البحرية' : 'Sharm Marine Port & Yachts',
      price: 15,
      time: isAr ? '15 دقيقة' : '15 mins'
    }
  ];

  const guarantees = [
    {
      icon: Clock,
      title: isAr ? 'استقبال بالمطار وتتبع الطيران' : 'Flight Tracking & Airport Meet',
      desc: isAr ? 'سائق خاص ينتظرك بلافتة اسمك بصالة الوصول مع انتظار مجاني حتى هبوط الطائرة' : 'Personal chauffeur with name sign at arrival hall & free wait time'
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'أسعار ثابتة ومحددة مسبقاً' : 'Fixed Pre-Agreed Rates',
      desc: isAr ? 'شاملة البنزين ورسوم البوابات والانتظار بدون أي زيادات أو عدادات مفاجئة' : 'All-inclusive prices: fuel, toll gates, and luggage with zero surprise fees'
    },
    {
      icon: Users,
      title: isAr ? 'سائقون محترفون ومرخصون' : 'Licensed Tour Chauffeurs',
      desc: isAr ? 'سائقون ذوو خبرة بجميع طرق ومدن جنوب سيناء بأعلى معايير الأمان واللباقة' : 'Polite, experienced professional drivers certified for South Sinai tourist routes'
    }
  ];

  return (
    <div className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-sky-50/40 via-white to-orange-50/40 text-slate-800 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F97316]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-[#0284C7] text-xs font-black uppercase tracking-wider border border-sky-200 shadow-xs">
            <PlaneTakeoff className="w-3.5 h-3.5" />
            <span>{isAr ? 'انتقالات خاصة 24/7 داخل جنوب سيناء' : '24/7 South Sinai Private Transfers'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
            {isAr ? 'انتقالات سريعة ومريحة داخل جنوب سيناء' : 'Private Transfers Across South Sinai'}{' '}
            <span className="text-[#0284C7]">{isAr ? 'وشرم الشيخ' : '& Sharm El Sheikh'}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            {isAr
              ? 'توصيل VIP بأسعار ثابتة ومحددة مسبقاً بين مطار شرم الشيخ وجميع الفنادق والمنتجعات، ورحلات سياحية خاصة إلى دهب وسانت كاترين ونويبع وطابا بأسطول حديث ومكيف وسائقين محترفين.'
              : 'Direct VIP door-to-door transfers at fixed rates from Sharm El Sheikh Airport to hotels, and private long-distance rides to Dahab, Saint Catherine, Nuweiba, and Taba.'}
          </p>
        </div>

        {/* Popular South Sinai Routes Chips */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-black text-slate-700 uppercase tracking-wider px-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#F97316]" />
              <span>{isAr ? 'أشهر خطوط التوصيل داخل جنوب سيناء:' : 'Popular South Sinai Transfer Routes:'}</span>
            </span>
            <Link to="/transfers" className="text-[#0284C7] hover:underline hidden sm:inline-block">
              {isAr ? 'عرض جميع الوجهات والأسعار ←' : 'View all destinations & rates →'}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {popularRoutes.map((route, i) => (
              <div
                key={i}
                className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200/80 shadow-xs hover:border-[#0284C7] hover:shadow-md transition-all flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="text-[11px] text-slate-400 font-bold block truncate">{route.from}</div>
                  <div className="text-xs font-black text-slate-900 truncate mt-0.5">← {route.to}</div>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-400 font-normal">{route.time}</span>
                  <span className="font-black text-[#0284C7] text-xs">{formatPrice(route.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Fleet Cards: Sedan 3 Pax, Minivan 6 Pax, HiAce 14-15 Pax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {VEHICLE_TYPES.map((vehicle, idx) => {
            const isLimo = vehicle.id === 'veh-limo';
            const isMinivan = vehicle.id === 'veh-minivan6';
            const isHiace = vehicle.id === 'veh-hiace';

            const accentColor = isLimo ? 'from-sky-500/15' : isMinivan ? 'from-amber-500/15' : 'from-emerald-500/15';
            const badgeBg = isLimo ? 'bg-sky-50 text-[#0284C7] border-sky-200' : isMinivan ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200';

            return (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-md hover:border-[#0284C7]/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
              >
                {/* Top Corner Glow */}
                <div className={`absolute top-0 end-0 w-36 h-36 bg-gradient-to-bl ${accentColor} to-transparent rounded-bl-full pointer-events-none transition duration-500 group-hover:scale-125`} />

                <div>
                  {/* Vehicle Image Banner */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-3.5 start-3.5">
                      <span className={`px-3 py-1 rounded-xl text-xs font-black border shadow-xs ${badgeBg}`}>
                        {isAr ? vehicle.tagAr : vehicle.tagEn}
                      </span>
                    </div>

                    <div className="absolute bottom-3 start-3.5 end-3.5 flex items-center justify-between text-white text-xs font-bold">
                      <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <Users className="w-3.5 h-3.5 text-sky-400" />
                        <span>{vehicle.maxPassengers} {isAr ? 'ركاب' : 'Pax'}</span>
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
                        <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                        <span>{vehicle.maxLuggage} {isAr ? 'حقائب' : 'Bags'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 group-hover:text-[#0284C7] transition-colors">
                        {isAr ? vehicle.nameAr : vehicle.name}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5 line-clamp-2">
                        {isAr ? vehicle.descriptionAr : vehicle.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {(isAr ? vehicle.featuresAr : vehicle.featuresEn).slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & CTA */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                      {isAr ? 'تبدأ من' : 'Starts from'}
                    </span>
                    <span className="text-2xl font-black text-[#0284C7]">
                      {formatPrice(vehicle.basePrice)}
                    </span>
                  </div>

                  <Link
                    to="/transfers"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-[#0284C7] text-white text-xs font-bold transition-all shadow-sm group/btn"
                  >
                    <span>{isAr ? 'حساب التكلفة والحجز' : 'Calculate & Book'}</span>
                    <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Guarantees Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="text-center pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/transfers"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white font-extrabold text-sm shadow-lg shadow-sky-600/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>{isAr ? 'فتح حاسبة أسعار الانتقالات المباشرة' : 'Open Live Transfer Fare Calculator'}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>

          <a
            href="https://wa.me/201100777330?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D8%AC%D9%85%D9%88%D8%B9%D8%A9%20%D8%A7%D9%84%D9%87%D9%86%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%AC%D8%B2%20%D8%AA%D9%88%D8%B5%D9%8A%D9%84%20%D8%AE%D8%A7%D8%B5%20%D8%AF%D8%A7%D8%AE%D9%84%20%D8%AC%D9%86%D9%88%D8%A8%20%D8%B3%D9%8A%D9%86%D8%A7%D8%A1..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-extrabold text-sm shadow-sm transition-all hover:border-[#0284C7] cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? 'طلب توصيل فوري واتساب 24/7' : 'WhatsApp 24/7 Instant Request'}</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default TransfersSection;
