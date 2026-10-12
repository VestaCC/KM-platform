'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  Activity,
  HeartPulse,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Filter,
  BarChart4,
  PieChart,
  MapPin,
  Building2,
  GraduationCap,
  User,
  Globe,
  TrendingUp,
  TrendingDown,
  Calendar,
  Loader2,
  Calculator,
  History,
  Languages,
  Cpu,
  Terminal,
  Palette,
  Music,
  Trophy,
  Crown
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/language-context'
import { uzbekistanGeography, getDistrictsByRegion, getLocalizedRegionName, getLocalizedDistrictName } from '@/lib/locations'

export type DrillLevel = 'republic' | 'region' | 'district' | 'school' | 'class' | 'student'

// Constants mapped to user requirements in Uzbek
const VULNERABILITIES = ['Standart', 'Jismoniy nuqsoni bor', 'To\'liq moddiy ta\'minlanmagan', 'Qisman moddiy ta\'minlanmagan', 'Yolg\'iz ota/ona']

// Nested Course Hierarchy
const COURSE_HIERARCHY = [
  {
    category: 'Fanlar',
    icon: BookOpen,
    subcategories: [
      {
        name: 'Aniq fanlar',
        icon: Calculator,
        courses: [
          { id: 'Matematika (Qo\'shimcha)', label: 'Matematika', providerType: 'RED' },
          { id: 'Fizika to\'garagi', label: 'Fizika', providerType: 'YELLOW' },
          { id: 'Kimyo to\'garagi', label: 'Kimyo', providerType: 'GREEN' },
        ]
      },
      {
        name: 'Gumanitar fanlar',
        icon: History,
        courses: [
          { id: 'Tarix to\'garagi', label: 'Tarix', providerType: 'YELLOW' },
          { id: 'Ona tili to\'garagi', label: 'Ona tili', providerType: 'GREEN' },
          { id: 'Adabiyot to\'garagi', label: 'Adabiyot', providerType: 'YELLOW' },
        ]
      }
    ]
  },
  {
    category: 'Tillar',
    icon: Globe,
    subcategories: [
      {
        name: 'Xorijiy tillar',
        icon: Languages,
        courses: [
          { id: 'Ingliz tili markazi', label: 'Ingliz tili', providerType: 'RED' },
          { id: 'Rus tili markazi', label: 'Rus tili', providerType: 'YELLOW' },
          { id: 'Nemis tili to\'garagi', label: 'Nemis tili', providerType: 'GREEN' },
          { id: 'Koreys tili to\'garagi', label: 'Koreys tili', providerType: 'RED' },
        ]
      }
    ]
  },
  {
    category: 'IT va Robototexnika',
    icon: Terminal,
    subcategories: [
      {
        name: 'IT yo\'nalishlari',
        icon: Cpu,
        courses: [
          { id: 'Dasturlash (Kelajak Markazi)', label: 'Dasturlash', providerType: 'GREEN' },
          { id: 'Robototexnika (Kelajak Markazi)', label: 'Robototexnika', providerType: 'GREEN' },
          { id: 'Informatika to\'garagi', label: 'Informatika', providerType: 'YELLOW' },
        ]
      }
    ]
  },
  {
    category: 'San\'at va Ijod',
    icon: Palette,
    subcategories: [
      {
        name: 'Ijodiy yo\'nalishlar',
        icon: Music,
        courses: [
          { id: 'Chizmachilik to\'garagi', label: 'Chizmachilik', providerType: 'YELLOW' },
          { id: 'Musiqa to\'garagi', label: 'Musiqa', providerType: 'RED' },
          { id: 'Raqs to\'garagi', label: 'Raqs', providerType: 'RED' },
        ]
      }
    ]
  },
  {
    category: 'Sport',
    icon: Trophy,
    subcategories: [
      {
        name: 'Jamoaviy sport',
        icon: Users,
        courses: [
          { id: 'Futbol to\'garagi', label: 'Futbol', providerType: 'YELLOW' },
          { id: 'Voleybol to\'garagi', label: 'Voleybol', providerType: 'YELLOW' },
          { id: 'Basketbol to\'garagi', label: 'Basketbol', providerType: 'YELLOW' },
        ]
      },
      {
        name: 'Yakka tartibdagi sport',
        icon: User,
        courses: [
          { id: 'Boks to\'garagi', label: 'Boks', providerType: 'RED' },
          { id: 'Kurash to\'garagi', label: 'Kurash', providerType: 'RED' },
        ]
      },
      {
        name: 'Aqliy sport',
        icon: Crown,
        courses: [
          { id: 'Shaxmat to\'garagi', label: 'Shaxmat', providerType: 'GREEN' },
          { id: 'Shashka to\'garagi', label: 'Shashka', providerType: 'GREEN' },
        ]
      }
    ]
  },
  {
    category: 'Boshqa',
    subcategories: [
      {
        name: 'Qo\'shimcha darslarsiz',
        courses: [
          { id: 'Qo\'shimcha kurslarga qatnamaydi', label: 'Hech qanday kursga bormaydi', providerType: 'NONE' }
        ]
      }
    ]
  }
]

