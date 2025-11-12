"use client";

import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NoticeNotFound() {
  const pathname = usePathname();
  // Extract lang from pathname (e.g., /en/notices/important/123 -> en)
  const lang = pathname.split("/")[1] || "en";

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="mb-6 rounded-full bg-red-100 p-4">
        <AlertCircle className="h-12 w-12 text-red-600" />
      </div>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">
        Notice Not Found
      </h1>

      <p className="mb-8 max-w-md text-center text-gray-600">
        The notice you&#39;re looking for doesn&#39;t exist or may have been removed.
      </p>

      <Link
        href={`/${lang}/notices/important`}
        className="bg-primary-600 hover:bg-primary-700 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Important Notices
      </Link>
    </div>
  );
}
