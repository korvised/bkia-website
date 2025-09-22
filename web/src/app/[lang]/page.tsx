import { Lang } from "@/types/language";
import AirportHomepage from "@/components/homepage/airport-homepage";

interface HomePageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  return <AirportHomepage lang={lang} />;
}
