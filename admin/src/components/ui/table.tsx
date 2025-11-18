import { cn } from "@/lib";
import { LuChevronUp, LuChevronDown, LuChevronsUpDown } from "react-icons/lu";

export type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  className?: string;
  render?: (item: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  onRowClick?: (item: T) => void;
  rowKey: (item: T) => string;
  emptyMessage?: string;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  isLoading = false,
  sortKey,
  sortDirection,
  onSort,
  onRowClick,
  rowKey,
  emptyMessage = "No data available",
  className,
}: TableProps<T>) {
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    if (sortKey === column.key) {
      return sortDirection === "asc" ? (
        <LuChevronUp className="h-4 w-4" />
      ) : (
        <LuChevronDown className="h-4 w-4" />
      );
    }
    return <LuChevronsUpDown className="h-4 w-4 opacity-50" />;
  };

  return (
    <div className={cn("horizontal-scroll overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left text-sm font-semibold text-gray-700",
                  column.sortable &&
                    "cursor-pointer select-none hover:bg-gray-100",
                  column.className,
                )}
                onClick={() => column.sortable && onSort?.(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {renderSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
                  <span className="text-gray-500">Loading...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={rowKey(item)}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "border-b border-gray-200 transition-colors last:border-b-0 hover:bg-gray-50",
                  onRowClick && "cursor-pointer",
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "px-4 py-3 text-sm text-gray-600",
                      column.className,
                    )}
                  >
                    {column.render
                      ? column.render(item, index)
                      : ((item as Record<string, unknown>)[
                          column.key
                        ]?.toString() ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
