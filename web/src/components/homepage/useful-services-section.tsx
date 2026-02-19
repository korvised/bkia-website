import {
  Accessibility,
  ArrowRight,
  Car,
  LucideIcon,
  SquareChartGantt,
} from "lucide-react";
import Link from "next/link";
import { Lang, MultilingualText } from "@/types/language";
import { createCommonI18n } from "@/data/i18n/common";

interface ServiceCard {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  icon: LucideIcon;
  buttonText: MultilingualText;
  buttonLink: string;
  bgColor: string;
  textColor: string;
  buttonBg: string;
  buttonHover: string;
  buttonTextColor?: string;
}

const servicesData: ServiceCard[] = [
  {
    id: "passenger-guide",
    title: {
      en: "Passenger Guide",
      lo: "ຄູ່ມືຜູ້ໂດຍສານ",
      zh: "乘客指南",
    },
    description: {
      en: "Step-by-step guide for departures, arrivals and transfers",
      lo: "ຄຳແນະນຳການຂາອອກ, ຂາເຂົ້າ ແລະ ການຕໍ່ຖ້ວຍບິນ",
      zh: "出发、到达和中转的详细指南",
    },
    icon: SquareChartGantt,
    buttonText: {
      en: "View guide",
      lo: "ເບິ່ງຄູ່ມື",
      zh: "查看指南",
    },
    buttonLink: "guides/departures",
    bgColor: "bg-gradient-to-br from-primary-50 to-primary-100",
    textColor: "text-primary-900",
    buttonBg: "bg-primary-600",
    buttonHover: "hover:bg-primary-700",
  },
  {
    id: "transport",
    title: {
      en: "Transport & Parking",
      lo: "ການຂົນສົ່ງ ແລະ ບ່ອນຈອດລົດ",
      zh: "交通与停车",
    },
    description: {
      en: "Taxi, van services, parking rates and regional connections",
      lo: "ບໍລິການແທັກຊີ, ລົດຕູ້, ອັດຕາຈອດລົດ ແລະ ການເຊື່ອມຕໍ່ພາກພື້ນ",
      zh: "出租车、面包车、停车费及区域连接",
    },
    icon: Car,
    buttonText: {
      en: "Plan transport",
      lo: "ວາງແຜນການເດີນທາງ",
      zh: "规划交通",
    },
    buttonLink: "transports/to-from-airport",
    bgColor: "bg-gradient-to-br from-danger-400 to-danger-500",
    textColor: "text-white",
    buttonBg: "bg-white",
    buttonHover: "hover:bg-gray-100",
    buttonTextColor: "text-danger-600",
  },
  {
    id: "custom-services",
    title: {
      en: "Custom Services",
      lo: "ບໍລິການພິເສດ",
      zh: "定制服务",
    },
    description: {
      en: "Dedicated services for pregnancy, mobility assistance, and pets",
      lo: "ບໍລິການພິເສດສຳລັບແມ່ຍິງຖືພາ, ຜູ້ພິການ ແລະ ສັດລ້ຽງ",
      zh: "为孕妇、残障人士和宠物提供的专属服务",
    },
    icon: Accessibility,
    buttonText: {
      en: "Explore services",
      lo: "ສຳຫຼວດບໍລິການ",
      zh: "探索服务",
    },
    buttonLink: "guides/custom-services",
    bgColor: "bg-white",
    textColor: "text-gray-900",
    buttonBg: "bg-primary-600",
    buttonHover: "hover:bg-primary-700",
  },
];

interface Props {
  lang: Lang;
  service: ServiceCard;
}

const ServiceCardComponent: React.FC<Props> = ({ lang, service }) => {
  return (
    <div
      className={`${service.bgColor} ${service.textColor} rounded-2xl p-8 shadow-lg`}
    >
      {/* Icon */}
      <div className="mb-6">
        <service.icon className="h-12 w-12" />
      </div>

      {/* Title */}
      <h3 className="mb-4 text-2xl leading-tight font-bold">
        {service.title[lang]}
      </h3>

      {/* Description */}
      <p className="mb-6 text-base leading-relaxed opacity-90">
        {service.description[lang]}
      </p>

      {/* Button */}
      <Link
        href={`/${lang}/${service.buttonLink}`}
        className={`inline-flex items-center gap-2 rounded-full ${service.buttonBg} ${service.buttonHover} px-6 py-3 text-sm font-semibold ${service.buttonTextColor || "text-white"} transition-colors duration-200`}
      >
        {service.buttonText[lang]}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

interface ServiceCardComponentProps {
  lang: Lang;
}

export const UsefulServicesSection = ({ lang }: ServiceCardComponentProps) => {
  const { homepage: t } = createCommonI18n(lang);

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-16 md:py-24">
      <div className="container">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t.usefulServicesTitle}
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <ServiceCardComponent
              key={service.id}
              lang={lang}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
