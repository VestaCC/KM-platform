'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import {
  Users,
  Award,
  BookOpen,
  Briefcase,
  TrendingUp,
  Map,
  ShieldCheck,
  Building2,
  MapPin,
  GraduationCap,
  ChevronRight,
  UserCheck,
  Activity,
  X,
  BarChart3,
  AlertCircle,
  FileCheck,
  Download,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { mockSchools, monitoredStudents, type MockSchool } from '@/lib/mock-data'
import { uzbekistanGeography, getDistrictsByRegion, GEO_DEFAULTS, getLocalizedRegionName, getLocalizedDistrictName } from '@/lib/locations'
import { calcParticipationRate, activeStudentsFromRatio, weightedAvgParticipationRate, participationColor, participationBgColor, participationLabel } from '@/lib/stats'
import { useLanguage } from '@/lib/language-context'
import { generateExcelExport, type ExcelExportData, type ExportStudentData } from '@/lib/excel-exporter'

interface BasicOverviewProps {
  role: 'school_director' | 'republican_admin'
}

// All 14 regions from the canonical geography
const allGeoRegions = uzbekistanGeography

// Helper to resolve/generate school data for dynamic regional exploration
const getSchoolsForDistrict = (region: string, district: string): MockSchool[] => {
  if (region === 'Jizzax') {
    return mockSchools.filter((s) => s.district === district)
  }
  // Dynamic generation for other regions
  return [
    {
      name: `${district.replace(' tumani', '').replace(' shahri', '')} 1-sonli maktab`,
      district,
      totalStudents: 340,
      avgGpa: 3.32,
      avgSat: 1220,
      avgIelts: 6.0,
      vulnerabilityRate: 28,
      ecHoursRatio: 60,
      rankingByEC: { 'IT va Robototexnika': 18, 'Aniq fanlar': 12, 'Tillar': 14, 'Sport': 10, 'San\'at va Ijod': 6 }
    },
    {
      name: `${district.replace(' tumani', '').replace(' shahri', '')} ixtisoslashtirilgan IDUM`,
      district,
      totalStudents: 195,
      avgGpa: 3.65,
      avgSat: 1410,
      avgIelts: 6.8,
      vulnerabilityRate: 15,
      ecHoursRatio: 65,
      rankingByEC: { 'IT va Robototexnika': 22, 'Aniq fanlar': 14, 'Tillar': 15, 'Sport': 8, 'San\'at va Ijod': 6 }
    }
  ]
}

