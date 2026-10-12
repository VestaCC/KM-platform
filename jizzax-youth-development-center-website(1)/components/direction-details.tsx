"use client";


import { CheckCircle2, CalendarRange } from "lucide-react";
import { DirectionItem } from "@/data/directions";

interface DirectionDetailsProps {
  item: DirectionItem;
  language: "UZ" | "RU" | "EN";
  isExpanded: boolean;
}

export default function DirectionDetails({
  item,
  language,
  isExpanded
}: DirectionDetailsProps) {
  return (
    <div
      className={`grid transition-all duration-350 ease-in-out border-t border-slate-50 bg-slate-50/50 ${
        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <div className="p-6 sm:p-7 space-y-6">
          {/* Section: What students learn */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#1a3a6b] mb-3">
              {language === "UZ"
                ? "O'quvchilar nimalarni o'rganadilar?"
                : language === "RU"
                ? "Чему научатся студенты?"
                : "What Students Will Learn"}
            </h4>
            
            <ul className="space-y-2.5">
              {item.learnPoints[language].map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Future Courses */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#1a3a6b] mb-2.5">
              {language === "UZ"
                ? "Kurslar ro'yxati"
                : language === "RU"
                ? "Список курсов"
                : "Courses Catalog"}
            </h4>
            
            <div className="flex items-center gap-2 px-3 py-2.5 bg-blue-50/50 border border-blue-100/50 rounded-xl text-xs text-[#1a3a6b]">
              <CalendarRange className="w-4 h-4 text-[#1a3a6b] flex-shrink-0" />
              <span>
                {language === "UZ"
                  ? "Kurslar katalogi tez kunda e'lon qilinadi."
                  : language === "RU"
                  ? "Каталог курсов будет опубликован в ближайшее время."
                  : "Course catalog will be available soon."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
