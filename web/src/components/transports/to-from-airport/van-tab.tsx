import Image from "next/image";
import {
  AlertCircle,
  Clock,
  Info,
  MapPin,
  Phone,
  Truck,
  Users,
} from "lucide-react";
import { Lang } from "@/types/language";
import { useApp } from "@/context/app-context";

interface VanTabProps {
  lang: Lang;
}

// Translations
const translations = {
  title: {
    en: "Van Services",
    lo: "ບໍລິການລົດຕູ້",
    zh: "面包车服务",
  },
  subtitle: {
    en: "Bokeo International Airport - Tonphueng, Bokeo, Lao PDR",
    lo: "ສະໜາມບິນນາໆຊາດບໍເກີ້ວ - ຕົ້ນເຜີ້ງ, ບໍ່ແກ້ວ, ສປປ ລາວ",
    zh: "博乔国际机场 - Tonphueng, 博乔, 老挝",
  },
  description: {
    title: {
      en: "Private Van Transportation",
      lo: "ການຂົນສົ່ງລົດຕູ້ສ່ວນຕົວ",
      zh: "私人面包车运输",
    },
    content: {
      en: "Comfortable and convenient van services are available at Bokeo International Airport for individuals, families, and groups requiring private transportation with extra space and comfort to destinations across Bokeo Province and beyond.",
      lo: "ບໍລິການລົດຕູ້ທີ່ສະດວກສະບາຍແລະສະດວກສະບາຍມີຢູ່ທີ່ສະໜາມບິນນາໆຊາດບໍເກີ້ວສໍາລັບບຸກຄົນ, ຄອບຄົວ, ແລະກຸ່ມທີ່ຕ້ອງການການຂົນສົ່ງສ່ວນຕົວດ້ວຍພື້ນທີ່ພິເສດແລະຄວາມສະດວກສະບາຍໄປຫາຈຸດໝາຍປາຍທາງທົ່ວແຂວງບໍ່ແກ້ວແລະນອກເຂດ.",
      zh: "博乔国际机场为需要私人交通工具且需要额外空间和舒适度前往博乔省及周边目的地的个人、家庭和团体提供舒适便捷的面包车服务。",
    },
  },
  pickupLocation: {
    title: {
      en: "Pick-up Location",
      lo: "ສະຖານທີ່ຮັບຜູ້ໂດຍສານ",
      zh: "接客地点",
    },
    content: {
      en: "Van services are available at the Ground Transportation Center, near the arrivals area",
      lo: "ບໍລິການລົດຕູ້ມີຢູ່ທີ່ສູນຂົນສົ່ງພື້ນດິນ, ໃກ້ກັບພື້ນທີ່ຂາເຂົ້າ",
      zh: "面包车服务位于地面交通中心，靠近到达区",
    },
  },
  availability: {
    title: {
      en: "Availability",
      lo: "ຄວາມພ້ອມໃຊ້",
      zh: "服务时间",
    },
    content: {
      en: "24/7 service with advance booking recommended",
      lo: "ບໍລິການ 24/7 ແນະນໍາໃຫ້ຈອງລ່ວງໜ້າ",
      zh: "24/7 服务，建议提前预订",
    },
  },
  bookingInquiries: {
    title: {
      en: "Booking & Inquiries",
      lo: "ການຈອງ ແລະ ສອບຖາມ",
      zh: "预订与咨询",
    },
    content: {
      en: "+856 84 211 777 (Bokeo Airport Van Service)",
      lo: "+856 84 211 777 (ບໍລິການລົດຕູ້ສະໜາມບິນບໍເກີ້ວ)",
      zh: "+856 84 211 777（博乔机场面包车服务）",
    },
  },
  availableServices: {
    en: "Available Van Services",
    lo: "ບໍລິການລົດຕູ້ທີ່ມີ",
    zh: "可用面包车服务",
  },
  perTrip: {
    en: "Per trip",
    lo: "ຕໍ່ການເດີນທາງ",
    zh: "每次行程",
  },
  popularDestinations: {
    en: "Popular Destinations & Rates",
    lo: "ຈຸດໝາຍປາຍທາງຍອດນິຍົມ ແລະ ອັດຕາ",
    zh: "热门目的地及费率",
  },
  startingFrom: {
    en: "Starting from",
    lo: "ເລີ່ມຕົ້ນຈາກ",
    zh: "起价",
  },
  priceNote: {
    en: "* Prices may vary based on vehicle type and specific requirements",
    lo: "* ລາຄາອາດຈະແຕກຕ່າງກັນໂດຍອີງໃສ່ປະເພດຍານພາຫະນະແລະຂໍ້ກໍານົດສະເພາະ",
    zh: "* 价格可能因车型和具体要求而异",
  },
  howToBook: {
    en: "How to Book a Van",
    lo: "ວິທີການຈອງລົດຕູ້",
    zh: "如何预订面包车",
  },
  bookingSteps: [
    {
      title: {
        en: "Contact",
        lo: "ຕິດຕໍ່",
        zh: "联系",
      },
      description: {
        en: "Call +856 84 211 777 or book at the counter",
        lo: "ໂທ +856 84 211 777 ຫຼື ຈອງທີ່ເຄົາເຕີ",
        zh: "拨打 +856 84 211 777 或在柜台预订",
      },
    },
    {
      title: {
        en: "Confirm",
        lo: "ຢືນຢັນ",
        zh: "确认",
      },
      description: {
        en: "Provide destination and passenger details",
        lo: "ໃຫ້ລາຍລະອຽດຈຸດໝາຍປາຍທາງແລະຜູ້ໂດຍສານ",
        zh: "提供目的地和乘客详情",
      },
    },
    {
      title: {
        en: "Meet",
        lo: "ພົບ",
        zh: "见面",
      },
      description: {
        en: "Driver meets you at Ground Transportation Center",
        lo: "ຄົນຂັບພົບທ່ານທີ່ສູນຂົນສົ່ງພື້ນດິນ",
        zh: "司机在地面交通中心与您会面",
      },
    },
    {
      title: {
        en: "Travel",
        lo: "ເດີນທາງ",
        zh: "出行",
      },
      description: {
        en: "Enjoy comfortable door-to-door service",
        lo: "ເພີດເພີນກັບບໍລິການປະຕູສູ່ປະຕູທີ່ສະດວກສະບາຍ",
        zh: "享受舒适的门到门服务",
      },
    },
  ],
  importantInformation: {
    en: "Important Information",
    lo: "ຂໍ້ມູນສໍາຄັນ",
    zh: "重要信息",
  },
  safetyGuidelines: {
    en: "Safety Guidelines",
    lo: "ຄໍາແນະນໍາດ້ານຄວາມປອດໄພ",
    zh: "安全指南",
  },
  needAssistance: {
    en: "Need Assistance?",
    lo: "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອບໍ?",
    zh: "需要帮助？",
  },
  vanServiceHotline: {
    en: "Van Service Hotline",
    lo: "ສາຍດ່ວນບໍລິການລົດຕູ້",
    zh: "面包车服务热线",
  },
  serviceCounter: {
    en: "Service Counter",
    lo: "ເຄົາເຕີບໍລິການ",
    zh: "服务柜台",
  },
  groundTransportationCenter: {
    en: "Ground Transportation Center",
    lo: "ສູນຂົນສົ່ງພື້ນດິນ",
    zh: "地面交通中心",
  },
};

