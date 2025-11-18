import { Fragment, useMemo } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
  Portal,
} from "@headlessui/react";
import { LuCheck, LuChevronDown, LuX } from "react-icons/lu";
import { cn } from "@/lib";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelect({
  label,
  options,
  values,
  onChange,
  placeholder = "Select options",
  error,
  disabled = false,
  className,
}: MultiSelectProps) {
  const selectedOptions = useMemo(
    () => options.filter((opt) => values.includes(opt.value)),
    [options, values],
  );

  const handleChange = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(values.filter((v) => v !== value));
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Listbox value="" onChange={handleChange} disabled={disabled}>
        {({ open }) => (
          <div className="relative">
            <ListboxButton
              className={cn(
                "relative w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm",
                "focus:ring-primary focus:border-transparent focus:ring-2 focus:outline-none",
                "disabled:cursor-not-allowed disabled:bg-gray-100",
                error && "border-danger focus:ring-danger",
              )}
            >
              <span
                className={cn(
                  "block truncate",
                  selectedOptions.length === 0 && "text-gray-400",
                )}
              >
                {selectedOptions.length > 0
                  ? `${selectedOptions.length} selected`
                  : placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <LuChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-transform",
                    open && "rotate-180",
                  )}
                />
              </span>
            </ListboxButton>
            <Portal>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptions
                  anchor="bottom start"
                  className="ring-opacity-5 z-[9999] mt-1 max-h-60 w-[var(--button-width)] overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black focus:outline-none"
                >
                  {options.map((option) => (
                    <ListboxOption
                      key={option.value}
                      value={option.value}
                      className={({ focus }) =>
                        cn(
                          "relative cursor-pointer py-2 pr-4 pl-10 select-none",
                          focus
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-700",
                        )
                      }
                    >
                      <>
                        <span
                          className={cn(
                            "block truncate",
                            values.includes(option.value) && "font-medium",
                          )}
                        >
                          {option.label}
                        </span>
                        {values.includes(option.value) && (
                          <span className="text-primary absolute inset-y-0 left-0 flex items-center pl-3">
                            <LuCheck className="h-4 w-4" />
                          </span>
                        )}
                      </>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </Portal>
          </div>
        )}
      </Listbox>

      {/* Selected items */}
      {selectedOptions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="bg-secondary-100 text-secondary-700 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium"
            >
              {option.label}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemove(option.value)}
                  className="hover:bg-secondary-200 rounded-full p-0.5"
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
