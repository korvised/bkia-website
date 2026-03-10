import { useMemo } from "react";
import { LuGlobe, LuPencil, LuPhone, LuTrash2 } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import { asset, cn } from "@/lib";
import type { IAirline } from "@/features/airline/types";

interface Options {
  onEdit: (airline: IAirline) => void;
  onDelete: (airline: IAirline) => void;
  onToggleActive: (airline: IAirline) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canToggleActive?: boolean;
}

function getLocalizedName(airline: IAirline): string {
  return (
    airline.names?.en || airline.names?.lo || airline.names?.zh || airline.name
  );
}

export function useAirlineColumns({
  onEdit,
  onDelete,
  onToggleActive,
  canEdit = true,
  canDelete = true,
  canToggleActive = true,
}: Options) {
  return useMemo(
    (): Column<IAirline>[] => [
      {
        key: "logo",
        header: "",
        render: (item) =>
          item.logoFile?.path ? (
            <img
              src={asset(item.logoFile.path)}
              alt={item.name}
              className="h-9 w-9 rounded-full border border-gray-100 bg-white object-contain p-0.5"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500">
              {item.code.slice(0, 2)}
            </div>
          ),
      },
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
            <p className="font-medium text-gray-900">
              {getLocalizedName(item)}
            </p>
            {item.names?.lo && (
              <p className="font-lao text-xs text-gray-400">{item.names.lo}</p>
            )}
          </div>
        ),
      },
      {
        key: "contact",
        header: "Contact",
        render: (item) => (
          <div className="space-y-0.5">
            {item.hotline && (
              <p className="flex items-center gap-1 text-xs text-gray-600">
                <LuPhone className="h-3 w-3 shrink-0" />
                {item.hotline}
              </p>
            )}
            {item.phone && item.phone !== item.hotline && (
              <p className="flex items-center gap-1 text-xs text-gray-500">
                <LuPhone className="h-3 w-3 shrink-0" />
                {item.phone}
              </p>
            )}
            {!item.hotline && !item.phone && (
              <span className="text-xs text-gray-400">—</span>
            )}
          </div>
        ),
      },
      {
        key: "website",
        header: "Website",
        render: (item) =>
          item.website ? (
            <a
              href={
                item.website.startsWith("http")
                  ? item.website
                  : `https://${item.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
            >
              <LuGlobe className="h-3 w-3" />
              {item.website.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            <span className="text-xs text-gray-400">—</span>
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
