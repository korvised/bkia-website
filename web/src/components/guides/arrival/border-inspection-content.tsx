import Image from "next/image";
import { AlertCircle, Clock, FileText } from "lucide-react";
import { Lang } from "@/types/language";
import { createArrivalGuideI18n } from "@/data/i18n/guide";

interface BorderInspectionContentProps {
  lang: Lang;
}

export function BorderInspectionContent({
  lang,
}: BorderInspectionContentProps) {
  const { borderInspection: t } = createArrivalGuideI18n(lang);

  return (
    <>
      {/* ── Header + Image + Wait Times ─────────────────────── */}
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
              <div className="mb-1 flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600">{t.waitTimeTitle}</p>
              </div>
              <div className="space-y-2 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
                {[t.waitOffPeak, t.waitPeak, t.waitAdvice].map((item, i) => (
                  <p key={i} className="text-sm text-gray-600">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Required Documents + VOA ────────────────────────── */}
      <section className="bg-white py-10">
        <div className="container space-y-10">
          {/* Documents */}
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.documentsTitle}</p>
            <div className="grid gap-10 sm:grid-cols-2">
              {/* Lao Citizens */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-sm font-bold text-gray-700">{t.laoCitizensTitle}</p>
                </div>
                <div className="space-y-2">
                  {[t.laoDoc1, t.laoDoc2, t.laoDoc3].map((doc, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                      {doc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Foreign Nationals */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#00AAAC]" />
                  <p className="text-sm font-bold text-gray-700">{t.foreignNationalsTitle}</p>
                </div>
                <div className="space-y-2">
                  {[t.foreignDoc1, t.foreignDoc2, t.foreignDoc3, t.foreignDoc4].map((doc, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visa on Arrival */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.voaTitle}</p>
            <div className="border-l-4 border-[#00AAAC] bg-[#f0fbfc] px-4 py-3 rounded-r-lg space-y-2">
              <p className="text-sm font-semibold text-gray-800">{t.voaAvailable}</p>
              <p className="text-sm text-gray-600">{t.voaFee}</p>
              <p className="text-sm text-gray-600">{t.voaProcessing}</p>
              <p className="text-sm text-gray-600">{t.voaValidity}</p>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold text-gray-700">{t.voaDocuments}</p>
              {[t.voaDoc1, t.voaDoc2, t.voaDoc3, t.voaDoc4].map((doc, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-0.5 shrink-0 font-bold text-[#00AAAC]">✓</span>
                  {doc}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Interview + Reminders + After Clearance ──────────── */}
      <section className="bg-gray-50 py-10">
        <div className="container space-y-10">
          {/* Interview questions */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.interviewTitle}</p>
            <p className="mb-5 text-sm text-gray-500">{t.interviewDesc}</p>
            <div className="space-y-4">
              {[
                { q: t.q1, a: t.a1 },
                { q: t.q2, a: t.a2 },
                { q: t.q3, a: t.a3 },
                { q: t.q4, a: t.a4 },
              ].map(({ q, a }, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-gray-800">{q}</p>
                  <p className="text-sm text-gray-500">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reminders */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">{t.remindersTitle}</p>
            </div>
            <div className="space-y-2 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
              {[t.reminder1, t.reminder2, t.reminder3, t.reminder4, t.reminder5].map((item, i) => (
                <p key={i} className="text-sm text-gray-600">{item}</p>
              ))}
            </div>
          </div>

          {/* After clearance + assistance */}
          <div className="grid gap-8 sm:grid-cols-2 border-t border-gray-200 pt-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">{t.afterClearanceTitle}</p>
              <p className="text-sm text-gray-600">{t.afterClearanceDesc}</p>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">{t.assistanceTitle}</p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{t.assistanceDesk}</p>
                <p>{t.assistanceEmergency}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
