"use client";

import { useState } from "react";
import {
  Calendar,
  Plane,
  Users,
  Award,
  Building2,
  TrendingUp,
  Globe2,
  Zap,
  ChevronDown,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
// Import the CSS file in your layout.tsx or globals.css:
// import "@/styles/scroll-animations.css";

// Reusable animated component wrapper
function AnimatedDiv({
  children,
  className = "",
  delay = 0,
  animation = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "up" | "left" | "right" | "scale";
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const animationClass = {
    up: "scroll-reveal",
    left: "scroll-reveal-left",
    right: "scroll-reveal-right",
    scale: "scroll-reveal-scale",
  }[animation];

  return (
    <div
      ref={ref}
      className={`${animationClass} ${isVisible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export default function HistoryPage() {
  const [expandedYear, setExpandedYear] = useState<string>("2023");

  const timelinePeriods = [
    {
      year: "2018",
      title: "Vision & Planning",
      phase: "Concept Phase",
      color: "from-blue-500 to-blue-600",
      milestones: [
        {
          date: "March 2018",
          title: "Feasibility Study Initiated",
          description:
            "Government commissions comprehensive study for international airport in Bokeo Province.",
          icon: Building2,
        },
        {
          date: "September 2018",
          title: "Site Selection Completed",
          description:
            "Location 8km from Houayxay selected for optimal accessibility and minimal environmental impact.",
          icon: MapPin,
        },
      ],
    },
    {
      year: "2019",
      title: "Design & Approval",
      phase: "Planning Phase",
      color: "from-purple-500 to-purple-600",
      milestones: [
        {
          date: "February 2019",
          title: "Master Plan Approved",
          description:
            "$120 million development plan approved with capacity for 500,000 annual passengers.",
          icon: Award,
        },
        {
          date: "June 2019",
          title: "International Partnerships Secured",
          description:
            "Partnership agreements with airport design consultants from Thailand and China.",
          icon: Globe2,
        },
        {
          date: "November 2019",
          title: "Environmental Impact Assessment",
          description:
            "Comprehensive environmental study completed ensuring sustainable development.",
          icon: Zap,
        },
      ],
    },
    {
      year: "2020",
      title: "Construction Begins",
      phase: "Development Phase",
      color: "from-emerald-500 to-emerald-600",
      milestones: [
        {
          date: "January 2020",
          title: "Ground Breaking Ceremony",
          description:
            "Official ground breaking attended by Prime Minister marks beginning of construction.",
          icon: Building2,
        },
        {
          date: "May 2020",
          title: "Runway Foundation Completed",
          description:
            "3,000-meter runway foundation completed meeting ICAO Category 4C standards.",
          icon: Plane,
        },
        {
          date: "October 2020",
          title: "Terminal Construction Starts",
          description:
            "Terminal building construction commences with modern design incorporating Lao cultural elements.",
          icon: Building2,
        },
      ],
    },
    {
      year: "2021",
      title: "Infrastructure Development",
      phase: "Construction Phase",
      color: "from-amber-500 to-amber-600",
      milestones: [
        {
          date: "March 2021",
          title: "Navigation Systems Installed",
          description:
            "CAT II ILS landing system installed, enabling operations in low visibility conditions.",
          icon: Zap,
        },
        {
          date: "July 2021",
          title: "Fire & Rescue Station Completed",
          description:
            "ICAO Category 6 certified station completed with modern equipment and trained personnel.",
          icon: Award,
        },
        {
          date: "December 2021",
          title: "Control Tower Commissioned",
          description:
            "45-meter control tower equipped with latest air traffic management technology.",
          icon: Building2,
        },
      ],
    },
    {
      year: "2022",
      title: "Final Preparations",
      phase: "Pre-Opening Phase",
      color: "from-red-500 to-red-600",
      milestones: [
        {
          date: "April 2022",
          title: "Terminal Facilities Completed",
          description:
            "12,500 sqm terminal featuring 8 check-in counters, 4 immigration booths, 3 baggage carousels.",
          icon: Building2,
        },
        {
          date: "August 2022",
          title: "Certification Process Begins",
          description:
            "Civil Aviation Authority begins comprehensive inspection for international operations.",
          icon: Award,
        },
        {
          date: "November 2022",
          title: "Staff Training Completed",
          description:
            "200+ staff complete intensive training in customer service, security, and emergency response.",
          icon: Users,
        },
      ],
    },
    {
      year: "2023",
      title: "Grand Opening",
      phase: "Launch Phase",
      color: "from-green-500 to-green-600",
      featured: true,
      milestones: [
        {
          date: "March 15, 2023",
          title: "Official Opening Ceremony",
          description:
            "Bokeo International Airport officially opens with inaugural flight to Vientiane.",
          icon: Plane,
          featured: true,
        },
        {
          date: "May 2023",
          title: "International Routes Launch",
          description:
            "First international routes to Bangkok and Chiang Mai commence operations.",
          icon: Globe2,
        },
        {
          date: "September 2023",
          title: "100,000 Passenger Milestone",
          description:
            "Airport welcomes 100,000th passenger just six months after opening.",
          icon: Users,
        },
      ],
    },
    {
      year: "2024",
      title: "Rapid Growth",
      phase: "Expansion Phase",
      color: "from-indigo-500 to-indigo-600",
      milestones: [
        {
          date: "February 2024",
          title: "Route Network Doubles",
          description:
            "Six new destinations added including Kunming, Ho Chi Minh City, Pakse and Savannakhet.",
          icon: Globe2,
        },
        {
          date: "June 2024",
          title: "500,000 Passenger Achievement",
          description:
            "Airport reaches 500,000 passengers, accelerating Phase 2 expansion plans.",
          icon: TrendingUp,
        },
        {
          date: "October 2024",
          title: "ACI Green Recognition Awarded",
          description:
            "Airports Council International recognizes environmental initiatives with Green Airport award.",
          icon: Award,
        },
      ],
    },
    {
      year: "2025",
      title: "Looking Forward",
      phase: "Future Development",
      color: "from-[#5CBEC6] to-[#00AAAC]",
      milestones: [
        {
          date: "January 2025",
          title: "Phase 2 Expansion Announced",
          description:
            "$45 million terminal expansion to increase capacity to 1.5 million by 2027.",
          icon: Building2,
        },
        {
          date: "March 2025",
          title: "1 Million Passenger Milestone",
          description:
            "Airport celebrates serving one millionth passenger, marking major achievement.",
          icon: Users,
          featured: true,
        },
      ],
    },
  ];

  const statistics = [
    {
      label: "Duration",
      value: "36",
      unit: "months",
      desc: "Construction time",
    },
    { label: "Investment", value: "$120M", desc: "Phase 1 cost" },
    { label: "Jobs", value: "1,200+", desc: "Employment created" },
    { label: "Capacity", value: "1.5M", desc: "Annual passengers" },
  ];

  const toggleYear = (year: string) => {
    setExpandedYear(expandedYear === year ? "" : year);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')]"></div>
        </div>
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="fade-in-up mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Our History
          </h1>
          <p className="fade-in-up mb-4 text-sm opacity-90 delay-200 sm:text-base">
            From Vision to Reality - The Journey of Bokeo International Airport
          </p>
          <div className="fade-in-up flex items-center justify-center gap-3 text-xs delay-400 sm:text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              2018 - Present
            </span>
            <span className="h-4 w-px bg-white/30"></span>
            <span>7 Years of Excellence</span>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedDiv className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-5">
            <p className="mb-3 text-sm leading-relaxed text-gray-700">
              Bokeo International Airport represents a transformative vision for
              northern Laos - connecting remote regions to the world while
              fostering economic development in the Greater Mekong Subregion.
            </p>
            <p className="text-sm leading-relaxed text-gray-700">
              This journey from concept to reality showcases determination,
              innovation, and collaboration. Today, the airport stands as a
              symbol of progress and a gateway to opportunity.
            </p>
          </AnimatedDiv>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((stat, index) => (
              <AnimatedDiv
                key={index}
                animation="scale"
                delay={index * 0.1}
                className="rounded-lg bg-white p-4 text-center shadow-md"
              >
                <div className="mb-1 flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-[#00AAAC]">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-sm text-gray-600">{stat.unit}</span>
                  )}
                </div>
                <div className="mb-1 text-sm font-semibold text-gray-900">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-600">{stat.desc}</div>
              </AnimatedDiv>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedDiv>
            <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl">
              Development Timeline
            </h2>
          </AnimatedDiv>
          <AnimatedDiv delay={0.1}>
            <p className="mb-6 text-center text-sm text-gray-600">
              Key milestones in our journey from planning to world-class airport
            </p>
          </AnimatedDiv>

          {/* Interactive Timeline */}
          <div className="space-y-3">
            {timelinePeriods.map((period, periodIndex) => {
              const isExpanded = expandedYear === period.year;
              const isFeatured = period.featured;

              return (
                <AnimatedDiv
                  key={period.year}
                  animation="left"
                  delay={periodIndex * 0.05}
                  className={`overflow-hidden rounded-lg border-2 transition-all ${
                    isFeatured
                      ? "border-[#5CBEC6] bg-gradient-to-br from-blue-50 to-purple-50"
                      : "border-gray-200 bg-white"
                  } ${isExpanded ? "shadow-lg" : "shadow-md hover:shadow-lg"}`}
                >
                  {/* Year Header */}
                  <button
                    onClick={() => toggleYear(period.year)}
                    className="w-full px-5 py-4 text-left transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${period.color} shadow-md transition-transform hover:scale-110`}
                        >
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">
                            {period.year}{" "}
                            {isFeatured && (
                              <Sparkles className="ml-1 inline h-4 w-4 animate-pulse text-[#00AAAC]" />
                            )}
                          </div>
                          <div className="text-xs text-gray-600">
                            {period.phase}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                          <div className="text-sm font-bold text-gray-900">
                            {period.title}
                          </div>
                          <div className="text-xs text-gray-600">
                            {period.milestones.length} milestones
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div className="mt-2 block text-sm font-semibold text-gray-900 sm:hidden">
                      {period.title}
                    </div>
                  </button>

                  {/* Milestones */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-gray-200 bg-gray-50 px-5 py-4">
                      <div className="space-y-4">
                        {period.milestones.map((milestone, idx) => {
                          const Icon = milestone.icon;
                          return (
                            <div
                              key={idx}
                              className={`milestone-slide group rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                                milestone.featured
                                  ? "border-2 border-[#5CBEC6]"
                                  : "border border-gray-200"
                              }`}
                              style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                              <div className="flex gap-4">
                                <div
                                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r ${period.color} transition-transform hover:rotate-12`}
                                >
                                  <Icon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="mb-1 flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-semibold text-[#00AAAC]">
                                      {milestone.date}
                                    </span>
                                    {milestone.featured && (
                                      <span className="rounded-full bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-2 py-0.5 text-xs font-bold text-white">
                                        Major Milestone
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="mb-2 text-base font-bold text-gray-900">
                                    {milestone.title}
                                  </h4>
                                  <p className="text-sm leading-relaxed text-gray-600">
                                    {milestone.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </AnimatedDiv>
              );
            })}
          </div>

          {/* Timeline Legend */}
          <AnimatedDiv
            delay={0.3}
            className="mt-6 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#00AAAC]" />
                Featured Milestone
              </span>
              <span className="h-4 w-px bg-gray-300"></span>
              <span className="flex items-center gap-1.5">
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                Click year to expand
              </span>
              <span className="h-4 w-px bg-gray-300"></span>
              <span className="text-gray-600">
                {timelinePeriods.reduce(
                  (acc, p) => acc + p.milestones.length,
                  0,
                )}{" "}
                Total Milestones
              </span>
            </div>
          </AnimatedDiv>
        </div>
      </div>

      {/* Future Vision */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedDiv className="mb-6 text-center">
            <h2 className="mb-3 text-xl font-bold sm:text-2xl">
              The Journey Continues
            </h2>
            <p className="mx-auto max-w-2xl text-sm opacity-90">
              As we look to the future, Bokeo International Airport remains
              committed to growth, innovation, and serving as a catalyst for
              regional development.
            </p>
          </AnimatedDiv>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Phase 2 Completion", value: "2027" },
              { label: "Future Annual Capacity", value: "3M" },
              { label: "Destination Goals", value: "20+" },
            ].map((item, idx) => (
              <AnimatedDiv
                key={idx}
                animation="scale"
                delay={idx * 0.1}
                className="hover-scale rounded-lg border border-white/20 bg-white/5 p-4 text-center backdrop-blur-sm"
              >
                <div className="mb-1 text-2xl font-bold text-[#5CBEC6]">
                  {item.value}
                </div>
                <div className="text-xs">{item.label}</div>
              </AnimatedDiv>
            ))}
          </div>

          <AnimatedDiv delay={0.4} className="mt-6 text-center">
            <button className="hover-scale rounded-lg bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-6 py-2.5 text-sm font-semibold transition-all hover:shadow-lg">
              Explore Our Vision
            </button>
          </AnimatedDiv>
        </div>
      </div>
    </div>
  );
}