// Flatten for quick reference
const COURSE_CATS = COURSE_HIERARCHY.flatMap(cat => cat.subcategories.flatMap(sub => sub.courses.map(c => c.id)))

// Array of distinct mock students heavily skewed towards Standart and Kelajak Markazi
const BASE_PERSONAS = [
  { name: 'Alibekov Sanjar', vulnerability: 'To\'liq moddiy ta\'minlanmagan', course: 'Matematika (Qo\'shimcha)', gender: 'Erkak' },
  { name: 'Karimova Madina', vulnerability: 'Jismoniy nuqsoni bor', course: 'Dasturlash (Kelajak Markazi)', gender: 'Ayol' },
  { name: 'Sultanov Rustam', vulnerability: 'Yolg\'iz ota/ona', course: 'Ingliz tili markazi', gender: 'Erkak' },
  { name: 'Xalimova Laylo', vulnerability: 'Qisman moddiy ta\'minlanmagan', course: 'Qo\'shimcha kurslarga qatnamaydi', gender: 'Ayol' },
  { name: 'Toshmatov Jasur', vulnerability: 'Standart', course: 'Dasturlash (Kelajak Markazi)', gender: 'Erkak' },
  { name: 'Nazarova Shirin', vulnerability: 'Standart', course: 'Robototexnika (Kelajak Markazi)', gender: 'Ayol' },
  { name: 'Qodirov Aziz', vulnerability: 'Standart', course: 'Fizika to\'garagi', gender: 'Erkak' },
  { name: 'Usmonova Zebo', vulnerability: 'Standart', course: 'Dasturlash (Kelajak Markazi)', gender: 'Ayol' },
  { name: 'Rahmonov Bekzod', vulnerability: 'Standart', course: 'Tarix to\'garagi', gender: 'Erkak' },
  { name: 'Murodova Asal', vulnerability: 'Standart', course: 'Dasturlash (Kelajak Markazi)', gender: 'Ayol' },
  { name: 'Ismoilov Diyor', vulnerability: 'Standart', course: 'Futbol to\'garagi', gender: 'Erkak' },
  { name: 'Xasanova Sevara', vulnerability: 'Standart', course: 'Dasturlash (Kelajak Markazi)', gender: 'Ayol' },
  { name: 'Olimov Sardor', vulnerability: 'Standart', course: 'Robototexnika (Kelajak Markazi)', gender: 'Erkak' },
  { name: 'Jalilova Malika', vulnerability: 'Standart', course: 'Dasturlash (Kelajak Markazi)', gender: 'Ayol' },
  { name: 'Ergashev Temur', vulnerability: 'Standart', course: 'Ingliz tili markazi', gender: 'Erkak' },
  { name: 'Raimova Iroda', vulnerability: 'Standart', course: 'Shaxmat to\'garagi', gender: 'Ayol' },
  { name: 'Yusupov Javohir', vulnerability: 'Standart', course: 'Kurash to\'garagi', gender: 'Erkak' },
  { name: 'Abdullaeva Nigina', vulnerability: 'Standart', course: 'Dasturlash (Kelajak Markazi)', gender: 'Ayol' },
  { name: 'Gofurov Shohruh', vulnerability: 'Standart', course: 'Boks to\'garagi', gender: 'Erkak' },
  { name: 'Salimova Zilola', vulnerability: 'Standart', course: 'Robototexnika (Kelajak Markazi)', gender: 'Ayol' },
]

// Types
export interface StatsNode {
  totalStudents: number
  males: number
  females: number
  vulnerabilities: Record<string, number>
  courses: Record<string, number>
  coursesMale: Record<string, number>
  coursesFemale: Record<string, number>
}

export interface TreeNode {
  id: string
  name: string
  level: DrillLevel
  stats: StatsNode
  children: TreeNode[]
  persona?: typeof BASE_PERSONAS[0] // Only for students
}

