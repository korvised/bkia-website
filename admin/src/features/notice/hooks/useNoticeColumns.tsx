import { useMemo } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import { formatDate } from "@/lib";
import type { INotice } from "@/features/notice/types";
import { NoticePriorityBadge } from "@/features/notice/components";

interface Options {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

function getTitle(notice: INotice): string {
  return notice.title.en || notice.title.lo || notice.title.zh || "—";
}

export function useNoticeColumns({ onEdit, onDelete, canEdit = true, canDelete = true }: Options) {
  return useMemo(
    (): Column<INotice>[] => [
      {
        key: "priority",
        header: "Priority",
        render: (item) => <NoticePriorityBadge priority={item.priority} />,
      },
      {
        key: "title",
        header: "Title",
        render: (item) => (
          <div>
            <p className="font-medium text-gray-900">{getTitle(item)}</p>
            {item.title.lo && item.title.en && (
              <p className="text-xs text-gray-500">{item.title.lo}</p>
            )}
          </div>
        ),
      },
      {
        key: "publishDate",
        header: "Publish Date",
        render: (item) => (
          <span className="text-sm text-gray-700">
            {formatDate(item.publishDate)}
          </span>
        ),
      },
      {
        key: "effectiveDate",
        header: "Effective Date",
        render: (item) =>
          item.effectiveDate ? (
            <span className="text-sm text-gray-700">
              {formatDate(item.effectiveDate)}
            </span>
          ) : (
            <span className="text-sm text-gray-400">—</span>
          ),
      },
      {
        key: "expiryDate",
        header: "Expiry Date",
        render: (item) =>
          item.expiryDate ? (
            <span className="text-sm text-gray-700">
              {formatDate(item.expiryDate)}
            </span>
          ) : (
            <span className="text-sm text-gray-400">—</span>
          ),
      },
      {
        key: "isActive",
        header: "Status",
        render: (item) => (
          <span
            className={
              item.isActive
                ? "inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
                : "inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500"
            }
          >
            {item.isActive ? "Active" : "Inactive"}
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
