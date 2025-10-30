"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { Calendar } from "lucide-react";
import { fmtDate, loLocale } from "@/lib";
import { enUS, zhCN } from "react-day-picker/locale";
import { addDays, format, subDays } from "date-fns";
import { Lang } from "@/types/language";

import "react-day-picker/style.css";
import "@/styles/custom-react-day-picker.css";

const today = new Date();

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  lang: Lang;
}

export function DatePicker({ value, onChange, lang }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [month, setMonth] = useState<Date>(new Date(value));
  const [mounted, setMounted] = useState(false);
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
    if (!showPicker) {
      setMonth(new Date(value));
    }

    setShowPicker(!showPicker);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggleCalendar}
        className="focus:border-primary-500 focus:ring-primary-500/20 flex h-11 w-[10rem] items-center justify-between gap-2 rounded-sm border border-gray-300 bg-white px-3 text-sm transition-colors hover:border-gray-400 focus:ring-2 focus:outline-none"
      >
        <span>{formattedDate}</span>
        <Calendar className="h-4 w-4 text-gray-500" />
      </button>

      {showPicker && (
        <Fragment>
          <div className="fixed inset-0 z-10" onClick={handleToggleCalendar} />
          <div className="absolute top-full left-0 z-20 mt-1 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
            <DayPicker
              mode="single"
              locale={getLocale()}
              selected={new Date(value)}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date: Date | undefined) => {
                if (date) {
                  onChange(format(date, "yyyy-MM-dd"));
                  setShowPicker(false);
                }
              }}
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
