"use client";

import Link from "next/link";
import { HelpCircle, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function NotFound() {
  const { language } = useLanguage();
  const t = translations.notFound;

  return (
    <main className="min-h-[75vh] flex items-center justify-center p-6 bg-slate-50/50">
      <div 
        className="w-full max-w-md text-center flex flex-col items-center gap-6 animate-fade-in"
        role="main"
      >
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1a3a6b] mb-2 animate-pulse">
          <HelpCircle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-sm font-extrabold tracking-widest text-blue-500 uppercase mb-2 block">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-3">
            {t.title[language]}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-sm mx-auto">
            {t.subtitle[language]}
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            aria-label={`${t.backHome[language]} - return to homepage`}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1a3a6b] hover:bg-[#112a52] rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backHome[language]}
          </Link>
        </div>
      </div>
    </main>
  );
}