// Data
const vanServices = [
  {
    name: { en: "Standard Van", lo: "ລົດຕູ້ມາດຕະຖານ", zh: "标准面包车" },
    capacity: { en: "7-9 passengers", lo: "7-9 ຜູ້ໂດຍສານ", zh: "7-9名乘客" },
    price: "200,000 - 300,000 LAK",
    features: [
      {
        en: "Door-to-door service",
        lo: "ບໍລິການປະຕູສູ່ປະຕູ",
        zh: "门到门服务",
      },
      { en: "Luggage assistance", lo: "ຊ່ວຍສໍາຝາກ", zh: "行李协助" },
      { en: "Air conditioning", lo: "ເຄື່ອງປັບອາກາດ", zh: "空调" },
    ],
  },
  {
    name: { en: "Premium Van", lo: "ລົດຕູ້ພຣີມຽມ", zh: "高级面包车" },
    capacity: { en: "6-8 passengers", lo: "6-8 ຜູ້ໂດຍສານ", zh: "6-8名乘客" },
    price: "350,000 - 500,000 LAK",
    features: [
      { en: "Luxury comfort", lo: "ຄວາມສະດວກສະບາຍ", zh: "豪华舒适" },
      { en: "Wi-Fi available", lo: "ມີ Wi-Fi", zh: "提供Wi-Fi" },
      { en: "Refreshments included", lo: "ລວມເຄື່ອງດື່ມ", zh: "包含茶点" },
    ],
  },
  {
    name: { en: "Group Van", lo: "ລົດຕູ້ກຸ່ມ", zh: "团体面包车" },
    capacity: {
      en: "10-15 passengers",
      lo: "10-15 ຜູ້ໂດຍສານ",
      zh: "10-15名乘客",
    },
    price: "400,000 - 600,000 LAK",
    features: [
      { en: "Ideal for groups", lo: "ເໝາະສໍາລັບກຸ່ມ", zh: "适合团体" },
      {
        en: "Extra luggage space",
        lo: "ພື້ນທີ່ສໍາຝາກພິເສດ",
        zh: "额外行李空间",
      },
      { en: "Professional driver", lo: "ຄົນຂັບມືອາຊີບ", zh: "专业司机" },
    ],
  },
];

