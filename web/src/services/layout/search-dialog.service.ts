import type { MultilingualText } from "@/types/language";
import { Bell, Building2, Car, LucideIcon, Luggage, Plane } from "lucide-react";
import { navigation } from "@/data/navigation";

interface SearchableItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  url: string;
  category: MultilingualText;
  icon: LucideIcon;
  keywords: { en: string[]; lo: string[]; zh: string[] };
}

const iconMap: Record<string, LucideIcon> = {
  flights: Plane,
  guides: Luggage,
  transports: Car,
  support: Bell,
  about: Building2,
};

const generateSearchableItems = (): SearchableItem[] => {
  const items: SearchableItem[] = [];
  navigation.forEach((navItem) => {
    items.push({
      id: navItem.id,
      title: navItem.label,
      description: navItem.description || navItem.label,
      url: navItem.href,
      category: navItem.label,
      icon: iconMap[navItem.id] || Plane,
      keywords: {
        en: [
          navItem.label.en.toLowerCase(),
          ...(navItem.description?.en.toLowerCase().split(" ") || []),
        ],
        lo: [
          navItem.label.lo.toLowerCase(),
          ...(navItem.description?.lo.toLowerCase().split(" ") || []),
        ],
        zh: [
          navItem.label.zh.toLowerCase(),
          ...(navItem.description?.zh.toLowerCase().split(" ") || []),
        ],
      },
    });

    if (navItem.menuItems) {
      navItem.menuItems.forEach((menuItem, index) => {
        items.push({
          id: `${navItem.id}-${index}`,
          title: menuItem.label,
          description: menuItem.description || menuItem.label,
          url: menuItem.href,
          category: navItem.label,
          icon: iconMap[navItem.id] || Plane,
          keywords: {
            en: [
              menuItem.label.en.toLowerCase(),
              ...(menuItem.description?.en.toLowerCase().split(" ") || []),
              navItem.label.en.toLowerCase(),
            ],
            lo: [
              menuItem.label.lo.toLowerCase(),
              ...(menuItem.description?.lo.toLowerCase().split(" ") || []),
              navItem.label.lo.toLowerCase(),
            ],
            zh: [
              menuItem.label.zh.toLowerCase(),
              ...(menuItem.description?.zh.toLowerCase().split(" ") || []),
              navItem.label.zh.toLowerCase(),
            ],
          },
        });
      });
    }
  });
  return items;
};

export const allSearchItems = generateSearchableItems();

export const popularSearches = {
  en: [
    "Flight schedules",
    "Departures",
    "Arrivals",
    "Parking",
    "Check-in",
    "Lost and found",
  ],
  lo: [
    "ຕາຕະລາງຖ້ຽວບິນ",
    "ຖ້ຽວບິນອອກ",
    "ຖ້ຽວບິນຂາເຂົ້າ",
    "ບ່ອນຈອດລົດ",
    "ແຈ້ງປີ້",
    "ເສຍຫາຍ & ພົບເຫັນ",
  ],
  zh: ["航班时刻表", "出发航班", "到达航班", "停车场", "值机", "失物招领"],
};
