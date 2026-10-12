import type { Metadata } from "next";
import Header from "@/components/header";
import Gallery from "@/components/gallery";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Galereya",
  description:
    "Kelajak markazi faoliyatidan fotosuratlar — tadbirlar, mashg'ulotlar va markazimiz hayotidan lavhalar.",
  openGraph: {
    title: "Galereya | Kelajak Markazi",
    description:
      "Kelajak markazi faoliyatidan fotosuratlar va hayotiy lavhalar.",
    url: "/gallery",
  },
  twitter: {
    card: "summary",
    title: "Galereya | Kelajak Markazi",
    description: "Kelajak markazi faoliyatidan fotosuratlar.",
  },
};

export const revalidate = 60;

async function getGalleryData() {
  const supabase = await createClient();

  const [settingsRes, galleryRes] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).single(),
    supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return {
    settings: settingsRes.data,
    gallery: galleryRes.data || [],
  };
}

export default async function Page() {
  const { settings, gallery } = await getGalleryData();

  return (
    <>
      <Header settings={settings} />
      <main className="pt-16 lg:pt-20 animate-fade-in">
        <Gallery items={gallery} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
