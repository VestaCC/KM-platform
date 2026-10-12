import type { Metadata } from "next";
import Header from "@/components/header";
import Directions from "@/components/directions";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Yo'nalishlar",
  description:
    "Kelajak markazi ta'lim yo'nalishlari — xorijiy tillar, muhandislik, dasturlash, STEM, san'at, sport va yetakchilik.",
  openGraph: {
    title: "Yo'nalishlar | Kelajak Markazi",
    description:
      "Ta'lim yo'nalishlari — tillar, muhandislik, dasturlash, STEM, san'at va sport.",
    url: "/directions",
  },
  twitter: {
    card: "summary",
    title: "Yo'nalishlar | Kelajak Markazi",
    description: "Kelajak markazi ta'lim yo'nalishlari haqida batafsil.",
  },
};

export const revalidate = 60;

async function getDirectionsData() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).single();
  return { settings: data };
}

export default async function Page() {
  const { settings } = await getDirectionsData();

  return (
    <>
      <Header settings={settings} />
      <main className="pt-16 lg:pt-20 animate-fade-in">
        <Directions />
      </main>
      <Footer settings={settings} />
    </>
  );
}
