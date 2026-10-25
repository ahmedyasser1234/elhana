export const FAQ_CATEGORIES = [
  { id: "all", name: "All FAQs" },
  { id: "general", name: "General & Booking" },
  { id: "safari", name: "Desert Safaris & ATV" },
  { id: "sea", name: "Sea Trips & Yachting" },
  { id: "transfers", name: "Hotel Transfers" },
  { id: "payments", name: "Payments & Cancellation" },
  { id: "safety", name: "Safety & Health" }
];

export const FAQS = [
  {
    id: "faq-1",
    category: "general",
    question: "How far in advance should I book my experiences?",
    answer: "We recommend booking at least 24 to 48 hours in advance during peak season (October through April) to secure your preferred departure time, especially for sunset ATV tours and VIP yacht cruises."
  },
  {
    id: "faq-2",
    category: "general",
    question: "Do you offer hotel pickup in Sharm El Sheikh?",
    answer: "Yes! All our tours include round-trip transfers from any hotel or resort located in Sharm El Sheikh, including Nabq Bay, Naama Bay, Hadaba, Sharks Bay, and Ras Nasrani."
  },
  {
    id: "faq-3",
    category: "safari",
    question: "What should I wear for a desert quad bike safari?",
    answer: "Wear comfortable lightweight clothing, closed shoes (sneakers or boots), long pants to protect your legs from engine warmth, sunglasses, and a desert scarf (keffiyeh/bandana) to shield your face from dust."
  },
  {
    id: "faq-4",
    category: "safari",
    question: "Can kids join ATV quad biking and buggy tours?",
    answer: "Children aged 16+ can drive a single quad bike independently. Kids aged 6-15 can ride as passengers behind an adult driver on a double quad bike or inside a 2/4-seater dune buggy with seatbelts."
  },
  {
    id: "faq-11",
    category: "safari",
    question: "Is driver's license required for ATV quad biking or dune buggies?",
    answer: "No driver's license is required! Our professional instructors provide a short 10-minute briefing and practice safety test before heading into the desert trails."
  },
  {
    id: "faq-12",
    category: "safari",
    question: "What is included in the Bedouin desert dinner and show?",
    answer: "Includes open-array BBQ dinner buffet, aromatic herbal Bedouin tea, Tanoura folklore dance performance, belly dancing show, camel ride, and stargazing through high-power telescopes."
  },
  {
    id: "faq-13",
    category: "safari",
    question: "Which time is better: Sunrise or Sunset quad biking safari?",
    answer: "Sunset is most popular as it combines scenic desert golden hour, dinner, and Bedouin show. Sunrise offers peaceful cool desert temperatures, minimal crowds, and ideal lighting for photography."
  },
  {
    id: "faq-14",
    category: "safari",
    question: "Are professional photos and videos available during the desert safari?",
    answer: "Yes, professional photographers accompany all quad and camel safaris to capture action shots and high-definition video memories available for optional purchase after the tour."
  },
  {
    id: "faq-5",
    category: "sea",
    question: "Are snorkeling equipment and life jackets included on sea trips?",
    answer: "Life jackets are provided free on all boat trips. Snorkeling gear (mask, snorkel, fins) can be rented at the marina before departure for a small nominal fee ($5) or you are welcome to bring your own."
  },
  {
    id: "faq-6",
    category: "sea",
    question: "Is it safe to dive if I have never tried scuba diving before?",
    answer: "Absolutely! Introductory scuba diving requires no prior experience or certification. You will receive a thorough safety lesson on deck and dive 1-on-1 hand-in-hand with a certified PADI instructor."
  },
  {
    id: "faq-15",
    category: "sea",
    question: "What are the main stops on the VIP Yacht Cruise to Ras Mohammed & White Island?",
    answer: "Features 3 guided snorkeling and diving stops in marine sanctuaries with sea turtles and coral reefs, a landing stop on the White Island sandbar, and an open seafood/BBQ buffet."
  },
  {
    id: "faq-16",
    category: "sea",
    question: "What are the weight and age requirements for parasailing?",
    answer: "Available as single or double flights. Maximum combined weight for tandem flights is 150 kg for complete safety. Takeoff and landing occur smoothly on the speedboat winch platform."
  },
  {
    id: "faq-17",
    category: "sea",
    question: "Are vegetarian food and drinks provided on boat cruises?",
    answer: "Yes! The lunch buffet includes rich vegetarian options including fresh salads, pasta, rice, and cooked vegetables, alongside unlimited hot and soft drinks throughout the trip."
  },
  {
    id: "faq-18",
    category: "sea",
    question: "How long must I wait after scuba diving before taking a flight?",
    answer: "You must wait at least 18 hours after your scuba diving session before boarding any airplane for safety and pressure equalization."
  },
  {
    id: "faq-7",
    category: "transfers",
    question: "How will I find my driver at Sharm El Sheikh Airport?",
    answer: "Your private driver will wait inside the arrivals hall holding a sign with your lead traveler name and our company logo. We track your flight number in real time for any flight delays."
  },
  {
    id: "faq-8",
    category: "payments",
    question: "What payment methods do you accept?",
    answer: "You can choose to pay securely online during checkout via Credit/Debit card, or choose 'Pay on Arrival / Pickup' in cash (USD, EUR, GBP, or EGP equivalent) to your guide upon pickup."
  },
  {
    id: "faq-9",
    category: "payments",
    question: "What is your cancellation policy?",
    answer: "Free cancellation is available up to 24 hours before your activity start time. You will receive a 100% full refund with no cancellation fees."
  },
  {
    id: "faq-10",
    category: "safety",
    question: "What safety precautions are taken on desert and sea trips?",
    answer: "All quad bikes and buggies undergo daily mechanical inspection, helmets are compulsory, boat crews are certified in first aid and life-saving, and all vessels carry licensed safety equipment."
  }
];

