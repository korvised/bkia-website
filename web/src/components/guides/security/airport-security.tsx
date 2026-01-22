"use client";

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
import { createDepartureGuideI18n } from "@/data/i18n/guide";

interface AirportSecurityProps {
  lang: Lang;
}

export function AirportSecurity({ lang }: AirportSecurityProps) {
  const { airportSecurity: t } = createDepartureGuideI18n(lang);

  // Preparation items data
  const preparationItems = [
    {
      icon: PiDropHalfBottomFill,
      title: t.liquidsTitle,
      color: "text-blue-600",
      items: [
        t.liquids100ml,
        t.liquidsZiplock,
        t.liquids1liter,
        t.liquidsChecked,
      ],
    },
    {
      icon: PiKnifeFill,
      title: t.sharpObjectsTitle,
      color: "text-red-600",
      items: [t.sharpObjectsDesc],
    },
    {
      icon: GiPistolGun,
      title: t.firearmsTitle,
      color: "text-gray-700",
      items: [t.firearmsDesc],
    },
    {
      icon: PiWarningCircleFill,
      title: t.dangerousTitle,
      color: "text-orange-600",
      items: [t.dangerousDesc],
    },
    {
      icon: PiDeviceMobileFill,
      title: t.electronicsTitle,
      color: "text-purple-600",
      items: [t.electronicsDesc],
    },
    {
      icon: PiCigaretteFill,
      title: t.tobaccoTitle,
      color: "text-amber-600",
      items: [t.tobaccoCheckpoint, t.tobaccoChecked],
    },
  ];

  // Screening steps data
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

  // Prohibited items table data
  const prohibitedItems = [
    { item: t.itemFirearms, carryOn: false, checked: true, note: t.seeNote },
    { item: t.itemStunDevices, carryOn: false, checked: true, note: t.seeNote },
    { item: t.itemSharpTools, carryOn: false, checked: true },
    { item: t.itemExplosives, carryOn: false, checked: false },
    { item: t.itemLiquidsOver100, carryOn: false, checked: true },
    { item: t.itemTools, carryOn: false, checked: true },
  ];

  // Airport prohibitions data
  const airportProhibitions = [
    {
      title: t.prohibitRestrictedArea,
      description: t.prohibitRestrictedAreaDesc,
    },
    { title: t.prohibitDrugsWeapons, description: t.prohibitDrugsWeaponsDesc },
    { title: t.prohibitDisturbance, description: t.prohibitDisturbanceDesc },
    { title: t.prohibitParking, description: t.prohibitParkingDesc },
    { title: t.prohibitOther, description: t.prohibitOtherDesc },
  ];

  return (
    <div>
      {/* Section 1: Hero / Intro - White background */}
      <section className="bg-white pb-10 lg:pb-12">
        <div className="container">
          <div>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
              {t.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">{t.intro}</p>
          </div>

          {/* Key objectives */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                <LuShield className="text-primary-600 h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{t.objectiveTitle}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {t.objectiveDesc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-secondary-100 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                <MdOutlineSecurity className="text-secondary-600 h-6 w-6" />
              </div>
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

      {/* Section 2: Preparation - Gray background */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="container">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-primary-500 flex h-10 w-10 items-center justify-center rounded-full">
              <MdOutlineInfo className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {t.preparationTitle}
            </h3>
          </div>

          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {preparationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ${item.color}`}
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
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-gray-400" />
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

      {/* Section 3: Screening Steps - White background */}
      <section className="bg-white py-10 lg:py-12">
        <div className="container">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500">
              <LuScanLine className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {t.screeningStepsTitle}
            </h3>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute top-0 left-5 hidden h-full w-0.5 bg-gray-200 lg:left-6 lg:block" />

            <div className="space-y-6 lg:space-y-8">
              {screeningSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative flex gap-4 lg:gap-6">
                    {/* Step number */}
                    <div className="bg-primary-500 relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold text-white lg:h-12 lg:w-12">
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="mb-1 flex items-center gap-2">
                        <Icon className="text-primary-600 h-5 w-5" />
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
                              <MdOutlineCheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
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

          {/* Refusal of Screening Notice */}
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <PiProhibitFill className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
            <div>
              <p className="font-semibold text-amber-900">{t.step5Title}</p>
              <p className="mt-1 text-sm text-amber-800">{t.step5Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Prohibited Items Table - Gray background */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="container">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
              <MdOutlineWarning className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {t.prohibitedTableTitle}
            </h3>
          </div>

          <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-900">
                    {t.itemType}
                  </th>
                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-900">
                    {t.carryOn}
                  </th>
                  <th className="px-5 py-4 text-center text-sm font-semibold text-gray-900">
                    {t.checked}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {prohibitedItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {item.item}
                      {item.note && (
                        <span className="ml-2 text-xs text-amber-600">
                          ({item.note})
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {item.carryOn ? (
                        <MdOutlineCheckCircle className="mx-auto h-6 w-6 text-green-500" />
                      ) : (
                        <MdOutlineCancel className="mx-auto h-6 w-6 text-red-500" />
                      )}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {item.checked ? (
                        <MdOutlineCheckCircle className="mx-auto h-6 w-6 text-green-500" />
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
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <MdOutlineInfo className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
            <p className="text-sm text-amber-800">
              <strong>{t.importantNote}</strong> {t.importantNoteDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Airport Prohibitions - White background */}
      <section className="bg-white py-10 lg:py-12">
        <div className="container">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
              <PiProhibitFill className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {t.airportProhibitionsTitle}
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {airportProhibitions.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <MdOutlineCancel className="h-5 w-5 text-red-500" />
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Measures Against Violators Notice */}
          <div className="mt-8 flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
              <MdOutlineWarning className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-bold text-red-900">{t.violationTitle}</h4>
              <p className="mt-1 text-sm leading-relaxed text-red-800">
                {t.violationDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Additional Information */}
      <section className="bg-gray-50 py-10 lg:py-12">
        <div className="container">
          <h3 className="mb-6 text-xl font-semibold text-gray-900">
            {t.additionalInfoTitle}
          </h3>

          <div className="space-y-3">
            <a
              href={`/${lang}/support/faqs`}
              className="group hover:text-primary-600 flex items-center gap-2 text-gray-700 transition-colors"
            >
              <span>{t.faqsLink}</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
