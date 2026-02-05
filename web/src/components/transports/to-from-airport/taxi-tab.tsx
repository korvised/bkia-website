import Image from "next/image";
import {
  AlertCircle,
  CarTaxiFront,
  DollarSign,
  MapPin,
  Phone,
} from "lucide-react";
import { Lang } from "@/types/language";
import { useApp } from "@/context/app-context";

interface TaxiTabProps {
  lang: Lang;
}

// Translations
const translations = {
  title: {
    en: "Taxi",
    lo: "ແທັກຊີ",
    zh: "出租车",
  },
  subtitle: {
    en: "Bokeo International Airport - Tonphueng, Bokeo, Lao PDR",
    lo: "ສະໜາມບິນນາໆຊາດບໍເກີ້ວ - ຕົ້ນເຜີ້ງ, ບໍ່ແກ້ວ, ສປປ ລາວ",
    zh: "博乔国际机场 - Tonphueng, 博乔, 老挝",
  },
  pickupTitle: {
    en: "Taxi Pick-up Areas",
    lo: "ບໍລິເວນຮັບຜູ້ໂດຍສານແທັກຊີ",
    zh: "出租车接客区",
  },
  pickupDescription: {
    en: "Taxi services are available at Bokeo International Airport with designated pick-up areas for passenger convenience and safety.",
    lo: "ບໍລິການແທັກຊີມີຢູ່ທີ່ສະໜາມບິນນາໆຊາດບໍເກີ້ວພ້ອມດ້ວຍພື້ນທີ່ຮັບຜູ້ໂດຍສານທີ່ກໍານົດໄວ້ເພື່ອຄວາມສະດວກສະບາຍແລະຄວາມປອດໄພຂອງຜູ້ໂດຍສານ.",
    zh: "博乔国际机场提供出租车服务，设有指定的乘客接载区，为乘客提供便利和安全保障。",
  },
  mainPickupArea: {
    en: "Main Pick-up Area:",
    lo: "ພື້ນທີ່ຮັບຜູ້ໂດຍສານຫຼັກ:",
    zh: "主要接客区：",
  },
  mainPickupLocation: {
    en: "Located outside the Arrivals Hall at Ground Transportation Center",
    lo: "ຕັ້ງຢູ່ນອກຫ້ອງໂຖງຂາເຂົ້າທີ່ສູນຂົນສົ່ງພື້ນດິນ",
    zh: "位于到达大厅外的地面交通中心",
  },
  operatingHours: {
    en: "Operating Hours:",
    lo: "ເວລາດໍາເນີນງານ:",
    zh: "营业时间：",
  },
  operatingHoursValue: {
    en: "24/7 service available",
    lo: "ບໍລິການ 24/7",
    zh: "24/7 全天候服务",
  },
  importantNotice: {
    en: "IMPORTANT NOTICE",
    lo: "ແຈ້ງການສໍາຄັນ",
    zh: "重要通知",
  },
  noticeItems: [
    {
      en: "Please queue in the designated waiting area. Follow staff guidance to the boarding location.",
      lo: "ກະລຸນາຈັດຄິວໃນພື້ນທີ່ລໍຖ້າທີ່ກໍານົດ. ປະຕິບັດຕາມຄໍາແນະນໍາຂອງພະນັກງານໄປຫາສະຖານທີ່ຂຶ້ນລົດ.",
      zh: "请在指定等候区排队。遵循工作人员的指引前往上车地点。",
    },
    {
      en: "If you encounter issues such as refusal of service, passenger selection, or overcharging, please report to staff immediately and cooperate to collect evidence.",
      lo: "ຖ້າທ່ານປະເຊີນກັບບັນຫາເຊັ່ນ: ການປະຕິເສດບໍລິການ, ການເລືອກຜູ້ໂດຍສານ, ຫຼື ການຄິດເງິນຫຼາຍເກີນໄປ, ກະລຸນາລາຍງານໃຫ້ພະນັກງານທັນທີແລະຮ່ວມມືເກັບຫຼັກຖານ.",
      zh: "如遇到拒载、挑客或乱收费等问题，请立即向工作人员报告并配合收集证据。",
    },
    {
      en: "For short-distance trips (within 15 km), please inform the driver of your destination clearly.",
      lo: "ສໍາລັບການເດີນທາງໃກ້ (ພາຍໃນ 15 ກິໂລແມັດ), ກະລຸນາແຈ້ງຄົນຂັບລົດກ່ຽວກັບຈຸດໝາຍປາຍທາງຂອງທ່ານຢ່າງຊັດເຈນ.",
      zh: "短途行程（15公里以内），请清楚告知司机您的目的地。",
    },
    {
      en: "For long-distance trips outside Bokeo Province, negotiate the fare with the driver before departure.",
      lo: "ສໍາລັບການເດີນທາງໄກນອກແຂວງບໍ່ແກ້ວ, ເຈລະຈາຄ່າໂດຍສານກັບຄົນຂັບກ່ອນອອກເດີນທາງ.",
      zh: "博乔省外的长途行程，请在出发前与司机协商车资。",
    },
  ],
  complaintHotline: {
    en: "Complaint Hotline:",
    lo: "ສາຍດ່ວນຮ້ອງທຸກ:",
    zh: "投诉热线：",
  },
  popularDestinations: {
    en: "Popular Destinations & Estimated Fares",
    lo: "ຈຸດໝາຍປາຍທາງຍອດນິຍົມ ແລະ ອັດຕາຄ່າບໍລິການປະມານ",
    zh: "热门目的地及预估车资",
  },
  fareNote: {
    en: "Fares are estimates and may vary based on traffic conditions, time of day, and exact destination. Always ensure the meter is running or agree on fare before departure.",
    lo: "ຄ່າບໍລິການເປັນການປະມານການແລະອາດຈະແຕກຕ່າງກັນໂດຍອີງໃສ່ສະພາບການຈະລາຈອນ, ເວລາຂອງມື້, ແລະຈຸດໝາຍປາຍທາງທີ່ແນ່ນອນ. ຮັບປະກັນວ່າເຄື່ອງວັດກໍາລັງເຮັດວຽກຫຼືຕົກລົງກ່ຽວກັບຄ່າບໍລິການກ່ອນອອກເດີນທາງ.",
    zh: "车资为预估价格，可能会根据交通状况、时段和具体目的地而有所不同。请务必确保计价器运行或在出发前商定车资。",
  },
  passengerGuidelines: {
    en: "Passenger Guidelines",
    lo: "ຄໍາແນະນໍາສໍາລັບຜູ້ໂດຍສານ",
    zh: "乘客须知",
  },
  safetyTips: {
    en: "Safety Tips & Reminders",
    lo: "ຄໍາແນະນໍາດ້ານຄວາມປອດໄພ",
    zh: "安全提示",
  },
  needAssistance: {
    en: "Need Assistance?",
    lo: "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອບໍ?",
    zh: "需要帮助？",
  },
  taxiServiceHotline: {
    en: "Taxi Service Hotline",
    lo: "ສາຍດ່ວນບໍລິການແທັກຊີ",
    zh: "出租车服务热线",
  },
  available247: {
    en: "Available 24/7",
    lo: "ບໍລິການ 24/7",
    zh: "24/7 全天候服务",
  },
  forServiceIssues: {
    en: "For service issues",
    lo: "ສໍາລັບບັນຫາບໍລິການ",
    zh: "用于服务问题",
  },
};

