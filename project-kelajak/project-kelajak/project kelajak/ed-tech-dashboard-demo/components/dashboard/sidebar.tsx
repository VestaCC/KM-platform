'use client'

import {
  GraduationCap,
  Compass,
  Building2,
  Users,
  LayoutDashboard,
  Sparkles,
  LogOut,
  Settings,
  Award,
  BarChart4,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { type UserRole } from '@/components/dashboard/views/login'
import { type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export interface SidebarProps {
  activeRole: UserRole
  activeTab: string
  onChangeTab: (tab: string) => void
  onLogout: () => void
}

interface NavItem {
  key: string
  label: string
  module: string
  icon: LucideIcon
}

function getNavItems(role: UserRole, t: (k: string) => string, lang: string): NavItem[] {
  const studentNavItems: NavItem[] = [
    { key: 'student_hub', label: t('sidebar.profile'), module: lang === 'uz' ? 'A Modul' : 'Module A', icon: GraduationCap },
    { key: 'courses', label: 'Kurslar va Sertifikatlar', module: lang === 'uz' ? 'C Modul' : 'Module C', icon: BookOpen },
    { key: 'future_map', label: t('sidebar.future_map'), module: lang === 'uz' ? 'B Modul' : 'Module B', icon: Compass },
    { key: 'consulting', label: t('sidebar.consulting'), module: lang === 'uz' ? "Yo'l Xaritasi" : 'AI Roadmap', icon: Sparkles },
    { key: 'market', label: t('sidebar.market'), module: lang === 'uz' ? 'D Modul' : 'Module D', icon: Building2 },
    { key: 'alumni', label: t('sidebar.alumni'), module: lang === 'uz' ? 'E Modul' : 'Module E', icon: Users },
  ]

  const counselorNavItems: NavItem[] = [
    { key: 'counselor_roster', label: t('sidebar.counselor_roster'), module: lang === 'uz' ? 'E Modul' : 'Module E', icon: Users },
    { key: 'certificate_ranking', label: t('sidebar.certificate_ranking'), module: lang === 'uz' ? 'DTM Reyting' : 'DTM Rating', icon: Award },
  ]

  const regionalDirectorNavItems: NavItem[] = [
    { key: 'regional_dashboard', label: t('sidebar.regional_dashboard') || 'Tahliliy Hub', module: lang === 'uz' ? 'Filial Tahlili' : 'Branch Analytics', icon: LayoutDashboard },
    { key: 'statistics_dashboard', label: t('sidebar.statistics_dashboard') || 'Statistics Portal', module: lang === 'uz' ? 'Statistika' : 'Statistics', icon: BarChart4 },
  ]

  const schoolDirectorNavItems: NavItem[] = [
    { key: 'school_director', label: t('sidebar.school_director') || 'Maktab ko\'rsatkichlari', module: lang === 'uz' ? 'Tahlil va KPI' : 'KPI Analysis', icon: LayoutDashboard },
  ]

  const republicanAdminNavItems: NavItem[] = [
    { key: 'republican_admin', label: t('sidebar.republican_admin') || 'Respublika tahlili', module: lang === 'uz' ? 'Makro Analitika' : 'Macro Analytics', icon: LayoutDashboard },
    { key: 'statistics_dashboard', label: t('sidebar.statistics_dashboard') || 'Statistics Portal', module: lang === 'uz' ? 'Statistika' : 'Statistics', icon: BarChart4 },
  ]

  const settingsNavItem: NavItem = { key: 'settings', label: t('settings.title'), module: lang === 'uz' ? 'Parametrlar' : 'Options', icon: Settings }

  switch (role) {
    case 'student':
      return [...studentNavItems, settingsNavItem]
    case 'counselor':
      return [...counselorNavItems, settingsNavItem]
    case 'regional_director':
      return [...regionalDirectorNavItems, settingsNavItem]
    case 'school_director':
      return [...schoolDirectorNavItems, settingsNavItem]
    case 'republican_admin':
      return [...republicanAdminNavItems, settingsNavItem]
    default:
      return []
  }
}

export function Sidebar({
  activeRole,
  activeTab,
  onChangeTab,
  onLogout,
}: SidebarProps) {
  const { lang, t } = useLanguage()
  const items = getNavItems(activeRole, t, lang)

  return (
    <aside className="w-64 h-screen max-h-screen flex flex-col justify-between sticky top-0 left-0 border-r border-sidebar-border/40 bg-sidebar z-30 shrink-0 p-4 text-sidebar-foreground max-md:hidden">
      <div className="flex flex-col gap-6">
      {/* Brand Header with Custom Logo */}
      <div className="flex items-center gap-3 px-2 pt-2 border-b border-sidebar-border/30 pb-4">
        <img
          src="/assets/logo.jpg"
          alt="Kelajak Markazi"
          className="size-11 rounded-xl object-cover ring-2 ring-blue-500"
        />
        <div className="leading-tight">
          <p className="font-heading text-base font-extrabold text-sidebar-accent-foreground tracking-tight">
            Kelajak
          </p>
          <p className="text-[11px] font-bold text-blue-400">
            {lang === 'uz' ? 'Markazi Platformasi' : 'Center Platform'}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Asosiy navigatsiya" className="flex flex-col gap-1.5">
        {items.map((item) => {
          const isActive = item.key === activeTab
          const Icon = item.icon
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChangeTab(item.key)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-all',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-blue-500/10'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span className="flex flex-col">
                <span className="text-sm font-semibold leading-none mb-0.5">{item.label}</span>
                <span
                  className={cn(
                    'text-[10px]',
                    isActive ? 'text-sidebar-primary-foreground/70' : 'text-sidebar-foreground/50',
                  )}
                >
                  {item.module}
                </span>
              </span>
            </button>
          )
        })}
      </nav>

      </div>

      {/* Bottom details & logout button */}
      <div className="mt-auto space-y-4">
        <div className="rounded-2xl bg-sidebar-accent/40 p-3.5 border border-sidebar-border/20">
          <p className="font-heading text-xs font-bold text-sidebar-accent-foreground uppercase tracking-wider">
            {t('nav.active_user')}
          </p>
          <p className="mt-1 text-xs text-sidebar-foreground/80 font-medium">
            {t(`role.${activeRole}`)}
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-start gap-2.5 rounded-2xl px-3.5 py-3 text-left text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="size-4" />
          <span>{t('nav.logout')}</span>
        </button>
      </div>
    </aside>
  )
}

export function MobileNav({
  activeRole,
  activeTab,
  onChangeTab,
  onLogout,
}: SidebarProps) {
  const { lang, t } = useLanguage()
  const items = getNavItems(activeRole, t, lang)

  return (
    <nav aria-label="Mobil navigatsiya" className="sticky top-0 z-20 flex items-center gap-2 overflow-x-auto border-b border-border bg-sidebar px-3 py-2 md:hidden">
      {items.map((item) => {
        const isActive = item.key === activeTab
        const Icon = item.icon
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChangeTab(item.key)}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors',
              isActive
                ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent',
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </button>
        )
      })}

      {/* Mobile Logout Button */}
      <button
        type="button"
        onClick={onLogout}
        aria-label={t('nav.logout')}
        className="ml-auto flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
      >
        <LogOut className="size-4" />
      </button>
    </nav>
  )
}