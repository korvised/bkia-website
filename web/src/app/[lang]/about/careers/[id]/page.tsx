import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Lang } from "@/types/language";
import { getJobPostById } from "@/services/careers/api.service";
import { CareerDetail, CareerDetailSkeleton } from "@/components/about/careers";

interface Props {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  try {
    const job = await getJobPostById(id);
    if (!job) return { title: "Position Not Found | Bokeo International Airport" };
    return {
      title: job.title[lang as Lang],
      description: job.position[lang as Lang],
    };
  } catch {
    return { title: "Position Not Found | Bokeo International Airport" };
  }
}

async function CareerDetailContent({ lang, id }: { lang: Lang; id: string }) {
  const job = await getJobPostById(id);
  if (!job) notFound();
  return <CareerDetail job={job} lang={lang} />;
}

export default async function CareerDetailPage({ params }: Props) {
  const { lang, id } = await params;

  return (
    <section className="bg-[#f8f9fc] py-14 sm:py-20">
      <div className="container">
        <Suspense fallback={<CareerDetailSkeleton />}>
          <CareerDetailContent lang={lang as Lang} id={id} />
        </Suspense>
      </div>
    </section>
  );
}
