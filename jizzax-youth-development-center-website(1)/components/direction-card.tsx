"use client";


import {
  Languages,
  Cpu,
  Code2,
  FlaskConical,
  Palette,
  Trophy,
  BriefcaseBusiness,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { DirectionItem } from "@/data/directions";
import DirectionDetails from "./direction-details";

interface DirectionCardProps {
  item: DirectionItem;
  language: "UZ" | "RU" | "EN";
  isExpanded: boolean;
  onToggle: () => void;
}

const iconMap = {
  Languages: Languages,
  Cpu: Cpu,
  Code2: Code2,
  FlaskConical: FlaskConical,
  Palette: Palette,
  Trophy: Trophy,
  BriefcaseBusiness: BriefcaseBusiness
};

export default function DirectionCard({
  item,
  language,
  isExpanded,
  onToggle
}: DirectionCardProps) {
  const IconComponent = iconMap[item.iconName];

  return (
    <article
      className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col h-full overflow-hidden ${
        isExpanded
          ? "border-blue-200 shadow-md ring-1 ring-blue-50/50"
          : "border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-slate-200/80"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full text-left p-6 sm:p-7 flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
      >
        {/* Icon & Toggle button */}
        <div className="w-full flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-blue-50/70 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <IconComponent className="w-6 h-6 text-[#1a3a6b]" />
          </div>
          
          <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transition-transform duration-300 ${
            isExpanded ? "rotate-180 bg-blue-50/50 text-[#1a3a6b]" : ""
          }`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-lg text-slate-900 mb-2 leading-snug">
          {item.title[language]}
        </h3>
        
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
          {item.description[language]}
        </p>

        {/* Interactive hover arrow */}
        <div className="group flex items-center gap-1.5 text-xs font-semibold text-[#1a3a6b]">
          <span>
            {language === "UZ" ? "Batafsil" : language === "RU" ? "Подробнее" : "Learn More"}
          </span>
          <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${
            isExpanded ? "rotate-90 translate-y-0.5" : "translate-x-0 group-hover:translate-x-1"
          }`} />
        </div>
      </button>

      {/* Accordion Expansion Details Component */}
      <DirectionDetails
        item={item}
        language={language}
        isExpanded={isExpanded}
      />
    </article>
  );
}
