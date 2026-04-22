import {
  MdOutlineCancel,
  MdOutlineCheckCircle,
  MdOutlineInfo,
  MdOutlineSecurity,
  MdOutlineWarning,
} from "react-icons/md";
import {
  PiCigaretteFill,
  PiDeviceMobileFill,
  PiDropHalfBottomFill,
  PiKnifeFill,
  PiProhibitFill,
  PiWarningCircleFill,
} from "react-icons/pi";
import { GiPistolGun } from "react-icons/gi";
import { LuFootprints, LuScanLine, LuShield } from "react-icons/lu";
import { IoBodyOutline } from "react-icons/io5";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guides";

interface AirportSecurityProps {
  lang: Lang;
}

export function AirportSecurity({ lang }: AirportSecurityProps) {
  const { airportSecurity: t } = createDepartureGuideI18n(lang);

  const preparationItems = [
    {
      icon: PiDropHalfBottomFill,
      title: t.liquidsTitle,
      color: "text-blue-500",
      items: [t.liquids100ml, t.liquidsZiplock, t.liquids1liter, t.liquidsChecked],
    },
    {
      icon: PiKnifeFill,
      title: t.sharpObjectsTitle,
      color: "text-red-500",
      items: [t.sharpObjectsDesc],
    },
    {
      icon: GiPistolGun,
      title: t.firearmsTitle,
      color: "text-gray-600",
      items: [t.firearmsDesc],
    },
    {
      icon: PiWarningCircleFill,
      title: t.dangerousTitle,
      color: "text-orange-500",
      items: [t.dangerousDesc],
    },
    {
      icon: PiDeviceMobileFill,
      title: t.electronicsTitle,
      color: "text-purple-500",
      items: [t.electronicsDesc],
    },
    {
      icon: PiCigaretteFill,
      title: t.tobaccoTitle,
      color: "text-amber-500",
      items: [t.tobaccoCheckpoint, t.tobaccoChecked],
    },
  ];

  const screeningSteps = [
    {
      step: 1,
      title: t.step1Title,
      description: t.step1Desc,
      icon: BiSolidBadgeCheck,
    },
    {
      step: 2,
      title: t.step2Title,
      description: "",
      icon: LuScanLine,
      subItems: [t.step2Item1, t.step2Item2, t.step2Item3],
    },
    {
      step: 3,
      title: t.step3Title,
      description: "",
      icon: LuFootprints,
      subItems: [t.step3Item1, t.step3Item2],
    },
    {
      step: 4,
      title: t.step4Title,
      description: "",
      icon: IoBodyOutline,
      subItems: [t.step4Item1, t.step4Item2],
    },
  ];

  const prohibitedItems = [
    { item: t.itemFirearms, carryOn: false, checked: true, note: t.seeNote },
    { item: t.itemStunDevices, carryOn: false, checked: true, note: t.seeNote },
    { item: t.itemSharpTools, carryOn: false, checked: true },
    { item: t.itemExplosives, carryOn: false, checked: false },
    { item: t.itemLiquidsOver100, carryOn: false, checked: true },
    { item: t.itemTools, carryOn: false, checked: true },
  ];

  const airportProhibitions = [
    { title: t.prohibitRestrictedArea, description: t.prohibitRestrictedAreaDesc },
    { title: t.prohibitDrugsWeapons, description: t.prohibitDrugsWeaponsDesc },
    { title: t.prohibitDisturbance, description: t.prohibitDisturbanceDesc },
    { title: t.prohibitParking, description: t.prohibitParkingDesc },
    { title: t.prohibitOther, description: t.prohibitOtherDesc },
  ];

  return (
    <div>
      {/* Section 1: Intro */}
      <section className="bg-[#f0fbfc] py-10 lg:py-12">
        <div className="container">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Airport Security
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            {t.title}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
            {t.intro}
          </p>

          {/* Key objectives */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            <div className="flex items-start gap-4">
              <LuShield className="mt-1 h-5 w-5 shrink-0 text-[#00AAAC]" />
              <div>
                <h3 className="font-bold text-gray-900">{t.objectiveTitle}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {t.objectiveDesc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MdOutlineSecurity className="mt-1 h-5 w-5 shrink-0 text-[#00AAAC]" />
              <div>
                <h3 className="font-bold text-gray-900">
                  {t.aircraftSafetyTitle}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {t.aircraftSafetyDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Preparation */}
      <section className="bg-white py-10 lg:py-12">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Preparation
          </p>
          <h3 className="mb-8 text-2xl font-bold text-gray-900">
            {t.preparationTitle}
          </h3>

          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {preparationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 ${item.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <ul className="mt-2 space-y-1.5">
                      {item.items.map((text, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Screening Steps */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Process
          </p>
          <h3 className="mb-8 text-2xl font-bold text-gray-900">
            {t.screeningStepsTitle}
          </h3>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute top-0 left-5 hidden h-full w-0.5 bg-gray-200 lg:left-6 lg:block" />
            <div className="space-y-6 lg:space-y-8">
              {screeningSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 lg:gap-6">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00AAAC] text-lg font-bold text-white lg:h-12 lg:w-12">
                      {step.step}
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="mb-1 flex items-center gap-2">
                        <Icon className="h-5 w-5 text-[#00AAAC]" />
                        <h4 className="text-lg font-bold text-gray-900">
                          {step.title}
                        </h4>
                      </div>
                      {step.description && (
                        <p className="text-gray-600">{step.description}</p>
                      )}
                      {step.subItems && (
                        <ul className="mt-2 space-y-1.5">
                          {step.subItems.map((subItem, subIdx) => (
                            <li
                              key={subIdx}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <MdOutlineCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00AAAC]" />
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Refusal notice */}
          <div className="mt-8 flex gap-3 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
            <PiProhibitFill className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="font-semibold text-gray-800">{t.step5Title}</p>
              <p className="mt-1 text-sm text-gray-600">{t.step5Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Prohibited Items Table */}
      <section className="bg-white py-10 lg:py-12">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Restrictions
          </p>
          <h3 className="mb-8 text-2xl font-bold text-gray-900">
            {t.prohibitedTableTitle}
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">
                    {t.itemType}
                  </th>
                  <th className="pb-3 text-center text-sm font-semibold text-gray-900">
                    {t.carryOn}
                  </th>
                  <th className="pb-3 text-center text-sm font-semibold text-gray-900">
                    {t.checked}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prohibitedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="py-4 pr-4 text-sm text-gray-700">
                      {item.item}
                      {item.note && (
                        <span className="ml-2 text-xs text-amber-600">
                          ({item.note})
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {item.carryOn ? (
                        <MdOutlineCheckCircle className="mx-auto h-6 w-6 text-emerald-500" />
                      ) : (
                        <MdOutlineCancel className="mx-auto h-6 w-6 text-red-500" />
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {item.checked ? (
                        <MdOutlineCheckCircle className="mx-auto h-6 w-6 text-emerald-500" />
                      ) : (
                        <MdOutlineCancel className="mx-auto h-6 w-6 text-red-500" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Important note */}
          <div className="mt-6 flex gap-3 border-l-4 border-amber-500 bg-amber-50 px-4 py-3 rounded-r-lg">
            <MdOutlineInfo className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-sm text-gray-600">
              <strong className="text-gray-800">{t.importantNote}</strong>{" "}
              {t.importantNoteDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Airport Prohibitions */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="container">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
            Prohibitions
          </p>
          <h3 className="mb-8 text-2xl font-bold text-gray-900">
            {t.airportProhibitionsTitle}
          </h3>

          <div className="space-y-5">
            {airportProhibitions.map((item, index) => (
              <div key={index} className="flex gap-4">
                <MdOutlineCancel className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Violation notice */}
          <div className="mt-8 flex gap-3 border-l-4 border-red-500 bg-red-50 px-4 py-3 rounded-r-lg">
            <MdOutlineWarning className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <div>
              <h4 className="font-bold text-gray-800">{t.violationTitle}</h4>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                {t.violationDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Additional Information */}
      <section className="bg-white py-10 lg:py-12">
        <div className="container">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {t.additionalInfoTitle}
          </h3>
          <a
            href={`/${lang}/about/faqs`}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#00AAAC] transition-colors hover:text-[#008e90]"
          >
            {t.faqsLink}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
