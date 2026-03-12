import { AuctionCategory } from "@/types/enum.type";

const CATEGORY_CONFIG: Record<
  AuctionCategory,
  { label: string; className: string }
> = {
  [AuctionCategory.EQUIPMENT]: {
    label: "Equipment",
    className: "bg-purple-100 text-purple-700",
  },
  [AuctionCategory.CONSTRUCTION]: {
    label: "Construction",
    className: "bg-blue-100 text-blue-700",
  },
  [AuctionCategory.SERVICE]: {
    label: "Service",
    className: "bg-green-100 text-green-700",
  },
  [AuctionCategory.IT]: {
    label: "IT",
    className: "bg-cyan-100 text-cyan-700",
  },
  [AuctionCategory.CONSULTING]: {
    label: "Consulting",
    className: "bg-amber-100 text-amber-700",
  },
  [AuctionCategory.MAINTENANCE]: {
    label: "Maintenance",
    className: "bg-orange-100 text-orange-700",
  },
  [AuctionCategory.OTHER]: {
    label: "Other",
    className: "bg-gray-100 text-gray-700",
  },
};

interface Props {
  category: AuctionCategory;
}

export function AuctionCategoryBadge({ category }: Props) {
  const config = CATEGORY_CONFIG[category] ?? {
    label: category,
    className: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
