// Kelajak Centers ekotizimi uchun o'zbek tilidagi namunaviy ma'lumotlar.

export const currentStudent = {
  name: 'Azizbek Karimov',
  level: '4-daraja Bilimdon',
  levelProgress: 72,
  xp: 4280,
  nextLevelXp: 6000,
  grade: '11-sinf',
  school: 'Jizzax Prezident maktabi',
  region: 'Jizzax',
  initials: 'AK',
}

export const academics = {
  gpa: 3.86,
  gpaMax: 4.0,
  ielts: { current: 6.5, target: 7.0 },
  sat: { current: 1380, target: 1500 },
  olympiads: [
    { id: 1, title: 'Respublika Informatika Olimpiadasi', place: 'Kumush medal', year: 2025 },
    { id: 2, title: 'Viloyat Matematika Olimpiadasi', place: 'Oltin medal', year: 2024 },
    { id: 3, title: 'Milliy Ingliz tili musobaqasi', place: 'Finalchi', year: 2025 },
  ],
}

export const clubs = [
  { id: 1, name: 'Robototexnika', role: 'Jamoa rahbari', sessions: 24, color: 'accent' },
  { id: 2, name: 'Debat klubi', role: 'Faol a\'zo', sessions: 18, color: 'primary' },
  { id: 3, name: 'Ko\'ngillilar uyushmasi', role: 'Koordinator', sessions: 31, color: 'success' },
]

// Sparkline uchun haftalik davomat (oxirgi 10 hafta).
export const attendanceTrend = [70, 75, 68, 82, 88, 84, 90, 92, 95, 96]

export const teacherFeedback = {
  quote:
    'Azizbek Robototexnika jamoasida yetakchilik fazilatlarini namoyon etadi va kichik o\'quvchilarga doimo ustozlik qiladi. Uning qiziquvchanligi atrofdagilarga ham yuqadi.',
  teacher: 'Nodira Yusupova',
  subject: 'Informatika o\'qituvchisi',
}

export const achievements = [
  { id: 1, name: 'Eng faol ko\'ngilli', desc: '100+ soat ko\'ngillilik', tone: 'success' },
  { id: 2, name: 'Texnologiya novatori', desc: '3 ta robototexnika loyihasi', tone: 'accent' },
  { id: 3, name: 'Sport chempioni', desc: 'Viloyat futzal g\'olibi', tone: 'warning' },
  { id: 4, name: 'Debat yulduzi', desc: '2025-yil eng yaxshi notiq', tone: 'primary' },
]

export const roadmap = [
  {
    id: 1,
    grade: '9-sinf',
    status: 'done',
    items: [
      { title: 'O\'quv odatlarini shakllantirish va GPA kuzatuvi', done: true },
      { title: '2 ta to\'garakka qo\'shilish', done: true },
      { title: 'Ingliz tili poydevorini boshlash (B1)', done: true },
    ],
  },
  {
    id: 2,
    grade: '10-sinf',
    status: 'active',
    items: [
      { title: 'Birinchi rasmiy IELTS sinov imtihoni', done: true },
      { title: 'Motivatsion xat tayyorlash', done: false },
      { title: '3 ta grant va stipendiya topish', done: false },
      { title: 'Jamoaviy loyihaga rahbarlik qilish', done: false },
    ],
  },
  {
    id: 3,
    grade: '11-sinf',
    status: 'upcoming',
    items: [
      { title: 'SAT yakuniy natijasi (maqsad 1500)', done: false },
      { title: '2 ta tavsiyanoma so\'rash', done: false },
      { title: '5 ta universitetga ariza topshirish', done: false },
    ],
  },
]

export const guides = [
  { id: 1, title: 'Tavsiyanomani qanday olish kerak', type: 'PDF qo\'llanma', reads: '2.4k' },
  { id: 2, title: '2026 AQSh oliygohlari grantlari', type: 'Interaktiv', reads: '5.1k' },
  { id: 3, title: 'Ta\'sirchan motivatsion xat yozish', type: 'Shablon', reads: '3.7k' },
  { id: 4, title: '30 kunda IELTS Speaking', type: 'Kurs', reads: '8.9k' },
  { id: 5, title: 'Common App bosqichma-bosqich', type: 'Tekshiruv ro\'yxati', reads: '1.8k' },
  { id: 6, title: 'STEM yo\'nalishlari uchun moliyalashtirish', type: 'PDF qo\'llanma', reads: '2.0k' },
]

