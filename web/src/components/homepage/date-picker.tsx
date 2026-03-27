"use client";

import { useCallback, useRef, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, subDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import { enUS, zhCN } from "react-day-picker/locale";
import { loLocale } from "@/constants";
import { cn, fmtDate } from "@/lib";
import { Lang } from "@/types/language";

import "react-day-picker/style.css";
import "@/styles/custom-react-day-picker.css";

const today = new Date();
const ESTIMATED_POPUP_HEIGHT = 380;

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
  const [positionAbove, setPositionAbove] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

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
      // Set month to the selected date's month
      setMonth(date);

      // Calculate position before showing
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const spaceBelow = viewportHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;

        // Position above if not enough space below but enough above
        setPositionAbove(
          spaceBelow < ESTIMATED_POPUP_HEIGHT &&
            spaceAbove > ESTIMATED_POPUP_HEIGHT,
        );
      }
    }
    setShowCalendar(!showCalendar);
  };

  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) {
      onDateChange(newDate);
      setShowCalendar(false);
    }
  };

  return (
    <div className="relative w-full lg:w-52 xl:w-60">
      <button
        ref={buttonRef}
        onClick={handleToggleCalendar}
        className={cn(
          "group relative flex h-12 w-full items-center gap-3 rounded-lg border-2 bg-white px-3 text-left transition-all xl:px-4",
          showCalendar
            ? "border-[#00AAAC] ring-2 ring-[#e6f7f8]"
            : "border-gray-200 hover:border-gray-300",
        )}
      >
        <div
          className={cn(
            "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors",
            showCalendar ? "bg-[#e6f7f8]" : "bg-gray-100",
          )}
        >
          <CalendarIcon
            className={cn(
              "h-4 w-4 transition-colors",
              showCalendar ? "text-[#00AAAC]" : "text-gray-500",
            )}
          />
        </div>
        <div className="flex-1">
          <div
            className={cn(
              "text-xs font-semibold tracking-wide uppercase transition-colors",
              showCalendar ? "text-[#00AAAC]" : "text-gray-500",
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
            className="fixed inset-0 z-20"
            onClick={() => setShowCalendar(false)}
          />
          <div
            className={cn(
              "absolute left-0 z-30 rounded-xl border border-gray-200 bg-white p-4 shadow-2xl",
              positionAbove ? "bottom-full mb-2" : "top-full mt-2",
            )}
          >
            <DayPicker
              mode="single"
              locale={getLocale()}
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
              disabled={{
                before: subDays(today, 6),
                after: addDays(today, 14),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
