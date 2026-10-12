import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

type ProgressRingProps = {
  value: number // 0-100
  size?: number
  stroke?: number
  label: string
  sublabel?: string
  className?: string
  colorClass?: string // tailwind text-* color for the arc
}

export function ProgressRing({
  value,
  size = 132,
  stroke = 10,
  label,
  sublabel,
  className,
  colorClass = 'text-accent',
}: ProgressRingProps) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))
  const targetOffset = circumference - (clamped / 100) * circumference
  
  const [animatedOffset, setAnimatedOffset] = useState(circumference)

  useEffect(() => {
    // Small timeout to trigger transition after render
    const timer = setTimeout(() => {
      setAnimatedOffset(targetOffset)
    }, 100)
    return () => clearTimeout(timer)
  }, [targetOffset])

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="text-muted/20 dark:text-slate-800"
            stroke="currentColor"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animatedOffset}
            className={cn('transition-[stroke-dashoffset] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]', colorClass)}
            stroke="currentColor"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-bold text-foreground">{label}</span>
          {sublabel && <span className="text-[10px] uppercase font-bold text-muted-foreground mt-0.5">{sublabel}</span>}
        </div>
      </div>
    </div>
  )
}
