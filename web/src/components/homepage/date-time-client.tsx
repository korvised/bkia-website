"use client";

import dynamic from "next/dynamic";
import { Lang } from "@/types/language";

// Do NOT render the clock on the server at all
const DateTimeDisplay = dynamic(() => import("./date-time-display"), {
  ssr: false,
});

export default function DateTimeClient({ lang }: { lang: Lang }) {
  return <DateTimeDisplay lang={lang} />;
}
