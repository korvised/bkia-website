import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchNewsQuery, useDeleteNewsMutation } from "@/features/news/api";
import { alertService } from "@/services/alert.service";
import type { INewsFilter } from "@/features/news/types";

const defaultFilters: INewsFilter = {
  search: "",
  category: "",
  isPublished: "",
  isFeatured: "",
  sortBy: "publishDate",
  order: "DESC",
  page: 1,
  limit: 10,
};

export function useGetNews() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<INewsFilter>(defaultFilters);

  const { data, isLoading, isFetching } = useFetchNewsQuery(filters);
  const [deleteNews, { isLoading: isDeleting }] = useDeleteNewsMutation();

  const handleFilterChange = (key: keyof INewsFilter, value: unknown) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  const handleResetFilters = () => setFilters(defaultFilters);

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const handlePageSizeChange = (limit: number) =>
    setFilters((prev) => ({ ...prev, limit, page: 1 }));

  const handleCreate = () => navigate("/content/news/create");

  const handleEdit = (id: string) => navigate(`/content/news/${id}/edit`);

  const handleDelete = async (id: string) => {
    const result = await alertService.confirmModal(
      "Delete News",
      "Are you sure you want to delete this news article? This action cannot be undone.",
    );
    if (!result.isConfirmed) return;
    try {
      await deleteNews(id).unwrap();
      await alertService.success("Deleted", "News article deleted successfully.");
    } catch {
      await alertService.error("Failed to delete news article. Please try again.");
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
