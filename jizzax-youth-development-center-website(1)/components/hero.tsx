"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, GraduationCap, BookOpen, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

function useCounter(target: number, duration = 1500, start = false) {
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

export default function Hero() {
  const { language } = useLanguage();
  const t = translations.hero;
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const countStudents = useCounter(5000, 1800, started);
  const countClubs = useCounter(30, 1800, started);
  const countEvents = useCounter(100, 1800, started);
  const countDistricts = useCounter(12, 1800, started);

  const stats = [
    { target: 5000, count: countStudents, suffix: "+", label: language === 'UZ' ? "O'quvchilar" : language === 'RU' ? "Учеников" : "Students", icon: GraduationCap },
    { target: 30, count: countClubs, suffix: "+", label: language === 'UZ' ? "To'garaklar" : language === 'RU' ? "Клубов" : "Clubs", icon: BookOpen },
    { target: 100, count: countEvents, suffix: "+", label: language === 'UZ' ? "Tadbirlar" : language === 'RU' ? "Мероприятий" : "Events", icon: Calendar },
    { target: 12, count: countDistricts, suffix: "", label: language === 'UZ' ? "Tuman" : language === 'RU' ? "Районов" : "Districts", icon: MapPin },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen xl:h-screen xl:min-h-[750px] flex items-center overflow-hidden bg-slate-950"
    >
      <video
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.png"
        onLoadedData={() => setIsVideoReady(true)}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      <div
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0 transition-opacity duration-[600ms] ease-in-out ${
          isVideoReady ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: "url('/images/hero-poster.png')",
        }}
      />

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent z-10" />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full z-20 max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6 py-24 lg:py-28 xl:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-12" ref={ref}>
          {/* Left column (Text content) */}
          <div className="flex-1 text-center lg:text-left">
            {language === 'UZ' ? (
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-balance mb-6 text-white"
              >
                Jizzax viloyati{" "}
                <span style={{ color: "#60a5fa" }}>Kelajak</span>{" "}
                <span style={{ color: "#93c5fd" }}>markazi</span>
              </h1>
            ) : language === 'RU' ? (
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-balance mb-6 text-white"
              >
                {t.titlePart1[language]}
                <span style={{ color: "#93c5fd" }}>{t.titlePart2[language]}</span>
                {t.titlePart3[language]}
                <span style={{ color: "#60a5fa" }}>{t.titlePart4[language]}</span>
              </h1>
            ) : (
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-balance mb-6 text-white"
              >
                {t.titlePart1[language]}
                <span style={{ color: "#93c5fd" }}>{t.titlePart2[language]}</span>
                {t.titlePart3[language]}
                <span style={{ color: "#60a5fa" }}>{t.titlePart4[language]}</span>
              </h1>
            )}

            <p className="text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 text-pretty text-slate-200/90">
              {t.description[language]}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold text-white rounded-xl transition-all shadow-md hover:shadow-lg hover:opacity-90 bg-[#1a3a6b]"
              >
                {t.learnMore[language]}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl border-2 transition-all hover:bg-white/10 text-white border-white/50"
              >
                <Newspaper className="w-4 h-4" />
                {t.latestNews[language]}
              </Link>
            </div>
          </div>

          {/* Right column (Statistics Grid) */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`p-6 rounded-2xl border bg-white/12 border-white/15 backdrop-blur-[2px] shadow-xl flex flex-col items-center lg:items-start gap-4 text-white transition-all duration-700 ease-out transform ${
                      started
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{
                      transitionDelay: `${i * 150}ms`,
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/12 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1">
                        {stat.count.toLocaleString()}
                        {stat.suffix}
                      </p>
                      <p className="text-sm font-medium text-white/80 leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
