"use client";

import { useCallback, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);

  const animRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin },
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
      };
    },
    [threshold, rootMargin, triggerOnce],
  );

  return { animRef, isVisible };
}

// Hook for batch animations
export function useScrollAnimationBatch(
  count: number,
  options: UseScrollAnimationOptions = {},
) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback(
    (index: number) =>
      (el: HTMLDivElement | null) => {
        const prev = refs.current[index];
        refs.current[index] = el;

        if (el && !prev) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setVisibleItems((s) => new Set(s).add(index));
                if (options.triggerOnce !== false) {
                  observer.unobserve(el);
                }
              }
            },
            {
              threshold: options.threshold ?? 0.1,
              rootMargin: options.rootMargin ?? "0px 0px -50px 0px",
            },
          );
          observer.observe(el);
        }
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, options.threshold, options.rootMargin, options.triggerOnce],
  );

  return { setRef, visibleItems };
}
