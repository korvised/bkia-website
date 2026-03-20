import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  AlertTriangle,
  Baby,
  CheckCircle,
  ChevronLeft,
  FileText,
  MapPin,
  XCircle,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guide";

interface Props {
  lang: Lang;
}

export const PregnancyAndInfantComponent = ({ lang }: Props) => {
  const { pregnancyGuideline: t } = createCustomServicesI18n(lang);

  const pregnancyRows = [
    { stage: t.pregUpTo28, info: t.pregUpTo28Info, status: "ok" as const },
    { stage: t.preg29To32, info: t.preg29To32Info, status: "warn" as const },
    { stage: t.preg33To35, info: t.preg33To35Info, status: "no" as const },
  ];

  const infantRows = [
    t.infantGeneral,
    t.infantAirlines,
    t.infantTicket,
    t.infantDoc,
  ];

  const tips = [t.tip1, t.tip2, t.tip3, t.tip4];

  const additionalReqItems = t.additionalReqList
    .split("\n")
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean);

  const statusConfig = {
    ok: {
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      borderColor: "border-l-emerald-400",
    },
    warn: {
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      borderColor: "border-l-amber-400",
    },
    no: {
      icon: XCircle,
      iconColor: "text-rose-500",
      borderColor: "border-l-rose-400",
    },
  };

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

      {/* Pregnant women + Additional requirements */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* Pregnant Women */}
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                Guidelines
              </p>
              <h2 className="mb-5 text-xl font-bold text-gray-900">
                {t.catPregnant}
              </h2>
              <div className="space-y-2">
                {pregnancyRows.map(({ stage, info, status }, i) => {
                  const cfg = statusConfig[status];
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={i}
                      className={`grid overflow-hidden border-l-4 bg-gray-50 ${cfg.borderColor} lg:grid-cols-[1fr_1.4fr]`}
                    >
                      <div className="flex items-start gap-2.5 px-4 py-3">
                        <Icon
                          className={`mt-0.5 h-4 w-4 shrink-0 ${cfg.iconColor}`}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {stage}
                        </span>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-3 lg:border-t-0 lg:border-l">
                        <p className="text-sm leading-relaxed text-gray-500">
                          {info}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <FileText className="h-4 w-4 text-[#00AAAC]" />
                <h2 className="text-xl font-bold text-gray-900">
                  {t.additionalReqTitle}
                </h2>
              </div>
              <div className="space-y-3">
                {additionalReqItems.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00AAAC] text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infants */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Infants
          </p>
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            {t.catInfants}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {infantRows.map((info, i) => (
              <div key={i} className="flex gap-3">
                <Baby className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                <p className="text-sm leading-relaxed text-gray-600">{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nursery */}
      <section className="bg-white py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Facility
          </p>
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            {t.nurseryTitle}
          </h2>
          <div className="overflow-hidden lg:grid lg:grid-cols-2">
            <div className="relative min-h-56 bg-gray-100 lg:min-h-64">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/Nursery-and-Breastfeeding-Room.jpeg"
                alt={t.nurseryTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 bg-gray-50 p-6">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {t.nurseryLoc}
                  </p>
                </div>
              </div>
              <div className="h-px bg-gray-200" />
              <p className="text-sm leading-relaxed text-gray-500 italic">
                {t.nurseryDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="bg-gray-50 py-10">
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
