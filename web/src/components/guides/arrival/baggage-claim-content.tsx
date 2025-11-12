import { AlertCircle, Clock, Luggage, Search } from "lucide-react";

export function BaggageClaimContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="hidden flex-shrink-0 sm:block">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <Luggage className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-x-2 sm:mb-4">
            <div className="bg-primary-50 rounded-lg p-2 sm:hidden">
              <Luggage className="text-primary-500 h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
              Baggage Claim
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <p className="mb-4 text-gray-700">
                After clearing immigration, proceed to the baggage claim area to
                collect your checked luggage. Bokeo International Airport has 2
                baggage carousels. Flight information screens will display which
                carousel your flight is assigned to.
              </p>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <div className="flex gap-3">
                <Clock className="text-primary-600 h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-800">
                    <strong>Typical Wait Times:</strong>
                  </p>
                  <ul className="space-y-1 text-sm text-gray-800">
                    <li>• First bags appear: 15-25 minutes after landing</li>
                    <li>• Most bags delivered: Within 30-40 minutes</li>
                    <li>• Priority bags (business class): Usually first</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Collecting Your Luggage
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      1
                    </span>
                    <span>
                      Check information screens for your flight number and
                      assigned carousel
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      2
                    </span>
                    <span>
                      Position yourself near the carousel exit point for better
                      visibility
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      3
                    </span>
                    <span>
                      Verify baggage tag matches your claim tag before taking
                      luggage
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      4
                    </span>
                    <span>
                      Inspect luggage for damage immediately - report any damage
                      before leaving baggage hall
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-primary-100 text-primary-700 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                      5
                    </span>
                    <span>
                      Use luggage cart (available free of charge) for heavy or
                      multiple bags
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-6 w-6 flex-shrink-0 text-yellow-600" />
                <div>
                  <h4 className="mb-2 font-semibold text-yellow-900">
                    Important Reminders
                  </h4>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li>
                      • Keep your baggage claim tag (from check-in) until
                      you&#39;ve collected all luggage
                    </li>
                    <li>
                      • Watch your belongings - never leave bags unattended
                    </li>
                    <li>
                      • Fragile items may arrive on separate carousel or service
                      counter
                    </li>
                    <li>
                      • Special items (sports equipment, strollers) delivered at
                      oversized baggage area
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Lost, Delayed, or Damaged Baggage
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Search className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium text-red-900">
                      Missing Baggage
                    </h4>
                  </div>
                  <p className="mb-3 text-sm text-red-800">
                    If your luggage doesn&#39;t arrive:
                  </p>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• Wait until carousel stops completely</li>
                    <li>• Go to Baggage Services counter immediately</li>
                    <li>• Present baggage claim tag and boarding pass</li>
                    <li>• File Property Irregularity Report (PIR)</li>
                    <li>• Provide local contact information</li>
                    <li>• Keep PIR reference number</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <h4 className="font-medium text-orange-900">
                      Damaged Baggage
                    </h4>
                  </div>
                  <p className="mb-3 text-sm text-orange-800">
                    If you notice damage:
                  </p>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>• Report immediately at Baggage Services</li>
                    <li>• Do NOT leave baggage claim area first</li>
                    <li>• Take photos of damage</li>
                    <li>• Complete damage report form</li>
                    <li>• Claims must be filed within 7 days</li>
                    <li>• Contact airline for compensation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Baggage Services Office
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="mb-3 text-sm text-gray-700">
                  <strong>Location:</strong> Baggage claim hall, near carousel 2
                </p>
                <p className="mb-3 text-sm text-gray-700">
                  <strong>Operating Hours:</strong> Available for all arriving
                  flights
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Services Provided:</strong>
                </p>
                <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-700">
                  <li>• Lost baggage tracking and reports</li>
                  <li>• Damage claims processing</li>
                  <li>• Delayed baggage delivery arrangements</li>
                  <li>• Oversized/special items assistance</li>
                </ul>
              </div>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>💡 Pro Tip:</strong> Most delayed bags arrive on the
                next available flight (usually within 24-48 hours). The airline
                will deliver to your accommodation free of charge. Keep your PIR
                number and check status online using airline baggage tracking
                systems.
              </p>
            </div>

            <div className="rounded bg-gray-50 p-3 text-xs text-gray-600">
              <p className="mb-1 font-medium">Baggage Services Contact:</p>
              <p>Phone: +856-84-211-XXX</p>
              <p>Email: baggage@bokeoairport.la</p>
              <p>
                For airline-specific issues, contact your airline&#39;s customer
                service directly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
