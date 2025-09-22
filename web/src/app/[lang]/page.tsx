import { Lang } from "@/types/language";
import AirportHomepage from "@/components/homepage/airport-homepage";

interface HomePageProps {
  params: { lang: Lang };
}

export default function HomePage({ params }: HomePageProps) {
  return <AirportHomepage lang={params.lang} />;
}
