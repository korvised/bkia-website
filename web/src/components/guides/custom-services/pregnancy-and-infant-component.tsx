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
      border: "border-l-emerald-400",
    },
    warn: {
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      border: "border-l-amber-400",
    },
    no: {
      icon: XCircle,
      iconColor: "text-rose-500",
      border: "border-l-rose-400",
    },
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container space-y-4">
        {/* Back + Header */}
        <div className="space-y-5">
          <Link
            href={`/${lang}/guides/custom-services`}
            className="group hover:text-primary-600 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {t.backButton}
          </Link>
          <div className="space-y-3">
            <h1 className="text-3xl leading-tight font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h1>
            <p className="max-w-xl text-base text-gray-500">{t.subtitle}</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          <p className="text-sm leading-relaxed text-amber-700">
            {t.disclaimer}
          </p>
        </div>

        {/* Pregnant Women + Additional Requirements — side by side on lg */}
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          {/* Pregnant Women */}
          <div className="rounded-2xl bg-white p-5">
            <h2 className="mb-4 text-base font-bold text-gray-900">
              {t.catPregnant}
            </h2>
            <div className="space-y-2">
              {pregnancyRows.map(({ stage, info, status }, i) => {
                const cfg = statusConfig[status];
                const Icon = cfg.icon;
                return (
                  <div
                    key={i}
                    className={`grid overflow-hidden rounded-xl border-l-4 bg-gray-50 ${cfg.border} lg:grid-cols-[1fr_1.4fr]`}
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
          <div className="rounded-2xl bg-white p-5">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <FileText className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <h2 className="text-base font-bold text-gray-900">
                {t.additionalReqTitle}
              </h2>
            </div>
            <div className="space-y-2">
              {additionalReqItems.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl bg-gray-50 px-4 py-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-500">
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

        {/* Infants */}
        <div className="rounded-2xl bg-white p-5">
          <h2 className="mb-4 text-base font-bold text-gray-900">
            {t.catInfants}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {infantRows.map((info, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl bg-gray-50 px-4 py-3"
              >
                <Baby className="text-secondary-400 mt-0.5 h-4 w-4 shrink-0" />
                <p className="text-sm leading-relaxed text-gray-500">{info}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nursery */}
        <div className="overflow-hidden rounded-2xl bg-white">
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-gray-900">
              {t.nurseryTitle}
            </h2>
          </div>
          <div className="lg:grid lg:grid-cols-2">
            <div className="relative min-h-56 bg-gray-100 lg:min-h-64">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/Nursery-and-Breastfeeding-Room.jpeg"
                alt={t.nurseryTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-3 bg-gray-50 p-5">
              <div className="flex gap-3">
                <div className="bg-primary-50 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                  <MapPin className="text-primary-500 h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="text-primary-400 text-xs font-semibold tracking-wide uppercase">
                    Location
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-gray-700">
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

        {/* Travel Tips */}
        <div className="rounded-2xl bg-white p-5">
          <h2 className="mb-4 text-base font-bold text-gray-900">
            {t.tipsTitle}
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl bg-gray-50 px-4 py-3"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-500">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-gray-500">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
