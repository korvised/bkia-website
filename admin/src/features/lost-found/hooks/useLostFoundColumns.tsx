import { useMemo } from "react";
import { LuTrash2, LuUser } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import { formatDate } from "@/lib";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import type { ILostFoundItem } from "@/features/lost-found/types";
import {
  LostFoundStatusBadge,
  LostFoundTypeBadge,
} from "@/features/lost-found/components";

export function useLostFoundColumns(onDelete: (item: ILostFoundItem) => void) {
  const { can } = usePermissions();
  const canDelete = can(PermissionSlug.LOST_FOUND_DELETE);

  return useMemo(
    (): Column<ILostFoundItem>[] => [
      {
        key: "type",
        header: "Type",
        render: (item) => <LostFoundTypeBadge type={item.type} />,
      },
      {
        key: "displayNames",
        header: "Item",
        render: (item) => (
          <div className="flex flex-col gap-1">
            <p className="font-medium text-gray-900">
              {item.displayNames?.en ?? item.displayNames?.lo ?? "—"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {item.category.toLowerCase()}
            </p>
            {!!item.pendingClaimsCount && (
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {item.pendingClaimsCount} pending
              </span>
            )}
          </div>
        ),
      },
      {
        key: "incidentDate",
        header: "Incident Date",
        render: (item) => (
          <span className="text-sm text-gray-700">
            {formatDate(item.incidentDate)}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (item) => <LostFoundStatusBadge status={item.status} />,
      },
      {
        key: "createdBy",
        header: "Created By",
        render: (item) =>
          item.createdBy ? (
            <div className="flex items-center gap-1.5">
              <LuUser className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              <span className="text-sm text-gray-700">{item.createdBy.name}</span>
            </div>
          ) : (
            <span className="text-xs text-gray-400">—</span>
          ),
      },
      ...(canDelete
        ? [
            {
              key: "actions" as keyof ILostFoundItem,
              header: "",
              render: (item: ILostFoundItem) => (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item);
                    }}
                    className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <LuTrash2 className="h-4 w-4" />
                  </button>
                </div>
              ),
            },
          ]
        : []),
    ],
    [canDelete, onDelete],
  );
}
