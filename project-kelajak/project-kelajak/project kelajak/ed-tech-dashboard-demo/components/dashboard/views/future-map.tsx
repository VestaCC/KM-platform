'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, CheckCircle2, AlertCircle, Sparkles, Trophy, Landmark, DollarSign, Users, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FutureMapProps {
  student: {
    gpa: number
    ielts: number
    sat: number
    name: string
  }
}

type UniversityKey = 'nuu' | 'uob' | 'mit' | 'oxford'

interface UniversityData {
  name: string
  location: string
  globalRank: number
  acceptanceRate: number
  tuitionFee: string
  totalStudents: string
  requirements: {
    gpa: number
    ielts: number
    sat: number
  }
  description: string
  scholarshipInfo: string
}

const universities: Record<UniversityKey, UniversityData> = {
  nuu: {
    name: 'New Uzbekistan University',
    location: 'Toshkent, O\'zbekiston',
    globalRank: 180,
    acceptanceRate: 25,
    tuitionFee: '32 mln so\'m / semestr',
    totalStudents: '2,400',
    requirements: {
      gpa: 3.8,
      ielts: 7.0,
      sat: 1450,
    },
    description: 'O\'zbekistondagi eng nufuzli davlat texnika universiteti bo\'lib, xalqaro ilg\'or o\'quv dasturlari va innovatsion laboratoriyalarni taqdim etadi.',
    scholarshipInfo: 'Prezident granti va to\'liq davlat stipendiyalari mavjud.',
  },
  uob: {
    name: 'University of Birmingham',
    location: 'Birmingem, Buyuk Britaniya',
    globalRank: 84,
    acceptanceRate: 15,
    tuitionFee: '£26,000 / yil',
    totalStudents: '38,000',
    requirements: {
      gpa: 3.9,
      ielts: 7.5,
      sat: 1500,
    },
    description: 'Dunyoning eng nufuzli TOP-100 (QS World) oliygohlaridan biri. Hamkorlik va ilg\'or tadqiqotlar bo\'yicha yetakchi hisoblanadi.',
    scholarshipInfo: 'Kelajak Jamg\'armasi hamda El-yurt umidi jamg\'armasi grantlari amal qiladi.',
  },
  mit: {
    name: 'Massachusetts Institute of Technology',
    location: 'Kembrij, AQSh',
    globalRank: 1,
    acceptanceRate: 4,
    tuitionFee: '$58,000 / yil',
    totalStudents: '11,500',
    requirements: {
      gpa: 4.0,
      ielts: 8.0,
      sat: 1570,
    },
    description: 'Dunyodagi eng yetakchi muhandislik va texnologiya universiteti. Dunyoning eng iqtidorli yoshlarini jamlaydi.',
    scholarshipInfo: 'Ehtiyojga qarab to\'liq moliyaviy yordam (Need-blind financial aid) taqdim etiladi.',
  },
  oxford: {
    name: 'University of Oxford',
    location: 'Oksford, Buyuk Britaniya',
    globalRank: 3,
    acceptanceRate: 14,
    tuitionFee: '£38,500 / yil',
    totalStudents: '26,000',
    requirements: {
      gpa: 3.95,
      ielts: 7.5,
      sat: 1530,
    },
    description: 'Ingliz tilidagi dunyoning eng qadimgi va eng nufuzli universiteti, yuqori darajadagi ta\'lim tizimi va chuqur kollegial tizimi bilan mashhur.',
    scholarshipInfo: 'Rhodes va Oxford-Clarendon stipendiyalari mavjud.',
  }
}

