import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useFetchLostFoundItemsQuery, useDeleteLostFoundMutation } from "@/features/lost-found/api";
import {
  setItemFilters,
  resetItemFilters,
  setItemPage,
  setItemPageSize,
} from "@/features/lost-found/slices";
import type { ILostFoundFilter, ILostFoundItem } from "@/features/lost-found/types";
import { alertService } from "@/services/alert.service";

export function useGetLostFoundItems() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.lostFound.itemFilters);

  const { data, isLoading, isFetching } = useFetchLostFoundItemsQuery(filters);
  const [deleteLostFound] = useDeleteLostFoundMutation();

  const handleFilterChange = useCallback(
    (key: keyof ILostFoundFilter, value: unknown) => {
      dispatch(setItemFilters({ [key]: value }));
    },
    [dispatch],
  );

  const handleResetFilters = useCallback(() => {
    dispatch(resetItemFilters());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setItemPage(page));
    },
    [dispatch],
  );

  const handlePageSizeChange = useCallback(
    (limit: number) => {
      dispatch(setItemPageSize(limit));
    },
    [dispatch],
  );

  const handleRowClick = useCallback(
    (id: string) => navigate(`/support/lost-found/${id}`),
    [navigate],
  );

  const handleDelete = useCallback(
    async (item: ILostFoundItem) => {
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
    },
    [deleteLostFound],
  );

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
