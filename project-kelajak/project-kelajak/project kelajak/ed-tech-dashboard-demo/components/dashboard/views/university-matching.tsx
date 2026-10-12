'use client'

import { useState } from 'react'
import {
  Building2,
  Globe,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { calculate189Score } from '@/lib/simulator'
import { useLanguage } from '@/lib/language-context'

interface UniversityMatchingProps {
  student: {
    major1: string
    major2: string
    gpa: number
    ielts: number
    sat: number
    verifiedCerts: string[]
    verifiedCertsDetails?: any[]
  }
}

export function UniversityMatchingSuite({ student }: UniversityMatchingProps) {
  const { lang, t } = useLanguage()
  const [activeSubTab, setActiveSubTab] = useState<'national' | 'international'>('national')

  const studentScore = calculate189Score({
    major1: student.major1,
    major2: student.major2,
    gpa: student.gpa,
    ielts: student.ielts,
    sat: student.sat,
    verifiedCerts: student.verifiedCerts,
    verifiedCertsDetails: student.verifiedCertsDetails || [],
  })

  // JizPI and State Baseline Targets (National)
  const nationalTargets = [
    {
      id: 1,
      institution: lang === 'uz' ? "Jizzax Politexnika Instituti" : "Jizzakh Polytechnic Institute",
      major: student.major1 === 'Mathematics' 
        ? (lang === 'uz' ? "Axborot Texnologiyalari va Dasturlash" : "Information Technology & Software Engineering")
        : (lang === 'uz' ? "Avtomobilsozlik va Mashinasozlik" : "Automobile & Mechanical Engineering"),
      field: lang === 'uz' ? 'Aniq Fanlar' : 'Exact Sciences',
      grantThreshold: 138.4,
      contractThreshold: 98.2,
    },
    {
      id: 2,
      institution: lang === 'uz' ? "Jizzax Davlat Pedagogika Universiteti" : "Jizzakh State Pedagogical University",
      major: student.major1 === 'Mathematics' 
        ? (lang === 'uz' ? "Matematika va Informatika O'qitish" : "Teaching Mathematics & Informatics")
        : (lang === 'uz' ? "Fizika va Astronomiya Metodikasi" : "Physics & Astronomy Methodology"),
      field: lang === 'uz' ? 'Pedagogika' : 'Pedagogy',
      grantThreshold: 145.8,
      contractThreshold: 112.4,
    },
    {
      id: 3,
      institution: lang === 'uz' ? "Toshkent Axborot Texnologiyalari Universiteti Jizzax Filiali" : "Tashkent University of Information Technologies Jizzakh Branch",
      major: lang === 'uz' ? "Kiberxavfsizlik Muhandisligi" : "Cybersecurity Engineering",
      field: lang === 'uz' ? 'Aniq Fanlar' : 'Exact Sciences',
      grantThreshold: 154.6,
      contractThreshold: 121.2,
    },
  ]

  // International Targets
  const internationalTargets = [
    {
      institution: 'New Uzbekistan University',
      major: student.major1 === 'Mathematics' ? 'Software Engineering' : 'Chemical Engineering',
      ieltsTarget: 6.5,
      satTarget: 1350,
      gpaTarget: 3.5,
      isGrantAvailable: true,
    },
    {
      institution: 'Inha University in Tashkent',
      major: 'Computer Science & Engineering',
      ieltsTarget: 6.0,
      satTarget: 1200,
      gpaTarget: 3.0,
      isGrantAvailable: true,
    },
    {
      institution: 'Westminster International University in Tashkent',
      major: 'Business Information Systems',
      ieltsTarget: 6.0,
      satTarget: undefined,
      gpaTarget: 3.0,
      isGrantAvailable: false,
    },
  ]

  return (
    <Card className="border border-border/60 shadow-md">
      <CardHeader className="pb-3 border-b border-border/50 bg-slate-50/40 dark:bg-slate-900/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-left">
            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <Building2 className="size-5 text-blue-600" />
              {lang === 'uz' ? 'OTM Kirish Mosligi' : 'University Matching Suite'}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              {lang === 'uz'
                ? 'Akademik yutuqlaringiz va taxminiy DTM ballariga asoslangan oliygohlar mosligi.'
                : 'Match analysis of universities based on your academic achievements and predicted DTM points.'}
            </CardDescription>
          </div>
          {/* Quick stats badge */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-center shrink-0">
            <span className="text-[10px] font-bold text-slate-500">
              {lang === 'uz' ? 'TAXMINIY DTM BALLARI:' : 'PREDICTED DTM POINTS:'}
            </span>
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">{studentScore.totalScore.toFixed(1)} / 189.0</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <Tabs value={activeSubTab} onValueChange={(v) => setActiveSubTab(v as any)} className="w-full">
          <TabsList className="grid grid-cols-2 max-w-[400px] mb-6 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
            <TabsTrigger value="national" className="rounded-lg text-xs font-bold py-2 gap-1.5">
              <Building2 className="size-3.5" />
              {lang === 'uz' ? 'Milliy OTMlar' : 'National Universities'}
            </TabsTrigger>
            <TabsTrigger value="international" className="rounded-lg text-xs font-bold py-2 gap-1.5">
              <Globe className="size-3.5" />
              {lang === 'uz' ? 'Xalqaro OTMlar' : 'International Universities'}
            </TabsTrigger>
          </TabsList>

          {/* NATIONAL UNIVERSITIES TAB */}
          <TabsContent value="national" className="space-y-4 outline-none">
            {/* Warnings and thresholds note */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl p-3.5 text-xs text-blue-800 dark:text-blue-300 space-y-1.5 text-left">
              <h4 className="font-bold flex items-center gap-1.5">
                <AlertCircle className="size-4 text-blue-600" />
                {lang === 'uz' ? 'Respublika Davlat Imtihoni Qoidalari' : 'Republic State Exam Rules'}
              </h4>
              <p className="leading-relaxed">
                {lang === 'uz' ? (
                  <>Taqsimotda ishtirok etish uchun rasmiy eng kam ball chegarasi: <strong>Davlat granti uchun kamida 68.0 ball</strong>, oddiy <strong>To'lov-shartnoma uchun kamida 56.7 ball</strong> etib belgilangan.</>
                ) : (
                  <>Official minimum score threshold for admission participation: <strong>State Grant requires at least 68.0 points</strong>, and standard <strong>Paid Contract requires at least 56.7 points</strong>.</>
                )}
              </p>
            </div>

            {/* Targets grid */}
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
              {nationalTargets.map((target) => {
                const meetsGrant = studentScore.totalScore >= target.grantThreshold
                const meetsContract = studentScore.totalScore >= target.contractThreshold
                const hasStateMin = studentScore.totalScore >= 56.7

                let badgeColor = 'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                let label = lang === 'uz' ? 'Ball yetarli emas' : 'Insufficient Score'

                if (meetsGrant) {
                  badgeColor = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-500/20'
                  label = lang === 'uz' ? 'Davlat granti asosida tavsiya etildi' : 'State Grant Recommended'
                } else if (meetsContract) {
                  badgeColor = 'bg-blue-100 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 border border-blue-500/20'
                  label = lang === 'uz' ? "To'lov-shartnoma asosida tavsiya etildi" : 'Paid Contract Recommended'
                } else if (hasStateMin) {
                  badgeColor = 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-500/20'
                  label = lang === 'uz' ? 'Minimal ball yetarli' : 'Minimal Score Met'
                }

                return (
                  <Card key={target.id} className="border border-border/60 bg-card/60 shadow-sm relative overflow-hidden transition-all hover:shadow-md duration-300 hover:translate-y-[-2px] text-left">
                    <CardContent className="p-4 flex flex-col justify-between h-full min-h-[190px] gap-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start gap-1">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full shrink-0">
                            {target.field}
                          </span>
                          <Badge className={`text-[9px] font-bold py-0.5 px-2 rounded-full border-0 leading-tight ${badgeColor}`}>
                            {label}
                          </Badge>
                        </div>
                        <h4 className="font-bold text-sm leading-snug text-foreground">{target.major}</h4>
                        <p className="text-[11px] text-muted-foreground">{target.institution}</p>
                      </div>

                      <div className="space-y-2.5 border-t border-border/40 pt-3 text-xs font-semibold">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-muted-foreground">{lang === 'uz' ? 'Davlat granti' : 'State Grant'}:</span>
                          <span className="font-extrabold text-foreground">{target.grantThreshold} {lang === 'uz' ? 'ball' : 'pts'}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-muted-foreground">{lang === 'uz' ? "To'lov-shartnoma" : 'Paid Contract'}:</span>
                          <span className="font-extrabold text-foreground">{target.contractThreshold} {lang === 'uz' ? 'ball' : 'pts'}</span>
                        </div>

                        {/* Visual bar comparisons */}
                        <div className="space-y-1 pt-1.5">
                          <div className="flex justify-between text-[9px] text-muted-foreground">
                            <span>GPA / Imtihon ball:</span>
                            <span>{studentScore.totalScore.toFixed(1)} / {target.grantThreshold} pts</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                meetsGrant ? 'bg-emerald-500' : meetsContract ? 'bg-blue-500' : 'bg-slate-400'
                              }`}
                              style={{ width: `${Math.min(100, (studentScore.totalScore / target.grantThreshold) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* INTERNATIONAL UNIVERSITIES TAB */}
          <TabsContent value="international" className="space-y-4 outline-none">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {internationalTargets.map((target) => {
                const meetsIelts = student.ielts >= target.ieltsTarget
                const meetsSat = !target.satTarget || student.sat >= target.satTarget
                const meetsGpa = student.gpa >= target.gpaTarget
                const meetsAll = meetsIelts && meetsSat && meetsGpa

                return (
                  <Card key={target.institution} className="border border-border/60 bg-card/60 shadow-sm relative overflow-hidden transition-all hover:shadow-md duration-300 hover:translate-y-[-2px] text-left">
                    <CardContent className="p-4 flex flex-col justify-between h-full min-h-[190px] gap-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full shrink-0">
                            {lang === 'uz' ? 'XALQARO FILIAL' : 'INTERNATIONAL BRANCH'}
                          </span>
                          <Badge className={`text-[9px] font-bold py-0.5 px-2 rounded-full border-0 ${meetsAll ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-500/20' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 border border-amber-500/20'}`}>
                            {meetsAll 
                              ? (lang === 'uz' ? 'Kirish mos keladi' : 'Requirements Met') 
                              : (lang === 'uz' ? 'Natija yetarli emas' : 'Requirements Not Met')}
                          </Badge>
                        </div>
                        <h4 className="font-bold text-sm leading-snug text-foreground flex items-center gap-1.5">
                          {target.institution}
                          <ArrowUpRight className="size-3.5 text-muted-foreground shrink-0" />
                        </h4>
                      </div>

                      <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-3 text-center text-xs">
                        <div className="p-2 rounded-lg bg-slate-100/55 dark:bg-slate-900/60 border border-slate-200/20 text-center">
                          <span className="text-[9px] text-muted-foreground font-bold uppercase block">IELTS</span>
                          <span className={`text-xs font-bold ${meetsIelts ? 'text-emerald-600' : 'text-amber-500'}`}>
                            {student.ielts} / {target.ieltsTarget}
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100/55 dark:bg-slate-900/60 border border-slate-200/20 text-center">
                          <span className="text-[9px] text-muted-foreground font-bold uppercase block">SAT</span>
                          <span className={`text-xs font-bold ${meetsSat ? 'text-emerald-600' : 'text-amber-500'}`}>
                            {target.satTarget ? `${student.sat} / ${target.satTarget}` : 'N/A'}
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-100/55 dark:bg-slate-900/60 border border-slate-200/20 text-center">
                          <span className="text-[9px] text-muted-foreground font-bold uppercase block">GPA</span>
                          <span className={`text-xs font-bold ${meetsGpa ? 'text-emerald-600' : 'text-amber-500'}`}>
                            {student.gpa.toFixed(2)} / {target.gpaTarget}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-1.5 border-t border-border/30">
                        <span>
                          {lang === 'uz' ? 'Grant imkoniyati' : 'Scholarship Option'}: {target.isGrantAvailable ? (lang === 'uz' ? 'Mavjud' : 'Available') : (lang === 'uz' ? 'Mavjud emas' : 'Not Available')}
                        </span>
                        {meetsAll ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="size-3" /> {lang === 'uz' ? 'Talablarga mos keladi' : 'Meets Requirements'}
                          </span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                            {lang === 'uz' ? "Qo'shimcha tayyorgarlik zarur" : "Additional Prep Required"}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
