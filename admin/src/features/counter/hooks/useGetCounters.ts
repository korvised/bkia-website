import { useMemo, useState } from "react";
import {
  useDeleteCounterMutation,
  useFetchCountersQuery,
  useUpdateCounterMutation,
} from "@/features/counter/api";
import { alertService } from "@/services/alert.service";
import { usePagination } from "@/hooks";
import type { ICounter, ICounterFilter } from "@/features/counter/types";

const defaultFilters: ICounterFilter = {
  terminal: "",
  isActive: "",
};

export function useGetCounters() {
  const [filters, setFilters] = useState<ICounterFilter>(defaultFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCounter, setEditCounter] = useState<ICounter | null>(null);

  const {
    data: rawData,
    isLoading,
    isFetching,
  } = useFetchCountersQuery(filters);
  const [deleteCounter] = useDeleteCounterMutation();
  const [updateCounter] = useUpdateCounterMutation();

  // Client-side pagination over the returned array
  const allCounters = useMemo(() => rawData ?? [], [rawData]);
  const {
    page,
    pageSize,
    paginatedData,
    total,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  } = usePagination(allCounters);

  const handleFilterChange = (key: keyof ICounterFilter, value: unknown) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleResetFilters = () => setFilters(defaultFilters);

  const handleOpenCreate = () => {
    setEditCounter(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (counter: ICounter) => {
    setEditCounter(counter);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditCounter(null);
  };

  const handleDelete = async (counter: ICounter) => {
    const result = await alertService.confirmModal(
      "Delete Counter",
      `Are you sure you want to delete counter "${counter.name}"? This action cannot be undone.`,
    );
    if (!result.isConfirmed) return;
    try {
      await deleteCounter(counter.id).unwrap();
      await alertService.success("Deleted", "Counter deleted successfully.");
    } catch {
      await alertService.error("Failed to delete counter. Please try again.");
    }
  };

  const handleToggleActive = async (counter: ICounter) => {
    try {
      await updateCounter({
        id: counter.id,
        body: { isActive: !counter.isActive },
      }).unwrap();
    } catch {
      await alertService.error("Failed to update counter status.");
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
    editCounter,
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
