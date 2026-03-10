import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchNoticesQuery, useDeleteNoticeMutation } from "@/features/notice/api";
import { alertService } from "@/services/alert.service";
import type { INoticeFilter } from "@/features/notice/types";

const defaultFilters: INoticeFilter = {
  search: "",
  priority: "",
  isActive: "",
  page: 1,
  limit: 10,
};

export function useGetNotices() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<INoticeFilter>(defaultFilters);

  const { data, isLoading, isFetching } = useFetchNoticesQuery(filters);
  const [deleteNotice, { isLoading: isDeleting }] = useDeleteNoticeMutation();

  const handleFilterChange = (key: keyof INoticeFilter, value: unknown) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  const handleResetFilters = () => setFilters(defaultFilters);

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const handlePageSizeChange = (limit: number) =>
    setFilters((prev) => ({ ...prev, limit, page: 1 }));

  const handleCreate = () => navigate("/content/notices/create");

  const handleEdit = (id: string) => navigate(`/content/notices/${id}/edit`);

  const handleDelete = async (id: string) => {
    const result = await alertService.confirmModal(
      "Delete Notice",
      "Are you sure you want to delete this notice? This action cannot be undone.",
    );
    if (!result.isConfirmed) return;
    try {
      await deleteNotice(id).unwrap();
      await alertService.success("Deleted", "Notice has been deleted successfully.");
    } catch {
      await alertService.error("Failed to delete notice. Please try again.");
    }
  };

  return {
    data,
    filters,
    isLoading,
    isFetching,
    isDeleting,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleCreate,
    handleEdit,
    handleDelete,
  };
}
