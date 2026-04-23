import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchLostFoundItemsQuery, useDeleteLostFoundMutation } from "@/features/lost-found/api";
import type { ILostFoundFilter, ILostFoundItem } from "@/features/lost-found/types";
import { alertService } from "@/services/alert.service";

const defaultFilters: ILostFoundFilter = {
  type: "",
  category: "",
  status: "",
  search: "",
  page: 1,
  limit: 10,
};

export function useGetLostFoundItems() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ILostFoundFilter>(defaultFilters);

  const { data, isLoading, isFetching } = useFetchLostFoundItemsQuery(filters);
  const [deleteLostFound] = useDeleteLostFoundMutation();

  const handleFilterChange = (key: keyof ILostFoundFilter, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleResetFilters = () => setFilters(defaultFilters);

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const handlePageSizeChange = (limit: number) =>
    setFilters((prev) => ({ ...prev, limit, page: 1 }));

  const handleRowClick = (id: string) => navigate(`/support/lost-found/${id}`);

  const handleDelete = async (item: ILostFoundItem) => {
    const result = await alertService.confirmModal(
      "Delete Report",
      `Are you sure you want to delete "${item.displayNames?.en ?? item.displayNames?.lo ?? "this item"}"? This action cannot be undone.`,
    );
    if (!result.isConfirmed) return;
    try {
      await deleteLostFound(item.id).unwrap();
      await alertService.success("Deleted", "Lost & found report deleted successfully.");
    } catch {
      await alertService.error("Failed to delete report. Please try again.");
    }
  };

  return {
    data,
    filters,
    isLoading,
    isFetching,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleRowClick,
    handleDelete,
  };
}
