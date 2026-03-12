import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useFetchAuctionsQuery,
  useDeleteAuctionMutation,
} from "@/features/auction/api";
import { alertService } from "@/services/alert.service";
import type { IAuctionFilter } from "@/features/auction/types";

const defaultFilters: IAuctionFilter = {
  status: "",
  category: "",
  search: "",
  page: 1,
  limit: 10,
};

export function useGetAuctions() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<IAuctionFilter>(defaultFilters);

  const { data, isLoading, isFetching } = useFetchAuctionsQuery(filters);
  const [deleteAuction, { isLoading: isDeleting }] = useDeleteAuctionMutation();

  const handleFilterChange = (key: keyof IAuctionFilter, value: unknown) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  const handleResetFilters = () => setFilters(defaultFilters);

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const handlePageSizeChange = (limit: number) =>
    setFilters((prev) => ({ ...prev, limit, page: 1 }));

  const handleCreate = () => navigate("/content/auctions/create");

  const handleEdit = (id: string) => navigate(`/content/auctions/${id}/edit`);

  const handleDelete = async (id: string) => {
    const result = await alertService.confirmModal(
      "Delete Auction",
      "Are you sure you want to delete this auction? All associated documents will also be deleted. This action cannot be undone.",
    );
    if (!result.isConfirmed) return;
    try {
      await deleteAuction(id).unwrap();
      await alertService.success("Deleted", "Auction deleted successfully.");
    } catch {
      await alertService.error("Failed to delete auction. Please try again.");
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
