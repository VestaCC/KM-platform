import { Clock, Users, Award, BookOpen, Calendar, MapPin, Inbox } from "lucide-react";

// Reusable animated skeleton card for News
export function NewsCardSkeleton() {
  return (
    <article className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col pointer-events-none animate-pulse">
      {/* Aspect Ratio block for Image */}
      <div className="aspect-[16/9] w-full bg-slate-100 flex items-center justify-center">
        <Inbox className="w-8 h-8 text-slate-200" />
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 mb-3">
          {/* Date skeleton */}
          <div className="h-3.5 bg-slate-100 rounded w-20" />
          {/* Tag skeleton */}
          <div className="h-5 bg-slate-100 rounded-full w-16" />
        </div>
        
        {/* Title skeleton */}
        <div className="h-5 bg-slate-100 rounded-lg w-5/6 mb-2" />
        <div className="h-5 bg-slate-100 rounded-lg w-1/2 mb-4" />
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-5 flex-1">
          <div className="h-3 bg-slate-100 rounded w-full" />
          <div className="h-3 bg-slate-100 rounded w-11/12" />
          <div className="h-3 bg-slate-100 rounded w-3/4" />
        </div>
        
        {/* Action button skeleton */}
        <div className="h-4 bg-slate-100 rounded w-24" />
      </div>
    </article>
  );
}

// Reusable list page skeleton for Events
export function EventRowSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center animate-pulse pointer-events-none">
      {/* Date tile skeleton */}
      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-100 flex flex-col items-center justify-center" />
      
      {/* Content skeleton */}
      <div className="flex-1 w-full space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-5 bg-slate-100 rounded-full w-20" />
          <div className="h-4 bg-slate-100 rounded w-24" />
        </div>
        <div className="h-5 bg-slate-100 rounded-lg w-2/3" />
        <div className="h-3.5 bg-slate-100 rounded w-5/6" />
        
        {/* Footer meta */}
        <div className="flex flex-wrap gap-4 pt-1">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-200" />
            <div className="h-3 bg-slate-100 rounded w-28" />
          </div>
        </div>
      </div>
      
      {/* CTA Button skeleton */}
      <div className="h-10 bg-slate-100 rounded-xl w-full sm:w-28 flex-shrink-0" />
    </div>
  );
}

// Reusable grid loader for Gallery images
export function GalleryItemSkeleton() {
  return (
    <div className="relative aspect-[4/3] rounded-2xl bg-slate-100 animate-pulse overflow-hidden pointer-events-none" />
  );
}

// Reusable loading loader for Directions
export function DirectionsCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex flex-col animate-pulse pointer-events-none">
      {/* Icon block */}
      <div className="w-12 h-12 rounded-xl bg-slate-100 mb-5" />
      {/* Title */}
      <div className="h-5 bg-slate-100 rounded-lg w-2/3 mb-3" />
      {/* Description */}
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-5/6" />
        <div className="h-3 bg-slate-100 rounded w-11/12" />
      </div>
    </div>
  );
}

// Reusable loading card for Courses (future use)
export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col pointer-events-none animate-pulse">
      {/* Image box */}
      <div className="relative aspect-[16/10] bg-slate-100 flex items-center justify-center">
        <BookOpen className="w-10 h-10 text-slate-200" />
      </div>
      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-5 w-20 bg-slate-100 rounded-full" />
          <div className="h-4 w-24 bg-slate-50 rounded" />
        </div>
        <div className="h-6 bg-slate-100 rounded-lg w-3/4 mb-3" />
        <div className="space-y-2 mb-6 flex-1">
          <div className="h-3.5 bg-slate-100 rounded w-full" />
          <div className="h-3.5 bg-slate-100 rounded w-5/6" />
        </div>
        {/* Meta items */}
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-slate-200" />
            <div className="h-3 bg-slate-50 rounded w-12" />
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-slate-200" />
            <div className="h-3 bg-slate-50 rounded w-16" />
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-slate-200" />
            <div className="h-3 bg-slate-50 rounded w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
