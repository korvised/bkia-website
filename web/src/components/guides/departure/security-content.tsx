import { AlertCircle, Ban, CheckCircle, ShieldCheck } from "lucide-react";

export function SecurityContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="hidden flex-shrink-0 sm:block">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <ShieldCheck className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-x-2 sm:mb-4">
            <div className="bg-primary-50 rounded-lg p-2 sm:hidden">
              <ShieldCheck className="text-primary-500 h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
              Security Screening
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <p className="mb-4 text-gray-700">
                All passengers and cabin baggage must pass through security
                screening at Bokeo International Airport before entering the
                departure area. This is mandatory for your safety and in
                compliance with International Civil Aviation Organization (ICAO)
                standards and Lao PDR aviation security regulations.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Security Screening Process
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Prepare for Screening
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Remove all metal items (keys, coins, belt)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Take out laptops and tablets from bags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Remove jackets and outerwear</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Place items in trays provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>Have boarding pass and ID ready</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Screening Methods
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Walk through metal detector</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>X-ray screening for all baggage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Hand-held metal detector (if needed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Physical bag inspection (random)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Body scan (secondary screening)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Prohibited Items in Cabin Baggage
              </h3>
              <div className="rounded-lg border border-red-500 bg-red-50 p-4">
                <div className="mb-3 flex gap-3">
                  <Ban className="h-6 w-6 flex-shrink-0 text-red-600" />
                  <p className="font-semibold text-red-900">
                    Items NOT allowed in carry-on luggage:
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm font-medium text-red-800">
                      Sharp Objects:
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-red-700">
                      <li>• Knives, scissors (blade over 6cm)</li>
                      <li>• Razors, box cutters</li>
                      <li>• Tools (screwdrivers, wrenches)</li>
                      <li>• Needles (except medical)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-red-800">
                      Weapons & Dangerous Items:
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-red-700">
                      <li>• Firearms, ammunition</li>
                      <li>• Explosives, fireworks</li>
                      <li>• Pepper spray, mace</li>
                      <li>• Stun guns, tasers</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-red-800">
                      Flammable Items:
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-red-700">
                      <li>• Lighters (more than 1)</li>
                      <li>• Gasoline, fuel</li>
                      <li>• Paint, solvents</li>
                      <li>• Matches (strike-anywhere)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-red-800">
                      Other Prohibited:
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-red-700">
                      <li>• Sporting equipment (bats, clubs)</li>
                      <li>• Martial arts equipment</li>
                      <li>• Compressed gases</li>
                      <li>• Corrosive substances</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Liquid Restrictions (100ml Rule)
              </h3>
              <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
                <div className="space-y-3 text-sm text-gray-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="text-primary-600 mt-0.5 h-5 w-5 flex-shrink-0" />
                    <div>
                      <p className="mb-1 font-medium">
                        Liquids, Aerosols, and Gels (LAGs) Rules:
                      </p>
                      <ul className="ml-4 space-y-1">
                        <li>• Maximum 100ml per container</li>
                        <li>
                          • All containers must fit in ONE clear, resealable
                          plastic bag (1 liter capacity)
                        </li>
                        <li>• One bag per passenger</li>
                        <li>
                          • Bag must be removed from carry-on during screening
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 rounded bg-white p-3">
                    <p className="mb-2 font-medium text-gray-900">Includes:</p>
                    <p className="text-xs text-gray-700">
                      Water, beverages, perfume, cologne, shampoo, conditioner,
                      toothpaste, liquid soap, lotion, sunscreen, lip gloss,
                      mascara, gel deodorant, mousse, spray, and similar items
                    </p>
                  </div>
                  <div className="mt-2 rounded bg-green-50 p-3">
                    <p className="mb-1 font-medium text-green-900">
                      Exceptions:
                    </p>
                    <ul className="space-y-1 text-xs text-green-800">
                      <li>• Baby formula, milk (for traveling infants)</li>
                      <li>
                        • Prescription medications (with prescription/medical
                        certificate)
                      </li>
                      <li>
                        • Duty-free liquids purchased at airport (sealed bag
                        with receipt)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-6 w-6 flex-shrink-0 text-yellow-600" />
                <div>
                  <h4 className="mb-2 font-semibold text-yellow-900">
                    Important Security Reminders
                  </h4>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li className="flex items-start gap-2">
                      <span>1.</span>
                      <span>
                        Arrive early - security screening can take 15-30 minutes
                        during peak times
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>2.</span>
                      <span>
                        Cooperate fully with security officers - refusal to
                        comply may result in denied boarding
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>3.</span>
                      <span>
                        Prohibited items will be confiscated - Bokeo Airport
                        cannot store items for later retrieval
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>4.</span>
                      <span>
                        Random additional screening may be required - this is
                        standard procedure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>5.</span>
                      <span>
                        Do not joke about security threats - this is a criminal
                        offense
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>6.</span>
                      <span>
                        Do not agree to carry items for strangers or leave
                        baggage unattended
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                After Security Clearance
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="mb-3 text-sm text-gray-700">
                  Once you clear security, you&#39;ll enter the departure lounge
                  where you can:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>Visit duty-free shops and restaurants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>Use airport lounges (if eligible)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>Rest in waiting areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>Monitor departure boards for gate information</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-gray-600 italic">
                  Note: You cannot return to the public area after clearing
                  security without going through the entire process again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
