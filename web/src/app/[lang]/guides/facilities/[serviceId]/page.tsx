import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  HelpCircle,
  MapPin,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import { Lang } from "@/types/language";
import { facilitiesServices, getColorClasses } from "@/data/guide";
import { cn, getLocalizedText } from "@/lib";

interface ServiceDetailPageProps {
  params: Promise<{ lang: string; serviceId: string }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { lang, serviceId } = await params;
  const language = lang as Lang;

  const service = facilitiesServices.find((s) => s.id === serviceId);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const serviceName = getLocalizedText(service.name, language);
  const description = getLocalizedText(service.shortDescription, language);

  return {
    title: `${serviceName} | Bokeo International Airport`,
    description: description,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { lang, serviceId } = await params;
  const language = lang as Lang;

  const service = facilitiesServices.find((s) => s.id === serviceId);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  const pageContent = {
    backToServices: {
      en: "Back to Services",
      lo: "ກັບໄປບໍລິການທັງໝົດ",
      zh: "返回服务列表",
    },
    features: {
      en: "Features & Benefits",
      lo: "ຄຸນສົມບັດ ແລະ ຜົນປະໂຫຍດ",
      zh: "特点与优势",
    },
    guidelines: {
      en: "Guidelines & Tips",
      lo: "ຄຳແນະນຳ",
      zh: "指南与提示",
    },
    prohibitedItems: {
      en: "Prohibited Items",
      lo: "ສິ່ງຂອງຫ້າມ",
      zh: "禁止物品",
    },
    pricing: {
      en: "Pricing Information",
      lo: "ຂໍ້ມູນລາຄາ",
      zh: "价格信息",
    },
    location: {
      en: "Location",
      lo: "ສະຖານທີ່",
      zh: "位置",
    },
    operatingHours: {
      en: "Operating Hours",
      lo: "ເວລາໃຫ້ບໍລິການ",
      zh: "营业时间",
    },
    contact: {
      en: "Contact Information",
      lo: "ຂໍ້ມູນຕິດຕໍ່",
      zh: "联系信息",
    },
    needHelp: {
      en: "Need Assistance?",
      lo: "ຕ້ອງການຄວາມຊ່ວຍເຫລືອບໍ?",
      zh: "需要帮助？",
    },
    helpDescription: {
      en: "Our staff are available to assist you. Visit our information desk or contact us for more details.",
      lo: "ພະນັກງານຂອງພວກເຮົາພ້ອມໃຫ້ຄວາມຊ່ວຍເຫລືອທ່ານ. ເຂົ້າຫາເຄົາເຕີ້ຂໍ້ມູນ ຫຼື ຕິດຕໍ່ພວກເຮົາເພື່ອຂໍ້ມູນເພີ່ມເຕີມ.",
      zh: "我们的工作人员随时为您提供帮助。请访问我们的信息台或联系我们了解更多详情。",
    },
    phone: {
      en: "Phone",
      lo: "ໂທລະສັບ",
      zh: "电话",
    },
    email: {
      en: "Email",
      lo: "ອີເມວ",
      zh: "邮箱",
    },
  };

  const colors = getColorClasses(service.color);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Back Navigation */}
      <div className="container">
        <Link
          href={`/${lang}/guides/facilities`}
          className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 text-sm font-medium transition-colors sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" />
          {getLocalizedText(pageContent.backToServices, language)}
        </Link>
      </div>

