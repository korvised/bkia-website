import Link from "next/link";
import { Baby, Accessibility, PawPrint, ArrowRight } from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guide";

interface Props {
  lang: Lang;
}

const cards = [
  {
    slug: "pregnancy-and-children",
    icon: Baby,
    titleKey: "pregnancyTitle" as const,
    descKey: "pregnancyDesc" as const,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    slug: "mobility-challenges",
    icon: Accessibility,
    titleKey: "mobilityTitle" as const,
    descKey: "mobilityDesc" as const,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    slug: "traveling-with-pets",
    icon: PawPrint,
    titleKey: "petsTitle" as const,
    descKey: "petsDesc" as const,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
];

export const CustomServicesComponent = ({ lang }: Props) => {
  const { customServices: t } = createCustomServicesI18n(lang);

  return (
    <div className="container space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
          {t.title}
        </h1>
        <p className="text-gray-600 lg:text-lg">{t.subtitle}</p>
      </div>

      {/* Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(
          ({ slug, icon: Icon, titleKey, descKey, iconBg, iconColor }) => (
            <div
              key={slug}
              className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5"
            >
              {/* Card top */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-primary-600 text-xs font-medium">
                    {t.categoryLabel}
                  </p>
                  <h2 className="leading-snug font-semibold text-gray-900">
                    {t[titleKey]}
                  </h2>
                </div>
                <div
                  className={`${iconBg} flex h-14 w-14 shrink-0 items-center justify-center rounded-full`}
                >
                  <Icon className={`${iconColor} h-7 w-7`} />
                </div>
              </div>

              {/* Description */}
              <p className="flex-1 text-sm text-gray-600">{t[descKey]}</p>

              {/* View Details button */}
              <Link
                href={`/${lang}/guides/custom-services/${slug}`}
                className="hover:border-primary-400 hover:text-primary-600 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors"
              >
                {t.viewDetails}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
