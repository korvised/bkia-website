import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Bus, CarTaxiFront, Truck } from "lucide-react";
import { Lang } from "@/types/language";
import { useApp } from "@/context/app-context";
import { cn } from "@/lib";

interface OverviewTabProps {
  lang: Lang;
}

// Translations
const translations = {
  title: {
    en: "Overview",
    lo: "ພາບລວມ",
    zh: "概览",
  },
  description: {
    en: "A wide variety of public transport services operate to and from Bokeo International Airport. Discover the options below to determine which service best suits your needs.",
    lo: "ມີບໍລິການຂົນສົ່ງສາທາລະນະຫຼາກຫຼາຍປະເພດທີ່ດໍາເນີນງານໄປແລະມາຈາກສະຫນາມບິນນາໆຊາດບໍເກີ້ວ. ຄົ້ນພົບທາງເລືອກຂ້າງລຸ່ມນີ້ເພື່ອກໍານົດວ່າບໍລິການໃດທີ່ເໝາະສົມກັບຄວາມຕ້ອງການຂອງທ່ານ.",
    zh: "多种公共交通服务往返于博乔国际机场。了解以下选项，以确定哪种服务最适合您的需求。",
  },
  transportOptions: {
    taxi: {
      title: { en: "Taxis", lo: "ແທັກຊີ", zh: "出租车" },
      description: {
        en: "A flexible way to reach your destination.",
        lo: "ວິທີທີ່ຍືດຫຍຸ່ນເພື່ອໄປເຖິງຈຸດໝາຍປາຍທາງຂອງທ່ານ.",
        zh: "灵活到达目的地的方式。",
      },
      features: {
        en: ["24/7 availability", "Metered fares", "Licensed drivers"],
        lo: ["ບໍລິການ 24/7", "ອັດຕາແມັດເຕີ", "ຄົນຂັບທີ່ມີໃບອະນຸຍາດ"],
        zh: ["24/7 服务", "计价器收费", "持证司机"],
      },
    },
    van: {
      title: { en: "Van Service", lo: "ບໍລິການລົດຕູ້", zh: "面包车服务" },
      description: {
        en: "Comfortable group transport with extra space.",
        lo: "ການຂົນສົ່ງກຸ່ມທີ່ສະດວກສະບາຍດ້ວຍພື້ນທີ່ພິເສດ.",
        zh: "舒适的团体运输，空间更大。",
      },
      features: {
        en: ["7-15 passengers", "Luggage space", "Door-to-door service"],
        lo: ["7-15 ຜູ້ໂດຍສານ", "ພື້ນທີ່ສໍາລັບສໍາຝາກ", "ບໍລິການປະຕູສູ່ປະຕູ"],
        zh: ["7-15 名乘客", "行李空间", "门到门服务"],
      },
    },
    bus: {
      title: { en: "Public Buses", lo: "ລົດເມສາທາລະນະ", zh: "公共巴士" },
      description: {
        en: "Affordable routes serving the region.",
        lo: "ເສັ້ນທາງທີ່ລາຄາບໍ່ແພງຮັບໃຊ້ພາກພື້ນ.",
        zh: "实惠的线路服务该地区。",
      },
      features: {
        en: ["Budget friendly", "Fixed routes", "Regular schedule"],
        lo: ["ລາຄາປະຫຍັດ", "ເສັ້ນທາງຄົງທີ່", "ຕາຕະລາງປົກກະຕິ"],
        zh: ["经济实惠", "固定路线", "定期班次"],
      },
    },
  },
  comingSoon: {
    en: "Coming Soon",
    lo: "ໄວໆນີ້",
    zh: "即将推出",
  },
  viewDetails: {
    en: "View Details",
    lo: "ເບິ່ງລາຍລະອຽດ",
    zh: "查看详情",
  },
};

// Transport options data
const transportOptions = [
  {
    id: "taxi",
    icon: CarTaxiFront,
    image: "/images/transportation/taxi-area1.jpeg",
    tab: "taxi",
    available: true,
  },
  {
    id: "van",
    icon: Truck,
    image: "/images/transportation/van-service.avif",
    tab: "van",
    available: true,
  },
  {
    id: "bus",
    icon: Bus,
    image: "/images/transportation/public-bus.jpg",
    tab: null,
    available: false,
  },
];

