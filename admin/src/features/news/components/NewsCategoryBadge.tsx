import { NewsCategory } from "@/types";
import { cn } from "@/lib";

const CATEGORY_CONFIG: Record<NewsCategory, { label: string; className: string }> = {
  [NewsCategory.AIRPORT_UPDATE]: {
    label: "Airport Update",
    className: "bg-blue-100 text-blue-700",
  },
  [NewsCategory.FLIGHT_SERVICE]: {
    label: "Flight Service",
    className: "bg-purple-100 text-purple-700",
  },
  [NewsCategory.EVENT]: {
    label: "Event",
    className: "bg-pink-100 text-pink-700",
  },
  [NewsCategory.ANNOUNCEMENT]: {
    label: "Announcement",
    className: "bg-orange-100 text-orange-700",
  },
  [NewsCategory.SUSTAINABILITY]: {
    label: "Sustainability",
    className: "bg-green-100 text-green-700",
  },
  [NewsCategory.TECHNOLOGY]: {
    label: "Technology",
    className: "bg-cyan-100 text-cyan-700",
  },
  [NewsCategory.COMMUNITY]: {
    label: "Community",
    className: "bg-teal-100 text-teal-700",
  },
};

interface Props {
  category: NewsCategory;
}

export function NewsCategoryBadge({ category }: Props) {
  const config = CATEGORY_CONFIG[category] ?? {
    label: category,
    className: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}
