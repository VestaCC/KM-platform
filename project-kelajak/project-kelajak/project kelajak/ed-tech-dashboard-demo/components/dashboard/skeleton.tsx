'use client'

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen w-full bg-[#090D16] text-slate-400 overflow-hidden animate-pulse">
      {/* Sidebar Skeleton */}
      <div className="hidden w-64 border-r border-slate-800/60 bg-slate-950/40 p-5 md:flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-slate-800" />
          <div className="h-4 w-28 rounded bg-slate-800" />
        </div>
        <div className="space-y-3 mt-4">
          <div className="h-9 w-full rounded-lg bg-slate-800/80" />
          <div className="h-9 w-full rounded-lg bg-slate-800/40" />
          <div className="h-9 w-full rounded-lg bg-slate-800/40" />
          <div className="h-9 w-full rounded-lg bg-slate-800/40" />
          <div className="h-9 w-full rounded-lg bg-slate-800/40" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Skeleton */}
        <div className="h-16 border-b border-slate-800/60 bg-slate-950/20 px-6 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-3 w-20 rounded bg-slate-800" />
            <div className="h-5 w-48 rounded bg-slate-800" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 rounded-full bg-slate-800" />
            <div className="h-10 w-10 rounded-full bg-slate-800" />
            <div className="h-10 w-10 rounded-full bg-slate-800" />
          </div>
        </div>

        {/* Content Body Skeleton */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header Card Mesh Skeleton */}
          <div className="h-32 w-full rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800/60 to-slate-900 border border-slate-800/60 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-slate-800" />
              <div className="space-y-2">
                <div className="h-6 w-40 rounded bg-slate-800" />
                <div className="h-3.5 w-60 rounded bg-slate-800/60" />
              </div>
            </div>
            <div className="h-10 w-32 rounded-lg bg-slate-800" />
          </div>

          {/* Bento Grid Skeleton */}
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="sm:col-span-2 h-40 rounded-xl bg-slate-900/40 border border-slate-800/40 p-5 space-y-4">
              <div className="h-3 w-24 rounded bg-slate-800" />
              <div className="h-8 w-16 rounded bg-slate-800" />
              <div className="h-2 w-full rounded bg-slate-800" />
            </div>
            <div className="h-40 rounded-xl bg-slate-900/40 border border-slate-800/40 flex flex-col items-center justify-center p-5 gap-3">
              <div className="size-16 rounded-full border-4 border-slate-800" />
              <div className="h-3 w-16 rounded bg-slate-800" />
            </div>
            <div className="h-40 rounded-xl bg-slate-900/40 border border-slate-800/40 flex flex-col items-center justify-center p-5 gap-3">
              <div className="size-16 rounded-full border-4 border-slate-800" />
              <div className="h-3 w-16 rounded bg-slate-800" />
            </div>
          </div>

          {/* Lower layout rows */}
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 h-64 rounded-xl bg-slate-900/40 border border-slate-800/40 p-5 space-y-4">
              <div className="h-4 w-40 rounded bg-slate-800" />
              <div className="space-y-3">
                <div className="h-12 w-full rounded-lg bg-slate-800/30" />
                <div className="h-12 w-full rounded-lg bg-slate-800/30" />
                <div className="h-12 w-full rounded-lg bg-slate-800/30" />
              </div>
            </div>
            <div className="lg:col-span-5 h-64 rounded-xl bg-slate-900/40 border border-slate-800/40 p-5 space-y-4">
              <div className="h-4 w-40 rounded bg-slate-800" />
              <div className="h-10 w-full rounded-lg bg-slate-800/50" />
              <div className="h-10 w-full rounded-lg bg-slate-800/30" />
              <div className="h-10 w-full rounded-lg bg-slate-800/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