const popularDestinations = [
  {
    destination: {
      en: "Houayxay City Center",
      lo: "ໃຈກາງເມືອງຫ້ວຍຊາຍ",
      zh: "会晒市中心",
    },
    price: "80,000 LAK",
    duration: { en: "30 min", lo: "30 ນາທີ", zh: "30分钟" },
  },
  {
    destination: { en: "Luang Prabang", lo: "ຫຼວງພະບາງ", zh: "琅勃拉邦" },
    price: "1,200,000 LAK",
    duration: { en: "3 hours", lo: "3 ຊົ່ວໂມງ", zh: "3小时" },
  },
  {
    destination: {
      en: "Chiang Rai, Thailand",
      lo: "ຮ່ຽງຮາຍ, ໄທ",
      zh: "泰国清莱",
    },
    price: "1,500,000 LAK",
    duration: { en: "2.5 hours", lo: "2.5 ຊົ່ວໂມງ", zh: "2.5小时" },
  },
  {
    destination: {
      en: "Ban Houayxay Border",
      lo: "ດ່ານບ້ານຫ້ວຍຊາຍ",
      zh: "会晒边境",
    },
    price: "50,000 LAK",
    duration: { en: "15 min", lo: "15 ນາທີ", zh: "15分钟" },
  },
];

