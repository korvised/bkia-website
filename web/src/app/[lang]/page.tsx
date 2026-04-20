import { Lang } from "@/types/language";
import {
  FeedbackSection,
  FeaturedJobsSection,
  FlightSearch,
  HeroSection,
  NewsSection,
  UsefulServicesSection,
} from "@/components/homepage";
import { listHighlightNotices } from "@/services/notice";
import { listFeaturedNews } from "@/services/news";
import { listPublicBanners } from "@/services/banner";
import { listFeaturedJobPosts } from "@/services/careers/api.service";
import { Metadata } from "next";
import { createCommonI18n } from "@/data/i18n/common";

interface HomePageProps {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const { homepage: t } = createCommonI18n(lang);

  return {
    title: t.title,
    description: t.description,
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const [notices, news, banners, featuredJobs] = await Promise.all([
    listHighlightNotices(),
    listFeaturedNews(3),
    listPublicBanners(),
    listFeaturedJobPosts().catch(() => []),
  ]);

  return (
    <div className="w-full">
      {/* Full-screen hero + search = 100svh */}
      <section className="flex h-[100svh] flex-col md:h-screen">
        {/* Hero slideshow — needs overflow-hidden to contain Swiper slides */}
        <div className="h-[62vh] shrink-0 overflow-hidden sm:h-[65vh]">
          <HeroSection banners={banners} notices={notices} className="h-full" />
        </div>

        {/* White panel: weather + search */}
        <FlightSearch className="flex-1" />
      </section>

      <UsefulServicesSection lang={lang as Lang} />
      <NewsSection lang={lang as Lang} news={news} />
      <FeaturedJobsSection lang={lang as Lang} jobs={featuredJobs} />
      <FeedbackSection lang={lang as Lang} />
    </div>
  );
}
