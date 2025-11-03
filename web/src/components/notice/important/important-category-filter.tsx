"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Lang } from "@/types/language";
import { cn } from "@/lib";
import { impNoticeCats } from "@/data/notice/important-notices";
import { ImportantPriority } from "@/types/notice";

interface ImportantCategoryFilterProps {
  lang: Lang;
  selectedPriority?: ImportantPriority;
}

export function ImportantCategoryFilter({
  lang,
  selectedPriority,
}: ImportantCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id === "all") {
      params.delete("priority");
    } else {
      // map UI ids directly to query param
      params.set("priority", id);
    }

    router.push(`/${lang}/support/notices/important?${params.toString()}`, {
      scroll: false,
    });
  };

  const active = selectedPriority || "all";

  return (
    <div className="border-b border-gray-200">
      <nav className="horizontal-scroll flex space-x-4 overflow-x-auto pb-4">
        {impNoticeCats.map((c) => {
          const Icon = c.icon;
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => handleChange(c.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              )}
            >
              <Icon className="h-4 w-4" />
              {c.label[lang]}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
