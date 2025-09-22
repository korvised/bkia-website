import Link from "next/link";
import { ArrowRight, Car, MapPin, Music, Package, Utensils } from "lucide-react";

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
    iconColor: "text-blue-600"
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
    iconColor: "text-orange-600"
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
    iconColor: "text-teal-600"
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
    iconColor: "text-green-600"
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
    iconColor: "text-purple-600"
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
    iconColor: "text-indigo-600"
  }
];

export default function QuickServices() {
  return (
    <div className="flex-1 flex flex-col justify-center py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex space-x-8 bg-white rounded-full p-2 shadow-lg">
            {services.map((service, index) => {
              const IconComponent = service.icon;

              return (
                <Link
                  key={service.id}
                  href={service.href}
                  className={`flex flex-col items-center p-4 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === 0 ? "bg-bokeo-teal-500 text-white" : "text-gray-600 hover:text-bokeo-teal-600"
                  }`}
                >
                  <IconComponent className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium text-center leading-tight">
                    {service.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Service Content */}
        <div className="text-center mb-12">
          <div className="inline-block bg-bokeo-teal-500 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            服务承诺
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {services[0].title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {services[0].description}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(1).map((service) => {
            const IconComponent = service.icon;

            return (
              <Link
                key={service.id}
                href={service.href}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
              >

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3
                    className="text-xl font-bold text-gray-900 mb-2 group-hover:text-bokeo-teal-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {service.titleEn}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex items-center text-gray-400 group-hover:text-bokeo-teal-600 transition-colors">
                  <span className="text-sm font-medium mr-2">了解更多</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
