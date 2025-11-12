"use client";

import { useState } from "react";
import {
  Building2,
  ChevronRight,
  Gauge,
  Globe2,
  MapPin,
  Package,
  Plane,
  TrendingUp,
  Users,
} from "lucide-react";

type Year = "2024" | "2023" | "2022";

export default function SurveyPage() {
  const [selectedYear, setSelectedYear] = useState<Year>("2024");

  const yearlyData: Record<Year, Record<string, string>> = {
    "2024": {
      passengers: "1.24",
      passengersUnit: "Million",
      flights: "15.68",
      flightsUnit: "Thousand",
      cargo: "4.85",
      cargoUnit: "Thousand tons",
    },
    "2023": {
      passengers: "0.88",
      passengersUnit: "Million",
      flights: "12.45",
      flightsUnit: "Thousand",
      cargo: "3.20",
      cargoUnit: "Thousand tons",
    },
    "2022": {
      passengers: "0.35",
      passengersUnit: "Million",
      flights: "5.20",
      flightsUnit: "Thousand",
      cargo: "1.45",
      cargoUnit: "Thousand tons",
    },
  };

  const infrastructureData = [
    {
      icon: MapPin,
      label: "Location",
      value: "Houayxay, Bokeo",
      description: "8km from city center",
    },
    {
      icon: Building2,
      label: "Terminal Area",
      value: "12,500",
      unit: "m²",
      description: "International standards",
    },
    {
      icon: Plane,
      label: "Runway Length",
      value: "3,000",
      unit: "meters",
      description: "A320/B737 capable",
    },
    {
      icon: Users,
      label: "Annual Capacity",
      value: "1.5M",
      unit: "passengers",
      description: "Expandable to 3M",
    },
    {
      icon: Gauge,
      label: "Peak Hour",
      value: "850",
      unit: "pax/hour",
      description: "Efficient processing",
    },
    {
      icon: Globe2,
      label: "Operations",
      value: "24/7",
      unit: "service",
      description: "Full customs & immigration",
    },
  ];

  const routeStats = {
    domestic: {
      count: 5,
      destinations: [
        "Vientiane",
        "Luang Prabang",
        "Pakse",
        "Savannakhet",
        "Phongsaly",
      ],
    },
    international: {
      count: 6,
      destinations: [
        "Bangkok (Thailand)",
        "Chiang Mai (Thailand)",
        "Chiang Rai (Thailand)",
        "Kunming (China)",
        "Ho Chi Minh City (Vietnam)",
        "Siem Reap (Cambodia)",
      ],
    },
    airlines: {
      count: 8,
      carriers: [
        "Lao Airlines",
        "Lao Skyway",
        "Thai Airways",
        "Bangkok Airways",
        "China Eastern",
        "Vietnam Airlines",
        "AirAsia",
        "Cambodia Angkor Air",
      ],
    },
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
            Airport Overview
          </h1>
          <p className="text-sm opacity-90 sm:text-base">
            Northern Laos&#39; premier international gateway
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-6 sm:py-8">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-5">
          <h2 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
            About Bokeo International Airport
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-gray-700">
            <p>
              <strong className="text-gray-900">
                Bokeo International Airport
              </strong>{" "}
              is a vital gateway serving northern Laos and the Greater Mekong
              Subregion. Located in Houayxay, the airport is strategically
              positioned at the heart of the Golden Triangle Special Economic
              Zone.
            </p>
            <p>
              Officially opened in March 2023, the airport was developed with{" "}
              <strong className="text-gray-900">
                comprehensive planning and phased construction
              </strong>
              . Phase I covers 450 hectares with a $120 million investment,
              connecting Laos with Thailand, China, and Vietnam.
            </p>
            <p>
              In 2024, the airport achieved a milestone of serving over{" "}
              <strong className="text-gray-900">1.2 million passengers</strong>,
              establishing itself as a key aviation hub in northern Laos with
              connections to major cities across Southeast Asia.
            </p>
          </div>
        </div>
      </div>

      {/* Infrastructure */}
      <div className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl">
            Infrastructure & Capacity
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructureData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="rounded-lg bg-gradient-to-br from-[#5CBEC6] to-[#00AAAC] p-2.5">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <h3 className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    {item.label}
                  </h3>

                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {item.value}
                    </span>
                    {item.unit && (
                      <span className="text-xs text-gray-600">{item.unit}</span>
                    )}
                  </div>

                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Route Network */}
      <div className="bg-white py-6 sm:py-8">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Route Network
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Connecting Laos to Southeast Asia and beyond
        </p>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          {/* Domestic Routes */}
          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                Domestic Routes
              </h3>
              <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                {routeStats.domestic.count}
              </span>
            </div>
            <ul className="space-y-1.5">
              {routeStats.domestic.destinations.map((dest, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-700"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                  {dest}
                </li>
              ))}
            </ul>
          </div>

          {/* International Routes */}
          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-emerald-50 to-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                International Routes
              </h3>
              <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">
                {routeStats.international.count}
              </span>
            </div>
            <ul className="space-y-1.5">
              {routeStats.international.destinations.map((dest, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-700"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                  {dest}
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Airlines */}
          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-purple-50 to-white p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                Operating Airlines
              </h3>
              <span className="rounded-full bg-purple-600 px-2.5 py-1 text-xs font-bold text-white">
                {routeStats.airlines.count}
              </span>
            </div>
            <ul className="space-y-1.5">
              {routeStats.airlines.carriers.map((airline, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-gray-700"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-purple-600"></span>
                  {airline}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Historical Data */}
      <div className="bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Historical Performance Data
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Year-over-year growth and operational statistics
        </p>

        {/* Year Tabs */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {Object.keys(yearlyData).map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year as Year)}
              className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                selectedYear === year
                  ? "bg-gradient-to-r from-[#5CBEC6] to-[#00AAAC] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Data Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Passenger Throughput */}
          <div className="group rounded-lg bg-white p-5 shadow-md transition-all hover:shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <div className="rounded-lg bg-blue-100 p-2.5">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>

            <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
              Annual Passenger Throughput
            </h3>

            <div className="mb-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-gray-900">
                {yearlyData[selectedYear].passengers}
              </span>
              <span className="text-sm text-gray-600">
                {yearlyData[selectedYear].passengersUnit}
              </span>
            </div>

            <a
              href="#"
              className="inline-flex items-center text-xs text-[#00AAAC] hover:underline"
            >
              View details <ChevronRight className="ml-1 h-3 w-3" />
            </a>
          </div>

          {/* Flight Departures */}
          <div className="group rounded-lg bg-white p-5 shadow-md transition-all hover:shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <div className="rounded-lg bg-emerald-100 p-2.5">
                <Plane className="h-5 w-5 text-emerald-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>

            <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
              Flight Departures
            </h3>

            <div className="mb-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-gray-900">
                {yearlyData[selectedYear].flights}
              </span>
              <span className="text-sm text-gray-600">
                {yearlyData[selectedYear].flightsUnit}
              </span>
            </div>

            <a
              href="#"
              className="inline-flex items-center text-xs text-[#00AAAC] hover:underline"
            >
              View details <ChevronRight className="ml-1 h-3 w-3" />
            </a>
          </div>

          {/* Cargo Throughput */}
          <div className="group rounded-lg bg-white p-5 shadow-md transition-all hover:shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <div className="rounded-lg bg-amber-100 p-2.5">
                <Package className="h-5 w-5 text-amber-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>

            <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
              Freight and Postal Throughput
            </h3>

            <div className="mb-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-gray-900">
                {yearlyData[selectedYear].cargo}
              </span>
              <span className="text-sm text-gray-600">
                {yearlyData[selectedYear].cargoUnit}
              </span>
            </div>

            <a
              href="#"
              className="inline-flex items-center text-xs text-[#00AAAC] hover:underline"
            >
              View details <ChevronRight className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Key Achievements */}
      <div className="bg-white py-6 sm:py-8">
        <h2 className="mb-4 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Key Achievements
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-white p-4 text-center">
            <div className="mb-2 text-3xl font-bold text-[#00AAAC]">
              March 2023
            </div>
            <p className="text-sm font-medium text-gray-700">
              Official Opening
            </p>
            <p className="text-xs text-gray-600">Airport inaugurated</p>
          </div>

          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-emerald-50 to-white p-4 text-center">
            <div className="mb-2 text-3xl font-bold text-[#00AAAC]">$120M</div>
            <p className="text-sm font-medium text-gray-700">Investment</p>
            <p className="text-xs text-gray-600">Phase I development</p>
          </div>

          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-purple-50 to-white p-4 text-center">
            <div className="mb-2 text-3xl font-bold text-[#00AAAC]">450ha</div>
            <p className="text-sm font-medium text-gray-700">Total Area</p>
            <p className="text-xs text-gray-600">Airport campus</p>
          </div>

          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-amber-50 to-white p-4 text-center">
            <div className="mb-2 text-3xl font-bold text-[#00AAAC]">11</div>
            <p className="text-sm font-medium text-gray-700">Destinations</p>
            <p className="text-xs text-gray-600">Domestic & international</p>
          </div>
        </div>
      </div>
    </div>
  );
}
