"use client";

import { TH, MM } from "country-flag-icons/react/1x1";
import { Clock, FileText, MapPin, Car, Ship, AlertTriangle, Lightbulb } from "lucide-react";
import { Lang } from "@/types/language";
import { createRegionalTransportI18n } from "@/data/i18n/transport/regional";

interface Props {
  lang: Lang;
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 py-3 last:border-0">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
      <div>
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-sm text-gray-700">{value}</p>
      </div>
    </div>
  );
}

export const RegionalComponent = ({ lang }: Props) => {
  const { toThailand: tTH, toMyanmar: tMM } = createRegionalTransportI18n(lang);

  return (
    <>
      {/* ══ Thailand — Header ═══════════════════════════════ */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#b2e8ea]">
              <TH className="h-14 w-14" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{tTH.title}</p>
              <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">{tTH.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{tTH.intro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Thailand — Details ══════════════════════════════ */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container grid gap-12 lg:grid-cols-2">
          {/* Info rows */}
          <div>
            <InfoRow icon={MapPin} label={tTH.distanceTitle} value={tTH.distance} />
            <InfoRow icon={Car} label={tTH.transportTitle} value={tTH.taxi} />
            <InfoRow icon={Clock} label={tTH.hoursTitle} value={tTH.hours} />
            <InfoRow icon={FileText} label={tTH.visaTitle} value={tTH.visa} />
          </div>

          {/* Crossing options */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{tTH.crossingTitle}</p>
            <div className="space-y-5">
              {[
                { label: "Option 1", value: tTH.ferry },
                { label: "Option 2", value: tTH.bridge },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Ship className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                  <div>
                    <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
                    <p className="text-sm text-gray-700">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ Thailand — Tips ═════════════════════════════════ */}
      <section className="bg-amber-50/50 py-8">
        <div className="container">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600">{tTH.tipsTitle}</p>
          </div>
          <div className="space-y-2 border-l-2 border-amber-300 pl-4">
            <p className="text-sm text-gray-600">{tTH.tip1}</p>
            <p className="text-sm text-gray-600">{tTH.tip2}</p>
          </div>
        </div>
      </section>

      {/* ══ Myanmar — Header ════════════════════════════════ */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-full ring-2 ring-red-200">
              <MM className="h-14 w-14" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{tMM.title}</p>
              <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">{tMM.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{tMM.intro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Myanmar — Warning + Details ═════════════════════ */}
      <section className="bg-red-50/40 py-10">
        <div className="container space-y-8">
          {/* Warning */}
          <div className="flex items-start gap-3 border-l-2 border-red-400 pl-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-red-500">{tMM.warningTitle}</p>
              <p className="text-sm text-gray-600">{tMM.warning}</p>
            </div>
          </div>

          {/* Info rows + alternatives */}
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <InfoRow icon={MapPin} label={tMM.distanceTitle} value={tMM.distance} />
              <InfoRow icon={Car} label={tMM.transportTitle} value={tMM.transport} />
              <InfoRow icon={Ship} label={tMM.crossingTitle} value={tMM.crossing} />
              <InfoRow icon={Clock} label={tMM.hoursTitle} value={tMM.hours} />
              <InfoRow icon={FileText} label={tMM.visaTitle} value={tMM.visa} />
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{tMM.alternativeTitle}</p>
              <div className="space-y-3">
                {[tMM.alt1, tMM.alt2].map((alt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#00AAAC] shadow-sm">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-600">{alt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
