"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function InformationNotFound() {
  const pathname = usePathname();
  // Extract lang from pathname (e.g., /en/notices/information/123 -> en)
  const lang = pathname.split("/")[1] || "en";

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="mb-6 rounded-full bg-blue-100 p-4">
        <AlertCircle className="h-12 w-12 text-blue-600" />
      </div>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Information Not Found
      </h1>

      <p className="mb-8 max-w-md text-center text-gray-600">
        The information you're looking for doesn't exist or may have been
        removed.
      </p>

      <Link
        href={`/${lang}/notices/information`}
        className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Information
      </Link>
    </div>
  );
}
