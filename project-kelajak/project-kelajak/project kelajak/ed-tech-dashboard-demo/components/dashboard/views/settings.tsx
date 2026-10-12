'use client'

import { Globe, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage, type Lang } from '@/lib/language-context'

export function SettingsView() {
  const { lang, setLang, t } = useLanguage()

  const languages: { code: Lang; label: string; native: string; flag: string }[] = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'uz', label: "O'zbekcha", native: "O'zbek tili", flag: '🇺🇿' },
  ]

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-2xl">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold text-foreground">{t('settings.title')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('settings.language_desc')}
        </p>
      </div>

      {/* Language Selection */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Globe className="size-5 text-blue-600" />
            <CardTitle className="text-base font-bold">{t('settings.language')}</CardTitle>
          </div>
          <CardDescription>{t('settings.language_desc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {languages.map((l) => {
              const isActive = lang === l.code
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`relative flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isActive
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/20 ring-1 ring-blue-600'
                      : 'border-border bg-card hover:border-blue-400 hover:shadow-md'
                  }`}
                >
                  <span className="text-3xl">{l.flag}</span>
                  <div className="flex-1">
                    <p className="font-heading text-sm font-bold text-foreground">{l.native}</p>
                    <p className="text-xs text-muted-foreground">{l.label}</p>
                  </div>
                  {isActive && (
                    <CheckCircle2 className="size-5 text-blue-600 absolute top-3 right-3" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Live preview strip */}
          <div className="mt-5 rounded-xl bg-muted/40 border border-border/40 p-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
              {lang === 'en' ? 'Live Preview' : 'Jonli ko\'rinish'}
            </p>
            <div className="grid gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('metric.participation_rate')}</span>
                <span className="font-bold text-emerald-600">72.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('metric.active_students')}</span>
                <span className="font-bold">896</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('table.rank')}</span>
                <span className="font-bold">#1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('status.high')}</span>
                <span className="font-bold text-emerald-600">✓</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
