import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchBannersQuery, useDeleteBannerMutation } from "@/features/banner/api";
import { alertService } from "@/services/alert.service";
import type { IBannerFilter } from "@/features/banner/types";

const defaultFilters: IBannerFilter = {
  isActive: "",
  page: 1,
  limit: 10,
};

export function useGetBanners() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<IBannerFilter>(defaultFilters);

  const { data, isLoading, isFetching } = useFetchBannersQuery(filters);
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const handleFilterChange = (key: keyof IBannerFilter, value: unknown) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  const handleResetFilters = () => setFilters(defaultFilters);

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const handlePageSizeChange = (limit: number) =>
    setFilters((prev) => ({ ...prev, limit, page: 1 }));

  const handleCreate = () => navigate("/content/banners/create");

  const handleEdit = (id: string) => navigate(`/content/banners/${id}/edit`);

  const handleDelete = async (id: string) => {
    const result = await alertService.confirmModal(
      "Delete Banner",
      "Are you sure you want to delete this banner slide? This action cannot be undone.",
    );
    if (!result.isConfirmed) return;
    try {
      await deleteBanner(id).unwrap();
      await alertService.success("Deleted", "Banner deleted successfully.");
    } catch {
      await alertService.error("Failed to delete banner. Please try again.");
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
