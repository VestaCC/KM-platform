"use client";

import { Calendar, MapPin, ArrowRight, Inbox } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { formatFullDate, formatShortMonth } from "@/lib/utils";

interface EventItem {
  id: string;
  title: { UZ: string; RU: string; EN: string };
  category: string;
  description: { UZ: string; RU: string; EN: string };
  location: { UZ: string; RU: string; EN: string };
  event_date: string;
}

interface EventsProps {
  items: EventItem[];
  isTeaser?: boolean;
}

export default function Events({ items, isTeaser = false }: EventsProps) {
  const { language } = useLanguage();
  const t = translations.events;

  return (
    <section id="events" className="py-20 lg:py-28 xl:py-24" style={{ backgroundColor: "#f8fafc" }}>
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
              href="/news#events"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors whitespace-nowrap hover:opacity-70"
              style={{ color: "#1a3a6b" }}
            >
              {t.viewAll[language]}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </header>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-muted-foreground">
              {language === "UZ"
                ? "Hozircha tadbirlar yo'q"
                : language === "RU"
                ? "Мероприятий пока нет"
                : "No upcoming events"}
            </p>
          </div>
        ) : (
          /* Timeline */
          <div className="flex flex-col gap-4 xl:gap-3">
            {items.map((event) => {
              const eventDate = new Date(event.event_date);
              const monthShort = formatShortMonth(eventDate, language);
              const day = eventDate.getDate().toString().padStart(2, "0");
              const year = eventDate.getFullYear().toString();

              const categoryLabel =
                t.categories[event.category as keyof typeof t.categories]?.[language] ||
                event.category;

              const colorsStyle = {
                bg:
                  event.category === "Competition"
                    ? "#eff6ff"
                    : event.category === "Camp"
                    ? "#f0fdf4"
                    : event.category === "Academic"
                    ? "#fefce8"
                    : "#fdf4ff",
                color:
                  event.category === "Competition"
                    ? "#1a3a6b"
                    : event.category === "Camp"
                    ? "#166534"
                    : event.category === "Academic"
                    ? "#854d0e"
                    : "#7e22ce",
              };

              const dateStr = formatFullDate(eventDate, language, true);

              return (
                <article
                  key={event.id}
                  className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start hover:shadow-md transition-all duration-200"
                >
                  {/* Date box */}
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-center"
                    style={{ backgroundColor: "#1a3a6b" }}
                  >
                    <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">
                      {monthShort}
                    </span>
                    <span className="text-2xl font-extrabold text-white leading-none">
                      {day}
                    </span>
                    <span className="text-xs text-blue-200">{year}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: colorsStyle.bg,
                          color: colorsStyle.color,
                        }}
                      >
                        {categoryLabel}
                      </span>
                    </div>
                    <h3
                      className="font-bold text-lg mb-1 leading-snug"
                      style={{ color: "#0f172a" }}
                    >
                      {event.title[language] || event.title.UZ || ""}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 text-pretty">
                      {event.description[language] || event.description.UZ || ""}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.location[language] || event.location.UZ || ""}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={event.event_date}>{dateStr}</time>
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
