'use client'

import { useState } from 'react'
import {
  Building2,
  Users,
  Star,
  MapPin,
  TrendingUp,
  CheckCircle,
  FileCheck,
  Activity,
  ArrowUpDown,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getDistrictsByRegion } from '@/lib/locations'
import { calcParticipationRate, activeStudentsFromRatio, weightedAvgParticipationRate, participationColor, participationLabel } from '@/lib/stats'
import { useLanguage } from '@/lib/language-context'

interface RegionalDirectorProps {
  counselorRating: number
  onUpdateCounselorRating: (stars: number, feedback: string) => void
}

// Simulated data matrix for District -> School statistics
interface MockSchoolStats {
  gpa: number
  vulnerabilitySupport: number
  clubEnrollment: number
  uniReady: number
  totalStudents: number
  counselorName: string
}

const schoolStatsData: Record<string, MockSchoolStats> = {
  'Jizzax shahri_Prezident Maktabi': {
    gpa: 3.82,
    vulnerabilitySupport: 95,
    clubEnrollment: 92,
    uniReady: 88,
    totalStudents: 124,
    counselorName: 'Nodira Yusupova',
  },
  'Sharof Rashidov tumani_9-sonli maktab': {
    gpa: 3.25,
    vulnerabilitySupport: 88,
    clubEnrollment: 65,
    uniReady: 45,
    totalStudents: 480,
    counselorName: 'Alisher Qodirov',
  },
  'Sharof Rashidov tumani_1-sonli ixtisoslashtirilgan maktab': {
    gpa: 3.51,
    vulnerabilitySupport: 90,
    clubEnrollment: 78,
    uniReady: 62,
    totalStudents: 310,
    counselorName: 'Zebiniso Halimova',
  },
  'Zomin tumani_Zomin IT maktabi': {
    gpa: 3.46,
    vulnerabilitySupport: 84,
    clubEnrollment: 85,
    uniReady: 70,
    totalStudents: 180,
    counselorName: 'Sardor Abduvaliyev',
  },
  'Zomin tumani_4-sonli maktab': {
    gpa: 3.12,
    vulnerabilitySupport: 76,
    clubEnrollment: 58,
    uniReady: 38,
    totalStudents: 520,
    counselorName: 'Zulxumor G\'ofurova',
  },
  'Zomin tumani_12-sonli maktab': {
    gpa: 3.18,
    vulnerabilitySupport: 80,
    clubEnrollment: 60,
    uniReady: 40,
    totalStudents: 390,
    counselorName: 'Botir Rahimov',
  },
  'Do\'stlik tumani_Do\'stlik kolleji': {
    gpa: 3.05,
    vulnerabilitySupport: 91,
    clubEnrollment: 62,
    uniReady: 35,
    totalStudents: 240,
    counselorName: 'Rustam Karimov',
  },
  'Do\'stlik tumani_2-sonli maktab': {
    gpa: 3.15,
    vulnerabilitySupport: 85,
    clubEnrollment: 55,
    uniReady: 32,
    totalStudents: 410,
    counselorName: 'Umida Ergasheva',
  },
}

const defaultStats: MockSchoolStats = {
  gpa: 3.42,
  vulnerabilitySupport: 85,
  clubEnrollment: 72,
  uniReady: 55,
  totalStudents: 1240,
  counselorName: 'Nodira Yusupova',
}

const districts = ['Jizzax shahri', 'Sharof Rashidov tumani', 'Zomin tumani', 'Do\'stlik tumani']
const districtSchools: Record<string, string[]> = {
  'Jizzax shahri': ['Prezident Maktabi'],
  'Sharof Rashidov tumani': ['9-sonli maktab', '1-sonli ixtisoslashtirilgan maktab'],
  'Zomin tumani': ['Zomin IT maktabi', '4-sonli maktab', '12-sonli maktab'],
  'Do\'stlik tumani': ['Do\'stlik kolleji', '2-sonli maktab'],
}

const translateDistrict = (d: string, l: 'uz' | 'en') => {
  if (l === 'uz') return d
  if (d === 'Jizzax shahri') return 'Jizzakh City'
  if (d === 'Sharof Rashidov tumani') return 'Sharof Rashidov District'
  if (d === 'Zomin tumani') return 'Zomin District'
  if (d === 'Do\'stlik tumani') return 'Do\'stlik District'
  return d
}

