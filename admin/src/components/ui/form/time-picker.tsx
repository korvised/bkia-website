import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
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

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
  ({ value, onClick, placeholder, disabled, error }, ref) => (
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
      <LuClock className="mr-2 h-4 w-4 text-gray-400" />
      <span className={cn("flex-1", !value && "text-gray-400")}>
        {value || placeholder}
      </span>
    </div>
  ),
);

CustomInput.displayName = "CustomInput";

export function TimePicker({
  label,
  value,
  onChange,
  placeholder = "Select time",
  error,
  disabled = false,
  className,
}: TimePickerProps) {
  // Convert HH:mm string to Date
  const timeToDate = (time: string): Date | null => {
    if (!time) return null;
    const [hours, minutes] = time.split(":").map(Number);
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

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={timeToDate(value)}
        onChange={(date) => onChange(dateToTime(date))}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={5}
        timeCaption="Time"
        dateFormat="HH:mm"
        timeFormat="HH:mm"
        placeholderText={placeholder}
        disabled={disabled}
        customInput={
          <CustomInput
            placeholder={placeholder}
            disabled={disabled}
            error={error}
          />
        }
        popperClassName="react-datepicker-popper-custom"
        wrapperClassName="w-full"
        portalId="datepicker-portal"
      />
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
}
