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

interface TerminalSelectorProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label: (option: SelectOption) => string;
}

export function TerminalSelector({
  options,
  value,
  onChange,
  label,
}: TerminalSelectorProps) {
  const selected = options.find((opt) => opt.value === value) || options[0];

  return (
    <Listbox value={selected} onChange={(opt) => onChange(opt.value)}>
      {({ open }) => (
        <div className="relative">
          <ListboxButton
            className={cn(
              "flex h-11 w-full min-w-[12rem] items-center justify-between gap-2 rounded-sm border border-gray-300 bg-white px-2 pl-3 text-sm",
              "focus:border-primary-500 focus:ring-primary-500/20 transition-colors hover:border-gray-400 focus:ring-2 focus:outline-none",
            )}
          >
            <span>{label(selected)}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform",
                open && "rotate-180",
              )}
            />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none">
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option}
                className="data-[focus]:bg-primary-50 data-[selected]:bg-primary-100 cursor-pointer px-4 py-2 text-sm data-[selected]:font-medium"
              >
                {label(option)}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      )}
    </Listbox>
  );
}
