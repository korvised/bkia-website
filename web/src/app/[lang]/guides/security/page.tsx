import { Lang } from "@/types/language";
import {
  AlertCircle,
  Battery,
  Droplets,
  FileText,
  Flame,
  Laptop,
  Package,
  ScanLine,
  Scissors,
  ShieldAlert,
  ShieldCheck,
  Wine,
} from "lucide-react";
import Link from "next/link";

interface AirportSecurityPageProps {
  params: Promise<{ lang: Lang }>;
}

// Translations
const translations = {
  title: {
    en: "Airport Security",
    lo: "ຄວາມປອດໄພສະໜາມບິນ",
    zh: "机场安检",
  },
  intro: {
    en: "We want to ensure a safe flying experience for all travelers and have implemented strict security regulations that are in line with the International Civil Aviation Organization (ICAO). Please read our tips below so that you will have more time to enjoy at Bokeo International Airport before boarding your flight.",
    lo: "ພວກເຮົາຕ້ອງການຮັບປະກັນປະສົບການການບິນທີ່ປອດໄພສໍາລັບນັກທ່ອງທ່ຽວທຸກຄົນ ແລະ ໄດ້ປະຕິບັດກົດລະບຽບຄວາມປອດໄພທີ່ເຂັ້ມງວດທີ່ສອດຄ່ອງກັບອົງການການບິນພົນລະເຮືອນສາກົນ (ICAO). ກະລຸນາອ່ານຄໍາແນະນໍາຂອງພວກເຮົາຂ້າງລຸ່ມນີ້ເພື່ອໃຫ້ທ່ານມີເວລາຫຼາຍຂຶ້ນໃນການເພີດເພີນທີ່ສະໜາມບິນນາໆຊາດບໍເກີ້ວກ່ອນທີ່ຈະຂຶ້ນຖ້ຽວບິນຂອງທ່ານ.",
    zh: "我们致力于为所有旅客确保安全的飞行体验，并实施了符合国际民用航空组织（ICAO）的严格安全规定。请阅读以下提示，以便您在登机前有更多时间享受博乔国际机场。",
  },

  // Preparation Section
  preparationTitle: {
    en: "Preparation at Check-in Counter",
    lo: "ການກຽມຕົວທີ່ເຄົາເຕີລົງທະບຽນ",
    zh: "值机柜台准备事项",
  },

  prohibitedItems: {
    title: {
      en: "Prohibited Items in Carry-on",
      lo: "ສິ່ງຂອງທີ່ຫ້າມນໍາຂຶ້ນເຄື່ອງ",
      zh: "禁止携带物品",
    },
    description: {
      en: "Do not pack restricted articles in your checked or hand baggage, or carry it on person.",
      lo: "ຫ້າມບັນຈຸສິ່ງຂອງທີ່ຫ້າມໃສ່ກະເປົ າເດີນທາງທີ່ກວດສອບ ຫຼື ກະເປົ າຖື ຫຼື ຖືມັນໃສ່ຕົວທ່ານເອງ.",
      zh: "请勿将违禁物品装入托运或手提行李中，或随身携带。",
    },
  },

  dangerousGoods: {
    title: {
      en: "Dangerous Goods",
      lo: "ສິນຄ້າອັນຕະລາຍ",
      zh: "危险品",
    },
    description: {
      en: "Do not pack any dangerous goods such as flammable liquids, corrosive substances and gas cylinders in either your checked or hand baggage as they pose a risk to the safety of the aircraft.",
      lo: "ຫ້າມບັນຈຸສິນຄ້າອັນຕະລາຍໃດໆເຊັ່ນ: ຂອງແຫຼວໄວໄຟ, ສານ腐蚀, ແລະ ຖັງແກ໊ສ ໃນກະເປົ າເດີນທາງທີ່ກວດສອບ ຫຼື ກະເປົ າຖື ເພາະວ່າພວກມັນເປັນອັນຕະລາຍຕໍ່ຄວາມປອດໄພຂອງເຮືອບິນ.",
      zh: "请勿在托运或手提行李中装入任何危险品，如易燃液体、腐蚀性物质和气瓶，因为它们会对飞机安全构成威胁。",
    },
  },

  lithiumBatteries: {
    title: {
      en: "Lithium Batteries & Power Banks",
      lo: "ແບັດເຕີຣີລິທຽມ ແລະ ທະນາຄານພະລັງງານ",
      zh: "锂电池和充电宝",
    },
    description: {
      en: "Spare Lithium batteries and portable power banks must NOT be placed in checked baggage.",
      lo: "ແບັດເຕີຣີລິທຽມສໍາຮອງ ແລະ ທະນາຄານພະລັງງານພົກພາ ຕ້ອງບໍ່ໄດ້ຖືກວາງໄວ້ໃນກະເປົ າເດີນທາງທີ່ກວດສອບ.",
      zh: "备用锂电池和移动电源不得放入托运行李中。",
    },
  },

  liquidsAerosols: {
    title: {
      en: "Liquids, Aerosols & Gels (LAGs)",
      lo: "ຂອງແຫຼວ, ສະເປຣ ແລະ ເຈນ (LAGs)",
      zh: "液体、气溶胶和凝胶（LAGs）",
    },
    description: {
      en: "All liquids, aerosols and gels (LAGs) in hand baggage should be placed in containers no larger than 100ml and packed in a transparent re-sealable plastic bag with a capacity of 1 litre or less. Only one transparent plastic bag per passenger is permitted. Exemptions may be made for medications, baby milk, food and special dietary requirements, subject to verification. Any LAGs that do not meet the above requirements must be disposed of before security screening.",
      lo: "ຂອງແຫຼວ, ສະເປຣ ແລະ ເຈນ (LAGs) ທັງໝົດໃນກະເປົ າຖືຄວນຖືກວາງໄວ້ໃນພາຊະນະທີ່ມີຂະໜາດບໍ່ເກີນ 100 ມລ ແລະ ບັນຈຸໃນຖົງພລາສຕິກໂປ່ງໃສທີ່ສາມາດປິດໄດ້ຄືນໃໝ່ທີ່ມີຄວາມຈຸ 1 ລິດ ຫຼື ນ້ອຍກວ່າ. ອະນຸຍາດພຽງຖົງພລາສຕິກໂປ່ງໃສໜຶ່ງຖົງຕໍ່ຜູ້ໂດຍສານໜຶ່ງຄົນ. ອາດມີການຍົກເວັ້ນສໍາລັບຢາ, ນົມເດັກ, ອາຫານ ແລະ ຄວາມຕ້ອງການອາຫານພິເສດ, ຂຶ້ນກັບການຢັ້ງຢືນ. LAGs ໃດໆທີ່ບໍ່ປະຕິບັດຕາມຂໍ້ກໍານົດຂ້າງເທິງຕ້ອງຖືກກໍາຈັດກ່ອນການກວດຄວາມປອດໄພ.",
      zh: "手提行李中的所有液体、气溶胶和凝胶（LAGs）应放置在不超过100毫升的容器中，并装入容量不超过1升的透明可重新密封塑料袋中。每位乘客只允许携带一个透明塑料袋。药品、婴儿奶、食品和特殊饮食需求可能会有豁免，但需经过验证。任何不符合上述要求的LAGs必须在安检前丢弃。",
    },
    linkText: {
      en: "Click here",
      lo: "ຄລິກທີ່ນີ້",
      zh: "点击这里",
    },
    linkSuffix: {
      en: "for FAQs.",
      lo: "ສໍາລັບຄໍາຖາມທີ່ພົບເລື້ອຍ.",
      zh: "查看常见问题。",
    },
  },

  // Security Screening Section
  screeningTitle: {
    en: "Security Screening",
    lo: "ການກວດຄວາມປອດໄພ",
    zh: "安全检查",
  },

  screeningItems: [
    {
      icon: "document",
      title: {
        en: "Travel Documents",
        lo: "ເອກະສານການເດີນທາງ",
        zh: "旅行证件",
      },
      description: {
        en: "Have your boarding pass and travel document ready while entering the Departures Immigration Hall. Passengers aged 11+ or above holding electronic travel document can use the e-Gates. Purchase who require staff assistance, please proceed to the assisted passage lanes.",
        lo: "ກຽມບັດຂຶ້ນເຮືອບິນ ແລະ ເອກະສານການເດີນທາງຂອງທ່ານໃຫ້ພ້ອມໃນຂະນະທີ່ເຂົ້າສູ່ຫ້ອງການເດີນທາງອອກນອກປະເທດ. ຜູ້ໂດຍສານອາຍຸ 11 ປີຂຶ້ນໄປທີ່ຖືເອກະສານການເດີນທາງອີເລັກໂທຣນິກສາມາດໃຊ້ປະຕູອີເລັກໂທຣນິກໄດ້. ຜູ້ໂດຍສານທີ່ຕ້ອງການຄວາມຊ່ວຍເຫຼືອຈາກພະນັກງານ, ກະລຸນາໄປທີ່ເສັ້ນທາງຊ່ວຍເຫຼືອ.",
        zh: "进入出境大厅时，请准备好登机牌和旅行证件。11岁及以上持有电子旅行证件的乘客可以使用电子通道。需要工作人员协助的乘客，请前往人工通道。",
      },
    },
    {
      icon: "laptop",
      title: {
        en: "Electronic Devices",
        lo: "ອຸປະກອນອີເລັກໂທຣນິກ",
        zh: "电子设备",
      },
      description: {
        en: "Electronic and metallic items in your hand baggage or on-person should be placed separately, for security check. Starting from 13 August 2018, all transfer passengers at HKIA travelling with LAGs contained in tamper-evident sealed plastic bags are requested to go through an excess security screening by a specialized LAGs screening equipment at the transfer passenger security screening points.",
        lo: "ສິ່ງຂອງອີເລັກໂທຣນິກ ແລະ ໂລຫະໃນກະເປົ າຖື ຫຼື ທີ່ຖືຕິດຕົວຂອງທ່ານຄວນຖືກວາງແຍກຕ່າງຫາກ, ສໍາລັບການກວດຄວາມປອດໄພ. ເລີ່ມແຕ່ວັນທີ 13 ສິງຫາ 2018, ຜູ້ໂດຍສານຖ່າຍໂອນທັງໝົດທີ່ສະໜາມບິນບໍເກີ້ວທີ່ເດີນທາງກັບ LAGs ທີ່ບັນຈຸຢູ່ໃນຖົງພລາສຕິກປິດສະເພາະຖືກຮ້ອງຂໍໃຫ້ຜ່ານການກວດຄວາມປອດໄພພິເສດໂດຍອຸປະກອນກວດ LAGs ພິເສດຢູ່ຈຸດກວດຄວາມປອດໄພຜູ້ໂດຍສານຖ່າຍໂອນ.",
        zh: "手提行李或随身携带的电子和金属物品应分别放置，以便进行安全检查。自2018年8月13日起，所有在博乔机场转机携带装在防篡改密封塑料袋中的LAGs的乘客，需要在转机乘客安全检查点通过专门的LAGs检查设备进行额外的安全检查。",
      },
      note: {
        en: "In some cases, the LAGs in the sealed plastic bags will have to be removed from the bags for screening. When cleared, the LAGs will be repacked in a new tamper-evident sealed plastic bag.",
        lo: "ໃນບາງກໍລະນີ, LAGs ໃນຝາກພລາສຕິກທີ່ປິດຜະນຶກຈະຕ້ອງຖືກເອົາອອກຈາກຖົງສໍາລັບການກວດສອບ. ເມື່ອຜ່ານ, LAGs ຈະຖືກບັນຈຸຄືນໃນຖົງພລາສຕິກປິດສະເພາະໃໝ່.",
        zh: "在某些情况下，密封塑料袋中的LAGs将需要从袋中取出进行检查。检查通过后，LAGs将被重新装入新的防篡改密封塑料袋中。",
      },
    },
    {
      icon: "body-scan",
      title: {
        en: "Body Screening",
        lo: "ການກວດຮ່າງກາຍ",
        zh: "人体安检",
      },
      description: {
        en: "Please walk through the archway metal detector. You may also be subjected to hand search.",
        lo: "ກະລຸນາຍ່າງຜ່ານປະຕູກວດໂລຫະ. ທ່ານອາດຈະຖືກກວດດ້ວຍມືດ້ວຍ.",
        zh: "请通过金属探测门。您也可能需要接受手检。",
      },
    },
  ],

  privacyPolicy: {
    en: "Please read our Privacy Policy for more details.",
    lo: "ກະລຸນາອ່ານນະໂຍບາຍຄວາມເປັນສ່ວນຕົວຂອງພວກເຮົາສໍາລັບລາຍລະອຽດເພີ່ມເຕີມ.",
    zh: "请阅读我们的隐私政策以了解更多详情。",
  },

  privacyPolicyLink: {
    en: "Privacy Policy",
    lo: "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",
    zh: "隐私政策",
  },
};