// Data
const passengerNotes = [
  {
    icon: "🧳",
    title: {
      en: "Take care of your carry-on luggage",
      lo: "ເອົາໃຈໃສ່ກະເປົ າຖືຂອງທ່ານ",
      zh: "保管好您的随身行李",
    },
  },
  {
    icon: "💳",
    title: {
      en: "Pay by the meter, no bargaining",
      lo: "ຈ່າຍຕາມເຄື່ອງວັດ, ບໍ່ຕໍ່ລອງ",
      zh: "按表付费，不讨价还价",
    },
  },
  {
    icon: "🚫",
    title: {
      en: "Protect your rights and refuse car sharing if not agreed",
      lo: "ປົກປ້ອງສິດຂອງທ່ານແລະປະຕິເສດການແບ່ງປັນລົດຖ້າບໍ່ເຫັນດີ",
      zh: "保护您的权利，未经同意可拒绝拼车",
    },
  },
  {
    icon: "✋",
    title: {
      en: "Passengers reserve the right to refuse payment for service refusal",
      lo: "ຜູ້ໂດຍສານສະຫງວນສິດໃນການປະຕິເສດການຈ່າຍເງິນສໍາລັບການປະຕິເສດບໍລິການ",
      zh: "乘客有权对拒载拒绝付费",
    },
  },
  {
    icon: "🚭",
    title: {
      en: "Smoking is strictly prohibited - refuse to pay if driver smokes",
      lo: "ຫ້າມສູບຢາຢ່າງເຂັ້ມງວດ - ປະຕິເສດການຈ່າຍເງິນຖ້າຄົນຂັບສູບຢາ",
      zh: "严禁吸烟 - 司机吸烟可拒付车资",
    },
  },
  {
    icon: "🧾",
    title: {
      en: "Always ask for a receipt",
      lo: "ຂໍໃບຮັບເງິນຢ່າງເໝາະສົມ",
      zh: "务必索要收据",
    },
  },
  {
    icon: "🧹",
    title: {
      en: "Keep the car clean and hygienic",
      lo: "ຮັກສາລົດໃຫ້ສະອາດແລະຖືກສຸຂະອະນາໄມ",
      zh: "保持车内清洁卫生",
    },
  },
];

