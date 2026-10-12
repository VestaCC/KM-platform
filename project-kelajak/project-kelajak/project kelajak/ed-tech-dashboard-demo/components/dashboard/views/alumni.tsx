'use client'

import { useState, useEffect, useRef } from 'react'
import { Crown, GraduationCap, PlayCircle, MessageCircle, Trophy, X, Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { alumniHallOfFame, mentors } from '@/lib/mock-data'

const podiumStyles: Record<number, { ring: string; badge: string; height: string }> = {
  1: { ring: 'ring-warning', badge: 'bg-warning text-warning-foreground', height: 'sm:mt-0' },
  2: { ring: 'ring-muted-foreground/40', badge: 'bg-secondary text-secondary-foreground', height: 'sm:mt-8' },
  3: { ring: 'ring-accent/50', badge: 'bg-accent/15 text-accent', height: 'sm:mt-12' },
}

function initialsOf(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
}

export function AlumniView() {
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (chatOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [chatOpen])

  const handleOpenChat = (mentor: any) => {
    setSelectedMentor(mentor)
    setChatOpen(true)
    setMessages([
      {
        id: 1,
        sender: 'mentor',
        text: `Assalomu alaykum! Men ${mentor.name}man, ${mentor.university}da ${mentor.major} yo'nalishida o'qiyman. Kelajak Markazi yopiq chatiga xush kelibsiz! Universitetga kirish, IELTS/SAT tayyorlanish yoki El-yurt Umidi grantlari bo'yicha qanday savolingiz bor?`,
        time: 'Bugun, hozir'
      }
    ])
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'student',
      text: inputValue,
      time: 'Bugun, hozir'
    }

    setMessages((prev) => [...prev, userMsg])
    const query = inputValue.toLowerCase()
    setInputValue('')
    setIsTyping(true)

    // Response generation logic
    setTimeout(() => {
      setIsTyping(false)

      let replyText = "Ajoyib savol! Men ham shu jarayondan o'tganman. Asosiysi - vaqtni to'g'ri taqsimlash va portfolio ustida muntazam ishlash. O'quvchi boshqaruv panelidagi yo'l xaritasiga amal qiling, barchasi bosqichma-bosqich osonlashadi."

      if (query.includes('sat') || query.includes('ielts')) {
        replyText = `SAT va IELTS ballari ${selectedMentor?.university} uchun juda muhim. Masalan, IELTS kamida 7.0 va SAT 1450+ bo'lsa, xalqaro universitetlarga grant olish imkoniyati yuqori bo'ladi. Kundalik reja asosida o'qing va rasmiy mock testlarni ko'p topshiring.`
      } else if (query.includes('grant') || query.includes('stipendiya') || query.includes('pul') || query.includes('kontrakt')) {
        replyText = "Xalqaro oliygohlarda to'liq grant (financial aid) olish uchun 'Need-blind' universitetlarga topshirishingizni tavsiya qilaman. Shuningdek, O'zbekistonning El-yurt Umidi jamg'armasi orqali ham to'liq moliyalashtirish olish mumkin!"
      } else if (query.includes('el-yurt') || query.includes('umidi') || query.includes('jamg')) {
        replyText = "El-yurt Umidi jamg'armasi har yili o'zbekistonlik iqtidorli yoshlarni chet elga yuboradi. Buning uchun sizda dunyoning TOP-300 (ba'zan TOP-100) oliygohidan 'unconditional offer' (shartsiz taklifnoma) bo'lishi kerak. Keyin esa intervyudan o'tasiz."
      } else if (query.includes('insho') || query.includes('motivatsion') || query.includes('essay') || query.includes('personal')) {
        replyText = "Motivatsion insho yozishda shunchaki yutuqlarni sanab o'tmasdan, shaxsiy hikoyangiz, qiyinchiliklarni qanday yengganingiz va aynan shu soha nima uchun kerakligini yozing. Uni kamida 4-5 marta qayta tahrirlang."
      } else if (query.includes('ec') || query.includes('faoliyat') || query.includes('to\'garak') || query.includes('loyih')) {
        replyText = "Darsdan tashqari faoliyat ham akademik ko'rsatkichlar kabi muhim. Robototexnika, maktab deputati bo'lish yoki ko'ngillilik loyihalarida yetakchi bo'lish sizni boshqalardan ajratib turadi."
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'mentor',
          text: replyText,
          time: 'Hozirgina'
        }
      ])
    }, 1200)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-left">
        <h1 className="font-heading text-2xl font-bold text-foreground">Bitiruvchilar tarmog'i</h1>
        <p className="text-sm text-muted-foreground">
          Bitiruvchilarimiz bilan faxrlaning va dunyoning eng yaxshi universitetlaridagi mentorlar bilan bog'laning.
        </p>
      </div>

      {/* Section 1 — Hall of Fame */}
      <section className="flex flex-col gap-3 text-left">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-foreground">
          <Trophy className="size-5 text-warning" />
          Shon-sharaf zali
        </h2>
        <Card className="border-0 bg-primary text-primary-foreground">
          <CardContent className="grid items-end gap-4 p-6 sm:grid-cols-3">
            {alumniHallOfFame.map((alum) => {
              const style = podiumStyles[alum.rank]
              return (
                <div
                  key={alum.id}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-2xl bg-primary-foreground/5 p-5 text-center ring-1 ring-primary-foreground/10',
                    style.height,
                  )}
                >
                  <div className="relative">
                    <Avatar className={cn('size-16 ring-4', style.ring)}>
                      <AvatarFallback className="bg-accent text-base font-bold text-accent-foreground">
                        {initialsOf(alum.name)}
                      </AvatarFallback>
                    </Avatar>
                    {alum.rank === 1 && (
                      <Crown className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 text-warning" />
                    )}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-1/2 flex size-6 -translate-x-1/2 items-center justify-center rounded-full text-xs font-bold ring-2 ring-primary',
                        style.badge,
                      )}
                    >
                      {alum.rank}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="font-heading font-semibold">{alum.name}</p>
                    <p className="text-sm text-accent">
                      {alum.university} {alum.year}
                    </p>
                    <p className="text-xs text-primary-foreground/60">{alum.major}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>

      {/* Section 2 — Mentorship Hub */}
      <section className="flex flex-col gap-3 text-left">
        <h2 className="font-heading text-lg font-semibold text-foreground">Mentorlik markazi</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="transition-all hover:shadow-md bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12 border">
                    <AvatarFallback className="bg-accent/15 font-semibold text-accent">
                      {mentor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-base text-foreground">{mentor.name}</CardTitle>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <GraduationCap className="size-3.5" />
                      {mentor.university} · {mentor.major}
                    </p>
                  </div>
                  {mentor.available ? (
                    <Badge className="border-0 bg-success/15 text-success">Bo'sh</Badge>
                  ) : (
                    <Badge variant="secondary">Band</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs">
                  <PlayCircle className="size-4" data-icon="inline-start" />
                  Vebinarni ko'rish
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90 text-xs"
                  disabled={!mentor.available}
                  onClick={() => handleOpenChat(mentor)}
                >
                  <MessageCircle className="size-4" data-icon="inline-start" />
                  Yopiq chatga qo'shilish
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* GRADUATE CHAT WINDOW MODAL */}
      {chatOpen && selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in text-left">
          <Card className="w-full max-w-lg bg-card border border-border shadow-2xl flex flex-col h-[520px] relative overflow-hidden">
            <CardHeader className="pt-8 pb-4 px-4 border-b border-border flex flex-row items-center justify-between bg-slate-900 text-white shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 border border-slate-700">
                  <AvatarFallback className="bg-blue-600 text-white font-bold text-xs">
                    {selectedMentor.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm font-bold text-white leading-normal">{selectedMentor.name}</CardTitle>
                  <p className="text-[10px] text-blue-400 font-semibold">{selectedMentor.university} · {selectedMentor.major}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white rounded-full" onClick={() => setChatOpen(false)}>
                <X className="size-5" />
              </Button>
            </CardHeader>

            {/* Chat Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex flex-col max-w-[80%] rounded-xl p-3 text-xs leading-normal",
                    m.sender === 'mentor'
                      ? "bg-white dark:bg-slate-900 border border-border/60 self-start text-left text-foreground"
                      : "bg-blue-600 text-white self-end text-left"
                  )}
                >
                  <p>{m.text}</p>
                  <span className={cn("text-[8px] mt-1 block", m.sender === 'mentor' ? "text-slate-400" : "text-blue-200")}>
                    {m.time}
                  </span>
                </div>
              ))}
              {isTyping && (
                <div className="bg-white dark:bg-slate-900 border border-border/60 text-slate-400 text-[10px] italic p-2.5 rounded-xl self-start">
                  {selectedMentor.name} yozmoqda...
                </div>
              )}
              <div ref={chatEndRef} />
            </CardContent>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-card flex gap-2 shrink-0">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Savolingizni yozing (masalan: grant, SAT, essay...)"
                className="flex-1 h-9 rounded-md border border-border bg-card px-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white h-9 px-4 text-xs gap-1">
                <Send className="size-3.5" />
                Yuborish
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
