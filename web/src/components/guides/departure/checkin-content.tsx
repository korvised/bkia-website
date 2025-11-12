import { AlertCircle, Clock, Luggage, TicketCheck, Users } from "lucide-react";
import { Lang } from "@/types/language";

type T = (k: keyof (typeof dict)["en"]) => string;

const dict = {
  en: {
    title: "Check-in",
    heading: "Check-in Procedures",
    lead1:
      "Upon arrival at Bokeo International Airport’s departure terminal, proceed to your airline’s check-in counter.",
    lead2:
      "Present your ticket (electronic or paper) and valid identification (passport for international flights, Lao ID card for domestic flights).",
    arriveTimesTitle: "Important Arrival Times",
    arriveDomestic: "Domestic flights: Arrive 2 hours before departure",
    arriveIntl: "International flights: Arrive 2.5 hours before departure",
    countersTitle: "Counter Opening & Closing Times",
    domestic: "Domestic Flights",
    international: "International Flights",
    open: "Opens",
    close: "Closes",
    openDomesticVal: "2 hours before departure",
    closeDomesticVal: "30 minutes before departure",
    openIntlVal: "2.5 hours before departure",
    closeIntlVal: "40 minutes before departure",
    baggageTitle: "Baggage Information",
    baggageStd: "Standard Allowance",
    checked: "Checked",
    cabin: "Cabin",
    dims: "Dimensions",
    baggageNote:
      "Note: Excess baggage fees may apply. Contact your airline for specific rules and rates.",
    specialTitle: "Special Items & Valuables",
    specialLead:
      "Valuable items should be carried in cabin baggage whenever possible:",
    special1: "Electronics (laptops, cameras, phones)",
    special2: "Jewelry, cash, and important documents",
    special3: "Medications and medical devices",
    special4: "Fragile items (declare at check-in if they must be checked)",
    liability:
      "Bokeo International Airport and airlines are not responsible for damage to improperly packed items or valuables in checked baggage.",
    tip: "💡 Quick Tip: After check-in, proceed directly to security screening. Keep your boarding pass and passport easily accessible.",
    checkedVal: "20–30 kg (depending on class & airline policy)",
    cabinVal: "7 kg + 1 personal item",
    dimsVal: "Max 158 cm (L + W + H)",
  },
  lo: {
    title: "ກວດສອບຂຶ້ນເຮືອບິນ",
    heading: "ຂັ້ນຕອນການ Check-in",
    lead1:
      "ເມື່ອມາຮອດອາຄານຜູ້ໂດຍສານ ກະລຸນາໄປທີ່ເຄາະຕໍ່ Check-in ຂອງສາຍການບິນຂອງທ່ານ.",
    lead2:
      "ໃຫ້ສະແດງປີ້ (ໄຟລ໌ ຫຼື ກະດາດ) ແລະ ເອກະສານປະຈໍາຕົວ (ພາສປອດສໍາລັບຕ່າງປະເທດ, ບັດປະຊາຊົນສໍາລັບໃນປະເທດ).",
    arriveTimesTitle: "ເວລາມາຮອດທີ່ແນະນໍາ",
    arriveDomestic: "ບິນໃນປະເທດ: ມາຮອດ 2 ຊົ່ວໂມງ ກ່ອນເວລາອອກ",
    arriveIntl: "ບິນຕ່າງປະເທດ: ມາຮອດ 2.5 ຊົ່ວໂມງ ກ່ອນເວລາອອກ",
    countersTitle: "ເວລາເປີດ/ປິດເຄາະຕໍ່",
    domestic: "ບິນໃນປະເທດ",
    international: "ບິນຕ່າງປະເທດ",
    open: "ເປີດ",
    close: "ປິດ",
    openDomesticVal: "2 ຊົ່ວໂມງ ກ່ອນອອກ",
    closeDomesticVal: "30 ນາທີ ກ່ອນອອກ",
    openIntlVal: "2.5 ຊົ່ວໂມງ ກ່ອນອອກ",
    closeIntlVal: "40 ນາທີ ກ່ອນອ ଭິນ",
    baggageTitle: "ຂໍ້ມູນສັມພະລະ",
    baggageStd: "ສິດທິການນໍາຂຶ້ນມາດຕະຖານ",
    checked: "ສັມພະລະຝາກ",
    cabin: "ສັມພະລະຖືຂຶ້ນ",
    dims: "ຂະໜາດ",
    baggageNote:
      "ໝາຍເຫດ: ອາດມີຄ່າທໍານຽມເກີນນ້ໍາໜັກ. ກະລຸນາຕິດຕໍ່ສາຍການບິນຂອງທ່ານ.",
    specialTitle: "ສິ່ງຂອງພິເສດ & ຂອງມີຄ່າ",
    specialLead: "ຂອງມີຄ່າຄວນພາຂຶ້ນເຮືອບິນໃນກະເປົາຖືຂຶ້ນ:",
    special1: "ອຸປະກອນໄຟຟ້າ (ແລັບທັອບ, ກ້ອງ, ໂທລະສັບ)",
    special2: "ເຄື່ອງປະດັບ, ເງິນສົດ, ເອກະສານສໍາຄັນ",
    special3: "ຢາ ແລະ ອຸປະກອນການແພດ",
    special4: "ຂອງແຕກຫັກ (ແຈ້ງທີ່ເຄາະຕໍ່ ຖ້າຈໍາເປັນຝາກ)",
    liability:
      "ສະໜາມບິນ BKIA ແລະ ສາຍການບິນບໍ່ຮັບຜິດຊອບຄວາມເສຍຫາຍຂອງຂອງມີຄ່າໃນກະເປົາຝາກ.",
    tip: "💡 ແນະນໍາ: ຫຼັງຈາກ Check-in ແລ້ວ ໃຫ້ໄປທີ່ດ່ານກວດຄວາມປອດໄພທັນທີ.",
    checkedVal: "20–30 ກິໂລ (ແລ້ວແຕ່ຊັ້ນທີ່ນັ່ງ/ນະໂຍບາຍ)",
    cabinVal: "7 ກິໂລ + ຂອງສ່ວນຕົວ 1 ຊິ້ນ",
    dimsVal: "ລວມ 158 ຊມ (ຍ + ກ + ສ)",
  },
  zh: {
    title: "办理登机",
    heading: "登机办理流程",
    lead1: "到达波乔国际机场出发大厅后，请前往所属航空公司的值机柜台。",
    lead2:
      "出示机票（电子或纸质）及有效证件（国际航班护照，国内航班老挝身份证）。",
    arriveTimesTitle: "建议到达时间",
    arriveDomestic: "国内航班：请在起飞前 2 小时到达",
    arriveIntl: "国际航班：请在起飞前 2.5 小时到达",
    countersTitle: "柜台开放 / 截止时间",
    domestic: "国内航班",
    international: "国际航班",
    open: "开放",
    close: "截止",
    openDomesticVal: "起飞前 2 小时",
    closeDomesticVal: "起飞前 30 分钟",
    openIntlVal: "起飞前 2.5 小时",
    closeIntlVal: "起飞前 40 分钟",
    baggageTitle: "行李信息",
    baggageStd: "标准额度",
    checked: "托运行李",
    cabin: "随身行李",
    dims: "尺寸",
    baggageNote: "提示：可能产生超重费用。请咨询航空公司以获取具体规定与费用。",
    specialTitle: "贵重物品与特殊物品",
    specialLead: "尽量将贵重物品放在随身行李中：",
    special1: "电子产品（笔记本、相机、手机）",
    special2: "珠宝、现金及重要文件",
    special3: "药品与医疗器材",
    special4: "易碎物品（若需托运，请在值机时申报）",
    liability:
      "BKIA 与航空公司不对托运行李中包装不当的贵重/易碎物品损坏承担责任。",
    tip: "💡 小贴士：办理完值机后，请尽快前往安检，并将登机牌与护照随手可取。",
    checkedVal: "20–30 公斤（依舱位与航空公司政策）",
    cabinVal: "7 公斤 + 1 件个人物品",
    dimsVal: "合计 158 厘米（长+宽+高）",
  },
} as const;

