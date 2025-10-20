import Image from "next/image";
import { Metadata } from "next";
import {
  AlertCircle,
  Clock,
  Info,
  MapPin,
  Package,
  Plane,
  RefreshCcw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Lang } from "@/types/language";

interface TransferGuidePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: TransferGuidePageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Transfer Guide",
      description:
        "Transit and transfer guide for connecting flights at Bokeo International Airport. Information about transfer procedures, minimum connection times, and transfer facilities.",
    },
    lo: {
      title: "ຄູ່ມືການໂອນຍ້າຍ",
      description:
        "ຄູ່ມືການຖ່າຍທອດ ແລະ ການໂອນຍ້າຍສຳລັບຖ້ຽວບິນເຊື່ອມຕໍ່ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຂໍ້ມູນກ່ຽວກັບຂະບວນການໂອນຍ້າຍ, ເວລາເຊື່ອມຕໍ່ຕ່ຳສຸດ ແລະ ສິ່ງອຳນວຍຄວາມສະດວກໃນການໂອນຍ້າຍ.",
    },
    zh: {
      title: "转机指南",
      description:
        "博胶国际机场转机航班的中转和换乘指南。了解转机流程、最短转机时间和转机设施的信息。",
    },
  };

  return {
    title: metadata[lang as Lang].title,
    description: metadata[lang as Lang].description,
  };
}