const benefits = [
  {
    icon: "🧳",
    title: {
      en: "Extra Luggage Space",
      lo: "ພື້ນທີ່ສໍາຝາກພິເສດ",
      zh: "额外行李空间",
    },
    description: {
      en: "Ample room for multiple suitcases, sports equipment, and oversized items",
      lo: "ມີພື້ນທີ່ກວ້າງຂວາງສໍາລັບກະເປົ າເດີນທາງຫຼາຍໃບ, ອຸປະກອນກິລາ, ແລະສິ່ງຂອງຂະໜາດໃຫຍ່",
      zh: "充足空间容纳多个行李箱、运动器材和超大物品",
    },
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: { en: "Family Friendly", lo: "ເໝາະສໍາລັບຄອບຄົວ", zh: "适合家庭" },
    description: {
      en: "Perfect for families traveling together with comfortable seating arrangements",
      lo: "ເໝາະສໍາລັບຄອບຄົວທີ່ເດີນທາງຮ່ວມກັນດ້ວຍການຈັດທີ່ນັ່ງທີ່ສະດວກສະບາຍ",
      zh: "适合家庭一起旅行，座位安排舒适",
    },
  },
  {
    icon: "💼",
    title: {
      en: "Business & Groups",
      lo: "ທຸລະກິດ ແລະ ກຸ່ມ",
      zh: "商务和团体",
    },
    description: {
      en: "Ideal for business travelers and tourist groups visiting Bokeo Province",
      lo: "ເໝາະສໍາລັບນັກທຸລະກິດແລະກຸ່ມນັກທ່ອງທ່ຽວທີ່ມາຢ້ຽມຢາມແຂວງບໍ່ແກ້ວ",
      zh: "适合商务旅客和游览博乔省的旅游团",
    },
  },
];

const importantInfo = [
  {
    en: "Advance booking is recommended, especially during peak travel seasons and holidays",
    lo: "ແນະນໍາໃຫ້ຈອງລ່ວງໜ້າ, ໂດຍສະເພາະໃນລະດູເດີນທາງສູງສຸດແລະວັນພັກ",
    zh: "建议提前预订，尤其是在旅游旺季和节假日",
  },
  {
    en: "Payment accepted: Cash (LAK, THB, USD), mobile payment (BCEL One, M-money)",
    lo: "ຮັບການຊໍາລະ: ເງິນສົດ (ກີບ, ບາດ, ໂດລາ), ການຊໍາລະມືຖື (BCEL One, M-money)",
    zh: "接受支付：现金（LAK、THB、USD）、移动支付（BCEL One、M-money）",
  },
  {
    en: "Free cancellation up to 4 hours before scheduled pick-up time",
    lo: "ຍົກເລີກຟຣີຈົນເຖິງ 4 ຊົ່ວໂມງກ່ອນເວລາຮັບທີ່ກໍານົດ",
    zh: "预定接客时间前4小时可免费取消",
  },
  {
    en: "For international destinations, ensure you have valid travel documents",
    lo: "ສໍາລັບຈຸດໝາຍປາຍທາງສາກົນ, ຮັບປະກັນວ່າທ່ານມີເອກະສານການເດີນທາງທີ່ຖືກຕ້ອງ",
    zh: "对于国际目的地，请确保您拥有有效的旅行证件",
  },
  {
    en: "Additional charges may apply for destinations outside Bokeo Province",
    lo: "ອາດຈະມີຄ່າໃຊ້ຈ່າຍເພີ່ມເຕີມສໍາລັບຈຸດໝາຍປາຍທາງນອກແຂວງບໍ່ແກ້ວ",
    zh: "博乔省外目的地可能需要额外收费",
  },
];

const safetyGuidelines = [
  {
    en: "Always verify driver identity and vehicle details before boarding",
    lo: "ກວດສອບຕົວຕົນຂອງຄົນຂັບແລະລາຍລະອຽດຂອງຍານພາຫະນະກ່ອນຂຶ້ນລົດ",
    zh: "上车前务必验证司机身份和车辆信息",
  },
  {
    en: "Ensure all passengers wear seatbelts throughout the journey",
    lo: "ຮັບປະກັນວ່າຜູ້ໂດຍສານທຸກຄົນໃສ່ເຂັມຂັດນິລະພັບຕະຫຼອດການເດີນທາງ",
    zh: "确保所有乘客在整个行程中系好安全带",
  },
  {
    en: "Keep valuable items with you and never leave luggage unattended",
    lo: "ເກັບສິ່ງຂອງມີຄຸນຄ່າໄວ້ກັບທ່ານແລະບໍ່ເຄີຍປ່ອຍສໍາຝາກໂດຍບໍ່ມີການເບິ່ງແຍງ",
    zh: "随身携带贵重物品，切勿让行李无人看管",
  },
  {
    en: "Report any safety concerns to airport security immediately",
    lo: "ລາຍງານຄວາມກັງວົນດ້ານຄວາມປອດໄພໃດໆໃຫ້ຮັກສາຄວາມປອດໄພຂອງສະໜາມບິນທັນທີ",
    zh: "立即向机场安保报告任何安全问题",
  },
];

