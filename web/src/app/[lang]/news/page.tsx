"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Search,
} from "lucide-react";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All News", count: 12 },
    { id: "press-release", name: "Press Releases", count: 5 },
    { id: "announcement", name: "Announcements", count: 4 },
    { id: "achievement", name: "Awards & Recognition", count: 2 },
    { id: "media", name: "In the Media", count: 3 },
  ];

  const newsItems = [
    {
      id: "NEWS-2025-001",
      title:
        "Bokeo International Airport Achieves 1 Million Passenger Milestone",
      category: "press-release",
      date: "2025-03-15",
      excerpt:
        "Bokeo International Airport celebrates a significant milestone, welcoming its one millionth passenger since opening in 2023.",
      featured: true,
      tags: ["Milestone", "Growth"],
    },
    {
      id: "NEWS-2025-002",
      title: "New Direct Flight Route to Singapore Launches April 2025",
      category: "announcement",
      date: "2025-03-10",
      excerpt:
        "Singapore Airlines announces new direct service connecting Bokeo to Singapore Changi Airport starting April 15, 2025.",
      featured: true,
      tags: ["Route Expansion", "Singapore Airlines"],
    },
    {
      id: "NEWS-2025-003",
      title: "Airport Receives ACI Asia-Pacific Green Airport Recognition",
      category: "achievement",
      date: "2025-03-05",
      excerpt:
        "ACI Asia-Pacific honors Bokeo International Airport with Green Airport Recognition for sustainability initiatives.",
      featured: true,
      tags: ["Sustainability", "Awards"],
    },
    {
      id: "NEWS-2025-004",
      title: "Terminal Expansion Phase 2 Construction Begins",
      category: "announcement",
      date: "2025-02-28",
      excerpt:
        "Ground breaking ceremony held for $45 million terminal expansion project to increase capacity to 3 million passengers.",
      featured: false,
      tags: ["Expansion", "Infrastructure"],
    },
    {
      id: "NEWS-2025-005",
      title: "Featured in Aviation Week: Northern Laos' Aviation Success Story",
      category: "media",
      date: "2025-02-20",
      excerpt:
        "Aviation Week magazine features Bokeo Airport's remarkable growth and innovative approach to regional connectivity.",
      featured: false,
      tags: ["Media Coverage", "Aviation Week"],
      externalLink: true,
    },
    {
      id: "NEWS-2025-006",
      title: "Airport Introduces Biometric Immigration Clearance",
      category: "announcement",
      date: "2025-02-15",
      excerpt:
        "Advanced biometric technology implemented for faster immigration processing, reducing clearance time by 40%.",
      featured: false,
      tags: ["Technology", "Innovation"],
    },
    {
      id: "NEWS-2025-007",
      title: "Partnership with Lao Airlines Strengthens Domestic Network",
      category: "press-release",
      date: "2025-02-10",
      excerpt:
        "Strategic partnership announced to expand domestic routes with daily services to Pakse and Savannakhet.",
      featured: false,
      tags: ["Partnership", "Lao Airlines"],
    },
    {
      id: "NEWS-2025-008",
      title: "Forbes Names Bokeo Airport Among 'Airports to Watch in 2025'",
      category: "media",
      date: "2025-02-05",
      excerpt:
        "Forbes Travel Guide recognizes Bokeo as one of Asia's emerging aviation hubs for efficient operations.",
      featured: false,
      tags: ["Forbes", "Recognition"],
      externalLink: true,
    },
    {
      id: "NEWS-2025-009",
      title: "Fire & Rescue Team Achieves ICAO Category 6 Certification",
      category: "achievement",
      date: "2025-01-30",
      excerpt:
        "Emergency response team successfully completes rigorous ICAO Category 6 certification for aircraft emergencies.",
      featured: false,
      tags: ["Safety", "ICAO"],
    },
    {
      id: "NEWS-2025-010",
      title: "Duty-Free Shopping Enhanced with New Retail Partners",
      category: "announcement",
      date: "2025-01-25",
      excerpt:
        "Premium duty-free shopping expands with international brands including L'Oréal and local Lao silk boutiques.",
      featured: false,
      tags: ["Retail", "Shopping"],
    },
    {
      id: "NEWS-2025-011",
      title: "CNN Travel: 'Bokeo Airport Sets New Standard'",
      category: "media",
      date: "2025-01-20",
      excerpt:
        "CNN Travel features Bokeo Airport's innovative passenger experience and cultural exhibitions.",
      featured: false,
      tags: ["CNN", "Media"],
      externalLink: true,
    },
    {
      id: "NEWS-2025-012",
      title: "International Aviation Safety Symposium Hosted",
      category: "press-release",
      date: "2025-01-15",
      excerpt:
        "Bokeo Airport welcomes 150+ aviation professionals from 12 countries for two-day safety symposium.",
      featured: false,
      tags: ["Event", "Safety"],
    },
  ];

  const filteredNews = newsItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.filter((item) => item.featured);
  const regularNews = filteredNews.filter((item) => !item.featured);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "press-release": "bg-blue-100 text-blue-700",
      announcement: "bg-purple-100 text-purple-700",
      achievement: "bg-green-100 text-green-700",
      media: "bg-amber-100 text-amber-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')]"></div>
        </div>
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
            News & Press Center
          </h1>
          <p className="text-sm opacity-90 sm:text-base">
            Latest updates and media coverage
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-9 text-sm focus:border-[#5CBEC6] focus:ring-1 focus:ring-[#5CBEC6] focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-md">
            <Download className="h-4 w-4" />
            Media Kit
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] text-white shadow-sm"
                  : "border border-gray-300 bg-white text-gray-700 hover:border-[#5CBEC6]"
              }`}
            >
              {cat.name}
              <span
                className={`rounded-full px-1.5 py-0.5 text-xs ${selectedCategory === cat.id ? "bg-white/20" : "bg-gray-100"}`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featuredNews.length > 0 && (
        <div className="bg-white py-6">
          <div className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-[#00AAAC]" />
            <h2 className="text-lg font-bold text-gray-900">Featured News</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {featuredNews.map((item, idx) => (
              <div
                key={item.id}
                className={`group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-[#5CBEC6] hover:shadow-md ${
                  idx === 0 ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-gray-200 ${idx === 0 ? "h-52" : "h-36"}`}
                >
                  <Image
                    src="/images/news/placeholder.jpg"
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 z-10">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${getCategoryColor(item.category)}`}
                    >
                      {categories.find((c) => c.id === item.category)?.name}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-base font-bold text-gray-900 group-hover:text-[#00AAAC]">
                    {item.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                    {item.excerpt}
                  </p>
                  <div className="mb-3 flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-[#00AAAC] transition-all hover:gap-2">
                    Read More <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All News */}
      <div className="py-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">All News</h2>
          <p className="text-sm text-gray-600">
            Showing {filteredNews.length} articles
          </p>
        </div>
        {regularNews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regularNews.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-[#5CBEC6] hover:shadow-md"
              >
                <div className="relative h-36 overflow-hidden bg-gray-200">
                  <Image
                    src="/images/news/placeholder.jpg"
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  {item.externalLink && (
                    <div className="absolute top-2 right-2 z-10">
                      <ExternalLink className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span
                    className={`mb-1.5 inline-block rounded px-2 py-0.5 text-xs font-semibold ${getCategoryColor(item.category)}`}
                  >
                    {categories.find((c) => c.id === item.category)?.name}
                  </span>
                  <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-sm font-bold text-gray-900 group-hover:text-[#00AAAC]">
                    {item.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                    {item.excerpt}
                  </p>
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-[#00AAAC] transition-all hover:gap-2">
                    Read More <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
            <FileText className="mx-auto mb-2 h-10 w-10 text-gray-400" />
            <h3 className="mb-1 text-base font-semibold text-gray-900">
              No articles found
            </h3>
            <p className="text-sm text-gray-600">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
