import Image from "next/image";
import {
  AlertCircle,
  Clock,
  DollarSign,
  Info,
  MapPin,
  ParkingCircle,
  Phone,
} from "lucide-react";

/*interface ParkingPageProps {
  params: Promise<{ lang: string }>;
}*/

const parkingRates = [
  { duration: "First hour", rate: "10,000 LAK" },
  { duration: "Each additional hour", rate: "5,000 LAK" },
  { duration: "Daily maximum (24 hours)", rate: "80,000 LAK" },
  { duration: "Weekly rate (7 days)", rate: "450,000 LAK" },
  { duration: "Monthly rate", rate: "1,500,000 LAK" },
];

export default async function ParkingPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <ParkingCircle className="text-primary-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-gray-900">Parking</h1>
        </div>
        <p className="ml-11 text-sm text-gray-600">
          Bokeo International Airport - Tonphueng, Bokeo, Lao PDR
        </p>
      </div>

      {/* Hero Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative h-64 overflow-hidden rounded-lg md:h-auto">
          <Image
            src="/images/transportation/parking-entrance.jpg"
            alt="Parking Entrance at Bokeo Airport"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900">
              <Info className="text-primary-600 h-5 w-5" />
              Parking Facilities
            </h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  Main Parking Area:
                </p>
                <p>
                  Located directly in front of the terminal building with easy
                  access to the arrivals and departures areas. The parking area
                  offers both short-term and long-term parking options.
                </p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-gray-900">Capacity:</p>
                <p>
                  Over 200 parking spaces available for cars, motorcycles, and
                  small vehicles.
                </p>
              </div>
              <div>
                <p className="mb-1 font-semibold text-gray-900">
                  Operating Hours:
                </p>
                <p>
                  24/7 access with security surveillance and lighting for
                  passenger safety.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <div className="space-y-2 text-sm text-red-800">
                <p className="font-semibold text-red-900">IMPORTANT NOTICE</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>
                    It is strictly forbidden to bring flammable, explosive, or
                    dangerous goods into the parking area
                  </li>
                  <li>Height limit: 2.5 meters for covered parking area</li>
                  <li>
                    The parking facility provides parking spaces only and is not
                    responsible for theft or damage to vehicles
                  </li>
                  <li>
                    Please do not store valuables in your vehicle and ensure all
                    doors and windows are locked
                  </li>
                  <li>
                    Drivers are responsible for any damage to parking equipment
                    and facilities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parking Rates */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="text-primary-600 h-5 w-5" />
          <h2 className="text-xl font-semibold text-gray-900">Parking Rates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-900">
                  Duration
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {parkingRates.map((rate, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-700">{rate.duration}</td>
                  <td className="text-primary-600 px-4 py-3 text-right font-semibold">
                    {rate.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-primary-50 mt-4 rounded-lg p-3">
          <p className="text-primary-800 text-sm">
            <strong>Payment Methods:</strong> Cash (LAK, THB, USD), BCEL One,
            M-money, or credit/debit cards
          </p>
        </div>
      </div>

      {/* Parking Map */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="text-primary-600 h-5 w-5" />
          <h3 className="text-lg font-semibold text-gray-900">
            Parking Area Location
          </h3>
        </div>
        <div className="relative h-96 w-full overflow-hidden rounded-lg bg-white">
          <Image
            src="/images/transportation/parking-map.jpg"
            alt="Parking Area Map at Bokeo Airport"
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="bg-primary-600 h-4 w-4 rounded"></div>
              <p className="font-semibold text-gray-900">Main Parking Area</p>
            </div>
            <p className="text-sm text-gray-600">
              Located in front of the terminal building - short and long-term
              parking available
            </p>
          </div>
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="bg-primary-600 h-4 w-4 rounded"></div>
              <p className="font-semibold text-gray-900">Motorcycle Parking</p>
            </div>
            <p className="text-sm text-gray-600">
              Designated area for motorcycles and scooters on the east side
            </p>
          </div>
        </div>
      </div>

      {/* Parking Features */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-primary-600 mb-3 text-3xl">🚗</div>
          <h3 className="mb-2 font-semibold text-gray-900">Easy Access</h3>
          <p className="text-sm text-gray-600">
            Conveniently located directly in front of the terminal with clear
            signage and easy entry/exit routes.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-primary-600 mb-3 text-3xl">🔒</div>
          <h3 className="mb-2 font-semibold text-gray-900">24/7 Security</h3>
          <p className="text-sm text-gray-600">
            Round-the-clock security surveillance, well-lit facilities, and
            regular patrols ensure vehicle safety.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-primary-600 mb-3 text-3xl">💳</div>
          <h3 className="mb-2 font-semibold text-gray-900">Flexible Payment</h3>
          <p className="text-sm text-gray-600">
            Multiple payment options including cash, mobile payment, and cards
            for your convenience.
          </p>
        </div>
      </div>

      {/* Parking Instructions */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
          <Clock className="text-primary-600 h-5 w-5" />
          How to Use the Parking
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="bg-primary-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              1
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Enter</h4>
            <p className="text-sm text-gray-600">
              Drive to the entrance, take a ticket from the machine
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              2
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Park</h4>
            <p className="text-sm text-gray-600">
              Find an available space and park your vehicle safely
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              3
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Return</h4>
            <p className="text-sm text-gray-600">
              Present your ticket at the payment kiosk or exit booth
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              4
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Exit</h4>
            <p className="text-sm text-gray-600">
              Pay the fee and exit through the barrier gate
            </p>
          </div>
        </div>
      </div>

      {/* Parking Tips */}
      <div className="bg-primary-50 border-primary-200 rounded-lg border p-6">
        <h3 className="text-primary-900 mb-3 font-semibold">
          Parking Tips & Reminders
        </h3>
        <ul className="text-primary-800 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>
              Take a photo of your parking location (zone/row number) for easy
              vehicle retrieval
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>
              Keep your parking ticket safe - you&#39;ll need it to exit and pay
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>
              Arrive early during peak travel seasons and holidays as parking
              can fill up
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>
              Check the height restriction (2.5m) if you have a tall vehicle
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>
              For long-term parking (7+ days), consider the weekly or monthly
              rates for better value
            </span>
          </li>
        </ul>
      </div>

      {/* Lost Ticket Information */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <h3 className="mb-3 flex items-center gap-2 font-semibold text-yellow-900">
          <AlertCircle className="h-5 w-5" />
          Lost Parking Ticket
        </h3>
        <p className="mb-2 text-sm text-yellow-800">
          If you lose your parking ticket, please inform the parking attendant
          at the exit booth. You will be charged the maximum daily rate for that
          day.
        </p>
        <p className="text-sm text-yellow-800">
          <strong>Lost Ticket Fee:</strong> 80,000 LAK (equivalent to daily
          maximum rate)
        </p>
      </div>

      {/* Contact Information */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-4 font-semibold text-gray-900">Need Assistance?</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <Phone className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Parking Management</p>
              <p className="text-primary-600 font-medium">+856 84 211 666</p>
              <p className="text-sm text-gray-600">Available 24/7</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Parking Office</p>
              <p className="text-gray-600">Terminal Building - Ground Level</p>
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