// Prohibited items data
const prohibitedItemsData = [
  {
    icon: Scissors,
    items: {
      en: ["Sharp objects", "Knives", "Scissors", "Tools"],
      lo: ["ວັດຖຸແຫຼມ", "ມີດ", "ກ້ອນ", "ເຄື່ອງມື"],
      zh: ["尖锐物品", "刀具", "剪刀", "工具"],
    },
  },
  {
    icon: Flame,
    items: {
      en: ["Flammable items", "Lighters", "Matches", "Fuel"],
      lo: ["ສິ່ງຂອງໄວໄຟ", "ໄຟແຊັກ", "ໄມຂີດ", "ນ້ໍາມັນ"],
      zh: ["易燃物品", "打火机", "火柴", "燃料"],
    },
  },
  {
    icon: Wine,
    items: {
      en: ["Liquids over 100ml", "Gels", "Aerosols", "Pastes"],
      lo: ["ຂອງແຫຼວເກີນ 100ml", "ເຈນ", "ສະເປຣ", "ຄຣີມ"],
      zh: ["超过100毫升液体", "凝胶", "气溶胶", "膏状物"],
    },
  },
  {
    icon: Package,
    items: {
      en: ["Explosives", "Fireworks", "Ammunition", "Weapons"],
      lo: ["ວັດຖຸລະເບີດ", "ດອກໄມ້ໄຟ", "ລູກປືນ", "ອາວຸດ"],
      zh: ["爆炸物", "烟花", "弹药", "武器"],
    },
  },
];

