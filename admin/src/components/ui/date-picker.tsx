import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { LuCalendar, LuX } from "react-icons/lu";
import { cn } from "@/lib";
import "react-datepicker/dist/react-datepicker.css";
import "@/assets/styles/_date-picker.css";

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  isClearable?: boolean;
  showTimeSelect?: boolean;
  timeFormat?: string;
  timeIntervals?: number;
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  isClearable?: boolean;
  hasValue?: boolean;
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
  (
    {
      value,
      onClick,
      onClear,
      placeholder,
      disabled,
      error,
      isClearable,
      hasValue,
    },
    ref,
  ) => (
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
      <span className={cn("flex-1", !value && "text-gray-400")}>
        {value || placeholder}
      </span>
      {isClearable && hasValue && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
          className="ml-2 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <LuX className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  ),
);

CustomInput.displayName = "CustomInput";

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Select date",
  error,
  disabled = false,
  className,
  minDate,
  maxDate,
  dateFormat = "dd/MM/yyyy",
  isClearable = true,
  showTimeSelect = false,
  timeFormat = "HH:mm",
  timeIntervals = 15,
}: DatePickerProps) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        dateFormat={showTimeSelect ? `${dateFormat} ${timeFormat}` : dateFormat}
        placeholderText={placeholder}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        showTimeSelect={showTimeSelect}
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
        customInput={
          <CustomInput
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            isClearable={isClearable}
            hasValue={!!value}
            onClear={() => onChange(null)}
          />
        }
        popperClassName="react-datepicker-popper-custom"
        calendarClassName="react-datepicker-calendar-custom"
        wrapperClassName="w-full"
        portalId="datepicker-portal"
      />
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
}
