import { Metadata } from "next";
import {
  Accessibility,
  Baby,
  Heart,
  HeartPulse,
  LucideIcon,
  Phone,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import { Lang } from "@/types/language";

interface SpecialServicesPageProps {
  params: Promise<{ lang: string }>;
}

interface SpecialService {
  id: string;
  name: string;
  subtitle?: string;
  icon: LucideIcon;
  color: "teal" | "gray" | "orange";
  description: string;
  services: string[];
  howToRequest: string[];
  note?: string;
}

export async function generateMetadata({
  params,
}: SpecialServicesPageProps): Promise<Metadata> {
  const { lang } = await params;

  const metadata = {
    en: {
      title: "Special Services",
      description:
        "Special assistance and services at Bokeo International Airport. Information about wheelchair assistance, medical services, VIP services, unaccompanied minors, and accessibility features.",
    },
    lo: {
      title: "ບໍລິການພິເສດ",
      description:
        "ການຊ່ວຍເຫລືອພິເສດ ແລະ ບໍລິການຕ່າງໆທີ່ສະໜາມບິນສາກົນບໍ່ແກ້ວ. ຂໍ້ມູນກ່ຽວກັບການຊ່ວຍເຫລືອລົດເຂັນ, ບໍລິການທາງການແພດ, ບໍລິການ VIP, ເດັກນ້ອຍທີ່ບໍ່ມີຜູ້ໃຫຍ່ໄປພ້ອມ ແລະ ຄຸນສົມບັດການເຂົ້າເຖິງ.",
    },
    zh: {
      title: "特殊服务",
      description:
        "博胶国际机场的特殊协助和服务。了解轮椅协助、医疗服务、VIP服务、无人陪伴未成年人和无障碍设施的信息。",
    },
  };

  return {
    title: metadata[lang as Lang].title,
    description: metadata[lang as Lang].description,
  };
}

export default async function SpecialServicesPage() {
  const specialServices: SpecialService[] = [
    {
      id: "unaccompanied-minor",
      name: "Unaccompanied Minor Service",
      subtitle: "Children & Minors",
      icon: Baby,
      color: "teal",
      description: "Safe and caring service for children traveling alone",
      services: [
        "Dedicated staff escort from check-in to aircraft",
        "Priority boarding assistance",
        "Supervision during transit or layovers",
        "Meet and greet service at destination",
        "Regular updates to parents/guardians",
        "Special meal provisions available",
      ],
      howToRequest: [
        "Book at least 48 hours in advance",
        "Contact airline directly to arrange service",
        "Complete unaccompanied minor form",
        "Parent/guardian must accompany to check-in",
        "Valid ID and contact information required",
        "Additional fees may apply",
      ],
      note: "Age restrictions vary by airline. Typically for children aged 5-12 traveling alone.",
    },
    {
      id: "mobility-assistance",
      name: "Mobility Assistance",
      subtitle: "Wheelchair, Elderly, Pregnant, Disabled",
      icon: Accessibility,
      color: "gray",
      description:
        "Comprehensive assistance for passengers with reduced mobility",
      services: [
        "Wheelchair service throughout the airport",
        "Priority check-in and boarding",
        "Assistance through security screening",
        "Escort service to departure gate",
        "Special seating arrangements",
        "Baggage handling assistance",
        "Accessible restroom facilities",
        "Elevator and ramp access throughout terminal",
      ],
      howToRequest: [
        "Request at time of booking (recommended)",
        "Contact airline at least 48 hours before departure",
        "Arrive at airport 2 hours before departure",
        "Present yourself at designated assistance counter",
        "Medical certificate may be required for some services",
        "Service is provided free of charge",
      ],
      note: "Personal wheelchairs can be checked as baggage at no additional cost.",
    },
    {
      id: "medical-passenger",
      name: "Medical Passengers",
      icon: HeartPulse,
      color: "orange",
      description:
        "Special care for passengers requiring medical attention or equipment",
      services: [
        "Oxygen supply coordination (with advance notice)",
        "Stretcher service for non-ambulatory passengers",
        "Medical escort arrangements",
        "Priority seating near lavatories if needed",
        "Assistance with medical equipment",
        "Refrigerated storage for medications",
        "Coordination with medical staff",
        "Special meal requirements for dietary restrictions",
      ],
      howToRequest: [
        "Medical clearance required from airline",
        "Submit medical information form (MEDIF)",
        "Request at least 7 days before travel",
        "Doctor's certificate may be required",
        "Specify all medical equipment needs",
        "Confirm oxygen availability with airline",
        "Additional charges may apply for some services",
      ],
      note: "Passengers with serious medical conditions must travel with a medical escort.",
    },
    {
      id: "special-care",
      name: "Special Care Services",
      icon: Users,
      color: "gray",
      description:
        "Customized assistance for passengers requiring special attention",
      services: [
        "Language interpretation services",
        "Assistance for passengers with visual impairments",
        "Support for passengers with hearing impairments",
        "Cultural sensitivity accommodations",
        "Religious facility access (prayer rooms)",
        "Dietary restriction coordination",
        "VIP lounge access arrangements",
        "Meet and assist service",
      ],
      howToRequest: [
        "Notify airline of specific needs at booking",
        "Contact airport services 48 hours in advance",
        "Describe requirements in detail",
        "Request through airline customer service",
        "Some services available at airport information desk",
        "Staff will coordinate with relevant departments",
      ],
    },
    {
      id: "priority-service",
      name: "Priority Assistance",
      icon: UserCheck,
      color: "teal",
      description:
        "Fast-track services for passengers requiring expedited assistance",
      services: [
        "Priority check-in counters",
        "Fast-track security screening",
        "Priority boarding",
        "Dedicated assistance staff",
        "Expedited baggage handling",
        "VIP waiting areas (where available)",
        "Direct gate access assistance",
        "Immigration priority lanes",
      ],
      howToRequest: [
        "Available for certain ticket classes",
        "Request at check-in for medical reasons",
        "Pregnant passengers (beyond 28 weeks)",
        "Passengers with tight connections",
        "Elderly passengers may request assistance",
        "Contact airline for eligibility",
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "teal":
        return {
          bg: "bg-bokeo-teal-100",
          icon: "text-bokeo-teal-600",
          border: "border-bokeo-teal-200",
          hover: "hover:border-bokeo-teal-400",
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
          bg: "bg-bokeo-teal-100",
          icon: "text-bokeo-teal-600",
          border: "border-bokeo-teal-200",
          hover: "hover:border-bokeo-teal-400",
        };
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
        <div className="flex-shrink-0">
          <div className="bg-bokeo-teal-100 flex h-16 w-16 items-center justify-center rounded-xl sm:h-20 sm:w-20">
            <Heart className="text-bokeo-teal-600 h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:mb-3 sm:text-3xl">
            Special Services
          </h1>
          <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
            Exceptional care and assistance to all passengers. Our special
            services ensure comfort, safety, and convenience for those requiring
            additional support.
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="rounded-r-lg border-l-4 border-orange-500 bg-orange-50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600 sm:h-6 sm:w-6" />
          <div>
            <p className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
              Advance Booking Required
            </p>
            <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
              Most special services require advance notification. Please contact
              your airline at the time of booking or at least 48 hours before
              your flight to ensure availability and proper arrangements.
            </p>
          </div>
        </div>
      </div>

      {/* Services Icons Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
        {specialServices.map((service) => {
          const Icon = service.icon;
          const colors = getColorClasses(service.color);

          return (
            <div
              key={service.id}
              className="group cursor-pointer transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon Circle */}
                <div
                  className={`h-24 w-24 rounded-full ${colors.bg} mb-3 flex items-center justify-center border-2 ${colors.border} ${colors.hover} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg sm:mb-4 sm:h-32 sm:w-32`}
                >
                  <Icon
                    className={`h-10 w-10 ${colors.icon} sm:h-14 sm:w-14`}
                  />
                </div>

                {/* Service Name */}
                <h3 className="mb-1 text-xs leading-tight font-semibold text-gray-900 sm:text-sm">
                  {service.name}
                </h3>
                {service.subtitle && (
                  <p className="text-xs leading-tight text-gray-600">
                    {service.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Service Information */}
      <div className="mt-8 space-y-6 sm:mt-12 sm:space-y-8">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Service Details & How to Request
        </h2>

        {specialServices.map((service) => {
          const Icon = service.icon;
          const colors = getColorClasses(service.color);

          return (
            <div
              key={service.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              {/* Service Header */}
              <div
                className={`${colors.bg} border-b ${colors.border} p-4 sm:p-6`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border-2 bg-white ${colors.border} sm:h-16 sm:w-16`}
                  >
                    <Icon className={`h-6 w-6 ${colors.icon} sm:h-8 sm:w-8`} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="mb-1 text-lg font-bold text-gray-900 sm:text-2xl">
                      {service.name}
                    </h3>
                    {service.subtitle && (
                      <p className="mb-1.5 text-xs text-gray-600 sm:mb-2 sm:text-sm">
                        {service.subtitle}
                      </p>
                    )}
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-4 sm:p-6">
                <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
                  {/* Services Provided */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 sm:text-lg">
                      <UserCheck className="text-bokeo-teal-600 h-4 w-4 sm:h-5 sm:w-5" />
                      Services Provided
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {service.services.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-bokeo-teal-600 mt-0.5 font-bold sm:mt-1">
                            ✓
                          </span>
                          <span className="text-xs leading-relaxed sm:text-sm">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to Request */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 sm:text-lg">
                      <Phone className="text-bokeo-teal-600 h-4 w-4 sm:h-5 sm:w-5" />
                      How to Request
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {service.howToRequest.map((step, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-bokeo-teal-600 mt-0.5 font-semibold sm:mt-1">
                            {index + 1}.
                          </span>
                          <span className="text-xs leading-relaxed sm:text-sm">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Note */}
                {service.note && (
                  <div className="border-bokeo-teal-500 mt-5 rounded-r-lg border-l-4 bg-blue-50 p-3 sm:mt-6 sm:p-4">
                    <p className="flex items-start gap-2 text-xs text-gray-700 sm:text-sm">
                      <span className="font-semibold text-gray-900">Note:</span>
                      <span>{service.note}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* General Information */}
      <div className="from-bokeo-teal-50 to-bokeo-teal-100 border-bokeo-teal-200 rounded-xl border bg-gradient-to-br p-4 sm:p-6">
        <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
          General Information
        </h3>
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-4 sm:p-5">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">
              <Accessibility className="text-bokeo-teal-600 h-4 w-4 sm:h-5 sm:w-5" />
              At the Airport
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
              <li>• Special assistance counters clearly marked</li>
              <li>• Staff available 24/7 during flight operations</li>
              <li>• Accessible facilities throughout terminal</li>
              <li>• Priority lanes for passengers requiring assistance</li>
              <li>• Dedicated waiting areas available</li>
            </ul>
          </div>

          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-4 sm:p-5">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">
              <Stethoscope className="text-bokeo-teal-600 h-4 w-4 sm:h-5 sm:w-5" />
              Medical Facilities
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
              <li>• 24-hour medical clinic on premises</li>
              <li>• Trained medical staff on duty</li>
              <li>• First aid stations in key locations</li>
              <li>• Emergency medical equipment available</li>
              <li>• Coordination with local hospitals if needed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-6">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
          <Phone className="text-bokeo-teal-600 h-5 w-5 sm:h-6 sm:w-6" />
          Need Special Assistance?
        </h3>
        <p className="mb-3 text-sm leading-relaxed text-gray-700 sm:mb-4 sm:text-base">
          Our dedicated special services team is here to help make your journey
          comfortable and stress-free. Contact us in advance to arrange any
          special assistance you may need.
        </p>
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-3 sm:p-4">
            <p className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
              Book with Your Airline
            </p>
            <p className="text-xs text-gray-700 sm:text-sm">
              Contact your airline directly at time of booking
            </p>
            <p className="text-bokeo-teal-600 mt-1.5 text-xs font-medium sm:mt-2 sm:text-sm">
              Recommended: 48-72 hours advance notice
            </p>
          </div>
          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-3 sm:p-4">
            <p className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
              Airport Assistance Desk
            </p>
            <p className="text-xs text-gray-700 sm:text-sm">
              Located in arrivals and departures halls
            </p>
            <p className="text-bokeo-teal-600 mt-1.5 text-xs font-medium sm:mt-2 sm:text-sm">
              Available 24/7 during operations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
