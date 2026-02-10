import { Lang } from "@/types/language";
import {
  FlightSearch,
  HeroSection,
  UsefulServicesSection,
} from "@/components/homepage";
import { listHighlightNotices } from "@/services/notice";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const notices = await listHighlightNotices();

  return (
    <div className="w-full">
      {/* Above-the-fold: exactly 100vh, split by flex */}
      <section className="flex h-[100svh] min-h-0 flex-col md:h-screen">
        {/* hero ~70% desktop, ~65% tablet, ~60% mobile */}
        <div className="min-h-0 basis-[58%] sm:basis-[60%] md:basis-[65%] lg:basis-[73%]">
          <HeroSection notices={notices} className="h-full min-h-0" />
        </div>

        {/* search fills the rest */}
        <div className="min-h-0 flex-1">
          <FlightSearch className="h-full" />
        </div>
      </section>

      {/* Useful Services Section */}
      <UsefulServicesSection lang={lang as Lang} />
    </div>
  );
}
