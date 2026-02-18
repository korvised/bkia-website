import Link from "next/link";
import {
  AlertCircle,
  Accessibility,
  ChevronLeft,
  CheckCircle,
  Car,
  ClipboardList,
  Building2,
} from "lucide-react";
import { Lang } from "@/types/language";
import { createCustomServicesI18n } from "@/data/i18n/guide";

interface Props {
  lang: Lang;
}

export const MobilityChallengesComponent = ({ lang }: Props) => {
  const { mobilityGuideline: t } = createCustomServicesI18n(lang);

  const services = [
    {
      icon: Accessibility,
      title: t.service1Title,
      desc: t.service1Desc,
      color: "text-primary-500",
      bg: "bg-primary-50",
    },
    {
      icon: ClipboardList,
      title: t.service2Title,
      desc: t.service2Desc,
      color: "text-secondary-500",
      bg: "bg-secondary-50",
    },
    {
      icon: Building2,
      title: t.service3Title,
      desc: t.service3Desc,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      icon: Car,
      title: t.service4Title,
      desc: t.service4Desc,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  const requirements = [t.req1, t.req2, t.req3, t.req4];
  const facilities = [
    t.facility1,
    t.facility2,
    t.facility3,
    t.facility4,
    t.facility5,
    t.facility6,
  ];
  const tips = [t.tip1, t.tip2, t.tip3, t.tip4];

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

        {/* Airport Assistance Services */}
        <div className="rounded-2xl bg-white p-6 lg:p-8">
          <h2 className="mb-5 text-lg font-bold text-gray-900">
            {t.airportServicesTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map(({ icon: Icon, title, desc, color, bg }, i) => (
              <div key={i} className="flex gap-4 rounded-xl bg-gray-50 p-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg}`}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-800">{title}</p>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="rounded-2xl bg-white p-6 lg:p-8">
          <h2 className="mb-5 text-lg font-bold text-gray-900">
            {t.requirementsTitle}
          </h2>
          <div className="space-y-3">
            {requirements.map((req, i) => (
              <div
                key={i}
                className="border-primary-300 flex gap-4 border-l-4 bg-gray-50 px-5 py-4"
              >
                <span className="bg-primary-100 text-primary-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-gray-600">{req}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accessible Facilities */}
        <div className="rounded-2xl bg-white p-6 lg:p-8">
          <h2 className="mb-5 text-lg font-bold text-gray-900">
            {t.facilitiesTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, i) => (
              <div key={i} className="flex gap-3 rounded-xl bg-gray-50 p-4">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p className="text-sm leading-relaxed text-gray-600">
                  {facility}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Tips */}
        <div className="rounded-2xl bg-white p-6 lg:p-8">
          <h2 className="mb-5 text-lg font-bold text-gray-900">
            {t.tipsTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {tips.map((tip, i) => (
              <div key={i} className="flex gap-3 rounded-xl bg-gray-50 p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-500">
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
