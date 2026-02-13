import { Lang } from "@/types/language";
import {
  FlightSearch,
  HeroSection,
  NewsSection,
  UsefulServicesSection,
} from "@/components/homepage";
import { listHighlightNotices } from "@/services/notice";
import { listFeaturedNews } from "@/services/news";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const notices = await listHighlightNotices();
  const news = await listFeaturedNews(3);

  return (
    <div className="w-full">
      <section className="flex h-[100svh] min-h-0 flex-col md:h-screen">
        {/* hero */}
        <div className="min-h-0 basis-[58%] sm:basis-[60%] md:basis-[65%] lg:basis-[73%]">
          <HeroSection notices={notices} className="h-full min-h-0" />
        </div>

        {/* search — auto height on mobile, fills rest on md+ */}
        <div className="flex-shrink-0 md:min-h-0 md:flex-1">
          <FlightSearch />
        </div>
      </section>

      {/* Useful Services Section */}
      <UsefulServicesSection lang={lang as Lang} />

      {/* News Section */}
      <NewsSection lang={lang as Lang} news={news} />
    </div>
  );
}
