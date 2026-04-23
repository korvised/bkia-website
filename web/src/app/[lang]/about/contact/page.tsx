import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { tContacts } from "@/data/i18n/about/contact";
import { ContactContent } from "@/components/about/contact";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title:       tContacts("pageTitle",       lang),
    description: tContacts("pageDescription", lang),
  };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  return <ContactContent lang={lang} />;
}
