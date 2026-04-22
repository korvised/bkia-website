import Image from "next/image";
import { CheckCircle, Clock } from "lucide-react";
import {
  MdOutlineFlightTakeoff,
  MdOutlineAirlineSeatReclineNormal,
} from "react-icons/md";
import { TbAlertTriangle, TbSpeakerphone } from "react-icons/tb";
import { BsPersonCheck } from "react-icons/bs";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guides";

interface BoardingContentProps {
  lang: Lang;
}

export function BoardingContent({ lang }: BoardingContentProps) {
  const { boarding: t } = createDepartureGuideI18n(lang);

  const boardingGroups = [
    { label: t.priorityBoarding, desc: t.priorityBoardingDesc },
    { label: t.economyRear, desc: t.economyRearDesc },
    { label: t.economyFront, desc: t.economyFrontDesc },
  ];

  return (
    <>
      {/* ── Hero + Boarding Time ─────────────────────────────── */}
      <section className="bg-[#f0fbfc] py-12">
        <div className="container">
          {/* Title */}
          <div className="mb-10 space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h2>
            <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
          </div>

          {/* Image + Boarding time */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-72 w-full lg:h-[500px]">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/boarding.png"
                alt="boarding at bkia"
                fill
                className="object-contain object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-8">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    {t.boardingTimeTitle}
                  </p>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  {t.boardingTimeDesc}
                </p>
                <div className="divide-y divide-[#c8ecee]">
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-gray-500">
                      {t.boardingBegins}
                    </span>
                    <span className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      {t.boardingBeginsTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-gray-500">
                      {t.gateCloses}
                    </span>
                    <span className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                      {t.gateClosesTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Late passengers warning */}
              <div className="flex items-start gap-3 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
                <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span className="text-sm text-amber-800">
                  {t.latePassengers}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Groups + Docs + Announcements ────────────────────── */}
      <section className="bg-white py-12">
        <div className="container space-y-14">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Boarding groups */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <BsPersonCheck className="h-4 w-4 text-[#00AAAC]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                  {t.boardingGroupsTitle}
                </p>
              </div>
              <div className="space-y-0 divide-y divide-gray-100">
                {boardingGroups.map((group, i) => (
                  <div key={i} className="flex items-start gap-4 py-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00AAAC] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {group.label}
                      </p>
                      <p className="text-xs text-gray-500">{group.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required documents */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                  {t.requiredTitle}
                </p>
              </div>
              <div className="space-y-3">
                {[
                  t.requiredBoardingPass,
                  t.requiredPassport,
                  t.requiredCabinBag,
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-l-2 border-gray-200 pl-4">
                <p className="mb-1 text-xs font-bold text-gray-600">
                  {t.gateCheckTitle}
                </p>
                <p className="text-xs text-gray-500">{t.gateCheckDesc}</p>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div className="flex items-start gap-3">
            <TbSpeakerphone className="mt-0.5 h-5 w-5 shrink-0 text-[#00AAAC]" />
            <div>
              <p className="mb-1 text-sm font-semibold text-gray-900">
                {t.announcementsTitle}
              </p>
              <p className="text-sm text-gray-600">{t.announcementsDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── In-Flight + Prohibited + Tips ────────────────────── */}
      <section className="bg-gray-50 py-12">
        <div className="container space-y-14">
          {/* In-flight regulations */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <MdOutlineAirlineSeatReclineNormal className="h-4 w-4 text-sky-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                {t.inFlightTitle}
              </p>
            </div>
            <div className="space-y-3">
              {[
                t.seatbelt,
                t.electronics,
                t.seatPosition,
                t.overheadBins,
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                  <span className="text-sm text-gray-700">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prohibited on board */}
          <div>
            <div className="mb-5 border-l-4 border-red-500 bg-red-50 px-4 py-3 rounded-r-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-red-600">
                {t.prohibitedTitle}
              </p>
            </div>
            <div className="space-y-3">
              {[
                t.prohibitedNoSmoking,
                t.prohibitedNoDisturbance,
                t.prohibitedNoChaos,
                t.prohibitedEmergency,
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-sm leading-relaxed text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-wide text-red-700">
              {t.prohibitedWarning}
            </p>
          </div>

          {/* Tips */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <MdOutlineFlightTakeoff className="h-4 w-4 text-[#00AAAC]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                {t.tipsTitle}
              </p>
            </div>
            <div className="space-y-3">
              {[t.tipEarly, t.tipCharge, t.tipEssentials, t.tipListen].map(
                (tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                    <span className="text-sm text-gray-700">{tip}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
