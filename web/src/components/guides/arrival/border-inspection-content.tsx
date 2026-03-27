import Image from "next/image";
import {
  Clock,
  FileText,
  QrCode,
  ExternalLink,
  FileCheck,
  Globe,
  Landmark,
  Info,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface BorderInspectionContentProps {
  lang: Lang;
}

export function BorderInspectionContent({ lang }: BorderInspectionContentProps) {
  const { borderInspection: t } = createArrivalGuideI18n(lang);

  const waitTimes = [
    { label: t.waitOffPeakLabel, value: t.waitOffPeakValue },
    { label: t.waitPeakLabel, value: t.waitPeakValue },
  ];

  const ldifItems = [
    { label: t.ldifWhoLabel, desc: t.ldifWhoDesc },
    { label: t.ldifTimingLabel, desc: t.ldifTimingDesc },
    { label: t.ldifRequirementLabel, desc: t.ldifRequirementDesc },
  ];

  const visaTypes = [
    { code: t.visaTouristCode, name: t.visaTouristName, desc: t.visaTouristDesc },
    { code: t.visaBusinessCode, name: t.visaBusinessName, desc: t.visaBusinessDesc },
    { code: t.visaLaborCode, name: t.visaLaborName, desc: t.visaLaborDesc },
    { code: t.visaDiplomaticCode, name: t.visaDiplomaticName, desc: t.visaDiplomaticDesc },
    { code: t.visaExpertCode, name: t.visaExpertName, desc: t.visaExpertDesc },
    { code: t.visaTransitCode, name: t.visaTransitName, desc: t.visaTransitDesc },
  ];

  const obtainMethods = [
    { icon: FileCheck, label: t.obtainVoaLabel, desc: t.obtainVoaDesc, note: null as string | null },
    { icon: Globe, label: t.obtainEvisaLabel, desc: t.obtainEvisaDesc, note: t.obtainEvisaNote },
    { icon: Landmark, label: t.obtainEmbassyLabel, desc: t.obtainEmbassyDesc, note: null as string | null },
  ];

  const laoDocs = [t.laoDoc1, t.laoDoc2, t.laoDoc3];
  const foreignDocs = [t.foreignDoc1, t.foreignDoc2, t.foreignDoc3, t.foreignDoc4];

  return (
    <>
      {/* ── Section 1: Header + Image + Wait Times ──────────── */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">{t.title}</h2>
            <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[420px]">
                <Image
                  src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/immigration.png"
                  alt="Immigration Border Control"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Wait times */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                  {t.waitTimeTitle}
                </p>
              </div>
              <div className="divide-y divide-amber-100 overflow-hidden rounded-xl bg-white">
                {waitTimes.map(({ label, value }, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm font-bold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">{t.waitAdvice}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Visa Info + LDIF ─────────────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          {/* Visa categories */}
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.visaCategoriesTitle}
            </p>
            <p className="mb-5 text-sm text-gray-500">{t.visaCategoriesDesc}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visaTypes.map(({ code, name, desc }) => (
                <div key={code} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-2">
                    <span className="rounded-full bg-[#00AAAC] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {code}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-semibold text-gray-800">{name}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              ))}
            </div>

            {/* Visa exemption */}
            <div className="mt-4 rounded-r-lg border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3">
              <p className="mb-0.5 text-xs font-bold text-[#008e90]">{t.visaExemptionLabel}</p>
              <p className="text-sm text-gray-600">{t.visaExemptionDesc}</p>
            </div>
          </div>

          {/* How to obtain */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.obtainTitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {obtainMethods.map(({ icon: Icon, label, desc, note }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0fbfc]">
                    <Icon className="h-4 w-4 text-[#00AAAC]" />
                  </div>
                  <p className="mb-1.5 text-sm font-bold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                  {note && (
                    <p className="mt-2 rounded-lg bg-[#f0fbfc] px-2.5 py-1.5 text-xs text-[#008e90]">
                      {note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* LDIF — Action Required */}
          <div className="overflow-hidden rounded-2xl border border-[#00AAAC]/20 bg-[#f0fbfc]">
            <div className="px-6 py-5">
              <div className="mb-1 flex items-center gap-2">
                <QrCode className="h-4 w-4 text-[#00AAAC]" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#00AAAC]">
                  Action Required
                </p>
              </div>
              <h3 className="mb-2 text-base font-bold text-gray-900">{t.ldifTitle}</h3>
              <p className="text-sm text-gray-500">{t.ldifDesc}</p>
            </div>
            <div className="grid divide-[#00AAAC]/10 border-t border-[#00AAAC]/20 bg-white sm:grid-cols-3 sm:divide-x">
              {ldifItems.map(({ label, desc }) => (
                <div key={label} className="px-5 py-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#00AAAC]">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">{desc}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#00AAAC]/20 px-6 py-4">
              <a
                href="https://immigration.gov.la"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00AAAC] hover:text-[#008e90]"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                immigration.gov.la
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Documents + VOA + Q&A + Reminders + After ─ */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-10">
          {/* Required documents */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.documentsTitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Lao citizens */}
              <div className="rounded-xl bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-sm font-bold text-gray-800">{t.laoCitizensTitle}</p>
                </div>
                <div className="space-y-2">
                  {laoDocs.map((doc, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                      {doc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Foreign nationals */}
              <div className="rounded-xl bg-white p-5">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-sm font-bold text-gray-800">{t.foreignNationalsTitle}</p>
                </div>
                <div className="space-y-2">
                  {foreignDocs.map((doc, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Official disclaimer */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-600" />
              <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
                {t.disclaimerTitle}
              </p>
            </div>
            <p className="mb-3 text-sm text-gray-600">{t.disclaimerDesc}</p>
            <a
              href="https://immigration.gov.la"
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
