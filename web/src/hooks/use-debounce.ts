"use client";

import { useEffect, useState } from "react";

/**
 * Reusable debounce hook
 * @param value The input value to debounce
 * @param delay Delay in ms (default: 400)
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
