import {
  AlertCircle,
  BoxIcon,
  CheckCircle,
  DollarSign,
  FileText,
  Mail,
  MapPin,
  Package,
  Phone,
  Plane,
  Scale,
  Shield,
  Truck,
} from "lucide-react";
// import { Lang } from "@/types/language";

/*interface AirCargoPageProps {
  params: Promise<{ lang: Lang }>;
}*/

interface CargoService {
  id: string;
  title: string;
  icon: any;
  description: string;
  features: string[];
}

interface CargoRate {
  destination: string;
  weight: string;
  rate: string;
  transitTime: string;
}

export default async function AirCargoPage() {
  const cargoServices: CargoService[] = [
    {
      id: "express-cargo",
      title: "Express Cargo",
      icon: Plane,
      description:
        "Time-critical shipments with priority handling and expedited delivery",
      features: [
        "Priority loading and unloading",
        "Expedited customs clearance",
        "Door-to-door delivery available",
        "Real-time tracking",
        "Guaranteed delivery time",
      ],
    },
    {
      id: "standard-cargo",
      title: "Standard Cargo",
      icon: Package,
      description: "Cost-effective solution for regular freight shipments",
      features: [
        "Competitive pricing",
        "Reliable delivery schedules",
        "Weight range: 1kg - 5,000kg",
        "Consolidation services",
        "Storage facilities available",
      ],
    },
    {
      id: "perishable-goods",
      title: "Perishable Goods",
      icon: BoxIcon,
      description:
        "Temperature-controlled handling for fresh produce, flowers, and pharmaceuticals",
      features: [
        "Climate-controlled storage",
        "Cold chain management",
        "Quick transfer times",
        "Special handling procedures",
        "Quality monitoring",
      ],
    },
    {
      id: "hazardous-materials",
      title: "Dangerous Goods",
      icon: Shield,
      description:
        "Certified handling of hazardous materials following IATA regulations",
      features: [
        "IATA DGR compliant",
        "Certified staff",
        "Secure storage",
        "Proper documentation",
        "Safety protocols",
      ],
    },
    {
      id: "oversized-cargo",
      title: "Oversized & Heavy Cargo",
      icon: Truck,
      description:
        "Specialized handling for large, heavy, or odd-sized shipments",
      features: [
        "Heavy machinery transport",
        "Custom packaging solutions",
        "Specialized equipment",
        "Load planning services",
        "Dimensional weight pricing",
      ],
    },
    {
      id: "valuable-cargo",
      title: "Valuable Cargo",
      icon: Shield,
      description:
        "High-security handling for valuable and sensitive shipments",
      features: [
        "24/7 security monitoring",
        "Secure storage facilities",
        "Insurance options",
        "Sealed packaging",
        "Chain of custody documentation",
      ],
    },
  ];

  const sampleRates: CargoRate[] = [
    {
      destination: "Vientiane, Laos",
      weight: "Up to 50 kg",
      rate: "From $3.50/kg",
      transitTime: "1-2 days",
    },
    {
      destination: "Bangkok, Thailand",
      weight: "Up to 100 kg",
      rate: "From $4.20/kg",
      transitTime: "1-2 days",
    },
    {
      destination: "Chiang Mai, Thailand",
      weight: "Up to 100 kg",
      rate: "From $4.00/kg",
      transitTime: "1-2 days",
    },
    {
      destination: "Kunming, China",
      weight: "Up to 100 kg",
      rate: "From $5.50/kg",
      transitTime: "2-3 days",
    },
    {
      destination: "Yangon, Myanmar",
      weight: "Up to 100 kg",
      rate: "From $4.80/kg",
      transitTime: "2-3 days",
    },
    {
      destination: "Regional (SEA)",
      weight: "Up to 500 kg",
      rate: "From $3.80/kg",
      transitTime: "3-5 days",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12">
      {/* Page Header */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
        <div className="flex-shrink-0">
          <div className="bg-primary-100 flex h-16 w-16 items-center justify-center rounded-xl sm:h-20 sm:w-20">
            <Package className="text-primary-600 h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-3 sm:text-4xl">
            Air Cargo Services
          </h1>
          <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
            Bokeo International Airport offers comprehensive air cargo services
            connecting Northern Laos to regional and international destinations.
            Our modern cargo facilities and experienced team ensure safe,
            efficient, and reliable handling of your freight.
          </p>
        </div>
      </div>

      {/* Quick Contact Notice */}
      <div className="rounded-r-lg border-l-4 border-orange-500 bg-orange-50 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600 sm:h-6 sm:w-6" />
          <div>
            <p className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
              Need Cargo Assistance?
            </p>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              Contact our cargo team for bookings, rate quotations, and
              specialized shipping requirements. We're here to help with all
              your freight needs.
            </p>
          </div>
        </div>
      </div>

      {/* Cargo Services */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Our Cargo Services
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {cargoServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg sm:p-6"
              >
                <div className="mb-3 flex items-start gap-3 sm:mb-4 sm:gap-4">
                  <div className="bg-primary-100 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12">
                    <Icon className="text-primary-600 h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-gray-900 sm:text-lg">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-600 sm:text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-primary-600 mt-0.5 h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4" />
                      <span className="text-xs text-gray-700 sm:text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shipping Process */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
          How to Ship Your Cargo
        </h2>

        <div className="space-y-5 sm:space-y-6">
          {/* Step 1 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-full text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
                1
              </div>
            </div>
            <div className="flex-grow pt-0.5 sm:pt-1">
              <h3 className="mb-1.5 text-base font-semibold text-gray-900 sm:mb-2 sm:text-lg">
                Request Quote & Book
              </h3>
              <p className="mb-2 text-sm leading-relaxed text-gray-700 sm:mb-3 sm:text-base">
                Contact our cargo team with shipment details including weight,
                dimensions, destination, and desired delivery time. We'll
                provide a competitive quote and booking confirmation.
              </p>
              <div className="bg-primary-50 border-primary-200 rounded-lg border p-3 sm:p-4">
                <p className="text-xs text-gray-700 sm:text-sm">
                  <strong>Required Information:</strong> Shipper details,
                  consignee details, cargo description, weight, dimensions,
                  value, and any special handling requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-full text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
                2
              </div>
            </div>
            <div className="flex-grow pt-0.5 sm:pt-1">
              <h3 className="mb-1.5 text-base font-semibold text-gray-900 sm:mb-2 sm:text-lg">
                Prepare Documentation
              </h3>
              <p className="mb-2 text-sm leading-relaxed text-gray-700 sm:mb-3 sm:text-base">
                Complete all necessary shipping documents including commercial
                invoice, packing list, air waybill (AWB), and any required
                permits or certificates.
              </p>
              <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-2.5 sm:p-3">
                  <p className="mb-1 text-xs font-semibold text-gray-900 sm:text-sm">
                    Standard Documents:
                  </p>
                  <ul className="space-y-0.5 text-xs text-gray-700 sm:space-y-1 sm:text-sm">
                    <li>• Air Waybill (AWB)</li>
                    <li>• Commercial Invoice</li>
                    <li>• Packing List</li>
                    <li>• Certificate of Origin</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-2.5 sm:p-3">
                  <p className="mb-1 text-xs font-semibold text-gray-900 sm:text-sm">
                    Special Cargo:
                  </p>
                  <ul className="space-y-0.5 text-xs text-gray-700 sm:space-y-1 sm:text-sm">
                    <li>• Dangerous Goods Declaration</li>
                    <li>• Phytosanitary Certificate</li>
                    <li>• Health Certificate</li>
                    <li>• Export/Import Permits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-full text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
                3
              </div>
            </div>
            <div className="flex-grow pt-0.5 sm:pt-1">
              <h3 className="mb-1.5 text-base font-semibold text-gray-900 sm:mb-2 sm:text-lg">
                Deliver to Cargo Terminal
              </h3>
              <p className="mb-2 text-sm leading-relaxed text-gray-700 sm:mb-3 sm:text-base">
                Bring your cargo to our cargo terminal at least 4 hours before
                flight departure. Our team will inspect, weigh, and process your
                shipment.
              </p>
              <div className="border-primary-500 rounded-lg border-l-4 bg-blue-50 p-3 sm:p-4">
                <p className="text-xs text-gray-700 sm:text-sm">
                  <strong>Cargo Terminal Hours:</strong> Monday - Sunday, 08:00
                  - 18:00. For after-hours shipments, please contact us in
                  advance.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-full text-base font-bold text-white sm:h-10 sm:w-10 sm:text-lg">
                4
              </div>
            </div>
            <div className="flex-grow pt-0.5 sm:pt-1">
              <h3 className="mb-1.5 text-base font-semibold text-gray-900 sm:mb-2 sm:text-lg">
                Track & Receive
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                Track your shipment in real-time using your AWB number. Upon
                arrival, cargo can be collected from the destination airport or
                delivered to the consignee's address through our courier
                partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Rates */}
      <section className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <DollarSign className="text-primary-600 h-5 w-5 sm:h-6 sm:w-6" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Sample Cargo Rates
            </h2>
            <p className="text-xs text-gray-600 sm:text-sm">
              Indicative rates for reference - Contact us for exact quotation
            </p>
          </div>
        </div>

        <div className="horizontal-scroll overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-lg bg-white">
            <thead>
              <tr className="bg-primary-600 text-white">
                <th className="px-3 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Destination
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Weight Range
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Rate
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Transit Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleRates.map((rate, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-primary-50" : "bg-white"}
                >
                  <td className="px-3 py-3 text-xs font-medium text-gray-900 sm:px-6 sm:py-4 sm:text-sm">
                    {rate.destination}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-700 sm:px-6 sm:py-4 sm:text-sm">
                    {rate.weight}
                  </td>
                  <td className="px-3 py-3 text-xs font-semibold text-gray-700 sm:px-6 sm:py-4 sm:text-sm">
                    {rate.rate}
                  </td>
                  <td className="px-3 py-3 text-xs text-gray-700 sm:px-6 sm:py-4 sm:text-sm">
                    {rate.transitTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-3 sm:p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-600 sm:h-5 sm:w-5" />
            <p className="text-xs text-gray-800 sm:text-sm">
              <strong>Note:</strong> Rates are subject to change based on fuel
              surcharges, seasonal variations, and special handling
              requirements. Contact our cargo team for current rates and volume
              discounts.
            </p>
          </div>
        </div>
      </section>

      {/* Prohibited & Restricted Items */}
      <section className="rounded-xl border-2 border-red-200 bg-red-50 p-5 sm:p-8">
        <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center">
          <AlertCircle className="h-6 w-6 text-red-600 sm:h-8 sm:w-8" />
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Prohibited & Restricted Items
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="rounded-lg border border-red-200 bg-white p-4 sm:p-5">
            <h3 className="mb-2 text-base font-bold text-red-900 sm:mb-3 sm:text-lg">
              Prohibited Items
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">×</span>
                <span>Illegal drugs and narcotics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">×</span>
                <span>Weapons and ammunition (without permit)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">×</span>
                <span>
                  Explosives and flammable materials (without DG approval)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">×</span>
                <span>Counterfeit goods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-red-600">×</span>
                <span>Endangered species (without CITES permit)</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-orange-200 bg-white p-4 sm:p-5">
            <h3 className="mb-2 text-base font-bold text-orange-900 sm:mb-3 sm:text-lg">
              Restricted Items (Require Special Permits)
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold text-orange-600">!</span>
                <span>Dangerous goods (IATA DGR compliance required)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-orange-600">!</span>
                <span>Live animals (health certificates required)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-orange-600">!</span>
                <span>Perishable foods (health permits required)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-orange-600">!</span>
                <span>Pharmaceuticals (import licenses required)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-orange-600">!</span>
                <span>High-value items (declaration required)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="from-primary-50 to-primary-100 border-primary-200 rounded-xl border bg-gradient-to-br p-5 sm:p-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
          Cargo Contact Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="border-primary-200 rounded-lg border bg-white p-4 sm:p-6">
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12">
                <Phone className="text-primary-600 h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                  Cargo Hotline
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Available 24/7
                </p>
              </div>
            </div>
            <p className="text-primary-600 mb-1.5 text-base font-semibold sm:mb-2 sm:text-lg">
              +856 XX XXX XXXX
            </p>
            <p className="text-xs text-gray-700 sm:text-sm">
              For urgent cargo inquiries and bookings
            </p>
          </div>

          <div className="border-primary-200 rounded-lg border bg-white p-4 sm:p-6">
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12">
                <Mail className="text-primary-600 h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                  Email
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Response within 24 hours
                </p>
              </div>
            </div>
            <p className="text-primary-600 mb-1.5 text-base font-semibold sm:mb-2 sm:text-lg">
              cargo@bokeoairport.la
            </p>
            <p className="text-xs text-gray-700 sm:text-sm">
              For quotes, bookings, and general inquiries
            </p>
          </div>

          <div className="border-primary-200 rounded-lg border bg-white p-4 sm:col-span-2 sm:p-6">
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <div className="bg-primary-100 flex h-10 w-10 items-center justify-center rounded-lg sm:h-12 sm:w-12">
                <MapPin className="text-primary-600 h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                  Cargo Terminal Location
                </h3>
                <p className="text-xs text-gray-600 sm:text-sm">
                  Visit us for in-person assistance
                </p>
              </div>
            </div>
            <p className="mb-1.5 text-xs text-gray-700 sm:mb-2 sm:text-sm">
              <strong>Address:</strong> Bokeo International Airport Cargo
              Terminal
            </p>
            <p className="mb-1.5 text-xs text-gray-700 sm:mb-2 sm:text-sm">
              Tonpheung District, Bokeo Province, Lao PDR
            </p>
            <p className="text-xs text-gray-700 sm:text-sm">
              <strong>Hours:</strong> Monday - Sunday, 08:00 - 18:00
            </p>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
          Additional Cargo Services
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <div className="flex items-start gap-2 sm:gap-3">
            <FileText className="text-primary-600 mt-1 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            <div>
              <h4 className="mb-0.5 text-sm font-semibold text-gray-900 sm:mb-1 sm:text-base">
                Customs Clearance
              </h4>
              <p className="text-xs text-gray-700 sm:text-sm">
                Assistance with customs documentation and clearance procedures
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <Scale className="text-primary-600 mt-1 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            <div>
              <h4 className="mb-0.5 text-sm font-semibold text-gray-900 sm:mb-1 sm:text-base">
                Weighing & Inspection
              </h4>
              <p className="text-xs text-gray-700 sm:text-sm">
                Certified weighing scales and cargo inspection services
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <Package className="text-primary-600 mt-1 h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
            <div>
              <h4 className="mb-0.5 text-sm font-semibold text-gray-900 sm:mb-1 sm:text-base">
                Packaging & Crating
              </h4>
              <p className="text-xs text-gray-700 sm:text-sm">
                Professional packaging services for fragile and valuable cargo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
