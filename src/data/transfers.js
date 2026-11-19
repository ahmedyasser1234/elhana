import { SHARM_HOTELS } from './sharmHotels';

export const SHARM_LOCATIONS = SHARM_HOTELS;

export const VEHICLE_TYPES = [
  {
    id: "veh-limo",
    name: "Luxury Limousine & Private Sedan",
    nameAr: "ليموزين وسيدان ملاكي خاص (3 راكب)",
    tagAr: "ليموزين (3 راكب)",
    tagEn: "Limousine (3 Pax)",
    maxPassengers: 3,
    maxLuggage: 3,
    image: "/images/transfers/vip-transfers-sharm.jpg",
    description: "Private executive sedan limousine with leather interior, icy dual A/C, and professional chauffeur for up to 3 passengers.",
    descriptionAr: "سيارة ليموزين وسيدان ملاكي خاصة ومكيفة تناسب الأفراد والأزواج والعائلات الصغيرة حتى 3 ركاب مع 3 حقائب سفر.",
    basePrice: 20,
    featuresAr: ["يتسع لـ 3 ركاب و 3 حقائب", "تكييف هواء فائق البرودة", "سائق خاص بزي رسمي", "مياه معدنية مجانية"],
    featuresEn: ["3 Passengers & 3 Bags", "Dual Climate A/C", "Formal Attire Chauffeur", "Free Bottled Water"]
  },
  {
    id: "veh-minivan6",
    name: "Family Minivan (6-Seater)",
    nameAr: "ميني فان عائلي مريح (6 راكب)",
    tagAr: "ميني فان (6 راكب)",
    tagEn: "Minivan (6 Pax)",
    maxPassengers: 6,
    maxLuggage: 6,
    image: "/images/transfers/family-minivan-sharm.jpg",
    description: "Comfortable, spacious 6-passenger family minivan with wide legroom and generous cargo trunk for 6 bags.",
    descriptionAr: "فان عائلي مريح ومكيف يتسع لـ 6 ركاب و 6 حقائب سفر، الخيار الأمثل للعائلات ومجموعات الأصدقاء.",
    basePrice: 30,
    featuresAr: ["يتسع لـ 6 ركاب براحة", "مساحة لـ 6 حقائب سفر", "تكييف هواء مركزي", "شواحن هواتف USB"],
    featuresEn: ["6 Comfortable Seats", "6 Suitcase Capacity", "Dual Zone Climate Control", "USB Mobile Charging"]
  },
  {
    id: "veh-hiace",
    name: "Toyota HiAce Tourist Microbus (14-15 Seater)",
    nameAr: "تويوتا هاي إيس سياحي (14 - 15 راكب)",
    tagAr: "هاي إيس (14-15 راكب)",
    tagEn: "HiAce (14-15 Pax)",
    maxPassengers: 15,
    maxLuggage: 15,
    image: "/images/transfers/hiace-van-sharm.jpg",
    description: "High-roof tourist Toyota HiAce passenger van with 14-15 comfortable seats, dual powerful A/C, and huge luggage space.",
    descriptionAr: "ميكروباص سياحي تويوتا هاي إيس سقف عالي مكيف ومجهز بالكامل، يتسع لـ 14 إلى 15 راكب مع مساحة واسعة لجميع الحقائب للمجموعات الكبيرة.",
    basePrice: 45,
    featuresAr: ["يتسع لـ 14 إلى 15 راكب", "سقف عالي ومقاعد مريحة", "مساحة ضخمة لجميع الحقائب", "مثالي للمجموعات والرحلات"],
    featuresEn: ["14 to 15 Passenger Capacity", "High-Roof Easy Movement", "Ample Cargo Space", "Ideal for Tours & Groups"]
  }
];

