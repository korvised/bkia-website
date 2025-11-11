import { useApp } from "@/context";
import { useEffect, useMemo, useState } from "react";
import { createLayoutI18n } from "@/data/i18n/layout";
import { Lang, MultilingualText } from "@/types/language";
import { Bell, Building2, Car, LucideIcon, Luggage, Plane } from "lucide-react";
import { navigation } from "@/data/navigation";

// Extend navigation items to searchable format
interface SearchableItem {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  url: string;
  category: MultilingualText;
  icon: LucideIcon;
  keywords: {
    en: string[];
    lo: string[];
    zh: string[];
  };
}

// Icon mapping for navigation items
const iconMap: Record<string, LucideIcon> = {
  flights: Plane,
  guides: Luggage,
  transports: Car,
  support: Bell,
  about: Building2,
};

// Generate searchable items from mainNavigation
const generateSearchableItems = (): SearchableItem[] => {
  const items: SearchableItem[] = [];

  navigation.forEach((navItem) => {
    // Add main navigation item
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

    // Add sub-menu items
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

const allSearchItems = generateSearchableItems();

// Popular searches based on common queries
const popularSearches = {
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

export const useSearchDialog = () => {
  const { isSearchOpen, closeSearch, lang } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { searchDialog: t } = createLayoutI18n(lang);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchResults]);

  // Enhanced search functionality - search across ALL languages
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      const results = allSearchItems.filter((item) => {
        // Search in all language fields for title
        const titleMatchEn = item.title.en.toLowerCase().includes(query);
        const titleMatchLo = item.title.lo.toLowerCase().includes(query);
        const titleMatchZh = item.title.zh.toLowerCase().includes(query);

        // Search in all language fields for description
        const descMatchEn = item.description.en.toLowerCase().includes(query);
        const descMatchLo = item.description.lo.toLowerCase().includes(query);
        const descMatchZh = item.description.zh.toLowerCase().includes(query);

        // Search in all language fields for category
        const catMatchEn = item.category.en.toLowerCase().includes(query);
        const catMatchLo = item.category.lo.toLowerCase().includes(query);
        const catMatchZh = item.category.zh.toLowerCase().includes(query);

        // Search in all language keywords
        const keywordMatchEn = item.keywords.en.some((keyword) =>
          keyword.toLowerCase().includes(query),
        );
        const keywordMatchLo = item.keywords.lo.some((keyword) =>
          keyword.toLowerCase().includes(query),
        );
        const keywordMatchZh = item.keywords.zh.some((keyword) =>
          keyword.toLowerCase().includes(query),
        );

        return (
          titleMatchEn ||
          titleMatchLo ||
          titleMatchZh ||
          descMatchEn ||
          descMatchLo ||
          descMatchZh ||
          catMatchEn ||
          catMatchLo ||
          catMatchZh ||
          keywordMatchEn ||
          keywordMatchLo ||
          keywordMatchZh
        );
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSearchOpen || searchResults.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            const selectedItem = searchResults[selectedIndex];
            saveToRecentSearches(searchQuery);
            window.location.href = `/${lang}${selectedItem.url}`;
            handleClose();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, searchResults, selectedIndex, lang, searchQuery]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0) {
      const element = document.getElementById(`search-result-${selectedIndex}`);
      if (element) {
        element.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const saveToRecentSearches = (query: string) => {
    if (query.trim()) {
      const updated = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleClose = () => {
    setSearchQuery("");
    setSelectedIndex(-1);
    closeSearch();
  };

  // Get popular searches for current language
  const currentPopularSearches = useMemo(
    () => popularSearches[lang as Lang] || popularSearches.en,
    [lang],
  );

  return {
    lang,
    isSearchOpen,
    searchQuery,
    searchResults,
    recentSearches,
    selectedIndex,
    setSearchQuery,
    handleSearch,
    saveToRecentSearches,
    clearRecentSearches,
    handleClose,
    currentPopularSearches,
    t,
  };
};