const popularDestinations = [
  {
    destination: {
      en: "Simeungngam",
      lo: "ສີເມື່ອງງາມ",
      zh: "斯莫昂安",
    },
    price: "80,000 - 100,000 LAK",
    duration: {
      en: "1 hour",
      lo: "1 ຊົ່ວໂມງ",
      zh: "1小时",
    },
  },
  {
    destination: {
      en: "Special Economic Zone",
      lo: "ເຂດເສດຖະກິດພິເສດ",
      zh: "经济特区",
    },
    price: "120,000 - 150,000 LAK",
    duration: {
      en: "45 min",
      lo: "45 ນາທີ",
      zh: "45分钟",
    },
  },
  {
    destination: {
      en: "Houayxay City Center",
      lo: "ໃຈກາງເມືອງຫ້ວຍຊາຍ",
      zh: "会晒市中心",
    },
    price: "200,000 - 300,000 LAK",
    duration: {
      en: "30 min",
      lo: "30 ນາທີ",
      zh: "30分钟",
    },
  },
  {
    destination: {
      en: "Oudomxay",
      lo: "ອຸດົມໄຊ",
      zh: "乌多姆赛",
    },
    price: "400,000 - 600,000 LAK",
    duration: {
      en: "3-4 hours",
      lo: "3-4 ຊົ່ວໂມງ",
      zh: "3-4小时",
    },
  },
];

