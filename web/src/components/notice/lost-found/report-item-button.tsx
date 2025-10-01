"use client";

import Link from "next/link";
import { PlusCircle, FileText } from "lucide-react";
import { Lang } from "@/types/language";

interface ReportItemButtonProps {
  lang: Lang;
}

export function ReportItemButton({ lang }: ReportItemButtonProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={`/${lang}/notices/lost-found/report`}
        className="bg-bokeo-teal-600 hover:bg-bokeo-teal-700 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors"
      >
        <PlusCircle className="h-5 w-5" />
        Report Lost & Found Item
      </Link>

      <Link
        href={`/${lang}/notices/lost-found/claim`}
        className="border-bokeo-teal-600 text-bokeo-teal-600 hover:bg-bokeo-teal-50 inline-flex items-center gap-2 rounded-lg border-2 bg-white px-6 py-3 text-sm font-medium transition-colors"
      >
        <FileText className="h-5 w-5" />
        Claim Found Item
      </Link>
    </div>
  );
}
