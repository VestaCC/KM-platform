export default function Loading() {
  return (
    <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6 py-24 animate-pulse" role="status" aria-label="Loading">
      <div className="h-4 bg-slate-200 rounded w-20 mb-3 mx-auto" />
      <div className="h-10 bg-slate-200 rounded-lg w-64 mb-14 mx-auto" />

      {/* Grid */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-12">
        {/* Image skeleton */}
        <div className="w-full lg:w-1/2 aspect-[4/3] bg-slate-100 rounded-2xl" />
        
        {/* Content skeleton */}
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-6" />
          <div className="space-y-2">
            <div className="h-3.5 bg-slate-100 rounded w-full" />
            <div className="h-3.5 bg-slate-100 rounded w-11/12" />
            <div className="h-3.5 bg-slate-100 rounded w-4/5" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-3.5 bg-slate-100 rounded w-full" />
            <div className="h-3.5 bg-slate-100 rounded w-5/6" />
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex-shrink-0" />
                <div className="space-y-1.5 flex-1 pt-1">
                  <div className="h-3 bg-slate-200 rounded w-16" />
                  <div className="h-2.5 bg-slate-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
