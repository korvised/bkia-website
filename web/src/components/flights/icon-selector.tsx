"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib";
import { SelectOption } from "@/data/flight-board";

interface IconSelectorProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label: (option: SelectOption) => string;
  placeholder?: boolean;
  className?: string;
}

export function IconSelector({
  options,
  value,
  onChange,
  label,
  placeholder,
  className,
}: IconSelectorProps) {
  const selected = options.find((opt) => opt.value === value) || options[0];

  return (
    <Listbox value={selected} onChange={(opt) => onChange(opt.value)}>
      {({ open }) => (
        <div className="relative">
          <ListboxButton
            className={cn(
              "focus:border-primary-500 focus:ring-primary-500/20 flex h-11 items-center justify-between gap-2 rounded-sm border border-gray-300 bg-white pr-2 pl-3 text-sm transition-colors hover:border-gray-400 focus:ring-2 focus:outline-none",
              className,
            )}
          >
            <div className="flex items-center gap-2">
              {selected.icon && (
                <span className="text-base">{selected.icon}</span>
              )}
              <span
                className={cn(
                  !selected.value && placeholder && "text-gray-500",
                )}
              >
                {label(selected)}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform",
                open && "rotate-180",
              )}
            />
          </ListboxButton>
          <ListboxOptions
            modal={false}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option}
                className="data-[focus]:bg-primary-50 data-[selected]:bg-primary-100 cursor-pointer px-4 py-2 text-sm data-[selected]:font-medium"
              >
                <div className="flex items-center gap-2">
                  {option.icon && (
                    <span className="text-base">{option.icon}</span>
                  )}
                  <span>{label(option)}</span>
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      )}
    </Listbox>
  );
}
