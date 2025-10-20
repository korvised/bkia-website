import { Metadata } from "next";
import {
  Banknote,
  Bus,
  Coffee,
  CreditCard,
  Cross,
  HandHeart,
  Heart,
  HelpCircle,
  LucideIcon,
  Luggage,
  Megaphone,
  Package,
  ShieldCheck,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Lang } from "@/types/language";

interface FacilityServicePageProps {
  params: Promise<{ lang: string }>;
}

interface Facility {
  id: string;
  name: string;
  icon: LucideIcon;
  color: "teal" | "gray" | "orange";
  description: string;
  details: string[];
}

export async function generateMetadata({
  params,
}: FacilityServicePageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Airport Facilities & Services",
      description:
        "Discover all facilities and services available at Bokeo International Airport. Find dining options, shops, lounges, ATMs, wifi, prayer rooms, and more amenities.",
    },
    lo: {
      title: "ສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ບໍລິການຂອງສະໜາມບິນ",
      description:
        "ຄົ້ນພົບສິ່ງອຳນວຍຄວາມສະດວກ ແລະ ບໍລິການທັງໝົດທີ່ມີຢູ່ທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຊອກຫາທາງເລືອກການກິນອາຫານ, ຮ້ານຄ້າ, ຫ້ອງພັກຜ່ອນ, ຕູ້ ATM, wifi, ຫ້ອງສວດມົນ ແລະ ສິ່ງອຳນວຍຄວາມສະດວກອື່ນໆ.",
    },
    zh: {
      title: "机场设施与服务",
      description:
        "探索博胶国际机场的所有设施和服务。查找餐饮选择、商店、休息室、ATM、wifi、祈祷室和更多便利设施。",
    },
  };

  return {
    title: metadata[lang as Lang].title,
    description: metadata[lang as Lang].description,
  };
}

