import {
  AlertCircle,
  CheckCircle,
  Clock,
  Plane,
  Smartphone,
} from "lucide-react";

export function BoardingContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="hidden flex-shrink-0 sm:block">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <Plane className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-x-2 sm:mb-4">
            <div className="bg-primary-50 rounded-lg p-2 sm:hidden">
              <Plane className="text-primary-500 h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
              Boarding & In-Flight Information
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Clock className="text-primary-500 h-5 w-5" />
                Boarding Process
              </h3>
              <div className="mb-4 border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                  <div>
                    <p className="mb-2 text-sm font-medium text-yellow-800">
                      <strong>⏰ Arrive at Your Gate Early:</strong>
                    </p>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      <li>
                        • Boarding typically begins 40-45 minutes before
                        departure
                      </li>
                      <li>
                        • Gate closes 15 minutes before scheduled departure
                      </li>
                      <li>• Late passengers will not be permitted to board</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Boarding Groups at Bokeo International Airport
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-100 text-primary-700 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Priority Boarding
                        </p>
                        <p className="text-xs">
                          Business class, passengers with disabilities, families
                          with infants, elderly passengers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-100 text-primary-700 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Economy Class - Rear Rows
                        </p>
                        <p className="text-xs">
                          Rows 20 and above (typically called first for smaller
                          aircraft)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary-100 text-primary-700 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Economy Class - Middle/Front Rows
                        </p>
                        <p className="text-xs">Remaining passengers</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
                  <p className="text-sm text-gray-800">
                    <strong>📢 Listen for Announcements:</strong> Boarding calls
                    are made in Lao, English, and sometimes Thai or Chinese.
                    Monitor the departure screens for gate changes or delays.
                    Stay within hearing distance of your gate.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Required at Boarding Gate
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>
                        <strong>Boarding Pass:</strong> Paper or mobile (ensure
                        screen is bright and readable)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>
                        <strong>Passport/ID:</strong> Must match boarding pass
                        name exactly
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>
                        <strong>Cabin Baggage:</strong> Within size and weight
                        limits
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="mb-2 text-sm font-medium text-gray-900">
                    Gate Check May Be Required:
                  </p>
                  <p className="mb-2 text-xs text-gray-700">
                    If the aircraft is full or has limited overhead space, cabin
                    bags may need to be gate-checked (stored in cargo hold at no
                    extra charge).
                  </p>
                  <p className="text-xs text-gray-600">
                    Tag will be attached, and bag will be returned to you upon
                    arrival.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Smartphone className="text-primary-500 h-5 w-5" />
                In-Flight Regulations & Safety
              </h3>

              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Electronic Devices Policy
                  </h4>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div>
                      <p className="mb-1 font-medium text-red-700">
                        ❌ Prohibited During Entire Flight:
                      </p>
                      <ul className="ml-4 space-y-1 text-xs">
                        <li>• Cellular/mobile phone calls</li>
                        <li>• Portable WiFi hotspots</li>
                        <li>• Remote control toys</li>
                        <li>• Transmitting devices</li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-1 font-medium text-yellow-700">
                        ⚠️ Airplane Mode Required:
                      </p>
                      <ul className="ml-4 space-y-1 text-xs">
                        <li>
                          • Mobile phones (can use for photos, offline content)
                        </li>
                        <li>• Tablets and e-readers</li>
                        <li>• Portable gaming devices</li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-1 font-medium text-green-700">
                        ✅ Allowed (if announced):
                      </p>
                      <ul className="ml-4 space-y-1 text-xs">
                        <li>• Laptops (after reaching cruising altitude)</li>
                        <li>• Tablets (after reaching cruising altitude)</li>
                        <li>• Noise-cancelling headphones</li>
                        <li>• Medical devices</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Safety Requirements
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        <strong>Seatbelts:</strong> Must be fastened during
                        taxi, takeoff, landing, and whenever the seatbelt sign
                        is illuminated. Keep fastened while seated.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        <strong>Seat Position:</strong> Upright position during
                        takeoff and landing. Tray tables stowed and window
                        shades open.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        <strong>Overhead Bins:</strong> Ensure bags are properly
                        stowed and bins are securely closed.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        <strong>Emergency Exits:</strong> Do not block aisles or
                        emergency exits. Exit row passengers must be willing and
                        able to assist in emergencies.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-red-500 bg-red-50 p-4">
                  <h4 className="mb-2 font-semibold text-red-900">
                    Strictly Prohibited On Board
                  </h4>
                  <ul className="space-y-1 text-sm text-red-800">
                    <li>
                      • Smoking (including e-cigarettes and vaping) - Criminal
                      offense
                    </li>
                    <li>• Tampering with smoke detectors</li>
                    <li>• Consuming personal alcohol</li>
                    <li>• Interfering with flight crew duties</li>
                    <li>• Abusive behavior or harassment</li>
                    <li>• Unauthorized use of emergency equipment</li>
                  </ul>
                  <p className="mt-2 text-xs font-medium text-red-800">
                    ⚖️ Violations may result in arrest, fines up to $25,000 USD,
                    imprisonment, and lifetime flight bans.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                In-Flight Services
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="mb-2 font-medium text-gray-900">
                    Complimentary Services
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Light refreshments on short flights</li>
                    <li>• Full meal service on longer routes</li>
                    <li>• Beverages (water, juice, soft drinks)</li>
                    <li>• Blankets and pillows (subject to availability)</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="mb-2 font-medium text-gray-900">
                    Special Requirements
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>
                      • Special meals: Request at booking (24-48 hrs advance)
                    </li>
                    <li>• Medical assistance: Inform crew upon boarding</li>
                    <li>• Prayer facilities: Inform crew if needed</li>
                    <li>
                      • Child care: Baby-changing facilities in lavatories
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>
                  ✈️ Flight Duration from Bokeo International Airport:
                </strong>
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                <li>• Vientiane: ~2 hours</li>
                <li>• Luang Prabang: ~1 hour</li>
                <li>• Bangkok: ~2 hours</li>
                <li>• Chiang Mai: ~1.5 hours</li>
              </ul>
              <p className="mt-3 text-xs text-gray-600">
                Actual flight times may vary based on weather and air traffic.
                Cruising altitude for regional flights is typically
                25,000-35,000 feet (7,600-10,600 meters).
              </p>
            </div>

            <div className="rounded bg-gray-50 p-3 text-xs text-gray-600">
              <p className="mb-1 font-medium">Need Assistance?</p>
              <p>
                Cabin crew are here to help. Don&#39;t hesitate to press the
                call button for assistance, questions, or emergencies. We wish
                you a safe and pleasant flight from Bokeo International Airport!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
