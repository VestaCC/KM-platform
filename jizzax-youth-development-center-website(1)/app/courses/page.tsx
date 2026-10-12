import type { Metadata } from "next";
import Header from "@/components/header";
import CoursesClient from "@/components/courses-client";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Kurslar",
  description:
    "Kelajak markazi kurslar katalogi — yoshlar uchun zamonaviy ta'lim dasturlari va mashg'ulotlar.",
  openGraph: {
    title: "Kurslar | Kelajak Markazi",
    description:
      "Yoshlar uchun zamonaviy ta'lim dasturlari va mashg'ulotlar.",
    url: "/courses",
  },
  twitter: {
    card: "summary",
    title: "Kurslar | Kelajak Markazi",
    description: "Kelajak markazi kurslar katalogi.",
  },
};

export const revalidate = 60;

async function getCoursesData() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).single();
  return { settings: data };
}

export default async function Page() {
  const { settings } = await getCoursesData();

  return (
    <>
      <Header settings={settings} />
      <main className="pt-16 lg:pt-20 animate-fade-in">
        <CoursesClient />
      </main>
      <Footer settings={settings} />
    </>
  );
}
