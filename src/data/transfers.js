import { SHARM_HOTELS } from './sharmHotels';

export const SHARM_LOCATIONS = SHARM_HOTELS;

export const VEHICLE_TYPES = [
  {
    id: "veh-limo",
    name: "Luxury VIP Limousine / Sedan",
    nameAr: "ليموزين وسيدان VIP فاخرة (مرسيدس / ملاكي خاص)",
    maxPassengers: 3,
    maxLuggage: 3,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    description: "Executive VIP sedan limousine with leather interior, icy air conditioning, and professional chauffeur.",
    descriptionAr: "سيارة ليموزين سيدان حديثة وفخمة ومكيفة تناسب الأفراد، الأزواج، والعائلات الصغيرة حتى 3 ركاب مع 3 حقائب.",
    basePrice: 20,
    featuresAr: ["مقاعد جلدية مريحة", "تكييف فائق البرودة", "سائق خاص بزي رسمي", "مياه معدنية مجانية"],
    featuresEn: ["Premium Leather Seats", "Dual Climate A/C", "Formal Attire Chauffeur", "Free Bottled Water"]
  },
  {
    id: "veh-minivan7",
    name: "Family Minivan (7-Seater)",
    nameAr: "ميني فان عائلي مريح (7 راكب)",
    maxPassengers: 7,
    maxLuggage: 7,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    description: "Comfortable, spacious 7-passenger family minivan with wide legroom and generous cargo trunk for 7 bags.",
    descriptionAr: "فان عائلي مريح ومكيف يتسع لـ 7 ركاب و 7 حقائب سفر كبيرة، الخيار الأمثل للعائلات ومجموعات الأصدقاء.",
    basePrice: 30,
    featuresAr: ["يتسع لـ 7 ركاب براحة", "مساحة لـ 7 حقائب كبيرة", "تكييف هواء مركزي", "شواحن هواتف USB"],
    featuresEn: ["7 Comfortable Seats", "7 Large Suitcase Capacity", "Dual Zone Climate Control", "USB Mobile Charging"]
  },
  {
    id: "veh-hiace",
    name: "Toyota HiAce Tourist Microbus (14-15 Seater)",
    nameAr: "تويوتا هاي إيس سياحي فاخر (14 - 15 راكب)",
    maxPassengers: 15,
    maxLuggage: 15,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    description: "High-roof tourist Toyota HiAce microbus with 14-15 comfortable seats, dual powerful A/C, and huge luggage space.",
    descriptionAr: "ميكروباص سياحي تويوتا هاي إيس سقف عالي مكيف ومجهز بالكامل، يتسع لـ 14 إلى 15 راكب مع مساحة واسعة لجميع الحقائب للمجموعات السياحية والرحلات الكبيرة.",
    basePrice: 45,
    featuresAr: ["يتسع حتى 15 راكب", "سقف عالي ومقاعد مريحة", "مساحة ضخمة لجميع الحقائب", "مثالي للمجموعات والشركات"],
    featuresEn: ["Up to 15 Passenger Capacity", "High-Roof Easy Movement", "Ample Cargo Space", "Ideal for Tours & Groups"]
  },
  {
    id: "veh-vip",
    name: "VIP Executive Luxury SUV (Mercedes / Lexus)",
    nameAr: "سيارة VIP تنفيذية فاخرة (مرسيدس / لكزس SUV)",
    maxPassengers: 4,
    maxLuggage: 4,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description: "Ultimate luxury executive SUV with leather captain chairs, high ride height, onboard WiFi, and VIP concierge.",
    descriptionAr: "أعلى مستويات الرفاهية والفخامة مع مقاعد جلدية فاخرة، واي فاي مجاني، مياه وعصائر، وسائق VIP خاص.",
    basePrice: 65,
    featuresAr: ["فخامة تنفيذية مطلقة", "واي فاي وإنترنت مجاني", "مشروبات وضيافة خاصة", "سائق VIP شخصي"],
    featuresEn: ["Ultimate Executive Luxury", "Free Onboard High-Speed WiFi", "Complimentary Refreshments", "Personal Dedicated VIP Driver"]
  }
];

export const TRANSFER_GALLERY = [
  {
    id: "gal-limo",
    vehicleId: "veh-limo",
    titleAr: "ليموزين وسيدان VIP فاخرة",
    titleEn: "Luxury VIP Limousine & Sedan",
    subtitleAr: "سيدان خاصة مكيفة (1 - 3 ركاب | 3 حقائب)",
    subtitleEn: "Private A/C Sedan (1-3 Pax | 3 Bags)",
    badgeAr: "ليموزين VIP",
    badgeEn: "VIP Limousine",
    price: 20,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "gal-minivan7",
    vehicleId: "veh-minivan7",
    titleAr: "ميني فان عائلي مريح (7 راكب)",
    titleEn: "Family Minivan (7-Seater)",
    subtitleAr: "فان عائلي واسع (حتى 7 ركاب | 7 حقائب كبيرة)",
    subtitleEn: "Spacious Family Van (Up to 7 Pax | 7 Bags)",
    badgeAr: "ميني فان 7 راكب",
    badgeEn: "7-Seater Minivan",
    price: 30,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "gal-hiace",
    vehicleId: "veh-hiace",
    titleAr: "تويوتا هاي إيس سياحي فاخر (14 - 15 راكب)",
    titleEn: "Toyota HiAce Tourist Microbus (14-15 Seater)",
    subtitleAr: "ميكروباص سياحي سقف عالي (14 - 15 راكب | 15 حقيبة)",
    subtitleEn: "High-Roof Tourist Van (14-15 Pax | 15 Bags)",
    badgeAr: "هاي إيس 14-15 راكب",
    badgeEn: "HiAce 14-15 Pax",
    price: 45,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "gal-vip",
    vehicleId: "veh-vip",
    titleAr: "سيارة VIP تنفيذية فاخرة (مرسيدس / لكزس SUV)",
    titleEn: "VIP Executive Luxury SUV",
    subtitleAr: "قمة الرفاهية لرجال الأعمال والرحلات الخاصة (حتى 4 ركاب)",
    subtitleEn: "Ultimate Executive Luxury (Up to 4 Pax)",
    badgeAr: "VIP فخم",
    badgeEn: "Executive SUV",
    price: 65,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80"
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