const serviceFeatures = [
  {
    icon: "🚕",
    title: {
      en: "Licensed Taxis",
      lo: "ແທັກຊີທີ່ມີໃບອະນຸຍາດ",
      zh: "持证出租车",
    },
    description: {
      en: "All taxis at Bokeo Airport are licensed and registered with proper identification and meters.",
      lo: "ແທັກຊີທັງໝົດຢູ່ສະໜາມບິນບໍເກີ້ວມີໃບອະນຸຍາດແລະລົງທະບຽນດ້ວຍບັດປະຈໍາຕົວທີ່ຖືກຕ້ອງແລະເຄື່ອງວັດ.",
      zh: "博乔机场所有出租车均持有执照并注册，配备正规证件和计价器。",
    },
  },
  {
    icon: "⏰",
    title: {
      en: "24/7 Availability",
      lo: "ບໍລິການ 24/7",
      zh: "24/7 服务",
    },
    description: {
      en: "Taxi services operate around the clock to accommodate all flight schedules and passenger needs.",
      lo: "ບໍລິການແທັກຊີດໍາເນີນງານຕະຫຼອດເວລາເພື່ອຮອງຮັບຕາຕະລາງຖ້ຽວບິນທັງໝົດແລະຄວາມຕ້ອງການຂອງຜູ້ໂດຍສານ.",
      zh: "出租车服务全天候运营，满足所有航班时刻表和乘客需求。",
    },
  },
  {
    icon: "💵",
    title: {
      en: "Payment Options",
      lo: "ທາງເລືອກການຈ່າຍເງິນ",
      zh: "支付方式",
    },
    description: {
      en: "Cash payment in LAK, THB, or USD accepted. Some taxis also accept mobile payment (BCEL One).",
      lo: "ຮັບຈ່າຍເງິນສົດໃນສະກຸນເງິນກີບ, ບາດ, ຫຼື ໂດລາສະຫະລັດ. ແທັກຊີບາງຄັນຍັງຮັບການຈ່າຍເງິນມືຖື (BCEL One).",
      zh: "接受老挝基普、泰铢或美元现金支付。部分出租车也接受移动支付（BCEL One）。",
    },
  },
];

const safetyTips = [
  {
    en: "Always use the official taxi queue and follow staff instructions for safety",
    lo: "ຢ່າງເໝາະສົມໃຊ້ຄິວແທັກຊີຢ່າງເປັນທາງການແລະປະຕິບັດຕາມຄໍາແນະນໍາຂອງພະນັກງານເພື່ອຄວາມປອດໄພ",
    zh: "始终使用官方出租车排队区并遵循工作人员指示以确保安全",
  },
  {
    en: "Verify the taxi license plate and driver ID before boarding",
    lo: "ກວດສອບປ້າຍທະບຽນແທັກຊີແລະບັດປະຈໍາຕົວຄົນຂັບກ່ອນຂຶ້ນລົດ",
    zh: "上车前验证出租车牌照和司机身份",
  },
  {
    en: "Ensure the meter is activated at the start of your journey or agree on fare beforehand",
    lo: "ຮັບປະກັນວ່າເຄື່ອງວັດຖືກເປີດໃຊ້ງານໃນຕອນເລີ່ມຕົ້ນການເດີນທາງຂອງທ່ານຫຼືຕົກລົງກ່ຽວກັບຄ່າບໍລິການລ່ວງໜ້າ",
    zh: "确保行程开始时启动计价器或事先商定车资",
  },
  {
    en: "Keep your receipt for potential complaints or lost items recovery",
    lo: "ເກັບຮັກສາໃບຮັບເງິນຂອງທ່ານໄວ້ສໍາລັບການຮ້ອງທຸກທີ່ອາດເກີດຂຶ້ນຫຼືການກູ້ຄືນສິ່ງຂອງທີ່ສູນຫາຍ",
    zh: "保留收据以便可能的投诉或遗失物品寻回",
  },
  {
    en: "Report any suspicious behavior or service issues immediately to airport security",
    lo: "ລາຍງານພຶດຕິກໍາທີ່ໜ້າສົງໄສຫຼືບັນຫາບໍລິການໃຫ້ຮັກສາຄວາມປອດໄພຂອງສະໜາມບິນທັນທີ",
    zh: "立即向机场安保报告任何可疑行为或服务问题",
  },
];

