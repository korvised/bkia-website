"use client";

import { useState } from "react";
import {
  Award,
  Briefcase,
  ChevronRight,
  Clock,
  Coffee,
  Globe2,
  GraduationCap,
  Heart,
  MapPin,
  Plane,
  Search,
  Shield,
  Stethoscope,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const departments = [
    { id: "all", name: "All Departments", icon: Briefcase },
    { id: "operations", name: "Airport Operations", icon: Plane },
    { id: "security", name: "Security & Safety", icon: Shield },
    { id: "technical", name: "Engineering & Maintenance", icon: Wrench },
    { id: "customer", name: "Customer Service", icon: Users },
    { id: "commercial", name: "Commercial & Retail", icon: Coffee },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description:
        "Comprehensive health insurance, dental, vision coverage, and annual health checkups.",
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description:
        "Professional training programs, aviation certifications, and career advancement.",
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description:
        "Flexible scheduling, 20 days annual leave, and family-friendly policies.",
    },
    {
      icon: Globe2,
      title: "Global Opportunities",
      description:
        "International training programs and knowledge exchange with partner airports.",
    },
    {
      icon: Zap,
      title: "Competitive Package",
      description:
        "Market-leading salaries, performance bonuses, and meal subsidies.",
    },
    {
      icon: Stethoscope,
      title: "Employee Support",
      description:
        "Mental health resources, employee assistance program, and wellness initiatives.",
    },
  ];

  const jobOpenings = [
    {
      id: "JOB-2025-001",
      title: "Airport Operations Supervisor",
      department: "operations",
      location: "Houayxay",
      type: "Full-time",
      experience: "3-5 years",
      postedDate: "2025-02-15",
      description:
        "Lead daily airport operations, coordinate with airlines, manage ground handling teams, and ensure compliance with ICAO standards.",
      requirements: [
        "Bachelor's degree in Aviation Management or related field",
        "3+ years experience in airport operations",
        "Strong leadership and communication skills",
        "Knowledge of ICAO/IATA regulations",
      ],
      salary: "$35,000 - $45,000/year",
    },
    {
      id: "JOB-2025-002",
      title: "Aviation Security Officer",
      department: "security",
      location: "Houayxay",
      type: "Full-time",
      experience: "1-3 years",
      postedDate: "2025-02-20",
      description:
        "Conduct security screening, monitor CCTV systems, patrol terminal areas, and respond to security incidents.",
      requirements: [
        "High school diploma or equivalent",
        "Security training certification required",
        "Physical fitness and attention to detail",
        "Ability to work shifts including nights and weekends",
      ],
      salary: "$18,000 - $24,000/year",
    },
    {
      id: "JOB-2025-003",
      title: "Aircraft Maintenance Engineer",
      department: "technical",
      location: "Houayxay",
      type: "Full-time",
      experience: "5+ years",
      postedDate: "2025-02-10",
      description:
        "Perform scheduled and unscheduled maintenance on ground support equipment, troubleshoot technical issues, and maintain safety standards.",
      requirements: [
        "Aircraft Maintenance License (AML) or equivalent",
        "5+ years hands-on maintenance experience",
        "Strong mechanical and electrical knowledge",
        "Proficient in English and Lao",
      ],
      salary: "$42,000 - $58,000/year",
    },
    {
      id: "JOB-2025-004",
      title: "Customer Service Agent",
      department: "customer",
      location: "Houayxay",
      type: "Full-time",
      experience: "1-2 years",
      postedDate: "2025-03-01",
      description:
        "Assist passengers with check-in, boarding, baggage handling, provide flight information, and resolve customer inquiries.",
      requirements: [
        "High school diploma or equivalent",
        "Fluent in English, Lao, and Thai (Chinese preferred)",
        "Excellent customer service skills",
        "Flexible to work rotating shifts",
      ],
      salary: "$15,000 - $20,000/year",
    },
    {
      id: "JOB-2025-005",
      title: "Retail Store Manager",
      department: "commercial",
      location: "Houayxay",
      type: "Full-time",
      experience: "3-5 years",
      postedDate: "2025-02-25",
      description:
        "Manage duty-free shop operations, supervise retail staff, achieve sales targets, and maintain inventory levels.",
      requirements: [
        "Bachelor's degree in Business or Retail Management",
        "3+ years retail management experience",
        "Strong sales and merchandising skills",
        "Experience with POS systems",
      ],
      salary: "$28,000 - $38,000/year",
    },
  ];

  const hiringProcess = [
    {
      step: "1",
      title: "Application",
      description: "Submit your resume and cover letter through our portal",
    },
    {
      step: "2",
      title: "Review",
      description: "HR reviews applications within 1-2 weeks",
    },
    {
      step: "3",
      title: "Interview",
      description: "Phone or video call with hiring manager",
    },
    {
      step: "4",
      title: "Assessment",
      description: "Skills test or technical evaluation",
    },
    {
      step: "5",
      title: "Final Round",
      description: "In-person interview with department team",
    },
    {
      step: "6",
      title: "Offer",
      description: "Background check and job offer extended",
    },
  ];

  const companyValues = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "The safety and security of passengers, employees, and aircraft is our highest priority.",
    },
    {
      icon: Award,
      title: "Customer Excellence",
      description:
        "We strive to exceed expectations and provide world-class service.",
    },
    {
      icon: Users,
      title: "Teamwork",
      description:
        "We collaborate across departments and respect diverse perspectives.",
    },
    {
      icon: TrendingUp,
      title: "Integrity",
      description: "We operate with honesty, transparency, and accountability.",
    },
  ];

  const filteredJobs = jobOpenings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || job.department === selectedDepartment;
    const matchesLocation =
      selectedLocation === "all" || job.location === selectedLocation;
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      operations: "bg-blue-100 text-blue-700",
      security: "bg-red-100 text-red-700",
      technical: "bg-purple-100 text-purple-700",
      customer: "bg-green-100 text-green-700",
      commercial: "bg-amber-100 text-amber-700",
    };
    return colors[dept] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')]"></div>
        </div>
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl">
            Join Our Team
          </h1>
          <p className="text-sm opacity-90 sm:text-base">
            Build your aviation career at Northern Laos' premier international
            airport
          </p>
        </div>
      </div>

      {/* Company Values */}
      <div className="bg-white py-6 sm:py-8">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-5">
          <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
            Our Values
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="flex items-start gap-2">
                  <div className="rounded-lg bg-white p-2 shadow-sm">
                    <Icon className="h-4 w-4 text-[#00AAAC]" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-xs text-gray-600">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Benefits & Perks
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
              >
                <div className="mb-3 inline-flex rounded-lg bg-gradient-to-br from-[#5CBEC6] to-[#00AAAC] p-2.5">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Job Search */}
      <div className="bg-white py-6 sm:py-8">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Open Positions
        </h2>

        {/* Search and Filters */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-200 py-2.5 pr-3 pl-10 text-sm focus:border-[#5CBEC6] focus:outline-none"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm focus:border-[#5CBEC6] focus:outline-none"
            >
              <option value="all">All Departments</option>
              <option value="operations">Airport Operations</option>
              <option value="security">Security & Safety</option>
              <option value="technical">Engineering & Maintenance</option>
              <option value="customer">Customer Service</option>
              <option value="commercial">Commercial & Retail</option>
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="rounded-lg border-2 border-gray-200 px-3 py-2.5 text-sm focus:border-[#5CBEC6] focus:outline-none"
            >
              <option value="all">All Locations</option>
              <option value="Houayxay">Houayxay</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing <strong>{filteredJobs.length}</strong>{" "}
          {filteredJobs.length === 1 ? "position" : "positions"}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-[#5CBEC6] hover:shadow-lg"
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${getDepartmentColor(job.department)}`}
                    >
                      {departments.find((d) => d.id === job.department)?.name}
                    </span>
                    <span className="rounded-lg bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-[#00AAAC]">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {job.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Posted{" "}
                      {new Date(job.postedDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-[#00AAAC]">
                    {job.salary}
                  </div>
                  <div className="text-xs text-gray-500">Salary Range</div>
                </div>
              </div>

              <p className="mb-3 text-sm leading-relaxed text-gray-600">
                {job.description}
              </p>

              <div className="mb-3 border-t border-gray-200 pt-3">
                <h4 className="mb-2 text-xs font-semibold text-gray-900">
                  Key Requirements
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {job.requirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00AAAC]"></span>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">Job ID: {job.id}</p>
                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg">
                  Apply Now
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <Briefcase className="mx-auto mb-3 h-10 w-10 text-gray-400" />
            <h3 className="mb-2 text-base font-semibold text-gray-900">
              No positions found
            </h3>
            <p className="text-sm text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Hiring Process */}
      <div className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Our Hiring Process
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          A transparent and efficient recruitment journey
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hiringProcess.map((step, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-5 shadow-md transition-all hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] shadow-md">
                  <span className="text-lg font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-3 text-xl font-bold sm:text-2xl">
            Ready to Take Off?
          </h2>
          <p className="mb-6 text-sm opacity-90 sm:text-base">
            Don't see the right position? Submit your resume for future
            opportunities
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <button className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#00AAAC] transition-all hover:bg-gray-100 hover:shadow-lg">
              Submit General Application
            </button>
            <button className="rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#00AAAC]">
              Contact HR Team
            </button>
          </div>
          <p className="mt-4 text-xs opacity-80">
            Questions? Email us at{" "}
            <a href="mailto:careers@bokeoairport.la" className="underline">
              careers@bokeoairport.la
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
