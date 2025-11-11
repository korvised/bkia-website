"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useApp } from "@/context/app-context";
import { navigation } from "@/data/navigation";
import { LanguageSelector } from "@/components/layout/header/language-selector";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { PiWheelchairDuotone } from "react-icons/pi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { lang } = useApp();
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggle = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const isExpanded = (id: string) => expanded.includes(id);

  const withLang = (href: string) => `/${lang}${href}`;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        {/* Drawer */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto relative w-screen max-w-xs sm:max-w-sm">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="bg-primary-600 flex items-center justify-between px-6 py-5">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <LanguageSelector />
                        <button
                          className="rounded-lg p-2 text-white transition-all duration-200 hover:bg-white/10"
                          title="Airport Location"
                          aria-label="Airport Location"
                        >
                          <LiaMapMarkedAltSolid className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>

                        <button
                          className="rounded-lg p-2 text-white transition-all duration-200 hover:bg-white/10"
                          title="Accessibility"
                          aria-label="Accessibility"
                        >
                          <PiWheelchairDuotone className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                      </div>
                      <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-white transition-colors duration-200 hover:bg-white/10"
                        aria-label="Close menu"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                      <nav className="py-2">
                        {navigation.map((item) => {
                          const expandedNow = isExpanded(item.id);

                          return (
                            <div
                              key={item.id}
                              className="border-b border-gray-100"
                            >
                              {/* Root row */}
                              {item.hasDropdown ? (
                                <button
                                  onClick={() => toggle(item.id)}
                                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
                                  aria-expanded={expandedNow}
                                  aria-controls={`section-${item.id}`}
                                >
                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-gray-900">
                                      {item.label[lang]}
                                    </div>
                                    {item.description && (
                                      <div className="mt-0.5 text-xs text-gray-500">
                                        {item.description[lang]}
                                      </div>
                                    )}
                                  </div>
                                  <ChevronDown
                                    className={cn(
                                      "h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200",
                                      expandedNow && "rotate-180",
                                    )}
                                  />
                                </button>
                              ) : (
                                <Link
                                  href={withLang(item.href)}
                                  onClick={onClose}
                                  className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
                                >
                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-gray-900">
                                      {item.label[lang]}
                                    </div>
                                    {item.description && (
                                      <div className="mt-0.5 text-xs text-gray-500">
                                        {item.description[lang]}
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              )}

                              {/* Dropdown body */}
                              {item.hasDropdown && expandedNow && (
                                <div
                                  id={`section-${item.id}`}
                                  className="bg-gray-50 px-4 py-3"
                                >
                                  {/* Menu items */}
                                  {item.menuItems &&
                                    item.menuItems.length > 0 && (
                                      <ul className="space-y-1">
                                        {item.menuItems.map((mi) => (
                                          <li key={`${item.id}-${mi.href}`}>
                                            <Link
                                              href={withLang(mi.href)}
                                              onClick={onClose}
                                              className="group ml-1 flex items-center gap-3 rounded-md px-2 py-2 hover:bg-white"
                                            >
                                              <span className="group-hover:bg-primary-600 h-1.5 w-1.5 flex-shrink-0 bg-gray-400 transition-colors" />
                                              <span className="inline-flex flex-col">
                                                <span className="group-hover:text-primary-700 text-sm font-medium text-gray-800">
                                                  {mi.label[lang]}
                                                </span>
                                              </span>
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </nav>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          Bokeo International Airport
                        </div>
                        <div className="font-lo mt-1 text-xs text-gray-500">
                          ສະໜາມບິນສາກົນບໍ່ແກ້ວ
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
