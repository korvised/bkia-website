"use client";

import { useEffect, useState } from "react";

export function useDateTime(updateInterval: number = 1000) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, updateInterval);

    return () => clearInterval(timer);
  }, [updateInterval]);

  return currentTime;
}
