import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  QrCode, 
  MessageSquarePlus, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const DEFAULT_REVIEWS = [
  {
    id: 1,
    name: "Alexey Vasilyev",
    country: "Russia 🇷🇺",
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
    country: "Italy 🇮🇹",
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
    country: "Germany 🇩🇪",
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
    country: "Saudi Arabia 🇸🇦",
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
    country: "United Kingdom 🇬🇧",
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
    country: "Ukraine 🇺🇦",
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
    country: "Kuwait 🇰🇼",
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
    country: "France 🇫🇷",
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
  },
  {
    id: 9,
    name: "عبد الله الدوسري",
    country: "Saudi Arabia 🇸🇦",
    date: "Oct 2026",
    rating: 5,
    tour: "سهرة بدوية وعشاء تحت النجوم",
    tourEn: "Bedouin Dinner & Stargazing",
    text: {
      ar: "أجواء البدو والضيافة والخبز الطازج كانت خيالية. التلسكوب ورؤية كواكب وفضاء شرم الشيخ شيء أذهل أولادي. خدمة ممتازة.",
      en: "Authentic Bedouin hospitality and warm bread under the stars. The telescope view of Saturn amazed my kids. Outstanding!",
      ru: "Аутентичный бедуинский ужин под звездами. Телескоп поразил детей. Великолепный сервис.",
      it: "Autentica ospitalità beduina e cena sotto le stelle. I bambini sono rimasti estasiati dal telescopio.",
      de: "Authentische Beduinen-Gastfreundschaft und Sternegucken. Ein magischer Abend für die ganze Familie.",
      es: "Hospitalidad beduina única y cena bajo las estrellas. Ver los planetas con telescopio fue inolvidable."
    },
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 10,
    name: "Marco Bianchi",
    country: "Italy 🇮🇹",
    date: "Aug 2026",
    rating: 4,
    tour: "رحلة وادي الوشواشي ونويبع",
    tourEn: "Wishwashi Canyon & Nuweiba Safari",
    text: {
      ar: "رحلة مغامرة حقيقية ومسبح الوشواشي الطبيعي بين الجبال تحفة. المشي في الوادي يحتاج حذاء رياضي مريح، التجربة تستحق كل دقيقة.",
      en: "True canyon adventure! The natural pool between rocks is a hidden gem. Good hiking shoes recommended.",
      ru: "Настоящее приключение в каньоне Вишваши. Природный бассейн потрясающий. Нужна удобная обувь.",
      it: "Una vera avventura nel canyon! La piscina naturale tra le rocce è stupenda. Consiglio scarpe adatte.",
      de: "Tolles Abenteuer im Wishwashi-Canyon! Feste Schuhe sind ratsam, aber der Pool ist atemberaubend.",
      es: "¡Aventura salvaje en el cañón! La piscina natural entre las rocas es mágica. Muy recomendado."
    },
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 11,
    name: "Olga Ivanova",
    country: "Russia 🇷🇺",
    date: "Sep 2026",
    rating: 5,
    tour: "غوص تمهيدي للمبتدئين (إنترو)",
    tourEn: "Introductory Scuba Diving",
    text: {
      ar: "أول مرة أغوص في حياتي وكنت خائفة جداً، لكن المدرب كان هادئاً ورافقني خطوة بخطوة حتى شاهدت السلاحف والشعاب. شعور لا يوصف!",
      en: "First time diving and I was nervous, but the instructor was patient and guided me step by step. Saw turtles and corals!",
      ru: "Первое погружение в жизни! Инструктор был очень терпеливым и спокойным. Видела черепах и рифы!",
      it: "Prima volta che facevo immersioni. Istruttore bravissimo e rassicurante. Ho visto tartarughe bellissime.",
      de: "Mein erster Tauchgang überhaupt. Großartiger Tauchlehrer, der mir alle Ängste genommen hat.",
      es: "Mi primer buceo. El instructor fue paciente y me cuidó todo el tiempo. ¡Vi tortugas y corales!"
    },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 12,
    name: "Lukas Weber",
    country: "Germany 🇩🇪",
    date: "Oct 2026",
    rating: 4,
    tour: "سفاري الكواد بايك وقت الغروب",
    tourEn: "Sunset ATV Quad Safari",
    text: {
      ar: "منظر الغروب في وادي الصدى ساحر، والسرعة بالبيتش باجي كانت ممتازة. التنظيم مرتب جداً وتمنيت لو استمرت الجولة ساعة إضافية.",
      en: "Sunset at Echo Canyon was stunning. Quad bikes had good power and safety. Would have loved an extra hour!",
      ru: "Закат в каньоне эха великолепен. Квадроциклы быстрые и надежные. Хотелось кататься еще дольше!",
      it: "Il tramonto nel canyon degli echi è magico. I quad erano potenti e sicuri. Ottima esperienza.",
      de: "Der Sonnenuntergang im Echo-Canyon war fantastisch. Die Quads waren in Top-Zustand.",
      es: "El atardecer en el cañón fue espectacular. Los quads corrían muy bien y el guía fue muy amable."
    },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 13,
    name: "مريم الكعبي",
    country: "Qatar 🇶🇦",
    date: "Oct 2026",
    rating: 5,
    tour: "باقة VIP يخت خاص للعرسان",
    tourEn: "VIP Private Yacht Honeymoon",
    text: {
      ar: "شكر خاص للأستاذ أحمد وفريق الهنا على تنسيق الورود والعشاء الرومانسي على متن اليخت. كانت مفاجأة العمر لزوجي ولن ننساها أبداً.",
      en: "Special thanks to the team for arranging the romantic yacht setup and fresh flowers. Best honeymoon surprise ever!",
      ru: "Огромное спасибо за организацию романтического вечера на яхте с цветами и ужином. Незабываемо!",
      it: "Grazie di cuore per aver allestito lo yacht per il nostro anniversario. Cena a lume di candela perfetta.",
      de: "Vielen Dank für das romantische Yacht-Arrangement mit Blumen und Kerzenlicht. Ein Traum!",
      es: "Una sorpresa inolvidable en el yate privado con cena romántica. Atención de diez estrellas."
    },
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 14,
    name: "John & Emma Davies",
    country: "United Kingdom 🇬🇧",
    date: "Jul 2026",
    rating: 5,
    tour: "عرض الدلافين والسباحة مع الدلفين",
    tourEn: "Dolphin Show & Swim Experience",
    text: {
      ar: "السباحة مع الدلافين كانت أسعد لحظة لأطفالي في شرم الشيخ. السائق أخذنا من باب الفندق وأعادنا مباشرة، دقة متناهية.",
      en: "Swimming with dolphins was the highlight of our family holiday. Punctual private hotel transfers made it stress-free.",
      ru: "Плавание с дельфинами стало главным впечатлением поездки для детей. Трансфер минута в минуту.",
      it: "Nuotare con i delfini è stato il momento più bello per i nostri figli. Tutto organizzato nei dettagli.",
      de: "Das Schwimmen mit Delfinen war das Highlight unseres Urlaubs. Pünktlicher und sauberer Transfer.",
      es: "Nadar con delfines fue maravilloso para los niños. Transporte puntual y personal muy atento."
    },
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 15,
    name: "تركي القحطاني",
    country: "Saudi Arabia 🇸🇦",
    date: "Aug 2026",
    rating: 5,
    tour: "سفاري كومبو: باجي + جمال + عشاء",
    tourEn: "Super Desert Combo Adventure",
    text: {
      ar: "سعر مناسب جداً مقابل برنامج متكامل وخدمة VIP حقيقية بدون استغلال أو مصاريف مخفية. الدفع كاش وقت الاستلام يعطيك ثقة وراحة بال.",
      en: "Superb value for money, honest pricing with zero hidden fees. Paying cash upon pickup gave total peace of mind.",
      ru: "Отличная цена за полный пакет без скрытых доплат. Оплата наличными при посадке — это очень удобно.",
      it: "Ottimo rapporto qualità prezzo, nessun costo nascosto. Pagare in contanti al pickup è comodissimo.",
      de: "Faire Preise ohne versteckte Gebühren. Bezahlung erst bei Abholung am Hotel — absolut vertrauenswürdig.",
      es: "Excelente relación calidad-precio y sin sorpresas. Pagamos en efectivo al llegar el coche."
    },
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 16,
    name: "Anna Kowalska",
    country: "Poland 🇵🇱",
    date: "Sep 2026",
    rating: 4,
    tour: "جولة ركوب الخيل العربي الأصيل",
    tourEn: "Arabian Horse Riding on Beach",
    text: {
      ar: "الخيول نظيفة ومدربة جيداً وركوب الخيل وقت الشروق على الشاطئ رومانسي جداً. المدرب كان لطيفاً والتقط لنا صوراً رائعة.",
      en: "Well-cared horses and peaceful sunrise beach ride. The trainer took gorgeous photos for us.",
      ru: "Ухоженные арабские лошади и прогулка на рассвете вдоль моря. Инструктор сделал нам классные фото.",
      it: "Cavalli stupendi e passeggiata sulla spiaggia all'alba. L'istruttore ci ha fatto bellissime foto.",
      de: "Wunderschöne Pferde und ein friedlicher Ritt am Strand bei Sonnenaufgang. Tolle Fotos!",
      es: "Caballos muy bien cuidados y paseo al amanecer junto al mar. Nos tomaron fotos espectaculares."
    },
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  }
];

