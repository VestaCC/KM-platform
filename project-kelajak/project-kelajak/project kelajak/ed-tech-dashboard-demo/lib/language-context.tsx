'use client'

// lib/language-context.tsx
// Global language state for EN / UZ toggle.
// Wrap the app in <LanguageProvider> and consume with useLanguage().

import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'uz'

interface LanguageCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

// Centralized Language Settings / Localization System dictionary
export const TIZIM_LUGATI = {
  uz: {
    // Navigatsiya va Sarlavhalar
    panel_nomi: "Sertifikatlar Tahlili va Reyting Doskasi",
    ombor_nomi: "Sertifikatlar Ombori",
    yo_l_xaritasi: "Yo'l xaritasi generatori",
    sozlamalar: "Tizim sozlamalari",
    
    // Forma Maydonlari
    sertifikat_turi: "Sertifikat turi",
    kod_maydoni: "Sertifikat kodi / TRF / Reg ID",
    berilgan_sana: "Berilgan sana",
    tasdiqlash_tugmasi: "Sertifikatni tasdiqlash",
    imtihon_fani: "Imtihon fani",
    to_plangan_ball: "To'plangan ball",
    to_garak_yuklash: "To'garak yuklash",
    kategoriya: "Kategoriya",
    nomi: "Nomi",
    haftalik_bandlik: "Haftalik bandlik (soat)",
    davomiyligi: "Davomiyligi",
    yuklash_tugmasi: "To'garaklar ro'yxatiga yuklash",
    
    // Jadval va Hududlar
    reyting: "O'rin / Reyting",
    o_quvchi: "O'quvchi",
    hudud: "Viloyat / Hudud",
    jizzax: "Jizzax viloyati",
    toshkent: "Toshkent viloyati",
    samarqand: "Samarqand viloyati",
    farg_ona: "Farg'ona viloyati",
    buxoro: "Buxoro viloyati",
    namangan: "Namangan viloyati",
    
    // Holat Ko'rsatkichlari
    tasdiqlandi: "Tasdiqlangan",
    muddati_xavf: "Muddati o'tish xavfi",
    profil_tahrirlash: "Profilni Tahrirlash",
    maktab_gpa: "Maktab GPA natijasi",
    davomat_dinamikasi: "Tashrif (Davomat) Dinamikasi",
    mutaxassislik: "Mutaxassislik yo'nalishi",
    
    // Form options
    aniq_fanlar: "Aniq fanlar",
    tabiiy_fanlar: "Tabiiy fanlar",
    tillar: "Tillar / Gumanitar",
    ijodiy: "Ijodiy / San'at",
    loyiha: "Loyiha",
    sport: "Sport",
    maktab: "Ta'lim muassasasi / Maktab",
    tuman: "Tuman / Shahar",
    oilaviy: "Oilaviy holat",
    sog_liq: "Salomatlik holati",
    moliyaviy: "Moliyaviy holati",
    baholar: "Akademik ko'rsatkichlar",
    saqlash: "Saqlash",
    bekor_qilish: "Bekor qilish"
  },
  en: {
    // Navigation & Headers
    panel_nomi: "Certificate Analytics & Ranking Board",
    ombor_nomi: "Certificate Inventory",
    yo_l_xaritasi: "Roadmap Generator",
    sozlamalar: "System Settings",
    
    // Form Fields
    sertifikat_turi: "Certificate Type",
    kod_maydoni: "Certificate Code / TRF / Reg ID",
    berilgan_sana: "Issued Date",
    tasdiqlash_tugmasi: "Verify Certificate",
    imtihon_fani: "Examination Subject",
    to_plangan_ball: "Score / Percentage",
    to_garak_yuklash: "Load Extracurricular (EC)",
    kategoriya: "Category",
    nomi: "Name",
    haftalik_bandlik: "Weekly Hours",
    davomiyligi: "Duration",
    yuklash_tugmasi: "Upload to Activity Portfolio",
    
    // Tables & Regions
    reyting: "Rank / Position",
    o_quvchi: "Student",
    hudud: "Region / Area",
    jizzax: "Jizzakh Region",
    toshkent: "Tashkent Region",
    samarqand: "Samarkand Region",
    farg_ona: "Fergana Region",
    buxoro: "Bukhara Region",
    namangan: "Namangan Region",
    
    // Status Indicators
    tasdiqlandi: "Verified",
    muddati_xavf: "Expiration Risk",
    profil_tahrirlash: "Edit Profile",
    maktab_gpa: "School GPA Result",
    davomat_dinamikasi: "Attendance Dynamics",
    mutaxassislik: "Specialization / Major",
    
    // English Categories without brackets
    aniq_fanlar: "Exact Sciences",
    tabiiy_fanlar: "Natural Sciences",
    tillar: "Languages and Humanities",
    ijodiy: "Creative Arts and Music",
    loyiha: "Projects and Robotics",
    sport: "Sports and Athletics",
    maktab: "Educational Institution / School",
    tuman: "District / City",
    oilaviy: "Family Status",
    sog_liq: "Health Status",
    moliyaviy: "Financial Status",
    baholar: "Academic Metrics",
    saqlash: "Save",
    bekor_qilish: "Cancel"
  }
};