export function BasicOverviewView({ role }: BasicOverviewProps) {
  const isAdmin = role === 'republican_admin'
  const { t, lang } = useLanguage()

  // Excel Export States
  const [excelLoading, setExcelLoading] = useState(false)
  const [excelSuccess, setExcelSuccess] = useState(false)

  const handleExcelExport = () => {
    setExcelLoading(true)
    setExcelSuccess(false)
    setTimeout(() => {
      try {
        // Build student data from monitoredStudents (the canonical student list)
        const exportStudents: ExportStudentData[] = monitoredStudents.map((s) => ({
          name: s.name,
          grade: s.grade,
          school: s.grade.includes('11') ? 'Prezident Maktabi' : s.region + ' maktabi',
          region: s.region,
          gpa: s.gpa,
          sat: s.gpa >= 3.5 ? 1380 : s.gpa >= 3.0 ? 1200 : 1100,
          ielts: s.gpa >= 3.5 ? 6.5 : 5.5,
          major1: s.major?.split(' ')[0] || '—',
          major1Score: s.gpa >= 3.5 ? Math.round(75 + s.gpa * 5) : Math.round(60 + s.gpa * 5),
          major2: s.major?.includes(' ') ? s.major.split(' ').slice(-1)[0] : '—',
          major2Score: s.gpa >= 3.5 ? Math.round(70 + s.gpa * 5) : Math.round(55 + s.gpa * 5),
          clubs: s.clubs,
          olympiads: Object.values(s.achievementsByEC || {}).reduce((a, b) => a + b, 0),
          attendance: Math.round(75 + s.gpa * 5),
          counselor: s.region === 'Jizzax' ? 'Nodira Yusupova' : s.region === 'Toshkent' ? 'Alisher Qodirov' : 'Biriktirilmagan',
          isAtRisk: s.clubs === 0 || s.gpa < 3.0,
        }))

        const avgGpa = exportStudents.reduce((s, st) => s + st.gpa, 0) / exportStudents.length
        const avgSat = exportStudents.reduce((s, st) => s + st.sat, 0) / exportStudents.length
        const avgIelts = exportStudents.reduce((s, st) => s + st.ielts, 0) / exportStudents.length
        const uniqueSchools = new Set(exportStudents.map(s => s.school)).size
        const uniqueDistricts = new Set(exportStudents.map(s => s.region)).size

        const exportData: ExcelExportData = {
          students: exportStudents,
          overview: {
            totalStudents: isAdmin ? 12450 : 124,
            totalCounselors: isAdmin ? 156 : 2,
            totalSchools: isAdmin ? 214 : 1,
            totalDistricts: isAdmin ? 14 : 1,
            avgGpa: isAdmin ? 3.52 : 3.82,
            avgSat: isAdmin ? 1390 : 1450,
            avgIelts: isAdmin ? 6.8 : 7.2,
          },
        }

        generateExcelExport(exportData)
        setExcelSuccess(true)
        setTimeout(() => setExcelSuccess(false), 4000)
      } catch (err) {
        console.error('Excel export failed:', err)
      } finally {
        setExcelLoading(false)
      }
    }, 500) // Small delay for loading feedback
  }

  // Republican Explorer State
  const [selectedRegion, setSelectedRegion] = useState<string>(GEO_DEFAULTS.region)
  const [selectedDistrict, setSelectedDistrict] = useState<string>(GEO_DEFAULTS.district)
  const [selectedExplorerSchool, setSelectedExplorerSchool] = useState<MockSchool | null>(null)
  const [explorerModalOpen, setExplorerModalOpen] = useState(false)

  useEffect(() => {
    if (explorerModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [explorerModalOpen])

  // ── School Director data ───────────────────────────────────────────────────
  const presidentSchool = mockSchools.find((s) => s.name === 'Prezident Maktabi') || mockSchools[0]

  // Participation rate for this school
  const schoolParticipation = calcParticipationRate(
    activeStudentsFromRatio(presidentSchool.ecHoursRatio, presidentSchool.totalStudents),
    presidentSchool.totalStudents
  )
  const activeCount = activeStudentsFromRatio(presidentSchool.ecHoursRatio, presidentSchool.totalStudents)
  const inactiveCount = presidentSchool.totalStudents - activeCount

  // District average (all schools in same district)
  const districtSchools = mockSchools.filter((s) => s.district === presidentSchool.district)
  const districtAvgParticipation = weightedAvgParticipationRate(districtSchools)

  // Regional average (all mock schools)
  const regionalAvgParticipation = weightedAvgParticipationRate(mockSchools)

  // EC split — normalised to active participation (so total sum = 100%)
  const ecRaw = presidentSchool.rankingByEC
  const ecTotal = Object.values(ecRaw).reduce((s, v) => s + v, 0) || 1
  const ecCategories = Object.entries(ecRaw).map(([cat, val]) => ({
    cat,
    pct: parseFloat(((val / ecTotal) * schoolParticipation).toFixed(1)),
  }))
  // Adjust last item so all active categories exactly sum to schoolParticipation
  const ecSum = ecCategories.reduce((s, e) => s + e.pct, 0)
  if (ecCategories.length > 0) {
    const diff = schoolParticipation - ecSum
    ecCategories[ecCategories.length - 1].pct = parseFloat((ecCategories[ecCategories.length - 1].pct + diff).toFixed(1))
  }
  const ecColors = ['bg-blue-600', 'bg-indigo-600', 'bg-violet-600', 'bg-cyan-500', 'bg-emerald-600', 'bg-amber-500']

  // School Director layout
  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in text-left">
        {/* Excel Export Toast */}
        {excelSuccess && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 shadow-2xl dark:border-emerald-800 dark:bg-emerald-950/90 animate-fade-in">
            <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Excel fayl muvaffaqiyatli yaratildi!</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">XLSX hujjat yuklab olindi.</p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-2xl font-bold text-foreground">{t('tier.school')}</h1>
            <p className="text-sm text-muted-foreground">
              {t('tier.school_desc')} — <strong className="text-blue-600">{presidentSchool.name}</strong> ({presidentSchool.district})
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs font-bold h-9 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950/30 transition-all"
            onClick={handleExcelExport}
            disabled={excelLoading}
          >
            {excelLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            {excelLoading ? 'Yuklanmoqda...' : 'Excel Export'}
          </Button>
        </div>

        {/* ── HERO: Participation Rate Card ─────────────────────────────────── */}
        <Card className="border-2 border-blue-600/40 bg-gradient-to-br from-blue-950/10 to-slate-900/5 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Big percentage */}
              <div className="flex flex-col items-center justify-center size-28 rounded-3xl bg-blue-600/10 border-2 border-blue-600/30 shrink-0">
                <span className={cn('font-heading text-4xl font-extrabold', participationColor(schoolParticipation))}>
                  {schoolParticipation.toFixed(1)}%
                </span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wide mt-1">Faollik</span>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground">{t('school.hero_title')}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('metric.participation_formula')}</p>
                </div>

                {/* Breakdown bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-600">{t('school.students_active')}: {activeCount}</span>
                    <span className="text-slate-400">{t('school.students_inactive')}: {inactiveCount}</span>
                  </div>
                  <div className="h-5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-500 rounded-l-full transition-all duration-700"
                      style={{ width: `${schoolParticipation}%` }}
                    />
                    <div
                      className="h-full bg-slate-300 dark:bg-slate-600 rounded-r-full flex-1"
                    />
                  </div>
                </div>

                {/* Comparison benchmarks */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="text-center rounded-xl bg-muted/50 border border-border/40 py-2">
                    <p className={cn('font-heading text-base font-extrabold', participationColor(schoolParticipation))}>{schoolParticipation.toFixed(1)}%</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wide">{t('table.school')}</p>
                  </div>
                  <div className="text-center rounded-xl bg-muted/50 border border-border/40 py-2">
                    <p className={cn('font-heading text-base font-extrabold', participationColor(districtAvgParticipation))}>{districtAvgParticipation.toFixed(1)}%</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wide">{t('metric.district_avg')}</p>
                  </div>
                  <div className="text-center rounded-xl bg-muted/50 border border-border/40 py-2">
                    <p className={cn('font-heading text-base font-extrabold', participationColor(regionalAvgParticipation))}>{regionalAvgParticipation.toFixed(1)}%</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-wide">{t('metric.regional_avg')}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Secondary KPI Grid ───────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border border-border/60">
            <CardContent className="flex items-center gap-4 p-5">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Users className="size-6" />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold text-foreground">{presidentSchool.totalStudents}</p>
                <p className="text-xs font-semibold text-muted-foreground">{t('metric.total_students')}</p>
                <p className="text-[11px] text-green-600 font-semibold mt-0.5">Davomat: 98%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/60">
            <CardContent className="flex items-center gap-4 p-5">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Award className="size-6" />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold text-foreground">{presidentSchool.avgGpa.toFixed(2)} / 4.0</p>
                <p className="text-xs font-semibold text-muted-foreground">{t('table.gpa')} o'rtacha ko'rsatkichi</p>
                <p className="text-[11px] text-blue-600 font-semibold mt-0.5">Tumanda 1-o'rin</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/60">
            <CardContent className="flex items-center gap-4 p-5">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <GraduationCap className="size-6" />
              </span>
              <div>
                <p className="font-heading text-2xl font-extrabold text-foreground">SAT {presidentSchool.avgSat} / IELTS {presidentSchool.avgIelts.toFixed(1)}</p>
                <p className="text-xs font-semibold text-muted-foreground">Imtihon ballari o'rtachasi</p>
                <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">100% test topshirgan</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* EC activity breakdown (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <Card className="border border-border/60 shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-bold flex items-center gap-1.5 text-blue-600">
                  <Activity className="size-5" />
                  {t('metric.participation_rate')} — Yo'nalishlar bo'yicha
                </CardTitle>
                <CardDescription>Darsdan tashqari faoliyat turlari bo'yicha taqsimot (umumiy faollikka nisbatan %):</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                {ecCategories.map(({ cat, pct }, idx) => (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-muted-foreground">{cat}</span>
                      <span className="text-foreground font-bold">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="h-3.5 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', ecColors[idx % ecColors.length])}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                ))}
                {/* Inactive students row */}
                {(() => {
                  const idlePct = Math.max(0, 100 - schoolParticipation)
                  return (
                    <div className="space-y-1 pt-2 border-t border-border/40 group relative">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-muted-foreground">
                          {lang === 'uz' ? "Faoliyatsiz / To'garaklarsiz" : "Not Participating / Inactive"}
                        </span>
                        <span className="text-rose-600 dark:text-rose-400 font-semibold">{idlePct.toFixed(1)}%</span>
                      </div>
                      <div className="h-3.5 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
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
              </CardContent>
            </Card>
          </div>

          {/* School goals & counselors (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Card className="border border-border/60 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <UserCheck className="size-5 text-indigo-600" />
                  Maktab maslahatchilari
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-2 text-xs font-semibold">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-muted/40 border">
                  <div>
                    <p className="font-bold text-foreground">Nodira Yusupova</p>
                    <p className="text-[10px] text-muted-foreground">Bosh akademik maslahatchi</p>
                  </div>
                  <span className="text-[10px] text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">Faol</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-muted/40 border">
                  <div>
                    <p className="font-bold text-foreground">Dilshod Murodov</p>
                    <p className="text-[10px] text-muted-foreground">Darsdan tashqari faoliyat koordinatori</p>
                  </div>
                  <span className="text-[10px] text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full">Faol</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/60 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-slate-700 dark:text-slate-300">Maktab maqsadlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 pt-2 text-[11px] font-semibold text-muted-foreground">
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span>O'rtacha SAT ballini 1480 ga ko'tarish</span>
                  <span className="text-yellow-600">Jarayonda</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b">
                  <span>100% ijtimoiy himoyaga muhtojlarni qamrab olish</span>
                  <span className="text-green-600 font-bold">Bajarildi</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span>Darsdan tashqari faollik darajasi &gt; 85%</span>
                  <span className={cn('font-bold', participationColor(schoolParticipation))}>{schoolParticipation.toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Republican Admin view with exploration panels
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region)
    const districts = getDistrictsByRegion(region)
    setSelectedDistrict(districts[0]?.name ?? '')
  }

  // Nationwide participation data — deterministic mock per region
  const nationwideData = uzbekistanGeography.map((region, i) => {
    const ecRate = 42 + ((i * 11 + 7) % 45) // deterministic 42–87%
    const students = 8000 + (i * 3200) % 45000
    const participation = calcParticipationRate(activeStudentsFromRatio(ecRate, students), students)
    return { name: region.name, type: region.type, participation, students, ecRate }
  }).sort((a, b) => b.participation - a.participation)

  const nationalAvgParticipation = nationwideData.reduce((s, r) => s + r.participation, 0) / (nationwideData.length || 1)

  // Generate explorer school cards: use real mock data for Jizzakh/Sharof Rashidov,
  // otherwise synthesise cards from geography school names to keep full coverage
  const explorerSchools: MockSchool[] = (() => {
    const geoDistricts = getDistrictsByRegion(selectedRegion)
    const geoDistrict = geoDistricts.find((d) => d.name === selectedDistrict)
    const mockResult = getSchoolsForDistrict(selectedRegion, selectedDistrict)
    if (mockResult.length > 0) return mockResult
    // Synthesise from geography names
    return (geoDistrict?.schools ?? []).slice(0, 3).map((s, i) => ({
      name: s.name,
      district: selectedDistrict,
      totalStudents: 200 + i * 80,
      avgGpa: parseFloat((3.1 + i * 0.2).toFixed(2)),
      avgSat: 1100 + i * 80,
      avgIelts: parseFloat((5.5 + i * 0.3).toFixed(1)),
      vulnerabilityRate: 20 + i * 5,
      ecHoursRatio: 10 + i * 4,
      rankingByEC: { 'Aniq fanlar': 17, 'Tabiiy fanlar': 16, 'Tillar / Gumanitar': 20, 'Loyiha': 17, 'Sport': 18, 'Ijodiy / San\'at': 12 },
    }))
  })()

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-left">
      {/* Excel Export Toast */}
      {excelSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 shadow-2xl dark:border-emerald-800 dark:bg-emerald-950/90 animate-fade-in">
          <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <p className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Excel fayl muvaffaqiyatli yaratildi!</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">XLSX hujjat yuklab olindi.</p>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-bold text-foreground">{t('tier.national')}</h1>
          <p className="text-sm text-muted-foreground">{t('tier.national_desc')}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-xs font-bold h-9 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950/30 transition-all"
          onClick={handleExcelExport}
          disabled={excelLoading}
        >
          {excelLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Download className="size-4" />
          )}
          {excelLoading ? 'Yuklanmoqda...' : 'Excel Export'}
        </Button>
      </div>

      {/* Main macro KPIs */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="border border-border/60 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-blue-500/80">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <p className="font-heading text-2xl font-extrabold text-foreground">12,450 nafar</p>
              <p className="text-xs font-semibold text-muted-foreground">Tizimdagi Jami O'quvchilar</p>
              <p className="text-[11px] text-green-600 font-semibold mt-0.5">+14.2% o'sish</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-400">
              <FileCheck className="w-5 h-5" />
            </span>
            <div>
              <p className="font-heading text-2xl font-extrabold text-foreground">IELTS 6.8 / SAT 1390</p>
              <p className="text-xs font-semibold text-muted-foreground">O'rtacha imtihon ko'rsatkichlari</p>
              <p className="text-[11px] text-green-600 font-semibold mt-0.5">2025 yilda: 6.5</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <p className="font-heading text-2xl font-extrabold text-foreground">3.52 / 4.0</p>
              <p className="text-xs font-semibold text-muted-foreground">O'rtacha GPA ko'rsatkichi</p>
              <p className="text-[11px] text-blue-600 font-semibold mt-0.5">Eng yaxshi ko'rsatkich</p>
            </div>
          </CardContent>
        </Card>

        {/* 4th KPI: National EC Participation */}
        <Card className="border border-border/60 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-blue-500/80">
              <Activity className="w-5 h-5" />
            </span>
            <div>
              <p className={cn('font-heading text-2xl font-extrabold', participationColor(nationalAvgParticipation))}>{nationalAvgParticipation.toFixed(1)}%</p>
              <p className="text-xs font-semibold text-muted-foreground">{t('metric.national_avg')}</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">{nationwideData.length} ta hudud nazoratda</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Nationwide Participation Bar Chart ──────────────────────────── */}
      <Card className="border border-border/60 shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-emerald-600" />
            <CardTitle className="text-base font-bold">{t('admin.national_title')}</CardTitle>
          </div>
          <CardDescription>{t('admin.national_desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {nationwideData.map((region, idx) => {
            const label = participationLabel(region.participation)
            return (
              <div key={region.name} className="space-y-0.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center gap-1.5 font-semibold text-foreground">
                    <span className="text-[10px] text-muted-foreground w-5 text-right">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx+1}`}</span>
                    {getLocalizedRegionName(region.name, lang)}
                  </span>
                  <span className={cn('font-extrabold', participationColor(region.participation))}>{region.participation.toFixed(1)}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', label === 'high' ? 'bg-emerald-500' : label === 'medium' ? 'bg-amber-400' : 'bg-red-500')}
                    style={{ width: `${region.participation}%` }}
                  />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Republican Explorer Section */}
      <section className="flex flex-col gap-4 border-t border-border pt-6 mt-2">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground flex items-center gap-2">
            <Map className="size-5.5 text-blue-600" />
            {t('tier.district')} — Interaktiv Statistik Tahlil
          </h2>
          <p className="text-xs text-muted-foreground">
            Darsdan tashqari faollik ma'lumotlarini ko'rish uchun hudud, tuman va maktabni tanlang:
          </p>
        </div>

        <Card className="border border-border/60 shadow-md">
          <CardContent className="p-5 space-y-5">
            {/* Region select buttons — all 14 regions */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">1. Viloyat / Respublika / Poytaxt</span>
              <div className="flex flex-wrap gap-1.5">
                {allGeoRegions.map((r) => (
                  <Button
                    key={r.id}
                    type="button"
                    variant={selectedRegion === r.name ? 'default' : 'outline'}
                    onClick={() => handleRegionSelect(r.name)}
                    className="text-xs font-semibold px-3 py-1.5 h-8 rounded-full"
                  >
                    <span className="text-[9px] opacity-60 mr-1">{r.type === 'Republic' ? '🏛' : r.type === 'Capital' ? '🏙' : '🗺'}</span>
                    {getLocalizedRegionName(r.name, lang)}
                  </Button>
                ))}
              </div>
            </div>

            {/* District select buttons — from canonical geography */}
            <div className="space-y-2 border-t border-border/40 pt-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">2. Tuman / Shahar — {getDistrictsByRegion(selectedRegion).length} ta tuman</span>
              <div className="flex flex-wrap gap-1.5">
                {getDistrictsByRegion(selectedRegion).map((d) => (
                  <Button
                    key={d.id}
                    type="button"
                    variant={selectedDistrict === d.name ? 'secondary' : 'ghost'}
                    onClick={() => setSelectedDistrict(d.name)}
                    className={cn(
                      'text-xs font-semibold px-3 py-1.5 h-8 rounded-full border border-transparent',
                      selectedDistrict === d.name && 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-foreground'
                    )}
                  >
                    {getLocalizedDistrictName(d.name, lang)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Schools Grid Selector */}
            <div className="space-y-2 border-t border-border/40 pt-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">3. Maktabni tanlang (Ichki statistikasi uchun)</span>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {explorerSchools.map((school) => (
                  <div
                    key={school.name}
                    onClick={() => {
                      setSelectedExplorerSchool(school)
                      setExplorerModalOpen(true)
                    }}
                    className="cursor-pointer border border-border/60 hover:border-primary/50 hover:shadow-md transition-all duration-200 rounded-xl p-4 bg-card flex justify-between items-center group"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate max-w-[200px]">{school.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{getLocalizedDistrictName(school.district, lang)}</p>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Admin Strategy */}
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-base font-bold text-foreground">Strategik Nazorat Ko'rsatkichlari</h2>
        <Card className="border border-border/60 shadow-md">
          <CardContent className="space-y-4 p-5 text-xs font-semibold text-muted-foreground">
            <div className="flex gap-3 items-start">
              <span className="flex size-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-bold dark:bg-blue-900/30 shrink-0">1</span>
              <div>
                <h4 className="text-xs font-bold text-foreground">Milliy STEM darajasini o'stirish</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">Xalqaro IT va dasturlash yo'nalishlarida ta'lim oluvchilar ulushini 60% ga etkazish.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start border-t border-border/40 pt-3">
              <span className="flex size-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-bold dark:bg-blue-900/30 shrink-0">2</span>
              <div>
                <h4 className="text-xs font-bold text-foreground">Kam ta'minlangan yoshlar dasturlari</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">Vulnerability balli yuqori bo'lgan maktablarga xalqaro imtihon vaucherlarini bepul tarqatish.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* DYNAMIC SCHOOL INTERNAL STATISTICS MODAL POPUP FOR REPUBLICAN ADMIN */}
      {explorerModalOpen && selectedExplorerSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in text-left">
          <Card className="w-full max-w-lg bg-card border border-border shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <CardHeader className="pt-8 pb-3 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2 leading-normal">
                  <Building2 className="size-5 text-blue-600" />
                  {selectedExplorerSchool.name} - Ichki Tahliliy Statistikasi
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Hudud: <strong>{getLocalizedRegionName(selectedRegion, lang)}</strong> · Tuman: <strong>{getLocalizedDistrictName(selectedExplorerSchool.district, lang)}</strong>
                </CardDescription>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setExplorerModalOpen(false)}>
                <X className="size-5" />
              </Button>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* core statistics */}
              <div className="grid gap-3 grid-cols-3 text-center">
                <div className="bg-muted/30 p-2.5 rounded-xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground font-bold flex items-center justify-center gap-1.5"><Users className="w-3.5 h-3.5 text-blue-500/80" /> O'quvchilar soni</p>
                  <p className="text-sm font-extrabold text-foreground mt-0.5">{selectedExplorerSchool.totalStudents} nafar</p>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground font-bold flex items-center justify-center gap-1.5"><Award className="w-3.5 h-3.5 text-slate-400" /> O'rtacha GPA</p>
                  <p className="text-sm font-extrabold text-foreground mt-0.5">{selectedExplorerSchool.avgGpa.toFixed(2)}</p>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground font-bold flex items-center justify-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-slate-400" /> Kam ta'minlanganlik</p>
                  <p className="text-sm font-extrabold text-red-600 dark:text-red-400 mt-0.5">{selectedExplorerSchool.vulnerabilityRate}%</p>
                </div>
              </div>

              {/* exam performance averages */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">IMTIHON NATIJALARI O'RTACHASI</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="p-3 bg-muted/40 border border-border/30 rounded-xl flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">O'rtacha IELTS:</span>
                    <span className="font-extrabold text-foreground">{selectedExplorerSchool.avgIelts.toFixed(1)}</span>
                  </div>
                  <div className="p-3 bg-muted/40 border border-border/30 rounded-xl flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">O'rtacha SAT:</span>
                    <span className="font-extrabold text-foreground">{selectedExplorerSchool.avgSat}</span>
                  </div>
                </div>
              </div>

              {/* EC breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">DARSDAN TASHQARI FAOLLIK (YO'NALISHLAR BO'YICHA)</h4>
                <p className="text-[10px] text-muted-foreground -mt-1">Jami ishtirokchilar ulushi bo'yicha (100% = barcha o'quvchilar)</p>
                <div className="grid gap-2 text-xs font-semibold">
                  {(() => {
                    const activeStudents = activeStudentsFromRatio(selectedExplorerSchool.ecHoursRatio, selectedExplorerSchool.totalStudents)
                    const schoolParticipationRate = calcParticipationRate(activeStudents, selectedExplorerSchool.totalStudents)
                    const entries = Object.entries(selectedExplorerSchool.rankingByEC) as [string, number][]
                    const total = entries.reduce((sum, [, v]) => sum + v, 0) || 1
                    
                    const ecCats = entries.map(([category, raw]) => ({
                      category,
                      pct: parseFloat(((raw / total) * schoolParticipationRate).toFixed(1))
                    }))
                    
                    const ecSum = ecCats.reduce((s, c) => s + c.pct, 0)
                    if (ecCats.length > 0) {
                      const diff = schoolParticipationRate - ecSum
                      ecCats[ecCats.length - 1].pct = parseFloat((ecCats[ecCats.length - 1].pct + diff).toFixed(1))
                    }

                    const barColors = [
                      'bg-blue-600',
                      'bg-indigo-500',
                      'bg-violet-500',
                      'bg-cyan-500',
                      'bg-emerald-500',
                      'bg-amber-500',
                    ]
                    
                    return (
                      <>
                        {ecCats.map(({category, pct}, idx) => (
                          <div key={category} className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">{category}</span>
                              <span className="font-extrabold text-foreground">{pct.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                              <div
                                className={`h-full ${barColors[idx % barColors.length]} rounded-full transition-all duration-500`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                        {/* Inactive students row inside modal */}
                        {(() => {
                          const activeStudents = activeStudentsFromRatio(selectedExplorerSchool.ecHoursRatio, selectedExplorerSchool.totalStudents)
                          const schoolParticipationRate = calcParticipationRate(activeStudents, selectedExplorerSchool.totalStudents)
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
                                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
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
                      </>
                    )
                  })()}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(Object.entries(selectedExplorerSchool.rankingByEC) as [string, number][]).map(([cat], idx) => {
                    const dotColors = ['bg-blue-600','bg-indigo-500','bg-violet-500','bg-cyan-500','bg-emerald-500','bg-amber-500']
                    return (
                      <span key={cat} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className={`size-2 rounded-full ${dotColors[idx % dotColors.length]}`} />
                        {cat}
                      </span>
                    )
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border flex justify-end gap-2 pt-3">
              <Button className="bg-primary text-white text-xs h-9" onClick={() => setExplorerModalOpen(false)}>
                Yopish
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
