import { Accessibility, ArrowRight, BookOpen, Car, LucideIcon } from "lucide-react";
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
  accentClass: string;
  iconBgClass: string;
  iconColorClass: string;
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
      en: "Essential step-by-step guide for departures and arrivals.",
      lo: "ຄູ່ມືແນະນຳຂັ້ນຕອນການຂາອອກ ແລະ ຂາເຂົ້າ ຢ່າງລະອຽດ.",
      zh: "出发与到达的必要详细指南。",
    },
    icon: BookOpen,
    buttonText: { en: "View guide", lo: "ເບິ່ງຄູ່ມື", zh: "查看指南" },
    buttonLink: "guides/departures",
    accentClass: "bg-primary",
    iconBgClass: "bg-primary/10",
    iconColorClass: "text-primary",
  },
  {
    id: "transport",
    title: {
      en: "Transport & Parking",
      lo: "ການຂົນສົ່ງ ແລະ ບ່ອນຈອດລົດ",
      zh: "交通与停车",
    },
    description: {
      en: "Taxi, van services and parking fee information",
      lo: "ບໍລິການລົດແທັກຊີ, ລົດຕູ້ ແລະ ຂໍ້ມູນຄ່າຝາກລົດ",
      zh: "出租车、面包车服务及停车收费详情",
    },
    icon: Car,
    buttonText: {
      en: "Plan transport",
      lo: "ວາງແຜນການເດີນທາງ",
      zh: "规划交通",
    },
    buttonLink: "services/taxi",
    accentClass: "bg-danger",
    iconBgClass: "bg-danger-50",
    iconColorClass: "text-danger-500",
  },
  {
    id: "custom-services",
    title: {
      en: "Special Services",
      lo: "ບໍລິການພິເສດ",
      zh: "特殊服务",
    },
    description: {
      en: "Dedicated services for pregnancy, mobility assistance, and pets",
      lo: "ບໍລິການສຳລັບແມ່ຍິງຖືພາ, ຜູ້ພິການ ແລະ ສັດລ້ຽງ",
      zh: "为孕妇、残障人士和宠物提供的专属服务",
    },
    icon: Accessibility,
    buttonText: { en: "Explore services", lo: "ສຳຫຼວດບໍລິການ", zh: "探索服务" },
    buttonLink: "guides/custom-services",
    accentClass: "bg-secondary",
    iconBgClass: "bg-secondary-50",
    iconColorClass: "text-secondary-500",
  },
];

const SERVICE_TAG: Record<Lang, string> = {
  en: "Our Services",
  lo: "ບໍລິການຂອງເຮົາ",
  zh: "我们的服务",
};

interface ServiceCardItemProps {
  lang: Lang;
  service: ServiceCard;
}

const ServiceCardItem: React.FC<ServiceCardItemProps> = ({ lang, service }) => (
  <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    {/* Color accent bar */}
    <div className={`h-1 w-full ${service.accentClass}`} />

    <div className="flex flex-1 flex-col p-6">
      {/* Icon */}
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${service.iconBgClass}`}
      >
        <service.icon className={`h-6 w-6 ${service.iconColorClass}`} />
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-bold text-gray-900">
        {service.title[lang]}
      </h3>

      {/* Description */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-500">
        {service.description[lang]}
      </p>

      {/* CTA */}
      <Link
        href={`/${lang}/${service.buttonLink}`}
        className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-3 ${service.iconColorClass}`}
      >
        {service.buttonText[lang]}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
);

interface UsefulServicesSectionProps {
  lang: Lang;
}

export const UsefulServicesSection = ({ lang }: UsefulServicesSectionProps) => {
  const { homepage: t } = createCommonI18n(lang);

  return (
    <section className="w-full bg-gray-50 py-14 md:py-20">
      <div className="container">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12">
          <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            {SERVICE_TAG[lang]}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t.usefulServicesTitle}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <ServiceCardItem key={service.id} lang={lang} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
