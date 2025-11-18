import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";
import { cn } from "@/lib";
import { Select } from "./select.tsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50],
  className,
}: PaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-4 sm:flex-row", className)}
    >
      {/* Left section - fixed width */}
      <div className="flex min-w-fit items-center gap-2 text-sm text-gray-600 sm:flex-1">
        <span>Show</span>
        <Select
          value={pageSize.toString()}
          onChange={(val) => onPageSizeChange(Number(val))}
          options={pageSizeOptions.map((size) => ({
            value: size.toString(),
            label: size.toString(),
          }))}
          className="!w-20 shrink-0"
        />
        <span className="shrink-0">
          of {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Center section - page numbers */}
      <div className="flex items-center justify-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            "rounded-lg p-2 transition-colors",
            currentPage === 1
              ? "cursor-not-allowed text-gray-300"
              : "text-gray-600 hover:bg-gray-100",
          )}
          aria-label="First page"
        >
          <LuChevronsLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "rounded-lg p-2 transition-colors",
            currentPage === 1
              ? "cursor-not-allowed text-gray-300"
              : "text-gray-600 hover:bg-gray-100",
          )}
          aria-label="Previous page"
        >
          <LuChevronLeft className="h-4 w-4" />
        </button>

        <div className="mx-2 flex items-center gap-1">
          {getPageNumbers().map((page, idx) =>
            typeof page === "number" ? (
              <button
                key={idx}
                onClick={() => onPageChange(page)}
                className={cn(
                  "h-8 min-w-[32px] rounded-lg px-2 text-sm transition-colors",
                  currentPage === page
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100",
                )}
              >
                {page}
              </button>
            ) : (
              <span key={idx} className="px-1 text-gray-400">
                {page}
              </span>
            ),
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={cn(
            "rounded-lg p-2 transition-colors",
            currentPage === totalPages || totalPages === 0
              ? "cursor-not-allowed text-gray-300"
              : "text-gray-600 hover:bg-gray-100",
          )}
          aria-label="Next page"
        >
          <LuChevronRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={cn(
            "rounded-lg p-2 transition-colors",
            currentPage === totalPages || totalPages === 0
              ? "cursor-not-allowed text-gray-300"
              : "text-gray-600 hover:bg-gray-100",
          )}
          aria-label="Last page"
        >
          <LuChevronsRight className="h-4 w-4" />
        </button>
      </div>

      {/* Right section - fixed width */}
      <div className="text-sm text-gray-600 sm:flex-1 sm:text-right">
        {startItem}-{endItem} of {totalItems}
      </div>
    </div>
  );
}
