import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Hash,
  MapPin,
  Package,
  SearchCheck,
  Shirt,
  Smartphone,
  Watch,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Lang } from "@/types/language";
import { LostFoundItem } from "@/data/notice/lost-found";
import { fmtDate } from "@/lib";
import { cn } from "@/utils/cn";

interface LostFoundListProps {
  lang: Lang;
  items: LostFoundItem[];
  searchQuery?: string;
}

export function LostFoundList({
  lang,
  items,
  searchQuery,
}: LostFoundListProps) {
  const categoryIcons = {
    electronics: Smartphone,
    bags: Briefcase,
    documents: FileText,
    clothing: Shirt,
    accessories: Watch,
    other: Package,
  };

  const statusConfig = {
    pending: {
      label: "Available to Claim",
      icon: Clock,
      color: "bg-green-100 text-green-700 border-green-200",
    },
    claimed: {
      label: "Claimed",
      icon: CheckCircle,
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    returned: {
      label: "Returned",
      icon: CheckCircle,
      color: "bg-gray-100 text-gray-700 border-gray-200",
    },
    disposed: {
      label: "Disposed",
      icon: XCircle,
      color: "bg-red-100 text-red-700 border-red-200",
    },
  };

  const renderItemCard = (item: LostFoundItem) => {
    const CategoryIcon = categoryIcons[item.category];
    const statusInfo = statusConfig[item.status];
    const StatusIcon = statusInfo.icon;

    return (
      <Link
        key={item.id}
        href={`/${lang}/notices/lost-found/${item.id}`}
        className="hover:border-primary-300 block rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-200 hover:shadow-md"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary-100 flex-shrink-0 rounded-lg p-2">
                <CategoryIcon className="text-primary-600 h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.itemName}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                      statusInfo.color,
                    )}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {statusInfo.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="line-clamp-2 text-sm text-gray-600">
            {item.description}
          </p>

          {/* Meta Information */}
          <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-gray-400" />
              <time dateTime={item.date}>
                {fmtDate(new Date(item.date), lang)}
              </time>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Hash className="h-4 w-4 text-gray-400" />
              <span className="font-mono">{item.referenceNumber}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  // Empty state
  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <SearchCheck className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {searchQuery ? "No items found" : "No items available"}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {searchQuery
            ? `Try adjusting your search terms or filters.`
            : "Check back later for updates"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(renderItemCard)}
      </div>

      {/* Summary */}
      <div className="rounded-lg bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{items.length}</span> item
          {items.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
