import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  Info,
  MapPin,
  Phone,
  Mail,
  XCircle,
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

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${getLocalizedText(service.name, language)} | Bokeo International Airport`,
    description: getLocalizedText(service.shortDescription, language),
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { lang, serviceId } = await params;
  const language = lang as Lang;
  const service = facilitiesServices.find((s) => s.id === serviceId);

  if (!service) notFound();

  const Icon = service.icon;
  const colors = getColorClasses(service.color);

  const pageContent = {
    backToServices: { en: "Back to Services", lo: "ກັບໄປບໍລິການທັງໝົດ", zh: "返回服务列表" },
    features: { en: "Features & Benefits", lo: "ຄຸນສົມບັດ ແລະ ຜົນປະໂຫຍດ", zh: "特点与优势" },
    guidelines: { en: "Guidelines & Tips", lo: "ຄຳແນະນຳ", zh: "指南与提示" },
    prohibitedItems: { en: "Prohibited Items", lo: "ສິ່ງຂອງຫ້າມ", zh: "禁止物品" },
    pricing: { en: "Pricing Information", lo: "ຂໍ້ມູນລາຄາ", zh: "价格信息" },
    location: { en: "Location", lo: "ສະຖານທີ່", zh: "位置" },
    operatingHours: { en: "Operating Hours", lo: "ເວລາໃຫ້ບໍລິການ", zh: "营业时间" },
    needHelp: { en: "Need Assistance?", lo: "ຕ້ອງການຄວາມຊ່ວຍເຫລືອບໍ?", zh: "需要帮助？" },
    helpDescription: {
      en: "Our staff are available to assist you. Visit our information desk or contact us for more details.",
      lo: "ພະນັກງານຂອງພວກເຮົາພ້ອມໃຫ້ຄວາມຊ່ວຍເຫລືອທ່ານ. ເຂົ້າຫາເຄົາເຕີ້ຂໍ້ມູນ ຫຼື ຕິດຕໍ່ພວກເຮົາ.",
      zh: "我们的工作人员随时为您提供帮助。请访问我们的信息台或联系我们了解更多详情。",
    },
  };

  return (
    <>
      {/* Service Header */}
      <section className="bg-[#f0fbfc] py-10">
        <div className="container">
          <Link
            href={`/${lang}/guides/facilities`}
            className="group mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#00AAAC]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {getLocalizedText(pageContent.backToServices, language)}
          </Link>

          <div className="flex items-start gap-5">
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 sm:h-16 sm:w-16",
                colors.border,
                colors.bg,
              )}
            >
              <Icon className={cn("h-7 w-7 sm:h-8 sm:w-8", colors.icon)} />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                Airport Facilities
              </p>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                {getLocalizedText(service.name, language)}
              </h1>
              <p className="mt-2 text-base font-medium text-gray-600 sm:text-lg">
                {getLocalizedText(service.shortDescription, language)}
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {getLocalizedText(service.description, language)}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
            {/* Left: features, guidelines, prohibited, pricing */}
            <div className="space-y-10 lg:col-span-2">
              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    Features
                  </p>
                  <h2 className="mb-4 text-xl font-bold text-gray-900">
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
                            "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                            colors.dot,
                          )}
                        />
                        {getLocalizedText(feature, language)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Guidelines */}
              {service.guidelines && service.guidelines.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    Guidelines
                  </p>
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Info className="h-5 w-5 text-blue-500" />
                    {getLocalizedText(pageContent.guidelines, language)}
                  </h2>
                  <div className="flex gap-3 border-l-4 border-blue-500 bg-blue-50 px-4 py-3 rounded-r-lg">
                    <ul className="space-y-3">
                      {service.guidelines.map((guideline, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-700 sm:text-base"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                          {getLocalizedText(guideline, language)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Prohibited Items */}
              {service.prohibitedItems && service.prohibitedItems.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    Restrictions
                  </p>
                  <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    {getLocalizedText(pageContent.prohibitedItems, language)}
                  </h2>
                  <div className="flex gap-3 border-l-4 border-red-500 bg-red-50 px-4 py-3 rounded-r-lg">
                    <ul className="space-y-3">
                      {service.prohibitedItems.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-700 sm:text-base"
                        >
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                          {getLocalizedText(item, language)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Pricing */}
              {service.pricing && service.pricing.length > 0 && (
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
                    Pricing
                  </p>
                  <h2 className="mb-4 text-xl font-bold text-gray-900">
                    {getLocalizedText(pageContent.pricing, language)}
                  </h2>
                  <div className="overflow-hidden border-t border-gray-200">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-100">
                        {service.pricing.map((item, index) => (
                          <tr key={index}>
                            <td className="py-3 pr-4 text-sm font-medium text-gray-900 sm:text-base">
                              {getLocalizedText(item.item, language)}
                            </td>
                            <td className="py-3 text-right">
                              <span className="text-lg font-bold text-gray-800 sm:text-xl">
                                {item.price}
                              </span>
                              {item.unit && (
                                <span className="ml-1.5 text-xs text-gray-500 sm:text-sm">
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

            {/* Right: Location & Hours */}
            <div className="space-y-8">
              {service.location && service.location.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin className={`h-4 w-4 ${colors.icon}`} />
                    <h2 className="text-lg font-bold text-gray-900">
                      {getLocalizedText(pageContent.location, language)}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {service.location.map((loc, index) => (
                      <div key={index} className={`p-4 text-sm ${colors.bg}`}>
                        <p className="mb-1.5 font-semibold text-gray-900">
                          {getLocalizedText(loc.area, language)}
                        </p>
                        {loc.floor && (
                          <p className="text-gray-600">
                            {getLocalizedText(loc.floor, language)}
                          </p>
                        )}
                        {loc.nearBy && (
                          <p className="text-gray-500">
                            {getLocalizedText(loc.nearBy, language)}
                          </p>
                        )}
                        {loc.zone && (
                          <p className="mt-1.5 text-xs text-gray-500">
                            {loc.zone}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.operatingHours && (
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Clock className={`h-4 w-4 ${colors.icon}`} />
                    <h2 className="text-lg font-bold text-gray-900">
                      {getLocalizedText(pageContent.operatingHours, language)}
                    </h2>
                  </div>
                  <p className="text-base font-semibold text-gray-700">
                    {getLocalizedText(service.operatingHours, language)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Need Help CTA */}
      <section className="bg-[#00AAAC] py-10">
        <div className="container">
          <h3 className="mb-2 text-xl font-bold text-white">
            {getLocalizedText(pageContent.needHelp, language)}
          </h3>
          <p className="mb-6 max-w-lg text-sm leading-relaxed text-white/80">
            {getLocalizedText(pageContent.helpDescription, language)}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+85684260179"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#00AAAC] transition-colors hover:bg-white/90"
            >
              <Phone className="h-4 w-4" />
              +856 84 260 179
            </a>
            <a
              href="mailto:bkia@bokeointernationalairport.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
