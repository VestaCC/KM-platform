export interface DirectionItem {
  id: string;
  slug: string;
  iconName: "Languages" | "Cpu" | "Code2" | "FlaskConical" | "Palette" | "Trophy" | "BriefcaseBusiness";
  title: { UZ: string; RU: string; EN: string };
  description: { UZ: string; RU: string; EN: string };
  learnPoints: { UZ: string[]; RU: string[]; EN: string[] };
}

export const directionsData: DirectionItem[] = [
  {
    id: "dir-languages",
    slug: "languages",
    iconName: "Languages",
    title: {
      UZ: "Xorijiy tillar",
      RU: "Иностранные языки",
      EN: "Foreign Languages"
    },
    description: {
      UZ: "Ingliz, rus, koreys, nemis, xitoy va boshqa xorijiy til dasturlari orqali xalqaro ta'lim, madaniy almashinuv va kelajakdagi karyeraga tayyorlanish uchun amaliy muloqot ko'nikmalarini rivojlantiring.",
      RU: "Развивайте практические навыки общения с помощью программ английского, русского, корейского, немецкого, китайского и других иностранных языков, предназначенных для подготовки студентов к международному образованию.",
      EN: "Develop practical communication skills through English, Russian, Korean, German, Chinese, and other foreign language programs designed to prepare students for international education, cultural exchange, and future careers."
    },
    learnPoints: {
      UZ: [
        "Ingliz, rus, koreys, nemis va xitoy tillarini mukammal o'rganish",
        "Kundalik va professional muloqotda erkin so'zlashuv ko'nikmalari",
        "Xalqaro til imtihonlariga (IELTS, TOPIK, TestDaF va boshqalar) maqsadli tayyorgarlik",
        "Taqdimotlar o'tkazish, muzokaralar olib borish va bahs-munozara mahorati",
        "Xorijiy tillarda akademik insho va rasmiy xatlar yozish qoidalari",
        "Xorijiy mamlakatlar madaniyati, qadriyatlari va muloqot etiketlari"
      ],
      RU: [
        "Углубленное изучение английского, русского, корейского, немецкого и китайского языков",
        "Развитие навыков свободного устного общения и повседневной речи",
        "Целевая подготовка к международным языковым экзаменам (IELTS, TOPIK, TestDaF и др.)",
        "Навыки публичных выступлений, ведения презентаций и дебатов на иностранном языке",
        "Правила написания академических эссе и официальной переписки",
        "Изучение культуры, традиций и делового этикета зарубежных стран"
      ],
      EN: [
        "Advanced study of English, Russian, Korean, German, and Chinese languages",
        "Develop fluent oral and written communication skills for daily and professional use",
        "Targeted preparation for international language exams (IELTS, TOPIK, TestDaF, etc.)",
        "Master public speaking, presentations, and debate techniques in foreign languages",
        "Learn rules of academic essay writing and official business correspondence",
        "Explore foreign cultures, values, and international communication etiquette"
      ]
    }
  },
  {
    id: "dir-engineering",
    slug: "engineering",
    iconName: "Cpu",
    title: {
      UZ: "Muhandislik va texnologiyalar",
      RU: "Инженерия и технологии",
      EN: "Engineering & Technology"
    },
    description: {
      UZ: "Amaliy loyihalar va laboratoriya mashg'ulotlari orqali robototexnika, muhandislik, elektronika, avtomatlashtirish, 3D modellashtirish va zamonaviy texnologiyalar bo'yicha amaliy ko'nikmalarga ega bo'ling.",
      RU: "Получите практические знания в области робототехники, инженерии, электроники, автоматизации, 3D-моделирования и современных технологий посредством лабораторных работ.",
      EN: "Provide hands-on education in robotics, engineering, electronics, automation, 3D modeling, and modern technologies through practical projects and laboratory activities."
    },
    learnPoints: {
      UZ: [
        "Mikrokontrollerlar (Arduino, Raspberry Pi) bilan ishlash va ularni dasturlash",
        "Elektron sxemalarni loyihalash, yig'ish va nosozliklarni bartaraf etish",
        "3D modellashtirish (CAD dasturlarida) va 3D printerlarda chop etish asoslari",
        "Sanoat avtomatlashtirilishi, sensorlar va aktuatorlar texnologiyasi",
        "Robotlarni loyihalash va turli muhandislik qurilmalarini yig'ish",
        "Amaliy loyihalarni ishlab chiqish, sinovdan o'tkash va taqdim etish"
      ],
      RU: [
        "Работа с популярными микроконтроллерами (Arduino, Raspberry Pi) и их программирование",
        "Проектирование, сборка и устранение неполадок в электронных схемах",
        "Основы 3D-моделирования (в системах CAD) и печать на 3D-принтерах",
        "Промышленная автоматизация, технологии датчиков и исполнительных механизмов",
        "Конструирование роботов и сборка различных инженерных устройств",
        "Разработка, тестирование и презентация практических инженерных проектов"
      ],
      EN: [
        "Learn microcontroller programming and integration (Arduino, Raspberry Pi)",
        "Design, assemble, and troubleshoot complex electronic circuits",
        "Master 3D modeling (CAD software) and 3D printing technologies",
        "Explore industrial automation, sensors, and actuators systems",
        "Build, design, and configure robotic models and mechanical hardware",
        "Develop, test, and pitch hands-on engineering project prototypes"
      ]
    }
  },
  {
    id: "dir-programming",
    slug: "programming",
    iconName: "Code2",
    title: {
      UZ: "Dasturlash va raqamli texnologiyalar",
      RU: "Программирование и цифровые технологии",
      EN: "Programming & Digital Technologies"
    },
    description: {
      UZ: "Loyiha asosida o'rganish orqali dasturlash, veb-ishlab chiqish, dasturiy ta'minot muhandisligi, kiberxavfsizlik, sun'iy intellekt asoslari va raqamli savodxonlik yo'nalishlarini egallang.",
      RU: "Изучайте программирование, веб-разработку, программную инженерию, кибербезопасность, основы искусственного интеллекта и цифровую грамотность через проекты.",
      EN: "Teach programming, web development, software engineering, cybersecurity, artificial intelligence fundamentals, and digital literacy through project-based learning."
    },
    learnPoints: {
      UZ: [
        "Frontend veb-dasturlash texnologiyalari (HTML, CSS, JavaScript, React)",
        "Backend dasturlash asoslari va ma'lumotlar bazasi (Node.js, PostgreSQL)",
        "Python dasturlash tili va ma'lumotlar tahlili (Data Science) asoslari",
        "Mobil ilovalarni loyihalash va ishlab chiqish (Flutter, React Native)",
        "Kiberxavfsizlik qoidalari, axborot xavfsizligi va tarmoq texnologiyalari",
        "Sun'iy intellekt, mashinali o'rganish va neyron tarmoqlari bilan ishlash",
        "Dasturiy mahsulotlarni testlash va Git versiya nazorati tizimi bilan ishlash"
      ],
      RU: [
        "Технологии веб-разработки Frontend (HTML, CSS, JavaScript, React)",
        "Основы разработки Backend и баз данных (Node.js, PostgreSQL)",
        "Язык программирования Python и основы анализа данных (Data Science)",
        "Проектирование и разработка мобильных приложений (Flutter, React Native)",
        "Правила кибербезопасности, защита информации и сетевые технологии",
        "Работа с искусственным интеллектом, машинным обучением и нейросетями",
        "Тестирование программного обеспечения и работа с системой контроля версий Git"
      ],
      EN: [
        "Master Frontend web development technologies (HTML, CSS, JavaScript, React)",
        "Learn Backend development architectures and database systems (Node.js, PostgreSQL)",
        "Study Python programming language and basics of data analysis (Data Science)",
        "Design and build cross-platform mobile applications (Flutter, React Native)",
        "Explore cybersecurity principles, information security, and network systems",
        "Understand artificial intelligence, machine learning, and neural network foundations",
        "Conduct software testing and utilize Git version control system workflows"
      ]
    }
  },
  {
    id: "dir-stem",
    slug: "stem",
    iconName: "FlaskConical",
    title: {
      UZ: "Ilm-fan va innovatsiyalar (STEM)",
      RU: "Наука и инновации (STEM)",
      EN: "Science & Innovation (STEM)"
    },
    description: {
      UZ: "Matematika, fizika, kimyo, biologiya fanlarini amaliy laboratoriya tajribalari, ilmiy tadqiqotlar va innovatsion STEM loyihalari orqali o'rganib, tahliliy fikrlashni kuchaytiring.",
      RU: "Развивайте аналитическое мышление, изучая математику, физику, химию и биологию с помощью практических лабораторных работ и научных проектов STEM.",
      EN: "Strengthen analytical thinking through mathematics, physics, chemistry, biology, laboratory experiments, scientific research, innovation projects, and STEM education."
    },
    learnPoints: {
      UZ: [
        "Kimyoviy reaksiyalar va laboratoriya sharoitida xavfsiz tajribalar o'tkazish",
        "Fizika qonuniyatlarini amaliy qurilmalar va maketlarda sinab ko'rish",
        "Matematik modellashtirish va murakkab masalalarni hal qilish usullari",
        "Biologiya, anatomiya va ekologik tizimlarning qonuniyatlarini o'rganish",
        "Ilmiy-tadqiqot loyihalarini rejalashtirish, metodologiyasi va hisoboti",
        "STEM ko'rgazmalari va ilmiy yarmarkalar uchun innovatsion loyihalar yaratish"
      ],
      RU: [
        "Проведение химических реакций и безопасных экспериментов в лаборатории",
        "Исследование законов физики на практических приборах и макетах",
        "Математическое моделирование и методы решения сложных задач",
        "Изучение закономерностей биологии, анатомии и экологических систем",
        "Планирование, методология и отчетность по научно-исследовательским работам",
        "Создание инновационных проектов для научных выставок и ярмарок STEM"
      ],
      EN: [
        "Perform chemical synthesis and safety experiments in laboratory environments",
        "Investigate physical laws using interactive models and hardware prototypes",
        "Apply mathematical modeling and advanced problem-solving methodologies",
        "Study biological organisms, human anatomy, and ecological biosystems",
        "Understand scientific research planning, research methodologies, and reporting",
        "Develop creative STEM models for science fairs and academic exhibitions"
      ]
    }
  },
  {
    id: "dir-arts",
    slug: "arts",
    iconName: "Palette",
    title: {
      UZ: "San'at va ijodkorlik",
      RU: "Искусство и творчество",
      EN: "Arts & Creativity"
    },
    description: {
      UZ: "Musiqa, tasviriy san'at, dizayn, fotografiya, xalq hunarmandchiligi va teatr kabi ijodiy dasturlar orqali yoshlarning badiiy didi va yashirin iste'dodlarini ro'yobga chiqaring.",
      RU: "Раскройте художественный вкус и скрытые таланты через музыку, изобразительное искусство, дизайн, фотографию, ремесла и театр.",
      EN: "Support artistic expression through music, visual arts, design, photography, crafts, theater, and other creative activities that help students discover and develop their talents."
    },
    learnPoints: {
      UZ: [
        "Tasviriy san'at, akademik rasm chizish va rangtasvir texnikalari",
        "Grafik dizayn, illustratsiya va raqamli san'at (digital art) asoslari",
        "Professional fotografiya, kompozitsiya qoidalari va video montaj mahorati",
        "Milliy hunarmandchilik, kulolchilik, haykaltaroshlik va amaliy san'at",
        "Aktyorlik mahorati, sahna madaniyati va sahna nutqi san'ati",
        "Ijodiy loyihalarni yaratish va badiiy ko'rgazmalarda ishtirok etish"
      ],
      RU: [
        "Изобразительное искусство, академический рисунок и техники живописи",
        "Основы графического дизайна, иллюстрации и цифрового искусства (digital art)",
        "Профессиональная фотография, правила композиции и видеомонтаж",
        "Национальные ремесла, гончарное дело, скульптура и прикладное искусство",
        "Актерское мастерство, сценическая культура и искусство речи",
        "Создание творческих проектов и участие в художественных выставках"
      ],
      EN: [
        "Study visual arts, academic drawing, and dynamic painting techniques",
        "Learn foundations of graphic design, vector illustration, and digital art",
        "Master professional photography, composition rules, and video editing",
        "Explore national crafts, pottery wheel techniques, sculpting, and applied arts",
        "Develop acting skills, stage presence, speech delivery, and theatrical expression",
        "Create individual portfolios and participate in collective art exhibitions"
      ]
    }
  },
  {
    id: "dir-sports",
    slug: "sports",
    iconName: "Trophy",
    title: {
      UZ: "Sport va sog'lom turmush tarzi",
      RU: "Спорт и здоровый образ жизни",
      EN: "Sports & Healthy Lifestyle"
    },
    description: {
      UZ: "Jamoaviy va yakkalik sport turlari, shaxmat hamda jismoniy tarbiya mashg'ulotlari orqali sog'lom turmush tarzi, intizom, jismoniy rivojlanish va jamoaviy ishlash ruhini shakllantiring.",
      RU: "Формируйте здоровый образ жизни, дисциплину и командный дух с помощью командных и индивидуальных видов спорта, шахмат и физкультуры.",
      EN: "Promote healthy lifestyles, teamwork, discipline, and physical development through team sports, individual sports, chess, and recreational activities."
    },
    learnPoints: {
      UZ: [
        "Shaxmat o'yini taktikasi, strategik rejalashtirish va aqliy tahlil",
        "Jismoniy chiniqish, gimnastika va to'g'ri qomatni shakllantirish mashqlari",
        "Jamoaviy sport o'yinlari (futbol, voleybol, basketbol, stol tennisi) qoidalari",
        "Sog'lom ovqatlanish ratsioni, shaxsiy gigiyena va kun tartibini rejalashtirish",
        "Sport etiketlari, sog'lom raqobat va o'zaro jamoaviy yordam ko'nikmalari",
        "Sport musobaqalariga jismoniy va psixologik tayyorgarlik ko'rish"
      ],
      RU: [
        "Тактика шахматной игры, стратегическое планирование и ментальный анализ",
        "Физическая закалка, гимнастика и упражнения для формирования правильной осанки",
        "Правила командных спортивных игр (футбол, волейбол, баскетбол, настольный теннис)",
        "Рацион здорового питания, правила личной гигиены и планирование режима дня",
        "Спортивный этикет, здоровая конкуренция и навыки взаимопомощи в команде",
        "Физическая и психологическая подготовка к спортивным соревнованиям"
      ],
      EN: [
        "Master chess tactics, strategic positioning, and deep mental analysis",
        "Perform physical conditioning, gymnastics, and posture correction exercises",
        "Learn rules and tactical strategies of team sports (football, volleyball, basketball)",
        "Formulate a balanced nutrition plan, personal hygiene, and daily schedule",
        "Understand sportsmanship, healthy competition, and team collaboration",
        "Prepare physically and psychologically for competitive sports events"
      ]
    }
  },
  {
    id: "dir-leadership",
    slug: "leadership",
    iconName: "BriefcaseBusiness",
    title: {
      UZ: "Kasbiy ko'nikmalar va yetakchilik",
      RU: "Профессиональные навыки и лидерство",
      EN: "Professional Skills & Leadership"
    },
    description: {
      UZ: "Amaliy ta'lim tashabbuslari orqali tadbirkorlik asoslari, kasbiy ko'nikmalar, yetakchilik fazilatlari, moliyaviy savodxonlik va karyeraga tayyorlikni rivojlantiring.",
      RU: "Развивайте основы предпринимательства, профессиональные навыки, лидерские качества, финансовую грамотность и готовность к карьере.",
      EN: "Develop entrepreneurship, vocational skills, leadership, communication, teamwork, financial literacy, and career readiness through practical educational initiatives."
    },
    learnPoints: {
      UZ: [
        "Notiqlik san'ati, ommaviy nutq so'zlash va muzokaralar olib borish mahorati",
        "Tadbirkorlik asoslari, startap loyihalarni rejalashtirish va boshqarish",
        "Shaxsiy moliya, byudjet, jamg'armalar va moliyaviy savodxonlik asoslari",
        "Loyiha boshqaruvi (Project Management), Scrum va jamoada ishlash tizimi",
        "Kommunikativlik, liderlik psixologiyasi va muammolarni hal qilish (soft skills)",
        "Karyera rejalashtirish, rezyume (CV) tuzish va intervyudan muvaffaqiyatli o'tish sirlari"
      ],
      RU: [
        "Ораторское мастерство, публичные выступления и навыки ведения переговоров",
        "Основы предпринимательства, планирование и управление стартап-проектами",
        "Личные финансы, бюджетирование, сбережения и основы финансовой грамотности",
        "Управление проектами (Project Management), Scrum и методология командной работы",
        "Коммуникабельность, психология лидерства и решение проблем (soft skills)",
        "Планирование карьеры, составление резюме (CV) и секреты прохождения интервью"
      ],
      EN: [
        "Master public speaking, rhetorical skills, and negotiation techniques",
        "Learn entrepreneurship concepts, business planning, and startup management",
        "Explore personal finance, budgeting, savings, and investment basics",
        "Understand Project Management (PM) methodologies, Scrum, and team dynamics",
        "Develop communication, leadership psychology, and problem-solving (soft skills)",
        "Master career planning, professional resume (CV) writing, and interview preparation"
      ]
    }
  }
];