export function TaxiTab({ lang }: TaxiTabProps) {
  const { t } = useApp();

  return (
    <div className="space-y-6 container">
      {/* Page Title */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <CarTaxiFront className="text-primary-600 h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t(translations.title)}
            </h1>
            <p className="text-sm text-gray-600">{t(translations.subtitle)}</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative h-64 overflow-hidden rounded-lg md:h-full">
            <Image
              src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/transport/taxi-area1.jpeg"
              alt="Taxi Pick-up Area at Bokeo Airport"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900">
              <MapPin className="text-primary-600 h-5 w-5" />
              {t(translations.pickupTitle)}
            </h2>
            <p className="mb-3 text-gray-700">
              {t(translations.pickupDescription)}
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1 font-semibold">•</span>
                <span>
                  <strong>{t(translations.mainPickupArea)}</strong>{" "}
                  {t(translations.mainPickupLocation)}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1 font-semibold">•</span>
                <span>
                  <strong>{t(translations.operatingHours)}</strong>{" "}
                  {t(translations.operatingHoursValue)}
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
              <div className="space-y-2 text-sm text-yellow-800">
                <p className="font-semibold text-yellow-900">
                  {t(translations.importantNotice)}
                </p>
                <ol className="list-inside list-decimal space-y-2">
                  {translations.noticeItems.map((item, idx) => (
                    <li key={idx}>{t(item)}</li>
                  ))}
                  <li className="flex items-start gap-2">
                    <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-yellow-600" />
                    <span>
                      <strong>{t(translations.complaintHotline)}</strong> +856
                      84 211 999
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations & Fares */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="text-primary-600 h-5 w-5" />
          <h2 className="text-xl font-semibold text-gray-900">
            {t(translations.popularDestinations)}
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {popularDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="hover:border-primary-300 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {t(dest.destination)}
                </p>
                <p className="text-sm text-gray-500">{t(dest.duration)}</p>
              </div>
              <div className="text-right">
                <p className="text-primary-600 font-bold">{dest.price}</p>
                <p className="text-xs text-gray-500">
                  {lang === "en" && "Approx."}
                  {lang === "lo" && "ປະມານ"}
                  {lang === "zh" && "约"}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-primary-50 mt-4 rounded-lg p-3">
          <p className="text-primary-800 text-sm">
            <strong>
              {lang === "en" && "Note:"}
              {lang === "lo" && "ໝາຍເຫດ:"}
              {lang === "zh" && "注意："}
            </strong>{" "}
            {t(translations.fareNote)}
          </p>
        </div>
      </div>

      {/* Passenger Notes */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          {t(translations.passengerGuidelines)}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {passengerNotes.map((note, idx) => (
            <div
              key={idx}
              className="hover:border-primary-300 hover:bg-primary-50 flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors"
            >
              <div className="flex-shrink-0 text-3xl">{note.icon}</div>
              <p className="text-sm leading-snug text-gray-700">
                {t(note.title)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Taxi Service Information */}
      <div className="grid gap-6 md:grid-cols-3">
        {serviceFeatures.map((feature, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="text-primary-600 mb-3 text-3xl">{feature.icon}</div>
            <h3 className="mb-2 font-semibold text-gray-900">
              {t(feature.title)}
            </h3>
            <p className="text-sm text-gray-600">{t(feature.description)}</p>
          </div>
        ))}
      </div>

      {/* Safety & Tips */}
      <div className="border-primary-200 bg-primary-50 rounded-lg border p-6">
        <h3 className="text-primary-900 mb-3 font-semibold">
          {t(translations.safetyTips)}
        </h3>
        <ul className="text-primary-800 space-y-2 text-sm">
          {safetyTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-primary-600 mt-1">✓</span>
              <span>{t(tip)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-4 font-semibold text-gray-900">
          {t(translations.needAssistance)}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <Phone className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">
                {t(translations.taxiServiceHotline)}
              </p>
              <p className="text-primary-600 font-medium">+856 84 211 888</p>
              <p className="text-sm text-gray-600">
                {t(translations.available247)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">
                {t(translations.complaintHotline)}
              </p>
              <p className="text-primary-600 font-medium">+856 84 211 999</p>
              <p className="text-sm text-gray-600">
                {t(translations.forServiceIssues)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
