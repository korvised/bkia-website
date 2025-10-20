import Image from "next/image";
import {
  AlertCircle,
  Clock,
  Info,
  MapPin,
  Phone,
  Truck,
  Users,
} from "lucide-react";

interface VanPageProps {
  params: Promise<{ lang: string }>;
}

const vanServices = [
  {
    name: "Standard Van",
    capacity: "7-9 passengers",
    price: "200,000 - 300,000 LAK",
    features: [
      "Door-to-door service",
      "Luggage assistance",
      "Air conditioning",
    ],
  },
  {
    name: "Premium Van",
    capacity: "6-8 passengers",
    price: "350,000 - 500,000 LAK",
    features: ["Luxury comfort", "Wi-Fi available", "Refreshments included"],
  },
  {
    name: "Group Van",
    capacity: "10-15 passengers",
    price: "400,000 - 600,000 LAK",
    features: [
      "Ideal for groups",
      "Extra luggage space",
      "Professional driver",
    ],
  },
];

const popularDestinations = [
  {
    destination: "Houayxay City Center",
    price: "80,000 LAK",
    duration: "30 min",
  },
  { destination: "Luang Prabang", price: "1,200,000 LAK", duration: "3 hours" },
  {
    destination: "Chiang Rai, Thailand",
    price: "1,500,000 LAK",
    duration: "2.5 hours",
  },
  {
    destination: "Ban Houayxay Border",
    price: "50,000 LAK",
    duration: "15 min",
  },
];

export default async function VanPage({ params }: VanPageProps) {
  const { lang } = await params;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <Truck className="text-primary-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-gray-900">Van Services</h1>
        </div>
        <p className="ml-11 text-sm text-gray-600">
          Bokeo International Airport - Tonphueng, Bokeo, Lao PDR
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative h-64 overflow-hidden rounded-lg md:h-auto">
          <Image
            src="/images/transportation/van-service.avif"
            alt="Van Service at Bokeo International Airport"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Private Van Transportation
            </h2>
            <p className="mb-4 text-gray-700">
              Comfortable and convenient van services are available at Bokeo
              International Airport for individuals, families, and groups
              requiring private transportation with extra space and comfort to
              destinations across Bokeo Province and beyond.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <MapPin className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  Pick-up Location
                </p>
                <p className="text-gray-600">
                  Van services are available at the Ground Transportation
                  Center, near the arrivals area
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <Clock className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="mb-1 font-semibold text-gray-900">Availability</p>
                <p className="text-gray-600">
                  24/7 service with advance booking recommended
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <Phone className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  Booking & Inquiries
                </p>
                <p className="text-gray-600">
                  +856 84 211 777 (Bokeo Airport Van Service)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Van Service Types */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Available Van Services
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {vanServices.map((service, idx) => (
            <div
              key={idx}
              className="hover:border-primary-300 rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="bg-primary-100 text-primary-600 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500">{service.capacity}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-primary-600 text-lg font-bold">
                  {service.price}
                </p>
                <p className="text-xs text-gray-500">Per trip</p>
              </div>

              <ul className="space-y-2">
                {service.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-primary-600 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Popular Destinations & Rates
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {popularDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {dest.destination}
                </p>
                <p className="text-sm text-gray-500">{dest.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-primary-600 font-bold">{dest.price}</p>
                <p className="text-xs text-gray-500">Starting from</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          * Prices may vary based on vehicle type and specific requirements
        </p>
      </div>

      {/* Booking Process */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          How to Book a Van
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="bg-primary-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              1
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Contact</h4>
            <p className="text-sm text-gray-600">
              Call +856 84 211 777 or book at the counter
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              2
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Confirm</h4>
            <p className="text-sm text-gray-600">
              Provide destination and passenger details
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              3
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Meet</h4>
            <p className="text-sm text-gray-600">
              Driver meets you at Ground Transportation Center
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              4
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Travel</h4>
            <p className="text-sm text-gray-600">
              Enjoy comfortable door-to-door service
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-3 text-4xl">🧳</div>
          <h3 className="mb-2 font-semibold text-gray-900">
            Extra Luggage Space
          </h3>
          <p className="text-sm text-gray-600">
            Ample room for multiple suitcases, sports equipment, and oversized
            items
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-3 text-4xl">👨‍👩‍👧‍👦</div>
          <h3 className="mb-2 font-semibold text-gray-900">Family Friendly</h3>
          <p className="text-sm text-gray-600">
            Perfect for families traveling together with comfortable seating
            arrangements
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-3 text-4xl">💼</div>
          <h3 className="mb-2 font-semibold text-gray-900">
            Business & Groups
          </h3>
          <p className="text-sm text-gray-600">
            Ideal for business travelers and tourist groups visiting Bokeo
            Province
          </p>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-primary-50 border-primary-200 rounded-lg border p-6">
        <div className="flex gap-3">
          <Info className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
          <div className="space-y-2">
            <p className="text-primary-900 font-semibold">
              Important Information
            </p>
            <ul className="text-primary-800 space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>
                  Advance booking is recommended, especially during peak travel
                  seasons and holidays
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>
                  Payment accepted: Cash (LAK, THB, USD), mobile payment (BCEL
                  One, M-money)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>
                  Free cancellation up to 4 hours before scheduled pick-up time
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>
                  For international destinations, ensure you have valid travel
                  documents
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>
                  Additional charges may apply for destinations outside Bokeo
                  Province
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <div className="flex gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div className="space-y-2">
            <p className="font-semibold text-yellow-900">Safety Guidelines</p>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-yellow-600">⚠️</span>
                <span>
                  Always verify driver identity and vehicle details before
                  boarding
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-yellow-600">⚠️</span>
                <span>
                  Ensure all passengers wear seatbelts throughout the journey
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-yellow-600">⚠️</span>
                <span>
                  Keep valuable items with you and never leave luggage
                  unattended
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-yellow-600">⚠️</span>
                <span>
                  Report any safety concerns to airport security immediately
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Need Assistance?</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <Phone className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Van Service Hotline</p>
              <p className="text-primary-600 font-medium">+856 84 211 777</p>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Service Counter</p>
              <p className="text-gray-600">Ground Transportation Center</p>
              <p className="text-sm text-gray-600">
                Bokeo International Airport, Tonphueng
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
