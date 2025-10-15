"use client";

import {
  Target,
  Compass,
  Briefcase,
  Plane,
  Users,
  ShoppingBag,
  Building2,
  Car,
  Megaphone,
  Wrench,
  Coffee,
  Package,
} from "lucide-react";

export default function AirportCorporationPage() {
  const businessServices = [
    {
      icon: Plane,
      title: "Aviation Ground Services",
      description:
        "Aircraft handling, ramp services, baggage handling, and cargo operations",
    },
    {
      icon: Users,
      title: "Passenger Services",
      description:
        "Check-in services, boarding assistance, VIP lounges, and customer care",
    },
    {
      icon: Car,
      title: "Ground Transportation",
      description:
        "Shuttle buses, taxi services, parking lots, and car rental facilities",
    },
    {
      icon: ShoppingBag,
      title: "Retail & Duty-Free",
      description:
        "Shopping outlets, duty-free stores, and merchandise retail operations",
    },
    {
      icon: Coffee,
      title: "Food & Beverage",
      description:
        "Restaurants, cafes, lounges, and catering services for passengers",
    },
    {
      icon: Building2,
      title: "Property Management",
      description:
        "Office leasing, facility management, and commercial space rental",
    },
    {
      icon: Package,
      title: "Cargo & Logistics",
      description:
        "Air cargo handling, warehousing, cold storage, and express delivery",
    },
    {
      icon: Megaphone,
      title: "Advertising Services",
      description:
        "Design, production, distribution, and agent services for advertisements",
    },
    {
      icon: Wrench,
      title: "Maintenance & Support",
      description:
        "Vehicle transportation, equipment repairs, and technical support services",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')]"></div>
        </div>

        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Bokeo International Airport Corporation
          </h1>
          <p className="mx-auto max-w-3xl text-sm opacity-90 sm:text-base">
            Building the Future of Aviation in Northern Laos
          </p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div>
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-[#5CBEC6]/10 to-[#00AAAC]/10 p-3">
                <Target className="h-8 w-8 text-[#00AAAC] sm:h-10 sm:w-10" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
                Vision
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                To develop Bokeo International Airport into a premier regional
                aviation hub and modern aviation complex serving the Greater
                Mekong Subregion, connecting domestic and international airlines
                with world-class facilities for business, culture, tourism,
                leisure, hospitality, dining, and retail experiences.
              </p>
            </div>

            <div>
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-[#5CBEC6]/10 to-[#00AAAC]/10 p-3">
                <Compass className="h-8 w-8 text-[#00AAAC] sm:h-10 sm:w-10" />
              </div>
              <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
                Mission
              </h2>
              <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                To excel in the operation and management of Bokeo International
                Airport by establishing innovative systems, exploring both
                domestic and regional markets, and bolstering comprehensive
                development through diversified business approaches while
                maintaining the highest standards of safety, efficiency, and
                customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Business Section */}
      <div className="bg-gray-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 text-center sm:mb-8">
            <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-[#5CBEC6]/10 to-[#00AAAC]/10 p-3">
              <Briefcase className="h-8 w-8 text-[#00AAAC] sm:h-10 sm:w-10" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
              Our Business
            </h2>
            <p className="mx-auto max-w-3xl text-sm text-gray-600 sm:text-base">
              Comprehensive aviation services and related businesses supporting
              passenger and cargo operations
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group rounded-lg border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#5CBEC6] hover:shadow-lg"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-gradient-to-br from-[#5CBEC6] to-[#00AAAC] p-2.5">
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <h3 className="mb-2 text-base font-bold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Positioning Statement Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#5CBEC6] opacity-10 blur-3xl sm:h-96 sm:w-96"></div>
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#00AAAC] opacity-10 blur-3xl sm:h-96 sm:w-96"></div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex rounded-full border-2 border-white/20 bg-white/10 px-5 py-1.5 backdrop-blur-sm">
            <span className="text-xs font-semibold tracking-wider uppercase sm:text-sm">
              Our Commitment
            </span>
          </div>

          <h2 className="mb-4 text-xl leading-tight font-bold sm:mb-6 sm:text-2xl lg:text-3xl">
            As a vital gateway connecting northern Laos with the Greater Mekong
            Subregion,
          </h2>

          <p className="mb-3 text-base leading-relaxed opacity-90 sm:text-lg">
            Bokeo International Airport, strategically located in the heart of
            the Golden Triangle,
          </p>

          <p className="mb-3 text-base leading-relaxed opacity-90 sm:text-lg">
            is dedicated to becoming a world-class modern aviation hub,
          </p>

          <p className="text-base leading-relaxed font-semibold sm:text-lg">
            serving people from across Laos, Southeast Asia, and worldwide.
          </p>

          {/* Stats Row */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-4 sm:gap-6">
            <div className="rounded-lg border border-white/20 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 text-2xl font-bold text-[#5CBEC6] sm:text-3xl">
                1.5M
              </div>
              <div className="text-xs text-white/80 sm:text-sm">
                Annual Capacity
              </div>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 text-2xl font-bold text-[#5CBEC6] sm:text-3xl">
                11+
              </div>
              <div className="text-xs text-white/80 sm:text-sm">
                Destinations
              </div>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 text-2xl font-bold text-[#5CBEC6] sm:text-3xl">
                8+
              </div>
              <div className="text-xs text-white/80 sm:text-sm">Airlines</div>
            </div>
            <div className="rounded-lg border border-white/20 bg-white/5 p-3 backdrop-blur-sm sm:p-4">
              <div className="mb-1 text-2xl font-bold text-[#5CBEC6] sm:text-3xl">
                24/7
              </div>
              <div className="text-xs text-white/80 sm:text-sm">Operations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              Our Core Values
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
              Guiding principles that drive our excellence in aviation services
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-white p-6 text-center transition-all duration-300 hover:border-[#5CBEC6] hover:shadow-lg">
              <div className="mb-3 text-4xl font-bold text-[#00AAAC]">01</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Safety First
              </h3>
              <p className="text-sm text-gray-600">
                Unwavering commitment to passenger and operational safety
              </p>
            </div>

            <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-emerald-50 to-white p-6 text-center transition-all duration-300 hover:border-[#5CBEC6] hover:shadow-lg">
              <div className="mb-3 text-4xl font-bold text-[#00AAAC]">02</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Excellence
              </h3>
              <p className="text-sm text-gray-600">
                Delivering world-class service standards consistently
              </p>
            </div>

            <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-purple-50 to-white p-6 text-center transition-all duration-300 hover:border-[#5CBEC6] hover:shadow-lg">
              <div className="mb-3 text-4xl font-bold text-[#00AAAC]">03</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Innovation
              </h3>
              <p className="text-sm text-gray-600">
                Embracing technology and modern solutions
              </p>
            </div>

            <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-amber-50 to-white p-6 text-center transition-all duration-300 hover:border-[#5CBEC6] hover:shadow-lg">
              <div className="mb-3 text-4xl font-bold text-[#00AAAC]">04</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Sustainability
              </h3>
              <p className="text-sm text-gray-600">
                Environmental responsibility in all operations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="mb-2 text-xl font-bold sm:text-2xl">
            Partner With Us
          </h2>
          <p className="mb-6 text-sm opacity-90 sm:text-base">
            Explore business opportunities and collaboration at Bokeo
            International Airport
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#00AAAC] transition-all duration-200 hover:bg-gray-100 hover:shadow-lg">
              Business Inquiries
            </button>
            <button className="rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-[#00AAAC]">
              Download Corporate Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
