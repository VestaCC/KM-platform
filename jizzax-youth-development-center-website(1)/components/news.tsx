"use client";

import Image from "next/image";
import { ArrowRight, Calendar, Tag, Inbox, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

import Link from "next/link";
import { createPortal } from "react-dom";
import { formatFullDate } from "@/lib/utils";
import ErrorCard from "@/components/ui/error-card";

interface NewsItem {
  id: string;
  title: { UZ: string; RU: string; EN: string };
  category: string;
  description: { UZ: string; RU: string; EN: string };
  image_url: string;
  published_at: string;
}

interface NewsProps {
  items: NewsItem[];
  isTeaser?: boolean;
  errorMsg?: string;
}

export default function News({ items, isTeaser = false, errorMsg }: NewsProps) {
  const { language } = useLanguage();
  const t = translations.news;
  const [selectedItem, setSelectedItem] = useState<NewsItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section id="news" className="py-20 lg:py-28 xl:py-24 bg-white">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 xl:mb-10">
          <div>
            <span
              className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#3b82f6" }}
            >
              {t.badge[language]}
            </span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-balance"
              style={{ color: "#0f172a" }}
            >
              {t.title[language]}
            </h2>
          </div>
          {isTeaser && (
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors whitespace-nowrap hover:opacity-70 cursor-pointer text-left"
              style={{ color: "#1a3a6b" }}
            >
              {t.viewAll[language]}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </header>

        {/* Empty State / Error State */}
        {errorMsg ? (
          <ErrorCard message={errorMsg} />
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-muted-foreground">
              {language === "UZ"
                ? "Hozircha yangiliklar yo'q"
                : language === "RU"
                ? "Новостей пока нет"
                : "No news yet"}
            </p>
          </div>
        ) : (
          /* Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-6">
            {items.map((item) => {
              const categoryLabel =
                t.categories[item.category as keyof typeof t.categories]?.[language] ||
                item.category;

              const publishDate = new Date(item.published_at);
              const dateStr = formatFullDate(publishDate, language);

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title[language] || ""}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Inbox className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {dateStr}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{ backgroundColor: "#eff6ff", color: "#1a3a6b" }}
                      >
                        <Tag className="w-3 h-3" />
                        {categoryLabel}
                      </span>
                    </div>
                    <h3
                      className="font-bold text-lg mb-2 leading-snug text-balance text-slate-900"
                    >
                      {item.title[language] || item.title.UZ || ""}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1 line-clamp-3 text-pretty">
                      {item.description[language] || item.description.UZ || ""}
                    </p>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70 cursor-pointer text-left self-start"
                      style={{ color: "#1a3a6b" }}
                    >
                      {t.readMore[language]}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Modal via Portal */}
      {selectedItem && mounted && createPortal(
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-modal-backdrop"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title[language] || "News detail"}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] shadow-2xl relative flex flex-col animate-modal-content overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - fixed in outer container */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-white/80 backdrop-blur hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer shadow-sm border border-slate-100"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Content wrapper */}
            <div className="overflow-y-auto p-6 sm:p-7 flex flex-col gap-4 flex-1">
              {/* Image */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                {selectedItem.image_url ? (
                  <Image
                    src={selectedItem.image_url}
                    alt={selectedItem.title[language] || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Inbox className="w-12 h-12 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Meta tags */}
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatFullDate(new Date(selectedItem.published_at), language)}
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "#eff6ff", color: "#1a3a6b" }}
                >
                  <Tag className="w-3 h-3" />
                  {t.categories[selectedItem.category as keyof typeof t.categories]?.[language] || selectedItem.category}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {selectedItem.title[language] || selectedItem.title.UZ || ""}
              </h3>
              <div className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-wrap flex-1">
                {selectedItem.description[language] || selectedItem.description.UZ || ""}
              </div>

              {/* Close footer button */}
              <div className="border-t border-gray-100 pt-4 flex justify-end mt-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-slate-700 cursor-pointer"
                >
                  {language === "UZ" ? "Yopish" : language === "RU" ? "Закрыть" : "Close"}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
