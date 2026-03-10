import { useMemo } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import { cn } from "@/lib";
import { Terminal } from "@/types";
import type { ICounter } from "@/features/counter/types";

interface Options {
  onEdit: (counter: ICounter) => void;
  onDelete: (counter: ICounter) => void;
  onToggleActive: (counter: ICounter) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  canToggleActive?: boolean;
}

function TerminalBadge({ terminal }: { terminal: Terminal }) {
  const isInt = terminal === Terminal.INT;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold",
        isInt
          ? "bg-blue-50 text-blue-700"
          : "bg-amber-50 text-amber-700",
      )}
    >
      <span className="font-mono">{terminal}</span>
      <span className="font-normal opacity-70">·</span>
      <span>{isInt ? "International" : "Domestic"}</span>
    </span>
  );
}

export function useCounterColumns({
  onEdit,
  onDelete,
  onToggleActive,
  canEdit = true,
  canDelete = true,
  canToggleActive = true,
}: Options) {
  return useMemo(
    (): Column<ICounter>[] => [
      {
        key: "terminal",
        header: "Terminal",
        render: (item) => <TerminalBadge terminal={item.terminal} />,
      },
      {
        key: "name",
        header: "Counter Name",
        render: (item) => (
          <span className="font-medium text-gray-900">{item.name}</span>
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
