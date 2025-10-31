"use client";

import { Suspense } from "react";
import { ToFromAirportContent } from "@/components/transports";

export default function ToFromAirportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 items-center justify-center">
          <div className="border-t-primary-600 h-8 w-8 animate-spin rounded-full border-4 border-gray-200" />
        </div>
      }
    >
      <ToFromAirportContent />
    </Suspense>
  );
}
