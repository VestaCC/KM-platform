"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { directionsData } from "@/data/directions";
import DirectionCard from "./direction-card";

export default function Directions() {
  const { language } = useLanguage();
  const t = translations.directions;

  // Accordion active state
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="directions"
      className="py-20 lg:py-28 xl:py-24 bg-slate-50/50"
    >
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6">
        <header className="text-center mb-14 xl:mb-11">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#3b82f6" }}
          >
            {t.badge[language]}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-balance mb-4 text-slate-900"
          >
            {t.title[language]}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base text-pretty">
            {t.subtitle[language]}
          </p>
        </header>

        {/* 3-column, 2-column, 1-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-5">
          {directionsData.map((item) => (
            <DirectionCard
              key={item.id}
              item={item}
              language={language}
              isExpanded={expandedId === item.id}
              onToggle={() => toggleExpand(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
