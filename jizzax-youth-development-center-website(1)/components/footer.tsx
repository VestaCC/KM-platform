"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface SiteSettings {
  organization_name?: { UZ: string; RU: string; EN: string };
  logo_url?: string;
  contact_phone?: string;
  contact_email?: string;
  address?: { UZ: string; RU: string; EN: string };
  facebook?: string;
  instagram?: string;
  telegram?: string;
  youtube?: string;
  footer_text?: { UZ: string; RU: string; EN: string };
}

interface FooterProps {
  settings?: SiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  const { language } = useLanguage();
  const t = translations.footer;
  const tHeader = translations.header;
  const tDirections = translations.directions;

  const brandTitle = settings?.organization_name?.[language] || t.brandTitle[language];
  const brandSubtitle = t.brandSubtitle[language];
  const logoSrc = settings?.logo_url || "/logo.png";
  const phone = settings?.contact_phone || "+998 73 000 00 00";
  const email = settings?.contact_email || "info@kelajak.uz";
  const address = settings?.address?.[language] || t.address[language];
  const copyrightText = settings?.footer_text?.[language] || t.copyright[language];

  const socialLinks = [
    ...(settings?.telegram ? [{ label: "Telegram", href: settings.telegram }] : [{ label: "Telegram", href: "https://t.me/jzzaxviloyatKelajakmarkazi" }]),
    ...(settings?.instagram ? [{ label: "Instagram", href: settings.instagram }] : [{ label: "Instagram", href: "https://www.instagram.com/jizzaxviloyatkelajakmarkazi/?__pwa=1" }]),
    ...(settings?.youtube ? [{ label: "YouTube", href: settings.youtube }] : [{ label: "YouTube", href: "https://www.youtube.com/channel/UCMzrtkWCZAjROw4xEry9heg" }]),
    ...(settings?.facebook ? [{ label: "Facebook", href: settings.facebook }] : [{ label: "Facebook", href: "https://www.facebook.com/share/17fNoGyhqt/" }]),
  ];

  const dynamicNavLinks = [
    { label: tHeader.nav.home[language], href: "/" },
    { label: tHeader.nav.about[language], href: "/about" },
    { label: tHeader.nav.directions[language], href: "/directions" },
    { label: tHeader.nav.news[language], href: "/news" },
    { label: tHeader.nav.gallery[language], href: "/gallery" },
    { label: tHeader.nav.courses[language], href: "/courses" },
    { label: tHeader.nav.contact[language], href: "/contact" },
  ];

  const dynamicPrograms = [
    tDirections.tracks.robotics.title[language],
    tDirections.tracks.stem.title[language],
    tDirections.tracks.programming.title[language],
    tDirections.tracks.languages.title[language],
    tDirections.tracks.arts.title[language],
    tDirections.tracks.leadership.title[language],
  ];

  return (
    <footer id="contact" style={{ backgroundColor: "#0f172a" }}>
      {/* Main footer */}
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6 py-16 xl:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src={logoSrc}
                alt={`${brandTitle} Logo`}
                width={40}
                height={40}
                className="rounded-lg object-contain flex-shrink-0"
              />
              <div>
                <div className="font-bold text-sm text-white leading-tight">
                  {brandTitle}
                </div>
                <div className="text-xs leading-tight" style={{ color: "#94a3b8" }}>
                  {brandSubtitle}
                </div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 text-pretty"
              style={{ color: "#94a3b8" }}
            >
              {t.brandDesc[language]}
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} (opens in new tab)`}
                  className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors text-slate-300 hover:text-white bg-white/[0.07] hover:bg-white/[0.14]"
                >
                  {s.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              {t.navHeader[language]}
            </h3>
            <ul className="flex flex-col gap-3">
              {dynamicNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              {t.programsHeader[language]}
            </h3>
            <ul className="flex flex-col gap-3">
              {dynamicPrograms.map((p) => (
                <li key={p}>
                  <Link
                    href="/directions"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              {t.contactHeader[language]}
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: "#3b82f6" }}
                />
                <span className="text-sm leading-relaxed" style={{ color: "#94a3b8", whiteSpace: "pre-line" }}>
                  {address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#3b82f6" }} />
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#3b82f6" }} />
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#64748b" }}>
            &copy; {new Date().getFullYear()} {brandTitle}. {copyrightText}
          </p>
          <p className="text-xs" style={{ color: "#64748b" }}>
            {t.patronage[language]}
          </p>
        </div>
      </div>
    </footer>
  );
}
