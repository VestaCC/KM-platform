import type { Metadata } from "next";
import Header from "@/components/header";
import About from "@/components/about";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Biz haqimizda",
  description:
    "Jizzax viloyati Kelajak markazi — tashkilot vazifasi, qadriyatlari, tuzilmasi va asosiy faoliyat yo'nalishlari haqida batafsil ma'lumot.",
  openGraph: {
    title: "Biz haqimizda | Kelajak Markazi",
    description:
      "Jizzax viloyati Kelajak markazi — tashkilot vazifasi, qadriyatlari va asosiy faoliyat yo'nalishlari.",
    url: "/about",
  },
  twitter: {
    card: "summary",
    title: "Biz haqimizda | Kelajak Markazi",
    description:
      "Tashkilot vazifasi, qadriyatlari va asosiy faoliyat yo'nalishlari haqida batafsil.",
  },
};

export const revalidate = 60;

async function getAboutData() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).single();
  return { settings: data };
}

export default async function Page() {
  const { settings } = await getAboutData();

  return (
    <>
      <Header settings={settings} />
      <main className="pt-16 lg:pt-20 animate-fade-in">
        <About priority={true} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