export function FutureMapView({ student }: FutureMapProps) {
  const [targetUni, setTargetUni] = useState<UniversityKey>('nuu')
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    if (popupOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [popupOpen])
  const uni = universities[targetUni]

  const current = student

  // Calculate deficits
  const gpaDeficit = uni.requirements.gpa - current.gpa
  const ieltsDeficit = uni.requirements.ielts - current.ielts
  const satDeficit = uni.requirements.sat - current.sat

  // Status checks
  const isGpaMet = gpaDeficit <= 0
  const isIeltsMet = ieltsDeficit <= 0
  const isSatMet = satDeficit <= 0

  const allMet = isGpaMet && isIeltsMet && isSatMet

  // Overall progress score (simple average of met requirements %)
  const gpaProgress = Math.min(100, Math.round((current.gpa / uni.requirements.gpa) * 100))
  const ieltsProgress = Math.min(100, Math.round((current.ielts / uni.requirements.ielts) * 100))
  const satProgress = Math.min(100, Math.round((current.sat / uni.requirements.sat) * 100))
  const overallProgress = Math.round((gpaProgress + ieltsProgress + satProgress) / 3)

  // Calculate dynamic acceptance chances
  const gd = uni.requirements.gpa - current.gpa
  const id = uni.requirements.ielts - current.ielts
  const sd = uni.requirements.sat - current.sat
  let chance = "Excellent"
  let chanceColor = "text-green-500 bg-green-500/10 border-green-500/25"
  if (gd > 0.4 || id > 1.0 || sd > 150) {
    chance = "Kichik"
    chanceColor = "text-red-500 bg-red-500/10 border-red-500/25"
  } else if (gd > 0.2 || id > 0.5 || sd > 50) {
    chance = "O'rtacha"
    chanceColor = "text-yellow-600 bg-yellow-500/10 border-yellow-500/25"
  } else if (gd > 0 || id > 0 || sd > 0) {
    chance = "Yuqori"
    chanceColor = "text-blue-500 bg-blue-500/10 border-blue-500/25"
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">Kelajak Xaritasi</h1>
        <p className="text-sm text-muted-foreground">
          Maqsad qilgan universitetingizga kirish imkoniyatlarini va qabul ehtimollarini hisoblab chiqing.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Uni selection cards grid (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-heading text-base font-bold text-foreground">Target Universitetlar ro'yxati</h2>
            <span className="text-xs text-muted-foreground">Batafsil ma'lumot olish uchun bosing</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(universities).map(([key, data]) => {
              const isSelected = targetUni === key
              // Calculate specific progress for preview card
              const gpCard = Math.min(100, Math.round((current.gpa / data.requirements.gpa) * 100))
              const ipCard = Math.min(100, Math.round((current.ielts / data.requirements.ielts) * 100))
              const spCard = Math.min(100, Math.round((current.sat / data.requirements.sat) * 100))
              const progressCard = Math.round((gpCard + ipCard + spCard) / 3)

              // Calculate chance for preview card
              const gdc = data.requirements.gpa - current.gpa
              const idc = data.requirements.ielts - current.ielts
              const sdc = data.requirements.sat - current.sat
              let chanceLabel = "Excellent"
              let cColor = "text-green-500 bg-green-500/10 border-green-500/20"
              if (gdc > 0.4 || idc > 1.0 || sdc > 150) {
                chanceLabel = "Low"
                cColor = "text-red-500 bg-red-500/10 border-red-500/20"
              } else if (gdc > 0.2 || idc > 0.5 || sdc > 50) {
                chanceLabel = "Medium"
                cColor = "text-yellow-600 bg-yellow-500/10 border-yellow-500/20"
              } else if (gdc > 0 || idc > 0 || sdc > 0) {
                chanceLabel = "High"
                cColor = "text-blue-500 bg-blue-500/10 border-blue-500/20"
              }

              return (
                <div
                  key={key}
                  onClick={() => {
                    setTargetUni(key as UniversityKey);
                    setPopupOpen(true);
                  }}
                  className={cn(
                    "group cursor-pointer rounded-2xl border p-5 transition-all hover:shadow-lg flex flex-col justify-between gap-4 text-left",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/5 ring-1 ring-primary"
                      : "border-border/60 hover:border-primary/40 bg-card"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rank #{data.globalRank}</span>
                      <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border", cColor)}>Ehtimol: {chanceLabel}</span>
                    </div>
                    <h3 className="font-heading text-sm font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">{data.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{data.location}</p>
                  </div>

                  <div className="space-y-2 border-t border-border/40 pt-3 text-[10px] font-semibold text-muted-foreground flex justify-between items-center">
                    <span>Qabul foizi: <strong>{data.acceptanceRate}%</strong></span>
                    <span>Tayyorgarlik: <strong className="text-primary">{progressCard}%</strong></span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Comparative indicators and point deficits (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="border border-border/60 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Joriy Target Analizi</CardTitle>
                <Badge className={`border-0 ${allMet ? 'bg-success text-success-foreground' : 'bg-yellow-500 text-slate-950'}`}>
                  {allMet ? 'Barcha talablar bajarildi' : `Moslik: ${overallProgress}%`}
                </Badge>
              </div>
              <CardDescription>Target: <strong>{uni.name}</strong></CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-3 text-xs font-semibold">
              <div className="flex justify-between items-center py-2 border-b border-border/60">
                <span className="text-muted-foreground">Qabul qilish ehtimoli:</span>
                <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border", chanceColor)}>{chance}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/60">
                <span className="text-muted-foreground">Yillik o'qish to'lovi:</span>
                <span className="text-foreground">{uni.tuitionFee}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/60">
                <span className="text-muted-foreground">Jami talabalar soni:</span>
                <span className="text-foreground">{uni.totalStudents} nafar</span>
              </div>

              <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50/50 p-3.5 dark:border-blue-900/30 dark:bg-blue-950/20 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Moliyaviy Imkoniyat / Jamg'armalar:</span>
                <p className="text-[11px] font-medium text-foreground mt-1">{uni.scholarshipInfo}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* DETAILED UNIVERSITY MODAL POPUP */}
      {popupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in">
          <Card className="w-full max-w-2xl bg-card border border-border shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <CardHeader className="pt-8 pb-3 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2 leading-normal">
                  <GraduationCap className="size-5 text-primary animate-pulse" />
                  {uni.name} Natijalari va Qabul Imkoniyatlari
                </CardTitle>
                <CardDescription className="text-muted-foreground">{uni.location}</CardDescription>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => setPopupOpen(false)}>
                <X className="size-5" />
              </Button>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Macro stats row */}
              <div className="grid gap-3 grid-cols-4 text-center">
                <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                  <Trophy className="size-4.5 text-yellow-500 mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground font-bold">QS Dunyo Reytingi</p>
                  <p className="text-sm font-extrabold text-foreground mt-0.5">#{uni.globalRank}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                  <Landmark className="size-4.5 text-blue-600 mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground font-bold font-heading">Qabul Foizi</p>
                  <p className="text-sm font-extrabold text-foreground mt-0.5">{uni.acceptanceRate}%</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                  <DollarSign className="size-4.5 text-green-600 mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground font-bold">Yillik Kontrakt</p>
                  <p className="text-sm font-extrabold text-foreground mt-0.5 leading-none">{uni.tuitionFee.split(' ')[0]}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                  <Users className="size-4.5 text-indigo-600 mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground font-bold">O'quvchilar</p>
                  <p className="text-sm font-extrabold text-foreground mt-0.5">{uni.totalStudents}</p>
                </div>
              </div>

              {/* Requirement Comparison meters */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">TALABLAR SOLISHTIRUVI</h4>
                
                {/* GPA Progress */}
                <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-muted/40 border border-border/30">
                  <div className="flex justify-between items-center text-xs">
                    <span>O'rtacha maktab GPA bahosi</span>
                    <span>Siz: <strong>{current.gpa.toFixed(2)}</strong> / Talab: <strong>{uni.requirements.gpa.toFixed(2)}</strong></span>
                  </div>
                  <Progress value={gpaProgress} className={`h-2 [&>div]:${isGpaMet ? 'bg-success' : 'bg-primary'}`} />
                  <div className="text-[10px] font-semibold mt-1">
                    {isGpaMet ? (
                      <span className="text-success flex items-center gap-1"><CheckCircle2 className="size-3.5" /> GPA talabi bajarilgan!</span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1"><AlertCircle className="size-3.5" /> Kamchilik: +{gpaDeficit.toFixed(2)} ball qoldi</span>
                    )}
                  </div>
                </div>

                {/* IELTS Progress */}
                <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-muted/40 border border-border/30">
                  <div className="flex justify-between items-center text-xs">
                    <span>IELTS Ingliz tili</span>
                    <span>Siz: <strong>{current.ielts.toFixed(1)}</strong> / Talab: <strong>{uni.requirements.ielts.toFixed(1)}</strong></span>
                  </div>
                  <Progress value={ieltsProgress} className={`h-2 [&>div]:${isIeltsMet ? 'bg-success' : 'bg-primary'}`} />
                  <div className="text-[10px] font-semibold mt-1">
                    {isIeltsMet ? (
                      <span className="text-success flex items-center gap-1"><CheckCircle2 className="size-3.5" /> IELTS talabi bajarilgan!</span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1"><AlertCircle className="size-3.5" /> Kamchilik: +{ieltsDeficit.toFixed(1)} ball qoldi</span>
                    )}
                  </div>
                </div>

                {/* SAT Progress */}
                <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-muted/40 border border-border/30">
                  <div className="flex justify-between items-center text-xs">
                    <span>SAT Imtihoni</span>
                    <span>Siz: <strong>{current.sat}</strong> / Talab: <strong>{uni.requirements.sat}</strong></span>
                  </div>
                  <Progress value={satProgress} className={`h-2 [&>div]:${isSatMet ? 'bg-success' : 'bg-primary'}`} />
                  <div className="text-[10px] font-semibold mt-1">
                    {isSatMet ? (
                      <span className="text-success flex items-center gap-1"><CheckCircle2 className="size-3.5" /> SAT talabi bajarilgan!</span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1"><AlertCircle className="size-3.5" /> Kamchilik: +{satDeficit} ball qoldi</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Box inside popup */}
              <div className="rounded-xl bg-slate-900 border border-slate-800 text-white p-4 text-xs font-semibold">
                <span className="text-yellow-500 font-bold uppercase tracking-wider block mb-1">AI TAVSIYALARI & EL-YURT UMIDI INTEGRATSIYASI:</span>
                {allMet ? (
                  <p className="text-green-400 font-medium leading-relaxed">
                    Siz ushbu universitetning barcha akademik mezonlariga mos kelasiz! Kelajak Markazi maslahatchisi orqali El-Yurt Umidi Jamg'armasi granti uchun ariza shaklini topshirishingiz mumkin.
                  </p>
                ) : (
                  <p className="text-slate-300 leading-normal">
                    Talablarni muvaffaqiyatli topshirishingiz uchun keyingi 3 oyda haftalik rejaga <strong className="text-white">SAT testlarini echish</strong> hamda <strong className="text-white">IELTS Speaking</strong> darslarini kiritishingiz lozim.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-border flex justify-end gap-2 pt-3">
              <Button className="bg-primary text-white text-xs h-9" onClick={() => setPopupOpen(false)}>
                Tizimga yopish
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
