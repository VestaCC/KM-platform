"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const { language } = useLanguage();
  const t = translations.errors;

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Runtime error caught at boundary:", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center p-6 bg-slate-50/50">
      <div 
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center flex flex-col items-center gap-6 animate-fade-in"
        role="alert"
        aria-live="assertive"
      >
        <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight mb-2">
            {t.globalTitle[language]}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t.globalSubtitle[language]}
          </p>
          {error.digest && (
            <p className="text-[10px] text-slate-400 font-mono mt-2">
              ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            type="button"
            onClick={() => reset()}
            aria-label={`${t.retry[language]} - retry screen action`}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#1a3a6b] hover:bg-[#112a52] rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            {t.retry[language]}
          </button>
          
          <Link
            href="/"
            aria-label={`${t.home[language]} - return to homepage`}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            {t.home[language]}
          </Link>
        </div>
      </div>
    </main>
  );
}
