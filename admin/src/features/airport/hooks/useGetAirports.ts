import { useMemo, useState } from "react";
import {
  useDeleteAirportMutation,
  useFetchAirportsQuery,
  useUpdateAirportMutation,
} from "@/features/airport/api";
import { alertService } from "@/services/alert.service";
import { usePagination } from "@/hooks";
import type { IAirport, IAirportFilter } from "@/features/airport/types";

const defaultFilters: IAirportFilter = {
  search: "",
  isActive: "",
};

export function useGetAirports() {
  const [filters, setFilters] = useState<IAirportFilter>(defaultFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAirport, setEditAirport] = useState<IAirport | null>(null);

  const { data: rawData, isLoading, isFetching } = useFetchAirportsQuery(filters);
  const [deleteAirport] = useDeleteAirportMutation();
  const [updateAirport] = useUpdateAirportMutation();

  // Client-side pagination over the returned array
  const allAirports = useMemo(() => rawData ?? [], [rawData]);
  const {
    page,
    pageSize,
    paginatedData,
    total,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  } = usePagination(allAirports);

  const handleFilterChange = (key: keyof IAirportFilter, value: unknown) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleResetFilters = () => setFilters(defaultFilters);

  const handleOpenCreate = () => {
    setEditAirport(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (airport: IAirport) => {
    setEditAirport(airport);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditAirport(null);
  };

  const handleDelete = async (airport: IAirport) => {
    const result = await alertService.confirmModal(
      "Delete Airport",
      `Are you sure you want to delete "${airport.name}"? This action cannot be undone.`,
    );
    if (!result.isConfirmed) return;
    try {
      await deleteAirport(airport.id).unwrap();
      await alertService.success("Deleted", "Airport deleted successfully.");
    } catch {
      await alertService.error("Failed to delete airport. Please try again.");
    }
  };

  const handleToggleActive = async (airport: IAirport) => {
    try {
      await updateAirport({
        id: airport.id,
        body: { isActive: !airport.isActive },
      }).unwrap();
    } catch {
      await alertService.error("Failed to update airport status.");
    }
  };

  return {
    paginatedData,
    filters,
    isLoading,
    isFetching,
    page,
    pageSize,
    total,
    totalPages,
    modalOpen,
    editAirport,
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
