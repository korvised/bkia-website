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
    <div className="space-y-8 lg:space-y-16">
      {/* Page Header */}
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex-shrink-0">
          <div className="from-primary-400 to-primary-500 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br sm:h-20 sm:w-20">
            <HandHeart className="h-8 w-8 text-white sm:h-10 sm:w-10" />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-3 sm:text-3xl">
            {t.title}
          </h1>
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            {t.subtitle}
          </p>
        </div>
      </div>

      {/* Services Grid - All Services in One Grid */}
      <div className="bg-gray-50 py-8 lg:py-16">
        <div className="container grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {facilitiesServices.map((facility) => {
            const colors = getColorClasses(facility.color);
            const Icon = facility.icon;

            return (
              <Link
                key={facility.id}
                href={`/${lang}/guides/facilities/${facility.id}`}
                className="group flex flex-col items-center text-center transition-colors duration-300"
              >
                {/* Solid Color Circle */}
                <div
                  className={cn(
                    "mb-3 flex h-24 w-24 items-center justify-center rounded-full border-2 shadow-lg transition-shadow duration-300 group-hover:shadow-xl sm:mb-4 sm:h-32 sm:w-32",
                    colors.bg,
                    colors.border,
                    colors.hover,
                  )}
                >
                  <Icon
                    className={cn("h-12 w-12 sm:h-16 sm:w-16", colors.icon)}
                  />
                </div>

                {/* Service Name */}
                <h3 className="text-xs leading-tight font-semibold text-gray-900 sm:text-sm">
                  {getLocalizedText(facility.name, language)}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
