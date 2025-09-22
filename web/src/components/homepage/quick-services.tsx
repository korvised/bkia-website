import Link from "next/link";
import {
  ArrowRight,
  Car,
  MapPin,
  Music,
  Package,
  Utensils,
} from "lucide-react";
import { Lang } from "@/types/language";

const services = [
  {
    id: "flights",
    title: "机场交通",
    titleEn: "Airport Transportation",
    description: "为您提供便捷的路车、出租车、大巴车等交通资讯",
    descriptionEn: "Buses, taxis, parking, and directions",
    icon: Car,
    href: "/transportation",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "dining",
    title: "餐饮购物",
    titleEn: "Dining & Shopping",
    description: "来饮食、购物、文化活动",
    descriptionEn: "Restaurants, cafes, and duty-free shopping",
    icon: Utensils,
    href: "/services/dining-shopping",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    id: "services",
    title: "楠悦服务",
    titleEn: "Joyful Services",
    description: "微笑服务",
    descriptionEn: "Entertainment, relaxation, and family areas",
    icon: MapPin,
    href: "/services/joyful-service",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    id: "cargo",
    title: "航空货运",
    titleEn: "Air Cargo",
    description: "货物追踪和运输服务",
    descriptionEn: "Package tracking and shipping services",
    icon: Package,
    href: "/cargo",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "lost-found",
    title: "失物招领",
    titleEn: "Lost & Found",
    description: "投诉建议",
    descriptionEn: "Report and claim lost items",
    icon: Music,
    href: "/services/lost-found",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: "cultural",
    title: "文化活动",
    titleEn: "Cultural Activities",
    description: "发展历程",
    descriptionEn: "Exhibitions, performances, and workshops",
    icon: Music,
    href: "/services/cultural-interaction",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
];

interface QuickServicesProps {
  lang: Lang;
}

export default function QuickServices({ lang }: QuickServicesProps) {
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
                      ? "bg-bokeo-teal-500 text-white"
                      : "hover:text-bokeo-teal-600 text-gray-600"
                  }`}
                >
                  <IconComponent className="mb-2 h-6 w-6" />
                  <span className="text-center text-xs leading-tight font-medium">
                    {service.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Service Content */}
        <div className="mb-12 text-center">
          <div className="bg-bokeo-teal-500 mb-4 inline-block rounded-full px-6 py-2 text-sm font-medium text-white">
            服务承诺
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {services[0].title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            {services[0].description}
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
                  <h3 className="group-hover:text-bokeo-teal-600 mb-2 text-xl font-bold text-gray-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-500">
                    {service.titleEn}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="group-hover:text-bokeo-teal-600 flex items-center text-gray-400 transition-colors">
                  <span className="mr-2 text-sm font-medium">了解更多</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
