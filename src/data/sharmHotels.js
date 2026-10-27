// Master Directory of Hotels, Resorts and Key Locations in Sharm El Sheikh (Egypt)
// Covers ~100% of operational hotels across all major hotel zones.

export const SHARM_ZONES = [
  { id: 'nabq', nameEn: 'Nabq Bay Resorts', nameAr: 'فنادق ومنتجعات خليج نبق' },
  { id: 'ras_nasrani', nameEn: 'Ras Nasrani & Montazah', nameAr: 'فنادق رأس نصراني والمنتزه' },
  { id: 'sharks_bay', nameEn: 'Sharks Bay & Soho Square', nameAr: 'فنادق خليج القرش وسوهو سكوير' },
  { id: 'naama_bay', nameEn: 'Naama Bay & Pasha Coast', nameAr: 'فنادق خليج نعمة وساحل باشا' },
  { id: 'hadaba', nameEn: 'Hadaba & Ras Um Sid', nameAr: 'فنادق الهضبة ورأس أم سيد' },
  { id: 'sharm_el_maya', nameEn: 'Sharm El Maya & Old Market', nameAr: 'فنادق شرم المية والسوق القديم' },
  { id: 'dahab', nameEn: 'Dahab Excursions & Resorts', nameAr: 'فنادق ومنتجعات دهب' },
  { id: 'transit', nameEn: 'Airports, Ports & Hubs', nameAr: 'المطارات والموانئ والمحطات' },
];

