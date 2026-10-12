import type { Metadata } from "next";
import Header from "@/components/header";
import News from "@/components/news";
import Events from "@/components/events";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Yangiliklar va tadbirlar",
  description:
    "Kelajak markazi yangiliklari, tadbirlari va eng so'nggi voqealar haqida xabardor bo'ling.",
  openGraph: {
    title: "Yangiliklar va tadbirlar | Kelajak Markazi",
    description:
      "Kelajak markazi yangiliklari, tadbirlari va eng so'nggi voqealar.",
    url: "/news",
  },
  twitter: {
    card: "summary",
    title: "Yangiliklar va tadbirlar | Kelajak Markazi",
    description: "Eng so'nggi yangiliklar va tadbirlar haqida xabardor bo'ling.",
  },
};

export const revalidate = 60;

async function getNewsAndEventsData() {
  const supabase = await createClient();

  const [settingsRes, newsRes, eventsRes] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).single(),
    supabase
      .from("news")
      .select("*")
      .order("published_at", { ascending: false }),
    supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true }),
  ]);

  return {
    settings: settingsRes.data,
    news: newsRes.data || [],
    events: eventsRes.data || [],
  };
}

export default async function Page() {
  const { settings, news, events } = await getNewsAndEventsData();

  return (
    <>
      <Header settings={settings} />
      <main className="pt-16 lg:pt-20 animate-fade-in">
        <News items={news} />
        <Events items={events} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