export default async function TransferGuidePage() {
  const airlines = [
    {
      name: "Lao Airlines",
      code: "QV",
      logo: "/images/airlines/lao-airlines.png",
    },
    {
      name: "Lao Skyway",
      code: "LK",
      logo: "/images/airlines/lao-skyway.png",
    },
    {
      name: "Lanexang Airlines",
      code: "LX",
      logo: "/images/airlines/lanexang.png",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex-shrink-0">
          <div className="bg-primary-100 flex h-16 w-16 items-center justify-center rounded-xl sm:h-20 sm:w-20">
            <RefreshCcw className="text-primary-600 h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-3 sm:text-3xl">
            Transferring at Bokeo International Airport
          </h1>
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            Transferring between flights, please follow this guide for a smooth
            connection. Currently, we operate domestic transfers with our
            partner airlines.
          </p>
        </div>
      </div>

      {/* Important Notice - Orange */}
      <div className="rounded-r-lg border-l-4 border-orange-500 bg-orange-50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600 sm:h-6 sm:w-6" />
          <div>
            <p className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
              Important:
            </p>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              Upon arrival, proceed immediately to the Transfer Counter in the
              arrivals hall. Keep your booking confirmation and boarding pass
              ready for verification.
            </p>
          </div>
        </div>
      </div>

      {/* Operating Airlines with Images */}
      <div className="from-primary-50 to-primary-100 border-primary-200 rounded-xl border bg-gradient-to-br p-4 sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 sm:mb-5 sm:text-xl">
          <Plane className="text-primary-600 h-5 w-5 sm:h-6 sm:w-6" />
          Airlines Operating Domestic Transfers
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {airlines.map((airline, index) => (
            <div
              key={index}
              className="border-primary-200 rounded-lg border bg-white p-4 transition-shadow hover:shadow-md sm:p-5"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg sm:h-24 sm:w-24">
                  <Image
                    src={airline.logo}
                    alt={airline.name}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
                <h3 className="mb-1 text-sm font-bold text-gray-900 sm:text-base">
                  {airline.name}
                </h3>
                <span className="bg-primary-50 rounded-full px-3 py-1 text-xs text-gray-600 sm:text-sm">
                  {airline.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer Process Steps */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-8">
        <h2 className="mb-5 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
          Transfer Process
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {/* Step 1 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary-600 flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
                1
              </div>
            </div>
            <div className="flex-grow pt-0.5 sm:pt-1">
              <h3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                Proceed to Transfer Counter
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                After disembarking, follow signs to the Transfer Counter located
                in the main arrivals hall. The counter is open during all flight
                operations and staffed by airline representatives.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary-600 flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
                2
              </div>
            </div>
            <div className="flex-grow pt-0.5 sm:pt-1">
              <h3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                Complete Check-in
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                Present your documents to receive your new boarding pass for the
                connecting flight.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="bg-primary-50 border-primary-200 rounded-lg border p-3 sm:p-4">
                  <h4 className="mb-2 text-xs font-semibold text-gray-900 sm:text-sm">
                    Required Documents:
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-700 sm:text-sm">
                    <li>✓ Valid ID or passport</li>
                    <li>✓ Original boarding pass</li>
                    <li>✓ Booking confirmation</li>
                    <li>✓ Baggage tags (if checked)</li>
                  </ul>
                </div>
                <div className="bg-primary-50 border-primary-200 rounded-lg border p-3 sm:p-4">
                  <h4 className="mb-2 text-xs font-semibold text-gray-900 sm:text-sm">
                    You'll Receive:
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-700 sm:text-sm">
                    <li>✓ New boarding pass</li>
                    <li>✓ Seat assignment</li>
                    <li>✓ Gate information</li>
                    <li>✓ Departure time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary-600 flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
                3
              </div>
            </div>
            <div className="flex-grow pt-0.5 sm:pt-1">
              <h3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                Security Screening
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                All transfer passengers must pass through security screening
                before proceeding to the departure area.
              </p>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                <div className="flex items-start gap-2 text-xs text-gray-700 sm:text-sm">
                  <ShieldCheck className="text-primary-600 mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                  <div className="space-y-1">
                    <p>• Remove laptops and electronics from bags</p>
                    <p>• Liquids ≤100ml in clear plastic bag</p>
                    <p>• Remove jackets, belts, and metal items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary-600 flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
                4
              </div>
            </div>
            <div className="flex-grow pt-0.5 sm:pt-1">
              <h3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                Proceed to Departure Gate
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                Follow signs to your departure gate as shown on your boarding
                pass. Monitor information displays for any changes.
              </p>
              <div className="bg-primary-50 border-primary-200 rounded-lg border p-3 sm:p-4">
                <div className="grid gap-3 text-xs sm:grid-cols-2 sm:text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="text-primary-600 mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Arrive at gate:
                      </p>
                      <p className="text-gray-700">
                        30 minutes before departure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="text-primary-600 mt-0.5 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Gate closes:
                      </p>
                      <p className="text-gray-700">
                        10 minutes before departure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Baggage Information */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <Package className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 sm:h-6 sm:w-6" />
          <div>
            <h3 className="mb-3 text-base font-bold text-gray-900 sm:text-lg">
              Baggage Transfer Information
            </h3>
            <div className="space-y-3 text-sm text-gray-700 sm:text-base">
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  Through-Checked Baggage:
                </p>
                <p className="leading-relaxed">
                  If your baggage is checked through to your final destination,
                  inform the transfer counter staff. They will coordinate the
                  transfer for you – you don't need to collect your bags.
                </p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  Separate Tickets:
                </p>
                <p className="leading-relaxed">
                  If you purchased separate tickets, you must collect your
                  baggage from the baggage claim area and re-check it at the
                  transfer counter for your connecting flight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MCT Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-8">
        <div className="mb-5 flex items-start gap-3 sm:mb-6 sm:items-center">
          <Clock className="text-primary-600 mt-1 h-5 w-5 flex-shrink-0 sm:mt-0 sm:h-6 sm:w-6" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Minimum Connection Time (MCT)
            </h2>
            <p className="mt-1 text-xs text-gray-600 sm:text-sm">
              Effective from July 1, 2025
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-primary-600 text-white">
                <th className="border-primary-700 border px-3 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-base">
                  Transfer Type
                </th>
                <th className="border-primary-700 border px-3 py-3 text-center text-xs font-semibold sm:px-6 sm:py-4 sm:text-base">
                  Same Terminal
                </th>
                <th className="border-primary-700 border px-3 py-3 text-center text-xs font-semibold sm:px-6 sm:py-4 sm:text-base">
                  Different Terminal
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-primary-50 hover:bg-primary-100 transition-colors">
                <td className="border border-gray-300 px-3 py-3 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  Domestic to Domestic
                </td>
                <td className="border border-gray-300 px-3 py-3 text-center text-xs font-bold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  60 minutes
                </td>
                <td className="border border-gray-300 px-3 py-3 text-center text-xs font-bold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  90 minutes
                </td>
              </tr>
              <tr className="bg-white transition-colors hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-3 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  International to Domestic
                </td>
                <td className="border border-gray-300 px-3 py-3 text-center text-xs font-bold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  120 minutes
                </td>
                <td className="border border-gray-300 px-3 py-3 text-center text-xs font-bold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  150 minutes
                </td>
              </tr>
              <tr className="bg-primary-50 hover:bg-primary-100 transition-colors">
                <td className="border border-gray-300 px-3 py-3 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  Domestic to International
                </td>
                <td className="border border-gray-300 px-3 py-3 text-center text-xs font-bold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  90 minutes
                </td>
                <td className="border border-gray-300 px-3 py-3 text-center text-xs font-bold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  120 minutes
                </td>
              </tr>
              <tr className="bg-white transition-colors hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-3 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  International to International
                </td>
                <td className="border border-gray-300 px-3 py-3 text-center text-xs font-bold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  90 minutes
                </td>
                <td className="border border-gray-300 px-3 py-3 text-center text-xs font-bold text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                  —
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-r-lg border-l-4 border-orange-500 bg-orange-50 p-3 sm:mt-5 sm:p-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-600 sm:h-5 sm:w-5" />
            <p className="text-xs text-gray-800 sm:text-sm">
              <strong className="text-gray-900">Important:</strong> MCT is the
              minimum required time. We recommend allowing extra time during
              peak hours for a comfortable transfer experience.
            </p>
          </div>
        </div>
      </div>

      {/* Help & Contact */}
      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900 sm:mb-4 sm:text-lg">
          <Info className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
          Need Assistance?
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <MapPin className="text-primary-600 mt-1 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
              <div>
                <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
                  Transfer Counter
                </h4>
                <p className="mb-2 text-xs text-gray-700 sm:text-sm">
                  Main arrivals hall
                </p>
                <p className="text-primary-600 text-xs font-medium sm:text-sm">
                  Open during flight operations
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <Users className="text-primary-600 mt-1 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
              <div>
                <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
                  Airport Information
                </h4>
                <p className="mb-2 text-xs text-gray-700 sm:text-sm">
                  24/7 assistance available
                </p>
                <p className="text-primary-600 text-xs font-medium sm:text-sm">
                  Multilingual staff
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
