import { useState, useEffect, useRef } from "react";
import ReactDatePicker from "react-datepicker";
import { PatternFormat } from "react-number-format";
import { LuClock } from "react-icons/lu";
import { cn } from "@/lib";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/styles/react-time-picker.css";

interface TimePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
}

export function TimePicker({
  label,
  value,
  onChange,
  placeholder = "00:00",
  error,
  disabled = false,
  className,
}: TimePickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync input value with external value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Convert HH:mm string to Date
  const timeToDate = (time: string): Date | null => {
    if (!time || time.includes("_")) return null;
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Convert Date to HH:mm string
  const dateToTime = (date: Date | null): string => {
    if (!date) return "";
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Validate time format
  const isValidTime = (time: string): boolean => {
    if (!time || time.includes("_")) return false;
    const regex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
    return regex.test(time);
  };

  // Custom validation for hours (00-23) and minutes (00-59)
  const isAllowed = (values: { formattedValue: string }) => {
    const { formattedValue } = values;
    if (!formattedValue || formattedValue === "__:__") return true;

    const parts = formattedValue.split(":");
    if (parts.length !== 2) return true;

    const [hours, minutes] = parts;

    if (hours && !hours.includes("_")) {
      const h = parseInt(hours, 10);
      if (h > 23) return false;
    } else if (hours && hours[0] !== "_") {
      const firstDigit = parseInt(hours[0], 10);
      if (firstDigit > 2) return false;
    }

    if (minutes && !minutes.includes("_")) {
      const m = parseInt(minutes, 10);
      if (m > 59) return false;
    } else if (minutes && minutes[0] !== "_") {
      const firstDigit = parseInt(minutes[0], 10);
      if (firstDigit > 5) return false;
    }

    return true;
  };

  const handleInputChange = (formattedValue: string) => {
    setInputValue(formattedValue);

    // Immediately call onChange when valid time is complete
    if (isValidTime(formattedValue)) {
      onChange(formattedValue);
    }
  };

  const handleInputBlur = () => {
    if (inputValue && isValidTime(inputValue)) {
      onChange(inputValue);
    } else if (!inputValue || inputValue === "__:__") {
      setInputValue("");
      onChange("");
    } else {
      setInputValue(value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue && isValidTime(inputValue)) {
        onChange(inputValue);
      }
    }
  };

  const handlePickerChange = (date: Date | null) => {
    const time = dateToTime(date);
    setInputValue(time);
    onChange(time);
    setIsPickerOpen(false);
  };

  const handleClockClick = () => {
    if (!disabled) {
      setIsPickerOpen(!isPickerOpen);
    }
  };

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <div
          className={cn(
            "relative flex w-full items-center rounded-lg border border-gray-300 bg-white text-sm",
            "focus-within:ring-primary focus-within:border-transparent focus-within:ring-2 focus-within:outline-none",
            disabled && "cursor-not-allowed bg-gray-100",
            error && "border-danger focus-within:ring-danger",
          )}
        >
          {/* Clock icon button - opens date picker */}
          <button
            type="button"
            onClick={handleClockClick}
            disabled={disabled}
            className={cn(
              "flex items-center justify-center px-3 py-2 text-gray-400 hover:text-gray-600",
              disabled && "cursor-not-allowed",
            )}
          >
            <LuClock className="h-4 w-4" />
          </button>

          {/* Input field with pattern format */}
          <PatternFormat
            format="##:##"
            mask="_"
            value={inputValue}
            onValueChange={(values) => handleInputChange(values.formattedValue)}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            isAllowed={isAllowed}
            className={cn(
              "flex-1 border-none bg-transparent py-2 pr-3 outline-none",
              "placeholder:text-gray-400",
              disabled && "cursor-not-allowed",
            )}
          />
        </div>

        {/* ReactDatePicker for time selection */}
        {isPickerOpen && (
          <div className="absolute top-full left-0 z-50 mt-1">
            <ReactDatePicker
              selected={timeToDate(inputValue)}
              onChange={handlePickerChange}
              onClickOutside={() => setIsPickerOpen(false)}
              open={true}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              timeCaption="Time"
              dateFormat="HH:mm"
              timeFormat="HH:mm"
              disabled={disabled}
              inline
            />
          </div>
        )}
      </div>

      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
}
