import type { Metadata } from "next";
import type { Lang } from "@/types/language";
import { createCareersI18n } from "@/data/i18n/about/careers";
import { listJobPosts } from "@/services/careers/api.service";
import { JobListings } from "@/components/about/careers";
import { SectionHeader } from "@/components/about/careers/SectionHeader";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { careers: t } = createCareersI18n(lang as Lang);
  return {
    title: t.pageTitle,
    description: t.pageDescription,
  };
}

export default async function CareersPage({ params }: Props) {
  const { lang } = await params;
  const typedLang = lang as Lang;
  const { careers: t } = createCareersI18n(typedLang);

  const jobs = await listJobPosts().catch(() => []);

  return (
    <>
      {/* Open Positions */}
      <section className="bg-[#f8f9fc] py-14 sm:py-20">
        <div className="container">
          <SectionHeader
            label={t.openPositions}
            count={jobs.length > 0 ? jobs.length : undefined}
          />
          <JobListings jobs={jobs} lang={typedLang} />
        </div>
      </section>
    </>
  );
}
