import {
  DoorOpen,
  Car,
  Smartphone,
  AlertCircle,
  ClipboardCheck,
} from "lucide-react";

export function LeavingAirportContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="hidden flex-shrink-0 sm:block">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <DoorOpen className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-x-2 sm:mb-4">
            <div className="bg-primary-50 flex items-center justify-center rounded-lg p-2 sm:hidden">
              <ClipboardCheck className="text-primary-500 h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
              Leaving the Airport
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <p className="mb-4 text-gray-700">
                Welcome to Laos! After completing all arrival procedures,
                you&#39;ll exit into the main arrivals hall where various
                transportation options and services are available to help you
                reach your final destination.
              </p>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>📍 You are now in Ban Houayxay, Bokeo Province:</strong>{" "}
                The fourth largest province in northern Laos, bordering Thailand
                across the Mekong River. The town center is approximately 3km
                from the airport.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Transportation Options
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Car className="text-primary-500 h-5 w-5" />
                    <h4 className="font-medium text-gray-900">
                      Official Airport Taxi
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      <strong>Location:</strong> Taxi rank outside arrivals
                    </li>
                    <li>
                      <strong>Payment:</strong> LAK or USD accepted
                    </li>
                    <li>
                      <strong>Typical Fares:</strong>
                      <ul className="mt-1 ml-4 space-y-1">
                        <li>• To Ban Houayxay center: 30,000-50,000 LAK</li>
                        <li>• To hotels in town: 40,000-60,000 LAK</li>
                        <li>• To border crossing: 50,000-80,000 LAK</li>
                      </ul>
                    </li>
                    <li>
                      <strong>Tip:</strong> Agree on fare before departure
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Smartphone className="text-primary-500 h-5 w-5" />
                    <h4 className="font-medium text-gray-900">
                      Ride-Hailing Apps
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      <strong>Available:</strong> LOCA (Lao ride-hailing app)
                    </li>
                    <li>
                      <strong>Requirements:</strong> Local SIM card needed
                    </li>
                    <li>
                      <strong>Benefits:</strong> Fixed prices, cashless payment
                    </li>
                    <li>
                      <strong>Note:</strong> Limited availability in Bokeo
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Car className="text-primary-500 h-5 w-5" />
                    <h4 className="font-medium text-gray-900">Hotel Shuttle</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      <strong>Pre-arranged:</strong> Many hotels offer free
                      pickup
                    </li>
                    <li>
                      <strong>Booking:</strong> Arrange when making reservation
                    </li>
                    <li>
                      <strong>Meeting Point:</strong> Arrivals hall with name
                      sign
                    </li>
                    <li>
                      <strong>Tip:</strong> Confirm pickup time and terminal
                      with hotel
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Car className="text-primary-500 h-5 w-5" />
                    <h4 className="font-medium text-gray-900">
                      Private Car Rental
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      <strong>Counters:</strong> Located in arrivals hall
                    </li>
                    <li>
                      <strong>Requirements:</strong> International driving
                      permit + passport
                    </li>
                    <li>
                      <strong>Companies:</strong> Local and regional providers
                    </li>
                    <li>
                      <strong>Note:</strong> Book in advance for better rates
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-6 w-6 flex-shrink-0 text-yellow-600" />
                <div>
                  <h4 className="mb-2 font-semibold text-yellow-900">
                    Important Safety Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li>
                      • Only use official airport taxis or pre-arranged
                      transportation
                    </li>
                    <li>
                      • Avoid unlicensed touts offering rides inside terminal
                    </li>
                    <li>
                      • Keep valuables secure and luggage in sight at all times
                    </li>
                    <li>
                      • Verify taxi meter is used or agree on fare before
                      departure
                    </li>
                    <li>• Keep small LAK bills for easier payments</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Essential Services in Arrivals Hall
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="mb-2 font-medium text-gray-900">
                      SIM Cards & Mobile Services
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Lao Telecom booth in arrivals</li>
                      <li>• Tourist SIM packages available</li>
                      <li>• Data plans from 50,000 LAK</li>
                      <li>• Passport required for registration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-gray-900">
                      Currency Exchange
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Exchange booth in arrivals hall</li>
                      <li>• Major currencies accepted (USD, THB, EUR, CNY)</li>
                      <li>• ATMs available (Visa/Mastercard)</li>
                      <li>• Operating hours: During flight arrivals</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-gray-900">
                      Tourist Information
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Information desk in arrivals</li>
                      <li>• Free maps and brochures</li>
                      <li>• Hotel booking assistance</li>
                      <li>• Tour operator contacts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-gray-900">
                      Other Services
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Free WiFi throughout terminal</li>
                      <li>• Restrooms</li>
                      <li>• Small cafe/snack shop</li>
                      <li>• Porter services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Quick Orientation Guide
              </h3>
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="mb-3 text-sm font-medium text-gray-800">
                  Welcome to Bokeo Province!
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Time Zone:</strong> ICT (UTC+7) - same as Bangkok,
                    Vietnam
                  </p>
                  <p>
                    <strong>Currency:</strong> Lao Kip (LAK). USD and Thai Baht
                    widely accepted
                  </p>
                  <p>
                    <strong>Language:</strong> Lao (primary), Thai understood,
                    English in tourist areas
                  </p>
                  <p>
                    <strong>Weather:</strong> Tropical - hot season (Mar-May),
                    rainy (Jun-Oct), cool (Nov-Feb)
                  </p>
                  <p>
                    <strong>Emergency Numbers:</strong> Police 1191, Medical
                    1195, Fire 1190
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 p-4">
              <h4 className="mb-2 font-semibold text-green-900">
                Helpful Tips for Your Visit
              </h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>
                  • Dress modestly when visiting temples (cover shoulders and
                  knees)
                </li>
                <li>• Remove shoes before entering homes and temples</li>
                <li>• Bargaining is common at markets but not in shops</li>
                <li>
                  • Tipping not mandatory but appreciated (10% in restaurants)
                </li>
                <li>• Tap water not safe to drink - buy bottled water</li>
                <li>• Respect Buddhist monks - women should not touch monks</li>
              </ul>
            </div>

            <div className="rounded bg-gray-50 p-3 text-xs text-gray-600">
              <p className="mb-1 font-medium">Need More Help?</p>
              <p>Airport Information Desk: Located in arrivals hall</p>
              <p>Tourism Lao Bokeo Office: +856-84-211-XXX</p>
              <p>Visit Bokeo Tourism website: www.tourismlaos.org</p>
            </div>

            <div className="bg-primary-50 rounded-lg p-4 text-center">
              <p className="mb-2 text-lg font-semibold text-gray-900">
                Enjoy your stay in Bokeo Province and Lao PDR!
              </p>
              <p className="text-sm text-gray-700">
                ຍິນດີຕ້ອນຮັບ (Yin dee ton hap) - Welcome!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