export const ReviewsSection = () => {
  const { currentLang } = useLanguage();
  const lang = currentLang || 'en';
  const isAr = lang === 'ar';

  const [allReviews, setAllReviews] = useState(DEFAULT_REVIEWS);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedRating, setSelectedRating] = useState('all');

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 45;

  // Load any user reviews submitted locally
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
  // Desktop (>= 1024px): 4 cards per row
  // Tablet (640px - 1023px): 2 cards
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

  // Calculate dynamic rating breakdown: 5★, 4★, 3★, 2★, 1★
  const ratingStats = useMemo(() => {
    const total = allReviews.length || 1;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sumScore = 0;

    allReviews.forEach(r => {
      const rating = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
      counts[rating] = (counts[rating] || 0) + 1;
      sumScore += rating;
    });

    const average = (sumScore / total).toFixed(1);

    const breakdown = [5, 4, 3, 2, 1].map(star => {
      const count = counts[star] || 0;
      const percentage = Math.round((count / total) * 100);
      return {
        star,
        count,
        percentage
      };
    });

    return {
      total,
      counts,
      average,
      breakdown
    };
  }, [allReviews]);

  // Filter reviews by star rating if user clicked a star filter
  const filteredReviews = useMemo(() => {
    if (selectedRating === 'all') return allReviews;
    return allReviews.filter(r => Math.round(Number(r.rating) || 5) === Number(selectedRating));
  }, [allReviews, selectedRating]);

  // Reset pagination when filter or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedRating, itemsPerPage]);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  // Strictly 1 Single Row of reviews
  const displayedReviews = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredReviews.slice(start, start + itemsPerPage);
  }, [filteredReviews, currentPage, itemsPerPage]);

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

    // In RTL: swipe right goes to previous, swipe left goes to next
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
    <div className="w-full min-h-[calc(100svh-var(--header-h))] flex flex-col justify-center py-10 md:py-16 bg-gradient-to-b from-slate-50 via-sky-50/25 to-white text-slate-800 relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#0284C7]/6 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 md:space-y-10">
        
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

        {/* ── THE CAROUSEL: SINGLE ROW ONLY + TWO PROMINENT ARROWS (صف واحد وسهمين) ── */}
        <div className="relative py-2 px-1 sm:px-2">
          
          {/* Arrow 1: Previous (سهم السابق) */}
          {totalPages > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label={isAr ? "السابق" : "Previous"}
              className="absolute -start-2 sm:-start-5 lg:-start-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-sky-50 text-slate-800 hover:text-[#0284C7] shadow-[0_8px_30px_rgba(0,0,0,0.18)] border-2 border-slate-200 hover:border-[#0284C7] flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
            >
              <PrevIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          )}

          {/* Single Row of Cards (صف واحد فقط) */}
          <div 
            onTouchStart={onTouchStartHandler}
            onTouchMove={onTouchMoveHandler}
            onTouchEnd={onTouchEndHandler}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 px-6 sm:px-8 transition-all duration-500"
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

          {/* Arrow 2: Next (سهم التالي) */}
          {totalPages > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label={isAr ? "التالي" : "Next"}
              className="absolute -end-2 sm:-end-5 lg:-end-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white hover:bg-sky-50 text-slate-800 hover:text-[#0284C7] shadow-[0_8px_30px_rgba(0,0,0,0.18)] border-2 border-slate-200 hover:border-[#0284C7] flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
            >
              <NextIcon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          )}

        </div>

        {/* Pagination Dots (مؤشر التنقل بين الصفحات) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPage(idx)}
                aria-label={isAr ? `الانتقال إلى الصفحة ${idx + 1}` : `Go to page ${idx + 1}`}
                className="w-10 h-10 inline-flex items-center justify-center cursor-pointer rounded-full hover:bg-slate-100 transition"
              >
                <span
                  className={`block transition-all duration-300 rounded-full pointer-events-none ${
                    currentPage === idx 
                      ? 'w-8 h-2.5 bg-[#0284C7]' 
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Bottom CTA Row: Add Review / QR */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/leave-review"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0369A1] hover:bg-[#075985] text-white text-xs font-extrabold transition shadow-md shadow-sky-900/20 active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{isAr ? 'أضف تقييمك لرحلتك الآن' : 'Leave a Tour Review'}</span>
          </Link>

          <Link
            to="/qr"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-extrabold transition shadow-2xs active:scale-95"
          >
            <QrCode className="w-4 h-4 text-[#0284C7]" />
            <span>{isAr ? 'مركز رموز QR للتقييم' : 'QR Review Center'}</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ReviewsSection;
