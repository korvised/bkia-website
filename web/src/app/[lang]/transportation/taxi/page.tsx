import Image from "next/image";
import {
  MapPin,
  AlertCircle,
  Phone,
  DollarSign,
  CarTaxiFront,
} from "lucide-react";
import { Lang } from "@/types/language";

interface TaxiPageProps {
  params: Promise<{ lang: Lang }>;
}

const passengerNotes = [
  {
    icon: "🧳",
    title: "Take care of your carry-on luggage",
  },
  {
    icon: "💳",
    title: "Pay by the meter, no bargaining",
  },
  {
    icon: "🚫",
    title: "Protect your rights and refuse car sharing if not agreed",
  },
  {
    icon: "✋",
    title: "Passengers reserve the right to refuse payment for service refusal",
  },
  {
    icon: "🚭",
    title: "Smoking is strictly prohibited - refuse to pay if driver smokes",
  },
  {
    icon: "🧾",
    title: "Always ask for a receipt",
  },
  {
    icon: "🧹",
    title: "Keep the car clean and hygienic",
  },
];

const popularDestinations = [
  {
    destination: "Simeungngam (ສີເມື່ອງງາມ)",
    price: "80,000 - 100,000 LAK",
    duration: "1 hour",
  },
  {
    destination: "Special Economic Zone (ເຂດເສດຖະກິດພິເສດ)",
    price: "120,000 - 150,000 LAK",
    duration: "45 min",
  },
  {
    destination: "Houayxay City Center (ຫວ້ຍຊາຍ)",
    price: "200,000 - 300,000 LAK",
    duration: "30 min",
  },
  {
    destination: "Oudomxay (ອຸດົມໄຊ)",
    price: "400,000 - 600,000 LAK",
    duration: "3-4 hours",
  },
];

export default async function TaxiPage({ params }: TaxiPageProps) {
  const { lang } = await params;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <CarTaxiFront className="text-bokeo-teal-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-gray-900">Taxi</h1>
        </div>
        <p className="ml-11 text-sm text-gray-600">
          Bokeo International Airport - Tonphueng, Bokeo, Lao PDR
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative h-full overflow-hidden rounded-lg">
            <Image
              src="/images/transportation/taxi-area1.jpeg"
              alt="Taxi Pick-up Area at Bokeo Airport"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900">
              <MapPin className="text-bokeo-teal-600 h-5 w-5" />
              Taxi Pick-up Areas
            </h2>
            <p className="mb-3 text-gray-700">
              Taxi services are available at Bokeo International Airport with
              designated pick-up areas for passenger convenience and safety.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-bokeo-teal-600 mt-1 font-semibold">
                  •
                </span>
                <span>
                  <strong>Main Pick-up Area:</strong> Located outside the
                  Arrivals Hall at Ground Transportation Center
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bokeo-teal-600 mt-1 font-semibold">
                  •
                </span>
                <span>
                  <strong>Operating Hours:</strong> 24/7 service available
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
              <div className="space-y-2 text-sm text-yellow-800">
                <p className="font-semibold text-yellow-900">
                  IMPORTANT NOTICE
                </p>
                <ol className="list-inside list-decimal space-y-2">
                  <li>
                    Please queue in the designated waiting area. Follow staff
                    guidance to the boarding location.
                  </li>
                  <li>
                    If you encounter issues such as refusal of service,
                    passenger selection, or overcharging, please report to staff
                    immediately and cooperate to collect evidence.
                  </li>
                  <li>
                    For short-distance trips (within 15 km), please inform the
                    driver of your destination clearly.
                  </li>
                  <li>
                    For long-distance trips outside Bokeo Province, negotiate
                    the fare with the driver before departure.
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-yellow-600" />
                    <span>
                      <strong>Complaint Hotline:</strong> +856 84 211 999
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations & Fares */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="text-bokeo-teal-600 h-5 w-5" />
          <h2 className="text-xl font-semibold text-gray-900">
            Popular Destinations & Estimated Fares
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {popularDestinations.map((dest, idx) => (
            <div
              key={idx}
              className="hover:border-bokeo-teal-300 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors"
            >
              <div>
                <p className="font-semibold text-gray-900">
                  {dest.destination}
                </p>
                <p className="text-sm text-gray-500">{dest.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-bokeo-teal-600 font-bold">{dest.price}</p>
                <p className="text-xs text-gray-500">Approx.</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-bokeo-blue-50 mt-4 rounded-lg p-3">
          <p className="text-bokeo-blue-800 text-sm">
            <strong>Note:</strong> Fares are estimates and may vary based on
            traffic conditions, time of day, and exact destination. Always
            ensure the meter is running or agree on fare before departure.
          </p>
        </div>
      </div>

      {/* Passenger Notes */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Passenger Guidelines
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {passengerNotes.map((note, idx) => (
            <div
              key={idx}
              className="hover:border-bokeo-teal-300 hover:bg-bokeo-teal-50 flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors"
            >
              <div className="flex-shrink-0 text-3xl">{note.icon}</div>
              <p className="text-sm leading-snug text-gray-700">{note.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Taxi Service Information */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-bokeo-teal-600 mb-3 text-3xl">🚕</div>
          <h3 className="mb-2 font-semibold text-gray-900">Licensed Taxis</h3>
          <p className="text-sm text-gray-600">
            All taxis at Bokeo Airport are licensed and registered with proper
            identification and meters.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-bokeo-teal-600 mb-3 text-3xl">⏰</div>
          <h3 className="mb-2 font-semibold text-gray-900">
            24/7 Availability
          </h3>
          <p className="text-sm text-gray-600">
            Taxi services operate around the clock to accommodate all flight
            schedules and passenger needs.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-bokeo-teal-600 mb-3 text-3xl">💵</div>
          <h3 className="mb-2 font-semibold text-gray-900">Payment Options</h3>
          <p className="text-sm text-gray-600">
            Cash payment in LAK, THB, or USD accepted. Some taxis also accept
            mobile payment (BCEL One).
          </p>
        </div>
      </div>

      {/* Safety & Tips */}
      <div className="bg-bokeo-blue-50 border-bokeo-blue-200 rounded-lg border p-6">
        <h3 className="text-bokeo-blue-900 mb-3 font-semibold">
          Safety Tips & Reminders
        </h3>
        <ul className="text-bokeo-blue-800 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-bokeo-blue-600 mt-1">✓</span>
            <span>
              Always use the official taxi queue and follow staff instructions
              for safety
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-bokeo-blue-600 mt-1">✓</span>
            <span>
              Verify the taxi license plate and driver ID before boarding
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-bokeo-blue-600 mt-1">✓</span>
            <span>
              Ensure the meter is activated at the start of your journey or
              agree on fare beforehand
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-bokeo-blue-600 mt-1">✓</span>
            <span>
              Keep your receipt for potential complaints or lost items recovery
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-bokeo-blue-600 mt-1">✓</span>
            <span>
              Report any suspicious behavior or service issues immediately to
              airport security
            </span>
          </li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Need Assistance?</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <Phone className="text-bokeo-teal-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">
                Taxi Service Hotline
              </p>
              <p className="text-bokeo-teal-600 font-medium">+856 84 211 888</p>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-bokeo-teal-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Complaint Hotline</p>
              <p className="text-bokeo-teal-600 font-medium">+856 84 211 999</p>
              <p className="text-sm text-gray-600">For service issues</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