export const FLEET_CARS = [
  // ── 1. Sedan & Limousine Cars ──
  {
    id: "car-mercedes-e",
    categoryId: "veh-limo",
    category: "veh-limo",
    name: "Mercedes-Benz E-Class VIP Limousine",
    nameAr: "مرسيدس E-Class ليموزين VIP فاخرة",
    model: "2024 / 2025",
    tagAr: "ليموزين VIP",
    tagEn: "VIP Limousine",
    maxPassengers: 3,
    maxLuggage: 3,
    basePrice: 28,
    image: "/images/transfers/vip-transfers-sharm.jpg",
    gallery: [
      "/images/transfers/vip-transfers-sharm.jpg",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
    ],
    descriptionAr: "ليموزين مرسيدس E-Class الألمانية الفاخرة، صالون جلدي ناعم ومريح، عزل صوتي كامل، تكييف رقمي مزدوج، وسائق VIP خاص بزي رسمي مع لافتة استقبال باسمك.",
    descriptionEn: "German luxury Mercedes-Benz E-Class VIP limousine with premium leather interior, whisper-quiet cabin, digital climate A/C, and chauffeur in formal attire.",
    specsAr: {
      type: "سيدان ليموزين VIP فاخرة",
      passengers: "3 ركاب براحة تامة",
      luggage: "3 حقائب سفر كبيرة + حقائب اليد",
      transmission: "أوتوماتيك 9 سرعات",
      ac: "تكييف هواء رقمي مزدوج Dual Zone",
      comfort: "مقاعد جلدية مريحة مع عزل صوتي",
      wifi: "واي فاي سريع وإنترنت مجاني",
      refreshments: "مياه معدنية باردة ومناديل معقمة",
      driver: "سائق خاص بزي رسمي ولافتة استقبال بالاسم"
    },
    specsEn: {
      type: "Luxury Executive VIP Sedan",
      passengers: "3 Passengers in ultimate comfort",
      luggage: "3 Large Suitcases + Carry-ons",
      transmission: "9-Speed Automatic",
      ac: "Dual Zone Digital Climate Control",
      comfort: "Nappa Leather Heated/Cooled Seating",
      wifi: "Complimentary In-Car High Speed WiFi",
      refreshments: "Chilled Mineral Water & Sanitized Wipes",
      driver: "Formal Chauffeur with Welcome Nameplate"
    }
  },
  {
    id: "car-corolla",
    categoryId: "veh-limo",
    category: "veh-limo",
    name: "Toyota Corolla / Modern Sedan",
    nameAr: "تويوتا كورولا حديثة (سيدان ملاكي خاص)",
    model: "2024 / 2025",
    tagAr: "سيدان خاص",
    tagEn: "Private Sedan",
    maxPassengers: 3,
    maxLuggage: 3,
    basePrice: 20,
    image: "/images/transfers/corolla-sedan-sharm.jpg",
    gallery: [
      "/images/transfers/corolla-sedan-sharm.jpg",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
    ],
    descriptionAr: "سيارة سيدان تويوتا كورولا حديثة ومكيفة، معقمة ونظيفة بالكامل، اختيار مثالي واقتصادي للأفراد والأزواج والعائلات الصغيرة حتى 3 ركاب.",
    descriptionEn: "Modern air-conditioned Toyota Corolla sedan, immaculate and sanitized, ideal for solo travelers, couples, and small families up to 3 guests.",
    specsAr: {
      type: "سيارة ملاكي سيدان حديثة",
      passengers: "3 ركاب",
      luggage: "3 حقائب سفر قياسية",
      transmission: "أوتوماتيك حديث",
      ac: "تكييف هواء فائق التبريد",
      comfort: "صالون مريح ونظيف ومعقم",
      wifi: "شواحن هواتف USB",
      refreshments: "مياه معدنية للشرب",
      driver: "سائق سياحي محترف وملتزم بالمواعيد"
    },
    specsEn: {
      type: "Modern Private Sedan",
      passengers: "Up to 3 Passengers",
      luggage: "3 Standard Suitcases",
      transmission: "Smooth Automatic",
      ac: "Icy Cold Air Conditioning",
      comfort: "Clean & Sanitized Comfortable Cabin",
      wifi: "USB Mobile Fast Chargers",
      refreshments: "Bottled Mineral Water",
      driver: "Courteous & Punctual Driver"
    }
  },

  // ── 2. Family Minivan 6-Seater Cars ──
  {
    id: "car-innova",
    categoryId: "veh-minivan6",
    category: "veh-minivan6",
    name: "Toyota Innova 6-Seater Family Van",
    nameAr: "تويوتا إنوفا عائلي واسع (6 راكب)",
    model: "2024 / 2025",
    tagAr: "عائلي 6 راكب",
    tagEn: "Family 6-Seater",
    maxPassengers: 6,
    maxLuggage: 6,
    basePrice: 30,
    image: "/images/transfers/family-minivan-sharm.jpg",
    gallery: [
      "/images/transfers/family-minivan-sharm.jpg",
      "/images/transfers/hiace-van-interior.jpg",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80"
    ],
    descriptionAr: "ميني فان عائلي مريح تويوتا إنوفا، مقاعد كابتن واسعة ومريحة لـ 6 ركاب مع تكييف هواء مركزي أمامي وخلفي ومساحة واسعة تتسع لـ 6 حقائب سفر كبيرة.",
    descriptionEn: "Spacious Toyota Innova 6-passenger family minivan with wide captain seats, dual front & rear A/C, and generous luggage cargo for 6 bags.",
    specsAr: {
      type: "ميني فان عائلي 6 مقاعد",
      passengers: "6 ركاب براحة تامة",
      luggage: "6 حقائب سفر كبيرة",
      transmission: "أوتوماتيك 6 سرعات",
      ac: "تكييف أمامي وخلفي مركزي",
      comfort: "مقاعد مريحة قابلة للطي ومساند ذراع",
      wifi: "منافذ شحن هواتف في الصفوف",
      refreshments: "مياه معدنية باردة",
      driver: "سائق سياحي صبور وخبير مع العائلات"
    },
    specsEn: {
      type: "6-Seater Family Multi-Purpose Van",
      passengers: "6 Passengers in comfort",
      luggage: "6 Large Luggage Suitcases",
      transmission: "6-Speed Automatic",
      ac: "Front & Rear Central Air Conditioning",
      comfort: "Spacious Foldable Ergonomic Seating",
      wifi: "Multi-Row USB Charging Outlets",
      refreshments: "Cold Bottled Water",
      driver: "Family-Friendly Experienced Chauffeur"
    }
  },
  {
    id: "car-staria",
    categoryId: "veh-minivan6",
    category: "veh-minivan6",
    name: "Hyundai Staria Luxury 6-Seater VIP",
    nameAr: "هيونداي ستاريا VIP المستقبلي (6 راكب)",
    model: "2024 / 2025",
    tagAr: "VIP عائلي 6 راكب",
    tagEn: "Luxury 6-Seater VIP",
    maxPassengers: 6,
    maxLuggage: 6,
    basePrice: 38,
    image: "/images/transfers/family-minivan-sharm.jpg",
    gallery: [
      "/images/transfers/family-minivan-sharm.jpg",
      "/images/transfers/hiace-van-interior.jpg",
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?auto=format&fit=crop&w=1200&q=80"
    ],
    descriptionAr: "أحدث طرازات هيونداي ستاريا الفاخرة بتصميم مستقبلي ونوافذ بانورامية واسعة ومقاعد كابتن جلدية منفصلة لـ 6 ركاب مع تكييف رقمي مستقل لكل مقعد.",
    descriptionEn: "Top-tier futuristic Hyundai Staria VIP van with panoramic glass windows, executive leather captain chairs for 6 guests, and individual climate controls.",
    specsAr: {
      type: "فان تنفيذي VIP فاخر 6 مقاعد",
      passengers: "6 ركاب VIP",
      luggage: "6 حقائب كبيرة",
      transmission: "أوتوماتيك 8 سرعات Shift-by-Wire",
      ac: "تكييف رقمي ثلاثي المناطق",
      comfort: "مقاعد كابتن جلدية فاخرة ريلاكس",
      wifi: "واي فاي سريع وإنترنت مجاني",
      refreshments: "مشروبات وضيافة خاصة",
      driver: "سائق VIP محترف بزي رسمي"
    },
    specsEn: {
      type: "Executive Luxury MPV (6 Pax)",
      passengers: "6 VIP Passengers",
      luggage: "6 Large Suitcases",
      transmission: "8-Speed Electronic Automatic",
      ac: "Tri-Zone Climate Control",
      comfort: "Premium Relaxation Leather Captain Chairs",
      wifi: "High-Speed In-Car WiFi",
      refreshments: "Complimentary Cold Refreshments",
      driver: "Suited Formal VIP Chauffeur"
    }
  },

  // ── 3. Toyota HiAce 14-15 Seater Cars ──
  {
    id: "car-hiace-highroof",
    categoryId: "veh-hiace",
    category: "veh-hiace",
    name: "Toyota HiAce High-Roof Tourist Microbus (14 Pax)",
    nameAr: "تويوتا هاي إيس سقف عالي سياحي (14 راكب)",
    model: "2024 / 2025",
    tagAr: "هاي إيس 14 راكب",
    tagEn: "14 Pax Tourist",
    maxPassengers: 14,
    maxLuggage: 14,
    basePrice: 45,
    image: "/images/transfers/hiace-van-sharm.jpg",
    gallery: [
      "/images/transfers/hiace-van-sharm.jpg",
      "/images/transfers/hiace-van-interior.jpg",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
    ],
    descriptionAr: "ميكروباص سياحي تويوتا هاي إيس سقف عالي مكيف ومجهز بالكامل، يتسع لـ 14 راكب بسهولة حركة ووقوف بالداخل ومساحة خلفية ضخمة لـ 14 حقيبة سفر كبيرة للمجموعات السياحية.",
    descriptionEn: "High-roof tourist Toyota HiAce microbus with 14 comfortable seats, dual heavy-duty air conditioning, and massive luggage cargo for 14 large bags.",
    specsAr: {
      type: "ميكروباص سياحي سقف عالي",
      passengers: "14 راكب سياحي",
      luggage: "14 حقيبة سفر كبيرة",
      transmission: "أوتوماتيك حديث سلس",
      ac: "تكييف هواء مركزي سقف قوي جداً",
      comfort: "مقاعد سياحية مائلة بمساند رأس",
      wifi: "نظام صوتي وسماعات للمرشد",
      refreshments: "مياه معدنية لجميع الركاب",
      driver: "سائق سياحي مرخص ومعتمد من وزارة السياحة"
    },
    specsEn: {
      type: "High-Roof Tourist Microbus",
      passengers: "14 Tourist Passengers",
      luggage: "14 Large Group Suitcases",
      transmission: "Modern Automatic",
      ac: "Heavy-Duty Roof Dual Air Conditioners",
      comfort: "Reclining Tourist Seats with Headrests",
      wifi: "Tour Guide PA Microphone System",
      refreshments: "Cold Bottled Water for All",
      driver: "Ministry-Licensed Professional Chauffeur"
    }
  },
  {
    id: "car-hiace-supergl",
    categoryId: "veh-hiace",
    category: "veh-hiace",
    name: "Toyota HiAce Super GL VIP (15 Pax)",
    nameAr: "تويوتا هاي إيس سوبر جي إل VIP (15 راكب)",
    model: "2024 / 2025",
    tagAr: "سوبر VIP 15 راكب",
    tagEn: "15 Pax Super VIP",
    maxPassengers: 15,
    maxLuggage: 15,
    basePrice: 50,
    image: "/images/transfers/hiace-van-sharm.jpg",
    gallery: [
      "/images/transfers/hiace-van-sharm.jpg",
      "/images/transfers/hiace-van-interior.jpg",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
    ],
    descriptionAr: "النسخة الأعلى تجهيزاً من تويوتا هاي إيس، صالون فخم بمقاعد مخملية مريحة تتسع لـ 15 راكب مع فتحات تكييف مستقلة فوق كل مقعد ومساحة واسعة لجميع الحقائب.",
    descriptionEn: "Top-trim Super GL VIP HiAce with plush upholstered seating, dual powerful air conditioners with overhead vents, accommodating 15 guests comfortably.",
    specsAr: {
      type: "ميكروباص سوبر GL VIP فخم",
      passengers: "15 راكب",
      luggage: "15 حقيبة سفر كبيرة",
      transmission: "أوتوماتيك متطور",
      ac: "فتحات تكييف هواء فوق كل مقعد",
      comfort: "مقاعد عريضة ومخملية مريحة",
      wifi: "منافذ شحن هواتف",
      refreshments: "مياه وضيافة للمجموعات",
      driver: "سائق سياحي محترف وخبير بطرق سيناء"
    },
    specsEn: {
      type: "Super GL Luxury 15-Seater",
      passengers: "15 Passengers",
      luggage: "15 Large Bags",
      transmission: "Smooth Electronic Automatic",
      ac: "Individual Overhead Air Vents",
      comfort: "Plush Wide Tourist Seating",
      wifi: "Mobile Charging Ports",
      refreshments: "Group Refreshments Included",
      driver: "Veteran Sinai Highway Chauffeur"
    }
  },
];

