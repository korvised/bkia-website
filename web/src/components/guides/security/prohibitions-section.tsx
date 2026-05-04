"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MdOutlineWarning } from "react-icons/md";
import { Lang } from "@/types/language";
import { createDepartureGuideI18n } from "@/data/i18n/guides";
import { cn } from "@/lib";

interface ProhibitionsSectionProps {
  lang: Lang;
}

type LangKey = "en" | "lo" | "zh";
const overnightFines: { name: Record<LangKey, string>; amount: string }[] = [
  { name: { en: "Bicycle", lo: "ລົດຖີບ", zh: "自行车" }, amount: "100,000" },
  { name: { en: "Motorcycle", lo: "ລົດຈັກ / ໂມເຕີຊາຍ", zh: "摩托车" }, amount: "200,000" },
  { name: { en: "Small car (≤ 5 seats)", lo: "ລົດນ້ອຍ (≤ 5 ທີ່ນັ່ງ)", zh: "小型车（≤5座）" }, amount: "300,000" },
  { name: { en: "Large car / Minibus", lo: "ລົດໃຫ່ຍ / ລົດຕູ້", zh: "大型车 / 面包车" }, amount: "500,000" },
  { name: { en: "Truck / Bus", lo: "ລົດບັນທຸກ / ລົດໂດຍສານ", zh: "卡车 / 大巴" }, amount: "600,000" },
  { name: { en: "10+ wheel vehicles", lo: "ລົດ 10 ລໍ້ ຂຶ້ນໄປ", zh: "10轮以上车辆" }, amount: "800,000" },
];

export function ProhibitionsSection({ lang }: ProhibitionsSectionProps) {
  const { airportSecurity: t } = createDepartureGuideI18n(lang);
  const [finesOpen, setFinesOpen] = useState(false);

  const prohibitions = [
    { desc: t.prohibitRestrictedAreaDesc },
    { desc: t.prohibitDrugsWeaponsDesc },
    { desc: t.prohibitDisturbanceDesc },
    { desc: t.prohibitParkingDesc },
    { desc: t.prohibitOtherDesc },
    { desc: t.prohibitOvernightParkingDesc, hasFines: true },
    { desc: t.prohibitConstructionDesc },
    { desc: t.prohibitBurningDesc },
    { desc: t.prohibitUnauthorizedTransportDesc },
    { desc: t.prohibitIllegalCashDesc },
    { desc: t.prohibitExcessPhonesDesc },
    { desc: t.prohibitExcessElectronicsDesc },
  ];

  return (
    <section className="bg-gray-50 py-10 lg:py-12">
      <div className="container">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
          Prohibitions
        </p>
        <h3 className="mb-8 text-2xl font-bold text-gray-900">
          {t.airportProhibitionsTitle}
        </h3>

        {/* Two-column grid */}
        <div className="grid gap-3 sm:grid-cols-2">
          {prohibitions.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-xl bg-white px-5 py-4 ring-1 ring-black/5"
            >
              {/* Decorative number */}
              <span className="mt-0.5 shrink-0 select-none text-2xl font-black leading-none tabular-nums text-red-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-gray-700">
                  {item.desc}
                </p>

                {/* Fines toggle — overnight parking only */}
                {item.hasFines && (
                  <div className="mt-2.5">
                    <button
                      type="button"
                      onClick={() => setFinesOpen((o) => !o)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#00AAAC] transition-colors hover:text-[#008e90]"
                    >
                      <span>{t.prohibitFinesToggle}</span>
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          finesOpen && "rotate-180",
                        )}
                      />
                    </button>

                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{ gridTemplateRows: finesOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-3">
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                            {t.prohibitFinesTitle}
                          </p>
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b border-gray-100">
                                <th className="pb-1.5 text-left font-medium text-gray-400">
                                  {t.prohibitFinesVehicleCol}
                                </th>
                                <th className="pb-1.5 text-right font-medium text-gray-400">
                                  {t.prohibitFinesAmountCol} (LAK)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {overnightFines.map((row, i) => (
                                <tr
                                  key={i}
                                  className="border-b border-gray-100 last:border-0"
                                >
                                  <td className="py-1.5 text-gray-600">
                                    {row.name[lang as LangKey] ?? row.name.en}
                                  </td>
                                  <td className="py-1.5 text-right font-semibold tabular-nums text-gray-800">
                                    {row.amount}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Violation / penalty notice */}
        <div className="mt-6 flex gap-3 rounded-r-lg border-l-4 border-red-500 bg-red-50 px-4 py-3">
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
  );
}
