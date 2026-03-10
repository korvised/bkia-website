import { useMemo } from "react";
import { LuArrowRight, LuPencil, LuTrash2 } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import { cn } from "@/lib";
import { RouteType } from "@/types";
import type { IRoute } from "@/features/route/types";

interface Options {
  onEdit: (route: IRoute) => void;
  onDelete: (route: IRoute) => void;
  onToggleActive: (route: IRoute) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canToggleActive?: boolean;
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

function RouteTypeBadge({ type }: { type: RouteType }) {
  const isInt = type === RouteType.INT;
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-xs font-semibold",
        isInt ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700",
      )}
    >
      {isInt ? "International" : "Domestic"}
    </span>
  );
}

export function useRouteColumns({
  onEdit,
  onDelete,
  onToggleActive,
  canEdit = true,
  canDelete = true,
  canToggleActive = true,
}: Options) {
  return useMemo(
    (): Column<IRoute>[] => [
      {
        key: "routeType",
        header: "Type",
        render: (item) => <RouteTypeBadge type={item.routeType} />,
      },
      {
        key: "route",
        header: "Route",
        render: (item) => (
          <div className="flex items-center gap-2">
            <div className="text-center">
              <p className="font-mono text-sm font-bold text-gray-900">
                {item.origin?.code ?? "—"}
              </p>
              <p className="max-w-[120px] truncate text-xs text-gray-400">
                {item.origin?.name ?? ""}
              </p>
            </div>
            <LuArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
            <div className="text-center">
              <p className="font-mono text-sm font-bold text-gray-900">
                {item.destination?.code ?? "—"}
              </p>
              <p className="max-w-[120px] truncate text-xs text-gray-400">
                {item.destination?.name ?? ""}
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "duration",
        header: "Duration",
        render: (item) => (
          <span className="text-sm text-gray-700">
            {formatDuration(item.durationMin)}
          </span>
        ),
      },
      {
        key: "status",
        header: "Status",
        render: (item) =>
          canToggleActive ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleActive(item);
              }}
              className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium transition-opacity hover:opacity-75",
                item.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500",
              )}
              title="Click to toggle status"
            >
              {item.isActive ? "Active" : "Inactive"}
            </button>
          ) : (
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                item.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500",
              )}
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
                  onEdit(item);
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
                  onDelete(item);
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
    [onEdit, onDelete, onToggleActive, canEdit, canDelete, canToggleActive],
  );
}
