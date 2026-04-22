import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { MdOutlineSecurity } from "react-icons/md";
import { PiDropHalfBottomFill } from "react-icons/pi";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guides";

interface SecurityContentProps {
  lang: Lang;
}

export function SecurityContent({ lang }: SecurityContentProps) {
  const { security: t } = createDepartureGuideI18n(lang);

  const reminders = [
    t.reminderCheckIn,
    t.reminderCooperate,
    t.reminderWeapons,
    t.reminderSharpObjects,
    t.reminderFlammables,
    t.reminderDrugs,
    t.reminderNoJokes,
    t.reminderLaoLaw,
  ];

  return (
    <>
      {/* ── Hero + Prepare + Screening ──────────────────────── */}
      <section className="bg-[#f0fbfc] py-12">
        <div className="container">
          {/* Title */}
          <div className="mb-10 space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h2>
            <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
          </div>

          {/* Image + Prepare + Screening */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-72 w-full lg:h-[500px]">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/security.png"
                alt="security screening at bkia"
                fill
                className="object-contain object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-8">
              {/* Prepare for screening */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    {t.prepareTitle}
                  </p>
                </div>
                <p className="mb-3 text-sm text-gray-600">{t.prepareDesc}</p>
                <div className="space-y-2">
                  {[
                    t.prepareDocs,
                    t.prepareStaff,
                    t.prepareElectronics,
                    t.prepareMetalItems,
                    t.prepareClothing,
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screening methods */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <MdOutlineSecurity className="h-4 w-4 text-sky-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
                    {t.screeningMethodsTitle}
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    t.screeningXray,
                    t.screeningMetalDetector,
                    t.screeningSecondary,
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Liquids + Reminders ──────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="container space-y-14">
          {/* Liquid restrictions */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <PiDropHalfBottomFill className="h-4 w-4 text-sky-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
                {t.liquidTitle}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-2 border-l-4 border-sky-500 bg-sky-50 px-4 py-3 rounded-r-lg">
                {[t.liquids100ml, t.liquidsZiplock, t.liquidsChecked].map(
                  (item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ),
                )}
                <div className="pt-2">
                  <p className="mb-1 text-sm font-medium text-gray-700">
                    {t.liquidIncludes}
                  </p>
                  <p className="text-xs leading-relaxed text-gray-500">
                    {t.liquidExamples}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-emerald-700">
                  {t.liquidExceptions}
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm text-gray-700">
                      {t.liquidBabyFormula}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm text-gray-700">
                      {t.liquidMedication}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reminders */}
          <div>
            <div className="mb-5 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                {t.remindersTitle}
              </p>
            </div>
            <div className="space-y-4">
              {reminders.map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-700">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── After Security ───────────────────────────────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
              {t.afterSecurityTitle}
            </p>
          </div>
          <p className="mb-6 text-sm text-gray-600">{t.afterSecurityDesc}</p>
          <div className="space-y-3">
            {[
              t.afterVipRoom,
              t.afterHonoraryGuest,
              t.afterRestMonitor,
              t.afterDutyFree,
              t.afterDining,
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