export const vocationalSchools = [
  {
    id: 1,
    name: 'Jizzax IT Texnikumi',
    region: 'Jizzax',
    quota: 120,
    directions: ['IT', 'Veb-dasturlash', 'Tarmoqlar'],
  },
  {
    id: 2,
    name: 'Toshkent Sanoat Kolleji',
    region: 'Toshkent',
    quota: 240,
    directions: ['Mexatronika', 'Energetika', 'IT'],
  },
  {
    id: 3,
    name: 'Samarqand Agro Texnikumi',
    region: 'Samarqand',
    quota: 180,
    directions: ['Qishloq xo\'jaligi', 'Agro-texnologiya', 'Logistika'],
  },
  {
    id: 4,
    name: 'Farg\'ona Yengil Sanoat Kolleji',
    region: 'Farg\'ona',
    quota: 150,
    directions: ['To\'qimachilik', 'Dizayn', 'Menejment'],
  },
  {
    id: 5,
    name: 'Buxoro Turizm Texnikumi',
    region: 'Buxoro',
    quota: 90,
    directions: ['Turizm', 'Mehmonxona xizmati', 'Tillar'],
  },
  {
    id: 6,
    name: 'Namangan Qurilish Kolleji',
    region: 'Namangan',
    quota: 200,
    directions: ['Qurilish', 'Arxitektura', 'IT'],
  },
]

export const regions = ['Barcha viloyatlar', 'Jizzax', 'Toshkent', 'Samarqand', 'Farg\'ona', 'Buxoro', 'Namangan']

export const vacancies = [
  {
    id: 1,
    role: 'Boshlang\'ich veb-dasturchi',
    company: 'UzAuto Motors',
    location: 'Jizzax',
    salary: '6–9 mln so\'m',
    course: 'Full-Stack JavaScript Bootcamp',
  },
  {
    id: 2,
    role: 'Agro-texnik',
    company: 'Uzbekistan AgroCluster',
    location: 'Samarqand',
    salary: '5–7 mln so\'m',
    course: 'Zamonaviy sug\'orish va Agro-texnologiya',
  },
  {
    id: 3,
    role: 'Ma\'lumot kiritish mutaxassisi',
    company: 'Humans Telecom',
    location: 'Toshkent',
    salary: '4–6 mln so\'m',
    course: 'Excel va ma\'lumotlar asoslari',
  },
  {
    id: 4,
    role: 'CNC dastgoh operatori',
    company: 'Artel Electronics',
    location: 'Toshkent',
    salary: '7–10 mln so\'m',
    course: 'CNC va Mexatronika asoslari',
  },
]

export const alumniHallOfFame = [
  { id: 1, name: 'Madina Toshkentova', university: 'Harvard Universiteti', year: "'27", major: 'Kompyuter fanlari', rank: 1 },
  { id: 2, name: 'Jasur Rahimov', university: 'MIT', year: "'26", major: 'Aerokosmik muhandislik', rank: 2 },
  { id: 3, name: 'Dilnoza Akramova', university: 'Stanford', year: "'28", major: 'Bioinjeneriya', rank: 3 },
]

export const mentors = [
  {
    id: 1,
    name: 'Sardor Umarov',
    university: 'Kembrij Universiteti',
    major: 'Iqtisodiyot',
    initials: 'SU',
    available: true,
  },
  {
    id: 2,
    name: 'Kamola Niyozova',
    university: 'NYU Abu-Dabi',
    major: 'Ma\'lumotlar fani',
    initials: 'KN',
    available: true,
  },
  {
    id: 3,
    name: 'Bekzod Ergashev',
    university: 'Myunxen TU',
    major: 'Mexanika muhandisligi',
    initials: 'BE',
    available: false,
  },
  {
    id: 4,
    name: 'Sevara Yo\'ldosheva',
    university: 'KAIST',
    major: 'Kimyo',
    initials: 'SY',
    available: true,
  },
]

