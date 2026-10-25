import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Quote, CheckCircle2, QrCode, MessageSquarePlus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "Alexey Vasilyev",
    country: "Russia",
    date: "Aug 2026",
    rating: 5,
    tour: "سفاري بيتش باجي وعشاء بدوي",
    tourEn: "ATV Quad Safari & Bedouin BBQ",
    text: {
      ar: "تجربة سفاري لا تُنسى في صحراء سيناء! كانت الكواد بايك بحالة ممتازة والمرشدون محترفون جداً. عشاء البدو كان مذهلاً.",
      en: "Unforgettable Safari experience in Sinai! The ATVs were in great condition and the guides were super professional.",
      ru: "Незабываемый опыт сафари на Синае! Квадроциклы были в отличном состоянии, а гиды супер профессиональны.",
      it: "Esperienza safari indimenticabile! Gli ATV erano in ottime condizioni e le guide super professionali.",
      de: "Unvergessliches Safari-Erlebnis auf dem Sinai! Die ATVs waren in tollem Zustand.",
      es: "¡Inolvidable experiencia de Safari en el Sinaí! Los vehículos estaban en excelentes condiciones."
    },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Giulia Mancini",
    country: "Italy",
    date: "Sep 2026",
    rating: 5,
    tour: "يخت الجزيرة البيضاء ورأس محمد",
    tourEn: "White Island & Ras Mohammed Yacht",
    text: {
      ar: "رحلة اليخت للجزيرة البيضاء كانت خرافية! المياه فيروزية شفافة وطاقم اليخت ودودين للغاية ووجبة الغداء البحري طازجة ولذيذة.",
      en: "The White Island Yacht cruise was fantastic! Crystal turquoise water, super friendly crew, and fresh seafood lunch.",
      ru: "Круиз на яхте White Island был просто фантастическим. Бирюзовая вода и свежайший обед.",
      it: "La crociera in yacht all'Isola Bianca è stata fantastica. Lo snorkeling era stupendo e il pranzo delizioso.",
      de: "Die Yachtfahrt zur Weißen Insel war fantastisch. Klares Wasser und leckeres Mittagessen.",
      es: "El crucero en yate fue fantástico. Agua turquesa y un almuerzo de mariscos espectacular."
    },
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Thomas Becker",
    country: "Germany",
    date: "Jul 2026",
    rating: 5,
    tour: "غوص رأس محمد والسنوركلينج",
    tourEn: "Ras Mohammed Diving & Snorkel",
    text: {
      ar: "تنظيم مجموعة الهنا ممتاز واحترافي حقاً. السائق وصل في موعده بالضبط، ومدرب الغوص رافقنا بأمان كامل وسط الشعاب المرجانية.",
      en: "El Hana Group's organization is simply top notch. Punctual hotel pickup and professional dive guide around the coral reefs.",
      ru: "Организация от El Hana Group просто отличная. Водитель приехал вовремя, инструктор по дайвингу молодец.",
      it: "L'organizzazione di El Hana Group è eccellente. Autista puntuale e guida subacquea fantastica.",
      de: "Die Organisation von El Hana Group ist einfach toll. Pünktlicher Fahrer und absolute Sicherheit beim Tauchen.",
      es: "La organización de El Hana Group es excelente. Conductor puntual y máxima seguridad bajo el agua."
    },
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "سارة عبد الرحمن",
    country: "Saudi Arabia",
    date: "Sep 2026",
    rating: 5,
    tour: "رحلة دهب والبلو هول",
    tourEn: "Dahab City & Blue Hole Tour",
    text: {
      ar: "أجمل يوم قضيناه في دهب والبلو هول! ركوب الجمال على الشاطئ وممشى دهب السياحي، شكراً للكابتن وفريق الهنا على الاهتمام الراقي.",
      en: "Best day spent in Dahab & the Blue Hole! Camel ride by the sea and the promenade were lovely. Thank you El Hana team!",
      ru: "Прекрасный день в Дахабе и Блю Холл! Поездка на верблюдах и прогулка по набережной.",
      it: "Splendida giornata trascorsa a Dahab e al Blue Hole! Servizio impeccabile.",
      de: "Ein wunderbarer Tag in Dahab und am Blue Hole. Sehr empfehlenswert!",
      es: "¡El mejor día en Dahab y el Blue Hole! Paseo en camello junto al mar y gran atención."
    },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "David Miller",
    country: "United Kingdom",
    date: "Aug 2026",
    rating: 5,
    tour: "رحلة صعود جبل موسى وسانت كاترين",
    tourEn: "Mount Sinai Sunrise & St. Catherine",
    text: {
      ar: "شروق الشمس من أعلى قمة جبل موسى وبحر السحاب تحته تجربة روحانية لا توصف. مرشدنا البدوي كان صبوراً وخبيراً بكل مسارات الجبل.",
      en: "Watching the sunrise over a sea of clouds from Mount Sinai's summit was a spiritual once-in-a-lifetime experience.",
      ru: "Восход солнца на горе Синай над морем облаков — это невероятное зрелище.",
      it: "L'alba sulla vetta del Monte Sinai è stata un'esperienza spirituale indimenticabile.",
      de: "Der Sonnenaufgang auf dem Berg Sinai über den Wolken war atemberaubend.",
      es: "Ver el amanecer en la cima del Monte Sinaí sobre las nubes fue algo mágico."
    },
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Elena Rostova",
    country: "Ukraine",
    date: "Oct 2026",
    rating: 5,
    tour: "سفاري باجي الرمال السريع",
    tourEn: "Dune Buggy Extreme Desert Safari",
    text: {
      ar: "حماس وإثارة لا توصف في الكار باجي بالصحراء! الأجهزة حديثة ونظيفة ومعدات السلامة كاملة. أنصح الجميع بتجربتهم في شرم الشيخ.",
      en: "Pure adrenaline in the Sinai desert dune buggies! Clean modern vehicles and full safety gear. Highly recommended!",
      ru: "Море адреналина на багги в пустыне! Чистая новая техника и полная безопасность.",
      it: "Pura adrenalina con i buggy nel deserto! Mezzi nuovissimi e grande sicurezza.",
      de: "Adrenalin pur auf den Dünen-Buggys! Neue Fahrzeuge und erstklassiger Service.",
      es: "¡Pura adrenalina con los buggies en el desierto! Vehículos modernos y seguros."
    },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "محمد الشمري",
    country: "Kuwait",
    date: "Sep 2026",
    rating: 5,
    tour: "يخت VIP خاص ورحلة عائلية",
    tourEn: "Private Family VIP Yacht Cruise",
    text: {
      ar: "حجزنا يخت خاص للعائلة، كان اليوم من أروع ما يكون. خصوصية تامة، طاقم محترم وخدوم، وأجواء ممتازة للكبار والصغار.",
      en: "We booked a private yacht for the family. Complete privacy, polite and helpful crew, perfect day for all of us.",
      ru: "Арендовали частную яхту для семьи. Полная приватность и великолепная команда.",
      it: "Abbiamo noleggiato uno yacht privato per la famiglia. Giornata perfetta e servizio discreto.",
      de: "Wir haben eine private Yacht für die Familie gebucht. Perfekter Tag mit großartiger Crew.",
      es: "Alquilamos un yate privado para la familia. Privacidad total y tripulación de diez."
    },
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    name: "Camille Laurent",
    country: "France",
    date: "Aug 2026",
    rating: 5,
    tour: "باراسيلينج وألعاب مائية بالبحر",
    tourEn: "Parasailing & Red Sea Water Sports",
    text: {
      ar: "الباراسيلينج فوق خليج نعمة ممتع جداً ومنظر الجبال مع البحر مذهل. الفريق مرح ويجعلك تشعر بالأمان والراحة طوال الرحلة.",
      en: "Parasailing over the bay was breathtaking! Spectacular view of Sinai mountains and sea. The team was fun and safe.",
      ru: "Парасейлинг над заливом был потрясающим! Виды на горы и море невероятные.",
      it: "Parasailing sulla baia favoloso! Panorama mozzafiato e staff simpaticissimo.",
      de: "Parasailing über der Bucht war fantastisch! Tolle Aussicht und sicheres Team.",
      es: "¡El parasailing sobre la bahía fue alucinante! Vistas increíbles y máxima seguridad."
    },
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  }
];

