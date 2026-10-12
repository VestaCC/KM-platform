'use client'

import { useState, useEffect } from 'react'
import { Bell, Shuffle, Globe } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sidebar, MobileNav } from '@/components/dashboard/sidebar'
import { cn } from '@/lib/utils'
import { LanguageProvider, useLanguage } from '@/lib/language-context'
import { getHighestIelts, getHighestSat } from '@/lib/simulator'

// Views
import { LoginView, type UserRole } from '@/components/dashboard/views/login'
import { StudentHubView } from '@/components/dashboard/views/student-hub'
import { FutureMapView } from '@/components/dashboard/views/future-map'
import { ConsultingView } from '@/components/dashboard/views/consulting'
import { LaborMarketView } from '@/components/dashboard/views/labor-market'
import { AlumniView } from '@/components/dashboard/views/alumni'
import { CounselorView } from '@/components/dashboard/views/counselor'
import { CertificateRankingView } from '@/components/dashboard/views/certificate-ranking'
import { RegionalDirectorView } from '@/components/dashboard/views/regional-director'
import { BasicOverviewView } from '@/components/dashboard/views/basic-overview'
import { StatisticsDashboardView } from '@/components/dashboard/views/statistics-dashboard'
import { SettingsView } from '@/components/dashboard/views/settings'
import { Preloader } from '@/components/dashboard/preloader'
import { DashboardSkeleton } from '@/components/dashboard/skeleton'
import { CoursesSection } from '@/components/dashboard/courses-section'

// Initial Hardcoded Mock Data
import { currentStudent as defaultStudent, achievements as defaultAchievements } from '@/lib/mock-data'

