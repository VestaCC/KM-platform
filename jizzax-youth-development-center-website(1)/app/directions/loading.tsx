import { DirectionsCardSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6 py-24 animate-pulse" role="status" aria-label="Loading">
      <div className="h-4 bg-slate-200 rounded w-20 mb-3 mx-auto" />
      <div className="h-10 bg-slate-200 rounded-lg w-72 mb-4 mx-auto" />
      <div className="h-4 bg-slate-200 rounded w-96 mb-12 mx-auto" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <DirectionsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
