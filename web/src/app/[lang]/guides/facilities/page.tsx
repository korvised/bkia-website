import { Metadata } from "next";
import { HandHeart } from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";
import { facilitiesServices, getColorClasses } from "@/data/guide";
import { cn, getLocalizedText } from "@/lib";
import { createDepartureGuideI18n } from "@/data/i18n/guide";

interface FacilityServicePageProps {
  params: Promise<{ lang: Lang }>;
}

export async function generateMetadata({
  params,
}: FacilityServicePageProps): Promise<Metadata> {
  const { lang } = await params;
  const { facilities: t } = createDepartureGuideI18n(lang);

  return {
    title: t.title,
    description: t.subtitle,
  };
}

export default async function AirportFacilitiesPage({
  params,
}: FacilityServicePageProps) {
  const { lang } = await params;
  const language = lang as Lang;
  const { facilities: t } = createDepartureGuideI18n(lang);

  return (
    <>
      {/* Header */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]">
            <HandHeart className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              Airport Facilities
            </p>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {t.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-10 lg:py-14">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {facilitiesServices.map((facility) => {
              const colors = getColorClasses(facility.color);
              const Icon = facility.icon;

              return (
                <Link
                  key={facility.id}
                  href={`/${lang}/guides/facilities/${facility.id}`}
                  className="group flex flex-col items-center text-center transition-opacity hover:opacity-80"
                >
                  <div
                    className={cn(
                      "mb-3 flex h-24 w-24 items-center justify-center rounded-full border-2 transition-colors sm:mb-4 sm:h-32 sm:w-32",
                      colors.bg,
                      colors.border,
                      colors.hover,
                    )}
                  >
                    <Icon
                      className={cn("h-12 w-12 sm:h-16 sm:w-16", colors.icon)}
                    />
                  </div>
                  <h3 className="text-xs font-semibold leading-tight text-gray-900 sm:text-sm">
                    {getLocalizedText(facility.name, language)}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
