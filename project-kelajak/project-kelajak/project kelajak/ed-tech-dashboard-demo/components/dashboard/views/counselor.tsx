'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  AlertTriangle,
  HeartHandshake,
  FileText,
  Download,
  Filter,
  X,
  GraduationCap,
  Sparkles,
  Search,
  BookOpen,
  MapPin,
  TrendingUp,
  FileCheck,
  Award,
  AlertCircle,
  Star,
  UserCheck,
  ChevronDown,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import { getHighestIelts, getHighestSat } from '@/lib/simulator'
import { activeStudentsFromRatio, calcParticipationRate } from '@/lib/stats'
import {
  counselorLibrary,
  monitoredStudents as defaultMonitoredStudents,
  mockSchools,
  type MockSchool,
} from '@/lib/mock-data'

interface CounselorViewProps {
  rating: number
  feed: string[]
  studentAchievements: any[]
  studentProfile: {
    name: string
    handle: string
    major: string
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
    verifiedCerts?: string[]
    verifiedCertsDetails?: any[]
  }
}

export function CounselorView({
  rating,
  feed,
  studentAchievements,
  studentProfile,
}: CounselorViewProps) {
  const [cohortFilter, setCohortFilter] = useState<'all' | 'verified' | 'at_risk'>('all')
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null)
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const [selectedECType, setSelectedECType] = useState<string>('Barchasi')
  const [selectedSchoolState, setSelectedSchoolState] = useState<MockSchool | null>(null)
  const [schoolModalOpen, setSchoolModalOpen] = useState(false)
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null)
  const { lang, t } = useLanguage()

  useEffect(() => {
    if (schoolModalOpen || activeFlyout || flyoutOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [schoolModalOpen, activeFlyout, flyoutOpen])

  const localizeStr = (val: string) => {
    if (lang !== 'uz') return val;
    if (val === 'Mathematics') return 'Matematika';
    if (val === 'Physics') return 'Fizika';
    if (val === 'Computer Science') return 'Kompyuter fanlari';
    return val;
  }

  // Merge registered student into monitored students list for interactive demo flow
  const studentsList = defaultMonitoredStudents.map((s) => {
    let verifiedCerts: string[] = []
    if (s.name === 'Azizbek Karimov') {
      verifiedCerts = (studentProfile.verifiedCerts || []).map(localizeStr)
    } else {
      if (s.id === 2) verifiedCerts = ['IELTS 7.5']
      else if (s.id === 4) verifiedCerts = ['IELTS 6.5']
      else if (s.id === 6) verifiedCerts = ['Milliy Sertifikat (O\'zbekiston tarixi)', 'IELTS 7.5', 'SAT 1510', 'Milliy Sertifikat (Ona tili va adabiyot)']
      else if (s.id === 8) verifiedCerts = ['Milliy Sertifikat (Matematika)']
      else if (s.id === 9) verifiedCerts = ['Milliy Sertifikat (Matematika)']
    }

    if (s.name === 'Azizbek Karimov') {
      return {
        ...s,
        name: studentProfile.name,
        initials: studentProfile.initials,
        gpa: studentProfile.gpa,
        region: studentProfile.region,
        // Detailed props for flyout view
        handle: studentProfile.handle,
        major: localizeStr(studentProfile.major),
        ielts: getHighestIelts(studentProfile.ielts, studentProfile.verifiedCertsDetails || []),
        sat: getHighestSat(studentProfile.sat, studentProfile.verifiedCertsDetails || []),
        familyStatus: studentProfile.familyStatus,
        healthStatus: studentProfile.healthStatus,
        financialStanding: studentProfile.financialStanding,
        verifiedCerts,
        verifiedCertsDetails: studentProfile.verifiedCertsDetails || [],
        isCustom: true,
      }
    }
    
    // Hardcode other profiles with baseline vulnerability parameters for demonstration
    const certsDetails = s.id === 2 ? [
      { subject: 'Ingliz tili', provider: 'IELTS Academic', level: 'C1', score: '7.5 pts', percentage: 0.85, code: 'DI Kod: TS837492A', date: '2026-01-15', points_ball: 7.5, engine_percentage: 100.0, gradeBadge: 'C1' }
    ] : s.id === 3 ? [
      { subject: 'Matematika', provider: 'SAT', level: 'C1', score: '1380', percentage: 0.816, code: 'DI Kod: SAT2026A', date: '2026-02-10', points_ball: 1380, engine_percentage: 100.0, gradeBadge: 'A+' },
      { subject: 'Ona tili va adabiyot', provider: 'Milliy Sertifikat', level: 'A+', score: '75%', percentage: 0.75, code: 'DI Kod: UZ2026B', date: '2026-03-05', points_ball: 75, engine_percentage: 100.0, gradeBadge: 'A+' },
      { subject: "O'zbekiston tarixi", provider: 'Milliy Sertifikat', level: 'A', score: '68%', percentage: 0.68, code: 'DI Kod: UZ2026C', date: '2026-03-12', points_ball: 68, engine_percentage: 100.0, gradeBadge: 'A' }
    ] : s.id === 4 ? [
      { subject: 'Ingliz tili', provider: 'IELTS Academic', level: 'B2', score: '6.5 pts', percentage: 0.75, code: 'DI Kod: IELTS65B', date: '2026-04-01', points_ball: 6.5, engine_percentage: 100.0, gradeBadge: 'B2' }
    ] : s.id === 6 ? [
      { subject: "O'zbekiston tarixi", provider: 'Milliy Sertifikat', level: 'A', score: '68%', percentage: 0.68, code: 'DI Kod: HIST2026A', date: '2026-01-20', points_ball: 68, engine_percentage: 100.0, gradeBadge: 'A' },
      { subject: 'Ingliz tili', provider: 'IELTS Academic', level: 'C1', score: '7.5 pts', percentage: 0.85, code: 'DI Kod: IELTS75C', date: '2026-02-15', points_ball: 7.5, engine_percentage: 100.0, gradeBadge: 'C1' },
      { subject: 'Matematika', provider: 'SAT', level: 'C1', score: '1510', percentage: 0.925, code: 'DI Kod: SAT1510C', date: '2026-03-01', points_ball: 1510, engine_percentage: 100.0, gradeBadge: 'A+' },
      { subject: 'Ona tili va adabiyot', provider: 'Milliy Sertifikat', level: 'A+', score: '75%', percentage: 0.75, code: 'DI Kod: NATIVE75A', date: '2026-03-10', points_ball: 75, engine_percentage: 100.0, gradeBadge: 'A+' }
    ] : []

    const baseIelts = s.gpa >= 3.8 ? 7.0 : s.gpa >= 3.4 ? 6.5 : 5.5
    const baseSat = s.gpa >= 3.8 ? 1480 : s.gpa >= 3.4 ? 1350 : 1200

    return {
      ...s,
      handle: `@${s.name.toLowerCase().replace(' ', '_')}_01`,
      major: s.id % 2 === 0 
        ? (lang === 'uz' ? 'IT va Muhandislik' : 'IT and Engineering') 
        : (lang === 'uz' ? 'Aniq Fanlar' : 'Exact Sciences'),
      ielts: getHighestIelts(baseIelts, certsDetails),
      sat: getHighestSat(baseSat, certsDetails),
      familyStatus: s.id === 4 ? 'Orphaned' : 'Standard',
      healthStatus: s.id === 7 ? 'Physical Disability' : 'None',
      financialStanding: s.id === 5 || s.id === 9 ? 'Vulnerable' : 'Stable',
      verifiedCerts,
      verifiedCertsDetails: certsDetails,
      isCustom: false,
    }
  })

  const filteredRows = studentsList.filter((s) => {
    if (cohortFilter === 'verified') {
      return s.verifiedCerts && s.verifiedCerts.length > 0
    }
    if (cohortFilter === 'at_risk') {
      return !s.verifiedCerts || s.verifiedCerts.length === 0
    }
    return true
  })

  const ecFilteredRows = selectedECType === 'Barchasi'
    ? filteredRows
    : filteredRows.filter((student) => {
        if (student.name === studentProfile.name) {
          return studentAchievements.some((ach) => ach.category === selectedECType)
        } else {
          return student.achievementsByEC && (student.achievementsByEC[selectedECType] || 0) > 0
        }
      })

  // Rank mock schools based on selected EC type or total ec hours
  const rankedSchools = [...mockSchools].sort((a, b) => {
    if (selectedECType === 'Barchasi') {
      return b.ecHoursRatio - a.ecHoursRatio
    } else {
      const aPoints = a.rankingByEC[selectedECType] || 0
      const bPoints = b.rankingByEC[selectedECType] || 0
      return bPoints - aPoints
    }
  })

  // Coverage Ratio KPI: percentage of students with at least 1 verified certificate
  const studentsWithCert = studentsList.filter((s) => s.verifiedCerts && s.verifiedCerts.length > 0).length
  const coverageRatio = Math.round((studentsWithCert / studentsList.length) * 100)

  const stats = [
    {
      label: t('counselor.total_students'),
      value: studentsList.length,
      icon: Users,
      tone: 'text-blue-500/80',
    },
    {
      label: t('counselor.coverage_kpi'),
      value: `${coverageRatio}%`,
      icon: FileCheck,
      tone: 'text-slate-400',
      note: t('counselor.coverage_note'),
    },
    {
      label: t('counselor.at_risk_students'),
      value: studentsList.filter((s) => s.clubs === 0 || s.financialStanding === 'Vulnerable' || s.healthStatus === 'Physical Disability').length,
      icon: HeartHandshake,
      tone: 'text-slate-400',
      note: t('counselor.at_risk_note'),
    },
    {
      label: t('counselor.rating_title'),
      value: `${rating.toFixed(1)} / 5`,
      icon: Star,
      tone: 'text-blue-500/80',
      note: t('counselor.rating_note'),
    },
  ]

  const handleOpenFlyout = (student: any) => {
    setSelectedStudent(student)
    setFlyoutOpen(true)
  }

  const handleCloseFlyout = () => {
    setFlyoutOpen(false)
  }

  // Deficit indicators helper for flyout
  const renderDeficits = (student: any) => {
    const target = { gpa: 3.8, ielts: 7.0, sat: 1450 } // New Uzbekistan target
    const gpaDiff = target.gpa - student.gpa
    const ieltsDiff = target.ielts - student.ielts
    const satDiff = target.sat - student.sat

    return (
      <div className="space-y-2 text-xs border-t border-border/80 pt-3 text-left">
        <h4 className="font-bold text-foreground flex items-center gap-1.5 mb-2.5">
          <GraduationCap className="size-4 text-blue-600" />
          {t('counselor.drawer.target_title')}
        </h4>
        <div className="grid gap-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border/30">
            <span>{t('counselor.drawer.target_gpa')}</span>
            {gpaDiff <= 0 ? (
              <span className="text-green-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" /> {t('counselor.drawer.met')}
              </span>
            ) : (
              <span className="text-yellow-600 dark:text-yellow-400 font-bold flex items-center gap-1">
                <AlertCircle className="size-3.5" /> +{gpaDiff.toFixed(2)} {t('counselor.drawer.remaining')}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border/30">
            <span>{t('counselor.drawer.target_ielts')}</span>
            {ieltsDiff <= 0 ? (
              <span className="text-green-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" /> {t('counselor.drawer.met')}
              </span>
            ) : (
              <span className="text-yellow-600 dark:text-yellow-400 font-bold flex items-center gap-1">
                <AlertCircle className="size-3.5" /> +{ieltsDiff.toFixed(1)} {t('counselor.drawer.remaining')}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 border border-border/30">
            <span>{t('counselor.drawer.target_sat')}</span>
            {satDiff <= 0 ? (
              <span className="text-green-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" /> {t('counselor.drawer.met')}
              </span>
            ) : (
              <span className="text-yellow-600 dark:text-yellow-400 font-bold flex items-center gap-1">
                <AlertCircle className="size-3.5" /> +{satDiff} {t('counselor.drawer.remaining')}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-1 text-left">
        <h1 className="font-heading text-2xl font-bold text-foreground">{t('counselor.title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('counselor.desc')}
        </p>
      </div>

      {/* Top metrics widgets */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border border-border/60">
              <CardContent className="flex items-center gap-4 p-5">
                <span className={cn('flex size-10 items-center justify-center rounded-xl bg-slate-100/50 dark:bg-slate-800/50', stat.tone)}>
                  <Icon className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-heading text-3xl font-extrabold text-foreground">{stat.value}</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-0.5">{stat.label}</p>
                  {stat.note && <p className="text-[10px] text-slate-500 mt-1 leading-tight font-medium">{stat.note}</p>}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start text-left">
        {/* Student Roster Table (8 Cols) */}
        <section className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-heading text-base font-bold text-foreground">{t('counselor.monitoring_title')}</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">{t('counselor.focus')}</span>
                <select
                  value={selectedECType}
                  onChange={(e) => setSelectedECType(e.target.value)}
                  className="h-8 rounded-md border border-border bg-card px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary font-semibold text-foreground"
                >
                  <option value="Barchasi">{lang === 'uz' ? 'Barchasi' : 'All'}</option>
                  <option value="Aniq fanlar">{lang === 'uz' ? 'Aniq fanlar' : 'Exact Sciences'}</option>
                  <option value="Tabiiy fanlar">{lang === 'uz' ? 'Tabiiy fanlar' : 'Natural Sciences'}</option>
                  <option value="Tillar / Gumanitar">{lang === 'uz' ? 'Tillar / Gumanitar' : 'Languages / Humanities'}</option>
                  <option value="Ijodiy / San'at">{lang === 'uz' ? 'Ijodiy / San\'at' : 'Creative Arts'}</option>
                  <option value="Loyiha">{lang === 'uz' ? 'Loyiha' : 'Projects'}</option>
                  <option value="Sport">{lang === 'uz' ? 'Sport' : 'Sports'}</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-muted p-1 rounded-lg border">
                <button
                  type="button"
                  onClick={() => setCohortFilter('all')}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors",
                    cohortFilter === 'all' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t('counselor.filter.all')}
                </button>
                <button
                  type="button"
                  onClick={() => setCohortFilter('verified')}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors",
                    cohortFilter === 'verified' ? "bg-emerald-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t('counselor.filter.verified')}
                </button>
                <button
                  type="button"
                  onClick={() => setCohortFilter('at_risk')}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors",
                    cohortFilter === 'at_risk' ? "bg-red-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t('counselor.filter.at_risk')}
                </button>
              </div>
            </div>
          </div>

          <Card className="border border-border/60 shadow-md">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/60 bg-muted/20 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <TableHead className="px-4 py-3">{t('counselor.table.name')}</TableHead>
                    <TableHead className="px-4 py-3">{t('counselor.table.grade')}</TableHead>
                    <TableHead className="px-4 py-3 text-right">{t('counselor.table.gpa')}</TableHead>
                    <TableHead className="px-4 py-3 text-center">{t('counselor.table.certs')}</TableHead>
                    <TableHead className="px-4 py-3 text-right">{t('counselor.table.clubs')}</TableHead>
                    <TableHead className="px-4 py-3 text-center">{t('counselor.table.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ecFilteredRows.map((student) => {
                    return (
                      <TableRow key={student.id} className="transition-colors hover:bg-muted/40 text-xs font-medium border-b border-border/40">
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8 border">
                              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold dark:bg-blue-900/30 dark:text-blue-400">
                                {student.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="leading-tight">
                              <p className="font-bold text-foreground">{student.name}</p>
                              <p className="text-[10px] text-slate-500">{(student as any).school || 'Jizzax Prezident maktabi'}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-slate-500">
                          {student.grade.replace('-sinf', lang === 'en' ? 'th Grade' : '-sinf')}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right font-bold text-foreground">{student.gpa.toFixed(2)}</TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          {student.verifiedCerts && student.verifiedCerts.length > 0 ? (
                            <div className="flex justify-center gap-1 flex-wrap">
                              {student.verifiedCerts.map((cert) => (
                                <Badge key={cert} className="bg-emerald-500 text-white border-0 text-[8px] py-0 px-1.5 font-bold rounded-full">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <Badge className="border-0 bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400 text-[9px] py-0.5 px-2 font-bold animate-pulse">
                              {t('counselor.table.unverified')}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-right">
                          <Badge variant="secondary" className="border-0 text-[10px] py-0.5">
                            {student.clubs} {lang === 'uz' ? "ta to'garak" : "clubs"}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenFlyout(student)}
                            className="text-blue-600 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 h-7 text-xs px-2.5 font-bold"
                          >
                            {t('counselor.table.view')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Regional Director Feed Widgets (4 Cols) */}
        <section className="lg:col-span-4 flex flex-col gap-3">
          <h2 className="font-heading text-base font-bold text-foreground">{t('counselor.feed_title')}</h2>
          <Card className="border border-border/60 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold flex items-center gap-1.5 text-blue-600 uppercase tracking-wider">
                <TrendingUp className="size-4" />
                {t('counselor.feed_subtitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-2">
              {feed.map((msg, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border bg-card p-3 text-[11px] leading-relaxed text-muted-foreground shadow-sm hover:border-blue-400/40 transition-colors"
                >
                  <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    {t('counselor.feed_sender')} • {t('counselor.feed_time')}
                  </div>
                  {msg}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border border-border/60 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t('counselor.resources')}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/60 font-medium">
                {counselorLibrary.slice(0, 3).map((lib) => (
                  <div key={lib.id} className="flex items-center justify-between p-3 text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-blue-500" />
                      <span className="truncate font-semibold text-foreground max-w-[170px]">{lib.title}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="size-7 hover:bg-slate-100 dark:hover:bg-slate-900 text-blue-600">
                      <Download className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Student Achievement Leaderboard */}
      <section className="flex flex-col gap-3 mt-4 border-t border-border pt-6 text-left">
        <div>
          <h2 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
            <Award className="size-5 text-indigo-600" />
            {t('counselor.leaderboard_title')}
          </h2>
          <p className="text-xs text-muted-foreground">
            {t('counselor.leaderboard_desc')}
          </p>
        </div>
        <Card className="border border-border/60 shadow-md bg-card">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-border/60 bg-muted/20 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <TableHead className="px-4 py-3 text-center w-12">{t('counselor.leaderboard.rank')}</TableHead>
                  <TableHead className="px-4 py-3">{t('counselor.leaderboard.name_school')}</TableHead>
                  <TableHead className="px-4 py-3 text-right">{t('counselor.leaderboard.certs_count')}</TableHead>
                  <TableHead className="px-4 py-3">{t('counselor.leaderboard.major')}</TableHead>
                  <TableHead className="px-4 py-3">{t('counselor.leaderboard.certs_list')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...studentsList]
                  .map(s => ({ ...s, certCount: s.verifiedCerts?.length || 0 }))
                  .sort((a, b) => b.certCount - a.certCount)
                  .map((student, idx) => (
                    <TableRow key={student.id} className="transition-colors hover:bg-muted/40 text-xs border-b border-border/40 font-medium">
                      <TableCell className="px-4 py-3 text-center font-bold text-slate-500">{idx + 1}</TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-7 border">
                            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-[10px] font-bold dark:bg-indigo-900/30 dark:text-indigo-400">
                              {student.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="leading-tight">
                            <p className="font-bold text-foreground">{student.name}</p>
                            <span className="text-[9px] text-slate-500">{(student as any).school || 'Jizzax Prezident maktabi'}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right font-extrabold text-blue-600 dark:text-blue-400">
                        {student.certCount} {lang === 'uz' ? 'ta' : 'certs'}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-slate-600 dark:text-slate-400">{student.major}</TableCell>
                      <TableCell className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {student.verifiedCerts && student.verifiedCerts.length > 0 ? (
                            student.verifiedCerts.map((cert) => (
                              <Badge key={cert} className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-[8px] py-0.5 px-1.5 font-bold rounded-full">
                                {cert}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">{t('counselor.leaderboard.none')}</span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Ecosystem Schools Grid & Ranking */}
      <section className="flex flex-col gap-4 border-t border-border pt-6 mt-4 text-left">
        <div>
          <h2 className="font-heading text-base font-bold text-foreground flex items-center gap-2">
            <Building2 className="size-5 text-blue-600" />
            {t('counselor.school_rankings_title')}
          </h2>
          <p className="text-xs text-muted-foreground">
            {selectedECType === 'Barchasi'
              ? t('counselor.school_rankings_desc_all')
              : `${lang === 'uz' ? 'Maktablar' : 'Schools'} "${selectedECType}" ${lang === 'uz' ? 'yo\'nalishi bo\'yicha yutuq ballari asosida tartiblandi:' : 'focus performance points ranking:'}`}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in">
          {rankedSchools.map((school, idx) => {
            const isTop3 = idx < 3
            return (
              <Card
                key={school.name}
                onClick={() => {
                  setSelectedSchoolState(school)
                  setSchoolModalOpen(true)
                }}
                className={cn(
                  "cursor-pointer hover:shadow-lg transition-all duration-300 border border-border/60 hover:border-primary/50 relative overflow-hidden bg-card",
                  isTop3 && "ring-1 ring-blue-500/20"
                )}
              >
                {isTop3 && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">
                    {t('counselor.school_rankings.top')} {idx + 1}
                  </div>
                )}
                <CardContent className="p-4 flex flex-col justify-between h-full gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-foreground truncate">{school.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{school.district}</p>
                  </div>

                  <div className="space-y-1.5 border-t border-border/40 pt-2 text-xs">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-muted-foreground">{t('counselor.school_rankings.avg_gpa')}</span>
                      <span className="font-bold text-foreground">{school.avgGpa.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-muted-foreground">{t('counselor.school_rankings.ec_score')}</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {selectedECType === 'Barchasi' 
                          ? `${school.ecHoursRatio} ${lang === 'uz' ? 'soat' : 'hours'}` 
                          : `${school.rankingByEC[selectedECType] || 0} ${lang === 'uz' ? 'ball' : 'pts'}`}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* SCHOOL DETAILS MODAL */}
      {schoolModalOpen && selectedSchoolState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in text-left">
          <Card className="w-full max-w-lg bg-card border border-border shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <CardHeader className="pt-8 pb-3 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2 leading-normal">
                  <GraduationCap className="size-5 text-blue-600 animate-pulse" />
                  {selectedSchoolState.name} - {t('counselor.modal.stats_title')}
                </CardTitle>
                <CardDescription className="text-muted-foreground">{selectedSchoolState.district}</CardDescription>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setSchoolModalOpen(false)}>
                <X className="size-5" />
              </Button>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Core metrics row */}
              <div className="grid gap-3 grid-cols-3 text-center">
                <div className="bg-muted/30 p-2.5 rounded-xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground font-bold">{t('counselor.modal.students_count')}</p>
                  <p className="text-sm font-extrabold text-foreground mt-0.5">{selectedSchoolState.totalStudents} {lang === 'uz' ? 'nafar' : ''}</p>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground font-bold">{t('counselor.modal.avg_gpa')}</p>
                  <p className="text-sm font-extrabold text-foreground mt-0.5">{selectedSchoolState.avgGpa.toFixed(2)}</p>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground font-bold">{t('counselor.modal.vulnerability')}</p>
                  <p className="text-sm font-extrabold text-red-600 dark:text-red-400 mt-0.5">{selectedSchoolState.vulnerabilityRate}%</p>
                </div>
              </div>

              {/* Averages */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">{t('counselor.modal.exam_scores')}</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 bg-muted/40 border border-border/30 rounded-xl flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{t('counselor.modal.avg_ielts')}</span>
                    <span className="font-extrabold text-foreground">{selectedSchoolState.avgIelts.toFixed(1)}</span>
                  </div>
                  <div className="p-3 bg-muted/40 border border-border/30 rounded-xl flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{t('counselor.modal.avg_sat')}</span>
                    <span className="font-extrabold text-foreground">{selectedSchoolState.avgSat}</span>
                  </div>
                </div>
              </div>

              {/* EC breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">{t('counselor.modal.ec_scores')}</h4>
                <div className="grid gap-2 text-xs font-semibold">
                  {Object.entries(selectedSchoolState.rankingByEC).map(([categoryName, score]) => (
                    <div key={categoryName} className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          {categoryName === 'Aniq fanlar' && (lang === 'en' ? 'Exact Sciences' : 'Aniq fanlar')}
                          {categoryName === 'Tabiiy fanlar' && (lang === 'en' ? 'Natural Sciences' : 'Tabiiy fanlar')}
                          {categoryName === 'Tillar / Gumanitar' && (lang === 'en' ? 'Languages / Humanities' : 'Tillar / Gumanitar')}
                          {categoryName === 'Ijodiy / San\'at' && (lang === 'en' ? 'Creative Arts' : 'Ijodiy / San\'at')}
                          {categoryName === 'Loyiha' && (lang === 'en' ? 'Projects' : 'Loyiha')}
                          {categoryName === 'Sport' && (lang === 'en' ? 'Sports' : 'Sport')}
                          {!['Aniq fanlar', 'Tabiiy fanlar', 'Tillar / Gumanitar', 'Ijodiy / San\'at', 'Loyiha', 'Sport'].includes(categoryName) && categoryName}
                        </span>
                        <span className="text-foreground">{score} {lang === 'uz' ? 'ball' : 'pts'}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  {/* Inactive students row inside school details modal */}
                  {(() => {
                    const activeStudents = activeStudentsFromRatio(selectedSchoolState.ecHoursRatio, selectedSchoolState.totalStudents)
                    const schoolParticipationRate = calcParticipationRate(activeStudents, selectedSchoolState.totalStudents)
                    const idlePct = Math.max(0, 100 - schoolParticipationRate)
                    return (
                      <div className="flex flex-col gap-1 pt-2 border-t border-border/40 group relative">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">
                            {lang === 'uz' ? "Faoliyatsiz / To'garaklarsiz" : "Not Participating / Inactive"}
                          </span>
                          <span className="text-rose-600 dark:text-rose-400 font-semibold">{idlePct.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-rose-500 rounded-full transition-all"
                            style={{ width: `${idlePct}%` }}
                          />
                        </div>
                        <div className="absolute bottom-full left-0 mb-1 hidden group-hover:block bg-slate-950 text-white text-[10px] rounded p-2 z-10 max-w-xs shadow-xl border border-slate-800">
                          {lang === 'uz'
                            ? "Birorta ham toʻgarak yoki sertifikatga ega boʻlmagan faoliyatsiz oʻquvchilar ulushi."
                            : "Students with zero verified extracurricular actions or certificates."}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border flex justify-end gap-2 pt-3">
              <Button className="bg-primary text-white text-xs h-9" onClick={() => setSchoolModalOpen(false)}>
                {t('counselor.modal.close')}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* PORTFOLIO FLYOUT VIEWPORT - RIGHT SIDE DRAWER */}
      {flyoutOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-sm">
          {/* Overlay click to close */}
          <div className="absolute inset-0" onClick={handleCloseFlyout} />
          
          {/* Drawer container */}
          <div className="relative w-full max-w-md bg-background border-l border-border h-full flex flex-col shadow-2xl animate-slide-in-right overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pt-8 pb-4 px-4 border-b border-border bg-muted/40">
              <h3 className="font-heading text-sm font-bold text-foreground">{t('counselor.drawer.title')}</h3>
              <Button size="icon" variant="ghost" onClick={handleCloseFlyout} className="size-8 rounded-full">
                <X className="size-4" />
              </Button>
            </div>

            {/* Profile contents */}
            <div className="flex-1 p-5 space-y-6 text-left">
              
              {/* Profile Card Header */}
              <div className="flex items-center gap-3 bg-blue-50/50 dark:bg-blue-950/10 p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <Avatar className="size-12 border">
                  <AvatarFallback className="bg-blue-600 text-white font-bold text-sm">
                    {selectedStudent.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm text-foreground leading-tight">{selectedStudent.name}</h4>
                  <p className="text-[10px] text-blue-500 font-mono font-medium mt-0.5">{selectedStudent.handle}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{selectedStudent.school}</p>
                </div>
              </div>

              {/* Vulnerabilities Block */}
              <div className="space-y-2">
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t('counselor.drawer.social_indicators')}</h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.familyStatus === 'Orphaned' && (
                    <Badge className="border-0 bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400">{t('social.orphaned')}</Badge>
                  )}
                  {selectedStudent.healthStatus === 'Physical Disability' && (
                    <Badge className="border-0 bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400">{t('social.disabled')}</Badge>
                  )}
                  {selectedStudent.financialStanding === 'Vulnerable' && (
                    <Badge className="border-0 bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400">{t('social.vulnerable')}</Badge>
                  )}
                  {selectedStudent.familyStatus !== 'Orphaned' &&
                    selectedStudent.healthStatus !== 'Physical Disability' &&
                    selectedStudent.financialStanding !== 'Vulnerable' && (
                      <span className="text-xs text-slate-500 font-medium italic">{t('counselor.drawer.no_social_needs')}</span>
                  )}
                </div>
              </div>

              {/* Performance stats in Flyout */}
              <div className="grid grid-cols-3 gap-2 border-t border-border/80 pt-3 text-center">
                <div className="bg-muted/30 p-2.5 rounded-lg border border-border/30">
                  <p className="text-[10px] font-semibold text-slate-400">{t('counselor.table.gpa')}</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{selectedStudent.gpa.toFixed(2)}</p>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border border-border/30">
                  <p className="text-[10px] font-semibold text-slate-400">IELTS</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{selectedStudent.ielts.toFixed(1)}</p>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border border-border/30">
                  <p className="text-[10px] font-semibold text-slate-400">SAT</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{selectedStudent.sat}</p>
                </div>
              </div>

              {/* Targets and Deficits details */}
              {renderDeficits(selectedStudent)}

              {/* Portfolio achievements list details */}
              <div className="space-y-2.5 border-t border-border/80 pt-3">
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Award className="size-4 text-blue-600" />
                  {t('counselor.drawer.achievements_title')}
                </h5>
                <div className="space-y-2 text-xs font-semibold">
                  {selectedStudent.isCustom ? (
                    // Display shared state achievements list for custom student
                    studentAchievements.map((ach) => (
                      <div key={ach.id} className="p-2.5 border border-border/60 bg-muted/10 rounded-xl leading-tight">
                        <p className="font-bold text-foreground">{ach.name}</p>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                          {ach.category} · {lang === 'uz' ? 'Haftasiga' : 'Weekly'} {ach.weeklyHours} {lang === 'uz' ? 'soat' : 'hours'} · {ach.duration.replace('-yil', lang === 'en' ? ' year' : '-yil')}
                        </span>
                      </div>
                    ))
                  ) : (
                    // Hardcoded standard achievements for mock roster profiles
                    <div className="space-y-2">
                      <div className="p-2.5 border border-border/60 bg-muted/10 rounded-xl leading-tight">
                        <p className="font-bold text-foreground">{t('counselor.drawer.ach.robotics')}</p>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{t('counselor.drawer.ach.robotics_desc')}</span>
                      </div>
                      <div className="p-2.5 border border-border/60 bg-muted/10 rounded-xl leading-tight">
                        <p className="font-bold text-foreground">{t('counselor.drawer.ach.futsal')}</p>
                        <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{t('counselor.drawer.ach.futsal_desc')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}
