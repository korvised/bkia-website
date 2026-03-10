import { useState } from "react";
import {
  useActivateAirlineMutation,
  useDeactivateAirlineMutation,
  useDeleteAirlineMutation,
  useFetchAirlinesQuery,
} from "@/features/airline/api";
import { alertService } from "@/services/alert.service";
import type { IAirline, IAirlineFilter } from "@/features/airline/types";

const defaultFilters: IAirlineFilter = {
  search: "",
  isActive: "",
  orderBy: "createdAt",
  order: "DESC",
  page: 1,
  limit: 10,
};

export function useGetAirlines() {
  const [filters, setFilters] = useState<IAirlineFilter>(defaultFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAirline, setEditAirline] = useState<IAirline | null>(null);

  const { data, isLoading, isFetching } = useFetchAirlinesQuery(filters);
  const [deleteAirline] = useDeleteAirlineMutation();
  const [activateAirline] = useActivateAirlineMutation();
  const [deactivateAirline] = useDeactivateAirlineMutation();

  const handleFilterChange = (key: keyof IAirlineFilter, value: unknown) =>
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  const handleResetFilters = () => setFilters(defaultFilters);

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const handlePageSizeChange = (limit: number) =>
    setFilters((prev) => ({ ...prev, limit, page: 1 }));

  const handleOpenCreate = () => {
    setEditAirline(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (airline: IAirline) => {
    setEditAirline(airline);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditAirline(null);
  };

  const handleDelete = async (airline: IAirline) => {
    const result = await alertService.confirmModal(
      "Delete Airline",
      `Are you sure you want to delete "${airline.name}"? This action cannot be undone.`,
    );
    if (!result.isConfirmed) return;
    try {
      await deleteAirline(airline.id).unwrap();
      await alertService.success("Deleted", "Airline deleted successfully.");
    } catch {
      await alertService.error("Failed to delete airline. Please try again.");
    }
  };

  const handleToggleActive = async (airline: IAirline) => {
    try {
      if (airline.isActive) {
        await deactivateAirline(airline.id).unwrap();
      } else {
        await activateAirline(airline.id).unwrap();
      }
    } catch {
      await alertService.error("Failed to update airline status.");
    }
  };

  return {
    data,
    filters,
    isLoading,
    isFetching,
    modalOpen,
    editAirline,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleDelete,
    handleToggleActive,
  };
}