export const getCarsByCategory = (catId) => {
  return FLEET_CARS.filter(c => c.categoryId === catId || c.category === catId);
};

export const getCarById = (carId) => {
  return FLEET_CARS.find(c => c.id === carId) || FLEET_CARS[0];
};

export const TRANSFER_GALLERY = [
  {
    id: "gal-limo",
    vehicleId: "veh-limo",
    carId: "car-mercedes-e",
    titleAr: "ليموزين وسيدان ملاكي (3 راكب)",
    titleEn: "Limousine & Sedan (3 Pax)",
    subtitleAr: "مرسيدس E-Class وتويوتا كورولا (1 - 3 ركاب | 3 حقائب)",
    subtitleEn: "Mercedes E-Class & Toyota Corolla (1-3 Pax | 3 Bags)",
    badgeAr: "ليموزين 3 راكب",
    badgeEn: "Limousine 3 Pax",
    price: 20,
    image: "/images/transfers/vip-transfers-sharm.jpg",
    thumb: "/images/transfers/vip-transfers-sharm.jpg"
  },
  {
    id: "gal-minivan6",
    vehicleId: "veh-minivan6",
    carId: "car-innova",
    titleAr: "ميني فان عائلي مريح (6 راكب)",
    titleEn: "Family Minivan (6-Seater)",
    subtitleAr: "تويوتا إنوفا وهيونداي ستاريا (حتى 6 ركاب | 6 حقائب)",
    subtitleEn: "Toyota Innova & Hyundai Staria (Up to 6 Pax | 6 Bags)",
    badgeAr: "ميني فان 6 راكب",
    badgeEn: "Minivan 6 Pax",
    price: 30,
    image: "/images/transfers/family-minivan-sharm.jpg",
    thumb: "/images/transfers/family-minivan-sharm.jpg"
  },
  {
    id: "gal-hiace",
    vehicleId: "veh-hiace",
    carId: "car-hiace-highroof",
    titleAr: "تويوتا هاي إيس سياحي (14 - 15 راكب)",
    titleEn: "Toyota HiAce Tourist Microbus (14-15 Pax)",
    subtitleAr: "سقف عالي وسوبر GL (14 - 15 راكب | 15 حقيبة)",
    subtitleEn: "High-Roof & Super GL (14-15 Pax | 15 Bags)",
    badgeAr: "هاي إيس 14-15 راكب",
    badgeEn: "HiAce 14-15 Pax",
    price: 45,
    image: "/images/transfers/hiace-van-sharm.jpg",
    thumb: "/images/transfers/hiace-van-sharm.jpg"
  }
];

