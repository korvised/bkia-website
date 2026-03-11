import { useMemo } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import { asset } from "@/lib";
import type { IBanner } from "@/features/banner/types";

interface Options {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

function getAltText(banner: IBanner): string {
  return (
    banner.altText.en ||
    banner.altText.lo ||
    banner.altText.zh ||
    "—"
  );
}

function getTitle(banner: IBanner): string | null {
  if (!banner.title) return null;
  return banner.title.en || banner.title.lo || banner.title.zh || null;
}

export function useBannerColumns({
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}: Options) {
  return useMemo(
    (): Column<IBanner>[] => [
      {
        key: "image",
        header: "Image",
        render: (item) => (
          <div className="h-14 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shrink-0">
            <img
              src={asset(item.image.path)}
              alt={getAltText(item)}
              className="h-full w-full object-cover"
            />
          </div>
        ),
      },
      {
        key: "altText",
        header: "Alt Text / Title",
        render: (item) => (
          <div>
            <p className="font-medium text-gray-900">{getAltText(item)}</p>
            {getTitle(item) && (
              <p className="text-xs text-gray-500">{getTitle(item)}</p>
            )}
          </div>
        ),
      },
      {
        key: "order",
        header: "Order",
        render: (item) => (
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
            {item.order}
          </span>
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
