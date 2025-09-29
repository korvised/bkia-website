import { Package, CheckCircle, AlertTriangle } from "lucide-react";

export function CustomsInspectionContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <Package className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Customs Declaration (Arrival)
          </h2>

          <div className="space-y-6">
            <div>
              <p className="mb-4 text-gray-700">
                International passengers arriving at Bokeo International Airport
                must declare goods subject to customs duties and comply with Lao
                PDR import regulations. Complete your customs declaration card
                before reaching the inspection counter.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Declaration Requirements
              </h3>
              <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-500" />
                  <div>
                    <p className="mb-2 font-medium text-gray-900">
                      You MUST Declare:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          <strong>Currency:</strong> Foreign currency over USD
                          10,000 or equivalent
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          <strong>Lao Kip:</strong> Amounts over 10,000,000 LAK
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          <strong>Gold & Precious Metals:</strong> All jewelry
                          and gold bars/bullion
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          <strong>Commercial Goods:</strong> Items for resale or
                          business use
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          <strong>Restricted Items:</strong> Medications,
                          plants, animal products
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Duty-Free Allowances
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Tobacco Products
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>200 cigarettes, OR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>50 cigars, OR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>250g of tobacco</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-3 font-medium text-gray-900">Alcohol</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>1 liter of spirits, OR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>2 liters of wine/beer</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Personal Items
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Perfume: 250ml</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Gifts: up to USD 500</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4">
              <div className="flex gap-3">
                <AlertTriangle className="h-6 w-6 flex-shrink-0 text-red-600" />
                <div>
                  <h4 className="mb-2 font-semibold text-red-900">
                    Strictly Prohibited Items
                  </h4>
                  <p className="mb-3 text-sm text-red-800">
                    The following items are absolutely forbidden from entering
                    Lao PDR:
                  </p>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">×</span>
                      <span>
                        <strong>Narcotics:</strong> All illegal drugs - Severe
                        penalties including death penalty for trafficking
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">×</span>
                      <span>
                        <strong>Weapons:</strong> Firearms, ammunition,
                        explosives without special permits
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">×</span>
                      <span>
                        <strong>Pornographic Materials:</strong> Books, videos,
                        magazines of obscene nature
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">×</span>
                      <span>
                        <strong>Counterfeit Goods:</strong> Fake branded
                        products, pirated media
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">×</span>
                      <span>
                        <strong>Endangered Species:</strong> Products from
                        protected animals (ivory, certain plants)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Special Import Rules
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="mb-1 font-medium text-gray-900">
                      Medications:
                    </p>
                    <p>
                      Prescription drugs allowed for personal use (up to 3
                      months supply). Must have prescription and medical
                      certificate in English or Lao. Controlled substances
                      require prior authorization.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-gray-900">
                      Food Items:
                    </p>
                    <p>
                      Packaged, commercially sealed food products generally
                      allowed. Fresh fruits, vegetables, meat, and dairy
                      products are restricted. Declare all food items.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-gray-900">
                      Plants & Seeds:
                    </p>
                    <p>
                      Require phytosanitary certificate. Most live plants
                      prohibited without agricultural department approval.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-gray-900">
                      Electronics:
                    </p>
                    <p>
                      Personal laptops, phones, cameras allowed. Professional
                      equipment may require temporary import permit. Drones
                      require special authorization.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>💡 Pro Tip:</strong> Fill out your customs declaration
                card during the flight. Have your passport and arrival card
                ready. Declaring items honestly prevents delays and potential
                fines. When in doubt, declare it!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
