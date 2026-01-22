import {
  Banknote,
  Smartphone,
  Car,
  Hotel,
  Info,
  ShoppingBag,
} from "lucide-react";

export function RelatedServices() {
  const services = [
    {
      icon: Banknote,
      label: "Currency Exchange",
      href: "/services/currency-exchange",
      description: "LAK, USD, THB",
    },
    {
      icon: Smartphone,
      label: "SIM Cards",
      href: "/services/sim-cards",
      description: "Mobile connectivity",
    },
    {
      icon: Car,
      label: "Transportation",
      href: "/services/transportation",
      description: "Taxi & car rental",
    },
    {
      icon: Hotel,
      label: "Hotel Booking",
      href: "/services/hotels",
      description: "Accommodation help",
    },
    {
      icon: Info,
      label: "Tourist Information",
      href: "/services/tourist-info",
      description: "Maps & guides",
    },
    {
      icon: ShoppingBag,
      label: "Shops & Cafes",
      href: "/services/shops",
      description: "Refreshments",
    },
  ];

  return (
    <div className="bg-white pt-8">
      <div className="container">
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            Available Services at Arrival
          </h3>
          <p className="text-sm text-gray-600">
            Services available in the arrivals hall at Bokeo International
            Airport
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <a
                key={service.label}
                href={service.href}
                className="hover:border-primary-500 hover:bg-primary-50 group flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4 transition-all"
              >
                <div className="bg-primary-100 group-hover:bg-primary-500 flex h-14 w-14 items-center justify-center rounded-full transition-colors">
                  <Icon className="text-primary-600 h-7 w-7 transition-colors group-hover:text-white" />
                </div>
                <div className="text-center">
                  <span className="block text-sm font-medium text-gray-900">
                    {service.label}
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    {service.description}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-gray-800">
              <strong>ℹ️ Need Assistance?</strong> Visit our Information Desk in
              the arrivals hall or call <strong>+856 84 211 XXX</strong> for
              help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
