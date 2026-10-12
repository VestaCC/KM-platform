"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface ErrorCardProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorCard({ message, onRetry }: ErrorCardProps) {
  const { language } = useLanguage();

  const defaultMessage =
    language === "UZ"
      ? "Ma'lumotlarni yuklashda xatolik yuz berdi."
      : language === "RU"
      ? "Произошла ошибка при загрузке данных."
      : "An error occurred while loading data.";

  const retryText =
    language === "UZ"
      ? "Qayta urinish"
      : language === "RU"
      ? "Повторить попытку"
      : "Try Again";

  const getMaskedMessage = (rawMsg?: string) => {
    if (!rawMsg) return defaultMessage;
    if (rawMsg.includes("Could not find the table") || rawMsg.includes("schema cache")) {
      return translations.errors.dbSchemaNotFound[language];
    }
    return rawMsg;
  };

  return (
    <section 
      className="w-full p-6 rounded-2xl border border-red-100 bg-red-50/20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in"
      role="alert"
      aria-live="polite"
    >
      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
        <AlertCircle className="w-5 h-5" />
      </div>

      <div className="max-w-md">
        <p className="text-sm font-semibold text-slate-800">
          {getMaskedMessage(message)}
        </p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          aria-label="Ma'lumotlarni qaytadan yuklash / Retry fetching the data"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100/80 rounded-xl transition-all cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          {retryText}
        </button>
      )}
    </section>
  );
}
