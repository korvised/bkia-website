"use client";

import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function LostFoundItemNotFound() {
  const pathname = usePathname();
  // Extract lang from pathname (e.g., /en/notices/lost-found/123 -> en)
  const lang = pathname.split("/")[1] || "en";

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="mb-6 rounded-full bg-yellow-100 p-4">
        <SearchX className="h-12 w-12 text-yellow-600" />
      </div>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">Item Not Found</h1>

      <p className="mb-8 max-w-md text-center text-gray-600">
        The item you're looking for doesn't exist, may have been claimed, or has
        been removed from our system.
      </p>

      <Link
        href={`/${lang}/notices/lost-found`}
        className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Lost & Found
      </Link>
    </div>
  );
}
