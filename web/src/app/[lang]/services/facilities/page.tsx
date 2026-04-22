import { Metadata } from "next";
import { HandHeart, MapPin } from "lucide-react";
import { Lang } from "@/types/language";
import { facilitiesServices } from "@/data/guide";
import { cn, getLocalizedText } from "@/lib";
import { createDepartureGuideI18n } from "@/data/i18n/guides";
import { AnimatedCard } from "./AnimatedCard";

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

// Vibrant solid bg for icon — white icon on top
const ICON_BG: Record<string, string> = {
  indigo: "bg-indigo-500",
  blue: "bg-sky-500",
  cyan: "bg-cyan-500",
  teal: "bg-teal-500",
  primary: "bg-[#00AAAC]",
  secondary: "bg-[#00AAAC]",
  violet: "bg-violet-500",
  purple: "bg-purple-500",
  rose: "bg-rose-500",
  pink: "bg-pink-500",
  fuchsia: "bg-fuchsia-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  emerald: "bg-emerald-600",
  green: "bg-green-500",
  lime: "bg-lime-500",
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  zinc: "bg-zinc-500",
  neutral: "bg-neutral-500",
  stone: "bg-stone-500",
  red: "bg-red-500",
};

export default async function AirportFacilitiesPage({
  params,
}: FacilityServicePageProps) {
  const { lang } = await params;
  const language = lang as Lang;
  const { facilities: t } = createDepartureGuideI18n(lang);

  return (
    <>
      {/* ── Hero Header ─────────────────────────────────────── */}
      <section className="border-b border-[#00AAAC]/10 bg-[#f0fbfc] py-10">
        <div className="container flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#00AAAC]">
            <HandHeart className="h-7 w-7 text-white" />
          </div>
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              Services
            </p>
            <h1 className="text-2xl font-bold text-[#1a2c5b] sm:text-3xl lg:text-4xl">
              {t.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ── Facilities Grid ──────────────────────────────────── */}
      <section className="bg-gray-50 py-10 lg:py-14">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilitiesServices.map((facility, index) => {
              const Icon = facility.icon;
              const name = getLocalizedText(facility.name, language);
              const shortDesc = getLocalizedText(
                facility.shortDescription,
                language,
              );
              const description = getLocalizedText(
                facility.description,
                language,
              );

              return (
                <AnimatedCard
                  key={facility.id}
                  delay={index * 60}
                  className="flex"
                >
                  <div className="flex w-full flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    {/* Icon + Name */}
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-sm",
                          ICON_BG[facility.color] ?? "bg-[#00AAAC]",
                        )}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold leading-snug text-[#1a2c5b]">
                          {name}
                        </h3>
                        <p className="mt-0.5 text-xs font-medium text-gray-400">
                          {shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs leading-relaxed text-gray-600">
                      {description}
                    </p>

                    {/* Location — each entry gets its own MapPin chip */}
                    {facility.location && facility.location.length > 0 && (
                      <div className="mt-auto flex flex-col gap-2 border-t border-gray-100 pt-3">
                        {facility.location.map((loc, locIdx) => {
                          const area = getLocalizedText(loc.area, language);
                          const floor = loc.floor
                            ? getLocalizedText(loc.floor, language)
                            : null;
                          const nearBy = loc.nearBy
                            ? getLocalizedText(loc.nearBy, language)
                            : null;

                          return (
                            <div key={locIdx} className="flex flex-col gap-1">
                              {/* Area chip */}
                              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#00AAAC]/10 px-2.5 py-1 text-xs font-semibold text-[#00AAAC]">
                                <MapPin className="h-3 w-3 shrink-0" />
                                {area}
                                {floor && (
                                  <span className="font-normal opacity-70">
                                    {" "}
                                    · {floor}
                                  </span>
                                )}
                              </span>
                              {/* nearBy as a second chip */}
                              {nearBy && (
                                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
                                  <MapPin className="h-3 w-3 shrink-0" />
                                  {nearBy}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
