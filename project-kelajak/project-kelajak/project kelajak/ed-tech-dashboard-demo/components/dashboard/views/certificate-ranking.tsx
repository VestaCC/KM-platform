'use client'

import { useState } from 'react'
import {
  Award,
  CheckCircle2,
  TrendingUp,
  Filter,
  Sparkles,
  Users,
  AlertCircle,
  Trophy,
  Medal,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'
import { calculate189Score, getHighestIelts, getHighestSat, evaluateCertificate } from '@/lib/simulator'

export function getLocalizedSubject(subj: string, lang: 'en' | 'uz'): string {
  if (lang === 'uz') {
    switch (subj) {
      case 'Mathematics': return 'Matematika'
      case 'Physics': return 'Fizika'
      case 'Chemistry': return 'Kimyo'
      case 'Biology': return 'Biologiya'
      case 'History': return 'Tarix'
      case 'Mother Tongue': return 'Ona tili'
      case 'Foreign Language': return 'Chet tili'
      case 'IELTS': return 'IELTS'
      case 'SAT': return 'SAT'
      default: return subj
    }
  } else {
    switch (subj) {
      case 'Matematika': return 'Mathematics'
      case 'Fizika': return 'Physics'
      case 'Kimyo': return 'Chemistry'
      case 'Biologiya': return 'Biology'
      case "O'zbekiston tarixi":
      case 'Tarix': return 'History'
      case 'Ona tili va adabiyot':
      case 'Ona tili': return 'Mother Tongue'
      case 'Ingliz tili': return 'English'
      case 'Rus tili': return 'Russian'
      default: return subj
    }
  }
}

interface Student {
  id: number
  name: string
  handle: string
  grade: string
  gpa: number
  ielts: number
  sat: number
  major: string
  major1: string
  major2: string
  verifiedCerts: string[]
  verifiedCertsDetails?: any[]
  initials: string
  region: string
  district: string
  school: string
  familyStatus: string
  healthStatus: string
  financialStanding: string
}

interface CertificateRankingViewProps {
  students: Student[]
  onVerifyCertificate: (studentId: number, certDetail: any) => void
}

export function CertificateRankingView({ students, onVerifyCertificate }: CertificateRankingViewProps) {
  const { lang, t } = useLanguage()

  // State for Subject Filter (5-Subject Pivot System)
  const [subjectFilter, setSubjectFilter] = useState<string>('all')

  // Verification Desk form states
  const [selectedStudentId, setSelectedStudentId] = useState<number>(students[0]?.id || 1)
  const [certProvider, setCertProvider] = useState<string>('Milliy Sertifikat')
  const [uzbmbSubject, setUzbmbSubject] = useState<string>('Matematika')
  const [certCode, setCertCode] = useState<string>('')
  const [issuedDate, setIssuedDate] = useState<string>('')
  const [certScore, setCertScore] = useState<string>('')

  // Verification process states
  const [verifying, setVerifying] = useState<boolean>(false)
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false)
  const [verifyError, setVerifyError] = useState<string>('')

  // Helper function to calculate DTM points for a single student based on their verified certificates list
  const getStudentDTMScore = (student: Student) => {
    const res = calculate189Score({
      gpa: student.gpa,
      ielts: getHighestIelts(student.ielts, student.verifiedCertsDetails || []),
      sat: getHighestSat(student.sat, student.verifiedCertsDetails || []),
      major1: student.major1,
      major2: student.major2,
      verifiedCerts: student.verifiedCerts || [],
      verifiedCertsDetails: student.verifiedCertsDetails || []
    })
    return res.totalScore
  }

  // Calculate scores and ranks dynamically
  const studentsWithScores = students.map((s) => {
    const score = getStudentDTMScore(s)
    return {
      ...s,
      dtmScore: score,
    }
  })

  // Sort students by total DTM points descending to assign global ranks
  const sortedStudents = [...studentsWithScores].sort((a, b) => b.dtmScore - a.dtmScore)

  // Filter students based on Pivot Filters
  const filteredStudents = sortedStudents.filter((student) => {
    const certs = student.verifiedCerts || []
    if (subjectFilter === 'all') return true

    if (subjectFilter === 'primary') {
      const uzMajor = getLocalizedSubject(student.major1, 'uz')
      return certs.some(c => c.includes(uzMajor) || (student.major1 === 'Foreign Language' && c.includes('IELTS')) || (student.major1 === 'History' && c.includes('tarixi')))
    }
    if (subjectFilter === 'secondary') {
      const uzMajor = getLocalizedSubject(student.major2, 'uz')
      return certs.some(c => c.includes(uzMajor) || (student.major2 === 'Foreign Language' && c.includes('IELTS')) || (student.major2 === 'History' && c.includes('tarixi')))
    }
    if (subjectFilter === 'comp_math') {
      return certs.some(c => c.includes('Matematika') || c.includes('SAT'))
    }
    if (subjectFilter === 'comp_lang') {
      return certs.some(c => c.includes('Ona tili'))
    }
    if (subjectFilter === 'comp_hist') {
      return certs.some(c => c.includes('tarixi'))
    }
    return true
  })

  // Calculate global metrics for the KPI Stats cards
  const totalVerifiedCertsCount = students.reduce((acc, curr) => acc + (curr.verifiedCerts?.length || 0), 0)
  const peakDTMScore = Math.max(...studentsWithScores.map((s) => s.dtmScore), 0)
  const avgDTMScore = parseFloat(
    (studentsWithScores.reduce((acc, curr) => acc + curr.dtmScore, 0) / students.length).toFixed(1)
  )

  // Handle certificate verification submission
  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!certCode.trim() || !issuedDate || !certScore) {
      setVerifyError(lang === 'uz' ? "Iltimos, barcha maydonlarni to'ldiring." : "Please fill in all fields.")
      return
    }

    if (certCode.trim().length < 5) {
      setVerifyError(t('cr.desk.err_format'))
      return
    }

    const scoreNum = parseFloat(certScore)
    if (isNaN(scoreNum)) {
      setVerifyError(lang === 'uz' ? "Iltimos, to'g'ri ball kiriting." : "Please enter a valid score.")
      return
    }

    // Set correct subject default for IELTS/SAT
    let finalSubject = uzbmbSubject
    if (certProvider === 'IELTS') {
      finalSubject = 'Ingliz tili'
    } else if (certProvider === 'SAT') {
      finalSubject = 'Matematika'
    }

    let parsedPercentage = 0.0
    let gradeLevel = 'Fails'
    let enginePercentage = 0.0

    if (certProvider === 'Milliy Sertifikat') {
      if (scoreNum < 0 || scoreNum > 75) {
        setVerifyError(lang === 'uz' ? "Milliy sertifikat bali 0 va 75 oralig'ida bo'lishi kerak." : "National certificate score must be between 0 and 75.")
        return
      }
    } else if (certProvider === 'IELTS') {
      if (scoreNum < 1.0 || scoreNum > 9.0 || scoreNum % 0.5 !== 0) {
        setVerifyError(lang === 'uz' ? "IELTS bali 1.0-9.0 oralig'ida yarim qadamda bo'lishi kerak." : "IELTS must be 1.0-9.0 in half steps.")
        return
      }
    } else if (certProvider === 'SAT') {
      if (scoreNum < 400 || scoreNum > 1600) {
        setVerifyError(lang === 'uz' ? "SAT bali 400 va 1600 oralig'ida bo'lishi kerak." : "SAT must be between 400 and 1600.")
        return
      }
    }

    const evalRes = evaluateCertificate(certProvider, finalSubject, scoreNum)
    parsedPercentage = evalRes.engine_percentage / 100.0
    gradeLevel = evalRes.gradeBadge
    enginePercentage = evalRes.engine_percentage

    setVerifyError("")
    setVerifying(true)
    setVerifySuccess(false)

    setTimeout(() => {
      setVerifying(false)
      setVerifySuccess(true)

      const detail = {
        subject: finalSubject,
        provider: certProvider === 'IELTS' ? 'IELTS Academic' : certProvider,
        level: gradeLevel,
        score: certProvider === 'Milliy Sertifikat' 
          ? `${scoreNum} Ball` 
          : (certProvider === 'IELTS' 
              ? (lang === 'uz' ? `${scoreNum} ball` : `${scoreNum} pts`)
              : `${scoreNum}`),
        percentage: parsedPercentage,
        code: `DI Kod: ${certCode.toUpperCase()}`,
        date: issuedDate,
        subjectKey: finalSubject === 'Ingliz tili' ? 'Foreign Language' : (finalSubject === 'Rus tili' ? 'Foreign Language' : finalSubject),
        scoreValue: scoreNum,
        points_ball: scoreNum,
        engine_percentage: enginePercentage,
        gradeBadge: gradeLevel
      }

      onVerifyCertificate(selectedStudentId, detail)
      setCertCode('')
      setIssuedDate('')
      setCertScore('')

      setTimeout(() => setVerifySuccess(false), 4000)
    }, 1200)
  }

  // Helper to assign ranking badge styles
  const getRankBadge = (idx: number) => {
    const rank = idx + 1
    if (rank === 1) {
      return (
        <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/30 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
          <Trophy className="size-3.5 text-amber-500" />
          {lang === 'uz' ? "1-o'rin" : 'Rank #1'}
        </Badge>
      )
    }
    if (rank === 2) {
      return (
        <Badge className="bg-slate-300/20 text-slate-500 dark:text-slate-300 border border-slate-300/30 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
          <Medal className="size-3.5 text-slate-400" />
          {lang === 'uz' ? "2-o'rin" : 'Rank #2'}
        </Badge>
      )
    }
    if (rank === 3) {
      return (
        <Badge className="bg-amber-700/10 text-amber-700 dark:text-amber-500 border border-amber-700/30 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 w-fit">
          <Medal className="size-3.5 text-amber-700 dark:text-amber-600" />
          {lang === 'uz' ? "3-o'rin" : 'Rank #3'}
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="text-slate-400 font-semibold px-2 py-0.5 rounded-full flex items-center w-fit">
        {lang === 'uz' ? `${rank}-o'rin` : `Rank #${rank}`}
      </Badge>
    )
  }

  // Get details of selected student for info context in form card
  const activeFormStudent = students.find((s) => s.id === selectedStudentId)

  return (
    <div className="flex flex-col gap-6 text-left animate-fade-in">
      {/* View Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          {t('cr.title')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('cr.desc')}
        </p>
      </div>

      {/* Dynamic KPI Dashboard Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border border-border/60 bg-neutral-50/90 dark:bg-slate-900/50 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shrink-0">
              <Award className="size-6" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">
                {t('cr.kpi.certs')}
              </p>
              <h3 className="font-heading text-2xl font-bold text-foreground mt-0.5">
                {totalVerifiedCertsCount}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-neutral-50/90 dark:bg-slate-900/50 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 shrink-0">
              <TrendingUp className="size-6 animate-pulse" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">
                {t('cr.kpi.peak')}
              </p>
              <h3 className="font-heading text-2xl font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                {peakDTMScore.toFixed(1)} <span className="text-xs text-muted-foreground font-normal">/ 189.0</span>
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 bg-neutral-50/90 dark:bg-slate-900/50 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 shrink-0">
              <Users className="size-6" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground font-semibold">
                {t('cr.kpi.avg')}
              </p>
              <h3 className="font-heading text-2xl font-bold text-foreground mt-0.5">
                {avgDTMScore.toFixed(1)} <span className="text-xs text-muted-foreground font-normal">/ 189.0</span>
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5-Subject Pivot Filtering Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-3 mt-2">
        <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 mr-2">
          <Filter className="size-3.5 text-blue-500" />
          {t('cr.filter.label')}
        </span>
        <Button
          variant={subjectFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSubjectFilter('all')}
          className="rounded-full text-xs font-semibold"
        >
          {t('cr.filter.all')}
        </Button>
        <Button
          variant={subjectFilter === 'primary' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSubjectFilter('primary')}
          className="rounded-full text-xs font-semibold"
        >
          {t('cr.filter.primary')}
        </Button>
        <Button
          variant={subjectFilter === 'secondary' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSubjectFilter('secondary')}
          className="rounded-full text-xs font-semibold"
        >
          {t('cr.filter.secondary')}
        </Button>
        <Button
          variant={subjectFilter === 'comp_math' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSubjectFilter('comp_math')}
          className="rounded-full text-xs font-semibold"
        >
          {t('cr.filter.comp_math')}
        </Button>
        <Button
          variant={subjectFilter === 'comp_lang' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSubjectFilter('comp_lang')}
          className="rounded-full text-xs font-semibold"
        >
          {t('cr.filter.comp_lang')}
        </Button>
        <Button
          variant={subjectFilter === 'comp_hist' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSubjectFilter('comp_hist')}
          className="rounded-full text-xs font-semibold"
        >
          {t('cr.filter.comp_hist')}
        </Button>
      </div>

      {/* Main Content Layout: Leaderboard (Left) + Verification Desk Card (Right) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Leaderboard Table */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="border border-border/60 shadow-sm bg-card overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Trophy className="size-5 text-indigo-500" />
                {t('cr.table.title')}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {t('cr.table.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                    <TableRow>
                      <TableHead className="w-[100px] text-xs font-bold">{t('cr.table.rank')}</TableHead>
                      <TableHead className="text-xs font-bold">{t('cr.table.student')}</TableHead>
                      <TableHead className="text-xs font-bold">{t('cr.table.slots')}</TableHead>
                      <TableHead className="text-xs font-bold text-center">{t('cr.table.score')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-xs text-muted-foreground">
                          {t('cr.table.no_match')}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents.map((s) => {
                        const globalIndex = sortedStudents.findIndex((student) => student.id === s.id)
                        const certs = s.verifiedCerts || []

                        return (
                          <TableRow key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                            <TableCell className="align-middle">
                              {getRankBadge(globalIndex)}
                            </TableCell>
                            <TableCell className="align-middle">
                              <div className="flex items-center gap-2">
                                <Avatar className="size-8 border border-border">
                                  <AvatarFallback className="bg-indigo-600 text-xs font-bold text-white">
                                    {s.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-xs font-bold text-foreground leading-tight">{s.name}</p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.handle}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="align-middle">
                              <div className="flex flex-wrap gap-1">
                                {certs.length === 0 ? (
                                  <span className="text-[10px] text-muted-foreground italic">
                                    {t('cr.table.no_certs')}
                                  </span>
                                ) : (
                                  certs.map((c) => {
                                    const localizedC = getLocalizedSubject(c, lang)
                                    let slotLabel = localizedC
                                    let isMajor = false

                                    const locMajor1 = getLocalizedSubject(s.major1, lang)
                                    const locMajor2 = getLocalizedSubject(s.major2, lang)

                                    if (c === s.major1 || localizedC === locMajor1) {
                                      slotLabel = lang === 'uz' ? `📐 Asosiy: ${localizedC}` : `📐 Primary: ${localizedC}`
                                      isMajor = true
                                    } else if (c === s.major2 || localizedC === locMajor2 || (s.major2 === 'Foreign Language' && c === 'IELTS')) {
                                      slotLabel = lang === 'uz' ? `⚡ Qo'shimcha: ${localizedC}` : `⚡ Secondary: ${localizedC}`
                                      isMajor = true
                                    } else if (c === 'SAT' || c === 'Mathematics' || localizedC === 'Matematika' || localizedC === 'SAT') {
                                      slotLabel = lang === 'uz' ? `📐 Majburiy Matematika` : `📐 Compulsory Math`
                                    } else if (c === 'Mother Tongue' || localizedC === 'Ona tili') {
                                      slotLabel = lang === 'uz' ? `🇺🇿 Ona tili` : `🇺🇿 Native Lang`
                                    } else if (c === 'History' || localizedC === 'Tarix') {
                                      slotLabel = lang === 'uz' ? `🏛️ Tarix` : `🏛️ History`
                                    }

                                    return (
                                      <Badge
                                        key={c}
                                        variant="outline"
                                        className={cn(
                                          "text-[9px] font-semibold py-0 px-1.5 border-0 rounded-md",
                                          isMajor
                                            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400"
                                            : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                                        )}
                                      >
                                        {slotLabel}
                                      </Badge>
                                    )
                                  })
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="align-middle text-center">
                              <span className="font-heading text-sm font-extrabold text-blue-600 dark:text-blue-400">
                                {s.dtmScore.toFixed(1)}
                              </span>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: DI Credentials Verification Desk Card */}
        <div className="lg:col-span-4">
          <Card className="border border-border/60 shadow-lg bg-card sticky top-24">
            <CardHeader className="pb-3 border-b border-border/50 bg-slate-50/50 dark:bg-slate-900/20">
              <CardTitle className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="size-4.5 text-emerald-600" />
                {t('cr.desk.title')}
              </CardTitle>
              <CardDescription className="text-[11px] text-muted-foreground">
                {t('cr.desk.desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-5 space-y-4">
              {/* Feedback messages */}
              {verifySuccess && (
                <div className="flex gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-emerald-700 text-xs font-semibold animate-pulse text-left">
                  <CheckCircle2 className="size-4.5 shrink-0 mt-0.5" />
                  <span>
                    {t('cr.desk.success')}
                  </span>
                </div>
              )}
              {verifyError && (
                <div className="flex gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-red-700 text-xs font-semibold text-left">
                  <AlertCircle className="size-4.5 shrink-0 mt-0.5" />
                  <span>{verifyError}</span>
                </div>
              )}

              <form onSubmit={handleVerifySubmit} className="space-y-4 text-left">
                {/* Student Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">
                    {t('cr.desk.student_select')}
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => {
                      setSelectedStudentId(parseInt(e.target.value))
                      setVerifySuccess(false)
                      setVerifyError('')
                    }}
                    className="w-full h-9 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                  >
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.grade.replace('-sinf', lang === 'en' ? 'th Grade' : '-sinf')})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Major Indicator Context */}
                {activeFormStudent && (
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 text-[10px] space-y-1 border border-border/50 text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>{t('cr.desk.target_majors')}</span>
                      <span className="font-bold text-foreground">{activeFormStudent.major}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('cr.desk.major1')}</span>
                      <span className="font-semibold text-foreground">{activeFormStudent.major1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('cr.desk.major2')}</span>
                      <span className="font-semibold text-foreground">{activeFormStudent.major2}</span>
                    </div>
                  </div>
                )}

                {/* Provider Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">
                    {t('cr.desk.provider')}
                  </label>
                  <select
                    value={certProvider}
                    onChange={(e) => {
                      setCertProvider(e.target.value)
                      setVerifySuccess(false)
                      setVerifyError('')
                    }}
                    className="w-full h-9 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                  >
                    <option value="Milliy Sertifikat">{t('prov.uzbmb')}</option>
                    <option value="IELTS">{t('prov.ielts')}</option>
                    <option value="SAT">{t('prov.sat')}</option>
                  </select>
                </div>

                 {/* Subject Selector (Uzbmb only) */}
                {certProvider === 'Milliy Sertifikat' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-muted-foreground">
                      {t('cr.desk.subject')}
                    </label>
                    <select
                      value={uzbmbSubject}
                      onChange={(e) => setUzbmbSubject(e.target.value)}
                      className="w-full h-9 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-medium"
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

                {/* Score Input */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">
                    {lang === 'uz' ? "To'plangan Ball" : "Score Points"}
                  </label>
                  <Input
                    type="number"
                    step={certProvider === 'SAT' ? '1' : certProvider === 'IELTS' ? '0.5' : '0.1'}
                    max={certProvider === 'Milliy Sertifikat' ? "75" : undefined}
                    value={certScore}
                    onChange={(e) => setCertScore(e.target.value)}
                    placeholder={
                      certProvider === 'IELTS'
                        ? (lang === 'uz' ? "Masalan: 6.5" : "e.g., 6.5")
                        : (certProvider === 'SAT'
                            ? (lang === 'uz' ? "Masalan: 1380" : "e.g., 1380")
                            : (lang === 'uz' ? "Masalan: 65" : "e.g., 65"))
                    }
                    className="h-9 text-xs text-foreground bg-card border-border"
                    required
                  />
                </div>

                {/* Certificate Code */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">
                    {t('cr.desk.code')}
                  </label>
                  <Input
                    type="text"
                    value={certCode}
                    onChange={(e) => setCertCode(e.target.value)}
                    placeholder={t('cr.desk.code_placeholder')}
                    className="h-9 text-xs text-foreground bg-card border-border"
                    required
                  />
                </div>

                {/* Issued Date */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground">
                    {t('cr.desk.date')}
                  </label>
                  <input
                    type="date"
                    value={issuedDate}
                    onChange={(e) => setIssuedDate(e.target.value)}
                    className="w-full h-9 rounded-md border border-border bg-card px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={verifying}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-9 justify-center gap-1.5 mt-2"
                >
                  {verifying ? (
                    <span className="flex items-center gap-1.5 animate-pulse">
                      <span className="size-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('cr.desk.verifying')}
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="size-4" />
                      {t('cr.desk.verify_btn')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
