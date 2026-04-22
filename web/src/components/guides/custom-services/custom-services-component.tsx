import Link from "next/link";
import { Baby, Accessibility, PawPrint, ArrowRight } from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guides";

interface Props {
  lang: Lang;
}

const cards = [
  {
    slug: "pregnancy-and-children",
    icon: Baby,
    titleKey: "pregnancyTitle" as const,
    descKey: "pregnancyDesc" as const,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-50",
  },
  {
    slug: "mobility-challenges",
    icon: Accessibility,
    titleKey: "mobilityTitle" as const,
    descKey: "mobilityDesc" as const,
    iconColor: "text-[#00AAAC]",
    iconBg: "bg-[#f0fbfc]",
  },
  {
    slug: "traveling-with-pets",
    icon: PawPrint,
    titleKey: "petsTitle" as const,
    descKey: "petsDesc" as const,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
  },
];

export const CustomServicesComponent = ({ lang }: Props) => {
  const { customServices: t } = createCustomServicesI18n(lang);

  return (
    <>
      {/* Header */}
      <section className="bg-white py-10">
        <div className="container">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            {t.categoryLabel}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 max-w-xl text-gray-500 lg:text-lg">{t.subtitle}</p>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map(
              ({ slug, icon: Icon, titleKey, descKey, iconColor, iconBg }) => (
                <Link
                  key={slug}
                  href={`/${lang}/guides/custom-services/${slug}`}
                  className="group flex flex-col gap-5 bg-white px-6 py-6 transition-colors hover:bg-[#f0fbfc]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
                  >
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <h2 className="font-bold text-gray-900">{t[titleKey]}</h2>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {t[descKey]}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00AAAC] transition-gap group-hover:gap-2.5">
                    {t.viewDetails}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
};
