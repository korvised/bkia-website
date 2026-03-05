import { useState } from "react";

export function usePagination<T>(data: T[], defaultPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return {
    page,
    pageSize,
    paginatedData,
    total,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  };
}
