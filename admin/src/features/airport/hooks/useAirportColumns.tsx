import { useMemo } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import { cn } from "@/lib";
import type { IAirport } from "@/features/airport/types";

interface Options {
  onEdit: (airport: IAirport) => void;
  onDelete: (airport: IAirport) => void;
  onToggleActive: (airport: IAirport) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canToggleActive?: boolean;
}

function getLocalizedName(airport: IAirport): string {
  return airport.names?.en || airport.names?.lo || airport.names?.zh || airport.name;
}

export function useAirportColumns({
  onEdit,
  onDelete,
  onToggleActive,
  canEdit = true,
  canDelete = true,
  canToggleActive = true,
}: Options) {
  return useMemo(
    (): Column<IAirport>[] => [
      {
        key: "code",
        header: "Code",
        render: (item) => (
          <span className="inline-flex rounded bg-blue-50 px-2 py-0.5 font-mono text-xs font-semibold text-blue-700">
            {item.code}
          </span>
        ),
      },
      {
        key: "name",
        header: "Name",
        render: (item) => (
          <div>
            <p className="font-medium text-gray-900">{getLocalizedName(item)}</p>
            {item.names?.lo && item.names.lo !== item.name && (
              <p className="text-xs text-gray-400">{item.names.lo}</p>
            )}
          </div>
        ),
      },
      {
        key: "names",
        header: "Localized",
        render: (item) => (
          <div className="space-y-0.5">
            {item.names?.en && (
              <p className="text-xs text-gray-600">
                <span className="font-medium text-gray-400">EN</span>{" "}
                {item.names.en}
              </p>
            )}
            {item.names?.zh && (
              <p className="text-xs text-gray-600">
                <span className="font-medium text-gray-400">ZH</span>{" "}
                {item.names.zh}
              </p>
            )}
            {!item.names?.en && !item.names?.zh && (
              <span className="text-xs text-gray-400">—</span>
            )}
          </div>
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