export const ReviewsSection = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang || 'en';
  const isAr = lang === 'ar';
  const [allReviews, setAllReviews] = useState(DEFAULT_REVIEWS);

  useEffect(() => {
    try {
      const localReviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
      if (localReviews.length > 0) {
        // Merge customer submitted reviews at top
        const mappedLocal = localReviews.map(r => ({
          id: r.id,
          name: r.name || 'عميل مسافر',
          country: r.country || 'International',
          date: r.date || '2026',
          rating: r.rating || 5,
          tour: r.tourTitle || 'رحلة ممتعة مع الهنا',
          tourEn: r.tourTitle || 'El Hana Excursion',
          text: r.text || { ar: r.comment || '', en: r.comment || '' },
          avatar: r.avatar || `https://i.pravatar.cc/150?u=${r.id}`
        }));
        setAllReviews([...mappedLocal, ...DEFAULT_REVIEWS]);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-sky-50/30 to-white text-slate-800 border-b border-sky-100 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0284C7]/6 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 text-[#0284C7] text-xs font-bold uppercase tracking-wider border border-sky-200 shadow-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isAr ? 'تقييمات موثقة من ضيوفنا' : 'Verified Traveler Reviews'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            {isAr ? 'ماذا يقول ' : 'What '} 
            <span className="text-[#0284C7]">{isAr ? 'عملاؤنا' : 'Travelers'}</span> 
            {isAr ? ' عنا؟' : ' Say'}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            {isAr 
              ? 'نفتخر برسم الابتسامة على وجوه المسافرين من أكثر من 50 دولة حول العالم ونقل ذكريات لا تُنسى في شرم الشيخ.'
              : 'We take pride in bringing smiles to travelers from across the globe and delivering unforgettable memories in Sharm El Sheikh.'}
          </p>
        </div>

        {/* Multi-Card Grid (3-4 cards per row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allReviews.map((rev) => {
            const reviewComment = typeof rev.text === 'object' 
              ? (rev.text[lang] || rev.text['ar'] || rev.text['en']) 
              : rev.text;

            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0284C7]/40 transition-all duration-300 flex flex-col justify-between space-y-4 group relative"
              >
                <div className="space-y-3 relative">
                  <div className="flex items-center justify-between">
                    {/* 5 Golden Stars */}
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
                  <div className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold bg-sky-50 text-[#0284C7] border border-sky-100/80 truncate max-w-full">
                    {isAr ? (rev.tour || 'رحلة شرم الشيخ') : (rev.tourEn || rev.tour)}
                  </div>

                  <div className="flex items-center gap-3">
                    <img 
                      src={rev.avatar} 
                      alt={rev.name}
                      loading="lazy" 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-500/30 flex-shrink-0"
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

        {/* Bottom CTA Row: Add Review / QR */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            to="/leave-review"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-extrabold transition shadow-md shadow-sky-600/20"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{isAr ? 'أضف تقييمك لرحلتك الآن' : 'Leave a Tour Review'}</span>
          </Link>

          <Link
            to="/qr"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-extrabold transition shadow-2xs"
          >
            <QrCode className="w-4 h-4 text-[#0284C7]" />
            <span>{isAr ? 'مركز رموز QR للتقييم' : 'QR Review Center'}</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