export type MonitoredStudent = {
  id: number
  name: string
  initials: string
  grade: string
  gpa: number
  clubs: number
  region: string
  major: string
  achievementsByEC?: Record<string, number> // EC count map
}

export const monitoredStudents: MonitoredStudent[] = [
  { id: 1, name: 'Azizbek Karimov', initials: 'AK', grade: '11-sinf', gpa: 3.86, clubs: 3, region: 'Jizzax', major: 'Computer Science', achievementsByEC: { 'Aniq fanlar': 2, 'Loyiha': 2, 'Sport': 1 } },
  { id: 2, name: 'Dildora Sobirova', initials: 'DS', grade: '10-sinf', gpa: 3.42, clubs: 2, region: 'Toshkent', major: 'Business Administration', achievementsByEC: { 'Tillar / Gumanitar': 3, 'Ijodiy / San\'at': 1 } },
  { id: 3, name: 'Otabek Yusupov', initials: 'OY', grade: '11-sinf', gpa: 2.91, clubs: 0, region: 'Samarqand', major: 'Mathematics', achievementsByEC: {} },
  { id: 4, name: 'Malika Tojiboyeva', initials: 'MT', grade: '9-sinf', gpa: 3.65, clubs: 1, region: 'Farg\'ona', major: 'English Literature', achievementsByEC: { 'Tillar / Gumanitar': 2 } },
  { id: 5, name: 'Sherzod Qodirov', initials: 'SQ', grade: '10-sinf', gpa: 3.18, clubs: 0, region: 'Jizzax', major: 'Medicine', achievementsByEC: { 'Tabiiy fanlar': 1 } },
  { id: 6, name: 'Nigora Ismoilova', initials: 'NI', grade: '11-sinf', gpa: 3.95, clubs: 4, region: 'Toshkent', major: 'Law', achievementsByEC: { 'Tillar / Gumanitar': 3, 'Loyiha': 1, 'Sport': 1 } },
  { id: 7, name: 'Jahongir Aliyev', initials: 'JA', grade: '9-sinf', gpa: 2.74, clubs: 0, region: 'Namangan', major: 'Computer Science', achievementsByEC: {} },
  { id: 8, name: 'Ziyoda Rasulova', initials: 'ZR', grade: '10-sinf', gpa: 3.51, clubs: 2, region: 'Buxoro', major: 'Mathematics', achievementsByEC: { 'Aniq fanlar': 2, 'Sport': 1 } },
  { id: 9, name: 'Aziza Kamolova', initials: 'AKa', grade: '11-sinf', gpa: 3.33, clubs: 1, region: 'Samarqand', major: 'Business Administration', achievementsByEC: { 'Loyiha': 1 } },
  { id: 10, name: 'Rustam Bekmurodov', initials: 'RB', grade: '9-sinf', gpa: 3.08, clubs: 0, region: 'Toshkent', major: 'Mechanical Engineering', achievementsByEC: {} },
]

export interface MockSchool {
  name: string
  district: string
  totalStudents: number
  avgGpa: number
  avgSat: number
  avgIelts: number
  vulnerabilityRate: number
  ecHoursRatio: number // hours per student average
  rankingByEC: Record<string, number> // Points/Hours in this EC area for ranking
}

