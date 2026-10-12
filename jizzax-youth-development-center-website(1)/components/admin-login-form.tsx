"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Lock, Mail, Loader2, Check } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const localTranslations = {
  uz: {
    lockoutMessage: "Judayam koʻp urinish boʻldi. Iltimos, {seconds} soniya kutib qaytadan urining."
  },
  en: {
    lockoutMessage: "Too many failed attempts. Please wait {seconds} seconds before trying again."
  },
  ru: {
    lockoutMessage: "Слишком много неудачных попыток. Пожалуйста, подождите {seconds} секунд перед повторной попыткой."
  }
};

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState(0);
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const t = translations.admin;
  const tLogin = translations.admin.login;

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  useEffect(() => {
    if (lockoutTimeLeft <= 0) return;

    const timer = setInterval(() => {
      setLockoutTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [lockoutTimeLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard clause at the absolute top
    if (lockoutTimeLeft > 0) {
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message === "Invalid login credentials") {
          setErrorMsg(tLogin.credentialsError[language]);
        } else {
          setErrorMsg(error.message || "Invalid email or password.");
        }

        setFailedAttempts((prev) => {
          const nextFailed = prev + 1;
          if (nextFailed >= 5) {
            setLockoutTimeLeft(60);
          }
          return nextFailed;
        });
        return;
      }

      setFailedAttempts(0);
      router.push("/admin");
      router.refresh();
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const langKey = (language.toLowerCase() as "uz" | "en" | "ru") || "en";
  const lockoutMsg = localTranslations[langKey]?.lockoutMessage || localTranslations.en.lockoutMessage;
  const formattedLockoutMsg = lockoutMsg.replace("{seconds}", lockoutTimeLeft.toString());

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        {/* Language Switcher */}
        <div className="flex justify-end gap-1 mb-4" role="navigation" aria-label="Language selection">
          {(["UZ", "RU", "EN"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              aria-label={`Switch to ${lang}`}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${language === lang
                  ? "bg-[#1a3a6b] text-white border-[#1a3a6b] shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#1a3a6b] flex items-center justify-center mx-auto mb-4" aria-hidden="true">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{tLogin.title[language]}</h1>
          <p className="text-sm text-gray-500 mt-1">{tLogin.subtitle[language]}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1.5">
              {tLogin.emailLabel[language]}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg(null);
                }}
                required
                disabled={loading || lockoutTimeLeft > 0}
                placeholder={tLogin.emailPlaceholder[language]}
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
              {email !== "" && (
                errorMsg || !isEmailValid ? (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-extrabold text-xs animate-fade-in" aria-hidden="true">
                    !
                  </div>
                ) : (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 animate-fade-in" aria-hidden="true" />
                )
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700">
                {tLogin.passwordLabel[language]}
              </label>
              <Link
                href="/admin/forgot-password"
                className="text-xs font-semibold text-[#1a3a6b] hover:text-[#112a52] transition-colors"
              >
                {t.buttons.forgotPasswordLink[language]}
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg(null);
                }}
                required
                disabled={loading || lockoutTimeLeft > 0}
                placeholder={tLogin.passwordPlaceholder[language]}
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
              {errorMsg && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-extrabold text-xs animate-fade-in" aria-hidden="true">
                  !
                </div>
              )}
            </div>
          </div>

          {lockoutTimeLeft > 0 ? (
            <div
              className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 animate-fade-in shadow-sm"
              role="alert"
              aria-live="assertive"
            >
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-extrabold text-xs flex-shrink-0 animate-pulse" aria-hidden="true">
                !
              </div>
              <span className="leading-snug font-medium">{formattedLockoutMsg}</span>
            </div>
          ) : errorMsg ? (
            <div
              className="flex items-start gap-2.5 p-3 bg-red-50/55 border border-red-200/50 rounded-lg text-sm text-red-700 animate-fade-in"
              role="alert"
              aria-live="assertive"
            >
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-extrabold text-xs flex-shrink-0" aria-hidden="true">
                !
              </div>
              <span className="leading-snug">{errorMsg}</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading || lockoutTimeLeft > 0}
            className={`w-full py-2.5 px-4 text-sm font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 ${lockoutTimeLeft > 0
                ? "bg-red-50 text-red-400 border border-red-200 cursor-not-allowed"
                : "text-white bg-[#1a3a6b] hover:bg-[#112a52] disabled:opacity-50 cursor-pointer"
              }`}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {lockoutTimeLeft > 0 ? (
              <span>
                {language === "UZ"
                  ? `${lockoutTimeLeft} soniya kuting`
                  : language === "RU"
                    ? `Подождите ${lockoutTimeLeft} сек.`
                    : `Wait ${lockoutTimeLeft}s`}
              </span>
            ) : loading ? (
              t.buttons.loggingIn[language]
            ) : (
              t.buttons.login[language]
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
