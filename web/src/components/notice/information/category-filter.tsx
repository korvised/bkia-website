"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Lang } from "@/types/language";
import { cn } from "@/lib";
import { noticeInforCategories } from "@/data/notice";

interface CategoryFilterProps {
  lang: Lang;
  selectedCategory?: string;
}

export function CategoryFilter({
  lang,
  selectedCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    router.push(`/${lang}/notices/information?${params.toString()}`, {
      scroll: false,
    });
  };

  const activeCategory = selectedCategory || "all";

  return (
    <div className="border-b border-gray-200">
      <nav className="horizontal-scroll flex space-x-4 overflow-x-auto pb-4">
        {noticeInforCategories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-bokeo-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200",
              )}
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
