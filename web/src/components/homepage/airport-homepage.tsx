import { Lang } from "@/types/language";
import HeroSection from "./hero-section";
import FlightSearch from "./flight-search";
import UsefulServicesSection from "./useful-services-section";

interface AirportHomepageProps {
  lang: Lang;
}

export default function AirportHomepage({ lang }: AirportHomepageProps) {
  return (
    <div className="w-full">
      {/* Above-the-fold: exactly 100vh, split by flex */}
      <section className="flex h-[100svh] min-h-0 flex-col md:h-screen">
        {/* hero ~70% desktop, ~65% tablet, ~60% mobile */}
        <div className="min-h-0 basis-[58%] sm:basis-[60%] md:basis-[65%] lg:basis-[73%]">
          <HeroSection className="h-full min-h-0" />
        </div>

        {/* search fills the rest */}
        <div className="min-h-0 flex-1">
          <FlightSearch className="h-full" />
        </div>
      </section>

      {/* Useful Services Section */}
      <UsefulServicesSection lang={lang} />
    </div>
  );
}