export function Dashboard() {
  const { lang, t } = useLanguage()
  const [role, setRole] = useState<UserRole>('login')
  const [activeTab, setActiveTab] = useState<string>('student_hub')
  const [loading, setLoading] = useState(true)
  const [showSkeletons, setShowSkeletons] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Mounting sequence
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)

    const skeletonTimer = setTimeout(() => {
      setShowSkeletons(false)
    }, 1800)

    return () => {
      clearTimeout(timer)
      clearTimeout(skeletonTimer)
    }
  }, [])

  const [studentProfile, setStudentProfile] = useState<any>({
    name: defaultStudent.name,
    handle: '@azizbek_karimov_05',
    major: 'Matematika + Fizika',
    major1: 'Matematika',
    major2: 'Fizika',
    grade: defaultStudent.grade || '11-sinf',
    verifiedCerts: [],
    verifiedCertsDetails: [],
    gpa: (defaultStudent as any).gpa || 3.86,
    ielts: 6.5,
    sat: 1380,
    region: defaultStudent.region || 'Jizzax',
    district: 'Jizzax shahri',
    school: defaultStudent.school || 'Jizzax Prezident maktabi',
    familyStatus: 'Standard',
    healthStatus: 'None',
    financialStanding: 'Stable',
    initials: defaultStudent.initials || 'AK',
  })

  const [counselorStudents, setCounselorStudents] = useState<any[]>([
    {
      id: 1,
      name: 'Azizbek Karimov',
      handle: '@azizbek_karimov_05',
      grade: '11-sinf',
      gpa: 3.86,
      ielts: 6.5,
      sat: 1380,
      major: 'Matematika + Fizika',
      major1: 'Matematika',
      major2: 'Fizika',
      verifiedCerts: [],
      verifiedCertsDetails: [],
      initials: 'AK',
      region: 'Jizzax',
      district: 'Sharof Rashidov tumani',
      school: 'Jizzax Prezident maktabi',
      familyStatus: 'Standard',
      healthStatus: 'None',
      financialStanding: 'Stable',
    },
    {
      id: 2,
      name: 'Dildora Sobirova',
      handle: '@dildora_sobirova_01',
      grade: '10-sinf',
      gpa: 3.82,
      ielts: 7.5,
      sat: 1350,
      major: 'Matematika + Chet tili',
      major1: 'Matematika',
      major2: 'Chet tili',
      verifiedCerts: ['IELTS 7.5'],
      verifiedCertsDetails: [
        { subject: 'Ingliz tili', provider: 'IELTS Academic', level: 'C1', score: '7.5 pts', percentage: 0.85, code: 'DI Kod: TS837492A', date: '2026-01-15' }
      ],
      initials: 'DS',
      region: 'Toshkent',
      district: 'Yunusobod tumani',
      school: '12-maktab',
      familyStatus: 'Standard',
      healthStatus: 'None',
      financialStanding: 'Stable',
    },
    {
      id: 3,
      name: 'Otabek Yusupov',
      handle: '@otabek_yusupov_01',
      grade: '11-sinf',
      gpa: 2.91,
      ielts: 5.5,
      sat: 1200,
      major: 'Matematika + Fizika',
      major1: 'Matematika',
      major2: 'Fizika',
      verifiedCerts: ['SAT 1200', 'Milliy Sertifikat (Ona tili va adabiyot)', 'Milliy Sertifikat (O\'zbekiston tarixi)'],
      verifiedCertsDetails: [
        { subject: 'Matematika', provider: 'SAT', level: 'B2', score: '1200', percentage: 0.75, code: 'DI Kod: SAT2026A', date: '2026-02-10' },
        { subject: 'Ona tili va adabiyot', provider: 'Milliy Sertifikat', level: 'A+', score: '75%', percentage: 0.75, code: 'DI Kod: UZ2026B', date: '2026-03-05' },
        { subject: "O'zbekiston tarixi", provider: 'Milliy Sertifikat', level: 'A', score: '68%', percentage: 0.68, code: 'DI Kod: UZ2026C', date: '2026-03-12' }
      ],
      initials: 'OY',
      region: 'Samarqand',
      district: 'Urgut tumani',
      school: '4-maktab',
      familyStatus: 'Standard',
      healthStatus: 'None',
      financialStanding: 'Stable',
    },
    {
      id: 4,
      name: 'Malika Tojiboyeva',
      handle: '@malika_tojiboyeva_01',
      grade: '9-sinf',
      gpa: 3.65,
      ielts: 6.5,
      sat: 1350,
      major: 'Chet tili + Tarix',
      major1: 'Chet tili',
      major2: 'Tarix',
      verifiedCerts: ['IELTS 6.5'],
      verifiedCertsDetails: [
        { subject: 'Ingliz tili', provider: 'IELTS Academic', level: 'B2', score: '6.5 pts', percentage: 0.75, code: 'DI Kod: IELTS65B', date: '2026-04-01' }
      ],
      initials: 'MT',
      region: 'Farg\'ona',
      district: 'Qo\'qon shahri',
      school: 'Prezident maktabi',
      familyStatus: 'Orphaned',
      healthStatus: 'None',
      financialStanding: 'Stable',
    },
    {
      id: 5,
      name: 'Sherzod Qodirov',
      handle: '@sherzod_qodirov_01',
      grade: '10-sinf',
      gpa: 3.18,
      ielts: 5.5,
      sat: 1200,
      major: 'Biologiya + Kimyo',
      major1: 'Biologiya',
      major2: 'Kimyo',
      verifiedCerts: [],
      verifiedCertsDetails: [],
      initials: 'SQ',
      region: 'Jizzax',
      district: 'Sharof Rashidov tumani',
      school: '22-maktab',
      familyStatus: 'Standard',
      healthStatus: 'None',
      financialStanding: 'Vulnerable',
    },
    {
      id: 6,
      name: 'Nigora Ismoilova',
      handle: '@nigora_ismoilova_01',
      grade: '11-sinf',
      gpa: 3.95,
      ielts: 7.5,
      sat: 1510,
      major: 'Tarix + Chet tili',
      major1: 'Tarix',
      major2: 'Chet tili',
      verifiedCerts: ['Milliy Sertifikat (O\'zbekiston tarixi)', 'IELTS 7.5', 'SAT 1510', 'Milliy Sertifikat (Ona tili va adabiyot)'],
      verifiedCertsDetails: [
        { subject: "O'zbekiston tarixi", provider: 'Milliy Sertifikat', level: 'A', score: '68%', percentage: 0.68, code: 'DI Kod: HIST2026A', date: '2026-01-20' },
        { subject: 'Ingliz tili', provider: 'IELTS Academic', level: 'C1', score: '7.5 pts', percentage: 0.85, code: 'DI Kod: TS837492A', date: '2026-01-15' },
        { subject: 'Matematika', provider: 'SAT', level: 'C1', score: '1510', percentage: 0.925, code: 'DI Kod: SAT2026B', date: '2026-02-18' },
        { subject: 'Ona tili va adabiyot', provider: 'Milliy Sertifikat', level: 'A+', score: '85%', percentage: 0.85, code: 'DI Kod: UZ2026D', date: '2026-03-22' }
      ],
      initials: 'NI',
      region: 'Toshkent',
      district: 'Mirzo Ulug\'bek tumani',
      school: 'Prezident maktabi',
      familyStatus: 'Standard',
      healthStatus: 'None',
      financialStanding: 'Stable',
    },
    {
      id: 7,
      name: 'Jahongir Aliyev',
      handle: '@jahongir_aliyev_01',
      grade: '9-sinf',
      gpa: 2.74,
      ielts: 5.5,
      sat: 1200,
      major: 'Matematika + Fizika',
      major1: 'Matematika',
      major2: 'Fizika',
      verifiedCerts: [],
      verifiedCertsDetails: [],
      initials: 'JA',
      region: 'Namangan',
      district: 'Chust tumani',
      school: '9-maktab',
      familyStatus: 'Standard',
      healthStatus: 'Physical Disability',
      financialStanding: 'Stable',
    },
    {
      id: 8,
      name: 'Ziyoda Rasulova',
      handle: '@ziyoda_rasulova_01',
      grade: '10-sinf',
      gpa: 3.51,
      ielts: 6.5,
      sat: 1350,
      major: 'Matematika + Fizika',
      major1: 'Matematika',
      major2: 'Fizika',
      verifiedCerts: ['Milliy Sertifikat (Matematika)'],
      verifiedCertsDetails: [
        { subject: 'Matematika', provider: 'Milliy Sertifikat', level: 'A', score: '68%', percentage: 0.68, code: 'DI Kod: UZ2026F', date: '2026-04-10' }
      ],
      initials: 'ZR',
      region: 'Buxoro',
      district: 'G\'ijduvon tumani',
      school: '2-maktab',
      familyStatus: 'Standard',
      healthStatus: 'None',
      financialStanding: 'Stable',
    },
    {
      id: 9,
      name: 'Aziza Kamolova',
      handle: '@aziza_kamolova_01',
      grade: '11-sinf',
      gpa: 3.33,
      ielts: 6.5,
      sat: 1350,
      major: 'Matematika + Chet tili',
      major1: 'Matematika',
      major2: 'Chet tili',
      verifiedCerts: ['Milliy Sertifikat (Matematika)'],
      verifiedCertsDetails: [
        { subject: 'Matematika', provider: 'Milliy Sertifikat', level: 'A', score: '65%', percentage: 0.65, code: 'DI Kod: UZ2026G', date: '2026-04-11' }
      ],
      initials: 'AKa',
      region: 'Samarqand',
      district: 'Samarqand shahri',
      school: '1-maktab',
      familyStatus: 'Standard',
      healthStatus: 'None',
      financialStanding: 'Vulnerable',
    },
    {
      id: 10,
      name: 'Rustam Bekmurodov',
      handle: '@rustam_bekmurodov_01',
      grade: '9-sinf',
      gpa: 3.08,
      ielts: 5.5,
      sat: 1200,
      major: 'Matematika + Fizika',
      major1: 'Matematika',
      major2: 'Fizika',
      verifiedCerts: [],
      verifiedCertsDetails: [],
      initials: 'RB',
      region: 'Toshkent',
      district: 'Chilonzor tumani',
      school: '5-maktab',
      familyStatus: 'Standard',
      healthStatus: 'None',
      financialStanding: 'Stable',
    }
  ])

  useEffect(() => {
    setCounselorStudents((prev) =>
      prev.map((s) => {
        if (s.id === 1) {
          return {
            ...s,
            name: studentProfile.name,
            gpa: studentProfile.gpa,
            sat: studentProfile.sat,
            ielts: studentProfile.ielts,
            major1: studentProfile.major1 || 'Mathematics',
            major2: studentProfile.major2 || 'Physics',
            grade: studentProfile.grade || '11-sinf',
            verifiedCerts: studentProfile.verifiedCerts || [],
            verifiedCertsDetails: studentProfile.verifiedCertsDetails || [],
          }
        }
        return s
      })
    )
  }, [studentProfile])

  const handleVerifyLeaderboardCertificate = (studentId: number, certDetail: any) => {
    setCounselorStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const updatedCerts = [...s.verifiedCerts]
          if (!updatedCerts.includes(certDetail.subjectKey)) {
            updatedCerts.push(certDetail.subjectKey)
          }
          if (certDetail.provider === 'IELTS Academic' || certDetail.provider === 'IELTS') {
            if (!updatedCerts.includes('IELTS')) updatedCerts.push('IELTS')
          }
          if (certDetail.provider === 'SAT' && !updatedCerts.includes('SAT')) {
            updatedCerts.push('SAT')
          }

          const currentDetails = s.verifiedCertsDetails || []
          const updatedDetails = [...currentDetails, certDetail]

          const updatedFields: any = {
            verifiedCerts: updatedCerts,
            verifiedCertsDetails: updatedDetails,
          }

          if (certDetail.provider === 'IELTS Academic' || certDetail.provider === 'IELTS') {
            updatedFields.ielts = getHighestIelts(s.ielts || 5.5, updatedDetails)
          } else if (certDetail.provider === 'SAT') {
            updatedFields.sat = getHighestSat(s.sat || 1200, updatedDetails)
          }

          if (studentId === 1) {
            setStudentProfile((prevProfile: any) => ({
              ...prevProfile,
              ...updatedFields,
            }))
          }

          return {
            ...s,
            ...updatedFields,
          }
        }
        return s
      })
    )
  }

  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, text: "Maslahatchi Nodira Yusupova sizning portfelingizni tekshirdi va 'Respublika Informatika Olimpiadasi' yutug'ini tasdiqladi.", read: false, time: "5 daqiqa oldin" },
    { id: 2, text: "Viloyat Boshqarmasi yangi grant dasturini e'lon qildi: El-yurt Umidi 2026.", read: false, time: "2 soat oldin" },
    { id: 3, text: "Sizning 'New Uzbekistan University' uchun kirish ehtimolingiz 'Yuqori' darajaga ko'tarildi.", read: true, time: "1 kun oldin" },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const [achievements, setAchievements] = useState<any[]>(
    defaultAchievements.map((a) => ({
      id: a.id,
      name: a.name,
      category: a.tone === 'success' ? 'Ko\'ngillilik' : a.tone === 'accent' ? 'Loyiha' : 'Sport',
      weeklyHours: 10,
      duration: a.desc,
    }))
  )

  const [counselorRating, setCounselorRating] = useState<number>(4.5)
  const [counselorFeed, setCounselorFeed] = useState<string[]>([
    'Viloyat rahbari maktabingiz faoliyati reytingini 4.5/5 ballgacha yangiladi.',
    '2026-yilning birinchi choragi uchun maslahatchi hisoboti topshirildi.',
  ])

  // Handle Login / Registration Action
  const handleLogin = (selectedRole: UserRole, customStudentData?: any) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setRole(selectedRole)
      if (customStudentData) {
        setStudentProfile(customStudentData)
      }

      // Set default navigation tab depending on the role
      if (selectedRole === 'student') {
        setActiveTab('student_hub')
      } else if (selectedRole === 'counselor') {
        setActiveTab('counselor_roster')
      } else if (selectedRole === 'regional_director') {
        setActiveTab('regional_dashboard')
      } else if (selectedRole === 'school_director') {
        setActiveTab('school_director')
      } else if (selectedRole === 'republican_admin') {
        setActiveTab('republican_admin')
      }
      
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 350)
  }

  // Header Details based on selected role
  const getHeaderDetails = () => {
    switch (role) {
      case 'student':
        return {
          title: t('header.student'),
          module: t('module.student'),
          name: studentProfile.name,
          initials: studentProfile.initials,
        }
      case 'counselor':
        return {
          title: t('header.counselor'),
          module: t('module.counselor'),
          name: 'Nodira Yusupova',
          initials: 'NY',
        }
      case 'regional_director':
        return {
          title: t('header.regional_director'),
          module: t('module.regional_director'),
          name: lang === 'uz' ? 'Jizzax Filiali Rahbari' : 'Jizzakh Branch Director',
          initials: 'FR',
        }
      case 'school_director':
        return {
          title: t('header.school_director'),
          module: t('module.school_director'),
          name: lang === 'uz' ? 'Prezident Maktabi Direktori' : 'Presidential School Principal',
          initials: 'MD',
        }
      case 'republican_admin':
        return {
          title: t('header.republican_admin'),
          module: t('module.republican_admin'),
          name: lang === 'uz' ? 'Respublika Administratori' : 'Republican Administrator',
          initials: 'RA',
        }
      default:
        return {
          title: 'Kelajak Centers',
          module: lang === 'uz' ? 'Ekotizim' : 'Ecosystem',
          name: lang === 'uz' ? 'Mehmon' : 'Guest',
          initials: 'M',
        }
    }
  }

  const header = getHeaderDetails()

  // Renders the views matching the active role and sub-tab
  const renderActiveView = () => {
    switch (role) {
      case 'student':
        if (activeTab === 'student_hub') {
          return (
            <StudentHubView
              student={studentProfile}
              achievements={achievements}
              onAddAchievement={(newAch) => {
                setAchievements([...achievements, newAch])
                setNotifications([
                  {
                    id: Date.now(),
                    text: `Yangi portfolio yutug'i (${newAch.name}) yuklandi va tekshirish uchun yuborildi.`,
                    read: false,
                    time: "Hozirgincha"
                  },
                  ...notifications
                ])
              }}
              onUpdateProfile={(updated) => setStudentProfile({ ...studentProfile, ...updated })}
            />
          )
        }
        if (activeTab === 'future_map') {
          return <FutureMapView student={studentProfile} />
        }
        if (activeTab === 'courses') {
          return (
            <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto py-8 px-6 overflow-y-auto">
              <CoursesSection />
            </div>
          )
        }
        if (activeTab === 'consulting') {
          return <ConsultingView student={studentProfile} />
        }
        if (activeTab === 'market') {
          return <LaborMarketView />
        }
        if (activeTab === 'alumni') {
          return <AlumniView />
        }
        if (activeTab === 'settings') return <SettingsView />
        return (
          <StudentHubView
            student={studentProfile}
            achievements={achievements}
            onAddAchievement={(newAch) => setAchievements([...achievements, newAch])}
            onUpdateProfile={(updated) => setStudentProfile({ ...studentProfile, ...updated })}
          />
        )

      case 'counselor':
        if (activeTab === 'settings') return <SettingsView />
        if (activeTab === 'certificate_ranking') {
          return (
            <CertificateRankingView
              students={counselorStudents}
              onVerifyCertificate={handleVerifyLeaderboardCertificate}
            />
          )
        }
        return (
          <CounselorView
            rating={counselorRating}
            feed={counselorFeed}
            studentAchievements={achievements}
            studentProfile={studentProfile}
          />
        )

      case 'regional_director':
        if (activeTab === 'settings') return <SettingsView />
        if (activeTab === 'statistics_dashboard') return <StatisticsDashboardView />
        return (
          <RegionalDirectorView
            counselorRating={counselorRating}
            onUpdateCounselorRating={(stars, feedback) => {
              setCounselorRating(stars)
              setCounselorFeed([
                `Viloyat rahbari maktabingiz faoliyati reytingini ${stars}.0/5 ballgacha yangiladi: "${feedback}"`,
                ...counselorFeed,
              ])
            }}
          />
        )

      case 'school_director':
        if (activeTab === 'settings') return <SettingsView />
        return <BasicOverviewView role="school_director" />

      case 'republican_admin':
        if (activeTab === 'settings') return <SettingsView />
        if (activeTab === 'statistics_dashboard') return <StatisticsDashboardView />
        return <BasicOverviewView role="republican_admin" />

      default:
        return <LoginView onLogin={handleLogin} />
    }
  }

  // If role is login/guest, just render login screen
  if (showSkeletons && role !== 'login') {
    return (
      <>
        <DashboardSkeleton />
        <Preloader loading={loading} />
      </>
    )
  }

  if (role === 'login') {
    return (
      <>
        <div className={cn("transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full", isTransitioning ? "opacity-0 translate-y-4 scale-[0.98]" : "opacity-100")}>
          <LoginView onLogin={handleLogin} />
        </div>
        <Preloader loading={loading} />
      </>
    )
  }

  return (
    <div className={cn("w-full h-screen overflow-hidden flex bg-background transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", isTransitioning ? "opacity-0 translate-y-4 scale-[0.98]" : "opacity-100")}>
      <Preloader loading={loading} />
      {/* Dynamic Sidebar tailored for the active role */}
      <Sidebar
        activeRole={role}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onLogout={() => setRole('login')}
      />

      <div className="flex-1 h-screen overflow-y-auto custom-scrollbar scroll-smooth flex flex-col">
        {/* Glassmorphism Top Bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold text-muted-foreground">{header.module}</p>
            <h2 className="truncate font-heading text-lg font-bold text-foreground">{header.title}</h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick presentation role switcher dropdown in header for judges */}
            <div className="relative flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-foreground font-semibold hover:border-primary transition-all">
              <Shuffle className="size-3.5 text-blue-600" />
              <select
                value={role}
                onChange={(e) => handleLogin(e.target.value as UserRole)}
                className="bg-transparent border-0 outline-none pr-1 py-0.5 cursor-pointer font-bold text-xs"
              >
                <option value="student">{t('role.student')}</option>
                <option value="counselor">{t('role.counselor')}</option>
                <option value="regional_director">{t('role.regional_director')}</option>
                <option value="school_director">{t('role.school_director')}</option>
                <option value="republican_admin">{t('role.republican_admin')}</option>
              </select>
            </div>

            {/* Language shortcut button */}
            <LangToggle />

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                aria-label={lang === 'uz' ? 'Bildirishnomalar' : 'Notifications'}
              >
                <Bell className="size-4.5" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-blue-600 ring-2 ring-card" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card shadow-xl p-3 z-50 text-xs text-foreground">
                  <div className="flex justify-between items-center pb-2 border-b border-border mb-2">
                    <span className="font-bold">{lang === 'uz' ? 'Bildirishnomalar' : 'Notifications'} ({notifications.filter(n => !n.read).length})</span>
                    <button
                      type="button"
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-[10px] text-blue-600 hover:underline font-semibold"
                    >
                      {lang === 'uz' ? 'Barchasini o\'qilgan deb belgilash' : 'Mark all as read'}
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">{lang === 'uz' ? 'Bildirishnomalar yo\'q' : 'No notifications'}</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setNotifications(notifications.map(item => item.id === n.id ? { ...item, read: true } : item))
                          }}
                          className={cn(
                            "p-2 rounded-lg cursor-pointer transition-colors text-left",
                            n.read ? "bg-card hover:bg-muted/30 text-slate-400" : "bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100/30 font-medium text-foreground"
                          )}
                        >
                          <p className="leading-snug">{n.text}</p>
                          <span className="text-[9px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <Avatar className="size-10 border border-border">
              <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
                {header.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Mobile Navigation bar */}
        <MobileNav activeTab={activeTab} onChangeTab={setActiveTab} activeRole={role} onLogout={() => setRole('login')} />

        {/* Dynamic Inner Layout Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">{renderActiveView()}</main>
      </div>
    </div>
  )
}
// Compact language toggle pill for the header bar
function LangToggle() {
  const { lang, setLang } = useLanguage()
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
      className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-bold text-foreground hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-all"
      title="Toggle language / Tilni almashtirish"
    >
      <Globe className="size-3.5 text-blue-600" />
      <span>{lang === 'en' ? 'EN' : 'UZ'}</span>
    </button>
  )
}
