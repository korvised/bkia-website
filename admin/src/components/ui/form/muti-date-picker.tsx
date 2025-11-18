import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { LuCalendar, LuX } from "react-icons/lu";
import { cn } from "@/lib";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/styles/react-date-picker.css";

interface MultiDatePickerProps {
  label?: string;
  values: Date[];
  onChange: (dates: Date[]) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  count: number;
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
  ({ onClick, placeholder, disabled, error, count }, ref) => (
    <div
      ref={ref}
      onClick={disabled ? undefined : onClick}
      className={cn(
        "relative flex w-full cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
        "focus-within:ring-primary focus-within:border-transparent focus-within:ring-2 focus-within:outline-none",
        disabled && "cursor-not-allowed bg-gray-100",
        error && "border-danger focus-within:ring-danger",
      )}
    >
      <LuCalendar className="mr-2 h-4 w-4 text-gray-400" />
      <span className={cn("flex-1", count === 0 && "text-gray-400")}>
        {count > 0
          ? `${count} date${count > 1 ? "s" : ""} selected`
          : placeholder}
      </span>
    </div>
  ),
);

CustomInput.displayName = "CustomInput";

export function MultiDatePicker({
  label,
  values,
  onChange,
  placeholder = "Select dates",
  error,
  disabled = false,
  className,
  minDate,
  maxDate,
}: MultiDatePickerProps) {
  const handleChange = (date: Date | null) => {
    if (!date) return;

    const exists = values.some((d) => d.toDateString() === date.toDateString());

    if (exists) {
      onChange(values.filter((d) => d.toDateString() !== date.toDateString()));
    } else {
      onChange([...values, date].sort((a, b) => a.getTime() - b.getTime()));
    }
  };

  const handleRemoveDate = (dateToRemove: Date) => {
    onChange(
      values.filter((d) => d.toDateString() !== dateToRemove.toDateString()),
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={null}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        highlightDates={values}
        customInput={
          <CustomInput
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            count={values.length}
          />
        }
        popperClassName="react-datepicker-popper-custom"
        calendarClassName="react-datepicker-calendar-custom react-datepicker-multi-select"
        wrapperClassName="w-full"
        portalId="datepicker-portal"
        shouldCloseOnSelect={false}
        inline={false}
      />

      {/* Selected dates with primary theme */}
      {values.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {values.map((date) => (
            <span
              key={date.toISOString()}
              className="bg-primary-100 text-primary-700 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
            >
              {date.toLocaleDateString("en-GB")}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemoveDate(date)}
                  className="hover:bg-primary-200 rounded-full p-0.5"
                >
                  <LuX className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
}