export default async function AirportSecurityPage({
  params,
}: AirportSecurityPageProps) {
  const { lang } = await params;

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-3">
            <ShieldCheck className="text-primary-600 h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {translations.title[lang]}
          </h1>
        </div>

        <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
          {translations.intro[lang]}
        </p>
      </div>

      {/* Preparation at Check-in Counter Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary-600 h-1 w-12" />
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {translations.preparationTitle[lang]}
          </h2>
        </div>

        {/* Prohibited Items Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {prohibitedItemsData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 transition-all duration-300 hover:shadow-lg"
              >
                {/* Prohibited Icon Overlay */}
                <div className="absolute top-4 right-4 flex h-24 w-24 items-center justify-center opacity-10 transition-opacity group-hover:opacity-20">
                  <div className="relative">
                    <Icon
                      className="text-danger-600 h-20 w-20"
                      strokeWidth={1.5}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-danger-600 h-0.5 w-28 rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Icon with prohibition sign */}
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
                  <Icon className="h-10 w-10 text-gray-700" strokeWidth={1.5} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-danger-600 h-0.5 w-24 rotate-45" />
                  </div>
                </div>

                {/* Items List */}
                <ul className="relative space-y-2">
                  {item.items[lang].map((itemText, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="bg-danger-600 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                      <span className="font-medium">{itemText}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Detailed Information Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Dangerous Goods Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-start gap-4">
              <div className="bg-danger-100 rounded-lg p-3">
                <AlertCircle className="text-danger-600 h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {translations.dangerousGoods.title[lang]}
                </h3>
              </div>
            </div>
            <p className="leading-relaxed text-gray-600">
              {translations.dangerousGoods.description[lang]}
            </p>
          </div>

          {/* Lithium Batteries Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-start gap-4">
              <div className="bg-primary-100 rounded-lg p-3">
                <Battery className="text-primary-600 h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {translations.lithiumBatteries.title[lang]}
                </h3>
              </div>
            </div>
            <p className="leading-relaxed text-gray-600">
              {translations.lithiumBatteries.description[lang]}
            </p>
          </div>
        </div>

        {/* LAGs Information - Full Width */}
        <div className="border-primary-200 bg-primary-50 rounded-xl border p-6 shadow-sm">
          <div className="mb-4 flex items-start gap-4">
            <div className="bg-primary-100 rounded-lg p-3">
              <Droplets className="text-primary-600 h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {translations.liquidsAerosols.title[lang]}
              </h3>
              <p className="mb-4 leading-relaxed text-gray-700">
                {translations.liquidsAerosols.description[lang]}
              </p>
              <Link
                href={`/${lang}/support/faq`}
                className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 text-sm font-medium transition-colors"
              >
                {translations.liquidsAerosols.linkText[lang]}
                <span className="text-gray-700">
                  {translations.liquidsAerosols.linkSuffix[lang]}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security Screening Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="bg-secondary-600 h-1 w-12" />
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {translations.screeningTitle[lang]}
          </h2>
        </div>

        {/* Screening Process Cards */}
        <div className="grid gap-6">
          {translations.screeningItems.map((item, index) => {
            // Select appropriate icon
            let IconComponent;
            switch (item.icon) {
              case "document":
                IconComponent = FileText;
                break;
              case "laptop":
                IconComponent = Laptop;
                break;
              case "body-scan":
                IconComponent = ScanLine;
                break;
              case "us-flag":
                IconComponent = ShieldAlert;
                break;
              default:
                IconComponent = ShieldCheck;
            }

            return (
              <div
                key={index}
                className="group hover:border-secondary-300 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  {/* Icon Section */}
                  <div className="flex-shrink-0">
                    <div className="bg-secondary-100 group-hover:bg-secondary-200 rounded-xl p-4 transition-colors">
                      <IconComponent
                        className="text-secondary-600 h-8 w-8"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title[lang]}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {item.description[lang]}
                    </p>

                    {item.note && (
                      <div className="rounded-lg bg-gray-50 p-4">
                        <p className="text-sm leading-relaxed text-gray-600 italic">
                          {item.note[lang]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
