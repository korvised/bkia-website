import { AlertCircle, FileText, UserCheck } from "lucide-react";

export function BorderContent() {
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
            <div className="bg-primary-50 rounded-lg p-2 sm:hidden">
              <UserCheck className="text-primary-500 h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-2xl">
              Immigration & Border Control
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base">
            <div>
              <p className="mb-4 text-gray-700">
                All passengers departing Bokeo International Airport on
                international flights must complete immigration procedures at
                the departure immigration counters. Present your valid travel
                documents and completed departure card.
              </p>
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
                      <span>
                        Valid Lao passport (minimum 6 months validity)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Completed departure card</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>
                        Valid visa for destination country (if required)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Boarding pass</span>
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
                      <span>Valid passport (minimum 6 months validity)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Completed departure card (white card)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Valid Lao visa or visa exemption proof</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500">•</span>
                      <span>Boarding pass</span>
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
                    Important Reminders
                  </h4>
                  <ul className="space-y-2 text-sm text-yellow-800">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>
                        Departure cards are distributed on arrival or available
                        at immigration counters. Fill out in advance to save
                        time.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>
                        Keep the arrival portion of your immigration card with
                        your passport - you&#39;ll need to surrender it upon
                        departure.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>
                        Ensure your passport has sufficient blank pages (minimum
                        2 pages recommended).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>
                        Immigration officers may ask about your stay duration,
                        accommodation, and travel purpose.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Visa Overstay
              </h3>
              <div className="border-l-4 border-red-500 bg-red-50 p-4">
                <p className="mb-3 text-sm text-red-800">
                  <strong>
                    ⚠️ Overstaying your visa is a serious offense in Lao PDR:
                  </strong>
                </p>
                <ul className="space-y-2 text-sm text-red-800">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Fines of USD 10 per day of overstay</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>
                      Detention at immigration facility until fines are paid
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Possible deportation and future entry ban</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>
                      Criminal charges for extended overstays (30+ days)
                    </span>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-red-800">
                  If you realize you&#39;ve overstayed, visit the Immigration
                  Office in Ban Houayxay before attempting to depart to settle
                  fines and obtain proper documentation.
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Special Cases
              </h3>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="mb-1 font-medium text-gray-900">
                      Children & Minors:
                    </p>
                    <p>
                      Children under 18 traveling alone or with one parent may
                      require a consent letter from the non-traveling parent(s),
                      notarized and translated into English or Lao.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-gray-900">
                      Lost Passport:
                    </p>
                    <p>
                      Contact your embassy/consulate immediately. Obtain
                      emergency travel document. Report to Lao Immigration
                      Office for exit clearance. Additional fees and processing
                      time required.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-medium text-gray-900">
                      Dual Nationals:
                    </p>
                    <p>
                      Must depart using the same passport used for entry. Inform
                      immigration officer of dual nationality if questions
                      arise.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>💡 Quick Tip:</strong> Immigration processing at Bokeo
                International Airport typically takes 5-15 minutes. Have all
                documents ready and clearly visible. After clearance, proceed to
                the security checkpoint.
              </p>
            </div>

            <div className="rounded bg-gray-50 p-3 text-xs text-gray-600">
              <p className="mb-1 font-medium">Immigration Office Contact:</p>
              <p>
                Bokeo Immigration Department: Available at the airport during
                flight operations
              </p>
              <p>Emergency Contact: +856-84-211-234 (24/7)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
