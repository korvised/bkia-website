"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Building2,
  Wrench,
  ShoppingBag,
  Megaphone,
  Award,
  ChevronRight,
} from "lucide-react";

export default function BiddingPage() {
  const [activeTab, setActiveTab] = useState("active");

  const categories = [
    { id: "all", name: "All Tenders", icon: FileText },
    { id: "construction", name: "Construction", icon: Building2 },
    { id: "equipment", name: "Equipment", icon: Wrench },
    { id: "services", name: "Services", icon: ShoppingBag },
    { id: "advertising", name: "Advertising", icon: Megaphone },
  ];

  const activeTenders = [
    {
      id: "BID-2025-001",
      title: "Terminal Expansion Phase 2 - Design and Construction",
      category: "construction",
      description:
        "Design, construction and commissioning of terminal expansion to accommodate 3 million annual passengers.",
      publishDate: "2025-01-15",
      closingDate: "2025-03-30",
      budget: "$45,000,000",
      status: "Open",
      documents: [
        { name: "Tender Document", size: "15.2 MB", type: "PDF" },
        { name: "Technical Specifications", size: "8.5 MB", type: "PDF" },
        { name: "Site Plans", size: "25.6 MB", type: "DWG" },
      ],
    },
    {
      id: "BID-2025-002",
      title: "Baggage Handling System Upgrade",
      category: "equipment",
      description:
        "Supply, installation and maintenance of automated baggage handling system with capacity for 1,200 bags per hour.",
      publishDate: "2025-02-01",
      closingDate: "2025-04-15",
      budget: "$8,500,000",
      status: "Open",
      documents: [
        { name: "RFP Document", size: "6.8 MB", type: "PDF" },
        { name: "Technical Requirements", size: "4.2 MB", type: "PDF" },
      ],
    },
    {
      id: "BID-2025-003",
      title: "Airport Cleaning and Janitorial Services",
      category: "services",
      description:
        "3-year contract for comprehensive cleaning services including terminals, restrooms, offices, and public areas.",
      publishDate: "2025-02-10",
      closingDate: "2025-03-25",
      budget: "$1,200,000/year",
      status: "Open",
      documents: [
        { name: "Service Agreement", size: "2.1 MB", type: "PDF" },
        { name: "Scope of Work", size: "1.8 MB", type: "PDF" },
      ],
    },
  ];

  const awardedContracts = [
    {
      id: "AWARD-2024-012",
      title: "Fire and Rescue Equipment Supply",
      category: "equipment",
      winner: "Rosenbauer International",
      awardDate: "2024-12-15",
      contractValue: "$3,200,000",
      description:
        "Supply of 2 ARFF vehicles and firefighting equipment meeting ICAO Category 6 standards.",
    },
    {
      id: "AWARD-2024-011",
      title: "Parking Management System",
      category: "equipment",
      winner: "Amano McGann Inc.",
      awardDate: "2024-11-20",
      contractValue: "$1,850,000",
      description:
        "Installation of automated parking system with 500 spaces and license plate recognition.",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      construction: "bg-blue-100 text-blue-700",
      equipment: "bg-purple-100 text-purple-700",
      services: "bg-green-100 text-green-700",
      advertising: "bg-amber-100 text-amber-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
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
            Bidding & Procurement
          </h1>
          <p className="text-sm opacity-90 sm:text-base">
            Transparent procurement opportunities at Bokeo International Airport
          </p>
        </div>
      </div>

      {/* Principles */}
      <div className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-5">
            <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
              Procurement Principles
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-start gap-2">
                <div className="rounded-lg bg-white p-2 shadow-sm">
                  <Award className="h-4 w-4 text-[#00AAAC]" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">
                    Transparency
                  </h3>
                  <p className="text-xs text-gray-600">
                    Open and fair procurement for all qualified bidders
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-lg bg-white p-2 shadow-sm">
                  <Award className="h-4 w-4 text-[#00AAAC]" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">
                    Competition
                  </h3>
                  <p className="text-xs text-gray-600">
                    Equal opportunity for all companies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-lg bg-white p-2 shadow-sm">
                  <Award className="h-4 w-4 text-[#00AAAC]" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">
                    Value
                  </h3>
                  <p className="text-xs text-gray-600">
                    Best value while maintaining quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab("active")}
              className={`border-b-2 px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === "active"
                  ? "border-[#00AAAC] text-[#00AAAC]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Active Tenders ({activeTenders.length})
            </button>
            <button
              onClick={() => setActiveTab("awarded")}
              className={`border-b-2 px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === "awarded"
                  ? "border-[#00AAAC] text-[#00AAAC]"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Contract Awards ({awardedContracts.length})
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium whitespace-nowrap text-gray-700 transition-all hover:border-[#5CBEC6] hover:text-[#00AAAC]"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {activeTab === "active" && (
            <div className="space-y-4">
              {activeTenders.map((tender) => (
                <div
                  key={tender.id}
                  className="group rounded-lg border border-gray-200 bg-white p-5 transition-all hover:border-[#5CBEC6] hover:shadow-lg"
                >
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${getCategoryColor(tender.category)}`}
                        >
                          {tender.category.toUpperCase()}
                        </span>
                        <span className="rounded-lg bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                          {tender.status}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-[#00AAAC]">
                        {tender.title}
                      </h3>
                      <p className="mb-1 text-xs font-medium text-gray-500">
                        Tender ID: {tender.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#00AAAC]">
                        {tender.budget}
                      </div>
                      <div className="text-xs text-gray-500">Budget</div>
                    </div>
                  </div>

                  <p className="mb-3 text-sm leading-relaxed text-gray-600">
                    {tender.description}
                  </p>

                  <div className="mb-3 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="h-3.5 w-3.5 text-[#00AAAC]" />
                      <span>
                        Published:{" "}
                        {new Date(tender.publishDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-600">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        Closing:{" "}
                        {new Date(tender.closingDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="mb-2 text-xs font-semibold text-gray-900">
                      Documents
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {tender.documents.map((doc, idx) => (
                        <button
                          key={idx}
                          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-left transition-all hover:border-[#5CBEC6] hover:bg-blue-50"
                        >
                          <FileText className="h-4 w-4 flex-shrink-0 text-[#00AAAC]" />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-xs font-medium text-gray-900">
                              {doc.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {doc.type} • {doc.size}
                            </div>
                          </div>
                          <Download className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-500">
                      Contact:{" "}
                      <a
                        href="mailto:procurement@bokeoairport.la"
                        className="text-[#00AAAC] hover:underline"
                      >
                        procurement@bokeoairport.la
                      </a>
                    </p>
                    <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-5 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg">
                      Submit Bid
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "awarded" && (
            <div className="space-y-4">
              {awardedContracts.map((contract) => (
                <div
                  key={contract.id}
                  className="rounded-lg border border-gray-200 bg-white p-5"
                >
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${getCategoryColor(contract.category)}`}
                        >
                          {contract.category.toUpperCase()}
                        </span>
                        <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          AWARDED
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900">
                        {contract.title}
                      </h3>
                      <p className="mb-1 text-xs font-medium text-gray-500">
                        Contract ID: {contract.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-600">
                        {contract.contractValue}
                      </div>
                      <div className="text-xs text-gray-500">Value</div>
                    </div>
                  </div>

                  <p className="mb-3 text-sm leading-relaxed text-gray-600">
                    {contract.description}
                  </p>

                  <div className="grid gap-3 border-t border-gray-200 pt-3 sm:grid-cols-2">
                    <div>
                      <div className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Winner
                      </div>
                      <div className="text-sm font-bold text-gray-900">
                        {contract.winner}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        Award Date
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {new Date(contract.awardDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gray-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
            Procurement Inquiries
          </h2>
          <p className="mb-6 text-sm text-gray-600 sm:text-base">
            Questions about tender requirements or submission process
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-5 shadow-md">
              <h3 className="mb-2 text-base font-bold text-gray-900">
                Procurement Department
              </h3>
              <p className="mb-1 text-sm text-gray-600">
                Email: procurement@bokeoairport.la
              </p>
              <p className="mb-1 text-sm text-gray-600">
                Phone: +856 20 5555 1234
              </p>
              <p className="text-sm text-gray-600">
                Mon-Fri, 8:00 AM - 5:00 PM
              </p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-md">
              <h3 className="mb-2 text-base font-bold text-gray-900">
                Vendor Registration
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Register to receive tender notifications
              </p>
              <button className="w-full rounded-lg bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg">
                Register as Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
