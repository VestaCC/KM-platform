export type Language = 'UZ' | 'RU' | 'EN';

export const translations = {
  header: {
    nav: {
      home: { UZ: "Bosh sahifa", RU: "Главная", EN: "Home" },
      about: { UZ: "Biz haqimizda", RU: "О нас", EN: "About Us" },
      directions: { UZ: "Yo'nalishlar", RU: "Направления", EN: "Directions" },
      news: { UZ: "Yangiliklar", RU: "Новости", EN: "News" },
      gallery: { UZ: "Galereya", RU: "Галерея", EN: "Gallery" },
      courses: { UZ: "Kurslar", RU: "Курсы", EN: "Courses" },
      contact: { UZ: "Aloqa", RU: "Контакты", EN: "Contact" },
    },
    brandTitle: { UZ: "Kelajak markazi", RU: "Центр будущего", EN: "Kelajak Markazi" },
    brandSubtitle: { UZ: "Jizzax viloyati", RU: "Джизакская область", EN: "Jizzax Region" },
    applyNow: { UZ: "Ariza topshirish", RU: "Подать заявку", EN: "Apply Now" },
  },
  hero: {
    badge: { UZ: "Jizzax viloyati • \"Kelajak markazi\"", RU: "Джизакская область • «Центр будущего»", EN: "Jizzax Region • Kelajak Markazi" },
    titlePart1: { UZ: "Jizzax viloyati ", RU: "Джизакский областной ", EN: "Jizzax Region " },
    titlePart2: { UZ: "Kelajak ", RU: "Центр ", EN: "Kelajak " },
    titlePart3: { UZ: "markazi", RU: "будущего", EN: "Markazi" },
    titlePart4: { UZ: "", RU: "", EN: "" },
    description: {
      UZ: "O'quvchilarning iste'dodini ro'yobga chiqarish va ularni zamonaviy bilim hamda ko'nikmalar bilan kelajakka tayyorlashga xizmat qiluvchi innovatsion qo'shimcha ta'lim markazi.",
      RU: "Инновационный центр дополнительного образования, служащий для реализации талантов учащихся и подготовки их к будущему с помощью современных знаний и навыков.",
      EN: "An innovative extracurricular education center serving to realize students' talents and prepare them for the future with modern knowledge and skills."
    },
    learnMore: { UZ: "Batafsil ma'lumot", RU: "Узнать больше", EN: "Learn More" },
    latestNews: { UZ: "So'nggi yangiliklar", RU: "Последние новости", EN: "Latest News" },
    stats: {
      students: { UZ: "O'quvchilar", RU: "Ученики", EN: "Students" },
      clubs: { UZ: "Faol to'garaklar", RU: "Активные клубы", EN: "Active Clubs" },
      events: { UZ: "Tadbirlar / yiliga", RU: "Мероприятия / год", EN: "Events/Year" },
    },
    cardTitle: { UZ: "Robototexnika chempionati", RU: "Чемпионат по робототехнике", EN: "Robotics Championship" },
    cardDesc: { UZ: "2025-yilgi viloyat g'olibi", RU: "Победитель областного этапа 2025", EN: "Regional winner 2025" },
    imageAlt: { UZ: "O'quvchilarning \"Kelajak markazi\"da robototexnika va texnologiyalarni o'rganish jarayoni", RU: "Процесс изучения робототехники и технологий в «Центре будущего»", EN: "Students learning robotics and technology at Kelajak Markazi" },
  },
  about: {
    badge: { UZ: "Biz haqimizda", RU: "О нас", EN: "About Us" },
    mission: {
      badge: { UZ: "Bizning vazifamiz", RU: "Наша миссия", EN: "Our Mission" },
      title: { UZ: "Bizning Oliy Vazifamiz", RU: "Наша главная миссия", EN: "Our Mission" },
      desc: {
        UZ: "Bizning vazifamiz — har bir o'quvchiga sifatli maktabdan tashqari ta'lim olish, zamonaviy o'quv muhiti, innovatsion texnologiyalar va iste'dodlarni rivojlantirish dasturlaridan foydalanish imkoniyatini yaratish orqali teng imkoniyatlar taqdim etishdir. Maktablar, pedagoglar va jamoatchilik bilan hamkorlikda biz o'quvchilarga o'z salohiyatini ochish, kelajak uchun zarur ko'nikmalarni egallash va jamiyatning faol a'zosiga aylanishlariga yordam berishni maqsad qilganmiz.",
        RU: "Наша миссия — создание равных возможностей для каждого учащегося путем предоставления доступа к качественному внешкольному образованию, современным условиям обучения, инновационным технологиям и программам развития талантов. В сотрудничестве со школами, педагогами и сообществами мы стремимся помочь учащимся раскрыть свой потенциал, развить навыки будущего и стать активными членами общества.",
        EN: "Our mission is to create equal opportunities for every student by providing access to high-quality extracurricular education, modern learning environments, innovative technologies, and talent development programs. Through collaboration with schools, educators, and communities, we aim to help students discover their potential, develop future-ready skills, and become active contributors to society."
      },
      values: {
        opportunities: {
          title: { UZ: "Teng imkoniyatlar", RU: "Равные возможности", EN: "Equal Opportunities" },
          desc: { UZ: "Hududidan qat'i nazar, har bir o'quvchiga sifatli maktabdan tashqari ta'lim olish imkoniyatini taqdim etish.", RU: "Предоставление каждому ученику доступа к качественному внешкольному образованию независимо от местоположения.", EN: "Providing every student with access to quality extracurricular education regardless of location." }
        },
        innovation: {
          title: { UZ: "Innovatsiyalar", RU: "Инновации", EN: "Innovation" },
          desc: { UZ: "Ijodkorlik, texnologiyalar, robototexnika, dasturlash va zamonaviy o'rganishni rag'batlantirish.", RU: "Поощрение творчества, технологий, робототехники, программирования и современного обучения.", EN: "Encouraging creativity, technology, robotics, programming, and modern learning." }
        },
        collaboration: {
          title: { UZ: "Hamkorlik", RU: "Сотрудничество", EN: "Collaboration" },
          desc: { UZ: "Maktablar, o'qituvchilar, ota-onalar va jamoalar o'rtasida mustahkam aloqalarni o'rnatish.", RU: "Построение прочных партнерских отношений между школами, учителями, родителями и сообществами.", EN: "Building strong partnerships between schools, teachers, parents, and communities." }
        },
        development: {
          title: { UZ: "Kelajak istiqbollari", RU: "Будущее развитие", EN: "Future Development" },
          desc: { UZ: "O'quvchilarni oliy ta'limga, kasbiy faoliyatga, tadbirkorlikka va hayot davomida ta'lim olishga tayyorlash.", RU: "Подготовка учащихся к высшему образованию, карьере, предпринимательству и непрерывному обучению.", EN: "Preparing students for higher education, careers, entrepreneurship, and lifelong learning." }
        }
      }
    },
    functions: {
      badge: { UZ: "Dasturiy vazifalar", RU: "Программные задачи", EN: "Core Focus" },
      title: { UZ: "Bizning vazifalarimiz", RU: "Наши функции", EN: "Our Functions" },
      subtitle: {
        UZ: "Kelajak markazlari o'quvchilarning akademik, ijtimoiy va kasbiy rivojlanishiga yordam beradigan ta'lim, taraqqiyot va tashkiliy faoliyatni amalga oshiradi.",
        RU: "Центры будущего осуществляют образовательную, развивающую и организационную деятельность, которая помогает учащимся расти академически, социально и профессионально.",
        EN: "The Future Centers provide educational, developmental, and organizational activities that help students grow academically, socially, and professionally."
      },
      cards: {
        education: {
          title: { UZ: "Zamonaviy maktabdan tashqari ta'lim", RU: "Современное внешкольное образование", EN: "Modern Extracurricular Education" },
          desc: { UZ: "Maktab ta'limini to'ldiruvchi hamda o'quvchilarga yangi qiziqishlarni o'rganish, amaliy ko'nikmalarni mustahkamlash va kelajakdagi karyeraga tayyorlanish imkonini beruvchi maktabdan tashqari zamonaviy ta'lim dasturlarini tashkil etish.", RU: "Организация современных внешкольных образовательных программ, которые дополняют школьное образование и позволяют учащимся исследовать новые интересы, укреплять практические навыки и готовиться к будущей карьере.", EN: "Organize modern extracurricular educational programs that complement school education and allow students to explore new interests, strengthen practical skills, and prepare for future careers." }
        },
        technology: {
          title: { UZ: "Raqamli ko'nikmalar va texnologiyalar", RU: "Цифровые навыки и технологии", EN: "Digital Skills & Technology" },
          desc: { UZ: "Dasturlash, robototexnika, raqamli savodxonlik, muhandislik va o'quvchilarni raqamli iqtisodiyotga tayyorlaydigan boshqa texnologik fanlarni ommalashtirish.", RU: "Популяризация программирования, робототехники, цифровой грамотности, инженерии и других технологических дисциплин, готовящих учащихся к цифровой экономике.", EN: "Promote programming, robotics, digital literacy, engineering, and other technological disciplines that prepare students for the digital economy." }
        },
        talent: {
          title: { UZ: "Iste'dodlarni rivojlantirish", RU: "Развитие талантов", EN: "Talent Development" },
          desc: { UZ: "Iqtidorli o'quvchilarni aniqlash hamda maxsus ta'lim loyihalari va musobaqalar orqali ularning akademik, ijodiy, ilmiy va innovatsion salohiyatini qo'llab-quvvatlash.", RU: "Выявление талантливых учащихся и поддержка их академического, творческого, научного и инновационного потенциала посредством специализированной образовательной деятельности и конкурсов.", EN: "Identify talented students and support their academic, creative, scientific, and innovative potential through specialized educational activities and competitions." }
        },
        growth: {
          title: { UZ: "Yetakchilik va shaxsiy o'sish", RU: "Лидерство и личный рост", EN: "Leadership & Personal Growth" },
          desc: { UZ: "Hamkorlikdagi loyihalar va maktabdan tashqari tashabbuslar orqali yetakchilik, jamoada ishlash, muloqot, tanqidiy fikrlash va ijtimoiy mas'uliyatni rivojlantirish.", RU: "Развитие лидерских качеств, работы в команде, коммуникации, критического мыслительного процесса и социальной ответственности посредством совместных проектов и внешкольных инициатив.", EN: "Develop leadership, teamwork, communication, critical thinking, and social responsibility through collaborative projects and extracurricular initiatives." }
        },
        social: {
          title: { UZ: "Jamiyat va ijtimoiy loyihalar", RU: "Общественные и социальные проекты", EN: "Community & Social Projects" },
          desc: { UZ: "Fuqarolik mas'uliyati va faol fuqarolik pozitsiyasini mustahkamlovchi ekologik, madaniy, ko'ngilli va ijtimoiy loyihalarda ishtirok etishni rag'batlantirish.", RU: "Поощрение участия в экологических, культурных, волонтерских и общественных проектах, укрепляющих гражданскую ответственность и активную гражданскую позицию.", EN: "Encourage participation in environmental, cultural, volunteer, and community projects that strengthen civic responsibility and active citizenship." }
        },
        competition: {
          title: { UZ: "Musobaqalar va innovatsiyalar", RU: "Конкурсы и инновации", EN: "Competitions & Innovation" },
          desc: { UZ: "Akademik olimpiadalar, innovatsion dasturlar, xakatonlar, ko'rgazmalar, ilmiy yarmarkalar va loyihaga asoslangan ta'lim imkoniyatlarini tashkil etish.", RU: "Организация академических конкурсов, инновационных программ, хакатонов, выставок, научных ярмарок и возможностей проектного обучения.", EN: "Organize academic competitions, innovation programs, hackathons, exhibitions, science fairs, and project-based learning opportunities." }
        }
      }
    },
    structure: {
      badge: { UZ: "Tashkiliy tizim", RU: "Организационная система", EN: "Institutional Chart" },
      title: { UZ: "Tashkiliy tuzilma", RU: "Организационная структура", EN: "Organizational Structure" },
      subtitle: {
        UZ: "Kelajak markazlari respublika agentligi, hududiy markazlar, ta'lim muassasalari va o'quvchilar o'rtasidagi muvofiqlikni ta'minlovchi tizimli milliy ta'lim tuzilmasi orqali faoliyat yuritadi.",
        RU: "Центры будущего функционируют через структурированную национальную систему образования, которая обеспечивает координацию между республиканским агентством, региональными центрами, образовательными учреждениями и учащимися.",
        EN: "The Future Centers operate through a structured national education system that ensures coordination between the national agency, regional centers, educational institutions, and students."
      },
      nodes: {
        agency: {
          title: { UZ: "Respublika agentligi", RU: "Республиканское агентство", EN: "Republican Agency" },
          desc: { UZ: "O'zbekiston bo'ylab Kelajak markazlari tarmog'ini muvofiqlashtirish, ta'lim standartlarini tasdiqlash, strategik ustuvor yo'nalishlarni belgilash va milliy ta'lim siyosatini ishlab chiqish uchun mas'ul organ.", RU: "Орган, ответственный за разработку национальной образовательной политики, определение стратегических приоритетов, утверждение стандартов и координацию всей сети Центров будущего по всему Узбекистану.", EN: "Responsible for developing national educational policies, defining strategic priorities, approving standards, and coordinating the overall Future Centers network across Uzbekistan." }
        },
        regional: {
          title: { UZ: "Hududiy kelajak markazi", RU: "Региональный центр будущего", EN: "Regional Future Center" },
          desc: { UZ: "Viloyat miqyosida ta'lim faoliyatini muvofiqlashtiradi, dasturlar bajarilishini monitoring qiladi, mahalliy markazlarni qo'llab-quvvatlaydi va ta'lim sifati standartlarini nazorat qiladi.", RU: "Координирует образовательную деятельность в регионе, контролирует реализацию программ, поддерживает местные центры и обеспечивает соблюдение стандартов качества.", EN: "Coordinates educational activities within the region, monitors implementation, supports local centers, and ensures quality standards are maintained." }
        },
        district: {
          title: { UZ: "Tuman / shahar muvofiqlashtiruvchisi", RU: "Районная / городская координация", EN: "District / City Coordination" },
          desc: { UZ: "Hududiy boshqarma va ta'lim muassasalari o'rtasida operativ ko'prik vazifasini o'taydi, dasturlarni, muloqotni va joylardagi ijroni muvofiqlashtiradi.", RU: "Выступает в качестве оперативного связующего звена между региональным руководством и образовательными учреждениями, координируя программы, коммуникацию и местную реализацию.", EN: "Acts as the operational bridge between regional management and educational institutions, coordinating programs, communication, and local implementation." }
        },
        center: {
          title: { UZ: "Kelajak markazi", RU: "Центр будущего", EN: "Future Center" },
          desc: { UZ: "Maktabdan tashqari ta'lim dasturlarini taqdim etadi, loyihalarni tashkil qiladi, iste'dodlarni rivojlantirishni qo'llab-quvvatlaydi va o'quvchilar uchun ta'lim imkoniyatlarini yaratadi.", RU: "Предоставляет внешкольные образовательные программы, организует проекты, поддерживает развитие талантов и создает возможности для обучения учащихся.", EN: "Provides extracurricular educational programs, organizes projects, supports talent development, and creates learning opportunities for students." }
        },
        schools: {
          title: { UZ: "Maktablar", RU: "Школы", EN: "Schools" },
          desc: { UZ: "O'quvchilarning qiziqishlarini aniqlash, ularning ishtirokini targ'ib qilish va ta'lim tashabbuslarini qo'llab-quvvatlash orqali Kelajak markazlari bilan hamkorlik qiladi.", RU: "Сотрудничают с Центрами будущего, выявляя интересы учащихся, способствуя их участию и поддерживая образовательные инициативы.", EN: "Collaborate with Future Centers by identifying student interests, promoting participation, and supporting educational initiatives." }
        },
        students: {
          title: { UZ: "O'quvchilar", RU: "Учащиеся", EN: "Students" },
          desc: { UZ: "Ta'lim dasturlari, musobaqalar, texnologik kurslar, ijodiy va yetakchilik loyihalarida faol ishtirok etuvchi Kelajak markazlari ekotizimining asosiy benefitsiarlari.", RU: "Основные бенефициары экосистемы Центров будущего, участвующие в образовательных программах, конкурсах, курсах технологий, искусств и проектах личностного развития.", EN: "The primary beneficiaries of the Future Centers ecosystem, participating in educational programs, competitions, innovation projects, leadership activities, technology courses, sports, arts, and personal development opportunities." }
        }
      }
    }
  },
  directions: {
    badge: { UZ: "Dasturlar", RU: "Программы", EN: "Programs" },
    title: { UZ: "Bizning yo'nalishlarimiz", RU: "Наши направления", EN: "Our Directions" },
    subtitle: {
      UZ: "Ertangi kun chaqiriqlariga tayyor bo'lgan, har tomonlama rivojlangan va yuqori malakali yosh mutaxassislarni tayyorlashga mo'ljallangan 6 ta asosiy yo'nalishimiz bilan tanishing.",
      RU: "Ознакомьтесь с шестью ключевыми образовательными направлениями, разработанными для подготовки всесторонне развитых молодых специалистов.",
      EN: "Explore six core program tracks designed to develop well-rounded, highly skilled young professionals ready for the challenges of tomorrow."
    },
    learnMore: { UZ: "Batafsil →", RU: "Подробнее →", EN: "Learn more →" },
    tracks: {
      robotics: {
        title: { UZ: "Robototexnika", RU: "Робототехника", EN: "Robotics" },
        desc: {
          UZ: "O'quvchilar viloyat va respublika chempionatlarida ishtirok etish uchun robotlarni mustaqil loyihalash, yaratish va dasturlashni o'rganadigan amaliy robototexnika muhandisligi.",
          RU: "Практическая робототехника, где учащиеся проектируют, собирают и программируют роботов для участия в региональных и республиканских чемпионатах.",
          EN: "Hands-on robotics engineering where students design, build, and program robots to compete in regional and national championships."
        }
      },
      stem: {
        title: { UZ: "STEM ta'limi", RU: "STEM-образование", EN: "STEM" },
        desc: {
          UZ: "Laboratoriya tajribalari va hayotiy muammolarni hal qilishga asoslangan fan, texnologiya, muhandislik va matematika integratsiyalashgan o'quv dasturi.",
          RU: "Интегрированная программа по естественным наукам, технологиям, инженерии и математике с лабораторными опытами и решением реальных задач.",
          EN: "An integrated science, technology, engineering and mathematics curriculum with laboratory experiments and real-world problem solving."
        }
      },
      programming: {
        title: { UZ: "Dasturlash", RU: "Программирование", EN: "Programming" },
        desc: {
          UZ: "Boshlang'ich blokli kodlashdan tortib ilg'or Python va veb-dasturlashgacha — o'quvchilarni raqamli iqtisodiyotdagi muvaffaqiyatli martabaga tayyorlash.",
          RU: "От базового блочного кодирования до продвинутого Python и веб-разработки — подготовка специалистов для цифровой экономики.",
          EN: "From beginner block coding to advanced Python and web development — preparing students for careers in the digital economy."
        }
      },
      languages: {
        title: { UZ: "Xorijiy tillar", RU: "Иностранные языки", EN: "Languages" },
        desc: {
          UZ: "Malakali o'qituvchilar tomonidan interaktiv va zamonaviy uslublarda o'tiladigan ingliz, rus va xitoy tillarining intensiv kurslari.",
          RU: "Интенсивные курсы английского, русского и китайского языков, проводимые квалифицированными преподавателями по коммуникативным методикам.",
          EN: "Intensive English, Russian, and Chinese language courses taught by qualified teachers using communicative and immersive methods."
        }
      },
      arts: {
        title: { UZ: "Tasviriy san'at va ijod", RU: "Искусство", EN: "Arts" },
        desc: {
          UZ: "Yoshlarda o'ziga bo'lgan ishonch, tartib-intizom va estetik didni shakllantiruvchi tasviriy san'at, musiqa va dizayn dasturlari.",
          RU: "Программы изобразительного искусства, музыки и дизайна, которые формируют уверенность в себе, дисциплину и эстетический вкус.",
          EN: "Visual arts, music, design, and creative expression programs that build confidence, discipline, and aesthetic sensibility."
        }
      },
      leadership: {
        title: { UZ: "Yetakchilik", RU: "Лидерство", EN: "Leadership" },
        desc: {
          UZ: "Kelajak yetakchilari uchun notiqlik san'ati, ijtimoiy faollik va jamoat xizmatiga yo'naltirilgan yoshlar yetakchilik akademiyasi.",
          RU: "Академии молодежного лидерства, ораторское искусство, гражданская активность и программы социального служения для будущих лидеров.",
          EN: "Youth leadership academies, public speaking, civic engagement, and community service programs for future decision-makers."
        }
      }
    }
  },
  statistics: {
    badge: { UZ: "Bizning natijalarimiz", RU: "Наши результаты", EN: "Our Impact" },
    title: { UZ: "Jizzax viloyatida yoshlar hayotini o'zgartirmoqdamiz", RU: "Меняем жизнь молодежи Джизака к лучшему", EN: "Transforming Lives Across Jizzax" },
    labels: {
      students: { UZ: "Tahsil olayotgan yoshlar", RU: "Принято учеников", EN: "Students Enrolled" },
      clubs: { UZ: "Faol to'garaklar", RU: "Активные клубы", EN: "Active Clubs" },
      events: { UZ: "Yillik tadbirlar soni", RU: "Мероприятий в год", EN: "Events Per Year" },
      partners: { UZ: "Tuman hamkorlari", RU: "Районные партнеры", EN: "District Partners" },
    },
    descs: {
      students: { UZ: "Barcha yo'nalishlar bo'yicha faol ta'lim oluvchilar", RU: "Активные учащиеся по всем направлениям", EN: "Active learners across all programs" },
      clubs: { UZ: "Qiziqishlarga asoslangan yoshlar to'garaklari", RU: "Клубы по интересам для учащихся", EN: "Interest-based student groups" },
      events: { UZ: "Musobaqalar, amaliy seminarlar va forumlar", RU: "Соревнования, семинары и форумы", EN: "Competitions, workshops & forums" },
      partners: { UZ: "Davlat va idoraviy hamkorlar", RU: "Государственные и ведомственные партнеры", EN: "Government & institutional partners" },
    }
  },
  news: {
    badge: { UZ: "So'nggi yangiliklar", RU: "Последние новости", EN: "Latest News" },
    title: { UZ: "Yangiliklardan boxabar bo'ling", RU: "Будьте в курсе событий", EN: "Stay Up to Date" },
    viewAll: { UZ: "Barcha yangiliklarni ko'rish", RU: "Посмотреть все новости", EN: "View all news" },
    readMore: { UZ: "Batafsil", RU: "Читать далее", EN: "Read more" },
    categories: {
      competition: { UZ: "Musobaqa", RU: "Соревнование", EN: "Competition" },
      program: { UZ: "Loyiha", RU: "Программа", EN: "Program" },
      forum: { UZ: "Forum", RU: "Форум", EN: "Forum" },
    },
    items: [
      {
        id: 1,
        date: { UZ: "2026-yil 15-mart", RU: "15 марта 2026", EN: "March 15, 2026" },
        category: 'competition',
        title: { UZ: "Robototexnika bo'yicha Jizzax chempionati — 2026", RU: "Чемпионат Джизака по робототехнике — 2026", EN: "Jizzax Robotics Championship 2026" },
        excerpt: {
          UZ: "O'quvchilarimiz 2026-yilgi hududiy robototexnika chempionatida faxrli o'rinlarni egallashdi va uchta jamoamiz Toshkentda bo'lib o'tadigan respublika bosqichiga yo'llanma oldi.",
          RU: "Наши учащиеся заняли призовые места на региональном чемпионате, и три команды вышли в республиканский финал в Ташкенте.",
          EN: "Our students claimed top honors at the 2026 Regional Robotics Championship, with three teams advancing to the national finals in Tashkent."
        }
      },
      {
        id: 2,
        date: { UZ: "2026-yil 1-iyun", RU: "1 июня 2026", EN: "June 1, 2026" },
        category: 'program',
        title: { UZ: "Yozgi STEM lageriga ro'yxatdan o'tish boshlandi", RU: "Регистрация в Летний лагерь STEM открыта", EN: "Summer STEM Camp Registration Open" },
        excerpt: {
          UZ: "Har yilgi an'anaviy Yozgi STEM lagerimizga arizalar qabuli boshlandi — bu 12 yoshdan 18 yoshgacha bo'lgan yoshlar uchun fan, muhandislik va texnologiya sohalari bo'yicha ikki haftalik intensiv amaliy dasturdir.",
          RU: "Открыт прием заявок в наш ежегодный летний лагерь STEM — две недели интенсивной практики по науке и инженерии для подростков 12–18 лет.",
          EN: "Applications are now open for our annual Summer STEM Camp — two weeks of intensive hands-on science, engineering, and technology for ages 12–18."
        }
      },
      {
        id: 3,
        date: { UZ: "2026-yil 22-aprel", RU: "22 апреля 2026", EN: "April 22, 2026" },
        category: 'forum',
        title: { UZ: "Yosh yetakchilar forumi — 2026", RU: "Форум молодых лидеров — 2026", EN: "Young Leaders Forum 2026" },
        excerpt: {
          UZ: "Jizzax viloyatining barcha hududlaridan 200 dan ortiq o'quvchi har yilgi an'anaviy Yosh yetakchilar forumiga yig'ildi. Forum doirasida taniqli ma'ruzachilar chiqishlari, amaliy mashg'ulotlar va ijtimoiy loyihalar taqdimoti o'tkazildi.",
          RU: "Более 200 участников со всей Джизакской области собрались на Форуме молодых лидеров, включающем выступления спикеров, воркшопы и презентации проектов.",
          EN: "Over 200 students from across Jizzax region gathered for the annual Young Leaders Forum, featuring keynote speakers, workshops, and community project showcases."
        }
      }
    ]
  },
  events: {
    badge: { UZ: "Kutilayotgan tadbirlar", RU: "Предстоящие события", EN: "Upcoming Events" },
    title: { UZ: "Yaqin orada kutilayotgan tadbirlar", RU: "Что нас ожидает", EN: "What's Coming Up" },
    viewAll: { UZ: "Barcha tadbirlarni ko'rish", RU: "Посмотреть все события", EN: "View all events" },
    register: { UZ: "Ro'yxatdan o'tish", RU: "Регистрация", EN: "Register" },
    attendeesExpected: { UZ: "ishtirokchi kutilmoqda", RU: "участников ожидается", EN: "expected" },
    categories: {
      Competition: { UZ: "Musobaqa", RU: "Соревнование", EN: "Competition" },
      Camp: { UZ: "Lager", RU: "Лагерь", EN: "Camp" },
      Academic: { UZ: "Akademik", RU: "Академическое", EN: "Academic" },
      Expo: { UZ: "Ko'rgazma", RU: "Выставка", EN: "Expo" },
    },
    months: {
      IYL: { UZ: "IYL", RU: "ИЮЛ", EN: "JUL" },
      AVG: { UZ: "AVG", RU: "АВГ", EN: "AUG" },
      SEN: { UZ: "SEN", RU: "СЕН", EN: "SEP" },
      OKT: { UZ: "OKT", RU: "ОКТ", EN: "OCT" },
    },
    monthsFull: {
      IYL: { UZ: "iyul", RU: "июля", EN: "July" },
      AVG: { UZ: "avgust", RU: "августа", EN: "August" },
      SEN: { UZ: "sentabr", RU: "сентября", EN: "September" },
      OKT: { UZ: "oktabr", RU: "октября", EN: "October" },
    },
    items: [
      {
        month: "IYL",
        day: "14",
        year: "2026",
        title: { UZ: "Dasturlash bo'yicha hududiy olimpiada", RU: "Региональная олимпиада по программированию", EN: "Regional Programming Olympiad" },
        location: { UZ: "\"Kelajak markazi\", Jizzax", RU: "«Келажак Маркази», Джизак", EN: "Kelajak Markazi, Jizzax" },
        attendees: "150+",
        category: "Competition",
        desc: {
          UZ: "Jizzax viloyatidagi 14 yoshdan 20 yoshgacha bo'lgan o'quvchilar o'rtasida o'tkaziladigan yillik dasturlash musobaqasi. G'oliblar qimmatbaho esdalik sovg'alari va grantlar bilan taqdirlanadi.",
          RU: "Ежегодное соревнование по программированию для учащихся 14–20 лет со всей Джизакской области. Призы включают гранты и технику.",
          EN: "Annual programming competition open to students aged 14–20 across Jizzax region. Prizes include scholarships and tech equipment."
        }
      },
      {
        month: "AVG",
        day: "01",
        year: "2026",
        title: { UZ: "Yozgi STEM lagerining tantanali ochilishi", RU: "Открытие летнего лагеря STEM", EN: "Summer STEM Camp Opening" },
        location: { UZ: "Bosh bino, Jizzax", RU: "Главный кампус, Джизак", EN: "Main Campus, Jizzax" },
        attendees: "200+",
        category: "Camp",
        desc: {
          UZ: "Robototexnika, kimyo, fizika laboratoriya tajribalari va jamoaviy muhandislik loyihalarini o'z ichiga olgan ikki haftalik intensiv STEM lageri.",
          RU: "Двухнедельный интенсивный лагерь STEM с робототехникой, химическими и физическими опытами, а также командными проектами.",
          EN: "Two-week intensive STEM immersion camp featuring robotics, chemistry, physics experiments, and collaborative engineering challenges."
        }
      },
      {
        month: "SEN",
        day: "05",
        year: "2026",
        title: { UZ: "Yangi o'quv yili uchun tanishtiruv marosimi", RU: "Ориентационный день нового учебного года", EN: "New Academic Year Orientation" },
        location: { UZ: "\"Kelajak markazi\" faollar zali", RU: "Зал «Келажак Маркази»", EN: "Kelajak Markazi Hall" },
        attendees: "500+",
        category: "Academic",
        desc: {
          UZ: "Yangi va amaldagi o'quvchilar uchun ochiq eshiklar kuni, to'garaklar taqdimoti va barcha yo'nalishlar bo'yicha ro'yxatdan o'tish marosimi.",
          RU: "Приветственная церемония для новых и продолжающих обучение студентов с презентациями программ, ярмаркой клубов и записью.",
          EN: "Welcome ceremony for new and returning students with program presentations, club fair, and enrollment for all directions."
        }
      },
      {
        month: "OKT",
        day: "18",
        year: "2026",
        title: { UZ: "Yosh innovatorlar ko'rgazmasi — 2026", RU: "Выставка молодых инноваторов 2026", EN: "Young Innovators Expo 2026" },
        location: { UZ: "Jizzax shahar kongress-holl", RU: "Джизакский выставочный комплекс", EN: "Jizzax Convention Center" },
        attendees: "1,000+",
        category: "Expo",
        desc: {
          UZ: "O'quvchilar o'zlarining ijodiy loyihalari va ixtirolarini soha mutaxassislari, davlat tashkilotlari vakillari va pedagoglardan iborat hakamlar hay'atiga taqdim etadilar.",
          RU: "Студенты презентуют свои проекты и изобретения перед жюри из преподавателей, государственных представителей и профессионалов отрасли.",
          EN: "Students showcase their projects and inventions before a jury of educators, government officials, and industry professionals."
        }
      }
    ]
  },
  gallery: {
    badge: { UZ: "Galereya", RU: "Галерея", EN: "Gallery" },
    title: { UZ: "\"Kelajak markazi\" hayoti", RU: "Жизнь в «Центре будущего»", EN: "Life at Kelajak Markazi" },
    subtitle: {
      UZ: "Jizzax yoshlarining kelajagini shakllantirayotgan faol va bilimga chanqoq yoshlar hayotidan lavhalar.",
      RU: "Кадры из жизни нашего активного сообщества, формирующего будущее молодежи Джизака.",
      EN: "A glimpse into the vibrant learning community shaping the future of Jizzax youth."
    },
    labels: {
      Programming: { UZ: "Dasturlash", RU: "Программирование", EN: "Programming" },
      Arts: { UZ: "San'at", RU: "Искусство", EN: "Arts" },
      STEM: { UZ: "STEM", RU: "STEM", EN: "STEM" },
      Leadership: { UZ: "Yetakchilik", RU: "Лидерство", EN: "Leadership" },
      Languages: { UZ: "Tillar", RU: "Языки", EN: "Languages" },
      Events: { UZ: "Tadbirlar", RU: "События", EN: "Events" },
    },
    photos: [
      { src: "/images/gallery1.png", alt: { UZ: "Zamonaviy kompyuter sinfidagi dasturlash darsi", RU: "Занятие по программированию в компьютерном классе", EN: "Programming class in modern computer lab" }, label: "Programming" },
      { src: "/images/gallery2.png", alt: { UZ: "Tasviriy san'at va ijodiy mahorat darsi", RU: "Мастер-класс по искусству и творчеству", EN: "Arts and creativity workshop" }, label: "Arts" },
      { src: "/images/gallery3.png", alt: { UZ: "Ilmiy laboratoriyadagi kimyoviy-fizikaviy tajribalar", RU: "Научные опыты в лаборатории", EN: "Science experiment in school lab" }, label: "STEM" },
      { src: "/images/gallery4.png", alt: { UZ: "Ochiq havoda jamoani shakllantirish bo'yicha yetakchilik mashg'ulotlari", RU: "Тренинг по тимбилдингу на открытом воздухе", EN: "Leadership team building activity outdoors" }, label: "Leadership" },
      { src: "/images/gallery5.png", alt: { UZ: "Ingliz tili darslaridagi interaktiv mashg'ulotlar", RU: "Интерактивный урок английского языка", EN: "English language learning class" }, label: "Languages" },
      { src: "/images/gallery6.png", alt: { UZ: "\"Kelajak markazi\" bitiruvchilarining taqdirlash marosimi", RU: "Выпускной вечер в «Центре будущего»", EN: "Graduation ceremony at Kelajak Markazi" }, label: "Events" },
    ]
  },
  cta: {
    badge: { UZ: "Bizga qo'shiling", RU: "Присоединяйтесь", EN: "Join Us" },
    title: { UZ: "\"Kelajak markazi\"da o'z faoliyatingizni boshlang", RU: "Начните свой путь в «Центре будущего»", EN: "Start Your Journey at Kelajak Markazi" },
    subtitle: {
      UZ: "Siz texnologiyalar sohasida karyera qilishni orvu qilayotgan yosh bo'lasizmi, farzandiga eng yaxshi imkoniyatlarni izlayotgan ota-ona bo'lasizmi yoki yoshlar kamoloti yo'lida intilayotgan fidoyi ustoz bo'lasizmi — \"Kelajak markazi\" siz uchun munosib maskandir.",
      RU: "Независимо от того, являетесь ли вы студентом, мечтающим о карьере в сфере IT, родителем, ищущим лучшие условия, или педагогом — Центр будущего ждет вас.",
      EN: "Whether you're a student dreaming of a career in technology, a parent seeking the best opportunities, or an educator passionate about youth development — Kelajak Markazi is your place."
    },
    benefits: [
      { UZ: "Jahon andozalaridagi shart-sharoitlar va zamonaviy jihozlardan foydalanish imkoniyati", RU: "Доступ к современному оборудованию мирового класса", EN: "Access to world-class facilities and equipment" },
      { UZ: "Tajribali pedagoglar va soha mutaxassislarining ustozligi (mentorligi)", RU: "Менторство со стороны опытных преподавателей", EN: "Mentorship from experienced educators" },
      { UZ: "Vakolatli davlat organlari tomonidan tasdiqlangan maxsus sertifikat dasturlari", RU: "Сертификационные программы, одобренные госорганами", EN: "Certificate programs recognized by authorities" },
      { UZ: "Respublika va xalqaro miqyosdagi musobaqalarda ishtirok etish imkoniyatlari", RU: "Возможность участия в республиканских и международных конкурсах", EN: "Opportunities for national & international competitions" },
    ],
    applyNow: { UZ: "Ariza topshirish", RU: "Подать заявку", EN: "Apply Now" },
    explorePrograms: { UZ: "Dasturlar bilan tanishish", RU: "Программы", EN: "Explore Programs" },
    enrollmentOpen: { UZ: "Qabul boshlandi", RU: "Прием открыт", EN: "Enrollment is Open" },
    academicYearLabel: { UZ: "O'quv yili", RU: "Учебный год", EN: "Academic Year" },
    ageRangeLabel: { UZ: "Yosh toifasi", RU: "Возраст", EN: "Age Range" },
    ageRangeVal: { UZ: "10–25 yosh", RU: "10–25 лет", EN: "10–25 years" },
    regLabel: { UZ: "Ro'yxatdan o'tish", RU: "Регистрация", EN: "Registration" },
    regVal: { UZ: "Mutlaqo bepul", RU: "Бесплатно", EN: "Free of charge" },
    locLabel: { UZ: "Manzil", RU: "Местоположение", EN: "Location" },
    locVal: { UZ: "Jizzax shahri", RU: "г. Джизак", EN: "Jizzax City" },
    registerOnline: { UZ: "Onlayn ro'yxatdan o'tish", RU: "Регистрация онлайн", EN: "Register Online" },
  },
  footer: {
    brandTitle: { UZ: "Kelajak markazi", RU: "Центр будущего", EN: "Kelajak Markazi" },
    brandSubtitle: { UZ: "Jizzax viloyati", RU: "Джизакская область", EN: "Jizzax Region" },
    brandDesc: { UZ: "O'zbekistonning Jizzax viloyatida yangi avlod innovatorlari, yetakchilari va ijodkorlarini ilhomlantirmoqdamiz.", RU: "Вдохновляем новое поколение инноваторов, лидеров и создателей в Джизаке, Узбекистан.", EN: "Inspiring the next generation of innovators, leaders, and creators in Jizzax, Uzbekistan." },
    navHeader: { UZ: "Navigatsiya", RU: "Навигация", EN: "Navigation" },
    programsHeader: { UZ: "Yo'nalishlar", RU: "Направления", EN: "Programs" },
    contactHeader: { UZ: "Aloqa", RU: "Контакты", EN: "Contact Us" },
    address: { UZ: "Kelajak ko'chasi, 1-uy,\nJizzax shahri, Jizzax viloyati,\nO'zbekiston", RU: "ул. Келажак, д. 1,\nгород Джизак, Джизакская область,\nУзбекистан", EN: "1 Kelajak Str.,\nJizzax City, Jizzax Region,\nUzbekistan" },
    copyright: { UZ: "Barcha huquqlar himoyalangan.", RU: "Все права защищены.", EN: "All rights reserved." },
    patronage: { UZ: "Jizzax viloyati hokimligi homiyligida", RU: "Под патронажем Хокимията Джизакской области", EN: "Under the patronage of Jizzax Regional Administration" },
  },
  courses: {
    badge: { UZ: "O'quv dasturlari", RU: "Обучающие программы", EN: "Educational Programs" },
    title: { UZ: "Bizning Kurslar", RU: "Наши Курсы", EN: "Our Courses" },
    subtitle: {
      UZ: "Tez kunda yangi va zamonaviy to'garaklar hamda kurslar ro'yxati e'lon qilinadi.",
      RU: "Скоро здесь появится список новых современных курсов и кружков.",
      EN: "A list of new and modern courses and clubs will be published here soon."
    },
    comingSoon: { UZ: "Tez kunda e'lon qilinadi", RU: "Скоро будет опубликовано", EN: "Coming Soon" },
    helpText: {
      UZ: "Ayni vaqtda dars jadvallari va ro'yxatga olish jarayoni shakllantirilmoqda. Yangiliklarni kuzatib boring!",
      RU: "В настоящее время формируется расписание занятий и процесс регистрации. Следите за обновлениями!",
      EN: "Class schedules and registration processes are currently being structured. Stay tuned for updates!"
    }
  },
  admin: {
    sidebar: {
      dashboard: { UZ: "Boshqaruv paneli", RU: "Панель управления", EN: "Dashboard" },
      news: { UZ: "Yangiliklar", RU: "Новости", EN: "News" },
      gallery: { UZ: "Galereya", RU: "Галерея", EN: "Gallery" },
      events: { UZ: "Tadbirlar", RU: "Мероприятия", EN: "Events" },
      settings: { UZ: "Sozlamalar", RU: "Настройки сайта", EN: "Site Settings" },
    },
    buttons: {
      login: { UZ: "Tizimga kirish", RU: "Войти в систему", EN: "Sign In" },
      loggingIn: { UZ: "Kirilmoqda...", RU: "Вход...", EN: "Signing In..." },
      logout: { UZ: "Tizimdan chiqish", RU: "Выйти", EN: "Logout" },
      cancel: { UZ: "Bekor qilish", RU: "Отмена", EN: "Cancel" },
      save: { UZ: "Saqlash", RU: "Сохранить", EN: "Save" },
      saving: { UZ: "Saqlanmoqda...", RU: "Сохранение...", EN: "Saving..." },
      edit: { UZ: "Tahrirlash", RU: "Редактировать", EN: "Edit" },
      delete: { UZ: "O'chirish", RU: "Удалить", EN: "Delete" },
      deleting: { UZ: "O'chirilmoqda...", RU: "Удаление...", EN: "Deleting..." },
      addNews: { UZ: "Yangilik qo'shish", RU: "Добавить новость", EN: "Add News" },
      addEvent: { UZ: "Tadbir qo'shish", RU: "Добавить мероприятие", EN: "Add Event" },
      addGallery: { UZ: "Rasm yuklash", RU: "Загрузить фото", EN: "Upload Image" },
      forgotPassword: { UZ: "Parolni tiklash", RU: "Восстановление пароля", EN: "Reset Password" },
      sendResetLink: { UZ: "Havola yuborish", RU: "Отправить ссылку", EN: "Send Reset Link" },
      sending: { UZ: "Yuborilmoqda...", RU: "Отправка...", EN: "Sending..." },
      backToLogin: { UZ: "Kirish sahifasiga qaytish", RU: "Назад к входу", EN: "Back to Login" },
      resetPassword: { UZ: "Parolni yangilash", RU: "Обновить пароль", EN: "Reset Password" },
      resetting: { UZ: "Yangilanmoqda...", RU: "Обновление...", EN: "Resetting..." },
      createNews: { UZ: "Yangilik yaratish", RU: "Создать новость", EN: "Create News" },
      updateNews: { UZ: "Yangilikni yangilash", RU: "Обновить новость", EN: "Update News" },
      createEvent: { UZ: "Tadbir yaratish", RU: "Создать мероприятие", EN: "Create Event" },
      updateEvent: { UZ: "Tadbirni yangilash", RU: "Обновить мероприятие", EN: "Update Event" },
      createGallery: { UZ: "Rasm qo'shish", RU: "Добавить изображение", EN: "Create Gallery Item" },
      updateGallery: { UZ: "Rasmni yangilash", RU: "Обновить изображение", EN: "Update Gallery Item" },
      savingChanges: { UZ: "O'zgarishlarni saqlash", RU: "Сохранить изменения", EN: "Save Changes" },
      forgotPasswordLink: { UZ: "Parolni unutdingizmi?", RU: "Забыли пароль?", EN: "Forgot password?" }
    },
    login: {
      title: { UZ: "Admin tizimiga kirish", RU: "Вход для администратора", EN: "Admin Login" },
      subtitle: { UZ: "Veb-saytni boshqarish uchun tizimga kiring", RU: "Войдите в систему для управления сайтом", EN: "Sign in to manage your website" },
      emailLabel: { UZ: "Elektron pochta", RU: "Электронная почта", EN: "Email Address" },
      passwordLabel: { UZ: "Parol", RU: "Пароль", EN: "Password" },
      emailPlaceholder: { UZ: "pochta@example.com", RU: "email@example.com", EN: "admin@example.com" },
      passwordPlaceholder: { UZ: "••••••••", RU: "••••••••", EN: "••••••••" },
      invalidEmail: { UZ: "Email formati noto'g'ri", RU: "Неверный формат email", EN: "Invalid email format" },
      credentialsError: { UZ: "Email yoki parol notoʻgʻri. Iltimos, qaytadan tekshiring.", RU: "Неверный email или пароль. Пожалуйста, проверьте еще раз.", EN: "Invalid email or password. Please try again." }
    }
  },
  errors: {
    globalTitle: { UZ: "Kutilmagan xatolik yuz berdi", RU: "Произошла непредвиденная ошибка", EN: "An unexpected error occurred" },
    globalSubtitle: { UZ: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.", RU: "Произошла ошибка. Пожалуйста, попробуйте еще раз.", EN: "An unexpected error occurred. Please try again." },
    retry: { UZ: "Qaytadan urinish / Retry", RU: "Повторить попытку", EN: "Retry" },
    home: { UZ: "Bosh sahifa / Home", RU: "На главную", EN: "Home" },
    dbSchemaNotFound: {
      UZ: "Soʻralgan maʼlumotlar jadvali topilmadi.",
      RU: "Запрошенная таблица данных не найдена.",
      EN: "Could not find the requested table."
    }
  },
  notFound: {
    title: { UZ: "Sahifa topilmadi", RU: "Страница не найдена", EN: "Page Not Found" },
    subtitle: {
      UZ: "Kechirasiz, siz qidirayotgan sahifa mavjud emas, olib tashlangan yoki manzili oʻzgartirilgan.",
      RU: "К сожалению, запрашиваемая страница не существует, была удалена или ее адрес был изменен.",
      EN: "Sorry, the page you are looking for does not exist, has been removed or had its name changed."
    },
    backHome: { UZ: "Bosh sahifaga qaytish", RU: "Вернуться на главную", EN: "Return to home page" }
  }
};