// Helpers
function emptyStats(): StatsNode {
  const v: Record<string, number> = {}
  VULNERABILITIES.forEach(key => v[key] = 0)
  const c: Record<string, number> = {}
  const cm: Record<string, number> = {}
  const cf: Record<string, number> = {}
  COURSE_CATS.forEach(key => { c[key] = 0; cm[key] = 0; cf[key] = 0; })
  return { totalStudents: 0, males: 0, females: 0, vulnerabilities: v, courses: c, coursesMale: cm, coursesFemale: cf }
}

function addStats(target: StatsNode, source: StatsNode) {
  target.totalStudents += source.totalStudents
  target.males += source.males
  target.females += source.females
  for (const k of VULNERABILITIES) target.vulnerabilities[k] = (target.vulnerabilities[k] || 0) + (source.vulnerabilities[k] || 0)
  for (const k of COURSE_CATS) {
    target.courses[k] = (target.courses[k] || 0) + (source.courses[k] || 0)
    target.coursesMale[k] = (target.coursesMale[k] || 0) + (source.coursesMale[k] || 0)
    target.coursesFemale[k] = (target.coursesFemale[k] || 0) + (source.coursesFemale[k] || 0)
  }
}

function pseudoRandom(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  const x = Math.sin(hash++) * 10000
  return x - Math.floor(x)
}

// Global Tree Generator (Bottom-Up Aggregation)
function buildRepublicTree(): TreeNode {
  const root: TreeNode = { id: 'uzb', name: 'O\'zbekiston Respublikasi', level: 'republic', children: [], stats: emptyStats() }
  
  for (const region of uzbekistanGeography) {
    const regionNameUz = getLocalizedRegionName(region.name, 'uz')
    const rNode: TreeNode = { id: region.id, name: regionNameUz, level: 'region', children: [], stats: emptyStats() }
    const districts = getDistrictsByRegion(region.name)
    const distCount = districts.length > 0 ? districts : Array.from({length: 12}).map((_, i) => ({ id: `${region.id}-d${i}`, name: `${i+1}-Tuman` }))

    for (const dist of distCount) {
      const distNameUz = dist.name.includes('Tuman') ? dist.name : getLocalizedDistrictName(dist.name, 'uz')
      const dNode: TreeNode = { id: dist.id, name: distNameUz, level: 'district', children: [], stats: emptyStats() }
      const numSchools = 3 + (pseudoRandom(dist.id) * 3 | 0) // 3 to 5 schools

      for (let s=1; s<=numSchools; s++) {
        const sNode: TreeNode = { id: `${dist.id}-s${s}`, name: `${s}-Maktab`, level: 'school', children: [], stats: emptyStats() }
        const numClasses = 3 // Exactly 3 classes per school
        
        for (let c=1; c<=numClasses; c++) {
          const classGrades = ['5-A', '5-B', '6-A', '6-B', '7-A', '7-B', '8-A']
          const cNode: TreeNode = { id: `${sNode.id}-c${c}`, name: classGrades[c-1] || `${9+c}-Sinf`, level: 'class', children: [], stats: emptyStats() }
          
          // Exactly 10 students per class
          const studentCount = 10
          for (let st=0; st<studentCount; st++) {
             const persona = BASE_PERSONAS[st % BASE_PERSONAS.length]
             // Append a unique suffix to names if they duplicate in a class to look realistic
             const stName = st >= BASE_PERSONAS.length ? `${persona.name} (B)` : persona.name
             const stNode: TreeNode = { id: `${cNode.id}-st${st}`, name: stName, level: 'student', children: [], stats: emptyStats(), persona }
             
             stNode.stats.totalStudents = 1
             if (persona.gender === 'Erkak') {
               stNode.stats.males = 1
               stNode.stats.coursesMale[persona.course] = 1
             } else {
               stNode.stats.females = 1
               stNode.stats.coursesFemale[persona.course] = 1
             }
             stNode.stats.vulnerabilities[persona.vulnerability] = 1
             stNode.stats.courses[persona.course] = 1
             
             cNode.children.push(stNode)
             addStats(cNode.stats, stNode.stats)
          }
          sNode.children.push(cNode)
          addStats(sNode.stats, cNode.stats)
        }
        dNode.children.push(sNode)
        addStats(dNode.stats, sNode.stats)
      }
      rNode.children.push(dNode)
      addStats(rNode.stats, dNode.stats)
    }
    root.children.push(rNode)
    addStats(root.stats, rNode.stats)
  }
  return root
}

