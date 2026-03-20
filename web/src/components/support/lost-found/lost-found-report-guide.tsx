import { CheckCircle, Mail, Search, FileText, Lightbulb } from "lucide-react";
import { Lang } from "@/types/language";
import { createSupportI18n } from "@/data/i18n/support";

interface LostFoundReportGuideProps {
  lang: Lang;
}

export function LostFoundReportGuide({ lang }: LostFoundReportGuideProps) {
  const t = createSupportI18n(lang).lostFound;

  const steps = [
    { icon: FileText, title: t.guideStep1Title, desc: t.guideStep1Desc },
    { icon: CheckCircle, title: t.guideStep2Title, desc: t.guideStep2Desc },
    { icon: Search, title: t.guideStep3Title, desc: t.guideStep3Desc },
    { icon: Mail, title: t.guideStep4Title, desc: t.guideStep4Desc },
  ];

  const tips = [t.guideTip1, t.guideTip2, t.guideTip3];

  return (
    <div className="space-y-8">
      {/* Guide title */}
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
          {t.guideTitle}
        </p>
      </div>

      {/* Steps */}
      <ol className="space-y-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <li key={i} className="flex gap-4">
              {/* Circle + connector */}
              <div className="flex flex-col items-center">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00AAAC] text-white">
                  <Icon className="h-4 w-4" />
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-1 h-full w-px bg-gray-200" />
                )}
              </div>
              {/* Text */}
              <div className="pb-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">
                    0{i + 1}
                  </span>
                  <p className="text-sm font-semibold text-gray-900">
                    {step.title}
                  </p>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">
                  {step.desc}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Tips */}
      <div className="rounded-r-lg border-l-4 border-amber-500 bg-amber-50 px-4 py-3">
        <div className="mb-2 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-semibold text-amber-800">
            {t.guideTipTitle}
          </span>
        </div>
        <ul className="space-y-1.5">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-amber-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
