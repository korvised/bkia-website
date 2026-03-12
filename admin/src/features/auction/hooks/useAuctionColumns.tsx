import { useMemo } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import type { IAuction } from "@/features/auction/types";
import { AuctionCategoryBadge, AuctionStatusBadge } from "../components";

interface Options {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export function useAuctionColumns({
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: Options) {
  return useMemo(
    (): Column<IAuction>[] => [
      {
        key: "title",
        header: "Title",
        render: (item) => (
          <div>
            <p className="font-medium text-gray-900">
              {item.title.en || item.title.lo || item.title.zh || "—"}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {new Date(item.startDate).toLocaleDateString()} –{" "}
              {new Date(item.endDate).toLocaleDateString()}
            </p>
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        render: (item) => <AuctionCategoryBadge category={item.category} />,
      },
      {
        key: "status",
        header: "Status",
        render: (item) => <AuctionStatusBadge status={item.status} />,
      },
      {
        key: "documents",
        header: "Docs",
        render: (item) => (
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {item.documents?.length ?? 0} file
            {item.documents?.length !== 1 ? "s" : ""}
          </span>
        ),
      },
      {
        key: "actions",
        header: "",
        render: (item) => (
          <div className="flex items-center justify-end gap-2">
            {canEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item.id);
                }}
                className="rounded p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                title="Edit"
              >
                <LuPencil className="h-4 w-4" />
              </button>
            )}
            {canDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                title="Delete"
              >
                <LuTrash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ),
      },
    ],
    [onEdit, onDelete, canEdit, canDelete],
  );
}
