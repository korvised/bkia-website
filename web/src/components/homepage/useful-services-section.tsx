import {
  Accessibility,
  ArrowRight,
  Car,
  LucideIcon,
  Luggage,
} from "lucide-react";
import Link from "next/link";
import { Lang, MultilingualText } from "@/types/language";

interface ServiceCardComponentProps {
  lang: Lang;
}

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
    id: "special-assistance",
    title: {
      en: "Special assistance",
      lo: "ການຊ່ວຍເຫຼືອພິເສດ",
      zh: "特殊协助",
    },
    description: {
      en: "Find all the help you need for your journey",
      lo: "ຊອກຫາຄວາມຊ່ວຍເຫຼືອທັງໝົດທີ່ທ່ານຕ້ອງການສໍາລັບການເດີນທາງ",
      zh: "为您的旅程找到所需的所有帮助",
    },
    icon: Accessibility,
    buttonText: {
      en: "Explore services",
      lo: "ສຳຫຼວດບໍລິການ",
      zh: "探索服务",
    },
    buttonLink: "/guides/facilities",
    bgColor: "bg-gradient-to-br from-primary-50 to-primary-100",
    textColor: "text-primary-900",
    buttonBg: "bg-primary-600",
    buttonHover: "hover:bg-primary-700",
  },
  {
    id: "traffic-guidance",
    title: {
      en: "Traffic guidance",
      lo: "ຄຳແນະນຳດ້ານຈະລາຈອນ",
      zh: "交通导引",
    },
    description: {
      en: "Buses, taxis, parking and car rental",
      lo: "ລົດເມ, ແທັກຊີ, ບ່ອນຈອດລົດ ແລະ ການເຊົ່າລົດ",
      zh: "大巴、出租车、停车、租车",
    },
    icon: Car,
    buttonText: {
      en: "View guidance",
      lo: "ເບິ່ງຄຳແນະນຳ",
      zh: "查看导引",
    },
    buttonLink: "/transports/to-from-airport",
    bgColor: "bg-gradient-to-br from-danger-400 to-danger-500",
    textColor: "text-white",
    buttonBg: "bg-white",
    buttonHover: "hover:bg-gray-100",
    buttonTextColor: "text-danger-600",
  },
  {
    id: "flight-guide",
    title: {
      en: "Flight Guide",
      lo: "ຄູ່ມືການເດີນທາງ",
      zh: "乘机指南",
    },
    description: {
      en: "Passenger flight process, Facility service",
      lo: "ຂັ້ນຕອນການເດີນທາງ ແລະ ບໍລິການສິ່ງອຳນວຍຄວາມສະດວກ",
      zh: "旅客乘机流程、设施服务",
    },
    icon: Luggage,
    buttonText: {
      en: "View guide",
      lo: "ເບິ່ງຄູ່ມື",
      zh: "查看指南",
    },
    buttonLink: "/guides",
    bgColor: "bg-white",
    textColor: "text-gray-900",
    buttonBg: "bg-primary-600",
    buttonHover: "hover:bg-primary-700",
  },
];

function ServiceCardComponent({
  lang,
  service,
}: {
  lang: Lang;
  service: ServiceCard;
}) {
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
}

export default function UsefulServicesSection({
  lang,
}: ServiceCardComponentProps) {
  const sectionTitle: MultilingualText = {
    en: "Useful services and information",
    lo: "ບໍລິການ ແລະ ຂໍ້ມູນທີ່ເປັນປະໂຫຍດ",
    zh: "有用的服务和信息",
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-16 md:py-24">
      <div className="container">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {sectionTitle[lang]}
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
}
