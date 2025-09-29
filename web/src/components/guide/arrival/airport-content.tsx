import { PlaneLanding, AlertCircle } from "lucide-react";

export function ArrivalAirportContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <PlaneLanding className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Arriving at Bokeo International Airport
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Welcome to Bokeo International Airport! If you're arriving on a
              flight with a stopover or transfer, please follow the passage
              directly to proceed to international arrivals. If your flight is
              non-stop to Bokeo, please follow signs to the international
              arrivals hall.
            </p>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <div className="flex gap-2">
                <AlertCircle className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800">
                    <strong>Important:</strong> Upon landing, remain seated with
                    your seatbelt fastened until the aircraft comes to a
                    complete stop and the seatbelt sign is turned off. Please
                    check that you have all your belongings before disembarking.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Disembarkation Process
              </h3>
              <ol className="list-inside list-decimal space-y-2">
                <li>
                  Follow cabin crew instructions for orderly disembarkation
                </li>
                <li>Collect all cabin baggage from overhead bins</li>
                <li>
                  Check your seat area for personal items (phones, glasses,
                  documents)
                </li>
                <li>
                  Follow signs for "International Arrivals" (ມາເຖິງສາກົນ /
                  国际到达)
                </li>
                <li>
                  Proceed through the jet bridge or down aircraft stairs to
                  terminal
                </li>
              </ol>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                First Steps After Landing
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="mb-3 text-sm text-gray-700">
                  Once inside the terminal, follow directional signs to:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1 font-bold">→</span>
                    <span>
                      <strong>Health Screening</strong> (if required - during
                      health emergencies)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1 font-bold">→</span>
                    <span>
                      <strong>Immigration/Passport Control</strong> - First
                      checkpoint for all international arrivals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1 font-bold">→</span>
                    <span>
                      <strong>Baggage Claim</strong> - After immigration
                      clearance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1 font-bold">→</span>
                    <span>
                      <strong>Customs</strong> - Final checkpoint before
                      entering Laos
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <p className="text-sm text-yellow-800">
                <strong>⏱️ Estimated Processing Time:</strong> Allow 30-60
                minutes for the complete arrival process during normal hours,
                longer during peak times (multiple flight arrivals). Be patient
                and follow staff directions.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Airport Facilities
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-2 font-medium text-gray-900">
                    Available Services:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Currency exchange booths</li>
                    <li>• ATM machines (LAK, USD withdrawal)</li>
                    <li>• Free WiFi throughout terminal</li>
                    <li>• Information desks</li>
                    <li>• Restrooms</li>
                    <li>• Drinking water stations</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-2 font-medium text-gray-900">
                    Assistance Available:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Wheelchair service (request at desk)</li>
                    <li>• Porter services for luggage</li>
                    <li>• Medical first aid station</li>
                    <li>• Lost & found office</li>
                    <li>• Airport police</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded bg-gray-50 p-3 text-xs text-gray-600">
              <p className="mb-1 font-medium">Emergency Contact:</p>
              <p>
                Airport Information: +856-84-211-XXX (Available during operating
                hours)
              </p>
              <p>
                Emergency Services: Dial 1191 (Police), 1195 (Medical Emergency)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
