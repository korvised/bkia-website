import {
  Building2,
  Wrench,
  ShoppingBag,
  Monitor,
  BookOpen,
  Settings,
  HelpCircle,
} from "lucide-react";
import { AuctionCategory, AuctionStatus } from "@/types/auction";

export const CATEGORY_ICONS: Record<AuctionCategory, React.ElementType> = {
  [AuctionCategory.EQUIPMENT]: Wrench,
  [AuctionCategory.CONSTRUCTION]: Building2,
  [AuctionCategory.SERVICE]: ShoppingBag,
  [AuctionCategory.IT]: Monitor,
  [AuctionCategory.CONSULTING]: BookOpen,
  [AuctionCategory.MAINTENANCE]: Settings,
  [AuctionCategory.OTHER]: HelpCircle,
};

export const CATEGORY_COLORS: Record<AuctionCategory, string> = {
  [AuctionCategory.EQUIPMENT]: "bg-purple-100 text-purple-700",
  [AuctionCategory.CONSTRUCTION]: "bg-blue-100 text-blue-700",
  [AuctionCategory.SERVICE]: "bg-green-100 text-green-700",
  [AuctionCategory.IT]: "bg-cyan-100 text-cyan-700",
  [AuctionCategory.CONSULTING]: "bg-amber-100 text-amber-700",
  [AuctionCategory.MAINTENANCE]: "bg-orange-100 text-orange-700",
  [AuctionCategory.OTHER]: "bg-gray-100 text-gray-700",
};

export const STATUS_CLASS: Record<AuctionStatus, string> = {
  [AuctionStatus.UPCOMING]: "bg-yellow-100 text-yellow-700",
  [AuctionStatus.OPEN]: "bg-green-100 text-green-700",
  [AuctionStatus.CLOSED]: "bg-gray-100 text-gray-500",
};

