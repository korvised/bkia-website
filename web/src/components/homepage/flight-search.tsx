"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CloudSun,
  PlaneLanding,
  PlaneTakeoff,
  Search,
  Thermometer,
  Wind,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context";

type Tab = "departure" | "arrival";

interface WeatherData {
  temp: number;
  condition: string;
  windSpeed: number;
}

export default function FlightSearch({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const [tab, setTab] = useState<Tab>("departure");
  const [date, setDate] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  // Mock weather data - replace with actual API call
  const [weather, setWeather] = useState<WeatherData>({
    temp: 20,
    condition: "Partly Cloudy",
    windSpeed: 12,
  });

  const currentTime = useMemo(() => {
    const d = new Date();
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("type", tab);
    if (date) params.set("date", date);
    if (query.trim()) params.set("q", query.trim());
    router.push(`/${lang}/flights?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Translations
  const translations = {
    en: {
      title: "Search for",
      subtitle: "Departures and Arrivals",
      departure: "Departures",
      arrival: "Arrivals",
      pickDate: "Pick a date",
      searchPlaceholder: "Enter flight number / airline / city",
      searchButton: "Flight Search",
      weather: weather.condition,
    },
    lo: {
      title: "ຄົ້ນຫາ",
      subtitle: "ຂໍ້ມູນຖ້ຽວບິນ",
      departure: "ຂາອອກ",
      arrival: "ຂາເຂົ້າ",
      pickDate: "ເລືອກວັນທີ",
      searchPlaceholder: "ປ້ອນເລກຖ້ຽວບິນ / ສາຍການບິນ / ເມືອງ",
      searchButton: "ຄົ້ນຫາຖ້ຽວບິນ",
      weather: "ເມກບາງສ່ວນ",
    },
    zh: {
      title: "搜索",
      subtitle: "出发和到达航班",
      departure: "出发",
      arrival: "到达",
      pickDate: "选择日期",
      searchPlaceholder: "输入航班号 / 航空公司 / 城市",
      searchButton: "航班搜索",
      weather: "局部多云",
    },
  };

  const t = translations[lang];

  return (
    <section className={cn("relative h-full bg-white", className)}>
      <div className="mx-auto flex h-full max-w-[1536px] items-center px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid w-full gap-6 lg:grid-cols-[300px_1fr]">
          {/* Left Column: Title + Weather */}
          <div className="flex flex-col justify-center">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-2xl leading-tight font-bold text-gray-900 sm:text-3xl">
                {t.title}
                <br />
                <span className="text-primary-600">{t.subtitle}</span>
              </h2>
            </div>

            {/* Weather Widget */}
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/70 shadow-sm backdrop-blur-sm">
                  <CloudSun className="h-7 w-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {weather.temp}°C
                    </span>
                    <span className="text-sm text-gray-600">{t.weather}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-3.5 w-3.5" />
                      <span>{currentTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wind className="h-3.5 w-3.5" />
                      <span>{weather.windSpeed} km/h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Search Controls */}
          <div className="flex flex-col justify-center gap-5">
            {/* Tab Navigation */}
            <div className="flex items-center gap-8 border-b-2 border-gray-200">
              <button
                onClick={() => setTab("departure")}
                className={cn(
                  "relative flex items-center gap-2 pb-3 text-base font-semibold transition-colors",
                  tab === "departure"
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <PlaneTakeoff className="h-5 w-5" />
                <span>{t.departure}</span>
                {tab === "departure" && (
                  <div className="bg-primary-600 absolute right-0 -bottom-0.5 left-0 h-0.5" />
                )}
              </button>

              <button
                onClick={() => setTab("arrival")}
                className={cn(
                  "relative flex items-center gap-2 pb-3 text-base font-semibold transition-colors",
                  tab === "arrival"
                    ? "text-primary-600"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                <PlaneLanding className="h-5 w-5" />
                <span>{t.arrival}</span>
                {tab === "arrival" && (
                  <div className="bg-primary-600 absolute right-0 -bottom-0.5 left-0 h-0.5" />
                )}
              </button>
            </div>

            {/* Search Form */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Picker */}
              <div className="relative">
                <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
                  <CalendarDays className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="focus:border-primary-500 focus:ring-primary-500/20 h-12 w-48 rounded-lg border-2 border-gray-300 bg-white pr-3 pl-10 text-sm text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:ring-2 focus:outline-none"
                  placeholder={t.pickDate}
                />
              </div>

              {/* Search Input */}
              <div className="relative min-w-[280px] flex-1">
                <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={t.searchPlaceholder}
                  className="focus:border-primary-500 focus:ring-primary-500/20 h-12 w-full rounded-lg border-2 border-gray-300 bg-white pr-3 pl-10 text-sm text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-400 focus:ring-2 focus:outline-none"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                disabled={!query.trim() && !date}
                className="bg-secondary-500 hover:bg-secondary-600 disabled:hover:bg-secondary-500 inline-flex h-12 items-center gap-2 rounded-lg px-6 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-md"
              >
                <Search className="h-4 w-4" />
                <span>{t.searchButton}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
