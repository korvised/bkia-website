import Link from "next/link";
import {
  ArrowRight,
  Car,
  Smile,
  Calendar,
  Package,
  Utensils,
  Search,
} from "lucide-react";
import { Lang, MultilingualText } from "@/types/language";

interface ServiceItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bgColor: string;
  iconColor: string;
}

const services: ServiceItem[] = [
  {
    id: "flights",
    title: {
      en: "Airport Transportation",
      lo: "ການຂົນສົ່ງສະໜາມບິນ",
      zh: "机场交通",
    },
    description: {
      en: "Buses, taxis, parking, and directions",
      lo: "ລົດເມ, ແທັກຊີ, ບ່ອນຈອດລົດ, ແລະ ທິດທາງ",
      zh: "为您提供便捷的路车、出租车、大巴车等交通资讯",
    },
    icon: Car,
    href: "/transportation",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "dining",
    title: {
      en: "Dining & Shopping",
      lo: "ອາຫານ ແລະ ການຊື້ເຄື່ອງ",
      zh: "餐饮购物",
    },
    description: {
      en: "Restaurants, cafes, and duty-free shopping",
      lo: "ຮ້ານອາຫານ, ຮ້ານກາເຟ, ແລະ ການຊື້ເຄື່ອງປອດອາກອນ",
      zh: "来饮食、购物、文化活动",
    },
    icon: Utensils,
    href: "/services/dining-shopping",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    id: "services",
    title: {
      en: "Joyful Services",
      lo: "ບໍລິການຄວາມສຸກ",
      zh: "楠悦服务",
    },
    description: {
      en: "Entertainment, relaxation, and family areas",
      lo: "ການບັນເທີງ, ການພັກຜ່ອນ, ແລະ ເຂດຄອບຄົວ",
      zh: "微笑服务",
    },
    icon: Smile,
    href: "/services/joyful-service",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: "cargo",
    title: {
      en: "Air Cargo",
      lo: "ຂົນສົ່ງສິນຄ້າທາງອາກາດ",
      zh: "航空货运",
    },
    description: {
      en: "Package tracking and shipping services",
      lo: "ການຕິດຕາມແພັກເກດ ແລະ ບໍລິການຂົນສົ່ງ",
      zh: "货物追踪和运输服务",
    },
    icon: Package,
    href: "/cargo",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "lost-found",
    title: {
      en: "Lost & Found",
      lo: "ຂອງສູນຫາຍ ແລະ ພົບເຫັນ",
      zh: "失物招领",
    },
    description: {
      en: "Report and claim lost items",
      lo: "ລາຍງານ ແລະ ຮຽກຮ້ອງສິ່ງຂອງທີ່ສູນຫາຍ",
      zh: "投诉建议",
    },
    icon: Search,
    href: "/services/lost-found",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: "cultural",
    title: {
      en: "Cultural Activities",
      lo: "ກິດຈະກຳວັດທະນະທຳ",
      zh: "文化活动",
    },
    description: {
      en: "Exhibitions, performances, and workshops",
      lo: "ການວາງສະແດງ, ການສະແດງ, ແລະ ກອງປະຊຸມ",
      zh: "发展历程",
    },
    icon: Calendar,
    href: "/services/cultural-interaction",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
];

// Multilingual text for UI elements
const uiText = {
  servicePromise: {
    en: "Service Promise",
    lo: "ຄຳໝັ້ນສັນຍາບໍລິການ",
    zh: "服务承诺",
  },
  learnMore: {
    en: "Learn More",
    lo: "ຮຽນຮູ້ເພີ່ມເຕີມ",
    zh: "了解更多",
  },
};

interface QuickServicesProps {
  lang: Lang;
}

export const QuickServices: React.FC<QuickServicesProps> = ({
  lang,
}: QuickServicesProps) => {
  return (
    <div className="flex flex-1 flex-col justify-center py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Navigation Tabs */}
        <div className="mb-12 flex items-center justify-center">
          <div className="flex space-x-8 rounded-full bg-white p-2 shadow-lg">
            {services.map((service, index) => {
              const IconComponent = service.icon;

              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className={`flex flex-col items-center rounded-full p-4 transition-all duration-300 hover:scale-110 ${
                    index === 0
                      ? "bg-primary-500 text-white"
                      : "hover:text-primary-600 text-gray-600"
                  }`}
                >
                  <IconComponent className="mb-2 h-6 w-6" />
                  <span className="text-center text-xs leading-tight font-medium">
                    {service.title[lang]}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Service Content */}
        <div className="mb-12 text-center">
          <div className="bg-primary-500 mb-4 inline-block rounded-full px-6 py-2 text-sm font-medium text-white">
            {uiText.servicePromise[lang]}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {services[0].title[lang]}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {services[0].description[lang]}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(1).map((service) => {
            const IconComponent = service.icon;

            return (
              <Link
                key={service.id}
                href={service.href}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* Icon */}
                <div
                  className={`h-16 w-16 rounded-xl ${service.bgColor} mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                >
                  <IconComponent className={`h-8 w-8 ${service.iconColor}`} />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="group-hover:text-primary-600 mb-2 text-xl font-bold text-gray-900 transition-colors">
                    {service.title[lang]}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {service.description[lang]}
                  </p>
                </div>

                {/* Arrow */}
                <div className="group-hover:text-primary-600 flex items-center text-gray-400 transition-colors">
                  <span className="mr-2 text-sm font-medium">
                    {uiText.learnMore[lang]}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
