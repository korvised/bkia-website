import { Users, Clock, Luggage, AlertCircle } from "lucide-react";

export function CheckinContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <Users className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Check-in Procedures
          </h2>

          <div className="space-y-6">
            <div>
              <p className="mb-4 text-gray-700">
                Upon arrival at Bokeo International Airport's departure
                terminal, proceed to your airline's check-in counter. Present
                your ticket (electronic or paper) and valid identification
                (passport for international flights, Lao ID card for domestic
                flights).
              </p>
              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
                  <div>
                    <p className="mb-1 text-sm font-medium text-yellow-800">
                      <strong>Important Arrival Times:</strong>
                    </p>
                    <ul className="space-y-1 text-sm text-yellow-800">
                      <li>
                        • <strong>Domestic flights:</strong> Arrive 90 minutes
                        before departure
                      </li>
                      <li>
                        • <strong>International flights:</strong> Arrive 2 hours
                        before departure
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="text-primary-500 h-5 w-5" />
                  <h3 className="font-semibold text-gray-900">
                    Counter Operating Hours
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Domestic Flights:</strong>
                  </p>
                  <ul className="ml-2 list-inside list-disc space-y-1">
                    <li>Opens: 2 hours before departure</li>
                    <li>Closes: 40 minutes before departure</li>
                  </ul>
                  <p className="mt-3">
                    <strong>International Flights:</strong>
                  </p>
                  <ul className="ml-2 list-inside list-disc space-y-1">
                    <li>Opens: 3 hours before departure</li>
                    <li>Closes: 50 minutes before departure</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Luggage className="text-primary-500 h-5 w-5" />
                  <h3 className="font-semibold text-gray-900">
                    Baggage Information
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Standard Allowance:</strong>
                  </p>
                  <ul className="ml-2 list-inside list-disc space-y-1">
                    <li>Checked: 20-30 kg (depending on class)</li>
                    <li>Cabin: 7 kg + 1 personal item</li>
                    <li>Dimensions: Max 158cm (L+W+H)</li>
                  </ul>
                  <p className="mt-3 text-xs">
                    <strong>Note:</strong> Excess baggage fees apply. Contact
                    your airline for specific rates.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Special Items & Valuables
              </h3>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="mb-3 text-gray-700">
                  Valuable items should be carried in cabin baggage whenever
                  possible:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Electronics (laptops, cameras, phones)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Jewelry, cash, and important documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Medications and medical devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>
                      Fragile items (declare at check-in if must be checked)
                    </span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-gray-600">
                  Bokeo International Airport and airlines are not responsible
                  for damage to improperly packed items or valuables in checked
                  baggage.
                </p>
              </div>
            </div>

            <div className="border-primary-500 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>💡 Quick Tip:</strong> After check-in, proceed directly
                to security screening. Keep your boarding pass and passport
                easily accessible throughout your airport journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
