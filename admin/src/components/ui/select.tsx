import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
  Portal,
} from "@headlessui/react";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { cn } from "@/lib";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
  disabled = false,
  className,
}: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
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
                  !selectedOption && "text-gray-400",
                )}
              >
                {selectedOption?.label || placeholder}
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
                  className="ring-opacity-5 z-[9999] mt-1 max-h-60 w-[var(--button-width)] overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-gray-200 focus:outline-none"
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
                      {({ selected }) => (
                        <>
                          <span
                            className={cn(
                              "block truncate",
                              selected && "font-medium",
                            )}
                          >
                            {option.label}
                          </span>
                          {selected && (
                            <span className="text-primary absolute inset-y-0 left-0 flex items-center pl-3">
                              <LuCheck className="h-4 w-4" />
                            </span>
                          )}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </Portal>
          </div>
        )}
      </Listbox>
      {error && <p className="text-danger mt-1 text-sm">{error}</p>}
    </div>
  );
}
