import Image from "next/image";
import {
  Car,
  MapPin,
  Clock,
  Phone,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { Lang } from "@/types/language";

interface CarRentalPageProps {
  params: Promise<{ lang: Lang }>;
}

const rentalCompanies = [
  {
    name: "Bokeo Rent A Car",
    location: "Houayxay City Center",
    phone: "+856 20 5555 6789",
    hours: "08:00 - 18:00 (Daily)",
    vehicles: ["Sedans", "SUVs", "4WD vehicles"],
    delivery: "Airport delivery available",
  },
  {
    name: "Mekong Car Rental",
    location: "Ban Houayxay, near the border",
    phone: "+856 84 212 345",
    hours: "07:00 - 19:00 (Daily)",
    vehicles: ["Economy cars", "Pickup trucks", "Vans"],
    delivery: "Free airport pickup service",
  },
  {
    name: "Lao Golden Triangle Rentals",
    location: "Houayxay Downtown",
    phone: "+856 20 9999 1234",
    hours: "24/7 service (with advance booking)",
    vehicles: ["Luxury cars", "SUVs", "Motorcycles"],
    delivery: "Airport delivery: 50,000 LAK",
  },
];

const vehicleRates = [
  {
    type: "Economy Car",
    dailyRate: "250,000 - 350,000 LAK",
    deposit: "2,000,000 LAK",
  },
  {
    type: "Standard Sedan",
    dailyRate: "400,000 - 550,000 LAK",
    deposit: "3,000,000 LAK",
  },
  {
    type: "SUV / 4WD",
    dailyRate: "600,000 - 900,000 LAK",
    deposit: "5,000,000 LAK",
  },
  {
    type: "Pickup Truck",
    dailyRate: "500,000 - 700,000 LAK",
    deposit: "4,000,000 LAK",
  },
  {
    type: "Van (7-9 seats)",
    dailyRate: "700,000 - 1,000,000 LAK",
    deposit: "5,000,000 LAK",
  },
  {
    type: "Motorcycle/Scooter",
    dailyRate: "80,000 - 150,000 LAK",
    deposit: "500,000 LAK",
  },
];

export default async function CarRentalPage({ params }: CarRentalPageProps) {
  const { lang } = await params;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <Car className="text-bokeo-teal-600 h-8 w-8" />
          <h1 className="text-3xl font-bold text-gray-900">Car Rental</h1>
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
              src="/images/transportation/car-rental-counter.jpeg"
              alt="Car Rental Services at Bokeo Airport"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Car Rental Services
            </h2>
            <p className="mb-4 text-gray-700">
              Several car rental companies operate in Houayxay, offering
              convenient rental services for travelers arriving at Bokeo
              International Airport. Most companies provide airport pickup or
              delivery services for added convenience.
            </p>
          </div>

          <div className="bg-bokeo-blue-50 border-bokeo-blue-200 rounded-lg border p-4">
            <h3 className="text-bokeo-blue-900 mb-2 font-semibold">
              Rental Requirements
            </h3>
            <ul className="text-bokeo-blue-800 space-y-1 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-bokeo-blue-600 mt-1">•</span>
                <span>
                  Valid driver's license (International Driving Permit
                  recommended for foreigners)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bokeo-blue-600 mt-1">•</span>
                <span>Valid passport or Lao ID card</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bokeo-blue-600 mt-1">•</span>
                <span>
                  Security deposit (cash or credit card pre-authorization)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bokeo-blue-600 mt-1">•</span>
                <span>Minimum age: 21 years old (25 for luxury vehicles)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-bokeo-blue-600 mt-1">•</span>
                <span>Driver's license held for at least 1 year</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="flex gap-2">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
              <div>
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Advance booking is highly
                  recommended, especially during peak travel seasons. Contact
                  rental companies directly to arrange airport pickup or
                  delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rental Companies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Car Rental Companies in Houayxay
        </h2>
        <div className="grid gap-4 md:grid-cols-1">
          {rentalCompanies.map((company, idx) => (
            <div
              key={idx}
              className="hover:border-bokeo-teal-300 rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
            >
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {company.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="text-bokeo-teal-600 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span className="text-gray-600">{company.location}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="text-bokeo-teal-600 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span className="text-gray-600">{company.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-start gap-2">
                    <Clock className="text-bokeo-teal-600 mt-0.5 h-4 w-4 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Operating Hours
                      </p>
                      <p className="text-sm text-gray-600">{company.hours}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="mb-1 text-sm font-semibold text-gray-900">
                      Available Vehicles
                    </p>
                    <p className="text-sm text-gray-600">
                      {company.vehicles.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-bokeo-teal-50 w-full rounded-lg p-3">
                    <p className="text-bokeo-teal-900 mb-1 text-sm font-semibold">
                      Airport Service
                    </p>
                    <p className="text-bokeo-teal-700 text-sm">
                      {company.delivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Rates */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="text-bokeo-teal-600 h-5 w-5" />
          <h2 className="text-xl font-semibold text-gray-900">
            Estimated Daily Rates
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left font-semibold text-gray-900">
                  Vehicle Type
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">
                  Daily Rate
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-900">
                  Security Deposit
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicleRates.map((rate, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-gray-700">{rate.type}</td>
                  <td className="text-bokeo-teal-600 px-4 py-3 text-right font-semibold">
                    {rate.dailyRate}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600">
                    {rate.deposit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-bokeo-blue-50 mt-4 rounded-lg p-3">
          <p className="text-bokeo-blue-800 text-sm">
            <strong>Note:</strong> Rates are approximate and vary by company,
            season, and rental duration. Weekly and monthly rates available with
            significant discounts. Fuel is not included in the rental price.
          </p>
        </div>
      </div>

      {/* Rental Process */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Rental Process
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="bg-bokeo-teal-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              1
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Book</h4>
            <p className="text-sm text-gray-600">
              Contact rental company in advance or upon arrival
            </p>
          </div>
          <div className="text-center">
            <div className="bg-bokeo-teal-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              2
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Documents</h4>
            <p className="text-sm text-gray-600">
              Present license, passport, and pay deposit
            </p>
          </div>
          <div className="text-center">
            <div className="bg-bokeo-teal-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              3
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Inspect</h4>
            <p className="text-sm text-gray-600">
              Check vehicle condition and sign rental agreement
            </p>
          </div>
          <div className="text-center">
            <div className="bg-bokeo-teal-600 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
              4
            </div>
            <h4 className="mb-1 font-semibold text-gray-900">Drive</h4>
            <p className="text-sm text-gray-600">
              Enjoy your journey with your rental vehicle
            </p>
          </div>
        </div>
      </div>

      {/* Insurance & Additional Services */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-3 font-semibold text-gray-900">
            Insurance Options
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-bokeo-teal-600 mt-1">•</span>
              <span>
                <strong>Basic Insurance:</strong> Included in rental price
                (liability coverage)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bokeo-teal-600 mt-1">•</span>
              <span>
                <strong>Collision Damage Waiver (CDW):</strong> 50,000-100,000
                LAK/day
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bokeo-teal-600 mt-1">•</span>
              <span>
                <strong>Full Coverage:</strong> 100,000-150,000 LAK/day
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-3 font-semibold text-gray-900">
            Additional Services
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-bokeo-teal-600 mt-1">•</span>
              <span>GPS Navigation: 30,000 LAK/day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bokeo-teal-600 mt-1">•</span>
              <span>Child Car Seat: 20,000 LAK/day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bokeo-teal-600 mt-1">•</span>
              <span>Additional Driver: 50,000 LAK/day</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bokeo-teal-600 mt-1">•</span>
              <span>Cross-border permit (to Thailand): 200,000 LAK</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
        <h3 className="mb-3 font-semibold text-yellow-900">Helpful Tips</h3>
        <ul className="space-y-2 text-sm text-yellow-800">
          <li className="flex items-start gap-2">
            <span className="mt-1 text-yellow-600">💡</span>
            <span>
              Book at least 2-3 days in advance during peak seasons
              (November-February)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-yellow-600">💡</span>
            <span>
              Familiarize yourself with Lao traffic rules - drive on the right
              side of the road
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-yellow-600">💡</span>
            <span>
              Take photos/videos of the vehicle condition before driving off
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-yellow-600">💡</span>
            <span>
              Return the vehicle with the same fuel level to avoid refueling
              charges
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-yellow-600">💡</span>
            <span>
              If planning to drive to Thailand, inform the rental company and
              obtain proper permits
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
                Airport Information Desk
              </p>
              <p className="text-bokeo-teal-600 font-medium">+856 84 211 555</p>
              <p className="text-sm text-gray-600">
                Can help arrange car rental services
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-bokeo-teal-600 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">
                Rental Companies Location
              </p>
              <p className="text-gray-600">Houayxay City</p>
              <p className="text-sm text-gray-600">
                15-20 minutes from airport
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