export default async function AirportFacilitiesPage() {
  const facilities: Facility[] = [
    {
      id: "joyful-service",
      name: "Joyful Service",
      icon: Heart,
      color: "teal",
      description:
        "Experience comfort and convenience with our passenger-focused amenities",
      details: [
        "Comfortable waiting areas with modern seating",
        "Family rooms and nursing facilities",
        "Children's play areas",
        "Prayer rooms and quiet spaces",
        "Free WiFi throughout the terminal",
      ],
    },
    {
      id: "baggage-cart",
      name: "Baggage Cart Service",
      icon: ShoppingCart,
      color: "teal",
      description: "Free baggage carts available throughout the terminal",
      details: [
        "Located at arrivals and departures areas",
        "Free of charge for all passengers",
        "Easy to maneuver design",
        "Available 24/7",
        "Return stations at key locations",
      ],
    },
    {
      id: "baggage-packing",
      name: "Baggage Packing",
      icon: Luggage,
      color: "gray",
      description: "Professional baggage wrapping and packing services",
      details: [
        "Protective wrapping for luggage",
        "Secure packing materials available",
        "Located near check-in counters",
        "Affordable pricing",
        "Protects against damage and tampering",
      ],
    },
    {
      id: "dining-beverage",
      name: "Dining & Beverage",
      icon: Coffee,
      color: "teal",
      description: "Variety of restaurants, cafes, and beverage outlets",
      details: [
        "Local Lao cuisine and international options",
        "Coffee shops and cafes",
        "Snack bars and convenience stores",
        "Pre-security and post-security dining",
        "Takeaway options available",
      ],
    },
    {
      id: "medical-service",
      name: "Medical Services",
      icon: Cross,
      color: "orange",
      description: "On-site medical assistance and first aid facilities",
      details: [
        "24-hour medical clinic",
        "Trained medical staff on duty",
        "First aid stations",
        "Emergency medical equipment",
        "Pharmacy services available",
      ],
    },
    {
      id: "lost-found",
      name: "Lost & Found",
      icon: Package,
      color: "gray",
      description: "Report and claim lost items at our dedicated counter",
      details: [
        "Located in arrivals hall",
        "Report lost items online or in person",
        "Safe storage of found items",
        "30-day holding period",
        "Identification required for claims",
      ],
    },
    {
      id: "currency-exchange",
      name: "Currency Exchange",
      icon: Banknote,
      color: "orange",
      description: "Foreign exchange services with competitive rates",
      details: [
        "Exchange LAK, USD, THB, and major currencies",
        "Located in arrivals and departures areas",
        "Competitive exchange rates",
        "Open during flight operations",
        "Cash and traveler's checks accepted",
      ],
    },
    {
      id: "transportation",
      name: "Transportation Center",
      icon: Bus,
      color: "teal",
      description: "Ground transportation information and services",
      details: [
        "Taxi service coordination",
        "Bus schedule information",
        "Car rental counters",
        "Hotel shuttle pick-up area",
        "Transportation assistance available",
      ],
    },
    {
      id: "atm",
      name: "ATM Services",
      icon: CreditCard,
      color: "teal",
      description: "Automated teller machines for cash withdrawal",
      details: [
        "Multiple ATM locations in terminal",
        "Accept major international cards",
        "Withdraw LAK and USD",
        "Available 24/7",
        "Secure transaction environment",
      ],
    },
    {
      id: "security-proof",
      name: "Security & Safety",
      icon: ShieldCheck,
      color: "orange",
      description: "Comprehensive security measures for passenger safety",
      details: [
        "24/7 security personnel",
        "CCTV monitoring throughout terminal",
        "Security screening at all entry points",
        "Emergency response team",
        "Lost child assistance",
      ],
    },
    {
      id: "announcements",
      name: "Announcements",
      icon: Megaphone,
      color: "teal",
      description: "Flight information and public announcements",
      details: [
        "Multilingual announcements (Lao, English, Chinese)",
        "Flight status updates",
        "Gate change notifications",
        "Emergency announcements",
        "Information displays throughout terminal",
      ],
    },
    {
      id: "inquiry",
      name: "Information Service",
      icon: HelpCircle,
      color: "orange",
      description: "Friendly staff ready to assist with your questions",
      details: [
        "Information desks in arrivals and departures",
        "Multilingual staff assistance",
        "Terminal maps and directions",
        "Flight information",
        "Local area information and recommendations",
      ],
    },
    {
      id: "self-service",
      name: "24-Hour Self-Service",
      icon: Users,
      color: "gray",
      description: "Automated self-service kiosks for convenience",
      details: [
        "Self-check-in kiosks",
        "Flight information displays",
        "Baggage tag printing",
        "Available 24/7",
        "Easy-to-use interface",
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "teal":
        return {
          bg: "bg-primary-100",
          icon: "text-primary-600",
          border: "border-primary-200",
          hover: "hover:border-primary-400",
        };
      case "orange":
        return {
          bg: "bg-orange-100",
          icon: "text-orange-600",
          border: "border-orange-200",
          hover: "hover:border-orange-400",
        };
      case "gray":
        return {
          bg: "bg-gray-100",
          icon: "text-gray-600",
          border: "border-gray-200",
          hover: "hover:border-gray-400",
        };
      default:
        return {
          bg: "bg-primary-100",
          icon: "text-primary-600",
          border: "border-primary-200",
          hover: "hover:border-primary-400",
        };
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex-shrink-0">
          <div className="bg-primary-100 flex h-16 w-16 items-center justify-center rounded-xl sm:h-20 sm:w-20">
            <HandHeart className="text-primary-600 h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-3 sm:text-3xl">
            Airport Facilities & Services
          </h1>
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            Comprehensive range of facilities and services to ensure your
            comfort and convenience throughout your journey.
          </p>
        </div>
      </div>

      {/* Facilities Grid - Icon View */}
      <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 sm:gap-6 sm:pt-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {facilities.map((facility) => {
          const Icon = facility.icon;
          const colors = getColorClasses(facility.color);

          return (
            <div
              key={facility.id}
              className="group cursor-pointer transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div
                  className={`h-20 w-20 rounded-full ${colors.bg} mb-3 flex items-center justify-center border-2 ${colors.border} ${colors.hover} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg sm:mb-4 sm:h-28 sm:w-28`}
                >
                  <Icon className={`h-9 w-9 ${colors.icon} sm:h-12 sm:w-12`} />
                </div>

                {/* Facility Name */}
                <h3 className="text-xs leading-tight font-semibold text-gray-900 sm:text-sm">
                  {facility.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Information Sections */}
      <div className="mt-8 space-y-4 sm:mt-12 sm:space-y-6">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {facilities.map((facility) => {
            const Icon = facility.icon;
            const colors = getColorClasses(facility.color);

            return (
              <div
                key={facility.id}
                className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md sm:p-6"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`h-10 w-10 flex-shrink-0 rounded-lg ${colors.bg} flex items-center justify-center sm:h-12 sm:w-12`}
                  >
                    <Icon className={`h-5 w-5 ${colors.icon} sm:h-6 sm:w-6`} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="mb-1.5 text-base font-bold text-gray-900 sm:mb-2 sm:text-lg">
                      {facility.name}
                    </h3>
                    <p className="mb-2 text-xs leading-relaxed text-gray-700 sm:mb-3 sm:text-sm">
                      {facility.description}
                    </p>
                    <ul className="space-y-1 sm:space-y-1.5">
                      {facility.details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-xs text-gray-600 sm:text-sm"
                        >
                          <span className="text-primary-600 mt-0.5 sm:mt-1">
                            •
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Information */}
      <div className="from-primary-50 to-primary-100 border-primary-200 mt-6 rounded-xl border bg-gradient-to-br p-4 sm:mt-8 sm:p-6">
        <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900 sm:mb-4 sm:text-lg">
          <HelpCircle className="text-primary-600 h-4 w-4 sm:h-5 sm:w-5" />
          Need More Information?
        </h3>
        <p className="mb-3 text-sm text-gray-700 sm:mb-4 sm:text-base">
          Our friendly staff at the Information Desk are available to assist you
          with any questions or concerns. We're here to make your airport
          experience as smooth and pleasant as possible.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="border-primary-200 rounded-lg border bg-white p-3 sm:p-4">
            <p className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
              Information Desk
            </p>
            <p className="text-xs text-gray-700 sm:text-sm">
              Located in arrivals and departures halls
            </p>
            <p className="text-primary-600 mt-1.5 text-xs font-medium sm:mt-2 sm:text-sm">
              Available 24/7
            </p>
          </div>
          <div className="border-primary-200 rounded-lg border bg-white p-3 sm:p-4">
            <p className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
              Emergency Assistance
            </p>
            <p className="text-xs text-gray-700 sm:text-sm">
              Immediate help for urgent situations
            </p>
            <p className="text-primary-600 mt-1.5 text-xs font-medium sm:mt-2 sm:text-sm">
              Contact airport staff
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
