"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { usePathname } from "next/navigation";
import { translations, Language } from "@/lib/translations";

const languages = [
  { code: "UZ", label: "O'zbek" },
  { code: "RU", label: "Русский" },
  { code: "EN", label: "English" },
];

interface SiteSettings {
  organization_name?: { UZ: string; RU: string; EN: string };
  logo_url?: string;
  primary_color?: string;
}

interface HeaderProps {
  settings?: SiteSettings | null;
}

export default function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const closeLangDropdown = useCallback(() => setLangOpen(false), []);

  useEffect(() => {
    if (!langOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLangDropdown();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        closeLangDropdown();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langOpen, closeLangDropdown]);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const showSolidHeader = !isHome || isScrolled;

  const handleNavClick = () => setIsMobileOpen(false);

  const t = translations.header;

  const brandTitle = settings?.organization_name?.[language] || t.brandTitle[language];
  const brandSubtitle = t.brandSubtitle[language];
  const logoSrc = settings?.logo_url || "/logo.png";

  const dynamicNavLinks = [
    { label: t.nav.home[language], href: "/" },
    { label: t.nav.about[language], href: "/about" },
    { label: t.nav.directions[language], href: "/directions" },
    { label: t.nav.news[language], href: "/news" },
    { label: t.nav.gallery[language], href: "/gallery" },
    { label: t.nav.courses[language], href: "/courses" },
    { label: t.nav.contact[language], href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidHeader
          ? "bg-white shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={logoSrc}
              alt={`${brandTitle} Logo`}
              width={40}
              height={40}
              className="rounded-lg object-contain flex-shrink-0"
              priority={true}
            />
            <div className="hidden sm:block">
              <div
                className="font-bold text-sm leading-tight transition-colors duration-300"
                style={{ color: showSolidHeader ? "#1a3a6b" : "#ffffff" }}
              >
                {brandTitle}
              </div>
              <div className={`text-xs leading-tight transition-colors duration-300 ${
                showSolidHeader ? "text-muted-foreground" : "text-white/70"
              }`}>
                {brandSubtitle}
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {dynamicNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? showSolidHeader
                        ? "text-primary bg-accent-muted font-semibold"
                        : "text-white bg-white/20 font-semibold"
                      : showSolidHeader
                      ? "text-foreground hover:text-primary hover:bg-accent-muted"
                      : "text-white hover:text-white/85 hover:bg-white/10"
                  }`}
                  onClick={handleNavClick}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative hidden sm:block" ref={langDropdownRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Select language"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  showSolidHeader
                    ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>{language}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-border py-1 min-w-[120px] z-50" role="listbox" aria-label="Language options">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setLangOpen(false);
                      }}
                      role="option"
                      aria-selected={language === lang.code}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors focus-visible:outline-none focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
                        language === lang.code
                          ? "font-semibold text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                showSolidHeader
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {dynamicNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-primary bg-muted font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-2 pt-3 border-t border-border mt-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as Language)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    language === lang.code
                      ? "text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                  style={
                    language === lang.code
                      ? { backgroundColor: "#1a3a6b" }
                      : {}
                  }
                >
                  {lang.code}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
