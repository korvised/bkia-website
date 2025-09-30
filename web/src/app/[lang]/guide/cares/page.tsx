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
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="bg-bokeo-teal-100 flex h-20 w-20 items-center justify-center rounded-xl">
            <Heart className="text-bokeo-teal-600 h-10 w-10" />
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            Special Services
          </h1>
          <p className="leading-relaxed text-gray-700">
            Exceptional care and assistance to all passengers. Our special
            services ensure comfort, safety, and convenience for those requiring
            additional support.
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="rounded-r-lg border-l-4 border-orange-500 bg-orange-50 p-5">
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-6 w-6 flex-shrink-0 text-orange-600" />
          <div>
            <p className="mb-1 font-semibold text-gray-900">
              Advance Booking Required
            </p>
            <p className="leading-relaxed text-gray-700">
              Most special services require advance notification. Please contact
              your airline at the time of booking or at least 48 hours before
              your flight to ensure availability and proper arrangements.
            </p>
          </div>
        </div>
      </div>

      {/* Services Icons Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
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
                  className={`h-32 w-32 rounded-full ${colors.bg} mb-4 flex items-center justify-center border-2 ${colors.border} ${colors.hover} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                >
                  <Icon className={`h-14 w-14 ${colors.icon}`} />
                </div>

                {/* Service Name */}
                <h3 className="mb-1 text-sm leading-tight font-semibold text-gray-900">
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
      <div className="mt-12 space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">
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
              <div className={`${colors.bg} border-b ${colors.border} p-6`}>
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border-2 bg-white ${colors.border}`}
                  >
                    <Icon className={`h-8 w-8 ${colors.icon}`} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="mb-1 text-2xl font-bold text-gray-900">
                      {service.name}
                    </h3>
                    {service.subtitle && (
                      <p className="mb-2 text-sm text-gray-600">
                        {service.subtitle}
                      </p>
                    )}
                    <p className="leading-relaxed text-gray-700">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Services Provided */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <UserCheck className="text-bokeo-teal-600 h-5 w-5" />
                      Services Provided
                    </h4>
                    <ul className="space-y-2">
                      {service.services.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-bokeo-teal-600 mt-1 font-bold">
                            ✓
                          </span>
                          <span className="text-sm leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to Request */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <Phone className="text-bokeo-teal-600 h-5 w-5" />
                      How to Request
                    </h4>
                    <ul className="space-y-2">
                      {service.howToRequest.map((step, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-bokeo-teal-600 mt-1 font-semibold">
                            {index + 1}.
                          </span>
                          <span className="text-sm leading-relaxed">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Note */}
                {service.note && (
                  <div className="border-bokeo-teal-500 mt-6 rounded-r-lg border-l-4 bg-blue-50 p-4">
                    <p className="flex items-start gap-2 text-sm text-gray-700">
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
      <div className="from-bokeo-teal-50 to-bokeo-teal-100 border-bokeo-teal-200 rounded-xl border bg-gradient-to-br p-6">
        <h3 className="mb-4 text-xl font-bold text-gray-900">
          General Information
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-5">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
              <Accessibility className="text-bokeo-teal-600 h-5 w-5" />
              At the Airport
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Special assistance counters clearly marked</li>
              <li>• Staff available 24/7 during flight operations</li>
              <li>• Accessible facilities throughout terminal</li>
              <li>• Priority lanes for passengers requiring assistance</li>
              <li>• Dedicated waiting areas available</li>
            </ul>
          </div>

          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-5">
            <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
              <Stethoscope className="text-bokeo-teal-600 h-5 w-5" />
              Medical Facilities
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
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
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
          <Phone className="text-bokeo-teal-600 h-6 w-6" />
          Need Special Assistance?
        </h3>
        <p className="mb-4 leading-relaxed text-gray-700">
          Our dedicated special services team is here to help make your journey
          comfortable and stress-free. Contact us in advance to arrange any
          special assistance you may need.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-4">
            <p className="mb-1 font-semibold text-gray-900">
              Book with Your Airline
            </p>
            <p className="text-sm text-gray-700">
              Contact your airline directly at time of booking
            </p>
            <p className="text-bokeo-teal-600 mt-2 text-sm font-medium">
              Recommended: 48-72 hours advance notice
            </p>
          </div>
          <div className="border-bokeo-teal-200 rounded-lg border bg-white p-4">
            <p className="mb-1 font-semibold text-gray-900">
              Airport Assistance Desk
            </p>
            <p className="text-sm text-gray-700">
              Located in arrivals and departures halls
            </p>
            <p className="text-bokeo-teal-600 mt-2 text-sm font-medium">
              Available 24/7 during operations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
