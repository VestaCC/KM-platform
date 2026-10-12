'use client'

import { useState, useEffect } from 'react'
import {
  Award,
  Trophy,
  GraduationCap,
  Quote,
  TrendingUp,
  HeartHandshake,
  Cpu,
  Medal,
  Mic,
  Plus,
  FileSpreadsheet,
  CheckCircle,
  FileText,
  Edit2,
  X,
  BookOpen,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  FileDown,
  Loader2
} from 'lucide-react'
import { generatePortfolioPDF, type PortfolioData } from '@/lib/portfolio-generator'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ProgressRing } from '@/components/dashboard/progress-ring'
import { Sparkline } from '@/components/dashboard/sparkline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { calculate189Score, getHighestIelts, getHighestSat, evaluateCertificate } from '@/lib/simulator'
import { UniversityMatchingSuite } from '@/components/dashboard/views/university-matching'
import { useLanguage } from '@/lib/language-context'
import {
  clubs,
  attendanceTrend,
  teacherFeedback,
  academics,
} from '@/lib/mock-data'

interface StudentHubViewProps {
  student: {
    name: string
    handle: string
    major: string
    major1?: string
    major2?: string
    verifiedCerts?: string[]
    verifiedCertsDetails?: any[]
    gpa: number
    ielts: number
    sat: number
    region: string
    district: string
    school: string
    familyStatus: string
    healthStatus: string
    financialStanding: string
    initials: string
    grade?: string
  }
  achievements: any[]
  onAddAchievement: (newAch: any) => void
  onUpdateProfile?: (updated: any) => void
}

const categoryIcons: Record<string, any> = {
  'Aniq fanlar': Trophy,
  'Tabiiy fanlar': BookOpen,
  'Tillar / Gumanitar': Mic,
  'Ijodiy / San\'at': HeartHandshake,
  'Loyiha': Cpu,
  'Sport': Medal,
}

const categoryColors: Record<string, string> = {
  'Aniq fanlar': 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950/20 dark:text-yellow-400',
  'Tabiiy fanlar': 'bg-orange-100 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400',
  'Tillar / Gumanitar': 'bg-purple-100 text-purple-600 dark:bg-purple-950/20 dark:text-purple-400',
  'Ijodiy / San\'at': 'bg-pink-100 text-pink-600 dark:bg-pink-950/20 dark:text-pink-400',
  'Loyiha': 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400',
  'Sport': 'bg-blue-100 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400',
}

