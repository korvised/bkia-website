"use client";

import { useCallback, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, subDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import { enUS, zhCN } from "react-day-picker/locale";
import { cn, fmtDate } from "@/lib";
import { Lang } from "@/types/language";
import { loLocale } from "@/lib/constants";

import "react-day-picker/style.css";
import "@/styles/custom-react-day-picker.css";

const today = new Date();

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  lang: Lang;
  label: string;
}

export default function DatePicker({
  date,
  onDateChange,
  lang,
  label,
}: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [month, setMonth] = useState<Date>(date);

  const getLocale = useCallback(() => {
    switch (lang) {
      case "zh":
        return zhCN;
      case "lo":
        return loLocale;
      default:
        return enUS;
    }
  }, [lang]);

  const handleToggleCalendar = () => {
    if (!showCalendar) {
      // When opening, set month to the selected date's month
      setMonth(date);
    }
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="relative w-full min-w-fit md:w-56 xl:w-80">
      <button
        onClick={handleToggleCalendar}
        className={cn(
          "group relative flex h-14 w-full items-center gap-4 rounded-lg border-2 bg-white px-3 text-left shadow-sm transition-all md:h-16 xl:px-5",
          showCalendar
            ? "border-primary-500 ring-primary-100 shadow-md ring-2"
            : "border-gray-300 hover:border-gray-400 hover:shadow-md",
        )}
      >
        <div
          className={cn(
            "flex flex-shrink-0 items-center justify-center rounded-lg transition-colors md:h-10 md:w-10",
            showCalendar ? "sm:bg-primary-100" : "sm:bg-gray-100",
          )}
        >
          <CalendarIcon
            className={cn(
              "h-5 w-5 transition-colors",
              showCalendar ? "text-primary-600" : "text-gray-700",
            )}
          />
        </div>
        <div className="flex-1">
          <div
            className={cn(
              "text-xs font-semibold tracking-wide uppercase",
              showCalendar ? "text-primary-600" : "text-gray-500",
            )}
          >
            {label}
          </div>
          <div className="mt-0.5 text-sm font-bold text-gray-900 sm:text-base">
            {fmtDate(date, lang)}
          </div>
        </div>
      </button>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowCalendar(false)}
          />
          <div className="absolute bottom-full left-0 z-50 mb-2 rounded-xl border border-gray-200 bg-white p-4 shadow-2xl">
            <DayPicker
              mode="single"
              locale={getLocale()}
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={(newDate) => {
                if (newDate) {
                  onDateChange(newDate);
                  setShowCalendar(false);
                }
              }}
              disabled={{ before: subDays(today, 6), after: addDays(today, 14) }}
            />
          </div>
        </>
      )}
    </div>
  );
}
