import Link from "next/link";
import {
  AlertCircle,
  ChevronLeft,
  FileText,
  PawPrint,
  Package,
  ShieldAlert,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guide";

interface Props {
  lang: Lang;
}

export const TravelingWithPetsComponent = ({ lang }: Props) => {
  const { petsGuideline: t } = createCustomServicesI18n(lang);

  const generalRules = [t.general1, t.general2, t.general3, t.general4];
  const avihRules = [t.avih1, t.avih2, t.avih3];
  const documents = [
    {
      icon: FileText,
      title: t.doc1Title,
      desc: t.doc1Desc,
      iconColor: "text-[#00AAAC]",
      iconBg: "bg-[#f0fbfc]",
    },
    {
      icon: FileText,
      title: t.doc2Title,
      desc: t.doc2Desc,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    },
  ];
  const carrierRules = [t.carrier1, t.carrier2];
  const tips = [t.tip1, t.tip2];

  return (
    <>
      {/* Header */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container">
          <Link
            href={`/${lang}/guides/custom-services`}
            className="group mb-6 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-[#00AAAC]"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {t.backButton}
          </Link>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Custom Services
          </p>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
            {t.title}
          </h1>
          <p className="mt-3 max-w-xl text-gray-500">{t.subtitle}</p>
          {/* Disclaimer */}
          <div className="mt-6 flex gap-3 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <p className="text-sm leading-relaxed text-gray-600">
              {t.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* General Rules + AVIH */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            {/* General Rules */}
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                Rules
              </p>
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                {t.generalTitle}
              </h2>
              <div className="space-y-3">
                {generalRules.map((rule, i) => (
                  <div
                    key={i}
                    className="flex gap-3 border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg"
                  >
                    <PawPrint className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                    <p className="text-sm leading-relaxed text-gray-600">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AVIH Special Requirements */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-rose-500" />
                <h2 className="text-xl font-bold text-gray-900">
                  {t.avihTitle}
                </h2>
              </div>
              <div className="space-y-3">
                {avihRules.map((rule, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[10px] font-bold text-rose-500">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents + Carrier */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Required Documents */}
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                Documents
              </p>
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                {t.documentsTitle}
              </h2>
              <div className="space-y-4">
                {documents.map(
                  ({ icon: Icon, title, desc, iconColor, iconBg }, i) => (
                    <div key={i} className="flex gap-4">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                      >
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {title}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-gray-500">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Carrier Requirements */}
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                Carrier
              </p>
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                {t.carrierTitle}
              </h2>
              <div className="space-y-3">
                {carrierRules.map((rule, i) => (
                  <div key={i} className="flex gap-3">
                    <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                    <p className="text-sm leading-relaxed text-gray-600">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="bg-white py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Tips
          </p>
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            {t.tipsTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-600">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
