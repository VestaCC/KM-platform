"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";

interface SiteSettings {
  organization_name?: { UZ: string; RU: string; EN: string };
  logo_url?: string;
  contact_phone?: string;
  contact_email?: string;
  address?: { UZ: string; RU: string; EN: string };
  google_maps_url?: string;
  facebook?: string;
  instagram?: string;
  telegram?: string;
  youtube?: string;
}

interface ContactClientProps {
  settings: SiteSettings | null;
}

export default function ContactClient({ settings }: ContactClientProps) {
  const { language } = useLanguage();
  const tFooter = translations.footer;
  const tHeader = translations.header;

  const phone = settings?.contact_phone || "+998 73 000 00 00";
  const email = settings?.contact_email || "info@kelajak.uz";
  const address = settings?.address?.[language] || tFooter.address[language];
  const mapsUrl = settings?.google_maps_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.7483669147575!2d67.84224097652758!3d40.42551405574345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b295da9be55d5d%3A0xf63690d5635fbd0d!2zSmF6emF4IFlvdXRoIERldmVsb3BtZW50IENlbnRlciAoS2VsYWphayBNYXJrYXppKQ!5e0!3m2!1sen!2suz!4v1719665000000!5m2!1sen!2suz";

  const socialLinks = [
    ...(settings?.telegram ? [{ label: "Telegram", href: settings.telegram }] : [{ label: "Telegram", href: "https://t.me/jzzaxviloyatKelajakmarkazi" }]),
    ...(settings?.instagram ? [{ label: "Instagram", href: settings.instagram }] : [{ label: "Instagram", href: "https://www.instagram.com/jizzaxviloyatkelajakmarkazi/?__pwa=1" }]),
    ...(settings?.youtube ? [{ label: "YouTube", href: settings.youtube }] : [{ label: "YouTube", href: "https://www.youtube.com/channel/UCMzrtkWCZAjROw4xEry9heg" }]),
    ...(settings?.facebook ? [{ label: "Facebook", href: settings.facebook }] : [{ label: "Facebook", href: "https://www.facebook.com/share/17fNoGyhqt/" }]),
  ];

  const content = {
    title: {
      UZ: "Biz bilan bog'laning",
      RU: "Свяжитесь с нами",
      EN: "Contact Us",
    },
    subtitle: {
      UZ: "Savollaringiz bormi? Biz sizga yordam berishdan mamnunmiz. Quyidagi ma'lumotlar orqali biz bilan bog'laning yoki markazimizga tashrif buyuring.",
      RU: "Есть вопросы? Мы рады помочь. Свяжитесь с нами по указанным контактам или посетите наш центр.",
      EN: "Have questions? We are happy to help. Get in touch with us using the details below or visit our center.",
    },
    workingHoursTitle: {
      UZ: "Ish vaqti",
      RU: "Рабочие часы",
      EN: "Working Hours",
    },
    workingHoursVal: {
      UZ: "Dushanba - Shanba: 09:00 - 18:00",
      RU: "Понедельник - Суббота: 09:00 - 18:00",
      EN: "Monday - Saturday: 09:00 - 18:00",
    },
    socialTitle: {
      UZ: "Ijtimoiy tarmoqlarimiz",
      RU: "Мы в соцсетях",
      EN: "Social Media",
    },
  };

  return (
    <section className="py-20 lg:py-28 xl:py-24 bg-slate-50">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6">
        <header className="text-center mb-14 xl:mb-11">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#3b82f6" }}
          >
            {tHeader.nav.contact[language]}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-balance mb-4 text-slate-900"
          >
            {content.title[language]}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            {content.subtitle[language]}
          </p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Info cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" style={{ color: "#1a3a6b" }} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-500 text-xs uppercase tracking-wider mb-1">
                  {language === "UZ" ? "Telefon raqam" : language === "RU" ? "Телефон" : "Phone"}
                </h3>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" style={{ color: "#1a3a6b" }} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-500 text-xs uppercase tracking-wider mb-1">
                  Email
                </h3>
                <a
                  href={`mailto:${email}`}
                  className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors break-all"
                >
                  {email}
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" style={{ color: "#1a3a6b" }} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-500 text-xs uppercase tracking-wider mb-1">
                  {language === "UZ" ? "Manzil" : language === "RU" ? "Адрес" : "Address"}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
                  {address}
                </p>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" style={{ color: "#1a3a6b" }} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-500 text-xs uppercase tracking-wider mb-1">
                  {content.workingHoursTitle[language]}
                </h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  {content.workingHoursVal[language]}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-semibold text-slate-500 text-xs uppercase tracking-wider mb-4">
                {content.socialTitle[language]}
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 text-slate-700 hover:text-white bg-slate-100 hover:bg-[#1a3a6b] border border-transparent hover:border-[#1a3a6b]"
                  >
                    {s.label}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-7 h-[350px] lg:h-auto min-h-[400px] relative rounded-2xl overflow-hidden shadow-sm border border-border">
            <iframe
              src={mapsUrl.includes("embed") ? mapsUrl : `https://www.google.com/maps/embed?pb=${mapsUrl}`}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kelajak Markazi Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
