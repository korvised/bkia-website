"use client";

import { useEffect, useState } from "react";

export function useDateTime(updateInterval: number = 1000) {
  const [ts, setTs] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setTs(Date.now()), updateInterval);
    return () => clearInterval(id);
  }, []);

  return ts;
}
