import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createLayoutI18n } from "@/data/i18n/layout";
import { useApp } from "@/context";
import { allSearchItems, popularSearches } from "@/services/layout";

export const useSearchDialog = () => {
  const { isSearchOpen, closeSearch, lang } = useApp();
  const { searchDialog: t } = createLayoutI18n(lang);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window === "undefined") return []; // SSR safety
    try {
      const saved = localStorage.getItem("recentSearches");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Derive results (no setState in effects)
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allSearchItems.filter((item) => {
      const titleMatch =
        item.title.en.toLowerCase().includes(q) ||
        item.title.lo.toLowerCase().includes(q) ||
        item.title.zh.toLowerCase().includes(q);
      const descMatch =
        item.description.en.toLowerCase().includes(q) ||
        item.description.lo.toLowerCase().includes(q) ||
        item.description.zh.toLowerCase().includes(q);
      const catMatch =
        item.category.en.toLowerCase().includes(q) ||
        item.category.lo.toLowerCase().includes(q) ||
        item.category.zh.toLowerCase().includes(q);
      const keywordMatch =
        item.keywords.en.some((k) => k.includes(q)) ||
        item.keywords.lo.some((k) => k.includes(q)) ||
        item.keywords.zh.some((k) => k.includes(q));
      return titleMatch || descMatch || catMatch || keywordMatch;
    });
  }, [searchQuery]);

  // Stable helpers
  const saveToRecentSearches = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const updated = [trimmed, ...prev.filter((s) => s !== trimmed)].slice(
        0,
        5,
      );
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  }, []);

  const handleClose = useCallback(() => {
    setSearchQuery("");
    setSelectedIndex(-1);
    closeSearch();
  }, [closeSearch]);

  const handleSearch = useCallback((q: string) => {
    setSelectedIndex(-1);
    setSearchQuery(q);
  }, []);

  // ---- Effect 1: load recent searches once

  // Refs to avoid resubscribing keydown listener on every change
  const isOpenRef = useRef(isSearchOpen);
  const langRef = useRef(lang);
  const selectedIndexRef = useRef(selectedIndex);
  const resultsRef = useRef(searchResults);
  const queryRef = useRef(searchQuery);

  useEffect(() => {
    isOpenRef.current = isSearchOpen;
    langRef.current = lang;
    selectedIndexRef.current = selectedIndex;
    resultsRef.current = searchResults;
    queryRef.current = searchQuery;
  }, [isSearchOpen, lang, selectedIndex, searchResults, searchQuery]);

  // ---- Effect 2: global keydown (single subscription)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpenRef.current || resultsRef.current.length === 0) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < resultsRef.current.length - 1 ? prev + 1 : prev,
          );
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        }
        case "Enter": {
          e.preventDefault();
          const idx = selectedIndexRef.current;
          if (idx >= 0 && idx < resultsRef.current.length) {
            const selectedItem = resultsRef.current[idx];
            saveToRecentSearches(queryRef.current);
            window.location.href = `/${langRef.current}${selectedItem.url}`;
            handleClose();
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose, saveToRecentSearches]);

  // Scroll selected item into view (kept small & focused)
  useEffect(() => {
    if (selectedIndex >= 0) {
      document
        .getElementById(`search-result-${selectedIndex}`)
        ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  const currentPopularSearches = useMemo(
    () => popularSearches[lang] || popularSearches.en,
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
