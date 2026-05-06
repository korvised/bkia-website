"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";
import { ChevronRight, X, ArrowUpRight } from "lucide-react";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { PiWheelchairDuotone } from "react-icons/pi";
import { cn } from "@/lib";
import { useApp } from "@/context/app-context";
import { navigation } from "@/data/navigation";
import { MENU_ICONS } from "./menu-icons";

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
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </TransitionChild>

        {/* Drawer */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-14">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-sm">
                  <div className="flex h-full flex-col bg-white">

                    {/* ── Header ── */}
                    <div className="flex items-center justify-between bg-[#00AAAC] px-5 py-1.5">
                      {/* Logo */}
                      <Link
                        href={`/${lang}`}
                        onClick={onClose}
                        className="relative h-14 w-14 shrink-0 outline-none"
                      >
                        <Image
                          src="https://bkia-website.s3.ap-southeast-7.amazonaws.com/logo/bokeo_white.png"
                          alt="Bokeo Airport"
                          fill
                          className="object-contain"
                        />
                      </Link>

                      {/* Right: utility icons + close */}
                      <div className="flex items-center gap-0.5">
                        <button
                          className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                          title="Airport Location"
                          aria-label="Airport Location"
                        >
                          <LiaMapMarkedAltSolid className="h-5 w-5" />
                        </button>

                        <Link
                          className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                          href={`/${lang}/guides/custom-services`}
                          title="Custom Services"
                          aria-label="Custom Services"
                          onClick={onClose}
                        >
                          <PiWheelchairDuotone className="h-5 w-5" />
                        </Link>

                        <div className="mx-1 h-4 w-px bg-white/25" />

                        <button
                          onClick={onClose}
                          className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                          aria-label="Close menu"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* ── Navigation ── */}
                    <nav className="flex-1 overflow-y-auto overscroll-contain py-2">
                      {navigation.map((item, index) => {
                        const expandedNow = isExpanded(item.id);

                        return (
                          <div key={item.id}>
                            {/* Root row */}
                            {item.hasDropdown ? (
                              <button
                                onClick={() => toggle(item.id)}
                                className={cn(
                                  "group flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors",
                                  expandedNow ? "bg-gray-50" : "hover:bg-gray-50/70",
                                )}
                                aria-expanded={expandedNow}
                                aria-controls={`section-${item.id}`}
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-gray-900 leading-tight">
                                    {item.label[lang]}
                                  </div>
                                  {item.description && (
                                    <div className="mt-0.5 text-xs text-gray-400 truncate">
                                      {item.description[lang]}
                                    </div>
                                  )}
                                </div>
                                <ChevronRight
                                  className={cn(
                                    "h-4 w-4 flex-shrink-0 text-gray-300 transition-all duration-200 group-hover:text-gray-400",
                                    expandedNow && "rotate-90 text-[#00AAAC]",
                                  )}
                                />
                              </button>
                            ) : (
                              <Link
                                href={withLang(item.href)}
                                onClick={onClose}
                                className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50/70"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-gray-900 leading-tight">
                                    {item.label[lang]}
                                  </div>
                                  {item.description && (
                                    <div className="mt-0.5 text-xs text-gray-400 truncate">
                                      {item.description[lang]}
                                    </div>
                                  )}
                                </div>
                                <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 text-gray-200 transition-colors group-hover:text-[#00AAAC]" />
                              </Link>
                            )}

                            {/* Divider */}
                            {index < navigation.length - 1 && (
                              <div className="mx-5 h-px bg-gray-100" />
                            )}

                            {/* Dropdown sub-items */}
                            {item.hasDropdown && expandedNow && (
                              <div
                                id={`section-${item.id}`}
                                className="bg-gray-50/60 px-3 pb-2 pt-1"
                              >
                                {item.menuItems && item.menuItems.length > 0 && (
                                  <ul className="space-y-0.5">
                                    {item.menuItems.map((mi) => {
                                      const Icon = MENU_ICONS[mi.href] ?? ArrowUpRight;
                                      return (
                                        <li key={`${item.id}-${mi.href}`}>
                                          <Link
                                            href={withLang(mi.href)}
                                            onClick={onClose}
                                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white"
                                          >
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm transition-colors duration-200 group-hover:bg-[#e6f7f8]">
                                              <Icon className="h-3.5 w-3.5 text-[#00AAAC]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                              <span className="block text-sm font-medium text-gray-700 transition-colors group-hover:text-[#00AAAC]">
                                                {mi.label[lang]}
                                              </span>
                                              {mi.description && (
                                                <span className="block truncate text-xs text-gray-400 mt-0.5">
                                                  {mi.description[lang]}
                                                </span>
                                              )}
                                            </div>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </nav>

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
