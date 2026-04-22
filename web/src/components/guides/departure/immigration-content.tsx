import Image from "next/image";
import {
  FileText,
  QrCode,
  ExternalLink,
  Info,
  AlertTriangle,
  Coins,
  ShieldX,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guides";

interface ImmigrationContentProps {
  lang: Lang;
}

export function ImmigrationContent({ lang }: ImmigrationContentProps) {
  const { immigration: t } = createDepartureGuideI18n(lang);

  const ldifItems = [
    { label: t.ldifWhoLabel, desc: t.ldifWhoDesc },
    { label: t.ldifTimingLabel, desc: t.ldifTimingDesc },
    { label: t.ldifRequirementLabel, desc: t.ldifRequirementDesc },
  ];

  const laoDocs = [t.laoDoc1, t.laoDoc2, t.laoDoc3];
  const foreignDocs = [t.foreignDoc1, t.foreignDoc2, t.foreignDoc3, t.foreignDoc4];

  const steps = [
    { label: t.step1Label, desc: t.step1Desc },
    { label: t.step2Label, desc: t.step2Desc },
    { label: t.step3Label, desc: t.step3Desc },
    { label: t.step4Label, desc: t.step4Desc },
  ];

  const rules = [
    { icon: AlertTriangle, label: t.rule1Label, desc: t.rule1Desc },
    { icon: Coins, label: t.rule2Label, desc: t.rule2Desc },
    { icon: ShieldX, label: t.rule3Label, desc: t.rule3Desc },
  ];

  return (
    <>
      {/* ── Section 1: Header + Image + LDIF ────────────────── */}
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
                  alt="Departure immigration control"
                  fill
                  className="object-contain object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* LDIF block */}
            <div className="overflow-hidden rounded-2xl border border-[#00AAAC]/20 bg-white">
              <div className="bg-[#f0fbfc] px-6 py-5">
                <div className="mb-1 flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#00AAAC]">
                    Action Required
                  </p>
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-900">{t.ldifTitle}</h3>
                <p className="text-sm text-gray-500">{t.ldifDesc}</p>
              </div>
              <div className="grid divide-[#00AAAC]/10 border-t border-[#00AAAC]/20 sm:grid-cols-3 sm:divide-x">
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
        </div>
      </section>

      {/* ── Section 2: Documents + Procedures ───────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          {/* Required documents */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.documentsTitle}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-sm font-bold text-gray-800">{t.laoNationalsTitle}</p>
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
              <div className="rounded-xl bg-gray-50 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-sm font-bold text-gray-800">{t.foreignersTitle}</p>
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

          {/* Departure procedures */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.processTitle}
            </p>
            <div className="space-y-0 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-gray-50">
              {steps.map(({ label, desc }, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00AAAC] text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="mb-0.5 text-sm font-bold text-gray-800">{label}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Rules + Disclaimer ────────────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-6">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
            {t.rulesTitle}
          </p>
          <div className="space-y-3">
            {rules.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                  <Icon className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="mb-0.5 text-sm font-bold text-amber-800">{label}</p>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
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
