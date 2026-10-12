'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  Newspaper,
  ImageIcon,
  CalendarDays,
  Settings,
  LogOut,
  Loader2,
  Menu,
  X,
} from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { translations } from '@/lib/translations'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Integrate language context
  const { language, setLanguage } = useLanguage()
  const t = translations.admin

  const navItems = [
    { label: t.sidebar.dashboard[language], href: '/admin', icon: LayoutDashboard },
    { label: t.sidebar.news[language], href: '/admin/news', icon: Newspaper },
    { label: t.sidebar.gallery[language], href: '/admin/gallery', icon: ImageIcon },
    { label: t.sidebar.events[language], href: '/admin/events', icon: CalendarDays },
    { label: t.sidebar.settings[language], href: '/admin/settings', icon: Settings },
  ]

  const isPublicRoute =
    pathname === '/admin/login' ||
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/reset-password'

  useEffect(() => {
    if (isPublicRoute) {
      return
    }
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/admin/login')
      } else {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router, pathname, isPublicRoute])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  if (isPublicRoute) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-[#1a3a6b] animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-30">
        <div className="p-5 border-b border-gray-100 flex flex-col gap-3">
          <div>
            <h1 className="text-lg font-bold text-[#1a3a6b]">Admin Panel</h1>
            <p className="text-xs text-gray-400 mt-0.5">Content Management</p>
          </div>
          {/* Language Toggle buttons */}
          <div className="flex gap-1 p-0.5 bg-slate-50 border border-slate-200/50 rounded-lg">
            {(["UZ", "RU", "EN"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 text-[10px] font-bold py-1 px-1.5 rounded transition-all ${
                  language === lang
                    ? "bg-[#1a3a6b] text-white shadow-sm"
                    : "text-slate-500 hover:text-[#1a3a6b] hover:bg-slate-100/50"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-[#1a3a6b]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="w-4.5 h-4.5" />
            {t.buttons.logout[language]}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-[#1a3a6b]">Admin Panel</h1>
        
        <div className="flex items-center gap-3">
          {/* Mobile Language Selector Toggle */}
          <div className="flex gap-1 p-0.5 bg-slate-50 border border-slate-200/50 rounded-lg">
            {(["UZ", "RU", "EN"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-[9px] font-bold py-0.5 px-1.5 rounded transition-all ${
                  language === lang
                    ? "bg-[#1a3a6b] text-white shadow-sm"
                    : "text-slate-500"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 inset-y-0 w-64 bg-white shadow-xl flex flex-col">
            <div className="p-5 border-b border-gray-100">
              <h1 className="text-lg font-bold text-[#1a3a6b]">Admin Panel</h1>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-blue-50 text-[#1a3a6b]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
            <div className="p-3 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
              >
                <LogOut className="w-4.5 h-4.5" />
                {t.buttons.logout[language]}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
