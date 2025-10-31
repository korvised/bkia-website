import { UserCheck, FileText, AlertCircle, Clock, Package } from "lucide-react";

export function BorderInspectionContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="hidden flex-shrink-0 sm:block">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <UserCheck className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-x-2 sm:mb-4">
            <div className="bg-primary-50 flex items-center justify-center rounded-lg p-2 sm:hidden">
              <UserCheck className="text-primary-500 h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
              Immigration / Border Control (Arrival)
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <p className="mb-4 text-gray-700">
                All international passengers must clear immigration control at
                Bokeo International Airport. Present your passport and completed
                arrival card at the immigration counter. Lao citizens and
                foreign nationals use separate queues.
              </p>
            </div>

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex gap-3">
                <Clock className="h-6 w-6 flex-shrink-0 text-yellow-600" />
                <div>
                  <p className="mb-2 text-sm font-medium text-yellow-800">
                    <strong>⏱️ Estimated Wait Time:</strong>
                  </p>
                  <ul className="space-y-1 text-sm text-yellow-800">
                    <li>• Off-peak hours: 5-15 minutes</li>
                    <li>• Peak hours (multiple arrivals): 15-45 minutes</li>
                    <li>• Have documents ready to expedite processing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Required Documents
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText className="text-primary-500 h-5 w-5" />
                    <h4 className="font-medium text-gray-900">Lao Citizens</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Valid Lao passport</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Completed arrival card</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>No visa required for Lao nationals</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText className="text-primary-500 h-5 w-5" />
                    <h4 className="font-medium text-gray-900">
                      Foreign Nationals
                    </h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Valid passport (6+ months validity)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Valid Lao visa OR visa exemption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Completed arrival card (white form)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Return/onward ticket (may be checked)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Visa on Arrival (VOA)
              </h3>
              <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
                <p className="mb-3 text-sm text-gray-800">
                  <strong>Available at Bokeo International Airport:</strong>{" "}
                  Citizens of most countries can obtain a visa on arrival.
                  Requirements and process:
                </p>
                <div className="space-y-2 text-sm text-gray-800">
                  <p>
                    <strong>Fee:</strong> USD 30-42 (depending on nationality).
                    Payment in USD cash only.
                  </p>
                  <p>
                    <strong>Processing Time:</strong> 10-20 minutes
                  </p>
                  <p>
                    <strong>Validity:</strong> 30 days from date of entry
                  </p>
                  <p>
                    <strong>Documents Needed:</strong>
                  </p>
                  <ul className="ml-6 space-y-1">
                    <li>• Passport with 6 months validity and 2 blank pages</li>
                    <li>
                      • 1 passport photo (4x6cm) - photo booth available at
                      airport
                    </li>
                    <li>• Completed visa application form</li>
                    <li>• Cash in USD for visa fee</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Immigration Interview Questions
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="mb-3 text-sm text-gray-700">
                  Immigration officers may ask you the following questions.
                  Answer honestly and clearly:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>Q:</strong> What is the purpose of your visit?
                    <br />
                    <span className="text-xs text-gray-600">
                      A: Tourism / Business / Visiting family / Transit
                    </span>
                  </li>
                  <li>
                    <strong>Q:</strong> How long will you stay in Laos?
                    <br />
                    <span className="text-xs text-gray-600">
                      A: State your planned duration (e.g., "5 days," "2 weeks")
                    </span>
                  </li>
                  <li>
                    <strong>Q:</strong> Where will you be staying?
                    <br />
                    <span className="text-xs text-gray-600">
                      A: Provide hotel name or address
                    </span>
                  </li>
                  <li>
                    <strong>Q:</strong> Do you have sufficient funds for your
                    stay?
                    <br />
                    <span className="text-xs text-gray-600">
                      A: Yes (officers rarely check but may ask)
                    </span>
                  </li>
                </ul>
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
                      • Keep the departure portion of your arrival card - you'll
                      need it when leaving Laos
                    </li>
                    <li>
                      • Immigration will stamp your passport with entry date and
                      permitted stay duration
                    </li>
                    <li>
                      • Check your stamp carefully before leaving the counter
                    </li>
                    <li>
                      • If you lose your arrival card, report to immigration
                      office for replacement
                    </li>
                    <li>
                      • Do not overstay your visa - fines of USD 10/day apply
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                After Immigration Clearance
              </h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-700">
                  Once your passport is stamped, proceed to the baggage claim
                  area. Follow signs for baggage carousels. Your flight number
                  will be displayed on screens above the carousel.
                </p>
              </div>
            </div>

            <div className="rounded bg-gray-50 p-3 text-xs text-gray-600">
              <p className="mb-1 font-medium">Need Assistance?</p>
              <p>Immigration Help Desk: Available at the immigration hall</p>
              <p>Emergency: Contact airport police or information desk</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
