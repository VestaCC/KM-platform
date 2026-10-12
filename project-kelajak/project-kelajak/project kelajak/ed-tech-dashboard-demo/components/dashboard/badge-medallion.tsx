import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const toneMap: Record<string, string> = {
  success: 'bg-success/12 text-success ring-success/25',
  accent: 'bg-accent/12 text-accent ring-accent/25',
  warning: 'bg-warning/20 text-warning-foreground ring-warning/40',
  primary: 'bg-primary/10 text-primary ring-primary/25',
}

type BadgeMedallionProps = {
  icon: LucideIcon
  name: string
  desc?: string
  tone?: keyof typeof toneMap
  className?: string
}

export function BadgeMedallion({ icon: Icon, name, desc, tone = 'accent', className }: BadgeMedallionProps) {
  return (
    <div
      className={cn(
        'group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:shadow-lg',
        className,
      )}
    >
      <div
        className={cn(
          'flex size-14 items-center justify-center rounded-full ring-4 transition-transform group-hover:scale-110',
          toneMap[tone],
        )}
      >
        <Icon className="size-7" />
      </div>
      <div>
        <p className="font-heading text-sm font-semibold leading-tight text-foreground">{name}</p>
        {desc && <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>}
      </div>
    </div>
  )
}