export const SHARM_HOTELS = [
  // ─── TRANSIT HUBS ─────────────────────────────────────────────
  {
    id: 'ssh-airport',
    name: 'Sharm El Sheikh Int. Airport (SSH)',
    nameAr: 'مطار شرم الشيخ الدولي (SSH)',
    zoneId: 'transit',
    category: 'Airport',
    categoryAr: 'المطار الدولي'
  },
  {
    id: 'sharm-port',
    name: 'Sharm El Sheikh Port & Marina',
    nameAr: 'ميناء ومارينا شرم الشيخ البحرية',
    zoneId: 'transit',
    category: 'Marina',
    categoryAr: 'الميناء والمارينا'
  },
  {
    id: 'soho-square-hub',
    name: 'Soho Square Main Center',
    nameAr: 'سوهو سكوير (الميدان الرئيسي)',
    zoneId: 'transit',
    category: 'Hub',
    categoryAr: 'معلم سياحي'
  },
  {
    id: 'safari-camp-hub',
    name: 'Desert Safari Quad Base Camp',
    nameAr: 'مركز محطة سفاري البيتش باجي بالصحراء',
    zoneId: 'transit',
    category: 'Activity Hub',
    categoryAr: 'مركز أنشطة'
  },

  // ─── NABQ BAY (خليج نبق) ──────────────────────────────────────
  {
    id: 'rixos-premium-seagate',
    name: 'Rixos Premium Seagate',
    nameAr: 'فندق ريكسوس بريميوم سيجيت',
    zoneId: 'nabq',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر 5 نجوم'
  },
  {
    id: 'rixos-sharm-adults',
    name: 'Rixos Sharm El Sheikh (Adults Only)',
    nameAr: 'فندق ريكسوس شرم الشيخ (للبالغين فقط)',
    zoneId: 'nabq',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر للبالغين'
  },
  {
    id: 'rixos-radamis',
    name: 'Rixos Radamis Sharm El Sheikh',
    nameAr: 'فندق ريكسوس راداميس شرم الشيخ',
    zoneId: 'nabq',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر'
  },
  {
    id: 'steigenberger-alcazar',
    name: 'Steigenberger Alcazar',
    nameAr: 'فندق شتايجنجر ألكازار',
    zoneId: 'nabq',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر 5 نجوم'
  },
  {
    id: 'albatros-royal-moderna',
    name: 'Pickalbatros Royal Moderna Resort',
    nameAr: 'منتجع بيك الباتروس رويال موديرنا',
    zoneId: 'nabq',
    category: 'Resort & Aqua Park',
    categoryAr: 'منتجع وأكوا بارك'
  },
  {
    id: 'albatros-laguna-vista',
    name: 'Albatros Laguna Vista Resort',
    nameAr: 'منتجع ألباتروس لاجونا فيستا',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'jaz-mirabel-beach',
    name: 'Jaz Mirabel Beach Resort',
    nameAr: 'فندق جاز ميرابل بيتش',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'jaz-mirabel-park-club',
    name: 'Jaz Mirabel Park & Club',
    nameAr: 'فندق جاز ميرابل بارك وكلوب',
    zoneId: 'nabq',
    category: 'Resort',
    categoryAr: 'منتجع سياحي'
  },
  {
    id: 'cleopatra-luxury-resort',
    name: 'Cleopatra Luxury Resort Sharm',
    nameAr: 'منتجع كليوباترا لاكشري ريزورت',
    zoneId: 'nabq',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر'
  },
  {
    id: 'regency-plaza-aqua-park',
    name: 'Regency Plaza Aqua Park & Spa',
    nameAr: 'منتجع ريجنسي بلازا أكوا بارك وسبا',
    zoneId: 'nabq',
    category: 'Aqua Park Resort',
    categoryAr: 'منتجع وأكوا بارك'
  },
  {
    id: 'charmillion-club-resort',
    name: 'Charmillion Club Resort',
    nameAr: 'منتجع شارميليون كلوب ريزورت',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'charmillion-club-aqua-park',
    name: 'Charmillion Club Aqua Park',
    nameAr: 'منتجع شارميليون كلوب أكوا بارك',
    zoneId: 'nabq',
    category: 'Aqua Park Resort',
    categoryAr: 'منتجع وأكوا بارك'
  },
  {
    id: 'charmillion-sea-life',
    name: 'Charmillion Sea Life Resort',
    nameAr: 'منتجع شارميليون سي لايف',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'charmillion-gardens-aqua',
    name: 'Charmillion Gardens Aqua Park',
    nameAr: 'منتجع شارميليون جاردنز أكوا بارك',
    zoneId: 'nabq',
    category: 'Aqua Park Resort',
    categoryAr: 'منتجع وأكوا بارك'
  },
  {
    id: 'parrotel-beach-resort',
    name: 'Parrotel Beach Resort',
    nameAr: 'منتجع باروتيل بيتش ريزورت',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'parrotel-aqua-park',
    name: 'Parrotel Aqua Park Resort',
    nameAr: 'منتجع باروتيل أكوا بارك',
    zoneId: 'nabq',
    category: 'Aqua Park Resort',
    categoryAr: 'منتجع وأكوا بارك'
  },
  {
    id: 'parrotel-lagoon-resort',
    name: 'Parrotel Lagoon Resort',
    nameAr: 'منتجع باروتيل لاجون ريزورت',
    zoneId: 'nabq',
    category: 'Resort',
    categoryAr: 'منتجع سياحي'
  },
  {
    id: 'barcelo-tiran-sharm',
    name: 'Barceló Tiran Sharm',
    nameAr: 'فندق بارسيلو تيران شرم',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي فاخر'
  },
  {
    id: 'coral-sea-waterworld',
    name: 'Coral Sea Waterworld Nabq',
    nameAr: 'منتجع كورال سي ووتر وورلد نبق',
    zoneId: 'nabq',
    category: 'Aqua Park Resort',
    categoryAr: 'منتجع وألعاب مائية'
  },
  {
    id: 'coral-sea-holiday',
    name: 'Coral Sea Holiday Resort',
    nameAr: 'منتجع كورال سي هوليداي',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'coral-sea-aqua-club',
    name: 'Coral Sea Aqua Club',
    nameAr: 'منتجع كورال سي أكوا كلوب',
    zoneId: 'nabq',
    category: 'Resort',
    categoryAr: 'منتجع سياحي'
  },
  {
    id: 'aurora-oriental-resort',
    name: 'Aurora Oriental Resort',
    nameAr: 'منتجع أورورا أورينتال ريزورت',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'sea-beach-aqua-park',
    name: 'Sea Beach Aqua Park Resort',
    nameAr: 'منتجع سي بيتش أكوا بارك',
    zoneId: 'nabq',
    category: 'Aqua Park Resort',
    categoryAr: 'منتجع وأكوا بارك'
  },
  {
    id: 'tamra-beach-resort',
    name: 'Tamra Beach Resort',
    nameAr: 'منتجع تمرة بيتش ريزورت',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'amwaj-oyoun-resort',
    name: 'Amwaj Oyoun Resort & Casino',
    nameAr: 'منتجع وكازينو أمواج عيون',
    zoneId: 'nabq',
    category: 'Beach Resort & Casino',
    categoryAr: 'منتجع وكازينو'
  },
  {
    id: 'nubian-village-hotel',
    name: 'Nubian Village Hotel',
    nameAr: 'فندق قرية النوبة (نوبيان فيليدج)',
    zoneId: 'nabq',
    category: 'Theme Resort',
    categoryAr: 'منتجع بطابع نوبي'
  },
  {
    id: 'nubian-island-hotel',
    name: 'Nubian Island Hotel',
    nameAr: 'فندق نوبيان آيلاند ريزورت',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'rehana-royal-beach',
    name: 'Rehana Royal Beach Resort & Spa',
    nameAr: 'منتجع ريحانة رويال بيتش وسبا',
    zoneId: 'nabq',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'rehana-sharm-resort',
    name: 'Rehana Sharm Resort & Aqua Park',
    nameAr: 'منتجع ريحانة شرم ريزورت وأكوا بارك',
    zoneId: 'nabq',
    category: 'Aqua Park Resort',
    categoryAr: 'منتجع وأكوا بارك'
  },
  {
    id: 'faraana-heights-resort',
    name: 'Faraana Heights Resort',
    nameAr: 'منتجع فراعنة هايتس ريزورت',
    zoneId: 'nabq',
    category: 'Resort',
    categoryAr: 'منتجع سياحي'
  },
  {
    id: 'magic-world-sharm',
    name: 'Magic World Sharm (Club Med)',
    nameAr: 'فندق ماجيك وورلد شرم الشيخ',
    zoneId: 'nabq',
    category: 'All-Inclusive Club',
    categoryAr: 'منتجع شامل كلياً'
  },
  {
    id: 'palmyra-amar-el-zaman',
    name: 'Palmyra Amar El Zaman Aqua Park',
    nameAr: 'فندق تدمر قمر الزمان أكوا بارك',
    zoneId: 'nabq',
    category: 'Aqua Park Hotel',
    categoryAr: 'فندق وأكوا بارك'
  },

  // ─── RAS NASRANI & MONTAZAH (رأس نصراني والمنتزه) ─────────────
  {
    id: 'baron-resort-sharm',
    name: 'Baron Resort Sharm El Sheikh',
    nameAr: 'منتجع بارون ريزورت شرم الشيخ',
    zoneId: 'ras_nasrani',
    category: 'Luxury Beach Resort',
    categoryAr: 'منتجع شاطئي فاخر'
  },
  {
    id: 'baron-palms-adults',
    name: 'Baron Palms Resort (Adults Only)',
    nameAr: 'منتجع بارون بالمز (للبالغين فقط)',
    zoneId: 'ras_nasrani',
    category: 'Adults Only Boutique',
    categoryAr: 'منتجع بوتيك للبالغين'
  },
  {
    id: 'sunrise-remal-beach',
    name: 'Sunrise Remal Beach Resort',
    nameAr: 'منتجع صن رايز رمال بيتش',
    zoneId: 'ras_nasrani',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي فاخر'
  },
  {
    id: 'sunrise-remal-resort',
    name: 'Sunrise Remal Resort',
    nameAr: 'منتجع صن رايز رمال ريزورت',
    zoneId: 'ras_nasrani',
    category: 'Family Resort',
    categoryAr: 'منتجع عائلي'
  },
  {
    id: 'albatros-palace-sharm',
    name: 'Pickalbatros Palace Sharm',
    nameAr: 'منتجع ألباتروس بالاس شرم الشيخ',
    zoneId: 'ras_nasrani',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر 5 نجوم'
  },
  {
    id: 'jaz-belvedere',
    name: 'Jaz Belvedere Resort',
    nameAr: 'فندق جاز بيلفيدير ريزورت',
    zoneId: 'ras_nasrani',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'coral-sea-sensatori',
    name: 'Coral Sea Sensatori Resort',
    nameAr: 'منتجع كورال سي سينساتوري',
    zoneId: 'ras_nasrani',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر'
  },
  {
    id: 'cyrene-grand-hotel',
    name: 'Cyrene Grand Hotel Montazah',
    nameAr: 'فندق سيرين جراند هوتيل المنتزه',
    zoneId: 'ras_nasrani',
    category: 'Beach Hotel',
    categoryAr: 'فندق شاطئي'
  },
  {
    id: 'cyrene-sharm-hotel',
    name: 'Cyrene Sharm Hotel',
    nameAr: 'فندق سيرين شرم هوتيل',
    zoneId: 'ras_nasrani',
    category: 'Hotel',
    categoryAr: 'فندق'
  },
  {
    id: 'coral-mantarraya',
    name: 'Coral Mantarraya Resort',
    nameAr: 'منتجع كورال مانتارايا',
    zoneId: 'ras_nasrani',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },

  // ─── SHARKS BAY & SOHO SQUARE (خليج القرش وسوهو سكوير) ────────
  {
    id: 'four-seasons-sharm',
    name: 'Four Seasons Resort Sharm El Sheikh',
    nameAr: 'فندق فور سيزونز شرم الشيخ',
    zoneId: 'sharks_bay',
    category: 'Ultra Luxury Resort',
    categoryAr: 'منتجع فائق الفخامة 5 نجوم'
  },
  {
    id: 'savoy-sharm-el-sheikh',
    name: 'Savoy Sharm El Sheikh',
    nameAr: 'فندق سافوي شرم الشيخ',
    zoneId: 'sharks_bay',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر بجوار سوهو سكوير'
  },
  {
    id: 'royal-savoy-sharm',
    name: 'Royal Savoy Sharm El Sheikh',
    nameAr: 'فندق رويال سافوي شرم الشيخ (VIP)',
    zoneId: 'sharks_bay',
    category: 'VIP Luxury Boutique',
    categoryAr: 'فندق فاخر VIP'
  },
  {
    id: 'sierra-sharm-el-sheikh',
    name: 'Sierra Hotel Sharm El Sheikh',
    nameAr: 'فندق سييرا شرم الشيخ',
    zoneId: 'sharks_bay',
    category: 'All-Inclusive Resort',
    categoryAr: 'منتجع شامل كلياً'
  },
  {
    id: 'grand-rotana-resort',
    name: 'Grand Rotana Resort & Spa',
    nameAr: 'منتجع جراند روتانا وسبا',
    zoneId: 'sharks_bay',
    category: 'Luxury Beach Resort',
    categoryAr: 'منتجع شاطئي فاخر 5 نجوم'
  },
  {
    id: 'sultan-gardens-resort',
    name: 'Sultan Gardens Resort',
    nameAr: 'منتجع سلطان جاردنز ريزورت',
    zoneId: 'sharks_bay',
    category: 'Luxury Beach Resort',
    categoryAr: 'منتجع شاطئي فاخر'
  },
  {
    id: 'concorde-el-salam-front',
    name: 'Concorde El Salam Hotel (Beach Front)',
    nameAr: 'فندق كونكورد السلام (الواجهة الشاطئية)',
    zoneId: 'sharks_bay',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'concorde-el-salam-sport',
    name: 'Concorde El Salam Sport Hotel',
    nameAr: 'فندق كونكورد السلام سبورت',
    zoneId: 'sharks_bay',
    category: 'Sport Resort',
    categoryAr: 'منتجع رياضي'
  },
  {
    id: 'sunrise-arabian-beach',
    name: 'Sunrise Arabian Beach Resort',
    nameAr: 'منتجع صن رايز أرابيان بيتش',
    zoneId: 'sharks_bay',
    category: 'Luxury Beach Resort',
    categoryAr: 'منتجع شاطئي فاخر'
  },
  {
    id: 'island-view-resort',
    name: 'Island View Resort Sharks Bay',
    nameAr: 'فندق آيلاند فيو ريزورت خليج القرش',
    zoneId: 'sharks_bay',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'pyramisa-beach-resort',
    name: 'Pyramisa Beach Resort Sharm',
    nameAr: 'منتجع بيراميزا بيتش شرم الشيخ',
    zoneId: 'sharks_bay',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'xperience-sea-breeze',
    name: 'Xperience Sea Breeze Resort (Adults Only)',
    nameAr: 'منتجع إكسبيرينس سي بريز (للبالغين)',
    zoneId: 'sharks_bay',
    category: 'Adults Only Resort',
    categoryAr: 'منتجع للبالغين'
  },
  {
    id: 'maritim-jolie-ville-golf',
    name: 'Maritim Jolie Ville Golf & Resort',
    nameAr: 'منتجع ماريتيم جولي فيل جولف ريزورت',
    zoneId: 'sharks_bay',
    category: 'Golf Resort',
    categoryAr: 'منتجع ملاعب جولف'
  },
  {
    id: 'doubletree-hilton-sharks-bay',
    name: 'DoubleTree by Hilton Sharks Bay',
    nameAr: 'فندق دبل تري من هيلتون خليج القرش',
    zoneId: 'sharks_bay',
    category: 'Hilton Resort',
    categoryAr: 'منتجع هيلتون'
  },
  {
    id: 'sharks-bay-oasis',
    name: 'Sharks Bay Oasis Resort',
    nameAr: 'فندق واحة خليج القرش (شاركس باي أواسيس)',
    zoneId: 'sharks_bay',
    category: 'Diving Resort',
    categoryAr: 'منتجع غوص'
  },
  {
    id: 'umbi-sharks-bay',
    name: 'Umbi Sharks Bay Diving Village',
    nameAr: 'قرية أمبي للغوص بخليج القرش',
    zoneId: 'sharks_bay',
    category: 'Diving Village',
    categoryAr: 'قرية غوص بيئية'
  },

  // ─── NAAMA BAY & PASHA COAST (خليج نعمة وساحل باشا) ───────────
  {
    id: 'stella-di-mare-beach',
    name: 'Stella Di Mare Beach Hotel & Spa',
    nameAr: 'فندق ستيلا دي ماري بيتش وسبا',
    zoneId: 'naama_bay',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر 5 نجوم'
  },
  {
    id: 'movenpick-resort-sharm',
    name: 'Mövenpick Resort Sharm El Sheikh',
    nameAr: 'منتجع موفنبيك شرم الشيخ',
    zoneId: 'naama_bay',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر بإطلالة بانورامية'
  },
  {
    id: 'novotel-sharm-beach',
    name: 'Novotel Sharm El Sheikh Beach',
    nameAr: 'فندق نوفوتيل شرم الشيخ بيتش',
    zoneId: 'naama_bay',
    category: 'Beach Resort',
    categoryAr: 'فندق شاطئي بخليج نعمة'
  },
  {
    id: 'novotel-sharm-palm',
    name: 'Novotel Sharm El Sheikh Palm',
    nameAr: 'فندق نوفوتيل شرم الشيخ بالم',
    zoneId: 'naama_bay',
    category: 'Family Resort',
    categoryAr: 'منتجع عائلي'
  },
  {
    id: 'maritim-jolie-ville-casino',
    name: 'Maritim Jolie Ville Resort & Casino',
    nameAr: 'منتجع ماريتيم جولي فيل وكازينو نعمة باي',
    zoneId: 'naama_bay',
    category: 'Resort & Casino',
    categoryAr: 'منتجع وكازينو بقلب نعمة باي'
  },
  {
    id: 'tropitel-naama-bay',
    name: 'Tropitel Naama Bay Hotel',
    nameAr: 'فندق تروبيتيل خليج نعمة',
    zoneId: 'naama_bay',
    category: 'Central Hotel',
    categoryAr: 'فندق بوسط خليج نعمة'
  },
  {
    id: 'jaz-sharm-dreams',
    name: 'Jaz Sharm Dreams Resort',
    nameAr: 'منتجع جاز شرم دريمز',
    zoneId: 'naama_bay',
    category: 'Resort & Aqua Park',
    categoryAr: 'منتجع وأكوا بارك'
  },
  {
    id: 'jaz-fayrouz',
    name: 'Jaz Fayrouz Resort',
    nameAr: 'منتجع جاز فيروز ريزورت',
    zoneId: 'naama_bay',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'naama-bay-promenade-beach',
    name: 'Naama Bay Promenade Beach Resort',
    nameAr: 'منتجع نعمة باي بروميناد بيتش',
    zoneId: 'naama_bay',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي ماريوت سابقاً'
  },
  {
    id: 'naama-bay-promenade-mountain',
    name: 'Naama Bay Promenade Mountain Resort',
    nameAr: 'منتجع نعمة باي بروميناد ماونتن',
    zoneId: 'naama_bay',
    category: 'Resort',
    categoryAr: 'منتجع سياحي'
  },
  {
    id: 'helnan-marina-sharm',
    name: 'Helnan Marina Sharm Hotel',
    nameAr: 'فندق هلنان مارينا شرم الشيخ',
    zoneId: 'naama_bay',
    category: 'Beach Hotel',
    categoryAr: 'فندق شاطئي عريق'
  },
  {
    id: 'gafy-resort-aqua-park',
    name: 'Gafy Resort Aqua Park',
    nameAr: 'منتجع جافي ريزورت أكوا بارك',
    zoneId: 'naama_bay',
    category: 'Beach & Aqua Park',
    categoryAr: 'منتجع شاطئي وألعاب مائية'
  },
  {
    id: 'cataract-layalina',
    name: 'Cataract Layalina Naama Bay',
    nameAr: 'فندق كاتاراكت ليالينا خليج نعمة',
    zoneId: 'naama_bay',
    category: 'Beach Hotel',
    categoryAr: 'فندق شاطئي'
  },
  {
    id: 'cataract-resort-naama',
    name: 'Cataract Resort Naama Bay',
    nameAr: 'فندق كاتاراكت ريزورت خليج نعمة',
    zoneId: 'naama_bay',
    category: 'Central Hotel',
    categoryAr: 'فندق سياحي'
  },
  {
    id: 'sharm-cliff-resort',
    name: 'Sharm Cliff Resort',
    nameAr: 'فندق شرم كليف ريزورت',
    zoneId: 'naama_bay',
    category: 'Cliff Hotel',
    categoryAr: 'فندق هضبة نعمة باي'
  },
  {
    id: 'sharm-holiday-resort',
    name: 'Sharm Holiday Resort',
    nameAr: 'فندق شرم هوليداي ريزورت',
    zoneId: 'naama_bay',
    category: 'Resort',
    categoryAr: 'منتجع عائلي'
  },
  {
    id: 'falcon-naama-star',
    name: 'Falcon Naama Star Hotel',
    nameAr: 'فندق فالكون نعمة ستار',
    zoneId: 'naama_bay',
    category: 'Hotel',
    categoryAr: 'فندق سياحي'
  },
  {
    id: 'kanabesh-naama-bay',
    name: 'Kanabesh Hotel Naama Bay',
    nameAr: 'فندق كنابيش خليج نعمة',
    zoneId: 'naama_bay',
    category: 'Hotel',
    categoryAr: 'فندق شاطئي'
  },
  {
    id: 'noria-resort-naama',
    name: 'Noria Resort Naama Bay',
    nameAr: 'فندق نوريا ريزورت خليج نعمة',
    zoneId: 'naama_bay',
    category: 'Resort',
    categoryAr: 'منتجع سياحي'
  },
  {
    id: 'sheraton-sharm-hotel',
    name: 'Sheraton Sharm Hotel, Resort & Villas',
    nameAr: 'فندق شيراتون شرم الشيخ ريزورت وفيلل',
    zoneId: 'naama_bay',
    category: 'Luxury Resort',
    categoryAr: 'منتجع شيراتون الفاخر'
  },
  {
    id: 'continental-plaza-beach',
    name: 'Continental Plaza Beach Resort',
    nameAr: 'منتجع كونتيننتال بلازا بيتش ساحل باشا',
    zoneId: 'naama_bay',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'park-regency-sharm',
    name: 'Park Regency Sharm El Sheikh (Hyatt Regency)',
    nameAr: 'فندق بارك ريجنسي (حياة ريجنسي سابقاً)',
    zoneId: 'naama_bay',
    category: 'Ultra Luxury Resort',
    categoryAr: 'منتجع فاخر 5 نجوم'
  },
  {
    id: 'sinai-grand-casino',
    name: 'Sinai Grand Casino & Hotel',
    nameAr: 'فندق وسيناء جراند كازينو',
    zoneId: 'naama_bay',
    category: 'Casino & Hotel',
    categoryAr: 'فندق وكازينو'
  },

  // ─── HADABA & RAS UM SID (الهضبة ورأس أم سيد) ─────────────────
  {
    id: 'albatros-aqua-blu',
    name: 'Pickalbatros Aqua Blu Resort Sharm',
    nameAr: 'منتجع بيك الباتروس أكوا بلو شرم',
    zoneId: 'hadaba',
    category: 'Aqua Park Resort',
    categoryAr: 'منتجع عائلي وأكوا بارك'
  },
  {
    id: 'albatros-aqua-park',
    name: 'Pickalbatros Aqua Park Resort',
    nameAr: 'منتجع بيك الباتروس أكوا بارك ريزورت',
    zoneId: 'hadaba',
    category: 'Aqua Park Resort',
    categoryAr: 'أكبر مدينة ألعاب مائية'
  },
  {
    id: 'albatros-sharm-resort',
    name: 'Albatros Sharm Resort',
    nameAr: 'منتجع ألباتروس شرم ريزورت',
    zoneId: 'hadaba',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي عريق'
  },
  {
    id: 'jaz-fanara-resort',
    name: 'Jaz Fanara Resort & Residence',
    nameAr: 'فندق جاز فنارة ريزورت ورزيدنس',
    zoneId: 'hadaba',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئ رأس أم سيد'
  },
  {
    id: 'reef-oasis-beach-resort',
    name: 'Reef Oasis Beach Resort',
    nameAr: 'منتجع ريف أواسيس بيتش ريزورت',
    zoneId: 'hadaba',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي على أجمل شعب مرجانية'
  },
  {
    id: 'sentido-reef-oasis',
    name: 'Sentido Reef Oasis Senses Resort',
    nameAr: 'منتجع سنتيدو ريف أواسيس سنسز',
    zoneId: 'hadaba',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر 5 نجوم'
  },
  {
    id: 'renaissance-sharm-golden',
    name: 'Renaissance Sharm Golden View Beach',
    nameAr: 'فندق رينيسانس شرم الشيخ جولدن فيو',
    zoneId: 'hadaba',
    category: 'Luxury Beach Resort',
    categoryAr: 'منتجع ماريوت رينيسانس الفاخر'
  },
  {
    id: 'sunrise-montemare-adults',
    name: 'Sunrise Montemare Resort (Adults Only)',
    nameAr: 'منتجع صن رايز مونتيماري (للبالغين فقط)',
    zoneId: 'hadaba',
    category: 'Luxury Adults Only',
    categoryAr: 'منتجع فاخر للبالغين'
  },
  {
    id: 'sunrise-diamond-beach',
    name: 'Sunrise Diamond Beach Resort',
    nameAr: 'منتجع صن رايز دايموند بيتش جراند سيلكت',
    zoneId: 'hadaba',
    category: 'Luxury Beach Resort',
    categoryAr: 'منتجع شاطئي عائلي فاخر'
  },
  {
    id: 'amphoras-beach-resort',
    name: 'Amphoras Beach Resort',
    nameAr: 'منتجع أمفوراس بيتش ريزورت',
    zoneId: 'hadaba',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'amphoras-blu-resort',
    name: 'Amphoras Blu Resort',
    nameAr: 'منتجع أمفوراس بلو ريزورت',
    zoneId: 'hadaba',
    category: 'Resort',
    categoryAr: 'منتجع سياحي'
  },
  {
    id: 'amphoras-aqua-resort',
    name: 'Amphoras Aqua Resort',
    nameAr: 'منتجع أمفوراس أكوا ريزورت',
    zoneId: 'hadaba',
    category: 'Aqua Resort',
    categoryAr: 'منتجع وأكوا'
  },
  {
    id: 'il-mercato-hotel',
    name: 'Il Mercato Hotel & Spa',
    nameAr: 'فندق إيل ميركاتو وسبا بالهضبة',
    zoneId: 'hadaba',
    category: 'Boutique Hotel',
    categoryAr: 'فندق ممشى إيل ميركاتو'
  },
  {
    id: 'faraana-reef-resort',
    name: 'Faraana Reef Resort',
    nameAr: 'فندق ومنتجع فراعنة ريف',
    zoneId: 'hadaba',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئ الفنار'
  },
  {
    id: 'safir-sharm-waterfalls',
    name: 'Safir Sharm Waterfalls Resort',
    nameAr: 'منتجع سفير شرم ووترفولز (هيلتون سابقاً)',
    zoneId: 'hadaba',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي الشلالات'
  },
  {
    id: 'queen-sharm-resort',
    name: 'Queen Sharm Resort Beach & Aqua Park',
    nameAr: 'منتجع كوين شرم بيتش وأكوا بارك',
    zoneId: 'hadaba',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'beach-albatros-hadaba',
    name: 'Beach Albatros Sharm El Sheikh',
    nameAr: 'فندق بيتش ألباتروس شرم الشيخ',
    zoneId: 'hadaba',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'tivoli-hotel-aqua',
    name: 'Tivoli Hotel Aqua Park',
    nameAr: 'فندق تيفولي هوتيل أكوا بارك',
    zoneId: 'hadaba',
    category: 'Hotel',
    categoryAr: 'فندق سياحي'
  },
  {
    id: 'viva-sharm-hotel',
    name: 'Viva Sharm Hotel',
    nameAr: 'فندق فيفا شرم هوتيل',
    zoneId: 'hadaba',
    category: 'Hotel',
    categoryAr: 'فندق سياحي'
  },
  {
    id: 'falcon-hills-hotel',
    name: 'Falcon Hills Hotel',
    nameAr: 'فندق فالكون هيلز هوتيل',
    zoneId: 'hadaba',
    category: 'Hotel',
    categoryAr: 'فندق هادئ بالهضبة'
  },
  {
    id: 'uni-sharm-hotel',
    name: 'Uni Sharm Hotel',
    nameAr: 'فندق يوني شرم هوتيل',
    zoneId: 'hadaba',
    category: 'Hotel',
    categoryAr: 'فندق اقتصادي'
  },
  {
    id: 'sharming-inn-hotel',
    name: 'Sharming Inn Hotel',
    nameAr: 'فندق شارمينج إن هوتيل',
    zoneId: 'hadaba',
    category: 'Hotel & Aqua',
    categoryAr: 'فندق وألعاب مائية'
  },
  {
    id: 'old-vic-sharm',
    name: 'Old Vic Sharm Resort',
    nameAr: 'منتجع أولد فيك شرم ريزورت',
    zoneId: 'hadaba',
    category: 'Hotel',
    categoryAr: 'فندق سياحي'
  },
  {
    id: 'aida-hotel-sharm',
    name: 'Aida Hotel Sharm El Sheikh',
    nameAr: 'فندق عايدة شرم الشيخ',
    zoneId: 'hadaba',
    category: 'Hotel',
    categoryAr: 'فندق سياحي'
  },
  {
    id: 'dive-inn-resort',
    name: 'Dive Inn Resort Hadaba',
    nameAr: 'فندق دايف إن ريزورت الهضبة',
    zoneId: 'hadaba',
    category: 'Diving Resort',
    categoryAr: 'منتجع غوص'
  },
  {
    id: 'sunset-partner-hotel',
    name: 'Sunset Partner Hotel',
    nameAr: 'فندق صنسيت بارتنر الهضبة',
    zoneId: 'hadaba',
    category: 'Hotel',
    categoryAr: 'فندق سياحي'
  },

  // ─── SHARM EL MAYA & OLD MARKET (شرم المية والسوق القديم) ────
  {
    id: 'iberotel-palace-adults',
    name: 'Iberotel Palace (Adults Only)',
    nameAr: 'فندق إيبيروتيل بالاس (للبالغين فقط)',
    zoneId: 'sharm_el_maya',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئ شرم المية'
  },
  {
    id: 'seti-sharm-palm',
    name: 'Seti Sharm Palm Beach Resort',
    nameAr: 'فندق سيتي شرم بالم بيتش ريزورت',
    zoneId: 'sharm_el_maya',
    category: 'Beach Resort',
    categoryAr: 'منتجع رملي على خليج شرم المية'
  },
  {
    id: 'turquoise-beach-hotel',
    name: 'Turquoise Beach Hotel',
    nameAr: 'فندق تركواز بيتش هوتيل',
    zoneId: 'sharm_el_maya',
    category: 'Beach Hotel',
    categoryAr: 'فندق شاطئي'
  },
  {
    id: 'old-market-center',
    name: 'Old Market (Al Sahaba Mosque Area)',
    nameAr: 'منطقة السوق القديم ومسجد الصحابة',
    zoneId: 'sharm_el_maya',
    category: 'Landmark',
    categoryAr: 'معلم ومركز تاريخي'
  },

  // ─── DAHAB (مدينة دهب) ────────────────────────────────────────
  {
    id: 'le-meridien-dahab',
    name: 'Le Méridien Dahab Resort',
    nameAr: 'منتجع لو ميريديان دهب',
    zoneId: 'dahab',
    category: 'Luxury Resort',
    categoryAr: 'منتجع فاخر في دهب'
  },
  {
    id: 'swiss-inn-dahab',
    name: 'Swiss Inn Resort Dahab',
    nameAr: 'منتجع سويس إن دهب لاجون',
    zoneId: 'dahab',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئ اللاجون'
  },
  {
    id: 'jaz-dahabeya',
    name: 'Jaz Dahabeya Hotel',
    nameAr: 'فندق جاز دهبية',
    zoneId: 'dahab',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'safir-dahab-resort',
    name: 'Safir Dahab Resort',
    nameAr: 'منتجع سفير دهب (هيلتون سابقاً)',
    zoneId: 'dahab',
    category: 'Beach Resort',
    categoryAr: 'منتجع شاطئي'
  },
  {
    id: 'happy-life-dahab',
    name: 'Happy Life Village Dahab',
    nameAr: 'قرية هابي لايف دهب',
    zoneId: 'dahab',
    category: 'Resort',
    categoryAr: 'منتجع سياحي'
  },
  {
    id: 'dahab-blue-hole-center',
    name: 'Dahab Blue Hole & Canyon Area',
    nameAr: 'منطقة البلو هول والكانيون بدهب',
    zoneId: 'dahab',
    category: 'Day Excursion Hub',
    categoryAr: 'نقطة انطلاق الرحلات'
  }
];

export const getLocalizedHotelName = (hotel, lang = 'ar') => {
  if (!hotel) return '';
  return lang === 'ar' ? (hotel.nameAr || hotel.name) : (hotel.name || hotel.nameAr);
};

export const getLocalizedZoneName = (zoneId, lang = 'ar') => {
  const zone = SHARM_ZONES.find(z => z.id === zoneId);
  if (!zone) return '';
  return lang === 'ar' ? zone.nameAr : zone.nameEn;
};
