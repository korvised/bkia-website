import { Lang } from "@/types/language";
import HeroSection from "./hero-section";
import DateTimeDisplay from "./date-time-display";
import FlightSearch from "./flight-search";
import QuickServices from "./quick-services";

interface AirportHomepageProps {
  lang: Lang;
}

export default function AirportHomepage({ lang }: AirportHomepageProps) {
  return (
    <div className="w-full">
      {/* Main Hero Section with Background Image */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image - Full Screen */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/homepage/banner.jpg)" }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <HeroSection />
        </div>

        {/* Date Time Display */}
        <DateTimeDisplay lang={lang} />

        {/* Flight Search - Overlaid on hero section */}
        <FlightSearch />
      </section>

      {/* Quick Services Section */}
      <section className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50">
        <QuickServices lang={lang} />
      </section>
    </div>
  );
}
