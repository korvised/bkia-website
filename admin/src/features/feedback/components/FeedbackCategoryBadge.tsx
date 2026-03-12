import { FeedbackCategory } from "@/types/enum.type";
import { cn } from "@/lib";

interface Props {
  category: FeedbackCategory;
}

const CATEGORY_STYLES: Record<FeedbackCategory, string> = {
  [FeedbackCategory.CLEANLINESS]: "bg-teal-100 text-teal-700",
  [FeedbackCategory.SECURITY]: "bg-red-100 text-red-700",
  [FeedbackCategory.WIFI]: "bg-purple-100 text-purple-700",
  [FeedbackCategory.FOOD_BEVERAGE]: "bg-orange-100 text-orange-700",
  [FeedbackCategory.STAFF_SERVICE]: "bg-blue-100 text-blue-700",
  [FeedbackCategory.FACILITIES]: "bg-indigo-100 text-indigo-700",
  [FeedbackCategory.OTHER]: "bg-gray-100 text-gray-600",
};

const CATEGORY_LABELS: Record<FeedbackCategory, string> = {
  [FeedbackCategory.CLEANLINESS]: "Cleanliness",
  [FeedbackCategory.SECURITY]: "Security",
  [FeedbackCategory.WIFI]: "Wi-Fi",
  [FeedbackCategory.FOOD_BEVERAGE]: "Food & Beverage",
  [FeedbackCategory.STAFF_SERVICE]: "Staff Service",
  [FeedbackCategory.FACILITIES]: "Facilities",
  [FeedbackCategory.OTHER]: "Other",
};

export function FeedbackCategoryBadge({ category }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        CATEGORY_STYLES[category],
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