// ─── Translation dictionaries ─────────────────────────────────────────────────

const dict: Record<Lang, Record<string, string>> = {
  en: {
    // Common
    'nav.settings': 'Settings',
    'nav.logout': 'Log out',
    'nav.active_user': 'Active User',

    // Participation
    'metric.participation_rate': 'EC Participation Rate',
    'metric.participation_desc': 'Students with ≥1 out-of-school activity',
    'metric.participation_formula': 'Students with Activity / Total Students × 100',
    'metric.active_students': 'Active Students',
    'metric.total_students': 'Total Students',
    'metric.district_avg': 'District Average',
    'metric.regional_avg': 'Regional Average',
    'metric.national_avg': 'National Average',
    'metric.vs_district': 'vs District',
    'metric.vs_region': 'vs Region',

    // Tiers
    'tier.school': 'School Performance Dashboard',
    'tier.school_desc': 'Institutional KPIs for your assigned school.',
    'tier.district': 'District Analytics Panel',
    'tier.district_desc': 'Schools ranked by EC participation within your district.',
    'tier.regional': 'Regional Director Panel',
    'tier.regional_desc': 'District-level roll-up analytics and counselor audit management.',
    'tier.national': 'Republican Administration Panel',
    'tier.national_desc': 'Nationwide EC participation overview across all regions.',

    // Tables
    'table.rank': 'Rank',
    'table.school': 'School',
    'table.district': 'District',
    'table.region': 'Region',
    'table.students': 'Students',
    'table.active': 'Active',
    'table.participation': 'Participation',
    'table.gpa': 'GPA',
    'table.status': 'Status',

    // Status labels
    'status.high': 'High',
    'status.medium': 'Medium',
    'status.low': 'Low',
    'status.at_risk': 'At Risk',

    // Settings page
    'settings.title': 'Settings',
    'settings.language': 'Interface Language',
    'settings.language_desc': 'Choose between English and Uzbek. All UI labels update immediately.',
    'settings.lang_en': 'English',
    'settings.lang_uz': "O'zbekcha (Uzbek)",

    // School Director
    'school.hero_title': 'EC Participation Rate',
    'school.hero_sub': 'Your school vs benchmarks',
    'school.students_total': 'Total Students',
    'school.students_active': 'Active in EC',
    'school.students_inactive': 'No EC Activity',

    // Regional Director
    'rd.region_participation': 'Regional EC Participation',
    'rd.district_table': 'District Performance Table',
    'rd.district_table_desc': 'All districts sorted by EC participation rate (highest first).',

    // Admin
    'admin.national_title': 'Nationwide EC Participation',
    'admin.national_desc': 'Aggregated participation rate across all 14 regions.',
    'admin.top_regions': 'Top Performing Regions',

    // Roles & Headers
    'role.student': 'Student Profile',
    'role.counselor': 'School Counselor',
    'role.regional_director': 'Regional Branch Director',
    'role.school_director': 'School Director',
    'role.republican_admin': 'Republican Administration',
    'header.student': 'Student Success Ecosystem',
    'header.counselor': 'Counselor Analytics Panel',
    'header.regional_director': 'Regional Director Control Hub',
    'header.school_director': 'School Performance Dashboard',
    'header.republican_admin': 'Republican Strategic Oversight',
    'header.statistics_dashboard': 'Data Statistics Portal',
    
    // Modules
    'module.student': 'Modules A-D',
    'module.counselor': 'Module E',
    'module.regional_director': 'Analytical Hub',
    'module.school_director': 'Macro Control',
    'module.republican_admin': 'Strategic Control',

    // Sidebar
    'sidebar.profile': 'Profile & Achievements',
    'sidebar.future_map': 'Future Map',
    'sidebar.consulting': 'AI Consulting',
    'sidebar.market': 'Vocational & Labor',
    'sidebar.alumni': 'Alumni Network',
    'sidebar.counselor_roster': 'Student Roster',
    'sidebar.certificate_ranking': 'Certificate Analytics',
    'sidebar.school_director': 'School KPIs',
    'sidebar.republican_admin': 'Macro Analytics',
    'sidebar.regional_dashboard': 'Regional Dashboard',
    'sidebar.statistics_dashboard': 'Statistics Portal',
    
    // Social / Vulnerabilities
    'social.standard': 'Standard',
    'social.orphaned': 'Orphaned',
    'social.single_parent': 'Single Parent',
    'social.no_disability': 'No Disability',
    'social.disabled': 'Physical Disability',
    'social.stable': 'Stable',
    'social.vulnerable': 'Vulnerable',
    'social.highly_vulnerable': 'Social Register',

    // Subjects & Providers
    'prov.uzbmb': 'National Certificate',
    'prov.ielts': 'IELTS',
    'prov.sat': 'SAT',
    'subj.math': 'Mathematics',
    'subj.physics': 'Physics',
    'subj.chemistry': 'Chemistry',
    'subj.biology': 'Biology',
    'subj.mother_tongue': 'Mother Tongue & Literature',
    'subj.history': 'History of Uzbekistan',
    'subj.english': 'English Language',
    'subj.russian': 'Russian Language',

    // Counselor view keys
    'counselor.title': 'Counselor Control Center',
    'counselor.desc': 'Monitor student performance, provide recommendations to those in need, and review regional reports.',
    'counselor.total_students': 'Total Students',
    'counselor.coverage_kpi': 'Certificate Coverage',
    'counselor.coverage_note': 'Students with at least 1 verified certificate',
    'counselor.at_risk_students': 'Students Needing Assistance',
    'counselor.at_risk_note': 'No extracurricular activity or vulnerable status',
    'counselor.rating_title': 'Counselor Rating',
    'counselor.rating_note': 'Regional administration rating',
    'counselor.monitoring_title': 'Student Monitoring',
    'counselor.focus': 'Focus:',
    'counselor.filter.all': 'All',
    'counselor.filter.verified': 'With Certificates',
    'counselor.filter.at_risk': 'Without Certificates (At-Risk)',
    'counselor.table.name': 'Student Name',
    'counselor.table.grade': 'Grade',
    'counselor.table.gpa': 'GPA',
    'counselor.table.certs': 'Verified Certificates',
    'counselor.table.clubs': 'Clubs',
    'counselor.table.actions': 'Actions',
    'counselor.table.unverified': 'Unverified',
    'counselor.table.view': 'View',
    'counselor.feed_title': 'Regional Administration Messages',
    'counselor.feed_subtitle': 'Performance Feed',
    'counselor.feed_sender': 'Regional Director',
    'counselor.feed_time': 'Today',
    'counselor.resources': 'Methodological Resources',
    'counselor.leaderboard_title': 'Achievement Leaderboard',
    'counselor.leaderboard_desc': 'Ranking of active students with the highest number of verified certificates:',
    'counselor.leaderboard.rank': 'Rank',
    'counselor.leaderboard.name_school': 'Name and School',
    'counselor.leaderboard.certs_count': 'Verified Certificates',
    'counselor.leaderboard.major': 'Major',
    'counselor.leaderboard.certs_list': 'List of Certificates',
    'counselor.leaderboard.none': 'None',
    'counselor.school_rankings_title': 'Ecosystem Schools and Rankings',
    'counselor.school_rankings_desc_all': 'Schools ranked by overall extracurricular activity hours ratio:',
    'counselor.school_rankings_desc_focus': 'Schools ranked by achievement points in current focus:',
    'counselor.school_rankings.top': 'TOP',
    'counselor.school_rankings.avg_gpa': 'Average GPA:',
    'counselor.school_rankings.ec_score': 'EC Score:',
    'counselor.modal.stats_title': 'Analytical Statistics',
    'counselor.modal.students_count': 'Students',
    'counselor.modal.avg_gpa': 'Avg GPA',
    'counselor.modal.vulnerability': 'Vulnerability',
    'counselor.modal.exam_scores': 'AVERAGE EXAM SCORES',
    'counselor.modal.avg_ielts': 'Average IELTS:',
    'counselor.modal.avg_sat': 'Average SAT:',
    'counselor.modal.ec_scores': 'EXTRACURRICULAR ACTIVITY SCORES BY FOCUS',
    'counselor.modal.close': 'Close',
    'counselor.drawer.title': 'Student Portfolio',
    'counselor.drawer.social_indicators': 'Social Indicators',
    'counselor.drawer.no_social_needs': 'No special social needs observed.',
    'counselor.drawer.target_title': 'Deficits for New Uzbekistan University',
    'counselor.drawer.target_gpa': 'GPA Average',
    'counselor.drawer.target_ielts': 'English Language',
    'counselor.drawer.target_sat': 'SAT Score',
    'counselor.drawer.met': 'Met',
    'counselor.drawer.remaining': 'remaining',
    'counselor.drawer.achievements_title': 'Extracurricular Achievements',
    'counselor.drawer.weekly_hours': 'hours weekly',
    'counselor.drawer.ach.robotics': 'First Place in Robotics Competition',
    'counselor.drawer.ach.robotics_desc': 'Project, 12 hours, 2025',
    'counselor.drawer.ach.futsal': 'Regional Futsal Champion',
    'counselor.drawer.ach.futsal_desc': 'Sports, 8 hours, 2024',

    // Regional Director view keys
    'rd.title': 'Regional Director Control Hub',
    'rd.desc': 'Analytical dashboard for Jizzakh region schools, districts, and school counselor audits.',
    'rd.schools_metric': 'Districts and Schools',
    'rd.schools_value': '15 districts / 150 schools',
    'rd.students_value': '1,240 students',
    'rd.dashboard_title': 'Analytical Dashboard',
    'rd.dashboard_desc': 'Compare district and school indicators by selecting them:',
    'rd.select_district': 'Select District',
    'rd.select_school': 'Select School',
    'rd.counselor_label': 'Counselor:',
    'rd.students_label': 'Students:',
    'rd.students_unit': ' students',
    'rd.indices_title': '5-Tier Ecosystem Performance Indices',
    'rd.index.gpa': 'Average GPA Score',
    'rd.index.vulnerability': 'Vulnerability Support Index',
    'rd.index.enrollment': 'Extracurricular Club Enrollment',
    'rd.index.readiness': 'University Readiness (Deficit Gap-Met %)',
    'rd.audit_title': 'Counselor Audit',
    'rd.audit_desc': 'Rate counselor performance and submit audit feedback:',
    'rd.audit.counselor': 'Counselor to Evaluate',
    'rd.audit.quality': 'Quality Score',
    'rd.audit.report': 'Analytical Report / Recommendation',
    'rd.audit.placeholder': "Your report on the counselor's activity in student engagement, IELTS and SAT preparation...",
    'rd.audit.submit': 'Submit Audit Report',
    'rd.audit.success': 'Success! A new audit report has been submitted for {counselor}. Counselor rating updated to {stars}.0 / 5 stars.',

    // Certificate Ranking view keys
    'cr.title': 'National Certificate Analytics & Ranking Board',
    'cr.desc': 'Monitor official national and international certificates submitted by students and view global DTM rankings.',
    'cr.kpi.certs': 'Total Verified Certificates',
    'cr.kpi.peak': 'Peak DTM Leaderboard Score',
    'cr.kpi.avg': 'Average Leaderboard Score',
    'cr.filter.label': 'Filter Subject:',
    'cr.filter.all': 'All Subjects',
    'cr.filter.primary': 'Primary Major (+93)',
    'cr.filter.secondary': 'Secondary Major (+63)',
    'cr.filter.comp_math': 'Compulsory Math (+11)',
    'cr.filter.comp_lang': 'Compulsory Native Lang (+11)',
    'cr.filter.comp_hist': 'Compulsory History (+11)',
    'cr.table.title': 'Global Student DTM Leaderboard',
    'cr.table.desc': 'Roster sorted in real-time by aggregate validated DTM certificate points weight.',
    'cr.table.rank': 'Rank',
    'cr.table.student': 'Student',
    'cr.table.slots': 'Verified Slots',
    'cr.table.score': 'DTM Score',
    'cr.table.hash': 'DI Hash Status',
    'cr.table.no_match': 'No students matching this certificate criteria found.',
    'cr.table.no_certs': 'No certificates',
    'cr.table.verified_hash': 'Verified:',
    'cr.table.unverified': 'Unverified',
    'cr.desk.title': 'Verification Desk',
    'cr.desk.desc': 'Directly query UzBMB/IELTS database to verify student credential authenticity.',
    'cr.desk.success': 'Certificate verified successfully! Leaderboard ranking and scores recalculated.',
    'cr.desk.student_select': 'Select Student',
    'cr.desk.target_majors': 'Target Majors:',
    'cr.desk.major1': 'Primary Major (Major 1):',
    'cr.desk.major2': 'Secondary Major (Major 2):',
    'cr.desk.provider': 'Certificate Provider',
    'cr.desk.subject': 'Select Subject',
    'cr.desk.code': 'Certificate Code / TRF / Reg ID',
    'cr.desk.code_placeholder': 'e.g. TS837492A or 25UZ0023456',
    'cr.desk.date': 'Issued Date',
    'cr.desk.verifying': 'Verifying authenticity...',
    'cr.desk.verify_btn': 'Verify Certificate',
    'cr.desk.err_fields': 'Please input the certificate code and issued date.',
    'cr.desk.err_format': 'Invalid certificate code format (must be at least 5 characters).',

    // Statistics Dashboard view keys
    'sd.title': 'National Statistics Portal',
    'sd.desc': 'Drill down through demographics, vulnerabilities, and extracurricular enrollment across the entire Republic.',
    'sd.drill.republic': 'Republic',
    'sd.drill.region': 'Region / District',
    'sd.drill.school': 'School',
    'sd.drill.class': 'Class',
    'sd.drill.student': 'Student Profile',
    'sd.kpi.total_students': 'Total Monitored Students',
    'sd.kpi.vulnerable': 'Vulnerable Segment',
    'sd.kpi.disengaged': 'Disengaged Students',
    'sd.kpi.top_course': 'Top Course Category',
    'sd.filter.year': 'Academic Year',
    'sd.filter.region': 'Region / District',
    'sd.filter.gender': 'Gender',
    'sd.filter.gender_all': 'All',
    'sd.filter.gender_m': 'Male',
    'sd.filter.gender_f': 'Female',
    'sd.filter.vulnerability': 'Vulnerability Status',
    'sd.filter.course_cat': 'Course Category',
    'sd.chart.demographics': 'Demographics & Vulnerability Split',
    'sd.chart.institutional_comparison': 'Institutional Course Enrollment Comparison'
  },

  uz: {
    // Common
    'nav.settings': 'Sozlamalar',
    'nav.logout': 'Tizimdan chiqish',
    'nav.active_user': 'Faol Foydalanuvchi',

    // Participation
    'metric.participation_rate': 'Darsdan tashqari faollik darajasi',
    'metric.participation_desc': "Kamida bitta darsdan tashqari faoliyatda ishtirok etgan o'quvchilar",
    'metric.participation_formula': "Faol o'quvchilar / Jami o'quvchilar × 100",
    'metric.active_students': "Faol o'quvchilar",
    'metric.total_students': "Jami o'quvchilar",
    'metric.district_avg': "Tuman o'rtachasi",
    'metric.regional_avg': "Viloyat o'rtachasi",
    'metric.national_avg': "Respublika o'rtachasi",
    'metric.vs_district': 'Tumanga nisbatan',
    'metric.vs_region': 'Viloyatga nisbatan',

    // Tiers
    'tier.school': "Maktab Ko'rsatkichlari Paneli",
    'tier.school_desc': "Sizning maktabingizning asosiy tahliliy ko'rsatkichlari.",
    'tier.district': 'Tuman Analitika Paneli',
    'tier.district_desc': "Tuman ichidagi maktablar darsdan tashqari faollik bo'yicha reytingda.",
    'tier.regional': 'Viloyat Rahbari Paneli',
    'tier.regional_desc': 'Tuman darajasidagi analitika va maslahatchilar auditi.',
    'tier.national': 'Respublika Agentligi Paneli',
    'tier.national_desc': "Barcha viloyatlar bo'yicha respublika miqyosidagi faollik sharhi.",

    // Tables
    'table.rank': 'Reyting',
    'table.school': 'Maktab',
    'table.district': 'Tuman',
    'table.region': 'Viloyat',
    'table.students': "O'quvchilar",
    'table.active': 'Faol',
    'table.participation': 'Faollik darajasi',
    'table.gpa': "O'rtacha baho",
    'table.status': 'Holat',

    // Status labels
    'status.high': 'Yuqori',
    'status.medium': "O'rtacha",
    'status.low': 'Past',
    'status.at_risk': 'Xavf ostida',

    // Settings
    'settings.title': 'Sozlamalar',
    'settings.language': 'Interfeys tili',
    'settings.language_desc': "Ingliz yoki O'zbek tilini tanlang. Barcha yorliqlar darhol yangilanadi.",
    'settings.lang_en': 'Ingliz tili',
    "settings.lang_uz": "O'zbekcha",

    // School Director
    'school.hero_title': 'Darsdan tashqari faollik darajasi',
    'school.hero_sub': "Maktabingiz ko'rsatkichi va taqqoslama",
    'school.students_total': "Jami o'quvchilar",
    'school.students_active': 'Darsdan tashqari faol',
    'school.students_inactive': "Faoliyatsiz o'quvchilar",

    // Regional Director
    'rd.region_participation': "Viloyat darsdan tashqari faollik darajasi",
    'rd.district_table': "Tuman samaradorlik jadvali",
    'rd.district_table_desc': "Barcha tumanlar darsdan tashqari faollik bo'yicha (yuqoridan pastga).",

    // Admin
    'admin.national_title': "Respublika miqyosidagi faollik",
    'admin.national_desc': "Barcha 14 viloyat bo'yicha darsdan tashqari faollik umumiy ko'rinishi.",
    'admin.top_regions': "Eng yaxshi natija ko'rsatgan viloyatlar",

    // Roles & Headers
    'role.student': "O'quvchi Profili",
    'role.counselor': 'Maktab Maslahatchisi',
    'role.regional_director': 'Viloyat Boshqarmasi',
    'role.school_director': 'Maktab Direktori',
    'role.republican_admin': 'Respublika Agentligi',
    'header.student': "O'quvchi Boshqaruv Markazi",
    'header.counselor': 'Maslahatchi Analitik Paneli',
    'header.regional_director': 'Viloyat Filiali Rahbari Paneli',
    'header.school_director': "Maktab Ko'rsatkichlari Analitikasi",
    'header.republican_admin': 'Kelajak Markazi Respublika Agentligi',
    'header.statistics_dashboard': 'Statistika va Analitika Portali',

    // Modules
    'module.student': 'A-D Modullari',
    'module.counselor': 'E Modul',
    'module.regional_director': 'Tahliliy Hub',
    'module.school_director': 'Makro Nazorat',
    'module.republican_admin': 'Strategik Nazorat',

    // Sidebar
    'sidebar.profile': 'Profil va Yutuqlar',
    'sidebar.future_map': 'Kelajak Xaritasi',
    'sidebar.consulting': 'Kelajak Konsalting',
    'sidebar.market': 'Texnikumlar va Mehnat',
    'sidebar.alumni': "Bitiruvchilar tarmog'i",
    'sidebar.counselor_roster': "O'quvchilar ro'yxati",
    'sidebar.certificate_ranking': 'Sertifikat Tahlili va Reyting',
    'sidebar.school_director': "Maktab ko'rsatkichlari",
    'sidebar.republican_admin': 'Respublika tahlili',
    'sidebar.regional_dashboard': 'Viloyat Tahlili',
    'sidebar.statistics_dashboard': 'Statistika Portali',

    // Social / Vulnerabilities
    'social.standard': 'Standart',
    'social.orphaned': 'Chin Yetim',
    'social.single_parent': "Boquvchisini yo'qotgan",
    'social.no_disability': "Sog'lom",
    'social.disabled': 'Jismoniy nogironligi bor',
    'social.stable': 'Barqaror',
    'social.vulnerable': 'Kam ta\'minlangan',
    'social.highly_vulnerable': 'Ijtimoiy daftarda',

    // Subjects & Providers
    'prov.uzbmb': 'Milliy Sertifikat',
    'prov.ielts': 'IELTS',
    'prov.sat': 'SAT',
    'subj.math': 'Matematika',
    'subj.physics': 'Fizika',
    'subj.chemistry': 'Kimyo',
    'subj.biology': 'Biologiya',
    'subj.mother_tongue': 'Ona tili va adabiyot',
    'subj.history': "O'zbekiston tarixi",
    'subj.english': 'Ingliz tili',
    'subj.russian': 'Rus tili',

    // Counselor view keys
    'counselor.title': "Maslahatchi Boshqaruv Markazi",
    'counselor.desc': "O'quvchilar ko'rsatkichlarini nazorat qiling, ehtiyojmandlarga tavsiyalar bering va tuman rahbariyati hisobotlarini o'qing.",
    'counselor.total_students': "Jami o'quvchilar",
    'counselor.coverage_kpi': "Sertifikat Qamrovi",
    'counselor.coverage_note': "Kamida 1 ta tasdiqlangan sertifikatga ega bo'lganlar",
    'counselor.at_risk_students': "Ko'makka muhtoj o'quvchilar",
    'counselor.at_risk_note': "Darsdan tashqari faoliyati yo'q yoki yordamga muhtojlar",
    'counselor.rating_title': "Maslahatchi reytingi",
    'counselor.rating_note': "Viloyat rahbariyati bahosi",
    'counselor.monitoring_title': "Ta'lim oluvchilar monitoringi",
    'counselor.focus': "Yo'nalish (EC):",
    'counselor.filter.all': "Barchasi",
    'counselor.filter.verified': "Sertifikatli",
    'counselor.filter.at_risk': "Sertifikatsiz (Xavf ostida)",
    'counselor.table.name': "O'quvchi ismi",
    'counselor.table.grade': "Sinf",
    'counselor.table.gpa': "GPA",
    'counselor.table.certs': "Tasdiqlangan Sertifikatlar",
    'counselor.table.clubs': "To'garaklar",
    'counselor.table.actions': "Amallar",
    'counselor.table.unverified': "Tasdiqlanmagan (Xavf ostida)",
    'counselor.table.view': "Ko'rish",
    'counselor.feed_title': "Viloyat Boshqarmasi Xabarlari",
    'counselor.feed_subtitle': "Samaradorlik xabarlari",
    'counselor.feed_sender': "Viloyat rahbari",
    'counselor.feed_time': "Bugun",
    'counselor.resources': "Metodik resurslar",
    'counselor.leaderboard_title': "Tasdiqlangan sertifikatlar bo'yicha yetakchilik",
    'counselor.leaderboard_desc': "O'quvchilar orasida eng ko'p tasdiqlangan sertifikatlarga ega bo'lgan faollar reytingi:",
    'counselor.leaderboard.rank': "O'rin",
    'counselor.leaderboard.name_school': "Ism va maktab",
    'counselor.leaderboard.certs_count': "Tasdiqlangan Sertifikatlar",
    'counselor.leaderboard.major': "Yo'nalish",
    'counselor.leaderboard.certs_list': "Sertifikatlar Ro'yxati",
    'counselor.leaderboard.none': "Mavjud emas",
    'counselor.school_rankings_title': "Tuman maktablari reytingi",
    'counselor.school_rankings_desc_all': "Maktablar darsdan tashqari umumiy faollik ko'rsatkichi bo'yicha tartiblangan:",
    'counselor.school_rankings_desc_focus': "Maktablar joriy yo'nalish bo'yicha yutuq ballari asosida tartiblandi:",
    'counselor.school_rankings.top': "TOP",
    'counselor.school_rankings.avg_gpa': "O'rtacha GPA:",
    'counselor.school_rankings.ec_score': "EC reyting balli:",
    'counselor.modal.stats_title': "Tahliliy Statistikasi",
    'counselor.modal.students_count': "O'quvchilar",
    'counselor.modal.avg_gpa': "O'rtacha GPA",
    'counselor.modal.vulnerability': "Ehtiyojmandlik",
    'counselor.modal.exam_scores': "IMTIHON NATIJALARI O'RTACHASI",
    'counselor.modal.avg_ielts': "O'rtacha IELTS:",
    'counselor.modal.avg_sat': "O'rtacha SAT:",
    'counselor.modal.ec_scores': "YO'NALISHLAR BO'YICHA FAOLLIK BALLARI",
    'counselor.modal.close': "Yopish",
    'counselor.drawer.title': "O'quvchi Portfeli",
    'counselor.drawer.social_indicators': "Ijtimoiy Ko'rsatkichlar",
    'counselor.drawer.no_social_needs': "Maxsus ijtimoiy ehtiyojlar aniqlanmadi.",
    'counselor.drawer.target_title': "Yangi O'zbekiston universitetiga kirish uchun kamchiliklar",
    'counselor.drawer.target_gpa': "Baholar o'rtachasi",
    'counselor.drawer.target_ielts': "Ingliz tili",
    'counselor.drawer.target_sat': "SAT Natijasi",
    'counselor.drawer.met': "Bajarildi",
    'counselor.drawer.remaining': "qoldi",
    'counselor.drawer.achievements_title': "Darsdan tashqari yutuqlari",
    'counselor.drawer.weekly_hours': "soat haftalik",
    'counselor.drawer.ach.robotics': "Robototexnika Musobaqasi 1-o'rin",
    'counselor.drawer.ach.robotics_desc': "Loyiha, 12 soat, 2025-yil",
    'counselor.drawer.ach.futsal': "Viloyat futzal musobaqasi g'olibi",
    'counselor.drawer.ach.futsal_desc': "Sport, 8 soat, 2024-yil",

    // Regional Director view keys
    'rd.title': "Viloyat Filiali Rahbari Paneli",
    'rd.desc': "Jizzax viloyati maktablari, tumanlari tahliliy ko'rsatkichlari hamda maslahatchilar auditi boshqaruv markazi.",
    'rd.schools_metric': "Tumanlar va Maktablar",
    'rd.schools_value': "15 ta tuman / 150 ta maktab",
    'rd.students_value': "1,240 nafar o'quvchi",
    'rd.dashboard_title': "Tahliliy Ma'lumotlar Doskasi",
    'rd.dashboard_desc': "Tuman va maktab ko'rsatkichlarini tanlash orqali solishtiring:",
    'rd.select_district': "Tuman tanlash",
    'rd.select_school': "Maktab tanlash",
    'rd.counselor_label': "Maslahatchi:",
    'rd.students_label': "O'quvchilar soni:",
    'rd.students_unit': " nafar",
    'rd.indices_title': "Ekotizimning 5-qatlamli samaradorlik indekslari",
    'rd.index.gpa': "O'rtacha GPA ko'rsatkichi",
    'rd.index.vulnerability': "Kamchilik yordam ko'rsatkichi",
    'rd.index.enrollment': "Darsdan tashqari to'garaklarda qamrov",
    'rd.index.readiness': "Universitet talablariga moslik (kamchiliklar qoplangan %)",
    'rd.audit_title': "Maslahatchilar Auditi",
    'rd.audit_desc': "Maktab maslahatchilarining faoliyatini baholang va fikringizni yozib qoldiring:",
    'rd.audit.counselor': "Baholanuvchi Maslahatchi",
    'rd.audit.quality': "Kadrlar Reytingi",
    'rd.audit.report': "Tahliliy hisobot / Tavsiyanoma",
    'rd.audit.placeholder': "Maslahatchining o'quvchilar bandligi, IELTS va SAT tayyorlashdagi faolligi bo'yicha hisobotingiz...",
    'rd.audit.submit': "Audit hisobotini topshirish",
    'rd.audit.success': "Muvaffaqiyatli! {counselor} uchun audit hisoboti topshirildi. Maslahatchi reytingi: {stars}.0 / 5 yangilandi.",

    // Certificate Ranking view keys
    'cr.title': "Milliy Sertifikatlar Reytingi & Tahlili",
    'cr.desc': "O'quvchilar tomonidan yuklangan va tasdiqlangan milliy hamda xalqaro sertifikatlar monitoringi va DTM ballari reytingi.",
    'cr.kpi.certs': "Tasdiqlangan Sertifikatlar",
    'cr.kpi.peak': "Eng yuqori DTM Balli",
    'cr.kpi.avg': "O'rtacha DTM balli",
    'cr.filter.label': "Filtrlash:",
    'cr.filter.all': "Barcha Fanlar",
    'cr.filter.primary': "Asosiy fan (+93)",
    'cr.filter.secondary': "Ikkinchi fan (+63)",
    'cr.filter.comp_math': "Majburiy Matematika (+11)",
    'cr.filter.comp_lang': "Ona Tili (+11)",
    'cr.filter.comp_hist': "Tarix (+11)",
    'cr.table.title': "O'quvchilar Leaderboard Reytingi",
    'cr.table.desc': "Barcha sertifikatlari tasdiqlangan ballari bo'yicha saralangan reyting jadvali.",
    'cr.table.rank': "Reyting",
    'cr.table.student': "O'quvchi",
    'cr.table.slots': "Tasdiqlangan fanlar (Slotlar)",
    'cr.table.score': "Jami ball",
    'cr.table.hash': "DI Tasdiqlash Hoshi",
    'cr.table.no_match': "Ushbu parametr bo'yicha sertifikatga ega o'quvchilar topilmadi.",
    'cr.table.no_certs': "Sertifikatlarsiz",
    'cr.table.verified_hash': "Tasdiqlangan:",
    'cr.table.unverified': "Tasdiqlanmagan",
    'cr.desk.title': "Sertifikat Tasdiqlash Markazi",
    'cr.desk.desc': "Tashqi UzBMB / IELTS / College Board API orqali sertifikatlarni rasman tekshiring.",
    'cr.desk.success': "Sertifikat muvaffaqiyatli tasdiqlandi! Leaderboard reytingi va ballari yangilandi.",
    'cr.desk.student_select': "O'quvchini tanlang",
    'cr.desk.target_majors': "Tanlangan yo'nalish:",
    'cr.desk.major1': "Asosiy fan (Major 1):",
    'cr.desk.major2': "Qo'shimcha (Major 2):",
    'cr.desk.provider': "Sertifikat turi / Provayder",
    'cr.desk.subject': "Sertifikat fani",
    'cr.desk.code': "Sertifikat kodi / TRF kodi",
    'cr.desk.code_placeholder': "Masalan: TS837492A yoki 25UZ0023456",
    'cr.desk.date': "Berilgan sana",
    'cr.desk.verifying': "Tekshirilmoqda...",
    'cr.desk.verify_btn': "Sertifikatni tasdiqlash",
    'cr.desk.err_fields': "Iltimos, sertifikat kodi va berilgan sanani kiriting.",
    'cr.desk.err_format': "Sertifikat kodi noto'g'ri shaklda (kamida 5 ta belgi bo'lishi kerak).",

    // Statistics Dashboard view keys
    'sd.title': 'Respublika Statistikasi Portali',
    'sd.desc': "Respublika bo'ylab ijtimoiy holat va darsdan tashqari faoliyat bo'yicha tahlillar darajasini pasaytirib ko'rish.",
    'sd.drill.republic': 'Respublika',
    'sd.drill.region': 'Viloyat / Tuman',
    'sd.drill.school': 'Maktab',
    'sd.drill.class': 'Sinf',
    'sd.drill.student': "O'quvchi Profili",
    'sd.kpi.total_students': "Jami Kuzatilayotgan O'quvchilar",
    'sd.kpi.vulnerable': 'Kam ta\'minlangan qatlam',
    'sd.kpi.disengaged': "Faoliyatsiz O'quvchilar",
    'sd.kpi.top_course': 'Yetakchi kurs',
    'sd.filter.year': "O'quv yili",
    'sd.filter.region': 'Viloyat / Tuman',
    'sd.filter.gender': 'Jinsi',
    'sd.filter.gender_all': 'Barchasi',
    'sd.filter.gender_m': "O'g'il",
    'sd.filter.gender_f': 'Qiz',
    'sd.filter.vulnerability': 'Ijtimoiy Holat',
    'sd.filter.course_cat': 'Kurs Kategoriyasi',
    'sd.chart.demographics': 'Demografiya va Ehtiyojmandlik taqsimoti',
    'sd.chart.institutional_comparison': "Muassasalar bo'yicha kurs qamrovi taqqoslamasi"
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageCtx>({
  lang: 'uz',
  setLang: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('preferred_language') as Lang
      if (saved === 'en' || saved === 'uz') return saved
    }
    return 'uz'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('preferred_language', l)
    }
  }

  const t = (key: string): string => {
    // Check TIZIM_LUGATI first
    if (TIZIM_LUGATI[lang] && (TIZIM_LUGATI[lang] as any)[key]) {
      return (TIZIM_LUGATI[lang] as any)[key]
    }
    return dict[lang][key] ?? dict['en'][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageCtx {
  return useContext(LanguageContext)
}
