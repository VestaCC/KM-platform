import { cn } from '@/lib/utils'

type SparklineProps = {
  data: number[]
  width?: number
  height?: number
  className?: string
  strokeClass?: string
  fillClass?: string
}

export function Sparkline({
  data,
  width = 240,
  height = 64,
  className,
  strokeClass = 'text-success',
  fillClass = 'text-success/15',
}: SparklineProps) {
  if (data.length === 0) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const points = data.map((d, i) => {
    const x = i * stepX
    const y = height - ((d - min) / range) * (height - 8) - 4
    return [x, y] as const
  })

  const linePath = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`
  const [lastX, lastY] = points[points.length - 1]

  return (
    <svg width={width} height={height} className={cn('w-full', className)} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={areaPath} fill="currentColor" className={fillClass} />
      <path d={linePath} fill="none" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" className={strokeClass} />
      <circle cx={lastX} cy={lastY} r={4} fill="currentColor" className={strokeClass} />
    </svg>
  )
}