export const getLocalizedFaqs = (lang = 'en') => {
  const categoryNames = {
    ar: {
      all: "جميع الأسئلة",
      general: "العامة والحجز",
      safari: "رحلات السفاري والبيتش باجي",
      sea: "الرحلات البحرية واليخوت",
      transfers: "التنقلات من الفندق",
      payments: "الدفع والإلغاء",
      safety: "الأمان والصحة"
    },
    ru: {
      all: "Все вопросы",
      general: "Общие и Бронирование",
      safari: "Сафари и Квадроциклы",
      sea: "Морские Прогулки и Яхты",
      transfers: "Трансфер из Отеля",
      payments: "Оплата и Отмена",
      safety: "Безопасность"
    },
    it: {
      all: "Tutti i FAQ",
      general: "Generale e Prenotazioni",
      safari: "Desert Safari e Quad",
      sea: "Gite in Barca e Yacht",
      transfers: "Trasferimenti Hotel",
      payments: "Pagamenti e Cancellazioni",
      safety: "Sicurezza e Salute"
    },
    de: {
      all: "Alle FAQs",
      general: "Allgemein & Buchung",
      safari: "Wüstensafari & Quads",
      sea: "Bootsausflüge & Yachten",
      transfers: "Hotel-Transfers",
      payments: "Zahlung & Stornierung",
      safety: "Sicherheit & Gesundheit"
    },
    es: {
      all: "Todas las preguntas",
      general: "General y Reservas",
      safari: "Safari en Desierto y ATV",
      sea: "Excursiones Marítimas y Yates",
      transfers: "Traslados de Hotel",
      payments: "Pagos y Cancelaciones",
      safety: "Seguridad y Salud"
    }
  };

  const faqTranslations = {
    "faq-1": {
      ar: {
        question: "كم الوقت المناسب للحجز مسبقاً قبل الرحلة؟",
        answer: "نوصي بالحجز قبل 24 إلى 48 ساعة على الأقل خلال موسم الذروة (من أكتوبر حتى أبريل) لضمان حجز الموعد المفضل لديك، خاصة لرحلات سفاري الغروب ويخوت الـ VIP."
      },
      ru: {
        question: "За сколько времени нужно бронировать экскурсии?",
        answer: "Мы рекомендуем бронировать минимум за 24–48 часов в пиковый сезон (с октября по апрель), чтобы гарантировать желаемое время выезда."
      },
      it: {
        question: "Quanto tempo prima devo prenotare le mie esperienze?",
        answer: "Consigliamo di prenotare almeno 24-48 ore prima durante l'alta stagione per assicurarvi l'orario preferito."
      },
      de: {
        question: "Wie weit im Voraus sollte ich buchen?",
        answer: "Wir empfehlen eine Buchung mindestens 24 bis 48 Stunden im Voraus während der Hochsaison."
      },
      es: {
        question: "¿Con cuánta antelación debo reservar?",
        answer: "Recomendamos reservar con al menos 24 a 48 horas de antelación durante la temporada alta."
      }
    },
    "faq-2": {
      ar: {
        question: "هل نوفر خدمة التوصيل من وإلى الفندق في شرم الشيخ؟",
        answer: "نعم! جميع رحلاتنا تشمل خدمة التوصيل ذهاباً وإياداً من أي فندق أو منتجع في شرم الشيخ، بما في ذلك خليج نبق، خليج نعمة، الهضبة، خليج القرش، ورأس نصراني."
      },
      ru: {
        question: "Предоставляете ли вы трансфер из отеля в Шарм-эль-Шейхе?",
        answer: "Да! Все наши туры включают трансфер в обе стороны из любого отеля в Шарм-эль-Шейхе."
      },
      it: {
        question: "Offrite il servizio di transfer dall'hotel a Sharm El Sheikh?",
        answer: "Sì! Tutti i nostri tour includono il transfer di andata e ritorno da qualsiasi hotel a Sharm El Sheikh."
      },
      de: {
        question: "Bieten Sie einen Hoteltransfer in Sharm El Sheikh an?",
        answer: "Ja! Alle unsere Touren beinhalten Hin- und Rücktransfers von jedem Hotel in Sharm El Sheikh."
      },
      es: {
        question: "¿Ofrecen recogida en el hotel en Sharm El Sheikh?",
        answer: "¡Sí! Todos nuestros tours incluyen traslados de ida y vuelta desde cualquier hotel en Sharm El Sheikh."
      }
    },
    "faq-3": {
      ar: {
        question: "ماذا يجب أن أرتدي في رحلة سفاري البيتش باجي الصحراوية؟",
        answer: "يرجى ارتداء ملابس مريحة وخفيفة، أحذية مغلقة (رياضية)، بنطال طويل لحماية ساقيك من حرارة المحرك، نظارات شمسية، وشال بدوي (كوفية) لحماية وجهك من الرمال."
      },
      ru: {
        question: "Что надеть на сафари на квадроциклах в пустыне?",
        answer: "Надевайте удобную одежду, закрытую обувь, длинные брюки, солнцезащитные очки и арафатку (шарф)."
      },
      it: {
        question: "Cosa devo indossare per un safari in quad nel deserto?",
        answer: "Indossa abiti comodi, scarpe chiuse, pantaloni lunghi, occhiali da sole e una kefiah per proteggerti dalla sabbia."
      },
      de: {
        question: "Was sollte ich für eine Quad-Safari in der Wüste anziehen?",
        answer: "Tragen Sie bequeme Kleidung, geschlossene Schuhe, lange Hosen, eine Sonnenbrille und ein Wüstentuch."
      },
      es: {
        question: "¿Qué debo llevar puesto para un safari en cuatrimoto?",
        answer: "Lleva ropa cómoda, zapatos cerrados, pantalones largos, gafas de sol y un pañuelo beduino."
      }
    },
    "faq-4": {
      ar: {
        question: "هل يمكن للأطفال المشاركة في رحلات البيتش باجي والكار باجي؟",
        answer: "يمكن للأطفال من سن 16 عاماً قيادة البيتش باجي بمفردهم. بينما يمكن للأطفال من 6-15 عاماً الركوب كمرافقين خلف سائق بالغ أو داخل سيارات الكار باجي المجهزة بأحزمة أمان."
      },
      ru: {
        question: "Могут ли дети участвовать в турах на квадроциклах и багги?",
        answer: "Дети с 16 лет могут управлять квадроциклом самостоятельно. Дети 6–15 лет могут ехать пассажирами."
      },
      it: {
        question: "I bambini possono partecipare ai tour in quad e buggy?",
        answer: "I ragazzi dai 16 anni possono guidare da soli. I bambini dai 6 ai 15 anni possono salire come passeggeri."
      },
      de: {
        question: "Können Kinder an Quad- und Buggy-Touren teilnehmen?",
        answer: "Kinder ab 16 Jahren können selbst fahren. Kinder von 6 bis 15 Jahren fahren als Beifahrer mit."
      },
      es: {
        question: "¿Pueden los niños unirse a los tours en cuatrimoto y buggy?",
        answer: "Los niños mayores de 16 años pueden conducir solos. Los de 6 a 15 años pueden ir como pasajeros."
      }
    },
    "faq-11": {
      ar: {
        question: "هل أحتاج رخصة قيادة لقيادة البيتش باجي أو الكار باجي؟",
        answer: "لا تشترط وجود رخصة قيادة! يقدم مرشدونا المحترفون شرحاً وتدريباً عملياً مبسطاً لمدة 10 دقائق قبل الانطلاق إلى الدروب الصحراوية."
      },
      ru: {
        question: "Нужны ли водительские права для квадроцикла или багги?",
        answer: "Водительские права не требуются! Инструкторы проводят 10-минутный инструктаж перед выездом."
      }
    },
    "faq-12": {
      ar: {
        question: "ماذا تشمل الحفلة البدوية والعشاء الصحراوي؟",
        answer: "تشمل الرحلة عشاء مشويات بوفيه مفتوح، شاي بدوي معطر بالأعشاب، عروض تنورة وفولكلور شرقي، رقص شرقي، ركوب الجمال، ورصد النجوم بالتلسكوب."
      },
      ru: {
        question: "Что входит в бедуинский ужин и шоу?",
        answer: "Включает ужин шведский стол BBQ, бедуинский чай, шоу танура, катание на верблюдах и наблюдение за звездами."
      }
    },
    "faq-13": {
      ar: {
        question: "أي الأوقات أفضل لرحلة البيتش باجي: الشروق أم الغروب؟",
        answer: "رحلة الغروب هي الأكثر شعبية لاقترانها مع العشاء والحفلة البدوية ومناظر الغروب بين جبال سيناء. أما رحلة الشروق فتتميز بهدوء الصحراء والطقس اللطيف والتقاط الصور الخلابة."
      },
      ru: {
        question: "Какое время лучше для квадроциклов: рассвет или закат?",
        answer: "Закат наиболее популярен из-за шоу и ужина. Рассвет предлагает прохладу и тишину."
      }
    },
    "faq-14": {
      ar: {
        question: "هل يتم التقاط صور وفيديوهات تذكارية خلال الرحلة الصحراوية؟",
        answer: "نعم، يرافق الرحلة مصورون محترفون لالتقاط أجمل اللقطات والفيديوهات أثناء قيادة البيتش باجي وركوب الجمال، ويمكنك معاينتها وشراؤها اختياريًا."
      },
      ru: {
        question: "Есть ли профессиональные фото и видео во время сафари?",
        answer: "Да, профессиональные фотографы делают снимки и видео, которые можно приобрести по желанию."
      }
    },
    "faq-5": {
      ar: {
        question: "هل معدات السنوركلينج وسترات النجاة مشمولة في الرحلات البحرية؟",
        answer: "سترات النجاة مجانية ومتاحة للجميع على جميع القوارب. يمكن استئجار معدات السنوركلينج (نظارة، أنبوب، زعانف) من المارينا قبل التحرك مقابل رسوم رمزية ($5) أو يمكنك إحضار معداتك الخاصة."
      },
      ru: {
        question: "Входят ли снаряжение для снорклинга и спасательные жилеты в морские прогулки?",
        answer: "Спасательные жилеты предоставляются бесплатно. Снаряжение для снорклинга можно арендовать в марине ($5)."
      },
      it: {
        question: "Attrezzatura da snorkeling e giubbotti salvagente sono inclusi nelle gite in barca?",
        answer: "I giubbotti salvagente sono gratuiti. L'attrezzatura da snorkeling si può noleggiare al porto ($5)."
      },
      de: {
        question: "Sind Schnorchelausrüstung und Schwimmwesten bei Bootsausflügen enthalten?",
        answer: "Schwimmwesten sind kostenlos. Schnorchelausrüstung kann im Hafen gemietet werden ($5)."
      },
      es: {
        question: "¿El equipo de esnórquel y los chalecos salvavidas están incluidos?",
        answer: "Los chalecos salvavidas son gratuitos. El equipo de esnórquel se puede alquilar en la marina ($5)."
      }
    },
    "faq-6": {
      ar: {
        question: "هل الغوص آمن لمن لم يجرب غوص السكوبا من قبل؟",
        answer: "بالتأكيد! غوص المبتدئين التعريفي لا يتطلب أي خبرة أو شهادة مسبقة. ستتلقى تدريباً شاملاً على الأمان على ظهر اليخت وتغوص يداً بيد مع مدرب غوص معتمد من PADI."
      },
      ru: {
        question: "Безопасно ли погружаться, если я никогда раньше не занимался дайвингом?",
        answer: "Абсолютно! Вводный дайвинг не требует опыта. Вы будете погружаться индивидуально с инструктором PADI."
      },
      it: {
        question: "È sicuro fare immersioni se non ho mai provato prima?",
        answer: "Assolutamente sì! L'immersione introduttiva non richiede esperienza. Immergerai 1-a-1 con un istruttore PADI."
      },
      de: {
        question: "Ist Tauchen sicher, wenn ich es noch nie ausprobiert habe?",
        answer: "Absolut! Für das Einführungstauchen ist keine Erfahrung erforderlich. Sie tauchen 1-zu-1 mit einem PADI-Tauchlehrer."
      },
      es: {
        question: "¿Es seguro bucear si nunca lo he intentado antes?",
        answer: "¡Absolutamente! El buceo de introducción no requiere experiencia previa. Bucearás 1 a 1 con un instructor PADI."
      }
    },
    "faq-15": {
      ar: {
        question: "ما هي محطات رحلة اليخت VIP إلى محمية رأس محمد والجزيرة البيضاء؟",
        answer: "تشمل 3 وقفات سنوركلينج وغوص بين أروع الشعاب المرجانية، والتوقف على رمال الجزيرة البيضاء الساحرة، وبوفيه مفتوح للمأكولات البحرية والمشويات على ظهر اليخت."
      },
      ru: {
        question: "Каковы основные остановки яхт-круиза VIP на Белый остров?",
        answer: "3 остановки для снорклинга и дайвинга, высадка на Белом острове и обед шведский стол с морепродуктами."
      }
    },
    "faq-16": {
      ar: {
        question: "ما هي شروط الوزن والعمر لطيران الباراشوت المائي؟",
        answer: "متاح طيران فردي أو مزدوج. الحد الأقصى للوزن الكلي لشخصين معاً هو 150 كجم لضمان السلامة التامة. الإقلاع والهبوط ناعم ومستقر مباشرة من وإلى القارب السريع."
      },
      ru: {
        question: "Каковы ограничения по весу и возрасту для парасейлинга?",
        answer: "Максимальный суммарный вес для двоих — 150 кг. Взлет и посадка происходят прямо с катера."
      }
    },
    "faq-17": {
      ar: {
        question: "هل يتوفر طعام نباتي ومشروبات على ظهر اليخت؟",
        answer: "نعم! بوفيه اليخت يضم خيارات نباتية متنوعة من السلطات والطهي الخضاري والأرز، مع مشروبات ساخنة وباردة غير محدودة طوال الجولة."
      },
      ru: {
        question: "Предоставляется ли вегетарианская еда на яхте?",
        answer: "Да, шведский стол включает вегетарианские блюда, а также неограниченные напитки."
      }
    },
    "faq-18": {
      ar: {
        question: "كم يجب أن أنتظر بعد تجربة الغوص قبل ركوب الطائرة؟",
        answer: "يجب الانتظار 18 ساعة على الأقل بعد غوص السكوبا قبل السفر على متن الطائرة للحفاظ على سلامتك وتجنب تغيرات ضغط الجسم."
      },
      ru: {
        question: "Сколько нужно ждать после дайвинга перед полетом?",
        answer: "Необходимо подождать минимум 18 часов после дайвинга перед полетом на самолете."
      }
    },
    "faq-7": {
      ar: {
        question: "كيف سأجد السائق الخاص بي في مطار شرم الشيخ؟",
        answer: "سيكون سائقك الخاص بانتظارك داخل صالة الوصول يحمل لافتة مدون عليها اسمك وشعار شركتنا. نحن نتتبع رقم رحلتك الجوية في الوقت الفعلي في حالة وجود أي تأخير."
      },
      ru: {
        question: "Как я найду своего водителя в аэропорту Шарм-эль-Шейха?",
        answer: "Ваш водитель будет ждать в зале прилета с табличкой с вашим именем и нашим логотипом."
      },
      it: {
        question: "Come troverò il mio autista all'aeroporto di Sharm El Sheikh?",
        answer: "Il vostro autista vi attenderà nella sala arrivi con un cartello recante il vostro nome."
      },
      de: {
        question: "Wie finde ich meinen Fahrer am Flughafen Sharm El Sheikh?",
        answer: "Ihr Fahrer erwartet Sie in der Ankunftshalle mit einem Schild mit Ihrem Namen."
      },
      es: {
        question: "¿Cómo encontraré a mi conductor en el aeropuerto?",
        answer: "Su conductor privado le estará esperando en la sala de llegadas con un cartel con su nombre."
      }
    },
    "faq-8": {
      ar: {
        question: "ما هي طرق الدفع المتاحة؟",
        answer: "يمكنك اختيار الدفع الآمن أونلاين عبر البطاقات البنكية، أو اختيار 'الدفع عند الوصول / الاستلام' نقداً (بالدولار أو اليورو أو الجنيه المصري) لمندوبنا عند التوصيل."
      },
      ru: {
        question: "Какие способы оплаты вы принимаете?",
        answer: "Вы можете оплатить картой онлайн или выбрать 'Оплата по прибытии' наличными (USD, EUR, EGP) гиду."
      },
      it: {
        question: "Quali metodi di pagamento accettate?",
        answer: "Puoi pagare online con carta o scegliere 'Pagamento all'arrivo' in contanti al vostro transfer."
      },
      de: {
        question: "Welche Zahlungsmethoden akzeptieren Sie?",
        answer: "Sie können online per Karte zahlen oder 'Zahlung bei Ankunft' in bar wählen."
      },
      es: {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Puedes pagar en línea con tarjeta o elegir 'Pago a la llegada' en efectivo a tu guía."
      }
    },
    "faq-9": {
      ar: {
        question: "ما هي سياسة الإلغاء والاسترداد؟",
        answer: "الإلغاء المجاني متاح حتى 24 ساعة قبل موعد بدء الرحلة، وستسترد مبلغك بالكامل 100% دون أي رسوم إلغاء."
      },
      ru: {
        question: "Какова ваша политика отмены?",
        answer: "Бесплатная отмена возможна за 24 часа до начала экскурсии с 100% возвратом средств."
      },
      it: {
        question: "Qual è la vostra politica di cancellazione?",
        answer: "Cancellazione gratuita fino a 24 ore prima dell'inizio dell'attività con rimborso del 100%."
      },
      de: {
        question: "Wie lautet Ihre Stornierungsrichtlinie?",
        answer: "Kostenlose Stornierung ist bis zu 24 Stunden vor Beginn der Aktivität möglich."
      },
      es: {
        question: "¿Cuál es su política de cancelación?",
        answer: "Cancelación gratuita hasta 24 horas antes del inicio con reembolso del 100%."
      }
    },
    "faq-10": {
      ar: {
        question: "ما هي احتياطات الأمان المتخذة في رحلات الصحراء والبحر؟",
        answer: "تخضع جميع مركبات البيتش باجي والكار باجي لفحص ميكانيكي يومي، الخوذات إجبارية، طاقم القوارب معتمد في الإسعافات الأولية والإنقاذ، وجميع القوارب مجهزة بمعدات سلامة مرخصة."
      },
      ru: {
        question: "Какие меры безопасности принимаются на сафари и морских прогулках?",
        answer: "Все квадроциклы проходят ежедневный осмотр, шлемы обязательны, экипажи лодок сертифицированы."
      },
      it: {
        question: "Quali precauzioni di sicurezza vengono adottate?",
        answer: "Tutti i veicoli vengono controllati giornalmente, i caschi sono obbligatori e l'equipaggio è certificato."
      },
      de: {
        question: "Welche Sicherheitsvorkehrungen werden getroffen?",
        answer: "Alle Quads werden täglich geprüft, Helmlicht ist Pflicht, Bootsbesatzungen sind ersthelferzertifiziert."
      },
      es: {
        question: "¿Qué precauciones de seguridad se toman?",
        answer: "Todos los vehículos tienen inspección diaria, los cascos son obligatorios y la tripulación está capacitada."
      }
    }
  };

  const categories = FAQ_CATEGORIES.map(cat => ({
    ...cat,
    name: categoryNames[lang]?.[cat.id] || cat.name
  }));

  const faqs = FAQS.map(faq => {
    const loc = faqTranslations[faq.id]?.[lang];
    if (!loc) return faq;
    return {
      ...faq,
      question: loc.question || faq.question,
      answer: loc.answer || faq.answer
    };
  });

  return { categories, faqs };
};