const translateSchool = (s: string, l: 'uz' | 'en') => {
  if (l === 'uz') return s
  if (s === 'Prezident Maktabi') return 'Presidential School'
  if (s === '9-sonli maktab') return 'School #9'
  if (s === '1-sonli ixtisoslashtirilgan maktab') return 'Specialized School #1'
  if (s === 'Zomin IT maktabi') return 'Zomin IT School'
  if (s === '4-sonli maktab') return 'School #4'
  if (s === '12-sonli maktab') return 'School #12'
  if (s === 'Do\'stlik kolleji') return 'Do\'stlik College'
  if (s === '2-sonli maktab') return 'School #2'
  return s
}

export function RegionalDirectorView({ counselorRating, onUpdateCounselorRating }: RegionalDirectorProps) {
  const { lang, t } = useLanguage()
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Sharof Rashidov tumani')
  const [selectedSchool, setSelectedSchool] = useState<string>('Prezident Maktabi')

  // Audit Form States
  const [auditCounselor, setAuditCounselor] = useState<string>('Nodira Yusupova (Sharof Rashidov PM)')
  const [auditFeedback, setAuditFeedback] = useState('')
  const [auditStars, setAuditStars] = useState<number>(5)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [submittedMessage, setSubmittedMessage] = useState('')

  const schools = districtSchools[selectedDistrict] || []

  // Resolve Stats depending on choices
  const statsKey = `${selectedDistrict}_${selectedSchool}`
  const stats = schoolStatsData[statsKey] || defaultStats

  // ── Participation rate calculations ─────────────────────────────────────────────
  // School-level participation from clubEnrollment % (represents students with ≥1 EC activity)
  const schoolParticipation = calcParticipationRate(
    activeStudentsFromRatio(stats.clubEnrollment, stats.totalStudents),
    stats.totalStudents
  )

  // District table — synthesize participation for all 15 Jizzakh districts from canonical geography
  const jizzakhDistricts = getDistrictsByRegion('Jizzakh Region')
  // Seed mock participation rates deterministically per district index
  const districtParticipationData = jizzakhDistricts.map((d, i) => {
    const knownStats = Object.entries(schoolStatsData)
      .filter(([k]) => k.startsWith(d.name + '_'))
      .map(([, v]) => v)
    const ecRate = knownStats.length > 0
      ? knownStats.reduce((s, sc) => s + sc.clubEnrollment, 0) / knownStats.length
      : 45 + ((i * 7 + 13) % 40)
    const students = knownStats.length > 0
      ? knownStats.reduce((s, sc) => s + sc.totalStudents, 0)
      : 300 + (i * 120) % 900
    const participation = calcParticipationRate(activeStudentsFromRatio(ecRate, students), students)
    return { id: d.id, name: d.name, participation, students, ecRate }
  }).sort((a, b) => b.participation - a.participation)

  const regionalAvgParticipation = districtParticipationData.reduce((s, d) => s + d.participation, 0)
    / (districtParticipationData.length || 1)

  const handleDistrictChange = (dist: string) => {
    setSelectedDistrict(dist)
    const subSchools = districtSchools[dist] || []
    setSelectedSchool(subSchools[0] || '')
  }

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!auditFeedback.trim()) return

    // Trigger parent callback to update counselor feedback rating in the feed
    onUpdateCounselorRating(auditStars, auditFeedback)

    const translatedName = auditCounselor
      .replace('Jizzax shahri PM', lang === 'uz' ? 'Jizzax PM' : 'Jizzax PM')
      .replace('Sharof Rashidov 9-maktab', lang === 'uz' ? '9-sonli maktab' : 'School #9')
      .replace('Sharof Rashidov 1-maktab', lang === 'uz' ? '1-ixtisoslashtirilgan maktab' : 'Specialized School #1')
      .replace('Zomin IT maktabi', lang === 'uz' ? 'Zomin IT maktabi' : 'Zomin IT School')

    const msg = t('rd.audit.success')
      .replace('{counselor}', translatedName)
      .replace('{stars}', auditStars.toString())

    setSubmittedMessage(msg)
    setShowSuccessAlert(true)
    setAuditFeedback('')
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 5000)
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-1 text-left">
        <h1 className="font-heading text-2xl font-bold text-foreground">{t('rd.title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('rd.desc')}
        </p>
      </div>

      {/* Region KPI overview header cards */}
      <div className="grid gap-4 sm:grid-cols-4 text-left">
        <Card className="border border-border/60">
          <CardContent className="flex items-center gap-4 p-4">
            <span className="flex size-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <MapPin className="size-5.5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{t('table.region')}</p>
              <p className="font-heading text-lg font-bold text-foreground">{t('jizzax')}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border/60">
          <CardContent className="flex items-center gap-4 p-4">
            <span className="flex size-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <Building2 className="size-5.5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{t('rd.schools_metric')}</p>
              <p className="font-heading text-lg font-bold text-foreground">{t('rd.schools_value')}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border/60">
          <CardContent className="flex items-center gap-4 p-4">
            <span className="flex size-11 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <Users className="size-5.5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{t('metric.total_students')}</p>
              <p className="font-heading text-lg font-bold text-foreground">{t('rd.students_value')}</p>
            </div>
          </CardContent>
        </Card>
        {/* 4th card: Regional EC Participation Rate */}
        <Card className="border-2 border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/10">
          <CardContent className="flex items-center gap-4 p-4">
            <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Activity className="size-5.5" />
            </span>
            <div>
              <p className="text-xs text-muted-foreground">{t('rd.region_participation')}</p>
              <p className={cn('font-heading text-lg font-bold', participationColor(regionalAvgParticipation))}>
                {regionalAvgParticipation.toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Interactive analytics & audits */}
      <div className="grid gap-6 lg:grid-cols-12 text-left">
        {/* Left 7 columns: Interactive chart dashboards */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="border border-border/60 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-bold">{t('rd.dashboard_title')}</CardTitle>
                  <CardDescription>{t('rd.dashboard_desc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-3">
              {/* Selectors */}
              <div className="space-y-4">
                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t('rd.select_district')}</label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {districts.map((d) => (
                      <Button
                        key={d}
                        type="button"
                        variant={selectedDistrict === d ? "default" : "outline"}
                        onClick={() => handleDistrictChange(d)}
                        className="text-xs font-semibold px-3.5 py-1.5 h-8.5 rounded-full"
                      >
                        {translateDistrict(d, lang)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">{t('rd.select_school')}</label>
                  <div className="grid gap-3 sm:grid-cols-3 pt-1">
                    {schools.map((sch) => {
                      const statsKey = `${selectedDistrict}_${sch}`
                      const schStats = schoolStatsData[statsKey] || defaultStats
                      const isSelected = selectedSchool === sch
                      return (
                        <div
                          key={sch}
                          onClick={() => setSelectedSchool(sch)}
                          className={cn(
                            "cursor-pointer rounded-xl border p-3.5 transition-all duration-200 text-left flex flex-col justify-between gap-3 bg-card hover:shadow-md",
                            isSelected
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-border/60 hover:border-primary/40"
                          )}
                        >
                          <div>
                            <h4 className="font-bold text-xs text-foreground leading-snug">{translateSchool(sch, lang)}</h4>
                            <p className="text-[10px] text-muted-foreground mt-1">{t('rd.counselor_label')} {schStats.counselorName}</p>
                          </div>
                          <div className="text-[10px] text-muted-foreground font-semibold flex justify-between items-center border-t border-border/40 pt-2">
                            <span>GPA: <strong>{schStats.gpa.toFixed(2)}</strong></span>
                            <span>{t('table.students')}: <strong>{schStats.totalStudents}</strong></span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Institution statistics summaries */}
              <div className="rounded-xl bg-muted/50 p-4 border border-border/40 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-muted-foreground">{t('rd.counselor_label')}</span>
                  <span className="font-bold text-foreground">{stats.counselorName}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-muted-foreground">{t('rd.students_label')}</span>
                  <span className="font-bold text-foreground">{stats.totalStudents}{t('rd.students_unit')}</span>
                </div>
              </div>

              {/* Graphical representation (Tailwind custom CSS bars) */}
              <div className="space-y-5">
                <h3 className="font-heading text-sm font-bold text-foreground flex items-center gap-1.5">
                  <TrendingUp className="size-4.5 text-blue-600" />
                  {t('rd.indices_title')}
                </h3>

                {/* Indeks 1: GPA average bar chart */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-muted-foreground">{t('rd.index.gpa')}</span>
                    <span className="font-bold text-foreground">{stats.gpa.toFixed(2)} / 4.00</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(stats.gpa / 4.0) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Indeks 2: Vulnerability support program */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-muted-foreground">{t('rd.index.vulnerability')}</span>
                    <span className="font-bold text-foreground">{stats.vulnerabilitySupport}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${stats.vulnerabilitySupport}%` }}
                    />
                  </div>
                </div>

                {/* Indeks 3: Club enrollment */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-muted-foreground">{t('rd.index.enrollment')}</span>
                    <span className="font-bold text-foreground">{stats.clubEnrollment}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${stats.clubEnrollment}%` }}
                    />
                  </div>
                </div>

                {/* Indeks 4: University readiness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-muted-foreground">{t('rd.index.readiness')}</span>
                    <span className="font-bold text-foreground">{stats.uniReady}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${stats.uniReady}%` }}
                    />
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 5 columns: Auditor & Rating tool */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="border border-border/60 shadow-md">
            <CardHeader>
              <CardTitle className="text-base font-bold">{t('rd.audit_title')}</CardTitle>
              <CardDescription>{t('rd.audit_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">

              {/* Success notification panel */}
              {showSuccessAlert && (
                <div className="mb-4 flex gap-2.5 rounded-xl bg-success/15 border border-success/30 p-3 text-success animate-bounce">
                  <CheckCircle className="size-5 shrink-0 mt-0.5" />
                  <div className="text-xs font-semibold leading-normal">{submittedMessage}</div>
                </div>
              )}

              <form onSubmit={handleAuditSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">{t('rd.audit.counselor')}</label>
                  <select
                    value={auditCounselor}
                    onChange={(e) => setAuditCounselor(e.target.value)}
                    className="w-full h-10 rounded-md border border-border bg-card px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Nodira Yusupova (Jizzax shahri PM)">Nodira Yusupova ({lang === 'uz' ? 'Jizzax PM' : 'Jizzax PM'})</option>
                    <option value="Alisher Qodirov (Sharof Rashidov 9-maktab)">Alisher Qodirov ({lang === 'uz' ? '9-sonli maktab' : 'School #9'})</option>
                    <option value="Zebiniso Halimova (Sharof Rashidov 1-maktab)">Zebiniso Halimova ({lang === 'uz' ? '1-ixtisoslashtirilgan maktab' : 'Specialized School #1'})</option>
                    <option value="Sardor Abduvaliyev (Zomin IT maktabi)">Sardor Abduvaliyev ({lang === 'uz' ? 'Zomin IT maktabi' : 'Zomin IT School'})</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">{t('rd.audit.quality')}</label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setAuditStars(star)}
                        className="text-yellow-500 hover:scale-110 transition-transform"
                      >
                        <Star
                          className="size-7"
                          fill={star <= auditStars ? 'currentColor' : 'none'}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-muted-foreground ml-2">({auditStars}.0 / 5.0)</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">{t('rd.audit.report')}</label>
                  <textarea
                    rows={4}
                    value={auditFeedback}
                    onChange={(e) => setAuditFeedback(e.target.value)}
                    placeholder={t('rd.audit.placeholder')}
                    className="w-full rounded-md border border-border bg-card p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-500 gap-2 text-xs">
                  <FileCheck className="size-4" />
                  {t('rd.audit.submit')}
                </Button>
              </form>

            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── District Participation Table ────────────────────────────────────── */}
      <section className="flex flex-col gap-3 text-left">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
            <ArrowUpDown className="size-5 text-blue-600" />
            {t('rd.district_table')}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">{t('rd.district_table_desc')}</p>
        </div>

        <Card className="border border-border/60 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-bold text-muted-foreground uppercase tracking-wide">{t('table.rank')}</th>
                  <th className="text-left px-4 py-3 font-bold text-muted-foreground uppercase tracking-wide">{t('table.district')}</th>
                  <th className="text-right px-4 py-3 font-bold text-muted-foreground uppercase tracking-wide">{t('metric.active_students')}</th>
                  <th className="text-right px-4 py-3 font-bold text-muted-foreground uppercase tracking-wide">{t('metric.total_students')}</th>
                  <th className="text-right px-4 py-3 font-bold text-muted-foreground uppercase tracking-wide">{t('table.participation')}</th>
                  <th className="text-center px-4 py-3 font-bold text-muted-foreground uppercase tracking-wide">{t('table.status')}</th>
                </tr>
              </thead>
              <tbody>
                {districtParticipationData.map((d, idx) => {
                  const label = participationLabel(d.participation)
                  const statusLabel = label === 'high' ? t('status.high') : label === 'medium' ? t('status.medium') : t('status.low')
                  const statusColor = label === 'high' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' : label === 'medium' ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/20' : 'text-red-600 bg-red-50 dark:bg-red-950/20'
                  const activeStudents = activeStudentsFromRatio(d.ecRate, d.students)
                  return (
                    <tr key={d.id} className={cn('border-b border-border/40 hover:bg-muted/30 transition-colors', idx === 0 && 'bg-emerald-50/30 dark:bg-emerald-950/10')}>
                      <td className="px-4 py-3 font-bold text-muted-foreground">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {lang === 'uz'
                          ? d.name.replace(' District', ' tumani').replace(' City', ' shahri')
                          : d.name}
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-600">{activeStudents.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{d.students.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={cn('h-full rounded-full', label === 'high' ? 'bg-emerald-500' : label === 'medium' ? 'bg-amber-400' : 'bg-red-500')}
                              style={{ width: `${d.participation}%` }}
                            />
                          </div>
                          <span className={cn('font-extrabold', participationColor(d.participation))}>{d.participation.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold', statusColor)}>{statusLabel}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  )
}