// Build tree once globally to cache
const republicTree = buildRepublicTree()

// ─── CUSTOM UI COMPONENTS ──────────────────────────────────────────────────

function CustomDropdown({ value, options, onChange, icon: Icon, prefix }: any) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    function handleClick(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setOpen(!open)} 
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-card/40 backdrop-blur-sm hover:bg-muted/60 transition-all text-xs font-semibold text-foreground shadow-sm h-8"
      >
        {Icon && <Icon className="size-3.5 text-muted-foreground" />}
        <span>{prefix}{value}</span>
        <ChevronDown className={cn("size-3.5 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 w-max min-w-full right-0 z-50 rounded-lg border border-border/50 bg-card/95 backdrop-blur-xl shadow-lg p-1 animate-in fade-in zoom-in-95">
          {options.map((opt: string) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-md text-xs font-semibold transition-all duration-150 hover:bg-muted/70", 
                opt === value && "bg-blue-500/15 text-blue-500 dark:text-blue-400"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function DonutChart({ data, colors, title }: { data: { label: string, value: number }[], colors: string[], title?: string }) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0)
  if (total === 0) return null

  let currentAngle = 0
  const size = 160
  const center = size / 2
  const radius = size * 0.4
  const innerRadius = size * 0.25

  const segments = data.map((d, i) => {
    const angle = (d.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const startX = center + radius * Math.cos((startAngle - 90) * Math.PI / 180)
    const startY = center + radius * Math.sin((startAngle - 90) * Math.PI / 180)
    const endX = center + radius * Math.cos((endAngle - 90) * Math.PI / 180)
    const endY = center + radius * Math.sin((endAngle - 90) * Math.PI / 180)
    const largeArc = angle > 180 ? 1 : 0

    const pathData = [
      `M ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
      `L ${center + innerRadius * Math.cos((endAngle - 90) * Math.PI / 180)} ${center + innerRadius * Math.sin((endAngle - 90) * Math.PI / 180)}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${center + innerRadius * Math.cos((startAngle - 90) * Math.PI / 180)} ${center + innerRadius * Math.sin((startAngle - 90) * Math.PI / 180)}`,
      'Z'
    ].join(' ')

    return (
      <path
        key={d.label}
        d={pathData}
        fill={colors[i % colors.length]}
        className="transition-all duration-300 hover:opacity-80 cursor-pointer stroke-background stroke-[2px]"
      >
        <title>{d.label}: {d.value} ({((d.value/total)*100).toFixed(1)}%)</title>
      </path>
    )
  })

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {title && <h4 className="text-[10px] font-bold text-muted-foreground mb-4 uppercase tracking-widest">{title}</h4>}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={center} cy={center} r={radius} fill="none" className="stroke-muted/30 stroke-[2px]" />
          {segments}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-black text-foreground drop-shadow-sm">{total.toLocaleString()}</span>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Jami</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center gap-1.5 w-full">
        {data.map((d, i) => {
          const percentage = total > 0 ? ((d.value / total) * 100).toFixed(1) : '0.0'
          return (
            <div key={d.label} className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground w-full gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
                <span className="truncate" title={d.label}>{d.label}:</span>
              </div>
              <span className="shrink-0 text-foreground">{d.value.toLocaleString()} nafar ({percentage}%)</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CourseHierarchyTable({ statsNode }: { statsNode: StatsNode }) {
  const getBadgeClasses = (type: string) => {
    switch(type) {
      case 'GREEN': return 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
      case 'YELLOW': return 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
      case 'RED': return 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
      default: return 'text-slate-400 bg-slate-500/10 border border-slate-500/20'
    }
  }

  const getProviderLabel = (type: string) => {
    switch(type) {
      case 'GREEN': return 'Kelajak Markazi'
      case 'YELLOW': return 'Davlat To\'garagi'
      case 'RED': return 'Xususiy Markaz'
      default: return 'Qatnamaydi'
    }
  }

  return (
    <div className="w-full text-sm">
      <div className="flex font-bold text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2 mb-2 px-4">
        <div className="flex-1">Kurs yo'nalishi</div>
        <div className="w-24 text-center">O'g'il bolalar</div>
        <div className="w-24 text-center">Qiz bolalar</div>
        <div className="w-24 text-right">Jami</div>
      </div>
      
      <div className="space-y-1">
        {COURSE_HIERARCHY.map((cat) => {
          const catTotal = cat.subcategories.reduce((sum, sub) => sum + sub.courses.reduce((s, c) => s + (statsNode.courses[c.id] || 0), 0), 0)
          const catMale = cat.subcategories.reduce((sum, sub) => sum + sub.courses.reduce((s, c) => s + (statsNode.coursesMale[c.id] || 0), 0), 0)
          const catFemale = cat.subcategories.reduce((sum, sub) => sum + sub.courses.reduce((s, c) => s + (statsNode.coursesFemale[c.id] || 0), 0), 0)
          
          if (catTotal === 0 && cat.category !== 'Boshqa') return null

          return (
            <div key={cat.category} className="mb-3">
              {/* Category Row */}
              <div className="flex font-bold text-foreground py-1.5 px-4 hover:bg-slate-800/40 rounded-md transition-colors items-center">
                <div className="flex-1 flex items-center gap-2">
                  {cat.icon && <cat.icon className="size-4 text-slate-400" />}
                  {cat.category}
                </div>
                <div className="w-24 text-center text-blue-400">{catMale > 0 ? catMale.toLocaleString() : '-'}</div>
                <div className="w-24 text-center text-pink-400">{catFemale > 0 ? catFemale.toLocaleString() : '-'}</div>
                <div className="w-24 text-right text-blue-500 font-extrabold">{catTotal > 0 ? catTotal.toLocaleString() : '-'}</div>
              </div>
              
              {/* Subcategories */}
              <div className="mt-1">
                {cat.subcategories.map(sub => {
                  const subTotal = sub.courses.reduce((s, c) => s + (statsNode.courses[c.id] || 0), 0)
                  const subMale = sub.courses.reduce((s, c) => s + (statsNode.coursesMale[c.id] || 0), 0)
                  const subFemale = sub.courses.reduce((s, c) => s + (statsNode.coursesFemale[c.id] || 0), 0)
                  
                  if (subTotal === 0 && cat.category !== 'Boshqa') return null

                  const SubIcon = (sub as any).icon

                  return (
                    <div key={sub.name} className="mb-1">
                      <div className="flex font-semibold text-muted-foreground py-1.5 px-4 hover:bg-slate-800/40 rounded-md transition-colors items-center">
                        <div className="flex-1 pl-6 flex items-center gap-2 text-xs">
                          <span className="text-border font-normal">└─</span>
                          {SubIcon && <SubIcon className="size-3.5 text-slate-500" />}
                          {sub.name}
                        </div>
                        <div className="w-24 text-center text-blue-400/80">{subMale > 0 ? subMale.toLocaleString() : '-'}</div>
                        <div className="w-24 text-center text-pink-400/80">{subFemale > 0 ? subFemale.toLocaleString() : '-'}</div>
                        <div className="w-24 text-right text-foreground">{subTotal > 0 ? subTotal.toLocaleString() : '-'}</div>
                      </div>

                      {/* Courses */}
                      <div className="mt-0.5">
                        {sub.courses.map(course => {
                          const count = statsNode.courses[course.id] || 0
                          const countMale = statsNode.coursesMale[course.id] || 0
                          const countFemale = statsNode.coursesFemale[course.id] || 0
                          
                          if (count === 0 && cat.category !== 'Boshqa') return null

                          return (
                            <div key={course.id} className="flex text-xs font-medium text-slate-300 py-2 px-4 hover:bg-slate-800/40 rounded-md transition-colors items-center">
                              <div className="flex-1 pl-14 flex items-center gap-3">
                                <span className="text-border">└─</span>
                                <span>{course.label}</span>
                              </div>
                              <div className="w-24 text-center text-blue-400/60">{countMale > 0 ? countMale.toLocaleString() : '-'}</div>
                              <div className="w-24 text-center text-pink-400/60">{countFemale > 0 ? countFemale.toLocaleString() : '-'}</div>
                              <div className="w-24 text-right text-foreground font-semibold">{count > 0 ? count.toLocaleString() : '-'}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── MAIN VIEW ───────────────────────────────────────────────────────────────

export function StatisticsDashboardView() {
  const { t } = useLanguage()
  
  // Breadcrumb path of TreeNodes
  const [path, setPath] = useState<TreeNode[]>([republicTree])
  const [isLoading, setIsLoading] = useState(false)

  // Filters
  const [year, setYear] = useState('2025-2026')
  const [gender, setGender] = useState('Barchasi')
  const [vulFilter, setVulFilter] = useState('Barchasi')
  const [courseFilter, setCourseFilter] = useState('Barchasi')

  const activeSelection = path[path.length - 1]
  const level = activeSelection.level

  // Drill down action with skeleton simulation
  const handleDrillDown = (node: TreeNode) => {
    if (level === 'student') return
    setIsLoading(true)
    setTimeout(() => {
      setPath([...path, node])
      setIsLoading(false)
    }, 400)
  }

  const handleCrumbClick = (index: number) => {
    if (index === path.length - 1) return
    setIsLoading(true)
    setTimeout(() => {
      setPath(path.slice(0, index + 1))
      setIsLoading(false)
    }, 300)
  }

  const stats = activeSelection.stats
  const vulnerableSum = VULNERABILITIES.filter(v => v !== 'Standart').reduce((sum, v) => sum + stats.vulnerabilities[v], 0)
  const vulnerablePct = stats.totalStudents > 0 ? (vulnerableSum / stats.totalStudents) * 100 : 0
  const disengagedPct = stats.totalStudents > 0 ? (stats.courses['Qo\'shimcha kurslarga qatnamaydi'] / stats.totalStudents) * 100 : 0
  
  const topCourse = stats.totalStudents > 0 
    ? Object.entries(stats.courses).sort((a,b)=>b[1]-a[1])[0][0]
    : 'Yo\'q'

  return (
    <div className="flex flex-col gap-6 animate-fade-in text-left relative z-0">
      {/* Radial Depth Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-500/10 rounded-[100%] blur-[120px] pointer-events-none -z-10" />

      {/* HEADER & FILTERS */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-4 pb-2">
        <div>
          <h1 className="font-heading text-3xl font-black text-foreground tracking-tight drop-shadow-sm">{t('sd.title') || 'Respublika Statistikasi Portali'}</h1>
          <p className="text-sm text-muted-foreground font-medium mt-1">{t('sd.desc') || 'Tahlillar darajasini pasaytirib ko\'rish'}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <CustomDropdown 
            icon={Calendar} 
            value={year} 
            options={['2025-2026', '2024-2025']} 
            onChange={setYear} 
          />
          <CustomDropdown 
            icon={Users} 
            prefix="Jinsi: "
            value={gender} 
            options={['Barchasi', 'Erkak', 'Ayol']} 
            onChange={setGender} 
          />
          <CustomDropdown 
            icon={HeartPulse} 
            prefix="Ijtimoiy holati: "
            value={vulFilter} 
            options={['Barchasi', ...VULNERABILITIES]} 
            onChange={setVulFilter} 
          />
          <CustomDropdown 
            icon={BookOpen} 
            prefix="Kursi: "
            value={courseFilter} 
            options={['Barchasi', ...COURSE_CATS]} 
            onChange={setCourseFilter} 
          />
        </div>
      </div>

      {/* BREADCRUMBS */}
      <div className="flex items-center gap-1.5 text-xs font-semibold overflow-x-auto pb-2 border-b border-border/40 text-muted-foreground">
        {path.map((crumb, idx) => (
          <React.Fragment key={crumb.id}>
            <button
              onClick={() => handleCrumbClick(idx)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap outline-none",
                idx === path.length - 1
                  ? "text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 shadow-sm"
                  : "hover:bg-muted/60 hover:text-foreground"
              )}
            >
              {crumb.level === 'republic' && <Globe className="size-3.5" />}
              {crumb.level === 'region' && <MapPin className="size-3.5" />}
              {crumb.level === 'district' && <MapPin className="size-3.5" />}
              {crumb.level === 'school' && <Building2 className="size-3.5" />}
              {crumb.level === 'class' && <GraduationCap className="size-3.5" />}
              {crumb.level === 'student' && <User className="size-3.5" />}
              {crumb.name}
            </button>
            {idx < path.length - 1 && <ChevronRight className="size-3.5 opacity-40 shrink-0" />}
          </React.Fragment>
        ))}
        {isLoading && <Loader2 className="size-3.5 text-blue-500 animate-spin ml-2" />}
      </div>

      {isLoading ? (
        // SKELETON STATE
        <div className="space-y-6 animate-pulse">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({length: 4}).map((_, i) => (
              <div key={i} className="h-32 bg-card/40 backdrop-blur-md rounded-xl border border-border/40" />
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-[400px] bg-card/40 backdrop-blur-md rounded-xl border border-border/40 lg:col-span-1" />
            <div className="h-[400px] bg-card/40 backdrop-blur-md rounded-xl border border-border/40 lg:col-span-2" />
          </div>
        </div>
      ) : (
        // ACTUAL CONTENT
        <>
          {/* MACRO KPI CARDS */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card/60 backdrop-blur-md border-border/60 shadow-sm relative overflow-hidden group hover:border-blue-500/30 transition-colors">
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('sd.kpi.total_students') || 'Jami o\'quvchilar'}</span>
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  <p className="font-heading text-3xl font-black text-foreground drop-shadow-sm">{stats.totalStudents.toLocaleString()}</p>
                </div>
                <div className="mt-auto pt-2 border-t border-border/30">
                  <span className="inline-flex items-center gap-1 text-emerald-500 text-[10px] font-black tracking-wide">
                    <TrendingUp className="size-3" /> +4.2% (o'tgan chorakka nisbatan)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-border/60 shadow-sm relative overflow-hidden group hover:border-amber-500/30 transition-colors">
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <HeartPulse className="size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('sd.kpi.vulnerable') || 'Ijtimoiy ehtiyojmand'}</span>
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  <p className="font-heading text-3xl font-black text-foreground drop-shadow-sm">{vulnerablePct.toFixed(1)}%</p>
                </div>
                <div className="mt-auto pt-2 border-t border-border/30">
                  <span className="inline-flex items-center gap-1 text-emerald-500 text-[10px] font-black tracking-wide">
                    <TrendingDown className="size-3" /> -1.8% (o'tgan chorakka nisbatan)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-border/60 shadow-sm relative overflow-hidden group hover:border-rose-500/30 transition-colors">
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Activity className="size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('sd.kpi.disengaged') || 'Qo\'shimcha kursga qatnamaydi'}</span>
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  <p className="font-heading text-3xl font-black text-foreground drop-shadow-sm">{disengagedPct.toFixed(1)}%</p>
                </div>
                <div className="mt-auto pt-2 border-t border-border/30">
                  <span className="inline-flex items-center gap-1 text-emerald-500 text-[10px] font-black tracking-wide">
                    <TrendingDown className="size-3" /> -0.5% (o'tgan chorakka nisbatan)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-border/60 shadow-sm relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <CardContent className="p-5 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="size-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{t('sd.kpi.top_course') || 'Yetakchi kurs'}</span>
                  </div>
                </div>
                <div className="mt-4 mb-2">
                  <p className="font-heading text-xl font-black text-foreground drop-shadow-sm line-clamp-2 leading-tight" title={topCourse}>
                    {topCourse}
                  </p>
                </div>
                <div className="mt-auto pt-2 border-t border-border/30">
                  <span className="inline-flex items-center gap-1 text-muted-foreground text-[10px] font-black tracking-wide">
                    Eng yuqori qamrov
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CHARTS GRID */}
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="bg-card/60 backdrop-blur-md border-border/60 shadow-md lg:col-span-1">
              <CardHeader className="pb-2 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-indigo-500/10">
                    <PieChart className="size-4 text-indigo-500" />
                  </div>
                  <CardTitle className="text-sm font-bold text-foreground">Jinslar va Ijtimoiy holat taqsimoti</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-col justify-around pt-4 pb-6">
                <DonutChart
                  title="Jinslar taqsimoti"
                  data={[
                    { label: 'O\'g\'il bolalar', value: stats.males },
                    { label: 'Qiz bolalar', value: stats.females }
                  ]}
                  colors={['#2563eb', '#db2777']}
                />
                <DonutChart
                  title="Ijtimoiy holati"
                  data={VULNERABILITIES.map(v => ({ label: v, value: stats.vulnerabilities[v] })).filter(d => d.value > 0)}
                  colors={['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b']}
                />
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-border/60 shadow-md flex flex-col lg:col-span-2">
              <CardHeader className="pb-2 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-blue-500/10">
                    <BookOpen className="size-4 text-blue-500" />
                  </div>
                  <CardTitle className="text-sm font-bold text-foreground">Kurs yo'nalishlari taqsimoti</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pt-4 pb-6 px-2 custom-scrollbar max-h-[500px]">
                <CourseHierarchyTable statsNode={activeSelection.stats} />
              </CardContent>
            </Card>
          </div>

          {/* DETAILED DATA TABLE */}
          {level !== 'student' && (
            <Card className="bg-card/60 backdrop-blur-md border-border/60 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/30 text-[10px] uppercase tracking-widest font-bold text-muted-foreground border-b border-border/60">
                    <tr>
                      <th className="px-4 py-3">
                        {level === 'republic' ? 'Viloyat' : level === 'region' ? 'Tuman' : level === 'district' ? 'Maktab' : level === 'school' ? 'Sinf' : 'O\'quvchi F.I.O'}
                      </th>
                      <th className="px-4 py-3">Jami O'quvchilar</th>
                      <th className="px-4 py-3">Ijtimoiy Ehtiyojmand</th>
                      <th className="px-4 py-3">Qo'shimcha kursga qatnamaydi</th>
                      <th className="px-4 py-3">Jinsi (E/A)</th>
                      <th className="px-4 py-3 text-right">Harakat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {activeSelection.children.map(node => {
                      const nVulSum = VULNERABILITIES.filter(v => v !== 'Standart').reduce((sum, v) => sum + node.stats.vulnerabilities[v], 0)
                      const nVulPct = node.stats.totalStudents > 0 ? (nVulSum / node.stats.totalStudents) * 100 : 0
                      const nDisPct = node.stats.totalStudents > 0 ? (node.stats.courses['Qo\'shimcha kurslarga qatnamaydi'] / node.stats.totalStudents) * 100 : 0
                      
                      return (
                        <tr 
                          key={node.id} 
                          onClick={() => handleDrillDown(node)}
                          className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                        >
                          <td className="px-4 py-4 font-semibold text-foreground flex items-center gap-3">
                            <div className="p-1.5 rounded-md bg-muted/50 text-muted-foreground group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                              {level === 'republic' && <MapPin className="size-4" />}
                              {level === 'region' && <MapPin className="size-4" />}
                              {level === 'district' && <Building2 className="size-4" />}
                              {level === 'school' && <GraduationCap className="size-4" />}
                              {level === 'class' && <User className="size-4" />}
                            </div>
                            <span>
                              {node.name}
                              {node.level === 'student' && (
                                <span className="block text-[10px] text-muted-foreground font-medium mt-0.5">
                                  {node.persona?.vulnerability} • {node.persona?.course}
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-medium text-foreground">{node.stats.totalStudents.toLocaleString()}</td>
                          <td className="px-4 py-4">
                            <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold border", nVulPct > 20 ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20")}>
                              {node.level === 'student' ? (node.persona?.vulnerability !== 'Standart' ? 'Ha' : 'Yo\'q') : `${nVulPct.toFixed(1)}%`}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold border", nDisPct > 15 ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20")}>
                              {node.level === 'student' ? (node.persona?.course === 'Qo\'shimcha kurslarga qatnamaydi' ? 'Ha' : 'Yo\'q') : `${nDisPct.toFixed(1)}%`}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs font-bold text-muted-foreground">
                            <span className="text-blue-400">{node.stats.males}</span> / <span className="text-pink-400">{node.stats.females}</span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="inline-flex items-center text-blue-500 hover:text-blue-400 font-bold text-xs transition-colors">
                              {node.level === 'student' ? 'Profilni ko\'rish' : 'Batafsil'} 
                              <ChevronRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {level === 'student' && activeSelection.persona && (
            <div className="flex flex-col items-center justify-center p-12 border border-border/60 rounded-2xl bg-card/40 backdrop-blur-md text-center shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="p-4 rounded-full bg-blue-500/10 mb-4 ring-1 ring-blue-500/30">
                <User className="size-12 text-blue-400" />
              </div>
              <h3 className="font-heading text-3xl font-black text-foreground drop-shadow-sm">{activeSelection.name}</h3>
              
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <div className="flex flex-col items-center p-3 rounded-xl bg-muted/40 border border-border/40 min-w-[120px]">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Jinsi</span>
                  <span className="text-sm font-bold text-blue-400">{activeSelection.persona.gender}</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-muted/40 border border-border/40 min-w-[140px]">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Ijtimoiy Holati</span>
                  <span className={cn("text-sm font-bold text-center", activeSelection.persona.vulnerability !== 'Standart' ? "text-amber-400" : "text-emerald-400")}>
                    {activeSelection.persona.vulnerability}
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl bg-muted/40 border border-border/40 min-w-[140px]">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Qatnashadigan kursi</span>
                  <span className={cn("text-sm font-bold text-center", activeSelection.persona.course === 'Qo\'shimcha kurslarga qatnamaydi' ? "text-rose-400" : "text-purple-400")}>
                    {activeSelection.persona.course}
                  </span>
                </div>
              </div>
              
              <Button className="mt-8 font-bold px-8 py-5 shadow-lg bg-blue-600 hover:bg-blue-500 text-white rounded-xl" onClick={() => handleCrumbClick(path.length - 2)}>
                Sinf ro'yxatiga qaytish
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
