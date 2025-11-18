import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useFetchFlightsQuery } from "@/features/flight/api";
import { useFetchAirlinesQuery } from "@/features/airline/api";
import {
  setFilters,
  resetFilters,
  setPage,
  setPageSize,
  setSort,
} from "@/features/flight/slices";
import type { IFlight, IFlightFilter } from "@/features/flight/types";
import type { Order } from "@/types";
import type { SortDirection } from "@/components/ui";

export const useGetFlights = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get filters from Redux store
  const filters = useAppSelector((state) => state.flight.filters);

  const {
    data,
    isLoading,
    isUninitialized,
    isFetching,
    refetch,
  } = useFetchFlightsQuery(filters);

  const {
    data: airlinesData,
    isLoading: isLoadingAirlines,
  } = useFetchAirlinesQuery();

  // Filter handlers
  const handleFilterChange = useCallback(
    (newFilters: Partial<IFlightFilter>) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch]
  );

  const handlePageSizeChange = useCallback(
    (limit: number) => {
      dispatch(setPageSize(limit));
    },
    [dispatch]
  );

  const handleSort = useCallback(
    (key: string) => {
      const newOrder: Order =
        filters.sortBy === key && filters.order === "ASC" ? "DESC" : "ASC";
      dispatch(setSort({ sortBy: key, order: newOrder }));
    },
    [dispatch, filters.sortBy, filters.order]
  );

  // Row click handler - navigate to detail page
  const handleRowClick = useCallback(
    (flight: IFlight) => {
      navigate(`/flights/${flight.id}`);
    },
    [navigate]
  );

  // Computed values
  const sortDirection: SortDirection = useMemo(() => {
    if (!filters.order) return null;
    return filters.order.toLowerCase() as SortDirection;
  }, [filters.order]);

  const airlines = useMemo(() => airlinesData?.data ?? [], [airlinesData]);

  return {
    // Data
    data,
    airlines,

    // Loading states
    isLoading,
    isUninitialized,
    isFetching,
    isLoadingAirlines,

    // Filters
    filters,
    sortDirection,

    // Handlers
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleRowClick,
    refetch,
  };
};