export function OverviewTab({ lang }: OverviewTabProps) {
  const { t } = useApp();
  const searchParams = useSearchParams();

  const handleViewDetails = (tab: string | null) => {
    if (!tab) return "#";
    const params = new URLSearchParams(searchParams.toString());
    params.set("t", tab);
    return `?${params.toString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Description */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {t(translations.title)}
        </h1>
        <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
          {t(translations.description)}
        </p>
      </div>

      {/* Transport Options Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {transportOptions.map((option) => {
          const Icon = option.icon;
          const optionData =
            translations.transportOptions[
              option.id as keyof typeof translations.transportOptions
            ];

          return (
            <div
              key={option.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300",
                option.available
                  ? "hover:border-primary-300 border-gray-200 hover:shadow-lg"
                  : "border-gray-200 opacity-75",
              )}
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={option.image}
                  alt={t(optionData.title)}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-300",
                    option.available && "group-hover:scale-105",
                  )}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Icon Badge */}
                <div className="absolute top-4 left-4 rounded-lg bg-white/90 p-3 shadow-md backdrop-blur-sm">
                  <Icon className="text-primary-600 h-6 w-6" strokeWidth={2} />
                </div>

                {/* Coming Soon Badge */}
                {!option.available && (
                  <div className="bg-danger-600 absolute top-4 right-4 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                    {t(translations.comingSoon)}
                  </div>
                )}

                {/* Title on Image */}
                <div className="absolute right-4 bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">
                    {t(optionData.title)}
                  </h3>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  {t(optionData.description)}
                </p>

                {/* Features List */}
                <ul className="mb-4 space-y-2">
                  {optionData.features[lang].map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="bg-primary-600 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* View Details Button/Link */}
                {option.available ? (
                  <Link
                    href={handleViewDetails(option.tab)}
                    className="group/btn text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    scroll={false}
                  >
                    {t(translations.viewDetails)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                ) : (
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400">
                    {t(translations.viewDetails)}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="border-primary-200 bg-primary-50 rounded-xl border p-6">
        <h3 className="text-primary-900 mb-3 text-lg font-semibold">
          {lang === "en" && "Need Help Choosing?"}
          {lang === "lo" && "ຕ້ອງການຄວາມຊ່ວຍເຫຼືອໃນການເລືອກ?"}
          {lang === "zh" && "需要帮助选择？"}
        </h3>
        <p className="text-primary-800 mb-4 text-sm leading-relaxed">
          {lang === "en" &&
            "Our ground transportation staff are available at the arrivals hall to help you choose the best transport option for your destination and budget."}
          {lang === "lo" &&
            "ພະນັກງານຂົນສົ່ງພື້ນດິນຂອງພວກເຮົາມີຢູ່ທີ່ຫ້ອງໂຖງຂາເຂົ້າເພື່ອຊ່ວຍທ່ານເລືອກທາງເລືອກການຂົນສົ່ງທີ່ດີທີ່ສຸດສໍາລັບຈຸດໝາຍປາຍທາງແລະງົບປະມານຂອງທ່ານ."}
          {lang === "zh" &&
            "我们的地面交通工作人员在到达大厅为您提供服务，帮助您根据目的地和预算选择最佳交通方式。"}
        </p>
        <div className="text-primary-900 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {lang === "en" && "Location:"}
              {lang === "lo" && "ສະຖານທີ່:"}
              {lang === "zh" && "位置："}
            </span>
            <span>
              {lang === "en" && "Ground Transportation Center"}
              {lang === "lo" && "ສູນຂົນສົ່ງພື້ນດິນ"}
              {lang === "zh" && "地面交通中心"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {lang === "en" && "Hours:"}
              {lang === "lo" && "ເວລາ:"}
              {lang === "zh" && "时间："}
            </span>
            <span>
              {lang === "en" && "24/7"}
              {lang === "lo" && "24/7"}
              {lang === "zh" && "24/7"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
