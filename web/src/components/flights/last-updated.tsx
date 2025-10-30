"use client";

import { useState, useEffect } from "react";
import { Lang } from "@/types/language";

interface LastUpdatedProps {
  lang: Lang;
  label: string;
}

export function LastUpdated({ lang, label }: LastUpdatedProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleString(
        lang === "zh" ? "zh-CN" : lang === "lo" ? "lo-LA" : "en-GB",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        },
      );
      setTime(currentTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [lang]);

  if (!time) return null;

  return (
    <div className="text-sm text-gray-600">
      {label}: {time}
    </div>
  );
}
