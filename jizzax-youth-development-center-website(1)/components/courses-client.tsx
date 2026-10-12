"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { BookOpen, GraduationCap, Clock, Users, Award, Inbox } from "lucide-react";

export default function CoursesClient() {
  const { language } = useLanguage();
  const t = translations.courses;
  const tHeader = translations.header;

  const skeletons = Array.from({ length: 6 });

  return (
    <section className="py-20 lg:py-28 xl:py-24 bg-slate-50">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6">
        <header className="text-center mb-14 xl:mb-11">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#3b82f6" }}
          >
            {t.badge[language]}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-balance mb-4 text-slate-900"
          >
            {t.title[language]}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.subtitle[language]}
          </p>
        </header>

        {/* Coming Soon Notice Card */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6">
            {/* Background pattern */}
            <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50/50 rounded-bl-full -z-10" />
            
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50 flex-shrink-0 animate-bounce">
              <GraduationCap className="w-7 h-7 text-primary" style={{ color: "#1a3a6b" }} />
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#1a3a6b] bg-blue-50 mb-2">
                {t.comingSoon[language]}
              </span>
              <h3 className="text-lg font-bold text-slate-950 mb-2">
                {language === "UZ" ? "Kurslar tez kunda ro'yxatga olinadi" : language === "RU" ? "Курсы скоро будут опубликованы" : "Courses Will Be Available Soon"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.helpText[language]}
              </p>
            </div>
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-6">
          {skeletons.map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col pointer-events-none"
            >
              {/* Card Image Skeleton */}
              <div className="relative aspect-[16/10] bg-slate-100 animate-pulse flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-slate-200" />
              </div>

              {/* Card Body Skeleton */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  {/* Tag Skeleton */}
                  <div className="h-5 w-20 bg-slate-100 rounded-full animate-pulse" />
                  {/* Date/Status Skeleton */}
                  <div className="h-4 w-24 bg-slate-50 rounded animate-pulse" />
                </div>

                {/* Heading Skeleton */}
                <div className="h-6 bg-slate-100 rounded-lg animate-pulse w-3/4 mb-3" />

                {/* Paragraph Skeletons */}
                <div className="space-y-2 mb-6 flex-1">
                  <div className="h-3.5 bg-slate-100 rounded animate-pulse w-full" />
                  <div className="h-3.5 bg-slate-100 rounded animate-pulse w-5/6" />
                  <div className="h-3.5 bg-slate-100 rounded animate-pulse w-4/5" />
                </div>

                {/* Footer Meta Skeleton */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-slate-200" />
                    <div className="h-3 bg-slate-50 rounded animate-pulse w-12" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-slate-200" />
                    <div className="h-3 bg-slate-50 rounded animate-pulse w-16" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-slate-200" />
                    <div className="h-3 bg-slate-50 rounded animate-pulse w-10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
