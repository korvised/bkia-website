import { Plane } from "lucide-react";

export function PurchaseContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="bg-primary-50 flex h-24 w-24 items-center justify-center rounded-lg">
            <Plane className="text-primary-500 h-12 w-12" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Ticket Purchase
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>1. Online Booking:</strong> Purchase tickets through
              official airline websites, authorized travel agents, or online
              booking platforms. Bokeo International Airport is served by Lao
              Airlines and other regional carriers. We recommend booking tickets
              at least 2-3 weeks in advance for better rates.
            </p>
            <p>
              <strong>2. Verify Your Information:</strong> When purchasing
              tickets, carefully check passenger name (must match passport/ID),
              passport number, date of birth, contact information, and departure
              time. Double-check all details before confirming payment to avoid
              travel complications.
            </p>
            <p>
              <strong>3. Baggage Allowance:</strong> Each airline operating from
              Bokeo International Airport has different baggage policies.
              Standard allowance is typically 20-23kg for checked baggage and
              7kg for cabin baggage. Excess baggage fees apply for overweight
              items. Ensure luggage is properly packed and locked to prevent
              damage or loss during transit.
            </p>
            <p>
              <strong>4. Return Tickets:</strong> For international flights,
              ensure your return ticket is confirmed. Unconfirmed return
              reservations may result in denied boarding. Contact your airline
              72 hours before departure to reconfirm international flights.
            </p>
            <p>
              <strong>5. Children and Infant Tickets:</strong> Children aged
              2-11 years receive 50-75% discount on adult fares. Infants under 2
              years travel at 10% of adult fare (lap seat). Provide birth
              certificate or passport when booking. Special meals and services
              for children can be requested at booking.
            </p>
            <p>
              <strong>6. Ticket Changes and Refunds:</strong> Read the fare
              rules carefully before purchasing. Promotional and discount
              tickets often have strict change and cancellation policies.
              Standard tickets allow changes with fees. Keep all booking
              confirmation emails for reference.
            </p>
            <div className="border-primary-500 mt-4 border-l-4 bg-blue-50 p-4">
              <p className="text-sm text-gray-800">
                <strong>💡 Tip:</strong> Bokeo International Airport operates
                flights to Vientiane, Luang Prabang, and select international
                destinations. Check flight schedules on our website or contact
                your airline directly for the most up-to-date information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
