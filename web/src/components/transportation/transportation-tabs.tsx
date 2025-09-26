"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bus,
  Car,
  CarTaxiFront,
  ParkingCircle,
  Smartphone,
  Truck,
} from "lucide-react";
import { cn } from "@/lib";

interface TransportationTabsProps {
  lang: string;
}

const tabs = [
  { id: "van" as const, label: "Van", icon: Bus },
  { id: "taxi" as const, label: "Taxi", icon: CarTaxiFront },
  { id: "parking" as const, label: "Parking", icon: ParkingCircle },
  { id: "car-rental" as const, label: "Car Rental", icon: Car },
];

export function TransportationTabs({ lang }: TransportationTabsProps) {
  const pathname = usePathname();

  const getIsActive = (tabId: string) => {
    return pathname.includes(`/transportation/${tabId}`);
  };

  return (
    <div className="mb-6 border-b border-gray-200">
      <nav
        className="horizontal-scroll flex space-x-8 overflow-x-auto"
        aria-label="Transportation tabs"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = getIsActive(tab.id);

          return (
            <Link
              key={tab.id}
              href={`/${lang}/transportation/${tab.id}`}
              className={cn(
                "flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "border-bokeo-teal-600 text-bokeo-teal-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
            >
              <Icon className="h-5 w-5" />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
