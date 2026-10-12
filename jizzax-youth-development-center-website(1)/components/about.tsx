"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Scale,
  Lightbulb,
  HeartHandshake,
  TrendingUp,
  GraduationCap,
  Cpu,
  Brain,
  Users,
  Globe,
  Trophy,
  Building2,
  Network,
  GitPullRequest,
  School,
  Home,
  UserCheck,
  ChevronDown
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface AboutProps {
  priority?: boolean;
}

interface MissionValueProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

function MissionValueCard({ icon: Icon, title, desc }: MissionValueProps) {
  return (
    <div className="group bg-white p-5 rounded-2xl border border-slate-100 hover:border-blue-200/70 hover:shadow-md transition-all duration-300 flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-blue-50/70 group-hover:bg-blue-50 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
        <Icon className="w-5.5 h-5.5 text-[#1a3a6b] transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div>
        <h3 className="font-bold text-[#0f172a] text-sm mb-1">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

interface FunctionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

function FunctionCard({ icon: Icon, title, desc }: FunctionCardProps) {
  return (
    <div className="group bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="w-12 h-12 rounded-xl bg-blue-50/70 group-hover:bg-blue-100/80 flex items-center justify-center mb-5 transition-colors duration-300">
        <Icon className="w-6 h-6 text-[#1a3a6b] transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="font-bold text-[#0f172a] text-base mb-3 leading-snug">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed flex-1">{desc}</p>
    </div>
  );
}

interface StructureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}

function StructureCard({
  icon: Icon,
  title,
  desc,
  isExpanded,
  onToggle,
  isLast
}: StructureCardProps) {
  return (
    <div className="relative w-full max-w-xl flex flex-col items-center">
      {/* Visual connection line running down to the next card */}
      {!isLast && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 h-12 w-0.5 bg-slate-200 -z-10" />
      )}

      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={`w-full text-left bg-white border rounded-2xl p-5 hover:border-blue-300/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 flex items-center gap-4 ${
          isExpanded
            ? "border-blue-200 shadow-md ring-1 ring-blue-50/50"
            : "border-slate-100 shadow-sm"
        }`}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
          isExpanded ? "bg-[#1a3a6b] text-white" : "bg-blue-50 text-[#1a3a6b]"
        }`}>
          <Icon className="w-5.5 h-5.5" />
        </div>
        
        <span className="flex-1 font-bold text-[#0f172a] text-base leading-snug sm:text-base">
          {title}
        </span>

        <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transition-transform duration-300 ${
          isExpanded ? "rotate-180 bg-blue-50/50 text-[#1a3a6b]" : ""
        }`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      {/* Description Drawer with Grid template fraction transition */}
      <div className={`w-full grid transition-all duration-300 ease-in-out ${
        isExpanded ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
      }`}>
        <div className="overflow-hidden">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-xs sm:text-sm text-slate-600 leading-relaxed shadow-inner">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About({ priority = false }: AboutProps) {
  const { language } = useLanguage();
  const t = translations.about;

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const missionValues = [
    {
      icon: Scale,
      title: t.mission.values.opportunities.title[language],
      desc: t.mission.values.opportunities.desc[language]
    },
    {
      icon: Lightbulb,
      title: t.mission.values.innovation.title[language],
      desc: t.mission.values.innovation.desc[language]
    },
    {
      icon: HeartHandshake,
      title: t.mission.values.collaboration.title[language],
      desc: t.mission.values.collaboration.desc[language]
    },
    {
      icon: TrendingUp,
      title: t.mission.values.development.title[language],
      desc: t.mission.values.development.desc[language]
    }
  ];

  const coreFunctions = [
    {
      icon: GraduationCap,
      title: t.functions.cards.education.title[language],
      desc: t.functions.cards.education.desc[language]
    },
    {
      icon: Cpu,
      title: t.functions.cards.technology.title[language],
      desc: t.functions.cards.technology.desc[language]
    },
    {
      icon: Brain,
      title: t.functions.cards.talent.title[language],
      desc: t.functions.cards.talent.desc[language]
    },
    {
      icon: Users,
      title: t.functions.cards.growth.title[language],
      desc: t.functions.cards.growth.desc[language]
    },
    {
      icon: Globe,
      title: t.functions.cards.social.title[language],
      desc: t.functions.cards.social.desc[language]
    },
    {
      icon: Trophy,
      title: t.functions.cards.competition.title[language],
      desc: t.functions.cards.competition.desc[language]
    }
  ];

  const structureNodes = [
    {
      icon: Building2,
      title: t.structure.nodes.agency.title[language],
      desc: t.structure.nodes.agency.desc[language]
    },
    {
      icon: Network,
      title: t.structure.nodes.regional.title[language],
      desc: t.structure.nodes.regional.desc[language]
    },
    {
      icon: GitPullRequest,
      title: t.structure.nodes.district.title[language],
      desc: t.structure.nodes.district.desc[language]
    },
    {
      icon: School,
      title: t.structure.nodes.center.title[language],
      desc: t.structure.nodes.center.desc[language]
    },
    {
      icon: Home,
      title: t.structure.nodes.schools.title[language],
      desc: t.structure.nodes.schools.desc[language]
    },
    {
      icon: UserCheck,
      title: t.structure.nodes.students.title[language],
      desc: t.structure.nodes.students.desc[language]
    }
  ];

  return (
    <div className="bg-slate-50/50">
      {/* SECTION 1: MISSION */}
      <section className="py-20 lg:py-28 xl:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-12">
            {/* Image Column */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] border border-slate-100">
                <Image
                  src="/images/about-building.png"
                  alt="Kelajak Markazi Binosi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={priority}
                />
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#1a3a6b]" />
              </div>
            </div>

            {/* Description and Values Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#3b82f6" }}
              >
                {t.mission.badge[language]}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mb-6 leading-tight text-balance">
                {t.mission.title[language]}
              </h2>
              <p className="text-[#64748b] leading-relaxed mb-8 text-sm sm:text-base text-pretty">
                {t.mission.desc[language]}
              </p>

              {/* Mission Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {missionValues.map((val, idx) => (
                  <MissionValueCard
                    key={idx}
                    icon={val.icon}
                    title={val.title}
                    desc={val.desc}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CORE FUNCTIONS */}
      <section className="py-20 lg:py-28 xl:py-24 border-b border-slate-100">
        <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6">
          <div className="text-center mb-14 xl:mb-11">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#3b82f6" }}
            >
              {t.functions.badge[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mb-4 text-balance">
              {t.functions.title[language]}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base text-pretty">
              {t.functions.subtitle[language]}
            </p>
          </div>

          {/* Functions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-5">
            {coreFunctions.map((func, idx) => (
              <FunctionCard
                key={idx}
                icon={func.icon}
                title={func.title}
                desc={func.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ORGANIZATIONAL STRUCTURE */}
      <section className="py-20 lg:py-28 xl:py-24 bg-white">
        <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6">
          <div className="text-center mb-16">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#3b82f6" }}
            >
              {t.structure.badge[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mb-4 text-balance">
              {t.structure.title[language]}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base text-pretty">
              {t.structure.subtitle[language]}
            </p>
          </div>

          {/* Connected Hierarchy accordion grid */}
          <div className="flex flex-col items-center gap-12 py-4">
            {structureNodes.map((node, idx) => (
              <StructureCard
                key={idx}
                icon={node.icon}
                title={node.title}
                desc={node.desc}
                isExpanded={expandedIndex === idx}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === idx ? null : idx)
                }
                isLast={idx === structureNodes.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
