'use client'

import { useState } from 'react'
import {
  MapPin,
  UserPlus,
  Briefcase,
  School,
  GraduationCap,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { regions, vacancies, vocationalSchools } from '@/lib/mock-data'

export function LaborMarketView() {
  const [region, setRegion] = useState('Barcha viloyatlar')
  const [applyStatus, setApplyStatus] = useState<Record<number, 'idle' | 'loading' | 'success'>>({})
  const [toastVisible, setToastVisible] = useState(false)

  const handleApply = (id: number) => {
    if (applyStatus[id]) return
    setApplyStatus(prev => ({ ...prev, [id]: 'loading' }))
    setTimeout(() => {
      setApplyStatus(prev => ({ ...prev, [id]: 'success' }))
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 4000)
    }, 1200)
  }

  const filtered =
    region === 'Barcha viloyatlar'
      ? vocationalSchools
      : vocationalSchools.filter((s) => s.region === region)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">Mahalliy mehnat bozori va Texnikumlar</h1>
        <p className="text-sm text-muted-foreground">
          O'zbekiston bo'ylab kasb-hunar maktablari (Texnikumlar) va haqiqiy ish o'rinlarini o'rganing.
        </p>
      </div>

      {/* Section 1 — Schools map/database */}
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-lg font-semibold text-foreground">Viloyatlar bo'yicha texnikumlar</h2>

        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                region === r
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground',
              )}
            >
              <MapPin className="size-3.5" />
              {r}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((school) => (
            <Card key={school.id} className="group transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <School className="size-5" />
                  </span>
                  <Badge variant="secondary" className="gap-1">
                    <MapPin className="size-3" />
                    {school.region}
                  </Badge>
                </div>
                <CardTitle className="pt-2 text-base leading-snug">{school.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-success/10 p-2.5 text-success">
                  <UserPlus className="size-4" />
                  <span className="text-sm font-semibold">Qabul kvotasi: {school.quota}</span>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">Mavjud yo'nalishlar</p>
                  <div className="flex flex-wrap gap-1.5">
                    {school.directions.map((d) => (
                      <Badge key={d} variant="outline" className="text-[11px]">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 2 — Career Orientation */}
      <section className="flex flex-col gap-3">
        <h2 className="font-heading text-lg font-semibold text-foreground">Kasbga yo'naltirish</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {vacancies.map((job) => (
            <Card key={job.id} className="transition-all hover:shadow-md">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Briefcase className="size-5" />
                    </span>
                    <div>
                      <p className="font-heading font-semibold text-foreground">{job.role}</p>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <Badge className="border-0 bg-success/15 text-success whitespace-nowrap">{job.salary}</Badge>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-dashed border-slate-200/80 bg-slate-50/40 dark:border-slate-700/80 dark:bg-slate-800/40 p-3">
                  <GraduationCap className="size-4 shrink-0 text-accent" />
                  <div className="flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      Tavsiya etilgan qisqa kurs
                    </p>
                    <p className="text-sm font-semibold text-foreground">{job.course}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleApply(job.id)}
                    disabled={applyStatus[job.id] === 'loading' || applyStatus[job.id] === 'success'}
                    className={cn(
                      "gap-1 transition-all",
                      applyStatus[job.id] === 'success'
                        ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 rounded-xl px-3 py-1 text-xs font-semibold hover:bg-green-50 hover:text-green-700 opacity-100 disabled:opacity-100"
                        : "text-accent"
                    )}
                  >
                    {applyStatus[job.id] === 'loading' ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" />
                        Yuborilmoqda...
                      </>
                    ) : applyStatus[job.id] === 'success' ? (
                      "✓ Ariza yuborildi"
                    ) : (
                      <>
                        Yozilish
                        <ArrowRight className="size-3.5" data-icon="inline-end" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SUCCESS TOAST OVERLAY */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-2 fade-in duration-500">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-4 shadow-2xl">
            <div className="rounded-full bg-green-500/15 p-1.5 text-green-500">
              <CheckCircle2 className="size-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-heading text-sm font-bold text-foreground">Muvaffaqiyatli ro'yxatdan o'tdingiz!</p>
              <p className="text-xs text-muted-foreground w-[260px] leading-relaxed">
                Sizning arizangiz muvaffaqiyatli qabul qilindi. Tez orada koordinatordan xabar olasiz.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
