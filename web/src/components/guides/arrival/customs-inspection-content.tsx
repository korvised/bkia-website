import Image from "next/image";
import { Info, ExternalLink, AlertTriangle, ShieldAlert } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guides";

interface CustomsInspectionContentProps {
  lang: Lang;
}

export function CustomsInspectionContent({
  lang,
}: CustomsInspectionContentProps) {
  const { customsInspection: t } = createArrivalGuideI18n(lang);

  const tobaccoItems = [t.tobacco1, t.tobacco2, t.tobacco3];
  const alcoholItems = [t.alcohol1, t.alcohol2];

  const currencyItems = [
    { label: t.currencyForeignLabel, desc: t.currencyForeignDesc },
    { label: t.currencyKipLabel, desc: t.currencyKipDesc },
    { label: t.currencyMetalsLabel, desc: t.currencyMetalsDesc },
  ];

  const prohibitedItems = [
    { label: t.prohibitedNarcoticsLabel, desc: t.prohibitedNarcoticsDesc },
    { label: t.prohibitedWeaponsLabel, desc: t.prohibitedWeaponsDesc },
    {
      label: t.prohibitedPornographicLabel,
      desc: t.prohibitedPornographicDesc,
    },
  ];

  const restrictedItems = [
    { label: t.restrictedWildlifeLabel, desc: t.restrictedWildlifeDesc },
    { label: t.restrictedPlantsLabel, desc: t.restrictedPlantsDesc },
    { label: t.restrictedTelecomLabel, desc: t.restrictedTelecomDesc },
    { label: t.restrictedAntiquesLabel, desc: t.restrictedAntiquesDesc },
  ];

  return (
    <>
      {/* ── Section 1: Header + Image + Channels ─────────────── */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h2>
            <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[420px]">
                <Image
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/exit-customs.png"
                  alt="Customs Inspection"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Channel cards */}
            <div className="space-y-3">
              <p className="text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
                {t.channelTitle}
              </p>

              {/* Green channel */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="mb-2">
                  <span className="rounded-full bg-emerald-600 px-3 py-0.5 text-xs font-bold text-white">
                    {t.greenChannelBadge}
                  </span>
                </div>
                <p className="mb-1 text-sm font-bold text-gray-800">
                  {t.greenChannelTitle}
                </p>
                <p className="text-sm text-gray-600">{t.greenChannelDesc}</p>
              </div>

              {/* Red channel */}
              <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                <div className="mb-2">
                  <span className="rounded-full bg-red-600 px-3 py-0.5 text-xs font-bold text-white">
                    {t.redChannelBadge}
                  </span>
                </div>
                <p className="mb-1 text-sm font-bold text-gray-800">
                  {t.redChannelTitle}
                </p>
                <p className="text-sm text-gray-600">{t.redChannelDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Duty-Free + Currency ──────────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          {/* Duty-free allowances */}
          <div>
            <p className="mb-1 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
              {t.dutyFreeTitle}
            </p>
            <p className="mb-5 text-xs text-gray-400">{t.dutyFreeNote}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Tobacco */}
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="mb-3 text-sm font-bold text-gray-800">
                  {t.tobaccoTitle}
                </p>
                {tobaccoItems.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="shrink-0 font-bold text-[#00AAAC]">
                        ✓
                      </span>
                      {item}
                    </div>
                    {i < tobaccoItems.length - 1 && (
                      <p className="py-0.5 pl-5 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        or
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Alcohol */}
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="mb-3 text-sm font-bold text-gray-800">
                  {t.alcoholTitle}
                </p>
                {alcoholItems.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="shrink-0 font-bold text-[#00AAAC]">
                        ✓
                      </span>
                      {item}
                    </div>
                    {i < alcoholItems.length - 1 && (
                      <p className="py-0.5 pl-5 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        or
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Perfume */}
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="mb-3 text-sm font-bold text-gray-800">
                  {t.perfumeTitle}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="shrink-0 font-bold text-[#00AAAC]">✓</span>
                  {t.perfumeDesc}
                </div>
              </div>

              {/* Personal Effects */}
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="mb-3 text-sm font-bold text-gray-800">
                  {t.personalTitle}
                </p>
                <p className="text-sm text-gray-600">{t.personalDesc}</p>
              </div>
            </div>
          </div>

          {/* Currency declaration */}
          <div>
            <p className="mb-4 text-xs font-bold tracking-widest text-[#00AAAC] uppercase">
              {t.currencyTitle}
            </p>
            <div className="divide-y divide-[#d4f2f3] overflow-hidden rounded-xl border border-[#00AAAC]/20 bg-[#f0fbfc]">
              {currencyItems.map(({ label, desc }, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-4 px-4 py-3"
                >
                  <span className="shrink-0 text-xs font-semibold tracking-wide text-[#008e90] uppercase">
                    {label}
                  </span>
                  <span className="text-right text-sm text-gray-700">
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Prohibited + Restricted + Penalties ───── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-6">
          {/* Prohibited + Restricted — side by side */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Prohibited */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <p className="text-xs font-bold tracking-widest text-red-600 uppercase">
                  {t.prohibitedTitle}
                </p>
              </div>
              <p className="mb-3 text-xs text-gray-500">{t.prohibitedDesc}</p>
              <div className="space-y-3 rounded-r-xl border-l-4 border-red-500 bg-red-50 px-4 py-4">
                {prohibitedItems.map(({ label, desc }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="shrink-0 rounded-full border border-red-200 bg-white px-2.5 py-0.5 text-xs font-bold text-red-700">
                      {label}
                    </span>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Restricted */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-500" />
                <p className="text-xs font-bold tracking-widest text-amber-600 uppercase">
                  {t.restrictedTitle}
                </p>
              </div>
              <p className="mb-3 text-xs text-gray-500">{t.restrictedDesc}</p>
              <div className="space-y-3 rounded-r-xl border-l-4 border-amber-500 bg-amber-50 px-4 py-4">
                {restrictedItems.map(({ label, desc }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="shrink-0 rounded-full border border-amber-200 bg-white px-2.5 py-0.5 text-xs font-bold text-amber-700">
                      {label}
                    </span>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Penalties */}
          <div className="rounded-r-xl border-l-4 border-red-500 bg-red-50 px-4 py-3">
            <p className="mb-0.5 text-xs font-bold text-red-700">
              {t.penaltiesTitle}
            </p>
            <p className="text-sm text-gray-600">{t.penaltiesDesc}</p>
          </div>

          {/* Official disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-600" />
              <p className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                {t.disclaimerTitle}
              </p>
            </div>
            <p className="mb-3 text-sm text-gray-600">{t.disclaimerDesc}</p>
            <a
              href="https://customs.gov.la"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-900"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {t.disclaimerLinkText}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
