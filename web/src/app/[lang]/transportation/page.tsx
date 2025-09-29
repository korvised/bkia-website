import { redirect } from "next/navigation";
import { Lang } from "@/types/language";

interface TransportationPageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function TransportationPage({
  params,
}: TransportationPageProps) {
  const { lang } = await params;

  // Redirect to van as the default tab
  redirect(`/${lang}/transportation/van`);
}