export function VanTab({ lang }: VanTabProps) {
  const { t } = useApp();

  return (
    <div className="container space-y-6">
      {/* Page Title */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <Truck className="text-primary-600 h-8 w-8" />
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
        <div className="relative h-64 overflow-hidden rounded-lg md:h-auto">
          <Image
            src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/transport/van-service.avif"
            alt="Van Service at Bokeo International Airport"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              {t(translations.description.title)}
            </h2>
            <p className="mb-4 text-gray-700">
              {t(translations.description.content)}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <MapPin className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  {t(translations.pickupLocation.title)}
                </p>
                <p className="text-gray-600">
                  {t(translations.pickupLocation.content)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <Clock className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  {t(translations.availability.title)}
                </p>
                <p className="text-gray-600">
                  {t(translations.availability.content)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <Phone className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  {t(translations.bookingInquiries.title)}
                </p>
                <p className="text-gray-600">
                  {t(translations.bookingInquiries.content)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Van Service Types */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {t(translations.availableServices)}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {vanServices.map((service, idx) => (
            <div
              key={idx}
              className="hover:border-primary-300 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary-100 text-primary-600 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {t(service.name)}
                  </h3>
                  <p className="text-sm text-gray-500">{t(service.capacity)}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-primary-600 text-lg font-bold">
                  {service.price}
                </p>
                <p className="text-xs text-gray-500">
                  {t(translations.perTrip)}
                </p>
              </div>

              <ul className="space-y-2">
                {service.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>{t(feature)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          {t(translations.popularDestinations)}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {popularDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
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
                  {t(translations.startingFrom)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {t(translations.priceNote)}
        </p>
      </div>

      {/* Booking Process */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          {t(translations.howToBook)}
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {translations.bookingSteps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="bg-primary-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
                {idx + 1}
              </div>
              <h4 className="mb-1 font-semibold text-gray-900">
                {t(step.title)}
              </h4>
              <p className="text-sm text-gray-600">{t(step.description)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="grid gap-6 md:grid-cols-3">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 text-4xl">{benefit.icon}</div>
            <h3 className="mb-2 font-semibold text-gray-900">
              {t(benefit.title)}
            </h3>
            <p className="text-sm text-gray-600">{t(benefit.description)}</p>
          </div>
        ))}
      </div>

      {/* Important Information */}
      <div className="border-primary-200 bg-primary-50 rounded-lg border p-6">
        <div className="flex gap-3">
          <Info className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-primary-900 font-semibold">
              {t(translations.importantInformation)}
            </p>
            <ul className="text-primary-800 space-y-1 text-sm">
              {importantInfo.map((info, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>{t(info)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <div className="flex gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div className="space-y-2">
            <p className="font-semibold text-yellow-900">
              {t(translations.safetyGuidelines)}
            </p>
            <ul className="space-y-1 text-sm text-yellow-800">
              {safetyGuidelines.map((guideline, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 text-yellow-600">⚠️</span>
                  <span>{t(guideline)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
                {t(translations.vanServiceHotline)}
              </p>
              <p className="text-primary-600 font-medium">+856 84 211 777</p>
              <p className="text-sm text-gray-600">
                {lang === "en" && "Available 24/7"}
                {lang === "lo" && "ບໍລິການ 24/7"}
                {lang === "zh" && "24/7 全天候服务"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">
                {t(translations.serviceCounter)}
              </p>
              <p className="text-gray-600">
                {t(translations.groundTransportationCenter)}
              </p>
              <p className="text-sm text-gray-600">
                {t(translations.subtitle)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
