import { NewsCardSkeleton, EventRowSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6 py-24 animate-pulse" role="status" aria-label="Loading">
      <div className="h-4 bg-slate-200 rounded w-28 mb-3" />
      <div className="h-10 bg-slate-200 rounded-lg w-72 mb-12" />

      {/* News section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-6 mb-16">
        <NewsCardSkeleton />
        <NewsCardSkeleton />
        <NewsCardSkeleton />
      </div>

      {/* Events section title */}
      <div className="h-4 bg-slate-200 rounded w-24 mb-3" />
      <div className="h-8 bg-slate-200 rounded-lg w-64 mb-8" />

      {/* Events list */}
      <div className="flex flex-col gap-4">
        <EventRowSkeleton />
        <EventRowSkeleton />
      </div>
    </div>
  );
}
