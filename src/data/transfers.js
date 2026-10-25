export const SHARM_LOCATIONS = [
  { 
    id: "loc-1", 
    name: "Sharm El Sheikh Int. Airport (SSH)", 
    nameAr: "مطار شرم الشيخ الدولي (SSH)", 
    category: "Airport",
    categoryAr: "المطار"
  },
  { 
    id: "loc-2", 
    name: "Naama Bay Resorts & Hotels", 
    nameAr: "فنادق ومنتجعات خليج نعمة", 
    category: "Hotel Zone",
    categoryAr: "منطقة الفنادق"
  },
  { 
    id: "loc-3", 
    name: "Nabq Bay Luxury Resorts", 
    nameAr: "فنادق ومنتجعات خليج نبق", 
    category: "Hotel Zone",
    categoryAr: "منطقة الفنادق"
  },
  { 
    id: "loc-4", 
    name: "Hadaba & Ras Um Sid", 
    nameAr: "الهضبة ورأس أم سيد", 
    category: "Hotel Zone",
    categoryAr: "منطقة الفنادق"
  },
  { 
    id: "loc-5", 
    name: "Sharks Bay & Soho Square", 
    nameAr: "خليج شاركس وسوهو سكوير", 
    category: "Hotel Zone",
    categoryAr: "منطقة الفنادق"
  },
  { 
    id: "loc-6", 
    name: "Pasha Coast & Garden Bay", 
    nameAr: "ساحل باشا وجاردن باي", 
    category: "Hotel Zone",
    categoryAr: "منطقة الفنادق"
  },
  { 
    id: "loc-7", 
    name: "Ras Nasrani Bay", 
    nameAr: "خليج رأس نصراني", 
    category: "Hotel Zone",
    categoryAr: "منطقة الفنادق"
  },
  { 
    id: "loc-8", 
    name: "Sharm El Sheikh Port & Marina", 
    nameAr: "ميناء ومارينا شرم الشيخ البحرية", 
    category: "Port/Marina",
    categoryAr: "المينا والمارينا"
  },
  { 
    id: "loc-9", 
    name: "Safari Quad Base Camp", 
    nameAr: "مركز سفاري المكن والبيتش باجي بالصحراء", 
    category: "Activity Hub",
    categoryAr: "مركز أنشطة"
  },
  { 
    id: "loc-10", 
    name: "Dahab City / Blue Hole", 
    nameAr: "مدينة دهب والبلو هول", 
    category: "Day Excursion",
    categoryAr: "رحلة خارجية"
  }
];

export const VEHICLE_TYPES = [
  {
    id: "veh-sedan",
    name: "Private Sedan Car",
    nameAr: "سيارة ملاكي خاصة (سيدان)",
    maxPassengers: 3,
    maxLuggage: 3,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    description: "Comfortable air-conditioned sedan suitable for couples or small families.",
    descriptionAr: "سيارة حديثة ومكيفة تناسب الأزواج والعائلات الصغيرة حتى 3 أفراد.",
    basePrice: 20
  },
  {
    id: "veh-van",
    name: "Private Minivan / Family Van",
    nameAr: "فان عائلي ميني باص (تويوتا/هيونداي)",
    maxPassengers: 8,
    maxLuggage: 8,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    description: "Spacious Toyota HiAce or Hyundai van for families and groups with extra luggage.",
    descriptionAr: "فان واسع جداً يتسع للمجموعات والأسر الكبيرة مع الحقائب الكثيرة.",
    basePrice: 35
  },
  {
    id: "veh-vip",
    name: "VIP Executive SUV (Mercedes / Lexus)",
    nameAr: "سيارة VIP فاخرة (مرسيدس / لكزس)",
    maxPassengers: 4,
    maxLuggage: 4,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    description: "Luxury VIP vehicle with leather seats, bottled water, WiFi, and dedicated chauffeur.",
    descriptionAr: "سيارة فاخرة بمقاعد جلدية وشديدة الرفاهية وسائق خاص بزي VIP رسمى.",
    basePrice: 65
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
