"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Users, CalendarCheck, Handshake } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  desc: string;
  start: boolean;
}

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  desc,
  start,
}: StatCardProps) {
  const count = useCounter(value, 1800, start);

  return (
    <div className="text-center p-8 flex flex-col items-center gap-4">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <div className="text-5xl font-extrabold text-white mb-1">
          {count.toLocaleString()}
          {suffix}
        </div>
        <div className="text-lg font-semibold text-white mb-1">{label}</div>
        <div className="text-sm" style={{ color: "rgba(219,234,254,0.8)" }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

export default function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const { language } = useLanguage();
  const t = translations.statistics;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: GraduationCap, value: 5000, suffix: "+", label: t.labels.students[language], desc: t.descs.students[language] },
    { icon: Users, value: 30, suffix: "+", label: t.labels.clubs[language], desc: t.descs.clubs[language] },
    { icon: CalendarCheck, value: 100, suffix: "+", label: t.labels.events[language], desc: t.descs.events[language] },
    { icon: Handshake, value: 10, suffix: "+", label: t.labels.partners[language], desc: t.descs.partners[language] },
  ];

  return (
    <section className="py-20 lg:py-28 xl:py-24" style={{ backgroundColor: "#1a3a6b" }}>
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6" ref={ref}>
        <div className="text-center mb-12 xl:mb-10">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#93c5fd" }}
          >
            {t.badge[language]}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-balance">
            {t.title[language]}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20 border border-white/20 rounded-2xl overflow-hidden">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} start={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
