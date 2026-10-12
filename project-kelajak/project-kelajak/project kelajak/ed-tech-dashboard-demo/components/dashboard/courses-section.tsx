'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Calculator, Terminal, Cpu, Loader2, CheckCircle2 } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: 'SAT Masterclass: Mission 1400+',
    provider: "O'quv markazi dasturi",
    tag: 'Xalqaro',
    duration: '3 oy',
    lessons: '24 ta dars',
    icon: Calculator,
  },
  {
    id: 2,
    title: 'IELTS Advantage: Speaking & Writing Focus',
    provider: 'Ibrat Farzandlari bilan hamkorlikda',
    tag: 'Til kursi',
    duration: '2 oy',
    lessons: '18 ta dars',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'C++ va Python: Algoritmik Dasturlash (Codeforces va Robocontest uchun)',
    provider: 'IT Park Akademiyasi',
    tag: 'Dasturlash',
    duration: '4 oy',
    lessons: '36 ta dars',
    icon: Terminal,
  },
  {
    id: 4,
    title: "Ma'lumotlar tahlili va Sun'iy intellekt asoslari",
    provider: 'Kelajak Markazi eksklyuziv',
    tag: 'AI & Data',
    duration: '3 oy',
    lessons: '30 ta dars',
    icon: Cpu,
  },
]

export function CoursesSection() {
  const [enrollingId, setEnrollingId] = useState<number | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleEnroll = (id: number) => {
    if (enrollingId !== null) return
    setEnrollingId(id)
    setTimeout(() => {
      setEnrollingId(null)
      setToastMessage("Siz ushbu kursga muvaffaqiyatli yozildingiz! Darslar tez orada faollashadi.")
      setTimeout(() => setToastMessage(null), 4000)
    }, 1200)
  }

  return (
    <section className="flex flex-col gap-5 w-full mt-8 animate-fade-in">
      <div className="flex flex-col gap-1 text-left">
        <h2 className="font-heading text-xl font-bold text-foreground">Milliy va Xalqaro Kurslar</h2>
        <p className="text-sm text-muted-foreground">Sertifikat olish va tahliliy ko'nikmalarni rivojlantirish dasturlari</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {courses.map((course) => (
          <Card 
            key={course.id} 
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/60 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <course.icon className="size-5" />
                </span>
                <Badge className="bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:text-blue-400 text-xs px-2.5 py-1 rounded-full font-medium border-0 shadow-none">
                  {course.tag}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold text-[15px] leading-tight text-foreground line-clamp-2">{course.title}</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">{course.provider}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center justify-between text-[11px] font-bold tracking-wide text-slate-400 dark:text-slate-500 uppercase">
                <span>{course.duration}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span>{course.lessons}</span>
              </div>
              
              <Button 
                onClick={() => handleEnroll(course.id)}
                disabled={enrollingId !== null && enrollingId !== course.id}
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all h-9 text-xs shadow-sm shadow-blue-500/20"
              >
                {enrollingId === course.id ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin mr-2" />
                    Yuklanmoqda...
                  </>
                ) : (
                  "Kursni boshlash"
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className="flex items-center gap-2.5 rounded-xl border border-green-500/20 bg-green-500/10 text-green-500 px-4 py-3.5 shadow-[0_0_20px_rgba(34,197,94,0.15)] backdrop-blur-md">
            <CheckCircle2 className="size-5" />
            <p className="text-sm font-semibold">{toastMessage}</p>
          </div>
        </div>
      )}
    </section>
  )
}
