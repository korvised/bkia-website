"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Building, Menu, User, X } from "lucide-react";
import { cn } from "@/lib";
import { useLanguage } from "@/context";
import { NavigationItem } from "@/types/navigation";
import { aboutUsItems, passengerItems } from "@/data/navigation";
import { translations } from "@/data/translations/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"passenger" | "about">(
    "passenger",
  );

  const renderMenuItem = (item: NavigationItem) => {
    const IconComponent = item.icon;
    return (
      <Link
        key={item.id}
        href={`/${lang}${item.href}`}
        onClick={onClose}
        className="group flex items-center border-b border-gray-100 p-4 transition-colors hover:bg-gray-50"
      >
        <div
          className={cn(
            "mr-4 flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
            item.color,
          )}
        >
          <IconComponent className="h-5 w-5 text-white" />
        </div>

        <div className="flex-1">
          <div
            className={cn(
              "group-hover:text-bokeo-teal-700 font-semibold text-gray-900 transition-colors",
              lang === "lo" && "font-lao",
            )}
          >
            {t(item.title)}
          </div>
          <div
            className={cn(
              "mt-1 text-xs text-gray-400",
              lang === "lo" && "font-lao",
            )}
          >
            {t(item.description)}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        {/* Sidebar Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="pointer-events-auto relative flex h-full w-80 flex-col bg-white shadow-2xl">
                  {/* Header */}
                  <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-6">
                    <div className="flex items-center space-x-3">
                      <Menu className="h-5 w-5" />

                      <span className="text-lg font-semibold text-gray-900">
                        {t(translations.menu)}
                      </span>
                    </div>

                    <button
                      onClick={onClose}
                      className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Custom Tab Navigation */}
                  <div className="flex flex-shrink-0">
                    <button
                      onClick={() => setActiveTab("passenger")}
                      className={cn(
                        "flex flex-1 flex-col items-center px-6 py-4 text-sm font-medium transition-colors",
                        activeTab === "passenger"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                      )}
                    >
                      <User className="mb-1 h-4 w-4" />
                      <span className={cn(lang === "lo" && "font-lao")}>
                        {t(translations.passengerServices)}
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("about")}
                      className={cn(
                        "flex flex-1 flex-col items-center px-6 py-4 text-sm font-medium transition-colors",
                        activeTab === "about"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                      )}
                    >
                      <Building className="mb-1 h-4 w-4" />
                      <span className={cn(lang === "lo" && "font-lao")}>
                        {t(translations.aboutUs)}
                      </span>
                    </button>
                  </div>

                  {/* Tab Content - Scrollable */}
                  <div className="flex-1 overflow-y-auto">
                    {activeTab === "passenger" && (
                      <div className="space-y-0">
                        {passengerItems.map(renderMenuItem)}
                      </div>
                    )}

                    {activeTab === "about" && (
                      <div className="space-y-0">
                        {aboutUsItems.map(renderMenuItem)}
                      </div>
                    )}
                  </div>

                  {/* Footer - Stuck to bottom */}
                  <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 p-4">
                    <div className="text-center">
                      <div
                        className={cn(
                          "text-sm font-medium text-gray-900",
                          lang === "lo" && "font-lao",
                        )}
                      >
                        {t(translations.airportName)}
                      </div>
                      <div className="font-lao mt-1 text-xs text-gray-500">
                        ສະໜາມບິນສາກົນບໍ່ແກ້ວ
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