      {/* Service Header */}
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex-shrink-0">
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-xl border-2 sm:h-24 sm:w-24",
              colors.border,
              colors.bg,
            )}
          >
            <Icon className={cn("h-10 w-10 sm:h-12 sm:w-12", colors.icon)} />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-3 sm:text-3xl lg:text-4xl">
            {getLocalizedText(service.name, language)}
          </h1>
          <p className="mb-3 text-base font-medium text-gray-700 sm:text-lg">
            {getLocalizedText(service.shortDescription, language)}
          </p>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            {getLocalizedText(service.description, language)}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
                {getLocalizedText(pageContent.features, language)}
              </h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-700 sm:text-base"
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full",
                        colors.dot,
                      )}
                    />
                    <span>{getLocalizedText(feature, language)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guidelines */}
          {service.guidelines && service.guidelines.length > 0 && (
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5 sm:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-900 sm:text-xl">
                <span className="text-blue-600">ℹ️</span>
                {getLocalizedText(pageContent.guidelines, language)}
              </h2>
              <ul className="space-y-3">
                {service.guidelines.map((guideline, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-blue-800 sm:text-base"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-blue-600">
                      •
                    </span>
                    <span>{getLocalizedText(guideline, language)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prohibited Items */}
          {service.prohibitedItems && service.prohibitedItems.length > 0 && (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5 sm:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-900 sm:text-xl">
                <span className="text-red-600">⚠️</span>
                {getLocalizedText(pageContent.prohibitedItems, language)}
              </h2>
              <ul className="space-y-3">
                {service.prohibitedItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-red-800 sm:text-base"
                  >
                    <span className="mt-0.5 flex-shrink-0 text-red-600">✕</span>
                    <span>{getLocalizedText(item, language)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pricing */}
          {service.pricing && service.pricing.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl">
                <span className={`h-2 w-2 rounded-full ${colors.bg}`} />
                {getLocalizedText(pageContent.pricing, language)}
              </h2>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {service.pricing.map((item, index) => (
                      <tr
                        key={index}
                        className={`transition-colors ${colors.hover}`}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 sm:text-base">
                          {getLocalizedText(item.item, language)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-lg font-bold text-gray-700 sm:text-xl">
                            {item.price}
                          </span>
                          {item.unit && (
                            <span className="ml-2 text-xs text-gray-600 sm:text-sm">
                              {getLocalizedText(item.unit, language)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Location & Contact */}
        <div className="space-y-6">
          {/* Location */}
          {service.location && service.location.length > 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                <MapPin className={`h-5 w-5 ${colors.icon}`} />
                {getLocalizedText(pageContent.location, language)}
              </h2>
              <div className="space-y-4">
                {service.location.map((loc, index) => (
                  <div
                    key={index}
                    className={`rounded-lg ${colors.bg} p-4 text-sm`}
                  >
                    <p className="mb-2 font-semibold text-gray-900">
                      {getLocalizedText(loc.area, language)}
                    </p>
                    {loc.floor && (
                      <p className="mb-1 text-gray-700">
                        {getLocalizedText(loc.floor, language)}
                      </p>
                    )}
                    {loc.nearBy && (
                      <p className="text-gray-600">
                        {getLocalizedText(loc.nearBy, language)}
                      </p>
                    )}
                    {loc.zone && (
                      <p className="mt-2 text-xs text-gray-600">{loc.zone}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Operating Hours */}
          {service.operatingHours && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
                <Clock className={`h-5 w-5 ${colors.icon}`} />
                {getLocalizedText(pageContent.operatingHours, language)}
              </h2>
              <p className="text-base font-semibold text-gray-700">
                {getLocalizedText(service.operatingHours, language)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Need Help Banner */}
      <div className="container">
        <div className="border-primary-200 bg-primary-50 rounded-xl border-2 p-5 sm:p-6">
          <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl">
            <HelpCircle className="text-primary-600 h-5 w-5 sm:h-6 sm:w-6" />
            {getLocalizedText(pageContent.needHelp, language)}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base">
            {getLocalizedText(pageContent.helpDescription, language)}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+85684260179"
              className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors sm:px-5 sm:py-2.5"
            >
              <Phone className="h-4 w-4" />
              +856 84 260 179
            </a>
            <a
              href="mailto:bkia@bokeointernationalairport.com"
              className="border-primary-600 text-primary-600 hover:bg-primary-50 inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors sm:px-5 sm:py-2.5"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
