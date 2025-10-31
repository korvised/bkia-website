import {
  Banknote,
  Store,
  Utensils,
  Wifi,
  Briefcase,
  Heart,
} from "lucide-react";

export function RelatedServices() {
  const services = [
    {
      icon: Banknote,
      label: "Currency Exchange",
      href: "/services/currency-exchange",
      description: "Exchange LAK, USD, THB",
    },
    {
      icon: Store,
      label: "Duty-Free Shopping",
      href: "/services/duty-free",
      description: "Tax-free products",
    },
    {
      icon: Utensils,
      label: "Restaurants & Cafes",
      href: "/services/dining",
      description: "Food & beverages",
    },
    {
      icon: Wifi,
      label: "Free WiFi",
      href: "/services/wifi",
      description: "High-speed internet",
    },
    {
      icon: Briefcase,
      label: "Business Lounge",
      href: "/services/lounge",
      description: "Quiet work space",
    },
    {
      icon: Heart,
      label: "Special Assistance",
      href: "/services/special-assistance",
      description: "Medical & accessibility",
    },
  ];

  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900">
          Related Airport Services
        </h3>
        <p className="text-sm text-gray-600">
          Services available at Bokeo International Airport
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
            <strong>ℹ️ Need Help?</strong> Visit our Information Desk near the
            main entrance or call <strong>+856 84 211 XXX</strong> for
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
