import Link from "next/link";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guide";
import { facilitiesServices, getColorClasses } from "@/data/guide";

interface RelatedServicesProps {
  lang: Lang;
}

// Pick 6 relevant services for departure guide
const RELATED_SERVICE_IDS = [
  "baggage-wrapping",
  "vip-lounge",
  "dining-beverage",
  "atm-service",
  "information-service",
  "baggage-cart",
];

// Filter services based on selected IDs
const services = facilitiesServices.filter((service) =>
  RELATED_SERVICE_IDS.includes(service.id),
);

// Sort services to match the order in RELATED_SERVICE_IDS
const sortedServices = RELATED_SERVICE_IDS.map((id) =>
  services.find((s) => s.id === id),
).filter(Boolean);

export function RelatedServices({ lang }: RelatedServicesProps) {
  const { relatedServices: t } = createDepartureGuideI18n(lang);

  return (
    <section className="bg-gray-50 py-10">
      <div className="container">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
          {t.title}
        </p>
        <p className="mb-6 text-sm text-gray-500">{t.subtitle}</p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {sortedServices.map((service) => {
            if (!service) return null;

            const Icon = service.icon;
            const colorClasses = getColorClasses(service.color);
            const href = `/${lang}/guides/facilities/${service.id}`;

            return (
              <Link
                key={service.id}
                href={href}
                className={`group flex flex-col items-center gap-3 rounded-xl border bg-white p-4 transition-all ${colorClasses.border} ${colorClasses.hover}`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${colorClasses.bg}`}
                >
                  <Icon className={`h-7 w-7 ${colorClasses.icon}`} />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-medium text-gray-900">
                    {service.name[lang] || service.name.en}
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    {service.shortDescription[lang] ||
                      service.shortDescription.en}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-gray-200 pt-5 text-sm text-gray-500">
          <span className="font-medium text-gray-700">{t.needHelp}</span>
          {t.helpText}{" "}
          <span className="font-semibold text-[#00AAAC]">+856 84 260 179</span>{" "}
          {t.forAssistance}
        </div>
      </div>
    </section>
  );
}
