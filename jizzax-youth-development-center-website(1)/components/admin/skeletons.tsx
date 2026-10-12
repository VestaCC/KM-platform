export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="grid border-b border-gray-100 bg-gray-50 px-4 py-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-20" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid px-4 py-3 border-b border-gray-50"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-4 bg-gray-100 rounded animate-pulse" style={{ width: `${50 + Math.random() * 30}%` }} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
      </div>
    </div>
  )
}

export function EventSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start animate-pulse">
      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gray-200" />
      <div className="flex-1 space-y-3 w-full">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="flex gap-4">
          <div className="h-3 bg-gray-100 rounded w-24" />
          <div className="h-3 bg-gray-100 rounded w-24" />
        </div>
      </div>
    </div>
  )
}

export function GallerySkeleton() {
  return (
    <div className="aspect-[4/3] rounded-2xl bg-gray-200 animate-pulse" />
  )
}

export function DashboardCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
      <div className="h-8 bg-gray-200 rounded w-16" />
    </div>
  )
}
