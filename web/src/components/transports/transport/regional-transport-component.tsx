import { TH, MM } from "country-flag-icons/react/1x1";
import { Lang } from "@/types/language";
import { createRegionalTransportI18n } from "@/data/i18n/transport/regional";

interface Props {
  lang: Lang;
}

export const RegionalTransportComponent = ({ lang }: Props) => {
  const { toThailand: tTH, toMyanmar: tMM } = createRegionalTransportI18n(lang);

  return (
    <div className="container space-y-12">
      {/* To Thailand Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <TH className="h-4 w-4 sm:h-12 sm:w-12" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
              {tTH.title}
            </h2>
            <p className="text-gray-600">{tTH.intro}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Distance */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              📍 {tTH.distanceTitle}
            </h3>
            <p className="whitespace-pre-line text-gray-700">{tTH.distance}</p>
          </div>

          {/* Transport */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              🚕 {tTH.transportTitle}
            </h3>
            <p className="text-gray-700">{tTH.taxi}</p>
          </div>

          {/* Crossing Methods */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              ⛵ {tTH.crossingTitle}
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="font-medium text-blue-900">• {tTH.ferry}</li>
              <li className="text-gray-600">• {tTH.bridge}</li>
            </ul>
          </div>

          {/* Hours & Visa */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-2 font-semibold text-gray-900">
                ⏰ {tTH.hoursTitle}
              </h4>
              <p className="text-sm text-gray-700">{tTH.hours}</p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-gray-900">
                📋 {tTH.visaTitle}
              </h4>
              <p className="text-sm text-gray-700">{tTH.visa}</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-lg bg-yellow-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            💡 {tTH.tipsTitle}
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• {tTH.tip1}</li>
            <li>• {tTH.tip2}</li>
          </ul>
        </div>
      </section>

      {/* To Myanmar Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <MM className="h-4 w-4 sm:h-12 sm:w-12" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
              {tMM.title}
            </h2>
            <p className="text-gray-600">{tMM.intro}</p>
          </div>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <h3 className="flex items-center gap-2 font-bold text-red-900">
            {tMM.warningTitle}
          </h3>
          <p className="text-sm text-red-800">{tMM.warning}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              📍 {tMM.distanceTitle}
            </h3>
            <p className="text-gray-700">{tMM.distance}</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              ⛵ {tMM.crossingTitle}
            </h3>
            <p className="text-gray-700">{tMM.crossing}</p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-2 font-semibold text-gray-900">
                ⏰ {tMM.hoursTitle}
              </h4>
              <p className="text-sm text-gray-700">{tMM.hours}</p>
            </div>
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <h4 className="mb-2 font-semibold text-gray-900">
                📋 {tMM.visaTitle}
              </h4>
              <p className="text-sm text-gray-700">{tMM.visa}</p>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-green-900">
              ✅ {tMM.alternativeTitle}
            </h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• {tMM.alt1}</li>
              <li>• {tMM.alt2}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
