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
import { cn } from "@/lib/utils";
import { useApp } from "@/context/app-context";
import { mainNavigation } from "@/data/main-navigation";
import { LanguageSelector } from "@/components/layout/header/language-selector";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { PiWheelchairDuotone } from "react-icons/pi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { lang } = useApp();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId],
    );
  };

  const isGroupExpanded = (groupId: string) => expandedGroups.includes(groupId);

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

        {/* Sidebar Panel - Right Side */}
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

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                      <nav className="py-2">
                        {mainNavigation.map((item) => (
                          <div
                            key={item.id}
                            className="border-b border-gray-100"
                          >
                            {/* Main Menu Item */}
                            <button
                              onClick={() => toggleGroup(item.id)}
                              className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
                            >
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900">
                                  {item.label[lang]}
                                </div>
                                {item.subtitle && (
                                  <div className="mt-0.5 text-sm text-gray-500">
                                    {item.subtitle[lang]}
                                  </div>
                                )}
                              </div>

                              {/* Chevron Icon */}
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200",
                                  isGroupExpanded(item.id) && "rotate-180",
                                )}
                              />
                            </button>

                            {/* Expanded Groups */}
                            {isGroupExpanded(item.id) && item.menuGroups && (
                              <div className="bg-gray-50 px-4 py-2">
                                {item.menuGroups.map((group, groupIdx) => (
                                  <div
                                    key={groupIdx}
                                    className="mb-4 last:mb-2"
                                  >
                                    {/* Group Title */}
                                    <div className="mb-2 px-2">
                                      {group.children ? (
                                        <div className="inline-block text-sm font-semibold text-gray-900">
                                          {group.label[lang]}
                                        </div>
                                      ) : (
                                        <Link
                                          href={`/${lang}${group.href}`}
                                          onClick={onClose}
                                          className="hover:text-primary-600 inline-block text-sm font-semibold text-gray-900 transition-colors hover:underline"
                                        >
                                          {group.label[lang]}
                                        </Link>
                                      )}
                                    </div>

                                    {/* Group Children */}
                                    {group.children && (
                                      <ul className="space-y-1">
                                        {group.children.map(
                                          (child, childIdx) => (
                                            <li key={childIdx}>
                                              <Link
                                                href={`/${lang}${child.href}`}
                                                onClick={onClose}
                                                className="group hover:text-primary-600 ml-2 flex items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-600 transition-colors hover:bg-white"
                                              >
                                                {/*<ChevronRight className="group-hover:text-primary-600 h-3.5 w-3.5 flex-shrink-0 text-gray-400 transition-colors" />*/}
                                                <span className="group-hover:bg-primary-600 h-1.5 w-1.5 bg-gray-400 transition-colors" />
                                                <span>{child.label[lang]}</span>
                                              </Link>
                                            </li>
                                          ),
                                        )}
                                      </ul>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
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
