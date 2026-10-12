export default function Loading() {
  return (
    <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6 py-24 animate-pulse" role="status" aria-label="Loading">
      <div className="h-4 bg-slate-200 rounded w-20 mb-3 mx-auto" />
      <div className="h-10 bg-slate-200 rounded-lg w-64 mb-4 mx-auto" />
      <div className="h-4 bg-slate-200 rounded w-96 mb-12 mx-auto" />

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Info card list skeletons */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0" />
              <div className="space-y-1.5 flex-1 pt-1.5">
                <div className="h-3 bg-slate-200 rounded w-20" />
                <div className="h-4.5 bg-slate-100 rounded w-48" />
              </div>
            </div>
          ))}
          {/* Social icons block */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-3">
            <div className="h-3 bg-slate-200 rounded w-24" />
            <div className="flex gap-2">
              <div className="h-9 bg-slate-100 rounded-xl w-24 animate-pulse" />
              <div className="h-9 bg-slate-100 rounded-xl w-24 animate-pulse" />
              <div className="h-9 bg-slate-100 rounded-xl w-24 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Map iframe skeleton */}
        <div className="lg:col-span-7 h-[450px] bg-slate-100 rounded-2xl" />
      </div>
    </div>
  );
}