export const TRANSFER_SERVICES = [
  { 
    id: "ts-1", 
    title: "Airport → Hotel Transfer", 
    titleAr: "توصيل من المطار إلى الفندق",
    desc: "Door-to-door arrival transfer with flight tracking & nameplate sign.",
    descAr: "استقبال خاص بيافطة اسمك من صالة الوصول وتوصيل مباشر حتى باب الفندق."
  },
  { 
    id: "ts-2", 
    title: "Hotel → Airport Transfer", 
    titleAr: "توصيل من الفندق إلى المطار",
    desc: "Timely pickup from resort lobby to ensure on-time flight departure.",
    descAr: "توصيل في الموعد المحدد من ريسبشن الفندق لضمان الوصول للمطار بكل راحة."
  },
  { 
    id: "ts-3", 
    title: "Hotel → Safari Base", 
    titleAr: "توصيل لمركز سفاري الصحراء",
    desc: "Private direct ride to desert quad biking & safari centers.",
    descAr: "انتقال خاص ومباشر إلى محطة البيتش باجي والكار باجي بالصحراء."
  },
  { 
    id: "ts-4", 
    title: "Hotel → Marina / Yacht Port", 
    titleAr: "توصيل إلى المارينا وميناء اليخوت",
    desc: "Fast morning transfer to boat departure docks.",
    descAr: "انتقال سريع في الصباح الباكر إلى رصيف انطلاق اليخوت البحرية."
  },
  { 
    id: "ts-5", 
    title: "Day Trip Transfer (Dahab / St. Catherine)", 
    titleAr: "انتقال يوم كامل إلى دهب وسانت كاترين",
    desc: "Private full-day vehicle & driver for custom South Sinai exploration.",
    descAr: "سيارة خاصة وسائق طوال اليوم لجولتك الخاصة في سيناء."
  }
];
