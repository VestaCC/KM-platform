import type { Metadata } from "next";
import Header from "@/components/header";
import ContactClient from "@/components/contact-client";
import Footer from "@/components/footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Aloqa",
  description:
    "Kelajak markazi bilan bog'laning — telefon, email, manzil va ijtimoiy tarmoqlar orqali.",
  openGraph: {
    title: "Aloqa | Kelajak Markazi",
    description:
      "Kelajak markazi bilan bog'lanish uchun aloqa ma'lumotlari.",
    url: "/contact",
  },
  twitter: {
    card: "summary",
    title: "Aloqa | Kelajak Markazi",
    description: "Kelajak markazi aloqa ma'lumotlari.",
  },
};

export const revalidate = 60;

async function getContactData() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*").limit(1).single();
  return { settings: data };
}

export default async function Page() {
  const { settings } = await getContactData();

  return (
    <>
      <Header settings={settings} />
      <main className="pt-16 lg:pt-20 animate-fade-in">
        <ContactClient settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