export function StudentHubView({ student, achievements, onAddAchievement, onUpdateProfile }: StudentHubViewProps) {
  const { lang, t } = useLanguage()

  const displayIelts = getHighestIelts(student.ielts, student.verifiedCertsDetails || [])
  const displaySat = getHighestSat(student.sat, student.verifiedCertsDetails || [])

  const simulatorResult = calculate189Score({
    gpa: student.gpa,
    ielts: displayIelts,
    sat: displaySat,
    major1: student.major1 || 'Mathematics',
    major2: student.major2 || 'Physics',
    verifiedCerts: student.verifiedCerts || [],
    verifiedCertsDetails: student.verifiedCertsDetails || []
  })
  const jamiBall = simulatorResult.totalScore
  const majburiyBall = simulatorResult.commonScore
  const major1Ball = simulatorResult.major1Score
  const major2Ball = simulatorResult.major2Score

  const getLocalizedSubjectName = (subj: string) => {
    if (lang === 'uz') {
      switch (subj) {
        case 'Mathematics': return 'Matematika'
        case 'Physics': return 'Fizika'
        case 'Chemistry': return 'Kimyo'
        case 'Biology': return 'Biologiya'
        case 'History': return 'Tarix'
        case 'Mother Tongue': return 'Ona tili'
        case 'Foreign Language': return 'Chet tili'
        default: return subj
      }
    }
    return subj
  }

  const getPillLabel = (major: string, points: number) => {
    if (lang === 'uz') {
      let name = major.toUpperCase()
      if (name === 'MATHEMATICS') name = 'MATEMATIKA'
      else if (name === 'PHYSICS') name = 'FIZIKA'
      else if (name === 'CHEMISTRY') name = 'KIMYO'
      else if (name === 'BIOLOGY') name = 'BIOLOGIYA'
      else if (name === 'HISTORY') name = 'TARIX'
      else if (name === 'MOTHER TONGUE') name = 'ONA TILI'
      else if (name === 'FOREIGN LANGUAGE') name = 'CHET TILI'
      return `${name} (${points})`
    } else {
      return `${major.toUpperCase()} (${points})`
    }
  }
  // Portfolio Generator States
  const [portfolioLoading, setPortfolioLoading] = useState(false)
  const [portfolioSuccess, setPortfolioSuccess] = useState(false)

  const handleGeneratePortfolio = async () => {
    setPortfolioLoading(true)
    setPortfolioSuccess(false)
    try {
      const portfolioData: PortfolioData = {
        name: student.name,
        grade: student.grade || '11-sinf',
        school: student.school,
        region: student.region,
        initials: student.initials,
        bio: (student as any).bio || '',
        gpa: student.gpa,
        gpaMax: 4.0,
        ielts: { current: displayIelts, target: 7.0 },
        sat: { current: displaySat, target: 1500 },
        olympiads: (academics?.olympiads || []).map((o: any) => ({ title: o.title, place: o.place, year: o.year })),
        clubs: clubs.map((c: any) => ({ name: c.name, role: c.role, sessions: c.sessions })),
        achievements: achievements.map((a: any) => ({ name: a.name, desc: a.desc || a.duration || '' })),
        teacherFeedback: teacherFeedback,
        major1: student.major1 || 'Mathematics',
        major2: student.major2 || 'Physics',
      }
      await generatePortfolioPDF(portfolioData)
      setPortfolioSuccess(true)
      setTimeout(() => setPortfolioSuccess(false), 4000)
    } catch (err) {
      console.error('Portfolio generation failed:', err)
    } finally {
      setPortfolioLoading(false)
    }
  }

  // Add Achievement Form States
  const [category, setCategory] = useState('Aniq fanlar')
  const [name, setName] = useState('')
  const [weeklyHours, setWeeklyHours] = useState('6')
  const [duration, setDuration] = useState("O'tgan oyda")
  const [mockFileName, setMockFileName] = useState('')
  const [successMsg, setSuccessMsg] = useState(false)

  // Edit Profile Modal States
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [tempProfile, setTempProfile] = useState({ gpa: '3.86', sat: '1380', ielts: '6.5' })

  // Lock body scroll when modal is open
  useEffect(() => {
    if (editProfileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [editProfileOpen])

  const [tempName, setTempName] = useState(student.name)
  const [tempGpa, setTempGpa] = useState(student.gpa.toString())
  const [tempSat, setTempSat] = useState(student.sat.toString())
  const [tempIelts, setTempIelts] = useState(student.ielts.toString())
  const [tempMajor1, setTempMajor1] = useState(student.major1 || 'Mathematics')
  const [tempMajor2, setTempMajor2] = useState(student.major2 || 'Physics')
  const [tempGrade, setTempGrade] = useState(student.grade || '11-sinf')

  // Verification Desk States
  const [verifyProvider, setVerifyProvider] = useState('Milliy Sertifikat')
  const [verifySubject, setVerifySubject] = useState('Matematika')
  const [verifyScore, setVerifyScore] = useState('')
  const [certCode, setCertCode] = useState('')
  const [issuedDate, setIssuedDate] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [verifySuccess, setVerifySuccess] = useState(false)
  const [verifyError, setVerifyError] = useState('')

  const handleProviderChange = (provider: string) => {
    setVerifyProvider(provider)
    if (provider === 'IELTS') {
      setVerifySubject('Ingliz tili')
    } else if (provider === 'SAT') {
      setVerifySubject('Matematika')
    }
  }

  const getScorePlaceholder = () => {
    if (verifyProvider === 'IELTS') {
      return lang === 'uz' ? "Masalan: 6.5" : "e.g., 6.5"
    }
    if (verifyProvider === 'SAT') {
      return lang === 'uz' ? "Masalan: 1380" : "e.g., 1380"
    }
    return lang === 'uz' ? "Masalan: 72.5" : "e.g., 72.5"
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMockFileName(e.target.files[0].name)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const newAch = {
      id: Date.now(),
      name,
      category,
      weeklyHours: parseInt(weeklyHours) || 4,
      duration,
    }

    onAddAchievement(newAch)
    setName('')
    setSuccessMsg(true)
    setTimeout(() => setSuccessMsg(false), 4000)
  }

  // Helper to map Uzbek subjects to English majors/subjects
  const mapSubjectToEnglish = (subj: string): string[] => {
    switch (subj) {
      case 'Matematika': return ['Mathematics']
      case 'Fizika': return ['Physics']
      case 'Kimyo': return ['Chemistry']
      case 'Biologiya': return ['Biology']
      case 'O\'zbekiston tarixi': return ['History']
      case 'Ona tili va adabiyot': return ['Mother Tongue']
      case 'Ingliz tili': return ['Foreign Language', 'IELTS']
      case 'Rus tili': return ['Foreign Language']
      default: return []
    }
  }

  // Zero-Trust Credentials Verification Desk action
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!certCode.trim() || !issuedDate || !verifyScore) {
      setVerifyError(
        lang === 'uz' 
          ? "Iltimos, barcha majburiy maydonlarni to'ldiring: kod, berilgan sana va ball." 
          : "Please fill in all required fields: code, issued date, and score."
      )
      return
    }

    const scoreNum = parseFloat(verifyScore)
    if (isNaN(scoreNum)) {
      setVerifyError(
        lang === 'uz' 
          ? "Iltimos, to'g'ri ball kiriting." 
          : "Please enter a valid score."
      )
      return
    }

    const isLanguage = verifySubject === 'Ingliz tili' || verifySubject === 'Rus tili'
    let parsedPercentage = 0.0
    let gradeLevel = 'Fails'
    let enginePercentage = 0.0

    // Validation & Grading logic based on selected provider
    if (verifyProvider === 'Milliy Sertifikat') {
      if (scoreNum < 0 || scoreNum > 75) {
        setVerifyError(
          lang === 'uz' 
            ? "Milliy sertifikat bali 0 va 75 oralig'ida bo'lishi kerak." 
            : "National certificate score must be between 0 and 75."
        )
        return
      }
    } else if (verifyProvider === 'IELTS') {
      if (scoreNum < 1.0 || scoreNum > 9.0) {
        setVerifyError(
          lang === 'uz' 
            ? "IELTS bali 1.0 va 9.0 oralig'ida bo'lishi kerak." 
            : "IELTS score must be between 1.0 and 9.0."
        )
        return
      }
      if (scoreNum % 0.5 !== 0) {
        setVerifyError(
          lang === 'uz' 
            ? "IELTS bali yarim band qadamlarida kiritilishi kerak (masalan: 6.5, 7.0)." 
            : "IELTS score must be in half-band steps (e.g., 6.5, 7.0)."
        )
        return
      }
    } else if (verifyProvider === 'SAT') {
      if (scoreNum < 400 || scoreNum > 1600) {
        setVerifyError(
          lang === 'uz' 
            ? "SAT bali 400 va 1600 oralig'ida bo'lishi kerak." 
            : "SAT score must be between 400 and 1600."
        )
        return
      }
    }

    const evalRes = evaluateCertificate(verifyProvider, verifySubject, scoreNum)
    parsedPercentage = evalRes.engine_percentage / 100.0
    gradeLevel = evalRes.gradeBadge
    enginePercentage = evalRes.engine_percentage

    setVerifyError("")
    setVerifying(true)
    setVerifySuccess(false)

    setTimeout(() => {
      setVerifying(false)
      setVerifySuccess(true)
      
      const currentCerts = student.verifiedCerts || []
      const currentCertsDetails = student.verifiedCertsDetails || []

      // Map subject and build new lists
      const englishSubjects = mapSubjectToEnglish(verifySubject)
      const newCerts = [...currentCerts]
      englishSubjects.forEach(eng => {
        if (!newCerts.includes(eng)) {
          newCerts.push(eng)
        }
      })
      if (verifyProvider === 'IELTS' && !newCerts.includes('IELTS')) {
        newCerts.push('IELTS')
      }
      if (verifyProvider === 'SAT' && !newCerts.includes('SAT')) {
        newCerts.push('SAT')
      }

      // Construct detail item with raw percentage float
      const detail = {
        subject: verifySubject,
        provider: verifyProvider === 'IELTS' ? 'IELTS Academic' : verifyProvider,
        level: gradeLevel,
        score: verifyProvider === 'Milliy Sertifikat' 
          ? `${scoreNum} Ball` 
          : (verifyProvider === 'IELTS' 
              ? (lang === 'uz' ? `${scoreNum} ball` : `${scoreNum} pts`)
              : `${scoreNum}`),
        percentage: parsedPercentage,
        code: `DI Kod: ${certCode.toUpperCase()}`,
        date: issuedDate,
        scoreValue: scoreNum,
        points_ball: scoreNum,
        engine_percentage: enginePercentage,
        gradeBadge: gradeLevel
      }
      const newCertsDetails = [...currentCertsDetails, detail]

      let updatedFields: any = {
        verifiedCerts: newCerts,
        verifiedCertsDetails: newCertsDetails
      }

      // Sync top-level student profile scores dynamically with the highest score
      if (verifyProvider === 'IELTS') {
        updatedFields.ielts = Math.max(student.ielts, scoreNum)
      } else if (verifyProvider === 'SAT') {
        updatedFields.sat = Math.max(student.sat, scoreNum)
      }

      if (onUpdateProfile) {
        onUpdateProfile(updatedFields)
      }

      setCertCode('')
      setIssuedDate('')
      setVerifyScore('')
      
      setTimeout(() => setVerifySuccess(false), 4000)
    }, 1500)
  }

  // Vulnerability Badges Generation
  const renderVulnerabilityBadges = () => {
    const badges = []
    
    // Family
    if (student.familyStatus === 'Orphaned') {
      badges.push(
        <Badge key="family" className="border-red-200 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400">
          {lang === 'en' ? 'Orphaned' : 'Chin Yetim'}
        </Badge>
      )
    } else if (student.familyStatus === 'Single Parent') {
      badges.push(
        <Badge key="family" className="border-yellow-200 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400">
          {lang === 'en' ? 'Single Parent' : "Boquvchisini yo'qotgan"}
        </Badge>
      )
    } else {
      badges.push(
        <Badge key="family" variant="outline" className="border-slate-200 bg-slate-50 text-slate-600 dark:bg-slate-900/50 dark:text-slate-400">
          {lang === 'en' ? 'Family Status: Standard' : 'Oilaviy holat: Standart'}
        </Badge>
      )
    }

    // Health
    if (student.healthStatus === 'Physical Disability') {
      badges.push(
        <Badge key="health" className="border-red-200 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400">
          {lang === 'en' ? 'Physical Disability' : 'Nogironligi bor'}
        </Badge>
      )
    }

    // Financial
    if (student.financialStanding === 'Vulnerable') {
      badges.push(
        <Badge key="financial" className="border-red-200 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400">
          {lang === 'en' ? 'Vulnerable' : 'Ehtiyojmand'}
        </Badge>
      )
    } else if (student.financialStanding === 'Highly Vulnerable') {
      badges.push(
        <Badge key="financial" className="border-red-300 bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400">
          {lang === 'en' ? 'Social Register (Highly Vulnerable)' : 'Ijtimoiy daftarda'}
        </Badge>
      )
    } else {
      badges.push(
        <Badge key="financial" variant="outline" className="border-slate-200 bg-slate-50 text-slate-600 dark:bg-slate-900/50 dark:text-slate-400">
          {lang === 'en' ? 'Financial: Stable' : 'Moliyaviy: Barqaror'}
        </Badge>
      )
    }

    return badges
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Portfolio Success Toast */}
      {portfolioSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 shadow-2xl dark:border-emerald-800 dark:bg-emerald-950/90 animate-fade-in">
          <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Portfolio muvaffaqiyatli yaratildi!</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">PDF hujjat yuklab olindi.</p>
          </div>
        </div>
      )}
      {/* Profile Header Card */}
      <Card className="overflow-hidden border-0 bg-slate-900 text-white shadow-xl relative">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />
          <CardContent className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="size-16 ring-4 ring-blue-500/30">
                <AvatarFallback className="bg-blue-600 text-lg font-bold text-white">
                  {student.initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-heading text-2xl font-bold">{student.name}</h1>
                  <span className="text-xs text-blue-400 font-mono font-semibold">{student.handle}</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  {student.school} · {student.district}, {student.region}
                </p>
                
                {/* Vulnerability badges row */}
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  {renderVulnerabilityBadges()}
                </div>
              </div>
            </div>
            
            {/* Major & Stats Details */}
            <div className="flex flex-col items-end gap-3 shrink-0">
              <div className="min-w-56 bg-slate-950/40 rounded-xl p-3 border border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{"Mutaxassislik yo'nalishi"}</span>
                <p className="text-xs font-bold text-blue-400 mt-0.5">{(student.major1 || 'Mathematics')} + {(student.major2 || 'Physics')}</p>
                <div className="mt-2.5 flex items-center justify-between text-xs border-t border-slate-800/80 pt-2 text-slate-300">
                  <span>Joriy GPA: <strong>{student.gpa.toFixed(2)}</strong></span>
                  <span>Progress: <strong>72%</strong></span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-600/20 hover:bg-blue-600/40 hover:text-white border-blue-500/40 text-blue-300 gap-1.5 text-xs h-8 transition-all"
                  onClick={handleGeneratePortfolio}
                  disabled={portfolioLoading}
                >
                  {portfolioLoading ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <FileDown className="size-3.5" />
                  )}
                  {portfolioLoading ? 'Yaratilmoqda...' : 'Portfolio yaratish'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-950/50 hover:bg-slate-800 hover:text-white border-slate-800 text-slate-300 gap-1.5 text-xs h-8"
                  onClick={() => {
                    setTempName(student.name);
                    setTempGpa(student.gpa.toString());
                    setTempSat(student.sat.toString());
                    setTempIelts(student.ielts.toString());
                    setTempMajor1(student.major1 || 'Mathematics');
                    setTempMajor2(student.major2 || 'Physics');
                    setTempGrade(student.grade || '11-sinf');
                    setEditProfileOpen(true);
                  }}
                >
                  <Edit2 className="size-3.5" />
                  Profilni Tahrirlash
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Academic metrics widgets */}
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-base font-bold text-foreground">Akademik Portfel Ko'rsatkichlari</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          {/* GPA Card: Wide Split Block */}
          <Card className="border border-border/60 bg-neutral-50/90 dark:bg-slate-900/50 p-6 sm:col-span-2 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all hover:translate-y-[-2px] duration-300">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Maktab GPA natijasi</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-2">
              <p className="font-heading text-4xl font-extrabold text-blue-600">
                {student.gpa.toFixed(2)}
                <span className="text-sm text-muted-foreground font-normal"> / 4.0</span>
              </p>
              <Progress value={(student.gpa / 4.0) * 100} className="mt-4 h-1.5 [&>div]:bg-green-500" />
              <p className="mt-2 text-[10px] font-semibold text-green-600 flex items-center gap-1">
                <CheckCircle2 className="size-3" /> {"GPA ko'rsatkichidan o'tdingiz"}
              </p>
            </CardContent>
          </Card>

          {/* IELTS Card: High Contrast Floating Square */}
          <Card className="flex flex-col items-center justify-center p-6 border border-border/60 bg-neutral-50/90 dark:bg-slate-900/50 shadow-lg relative overflow-hidden transition-all hover:translate-y-[-2px] duration-300">
            {student.verifiedCerts?.includes('IELTS') && (
              <Badge className="absolute top-2 right-2 bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-[8px] py-0.5 px-1.5 flex items-center gap-0.5 shrink-0 rounded-full font-bold">
                TASDIQ
              </Badge>
            )}
            <ProgressRing
              value={(displayIelts / 9) * 100}
              label={displayIelts.toFixed(1)}
              sublabel="IELTS"
              colorClass="text-blue-600"
              size={90}
            />
            <p className="mt-2.5 text-xs font-bold text-foreground">IELTS Ingliz tili</p>
          </Card>

          {/* SAT Card: High Contrast Floating Square */}
          <Card className="flex flex-col items-center justify-center p-6 border border-border/60 bg-neutral-50/90 dark:bg-slate-900/50 shadow-lg relative overflow-hidden transition-all hover:translate-y-[-2px] duration-300">
            {student.verifiedCerts?.includes('SAT') && (
              <Badge className="absolute top-2 right-2 bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-[8px] py-0.5 px-1.5 flex items-center gap-0.5 shrink-0 rounded-full font-bold">
                TASDIQ
              </Badge>
            )}
            <ProgressRing
              value={(displaySat / 1600) * 100}
              label={String(displaySat)}
              sublabel="SAT"
              colorClass="text-indigo-600"
              size={90}
            />
            <p className="mt-2.5 text-xs font-bold text-foreground">SAT Imtihoni</p>
          </Card>

          {/* Roadmap Monitoring Card */}
          <Card className="border border-border/60 bg-neutral-50/90 dark:bg-slate-900/50 p-6 sm:col-span-2 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all hover:translate-y-[-2px] duration-300">
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{"Yo'l xaritasi monitoringi"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-1 p-0 mt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Universitet maqsadi:</span>
                <span className="font-bold text-foreground">Active</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Kamchiliklar deficit:</span>
                <span className="font-bold text-yellow-600 dark:text-yellow-400">Kuzatilmoqda</span>
              </div>
              <div className="text-[11px] font-medium text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                Maslahatchi tomonidan tasdiqlangan
              </div>
            </CardContent>
          </Card>

          {/* 189-Point Admission Simulator Bento Card */}
          <Card className="border border-border/60 bg-neutral-50/90 dark:bg-slate-900/50 p-6 sm:col-span-2 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all hover:translate-y-[-2px] duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.05),transparent_50%)] pointer-events-none" />
            <CardHeader className="pb-2 p-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Award className="size-4 text-indigo-500 animate-pulse" />
                {lang === 'uz' ? 'TAXMINIY DTM BALLARI' : 'ESTIMATED DTM POINTS'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-1 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-heading text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 leading-none">
                    {jamiBall.toFixed(1)}
                    <span className="text-xs font-normal text-muted-foreground"> / 189.0</span>
                  </p>
                  <p className="text-[9px] font-semibold text-indigo-500 dark:text-indigo-400 mt-1">
                    {lang === 'uz' ? "Davlat oliygohlariga kirish ko'rsatkichi" : "State university admission index"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-bold text-slate-500 block">
                    {lang === 'uz' ? "TANLANGAN FANLAR:" : "SELECTED SUBJECTS:"}
                  </span>
                  <span className="text-[10px] font-extrabold text-foreground bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                    {getLocalizedSubjectName(student.major1 || 'Mathematics')} + {getLocalizedSubjectName(student.major2 || 'Physics')}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(jamiBall / 189.0) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid gap-2 grid-cols-3 text-[9px] font-semibold">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-lg border border-slate-200/20 text-center">
                  <p className="text-slate-500 font-bold uppercase truncate">
                    {lang === 'uz' ? 'MAJBURIY (33)' : 'COMPULSORY (33)'}
                  </p>
                  <p className="text-xs font-bold text-foreground mt-0.5">{majburiyBall.toFixed(1)}</p>
                </div>
                <div className={cn(
                  "p-1.5 rounded-lg border text-center relative",
                  simulatorResult.isMajor1Locked 
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                    : "bg-slate-100 dark:bg-slate-900/60 border-slate-200/20 text-foreground"
                )}>
                  <p className="text-slate-500 font-bold uppercase truncate">
                    {getPillLabel(student.major1 || 'Mathematics', 93)}
                  </p>
                  <p className="text-xs font-bold mt-0.5">{major1Ball.toFixed(1)}</p>
                </div>
                <div className={cn(
                  "p-1.5 rounded-lg border text-center relative",
                  simulatorResult.isMajor2Locked 
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
                    : "bg-slate-100 dark:bg-slate-900/60 border-slate-200/20 text-foreground"
                )}>
                  <p className="text-slate-500 font-bold uppercase truncate">
                    {getPillLabel(student.major2 || 'Physics', 63)}
                  </p>
                  <p className="text-xs font-bold mt-0.5">{major2Ball.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categorized University Matching Suite */}
      <UniversityMatchingSuite student={student as any} />

      {/* Extracurricular achievements list & submission form */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left 7 Columns: Achievements Listing */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <h2 className="font-heading text-base font-bold text-foreground">{"O'quvchi To'garak va Loyihalari"}</h2>
          <Card className="border border-border/60 shadow-sm bg-card">
            <CardContent className="p-5 flex flex-col">
              {achievements.length === 0 ? (
                <p className="text-center py-6 text-xs text-muted-foreground">{"To'garaklar va loyihalar mavjud emas. Form orqali yangi mashg'ulot kiriting."}</p>
              ) : (
                <div className="flex flex-col">
                  {achievements.map((ach, idx) => {
                    const Icon = categoryIcons[ach.category] || Award
                    const colorStyle = categoryColors[ach.category] || 'bg-slate-100 text-slate-600'
                    const isVerified = student.verifiedCerts?.includes(ach.category) || student.verifiedCerts?.includes(ach.name)
                    return (
                      <div
                        key={ach.id}
                        className={cn(
                          "flex items-start justify-between gap-3 bg-transparent p-0 py-3.5 transition-all",
                          idx < achievements.length - 1 && "border-b border-neutral-100 dark:border-slate-800"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className={cn('flex size-10 items-center justify-center rounded-xl shrink-0', colorStyle)}>
                            <Icon className="size-5" />
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <p className="text-sm font-bold text-foreground leading-tight">{ach.name}</p>
                              {isVerified && (
                                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-[8px] py-0.5 px-1.5 flex items-center gap-0.5 shrink-0 rounded-full font-bold">
                                  <CheckCircle2 className="size-2.5" /> TASDIQLANGAN
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground mt-1">
                              <span className="font-semibold text-slate-500 uppercase">{ach.category}</span>
                              <span>•</span>
                              <span>Haftasiga {ach.weeklyHours} soat</span>
                              <span>•</span>
                              <span>{ach.duration}</span>
                            </div>
                          </div>
                        </div>

                        {ach.fileName && !isVerified && (
                          <Badge variant="secondary" className="gap-1 text-[10px] font-semibold">
                            <FileText className="size-3 text-slate-500" />
                            Sertifikat yuklangan
                          </Badge>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right 5 Columns: Submit Form */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <h2 className="font-heading text-base font-bold text-foreground">{"To'garak yuklash"}</h2>
          <Card className="border border-border/60 shadow-sm bg-card">
            <CardContent className="p-4 pt-5">
              
              {/* Success validation feedback */}
              {successMsg && (
                <div className="mb-4 flex gap-2 rounded-xl bg-green-50 border border-green-200 p-3 text-green-700 text-xs font-semibold animate-pulse">
                  <CheckCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{"Muvaffaqiyatli qo'shildi. Reytingingiz va yo'nalishlar yangilandi."}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">Kategoriya</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-9 rounded-md border border-border bg-card px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground bg-card"
                  >
                    <option value="Aniq fanlar">{t('aniq_fanlar')}</option>
                    <option value="Tabiiy fanlar">{t('tabiiy_fanlar')}</option>
                    <option value="Tillar / Gumanitar">{t('tillar')}</option>
                    <option value="Ijodiy / San'at">{t('ijodiy')}</option>
                    <option value="Loyiha">{t('loyiha')}</option>
                    <option value="Sport">{t('sport')}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">{"To'garak / Loyiha nomi"}</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Robototexnika to'garagi yoki ingliz tili klubi"
                    className="h-9 text-xs"
                    required
                  />
                </div>

                <div className="grid gap-3 grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Haftalik bandlik (soat)</label>
                    <Input
                      type="number"
                      value={weeklyHours}
                      onChange={(e) => setWeeklyHours(e.target.value)}
                      placeholder="6"
                      className="h-9 text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">Davomiyligi</label>
                    <Input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Masalan: 3 oy davomida"
                      className="h-9 text-xs"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-500 text-xs h-9 justify-center gap-1.5">
                  <Plus className="size-4" />
                  {"To'garaklar ro'yxatiga yuklash"}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Certificates Portfolio Section: Side-by-Side layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left 7 Columns: Sertifikatlar Ombori */}
        <div className="lg:col-span-7 flex flex-col gap-3 text-left">
          <h2 className="font-heading text-base font-bold text-foreground">
            {lang === 'uz' ? 'Sertifikatlar ombori' : 'Verified Certificates Inventory'}
          </h2>
          <Card className="border border-border/60 shadow-sm bg-card h-full flex flex-col">
            <CardContent className="p-5 flex-1">
              {!student.verifiedCertsDetails || student.verifiedCertsDetails.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center text-muted-foreground">
                  <Award className="size-10 text-muted-foreground/45 mb-2.5 stroke-[1.5]" />
                  <p className="text-xs max-w-sm">
                    {lang === 'uz' 
                      ? 'Tasdiqlangan sertifikatlar mavjud emas. O\'ng tomondagi panel orqali yangi sertifikatni rasman tekshiring.' 
                      : 'No verified certificates found. Officially verify a new certificate using the panel on the right.'}
                  </p>
                </div>
              ) : (
                <div className="max-h-[480px] overflow-y-auto pr-2">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {student.verifiedCertsDetails.map((cert: any, idx: number) => {
                      const subjectKey = cert.subject === 'Matematika' ? 'subj.math' :
                                         cert.subject === 'Fizika' ? 'subj.physics' :
                                         cert.subject === 'Kimyo' ? 'subj.chemistry' :
                                         cert.subject === 'Biologiya' ? 'subj.biology' :
                                         cert.subject === 'Ona tili va adabiyot' ? 'subj.mother_tongue' :
                                         cert.subject === "O'zbekiston tarixi" ? 'subj.history' :
                                         cert.subject === 'Ingliz tili' ? 'subj.english' :
                                         cert.subject === 'Rus tili' ? 'subj.russian' : cert.subject
                      const calculatedPercentageStr = typeof cert.percentage === 'number'
                        ? `${(cert.percentage * 100).toFixed(1)}%`
                        : ''
                      const isActive = simulatorResult.activeCertCodes?.includes(cert.code)
                      return (
                        <div
                          key={idx}
                          className={cn(
                            "border rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-start gap-2",
                            isActive 
                              ? "border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/10" 
                              : "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/40"
                          )}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 font-bold border-0 text-[9px] py-0.5 px-2 rounded-full">
                                {t(subjectKey)}
                              </Badge>
                              {isActive ? (
                                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-0.5">
                                  ✓ {lang === 'uz' ? 'Faol hisobda' : 'Active in Calculation'}
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                                  {lang === 'uz' ? 'Zaxirada' : 'Archived'}
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-xs text-foreground mt-1">
                              {cert.provider === 'Milliy Sertifikat' ? t('prov.uzbmb') : cert.provider}
                            </h3>
                            <p className="text-[9px] font-mono text-slate-500 font-semibold">{cert.code}</p>
                            <p className="text-[9px] text-muted-foreground">
                              {lang === 'uz' ? 'Sana' : 'Date'}: {cert.date}
                            </p>
                          </div>
                          <div className="text-right flex flex-col items-end shrink-0">
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold border-0 text-[10px] py-0.5 px-1.5 rounded-full flex items-center gap-0.5 shadow-sm mb-1.5">
                              {cert.gradeBadge || cert.level}
                            </Badge>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{cert.score}</span>
                            {calculatedPercentageStr && (
                              <span className="text-[10px] text-muted-foreground mt-0.5 font-semibold">{calculatedPercentageStr}</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right 5 Columns: Sertifikatlarni Tasdiqlash */}
        <div className="lg:col-span-5 flex flex-col gap-3 text-left">
          <h2 className="font-heading text-base font-bold text-foreground">
            {lang === 'uz' ? 'Sertifikatlarni tasdiqlash' : 'Official Verification Desk'}
          </h2>
          <Card className="border border-border/60 shadow-sm bg-card">
            <CardHeader className="pb-2">
              <CardDescription className="text-[11px] text-muted-foreground">
                {lang === 'uz'
                  ? 'Uchinchi tomon ulanishi yordamida akademik va imtihon ko\'rsatkichlaringizni rasman tekshiring.'
                  : 'Officially verify your academic and examination metrics using our third-party connection.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-1">
              {verifySuccess && (
                <div className="mb-4 flex gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-emerald-700 text-xs font-semibold animate-pulse">
                  <CheckCircle2 className="size-4 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'uz'
                      ? "Sertifikat muvaffaqiyatli tasdiqlandi! Ballar va yo'l xaritasi yangilandi."
                      : "Certificate successfully verified! Scores and roadmap updated."}
                  </span>
                </div>
              )}
              {verifyError && (
                <div className="mb-4 flex gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-red-700 text-xs font-semibold animate-fade-in">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{verifyError}</span>
                </div>
              )}

              <form onSubmit={handleVerifySubmit} className="space-y-3">
                <div className={cn("grid gap-3", verifyProvider === 'Milliy Sertifikat' ? "grid-cols-2" : "grid-cols-1")}>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">
                      {t('sertifikat_turi')}
                    </label>
                    <select
                      value={verifyProvider}
                      onChange={(e) => handleProviderChange(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-card px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    >
                      <option value="Milliy Sertifikat">{t('prov.uzbmb')}</option>
                      <option value="IELTS">IELTS</option>
                      <option value="SAT">SAT</option>
                    </select>
                  </div>

                  {verifyProvider === 'Milliy Sertifikat' && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">
                        {t('imtihon_fani')}
                      </label>
                      <select
                        value={verifySubject}
                        onChange={(e) => setVerifySubject(e.target.value)}
                        className="w-full h-9 rounded-md border border-border bg-card px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                        required
                      >
                        <option value="Matematika">{t('subj.math')}</option>
                        <option value="Fizika">{t('subj.physics')}</option>
                        <option value="Kimyo">{t('subj.chemistry')}</option>
                        <option value="Biologiya">{t('subj.biology')}</option>
                        <option value="Ona tili va adabiyot">{t('subj.mother_tongue')}</option>
                        <option value="O'zbekiston tarixi">{t('subj.history')}</option>
                        <option value="Ingliz tili">{t('subj.english')}</option>
                        <option value="Rus tili">{t('subj.russian')}</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">
                    {t('kod_maydoni')}
                  </label>
                  <Input
                    type="text"
                    value={certCode}
                    onChange={(e) => setCertCode(e.target.value)}
                    placeholder={lang === 'uz' ? "Masalan: TS837492A yoki 25UZ0023456" : "E.g., TS837492A or 25UZ0023456"}
                    className="h-9 text-xs"
                    required
                  />
                </div>

                <div className="grid gap-3 grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">
                      {lang === 'uz' ? "To'plangan Ball" : "Score Points"}
                    </label>
                    <Input
                      type="number"
                      step={verifyProvider === 'SAT' ? '1' : verifyProvider === 'IELTS' ? '0.5' : '0.1'}
                      max={verifyProvider === 'Milliy Sertifikat' ? "75" : undefined}
                      value={verifyScore}
                      onChange={(e) => setVerifyScore(e.target.value)}
                      placeholder={getScorePlaceholder()}
                      className="h-9 text-xs"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">
                      {t('berilgan_sana')}
                    </label>
                    <input
                      type="date"
                      value={issuedDate}
                      onChange={(e) => setIssuedDate(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-card px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={verifying}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-9 justify-center gap-1.5 mt-2"
                >
                  {verifying ? (
                    <span className="flex items-center gap-1.5 animate-pulse">
                      <span className="size-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {lang === 'uz' ? 'Tashqi API orqali tekshirilmoqda...' : 'Verifying via external API...'}
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="size-4" />
                      {t('tasdiqlash_tugmasi')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Attandance & Feedback Details */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="sm:col-span-2 border border-border/60">
          <CardContent className="flex gap-4 p-5">
            <Quote className="size-8 shrink-0 text-blue-600/30" />
            <div>
              <p className="text-pretty text-xs font-medium italic text-foreground leading-relaxed">
                &ldquo;{teacherFeedback.quote}&rdquo;
              </p>
              <p className="mt-2 text-xs font-bold text-foreground">{teacherFeedback.teacher}</p>
              <p className="text-[10px] text-muted-foreground">{teacherFeedback.subject}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60">
          <CardHeader className="pb-1.5">
            <CardTitle className="flex items-center gap-2 text-xs font-bold">
              <TrendingUp className="size-4 text-green-600" />
              Davomat Dinamikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-2xl font-extrabold text-foreground">96%</span>
              <span className="text-[10px] font-semibold text-green-600">{"bu chorakda +8% o'sdi"}</span>
            </div>
            <Sparkline data={attendanceTrend} className="mt-2.5" />
          </CardContent>
        </Card>
      </div>

      {/* PROFILE EDIT MODAL */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <Card className="w-full max-w-md bg-slate-900 border border-slate-800 text-white shadow-2xl relative">
            <CardHeader className="pt-8 pb-3 border-b border-slate-800/60 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-white leading-normal">{"Profil ko'rsatkichlarini tahrirlash"}</CardTitle>
                <CardDescription className="text-slate-400 text-xs mt-0.5">{"Tizimdagi akademik baholar va imtihon ko'rsatkichlaringiz"}</CardDescription>
              </div>
              <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => setEditProfileOpen(false)}>
                <X className="size-5" />
              </Button>
            </CardHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (onUpdateProfile) {
                onUpdateProfile({
                  name: tempName,
                  gpa: parseFloat(tempGpa) || 0,
                  major1: tempMajor1,
                  major2: tempMajor2,
                  grade: tempGrade,
                  major: `${tempMajor1} + ${tempMajor2}`
                });
              }
              setEditProfileOpen(false);
            }}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Ism Familiya</label>
                  <Input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white focus-visible:ring-blue-500 h-9 text-xs"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Sinf</label>
                  <select
                    value={tempGrade}
                    onChange={(e) => setTempGrade(e.target.value)}
                    className="w-full h-9 rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground bg-slate-950"
                  >
                    <option value="7-sinf">{lang === 'en' ? '7th Grade' : '7-sinf'}</option>
                    <option value="8-sinf">{lang === 'en' ? '8th Grade' : '8-sinf'}</option>
                    <option value="9-sinf">{lang === 'en' ? '9th Grade' : '9-sinf'}</option>
                    <option value="10-sinf">{lang === 'en' ? '10th Grade' : '10-sinf'}</option>
                    <option value="11-sinf">{lang === 'en' ? '11th Grade' : '11-sinf'}</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Mutaxassislik fanlari (Tanlash majburiy - 2 ta fan)</label>
                  <div className="grid gap-2 grid-cols-2">
                    <select
                      value={tempMajor1}
                      onChange={(e) => setTempMajor1(e.target.value)}
                      className="w-full h-9 rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground bg-slate-950"
                    >
                      <option value="Mathematics">{lang === 'en' ? 'Mathematics' : 'Matematika'}</option>
                      <option value="Physics">{lang === 'en' ? 'Physics' : 'Fizika'}</option>
                      <option value="Chemistry">{lang === 'en' ? 'Chemistry' : 'Kimyo'}</option>
                      <option value="Biology">{lang === 'en' ? 'Biology' : 'Biologiya'}</option>
                      <option value="History">{lang === 'en' ? 'History' : 'Tarix'}</option>
                      <option value="Mother Tongue">{lang === 'en' ? 'Native Language' : 'Ona tili'}</option>
                      <option value="Foreign Language">{lang === 'en' ? 'Foreign Language' : 'Chet tili'}</option>
                    </select>
                    <select
                      value={tempMajor2}
                      onChange={(e) => setTempMajor2(e.target.value)}
                      className="w-full h-9 rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-foreground bg-slate-950"
                    >
                      <option value="Physics">{lang === 'en' ? 'Physics' : 'Fizika'}</option>
                      <option value="Mathematics">{lang === 'en' ? 'Mathematics' : 'Matematika'}</option>
                      <option value="Chemistry">{lang === 'en' ? 'Chemistry' : 'Kimyo'}</option>
                      <option value="Biology">{lang === 'en' ? 'Biology' : 'Biologiya'}</option>
                      <option value="History">{lang === 'en' ? 'History' : 'Tarix'}</option>
                      <option value="Mother Tongue">{lang === 'en' ? 'Native Language' : 'Ona tili'}</option>
                      <option value="Foreign Language">{lang === 'en' ? 'Foreign Language' : 'Chet tili'}</option>
                    </select>
                  </div>
                  {tempMajor1 === tempMajor2 && (
                    <p className="text-[10px] text-red-500 font-semibold mt-1">Siz ikkita bir xil fanni tanlay olmaysiz! Iltimos, boshqa fan tanlang.</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">GPA (max 4.00)</label>
                  <Input
                    type="number"
                    step="0.01"
                    min="1"
                    max="4"
                    value={tempGpa}
                    onChange={(e) => setTempGpa(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white focus-visible:ring-blue-500 h-9 text-xs"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-end gap-2 border-t border-slate-800/60 mt-3.5">
                <Button type="button" variant="ghost" className="text-slate-400 hover:text-white text-xs h-9" onClick={() => setEditProfileOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs h-9">
                  Saqlash
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
