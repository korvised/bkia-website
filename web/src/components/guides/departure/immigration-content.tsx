import Image from "next/image";
import { FaPassport } from "react-icons/fa";
import { MdOutlineFlag, MdOutlinePublic } from "react-icons/md";
import { TbAlertTriangle } from "react-icons/tb";
import { CheckCircle } from "lucide-react";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guide";

interface ImmigrationContentProps {
  lang: Lang;
}

export function ImmigrationContent({ lang }: ImmigrationContentProps) {
  const { immigration: t } = createDepartureGuideI18n(lang);

  const laoDocuments = [
    t.laoPassport,
    t.laoIdCard,
    t.laoHouseholdReg,
    t.laoBirthCert,
    t.laoResidence,
  ];

  const foreignDocuments = [
    t.foreignPassport,
    t.foreignDeparture,
    t.foreignLossReport,
  ];

  const processSteps = [
    t.processStep1,
    t.processStep2,
    t.processStep3,
    t.processStep4,
    t.processStep5,
  ];

  const notes = [
    t.notePassportValidity,
    t.noteVisa,
    t.noteQuestions,
    t.noteProhibited,
  ];

  return (
    <>
      {/* ── Hero + Documents ─────────────────────────────────── */}
      <section className="bg-[#f0fbfc] py-12">
        <div className="container">
          {/* Title */}
          <div className="mb-10 space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              {t.title}
            </h2>
            <p className="max-w-2xl text-gray-500 lg:text-lg">{t.intro}</p>
          </div>

          {/* Image + Documents */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative h-72 w-full lg:h-[500px]">
              <Image
                src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/guides/immigration.png"
                alt="immigration control at bkia"
                fill
                className="object-contain object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-8">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <FaPassport className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    {t.documentsTitle}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{t.documentsDesc}</p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                {/* Lao Nationals */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <MdOutlineFlag className="h-4 w-4 text-[#00AAAC]" />
                    <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                      {t.laoNationalsTitle}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {laoDocuments.map((doc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Foreigners */}
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <MdOutlinePublic className="h-4 w-4 text-sky-500" />
                    <p className="text-xs font-bold uppercase tracking-widest text-sky-600">
                      {t.foreignersTitle}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {foreignDocuments.map((doc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span className="text-sm text-gray-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process + Notes + Counters ───────────────────────── */}
      <section className="bg-white py-12">
        <div className="container space-y-14">
          {/* Immigration process */}
          <div>
            <div className="mb-5 flex items-center gap-2">
              <FaPassport className="h-4 w-4 text-[#00AAAC]" />
              <p className="text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                {t.processTitle}
              </p>
            </div>
            <div className="space-y-0 divide-y divide-gray-100">
              {processSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 py-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00AAAC] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important notes */}
          <div>
            <div className="mb-5 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">
                {t.notesTitle}
              </p>
            </div>
            <div className="space-y-3">
              {notes.map((note, i) => (
                <div key={i} className="flex items-start gap-2">
                  <TbAlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <span className="text-sm text-gray-700">{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Immigration counters */}
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
            <div className="flex items-center gap-3">
              <MdOutlineFlag className="h-5 w-5 shrink-0 text-[#00AAAC]" />
              <p className="text-sm font-semibold text-gray-900">
                {t.counterLao}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <MdOutlinePublic className="h-5 w-5 shrink-0 text-sky-500" />
              <p className="text-sm font-semibold text-gray-900">
                {t.counterForeign}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaPassport className="h-5 w-5 shrink-0 text-violet-500" />
              <p className="text-sm font-semibold text-gray-900">
                {t.counterDiplomatic}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