export const mockSchools: MockSchool[] = [
  {
    name: 'Prezident Maktabi',
    district: 'Jizzax shahri',
    totalStudents: 124,
    avgGpa: 3.82,
    avgSat: 1450,
    avgIelts: 7.2,
    vulnerabilityRate: 12,
    ecHoursRatio: 65,
    rankingByEC: { 'IT va Robototexnika': 20, 'Aniq fanlar': 14, 'Tillar': 15, 'Sport': 10, 'San\'at va Ijod': 6 }
  },
  {
    name: '1-sonli ixtisoslashtirilgan maktab',
    district: 'Sharof Rashidov tumani',
    totalStudents: 310,
    avgGpa: 3.51,
    avgSat: 1320,
    avgIelts: 6.5,
    vulnerabilityRate: 24,
    ecHoursRatio: 63,
    rankingByEC: { 'IT va Robototexnika': 19, 'Aniq fanlar': 13, 'Tillar': 16, 'Sport': 9, 'San\'at va Ijod': 6 }
  },
  {
    name: '9-sonli maktab',
    district: 'Sharof Rashidov tumani',
    totalStudents: 480,
    avgGpa: 3.25,
    avgSat: 1200,
    avgIelts: 5.8,
    vulnerabilityRate: 42,
    ecHoursRatio: 60,
    rankingByEC: { 'IT va Robototexnika': 18, 'Aniq fanlar': 12, 'Tillar': 14, 'Sport': 10, 'San\'at va Ijod': 6 }
  },
  {
    name: 'Zomin IT maktabi',
    district: 'Zomin tumani',
    totalStudents: 180,
    avgGpa: 3.46,
    avgSat: 1350,
    avgIelts: 6.6,
    vulnerabilityRate: 18,
    ecHoursRatio: 64,
    rankingByEC: { 'IT va Robototexnika': 22, 'Aniq fanlar': 15, 'Tillar': 14, 'Sport': 8, 'San\'at va Ijod': 5 }
  },
  {
    name: '4-sonli maktab',
    district: 'Zomin tumani',
    totalStudents: 520,
    avgGpa: 3.12,
    avgSat: 1150,
    avgIelts: 5.5,
    vulnerabilityRate: 35,
    ecHoursRatio: 61,
    rankingByEC: { 'IT va Robototexnika': 18, 'Aniq fanlar': 12, 'Tillar': 15, 'Sport': 11, 'San\'at va Ijod': 5 }
  },
  {
    name: '12-sonli maktab',
    district: 'Zomin tumani',
    totalStudents: 390,
    avgGpa: 3.18,
    avgSat: 1180,
    avgIelts: 5.6,
    vulnerabilityRate: 29,
    ecHoursRatio: 62,
    rankingByEC: { 'IT va Robototexnika': 19, 'Aniq fanlar': 13, 'Tillar': 14, 'Sport': 9, 'San\'at va Ijod': 7 }
  },
  {
    name: 'Do\'stlik kolleji',
    district: 'Do\'stlik tumani',
    totalStudents: 240,
    avgGpa: 3.05,
    avgSat: 1100,
    avgIelts: 5.4,
    vulnerabilityRate: 55,
    ecHoursRatio: 65,
    rankingByEC: { 'IT va Robototexnika': 21, 'Aniq fanlar': 14, 'Tillar': 16, 'Sport': 8, 'San\'at va Ijod': 6 }
  },
  {
    name: '2-sonli maktab',
    district: 'Do\'stlik tumani',
    totalStudents: 410,
    avgGpa: 3.15,
    avgSat: 1160,
    avgIelts: 5.6,
    vulnerabilityRate: 32,
    ecHoursRatio: 63,
    rankingByEC: { 'IT va Robototexnika': 20, 'Aniq fanlar': 13, 'Tillar': 14, 'Sport': 9, 'San\'at va Ijod': 7 }
  }
]

export const counselorStats = {
  totalStudents: 248,
  atRisk: monitoredStudents.filter((s) => s.clubs === 0).length,
  mentorshipMatches: 36,
}

export const counselorLibrary = [
  { id: 1, title: '9-sinf o\'quvchilari uchun psixologik testlar', type: 'Baholash to\'plami' },
  { id: 2, title: 'STEM to\'garaklari metodikasi', type: 'Qo\'llanma' },
  { id: 3, title: 'Kasbga yo\'naltirish to\'plami', type: 'Trening to\'plami' },
  { id: 4, title: 'Xavf ostidagi o\'quvchilar bilan ishlash rejasi', type: 'Metodika' },
  { id: 5, title: 'Ota-onalar bilan ishlash qo\'llanmasi', type: 'Qo\'llanma' },
  { id: 6, title: 'Universitet arizalari kuzatuvchisi', type: 'Jadval' },
]
