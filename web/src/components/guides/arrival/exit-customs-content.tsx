import { ClipboardCheck, AlertCircle, UserCheck } from "lucide-react";

export function ExitCustomsContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="hidden flex-shrink-0 sm:block">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <ClipboardCheck className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-x-2 sm:mb-4">
            <div className="bg-primary-50 flex items-center justify-center rounded-lg p-2 sm:hidden">
              <ClipboardCheck className="text-primary-500 h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
              Final Customs Inspection
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <p className="mb-4 text-gray-700">
                Before exiting the arrivals hall, all passengers must pass
                through final customs inspection. Customs officers may conduct
                spot checks and x-ray screening of luggage. This is your last
                checkpoint before entering Lao PDR.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Two Exit Channels
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
                  <h4 className="mb-3 font-medium text-green-900">
                    Green Channel - Nothing to Declare
                  </h4>
                  <p className="mb-3 text-sm text-green-800">
                    Use this channel if you have:
                  </p>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• No goods exceeding duty-free allowances</li>
                    <li>• No restricted or prohibited items</li>
                    <li>• No currency over USD 10,000</li>
                    <li>• Only personal belongings</li>
                  </ul>
                  <p className="mt-3 text-xs font-medium text-green-700">
                    ✓ Most tourists use this channel
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4">
                  <h4 className="mb-3 font-medium text-red-900">
                    Red Channel - Goods to Declare
                  </h4>
                  <p className="mb-3 text-sm text-red-800">
                    Use this channel if you have:
                  </p>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• Currency over USD 10,000</li>
                    <li>• Commercial/business goods</li>
                    <li>• Items exceeding duty-free limits</li>
                    <li>• Restricted items requiring permits</li>
                  </ul>
                  <p className="mt-3 text-xs font-medium text-red-700">
                    ⚠️ Declare to avoid penalties
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-6 w-6 flex-shrink-0 text-yellow-600" />
                <div>
                  <h4 className="mb-2 font-semibold text-yellow-900">
                    Random Inspections
                  </h4>
                  <p className="mb-2 text-sm text-yellow-800">
                    Even in the Green Channel, customs officers may conduct
                    random checks:
                  </p>
                  <ul className="space-y-1 text-sm text-yellow-800">
                    <li>• X-ray screening of luggage</li>
                    <li>• Physical bag inspection</li>
                    <li>• Questions about trip purpose and items brought</li>
                    <li>• This is normal procedure - cooperate fully</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                What Customs Officers Look For
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-red-600">!</span>
                    <span>
                      <strong>Narcotics:</strong> Drug detection is priority #1.
                      K9 units patrol the area.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-orange-600">!</span>
                    <span>
                      <strong>Undeclared currency:</strong> Large amounts of
                      cash trigger immediate investigation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-orange-600">!</span>
                    <span>
                      <strong>Excessive tobacco/alcohol:</strong> Over duty-free
                      limits result in taxes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-orange-600">!</span>
                    <span>
                      <strong>Commercial goods:</strong> Items for resale
                      require proper documentation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 font-bold text-orange-600">!</span>
                    <span>
                      <strong>Prohibited items:</strong> Weapons, counterfeit
                      goods, restricted materials
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <h4 className="mb-2 font-semibold text-red-900">
                Penalties for False Declaration
              </h4>
              <ul className="space-y-2 text-sm text-red-800">
                <li>• Fines: Starting at USD 100 for minor violations</li>
                <li>• Confiscation: Undeclared goods seized</li>
                <li>
                  • Criminal charges: For serious violations (drugs, weapons)
                </li>
                <li>• Deportation: Possible for major infractions</li>
                <li>• Travel ban: Entry refusal for future visits</li>
              </ul>
              <p className="mt-3 text-xs font-medium text-red-800">
                ⚖️ When in doubt, use the Red Channel and declare. It's always
                better to declare and pay duty than face penalties.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                After Customs Clearance
              </h3>
              <div className="rounded-lg bg-blue-50 p-4">
                <p className="mb-2 text-sm text-gray-800">
                  Once you clear customs, you've officially entered Lao PDR!
                  You'll exit into the arrivals hall where you can:
                </p>
                <ul className="ml-4 space-y-1 text-sm text-gray-700">
                  <li>• Meet greeters and hotel representatives</li>
                  <li>• Purchase SIM cards</li>
                  <li>• Arrange transportation (taxi, ride-share)</li>
                  <li>• Exchange currency (if not done earlier)</li>
                  <li>• Get tourist information</li>
                </ul>
              </div>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>💡 Pro Tip:</strong> Keep all receipts from duty-free
                purchases and customs declaration forms. You may need them when
                departing Laos or for insurance claims.
              </p>
            </div>

            <div className="rounded bg-gray-50 p-3 text-xs text-gray-600">
              <p className="mb-1 font-medium">Customs Assistance:</p>
              <p>Customs Office: Located in baggage claim/exit area</p>
              <p>Phone: +856-84-211-XXX</p>
              <p>Available during all flight operations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