function createT(lang: Lang): T {
  const l = (["en", "lo", "zh"] as const).includes(lang as never) ? lang : "en";
  return (k) => dict[l][k];
}

export function CheckinContent({ lang = "en" as Lang }) {
  const t = createT(lang);

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="hidden flex-shrink-0 sm:block">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <TicketCheck className="text-primary-500 h-12 w-12" />
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-2 flex items-center gap-x-2 sm:mb-4">
            <div className="bg-primary-50 rounded-lg p-2 sm:hidden">
              <Users className="text-primary-500 h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
              {t("heading")}
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <p className="mb-2 text-gray-700">{t("lead1")}</p>
              <p className="mb-4 text-gray-700">{t("lead2")}</p>

              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-yellow-800">
                      <strong>{t("arriveTimesTitle")}:</strong>
                    </p>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      <li>
                        • <strong>{t("arriveDomestic")}</strong>
                      </li>
                      <li>
                        • <strong>{t("arriveIntl")}</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="text-primary-500 h-5 w-5" />
                  <h3 className="font-semibold text-gray-900">
                    {t("countersTitle")}
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-semibold">{t("domestic")}</p>
                  <ul className="ml-2 list-inside list-disc space-y-1">
                    <li>
                      {t("open")}: {t("openDomesticVal")}
                    </li>
                    <li>
                      {t("close")}: {t("closeDomesticVal")}
                    </li>
                  </ul>
                  <p className="mt-3 font-semibold">{t("international")}</p>
                  <ul className="ml-2 list-inside list-disc space-y-1">
                    <li>
                      {t("open")}: {t("openIntlVal")}
                    </li>
                    <li>
                      {t("close")}: {t("closeIntlVal")}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Luggage className="text-primary-500 h-5 w-5" />
                  <h3 className="font-semibold text-gray-900">
                    {t("baggageTitle")}
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-semibold">{t("baggageStd")}:</p>
                  <ul className="ml-2 list-inside list-disc space-y-1">
                    <li>
                      {t("checked")}: {t("checkedVal")}
                    </li>
                    <li>
                      {t("cabin")}: {t("cabinVal")}
                    </li>
                    <li>
                      {t("dims")}: {t("dimsVal")}
                    </li>
                  </ul>
                  <p className="mt-3 text-xs">{t("baggageNote")}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {t("specialTitle")}
              </h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="mb-3 text-gray-700">{t("specialLead")}</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>{t("special1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>{t("special2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>{t("special3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>{t("special4")}</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-gray-600">{t("liability")}</p>
              </div>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>{t("tip")}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
