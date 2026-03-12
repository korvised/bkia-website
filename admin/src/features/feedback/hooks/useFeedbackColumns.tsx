import { useMemo } from "react";
import type { Column } from "@/components/ui/table/table";
import { formatDate } from "@/lib";
import type { IFeedback } from "@/features/feedback/types";
import { FeedbackStatusBadge, FeedbackCategoryBadge } from "@/features/feedback/components";
import { LuStar } from "react-icons/lu";

export function useFeedbackColumns() {
  return useMemo(
    (): Column<IFeedback>[] => [
      {
        key: "rating",
        header: "Rating",
        render: (item) =>
          item.rating ? (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-2.5 py-1 ring-1 ring-yellow-200">
              <LuStar className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-yellow-700">
                {item.rating}/5
              </span>
            </div>
          ) : (
            <span className="text-xs text-gray-400">—</span>
          ),
      },
      {
        key: "category",
        header: "Category",
        render: (item) => <FeedbackCategoryBadge category={item.category} />,
      },
      {
        key: "comment",
        header: "Comment",
        render: (item) =>
          item.comment ? (
            <p className="max-w-xs truncate text-sm text-gray-700">
              {item.comment}
            </p>
          ) : (
            <span className="text-xs text-gray-400">—</span>
          ),
      },
      {
        key: "terminal",
        header: "Terminal",
        render: (item) =>
          item.terminal ? (
            <span className="text-sm text-gray-700">
              {item.terminal === "A" ? "International (A)" : "Domestic (B)"}
            </span>
          ) : (
            <span className="text-xs text-gray-400">—</span>
          ),
      },
      {
        key: "status",
        header: "Status",
        render: (item) => <FeedbackStatusBadge status={item.status} />,
      },
      {
        key: "createdAt",
        header: "Submitted",
        render: (item) => (
          <span className="text-sm text-gray-500">
            {formatDate(item.createdAt)}
          </span>
        ),
      },
    ],
    [],
  );
}
