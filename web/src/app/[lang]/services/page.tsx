import { redirect } from "next/navigation";
import type { Lang } from "@/types/language";

interface Props {
  params: Promise<{ lang: Lang }>;
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  redirect(`/${lang}/services/taxi`);
}
