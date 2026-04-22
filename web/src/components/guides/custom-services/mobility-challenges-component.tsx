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
import { createCustomServicesI18n } from "@/data/i18n/guides";

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
      iconColor: "text-[#00AAAC]",
      iconBg: "bg-[#f0fbfc]",
    },
    {
      icon: ClipboardList,
      title: t.service2Title,
      desc: t.service2Desc,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      icon: Building2,
      title: t.service3Title,
      desc: t.service3Desc,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    },
    {
      icon: Car,
      title: t.service4Title,
      desc: t.service4Desc,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
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

      {/* Airport Assistance Services */}
      <section className="bg-white py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Services
          </p>
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            {t.airportServicesTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map(({ icon: Icon, title, desc, iconColor, iconBg }, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Requirements
          </p>
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            {t.requirementsTitle}
          </h2>
          <div className="space-y-3">
            {requirements.map((req, i) => (
              <div key={i} className="flex gap-3 border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00AAAC] text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-gray-600">{req}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessible Facilities */}
      <section className="bg-white py-10">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Facilities
          </p>
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            {t.facilitiesTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <p className="text-sm leading-relaxed text-gray-600">
                  {facility}
                </p>
              </div>
            ))}
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
