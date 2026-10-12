"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { X, ZoomIn, Inbox, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  caption: { UZ: string; RU: string; EN: string };
}

interface GalleryProps {
  items: GalleryItem[];
  isTeaser?: boolean;
}

export default function Gallery({ items, isTeaser = false }: GalleryProps) {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const { language } = useLanguage();
  const t = translations.gallery;

  return (
    <section id="gallery" className="py-20 lg:py-28 xl:py-24 bg-white">
      <div className="max-w-7xl xl:max-w-[1500px] mx-auto px-4 sm:px-6 xl:px-6">
        <header className="text-center mb-12 xl:mb-10">
          <span
            className="inline-block text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "#3b82f6" }}
          >
            {t.badge[language]}
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-balance mb-4"
            style={{ color: "#0f172a" }}
          >
            {t.title[language]}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
            {t.subtitle[language]}
          </p>
        </header>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center" role="status">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <Inbox className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-muted-foreground">
              {language === "UZ"
                ? "Hozircha rasmlar yo'q"
                : language === "RU"
                ? "Фотографий пока нет"
                : "No gallery images yet"}
            </p>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-3">
            {items.map((photo) => {
              const categoryLabel =
                t.labels[photo.category as keyof typeof t.labels]?.[language] ||
                photo.category;

              return (
                <button
                  key={photo.id}
                  onClick={() => setLightbox(photo)}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ "--tw-ring-color": "#3b82f6" } as React.CSSProperties}
                  aria-label={`View photo: ${photo.caption[language] || ""}`}
                >
                  <Image
                    src={photo.image_url}
                    alt={photo.caption[language] || ""}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                      <ZoomIn className="w-8 h-8 text-white" />
                      <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full">
                        {categoryLabel}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
        {isTeaser && items.length > 0 && (
          <div className="flex justify-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: "#1a3a6b" }}
            >
              {language === "UZ" ? "Barcha rasmlarni ko'rish" : language === "RU" ? "Посмотреть всю галерею" : "View Full Gallery"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <figure
            className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.image_url}
              alt={lightbox.caption[language] || ""}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </figure>
          <figcaption className="absolute bottom-6 text-white text-sm font-medium">
            {lightbox.caption[language] || ""}
          </figcaption>
        </div>
      )}
    </section>
  );
}
