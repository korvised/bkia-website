import { useMemo, useState } from "react";
import {
  useDeleteRouteMutation,
  useFetchRoutesQuery,
  useUpdateRouteMutation,
} from "@/features/route/api";
import { alertService } from "@/services/alert.service";
import { usePagination } from "@/hooks";
import type { IRoute, IRouteFilter } from "@/features/route/types";

const defaultFilters: IRouteFilter = {
  routeType: "",
  isActive: "",
};

export function useGetRoutes() {
  const [filters, setFilters] = useState<IRouteFilter>(defaultFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRoute, setEditRoute] = useState<IRoute | null>(null);

  const { data: rawData, isLoading, isFetching } = useFetchRoutesQuery(filters);
  const [deleteRoute] = useDeleteRouteMutation();
  const [updateRoute] = useUpdateRouteMutation();

  const allRoutes = useMemo(() => rawData ?? [], [rawData]);
  const {
    page,
    pageSize,
    paginatedData,
    total,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  } = usePagination(allRoutes);

  const handleFilterChange = (key: keyof IRouteFilter, value: unknown) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleResetFilters = () => setFilters(defaultFilters);

  const handleOpenCreate = () => {
    setEditRoute(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (route: IRoute) => {
    setEditRoute(route);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditRoute(null);
  };

  const handleDelete = async (route: IRoute) => {
    const label = `${route.origin?.code ?? "?"} → ${route.destination?.code ?? "?"}`;
    const result = await alertService.confirmModal(
      "Delete Route",
      `Are you sure you want to delete route "${label}"? This action cannot be undone.`,
    );
    if (!result.isConfirmed) return;
    try {
      await deleteRoute(route.id).unwrap();
      await alertService.success("Deleted", "Route deleted successfully.");
    } catch {
      await alertService.error("Failed to delete route. Please try again.");
    }
  };

  const handleToggleActive = async (route: IRoute) => {
    try {
      await updateRoute({
        id: route.id,
        body: { isActive: !route.isActive },
      }).unwrap();
    } catch {
      await alertService.error("Failed to update route status.");
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
    editRoute,
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
