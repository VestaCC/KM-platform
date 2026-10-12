'use client'

import { useState, useRef } from 'react'
import { Sparkles, ArrowRight, User, Key, UserCheck, ShieldAlert, Award, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { uzbekistanGeography, getDistrictsByRegion, getSchoolsByDistrict, GEO_DEFAULTS, getLocalizedRegionName, getLocalizedDistrictName } from '@/lib/locations'
import { useLanguage } from '@/lib/language-context'

export type UserRole =
  | 'login'
  | 'student'
  | 'counselor'
  | 'regional_director'
  | 'school_director'
  | 'republican_admin'

interface LoginViewProps {
  onLogin: (role: UserRole, studentData?: any) => void
}

// All 14 regions derived from the canonical geography dataset
const allRegions = uzbekistanGeography.map((r) => r.name)

export function LoginView({ onLogin }: LoginViewProps) {
  const { lang, setLang, t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  // Signup State
  const [fullName, setFullName] = useState('Azizbek Karimov')
  const [handle, setHandle] = useState('@azizbek_karimov')
  const [major1, setMajor1] = useState('Mathematics')
  const [major2, setMajor2] = useState('Physics')
  const [gpa, setGpa] = useState('3.86')
  const [ielts, setIelts] = useState('6.5')
  const [sat, setSat] = useState('1380')
  const [selectedRegion, setSelectedRegion] = useState(GEO_DEFAULTS.region)
  const [selectedDistrict, setSelectedDistrict] = useState(GEO_DEFAULTS.district)
  const [selectedSchool, setSelectedSchool] = useState(GEO_DEFAULTS.school)
  
  // Quick Access Magnet Hover State
  const [hoveredRect, setHoveredRect] = useState<{ width: number; height: number; left: number; top: number } | null>(null)
  const quickAccessRef = useRef<HTMLDivElement>(null)

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const container = quickAccessRef.current
    if (button && container) {
      const buttonRect = button.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setHoveredRect({
        width: buttonRect.width,
        height: buttonRect.height,
        left: buttonRect.left - containerRect.left,
        top: buttonRect.top - containerRect.top,
      })
    }
  }

  // Vulnerability Metrics
  const [familyStatus, setFamilyStatus] = useState('Standard')
  const [healthStatus, setHealthStatus] = useState('None')
  const [financialStanding, setFinancialStanding] = useState('Stable')

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region)
    const districts = getDistrictsByRegion(region)
    const firstDistrict = districts[0]?.name ?? ''
    setSelectedDistrict(firstDistrict)
    const firstSchool = districts[0]?.schools[0]?.name ?? ''
    setSelectedSchool(firstSchool)
  }

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district)
    const schools = getSchoolsByDistrict(selectedRegion, district)
    setSelectedSchool(schools[0]?.name ?? '')
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create new student structure in React state
    const studentData = {
      name: fullName,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      major: `${major1} + ${major2}`,
      major1,
      major2,
      gpa: parseFloat(gpa) || 3.5,
      ielts: parseFloat(ielts) || 6.0,
      sat: parseInt(sat) || 1200,
      region: selectedRegion,
      district: selectedDistrict,
      school: selectedSchool,
      familyStatus,
      healthStatus,
      financialStanding,
      initials: fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
    }
    onLogin('student', studentData)
  }

  return (
    <div className="bg-gradient-to-b from-[#BEE3F8] via-[#E2E8F0] to-white min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambience / Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-white/50 blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-white/60 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#E2E8F0]/50 blur-[100px]" />
      </div>

      {/* Floating Language Switcher at Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
          className="flex items-center gap-1.5 rounded-full border border-white/50 bg-white/40 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-white/80 transition-all shadow-sm backdrop-blur-md"
        >
          <Globe className="size-3.5 text-blue-500" />
          <span>{lang === 'en' ? 'EN' : 'UZ'}</span>
        </button>
      </div>

      {/* Main Glassmorphism Card */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/40 shadow-[0_25px_50px_-12px_rgba(148,163,184,0.25)] w-full max-w-md p-8 md:p-10 flex flex-col gap-6 z-10">
        
        {/* Form Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="size-12 rounded-2xl bg-white shadow-sm border border-slate-200/50 flex items-center justify-center p-1.5 overflow-hidden">
            <img src="/assets/logo.jpg" alt="Kelajak Markazi" className="size-full object-cover rounded-xl" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold tracking-tight text-slate-900">
              Kelajak Markazi
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              {lang === 'uz' ? 'Respublika Iqtidorli Yoshlar Platformasi' : 'National Talented Youth Platform'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200/50">
          <button
            type="button"
            className={`flex-1 pb-3 text-center text-sm font-semibold transition-colors ${
              activeTab === 'login'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => setActiveTab('login')}
          >
            {lang === 'uz' ? 'Tizimga kirish' : 'Log In'}
          </button>
          <button
            type="button"
            className={`flex-1 pb-3 text-center text-sm font-semibold transition-colors ${
              activeTab === 'signup'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-slate-600'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            {lang === 'uz' ? "Ro'yxatdan o'tish" : 'Register'}
          </button>
        </div>

        {/* Content: LOGIN */}
        {activeTab === 'login' && (
          <form onSubmit={(e) => { e.preventDefault(); onLogin('student'); }} className="flex flex-col gap-5">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'uz' ? 'Foydalanuvchi nomi yoki Email' : 'Username or Email'}
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 size-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="azizbek_karimov"
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl py-3 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    defaultValue="azizbek_karimov"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  {lang === 'uz' ? 'Maxfiy kalit' : 'Password'}
                </label>
                <div className="relative flex items-center">
                  <Key className="absolute left-3 size-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl py-3 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    defaultValue="demo123"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl py-3.5 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2">
              {lang === 'uz' ? 'Tizimga kirish' : 'Log In'}
              <ArrowRight className="size-4" />
            </button>
            <p className="text-center text-[10px] text-slate-500 font-medium">
              {lang === 'uz' 
                ? "Kirish orqali siz foydalanish shartlariga rozilik bildirasiz."
                : "By logging in, you agree to the terms of use."}
            </p>
          </form>
        )}

        {/* Content: SIGNUP */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-5">
            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700">
                    {lang === 'uz' ? 'Ism Familiya' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Azizbek Karimov"
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700">
                    {lang === 'uz' ? 'Foydalanuvchi nomi' : 'Username'}
                  </label>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@azizbek_karimov_05"
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700">
                  {lang === 'uz' ? 'Mutaxassislik fanlari' : 'Specialization Subjects'}
                </label>
                <div className="grid gap-2 grid-cols-2">
                  <select
                    value={major1}
                    onChange={(e) => setMajor1(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none"
                  >
                    <option value="Mathematics">{t('subj.math')}</option>
                    <option value="Physics">{t('subj.physics')}</option>
                    <option value="Chemistry">{t('subj.chemistry')}</option>
                    <option value="Biology">{t('subj.biology')}</option>
                    <option value="History">{t('subj.history')}</option>
                    <option value="Mother Tongue">{t('subj.mother_tongue')}</option>
                    <option value="Foreign Language">{t('subj.english')}</option>
                  </select>
                  <select
                    value={major2}
                    onChange={(e) => setMajor2(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none"
                  >
                    <option value="Physics">{t('subj.physics')}</option>
                    <option value="Mathematics">{t('subj.math')}</option>
                    <option value="Chemistry">{t('subj.chemistry')}</option>
                    <option value="Biology">{t('subj.biology')}</option>
                    <option value="History">{t('subj.history')}</option>
                    <option value="Mother Tongue">{t('subj.mother_tongue')}</option>
                    <option value="Foreign Language">{t('subj.english')}</option>
                  </select>
                </div>
                {major1 === major2 && (
                  <p className="text-[9px] text-red-500 font-semibold mt-1">
                    {lang === 'uz' 
                      ? "Ikkita bir xil fanni tanlash mumkin emas." 
                      : "Cannot select the same subject twice."}
                  </p>
                )}
              </div>

              <div className="grid gap-3 grid-cols-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700">GPA</label>
                  <input
                    type="number"
                    step="0.01" min="1" max="4"
                    value={gpa} onChange={(e) => setGpa(e.target.value)}
                    placeholder="3.86"
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700">IELTS</label>
                  <input
                    type="number"
                    step="0.5" min="0" max="9"
                    value={ielts} onChange={(e) => setIelts(e.target.value)}
                    placeholder="6.5"
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700">SAT</label>
                  <input
                    type="number"
                    step="10" min="400" max="1600"
                    value={sat} onChange={(e) => setSat(e.target.value)}
                    placeholder="1380"
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {lang === 'uz' ? 'Hudud va ta\'lim muassasasi' : 'Region & Educational Institution'}
                </h3>
                <div className="grid gap-2 sm:grid-cols-3">
                  <select
                    value={selectedRegion} onChange={(e) => handleRegionChange(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2 text-[10px] text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 outline-none transition-all appearance-none"
                  >
                    {allRegions.map((reg) => (
                      <option key={reg} value={reg}>{getLocalizedRegionName(reg, lang)}</option>
                    ))}
                  </select>
                  <select
                    value={selectedDistrict} onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2 text-[10px] text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 outline-none transition-all appearance-none"
                  >
                    {getDistrictsByRegion(selectedRegion).map((d) => (
                      <option key={d.id} value={d.name}>{getLocalizedDistrictName(d.name, lang)}</option>
                    ))}
                  </select>
                  <select
                    value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2 text-[10px] text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 outline-none transition-all appearance-none"
                  >
                    {getSchoolsByDistrict(selectedRegion, selectedDistrict).map((s) => {
                      let displayName = s.name
                      if (lang === 'uz') {
                        displayName = displayName.replace("School No. ", "").replace(" of ", "-sonli maktabi").replace("Presidential School in Tashkent", "Tashkent Prezident maktabi").replace("Pakhtakor Specialized School", "Paxtakor ixtisoslashtirilgan maktabi")
                      }
                      return <option key={s.id} value={s.name}>{displayName}</option>
                    })}
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2 pb-2">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
                  <ShieldAlert className="size-3" />
                  {lang === 'uz' ? "Ijtimoiy status" : "Social Status"}
                </h3>
                <div className="grid gap-2 sm:grid-cols-3">
                  <select
                    value={familyStatus} onChange={(e) => setFamilyStatus(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2 text-[10px] text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 outline-none transition-all appearance-none"
                  >
                    <option value="Standard">{t('social.standard')}</option>
                    <option value="Orphaned">{t('social.orphaned')}</option>
                    <option value="Single Parent">{t('social.single_parent')}</option>
                  </select>
                  <select
                    value={healthStatus} onChange={(e) => setHealthStatus(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2 text-[10px] text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 outline-none transition-all appearance-none"
                  >
                    <option value="None">{t('social.no_disability')}</option>
                    <option value="Physical Disability">{t('social.disabled')}</option>
                  </select>
                  <select
                    value={financialStanding} onChange={(e) => setFinancialStanding(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200/50 rounded-xl p-2 text-[10px] text-slate-900 focus:bg-white/90 focus:border-blue-500 focus:ring-1 outline-none transition-all appearance-none"
                  >
                    <option value="Stable">{t('social.stable')}</option>
                    <option value="Vulnerable">{t('social.vulnerable')}</option>
                    <option value="Highly Vulnerable">{t('social.highly_vulnerable')}</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl py-3.5 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2">
              {lang === 'uz' ? "Ro'yxatdan o'tish" : 'Register & Log In'}
              <ArrowRight className="size-4" />
            </button>
          </form>
        )}
      </div>

      {/* Floating Utility Tray for Quick Dev Logins */}
      <div className="z-10 flex flex-col items-center mt-6">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-center mb-3">
          {lang === 'uz' ? 'Tezkor Demo Kirish:' : 'Quick Demo Access:'}
        </p>
        <div className="flex flex-wrap justify-center gap-2 max-w-lg">
          <button onClick={() => onLogin('counselor')} className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700 hover:bg-white/80 hover:text-blue-600 text-xs py-2 px-3 rounded-full shadow-sm transition-all flex items-center gap-1.5 font-medium">
            <UserCheck className="size-3.5" />
            {t('role.counselor')}
          </button>
          <button onClick={() => onLogin('regional_director')} className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700 hover:bg-white/80 hover:text-blue-600 text-xs py-2 px-3 rounded-full shadow-sm transition-all flex items-center gap-1.5 font-medium">
            <ShieldAlert className="size-3.5" />
            {t('role.regional_director')}
          </button>
          <button onClick={() => onLogin('school_director')} className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700 hover:bg-white/80 hover:text-blue-600 text-xs py-2 px-3 rounded-full shadow-sm transition-all flex items-center gap-1.5 font-medium">
            <Sparkles className="size-3.5" />
            {t('role.school_director')}
          </button>
          <button onClick={() => onLogin('republican_admin')} className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700 hover:bg-white/80 hover:text-blue-600 text-xs py-2 px-3 rounded-full shadow-sm transition-all flex items-center gap-1.5 font-medium">
            <Award className="size-3.5" />
            {t('role.republican_admin')}
          </button>
        </div>
      </div>
      
    </div>
  )
}
