import Header from "@/components/header";
import Hero from "@/components/hero";
import News from "@/components/news";
import Gallery from "@/components/gallery";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getSiteData() {
  const supabase = await createClient();

  const [settingsRes, newsRes, galleryRes] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).single(),
    supabase
      .from("news")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(3),
    supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return {
    settings: settingsRes.data,
    news: newsRes.data || [],
    newsError: newsRes.error ? newsRes.error.message : null,
    gallery: galleryRes.data || [],
  };
}

export default async function Page() {
  const { settings, news, newsError, gallery } = await getSiteData();

  return (
    <>
      <Header settings={settings} />
      <main className="animate-fade-in">
        <Hero />
        <News items={news} isTeaser={true} errorMsg={newsError || undefined} />
        <Gallery items={gallery} isTeaser={true} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
