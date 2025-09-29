import { Package, CheckCircle, AlertTriangle } from "lucide-react";

export function CustomsContent() {
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
            Customs Declaration
          </h2>

          <div className="space-y-6">
            <div>
              <p className="mb-4 text-gray-700">
                All passengers departing from Bokeo International Airport on
                international flights must complete customs procedures if
                carrying declarable items. Lao PDR customs regulations require
                declaration of certain goods, currency, and valuables.
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Currency Declaration Requirements
              </h3>
              <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-500" />
                  <div>
                    <p className="mb-2 font-medium text-gray-900">
                      Declaration Required For:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          <strong>Foreign Currency:</strong> USD 10,000 or
                          equivalent must be declared
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          <strong>Lao Kip:</strong> Amounts over 10,000,000 LAK
                          must be declared
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-primary-500 mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          <strong>Gold/Precious Metals:</strong> All amounts
                          must be declared
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Duty-Free Allowances (Export)
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-3 font-medium text-gray-900">
                    Tobacco Products
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">✓</span>
                      <span>200 cigarettes, OR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">✓</span>
                      <span>50 cigars, OR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">✓</span>
                      <span>250g of tobacco</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-3 font-medium text-gray-900">Alcohol</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">✓</span>
                      <span>1 liter of spirits, OR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">✓</span>
                      <span>2 liters of wine</span>
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
                    The following items are <strong>strictly forbidden</strong>{" "}
                    from export under Lao PDR law:
                  </p>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">×</span>
                      <span>
                        <strong>Narcotics:</strong> All illegal drugs (opium,
                        heroin, methamphetamine, cannabis, etc.) - Severe
                        penalties including life imprisonment or death penalty
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">×</span>
                      <span>
                        <strong>Cultural Artifacts:</strong> Ancient Buddha
                        statues, archaeological items, and historical artifacts
                        without special permit
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">×</span>
                      <span>
                        <strong>Wildlife:</strong> Protected animal products
                        (ivory, endangered species parts) without CITES permit
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">×</span>
                      <span>
                        <strong>Timber:</strong> Unprocessed wood and certain
                        protected wood species without forestry permit
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Items Requiring Special Permits
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-primary-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Religious Artifacts:</strong> Buddha images and
                      religious items require permit from Department of
                      Religious Affairs
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-primary-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Antiques:</strong> Items over 50 years old require
                      export certification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-primary-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Firearms/Weapons:</strong> Require special
                      authorization from Ministry of Public Security
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-primary-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>
                      <strong>Medications:</strong> Prescription drugs require
                      medical certificate and prescription
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>📋 Declaration Process:</strong> If you have items to
                declare, obtain a customs declaration form at the customs
                counter before proceeding to immigration. Complete all sections
                accurately. False declarations may result in fines,
                confiscation, or criminal charges.
              </p>
            </div>

            <div className="rounded bg-gray-50 p-3 text-xs text-gray-600">
              <p className="mb-1 font-medium">For more information:</p>
              <p>
                Contact Bokeo Customs Office or visit the Lao PDR Customs
                Department website for complete regulations and updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
