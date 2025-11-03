"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DayPicker } from "react-day-picker";
import { Calendar } from "lucide-react";
import { fmtDate, loLocale } from "@/lib";
import { enUS, zhCN } from "react-day-picker/locale";
import { addDays, format, subDays } from "date-fns";
import { Lang } from "@/types/language";

import "react-day-picker/style.css";
import "@/styles/custom-react-day-picker.css";

const today = new Date();
const ESTIMATED_POPUP_HEIGHT = 380; // Estimated height of the calendar popup

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  lang: Lang;
}

export function DatePicker({ value, onChange, lang }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [month, setMonth] = useState<Date>(new Date(value));
  const [mounted, setMounted] = useState(false);
  const [positionAbove, setPositionAbove] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedDate = value ? new Date(value) : new Date();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const formattedDate = useMemo(
    () => (mounted ? fmtDate(selectedDate, lang) : value),
    [mounted, value, lang, selectedDate],
  );

  const handleToggleCalendar = () => {
    if (!showPicker && buttonRef.current) {
      // Calculate position before showing
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      // Position above if not enough space below but enough above
      setPositionAbove(
        spaceBelow < ESTIMATED_POPUP_HEIGHT &&
          spaceAbove > ESTIMATED_POPUP_HEIGHT,
      );
      setMonth(new Date(value));
    }

    setShowPicker(!showPicker);
  };

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(format(date, "yyyy-MM-dd"));
      setShowPicker(false);
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggleCalendar}
        className="focus:border-primary-500 focus:ring-primary-500/20 flex h-11 w-[10.2rem] min-w-fit items-center justify-between gap-2 rounded-sm border border-gray-300 bg-white px-3 text-sm transition-colors hover:border-gray-400 focus:ring-2 focus:outline-none"
      >
        <span>{formattedDate}</span>
        <Calendar className="h-4 w-4 text-gray-500" />
      </button>

      {showPicker && (
        <Fragment>
          <div className="fixed inset-0 z-10" onClick={handleToggleCalendar} />
          <div
            className={`absolute left-0 z-20 rounded-lg border border-gray-200 bg-white p-3 shadow-lg ${
              positionAbove ? "bottom-full mb-1" : "top-full mt-1"
            }`}
          >
            <DayPicker
              mode="single"
              locale={getLocale()}
              selected={new Date(value)}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
              disabled={{
                before: subDays(today, 6),
                after: addDays(today, 14),
              }}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}
