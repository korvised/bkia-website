import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useFetchAllClaimsQuery } from "@/features/lost-found/api";
import {
  setClaimFilters,
  resetClaimFilters,
  setClaimPage,
  setClaimPageSize,
} from "@/features/lost-found/slices";
import type { IClaimFilters } from "@/features/lost-found/types";

export function useGetAllClaims() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.lostFound.claimFilters);

  const { data, isLoading, isFetching } = useFetchAllClaimsQuery(filters);

  const handleFilterChange = useCallback(
    (key: keyof IClaimFilters, value: unknown) => {
      dispatch(setClaimFilters({ [key]: value }));
    },
    [dispatch],
  );

  const handleResetFilters = useCallback(() => {
    dispatch(resetClaimFilters());
  }, [dispatch]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setClaimPage(page));
    },
    [dispatch],
  );

  const handlePageSizeChange = useCallback(
    (limit: number) => {
      dispatch(setClaimPageSize(limit));
    },
    [dispatch],
  );

  const handleRowClick = useCallback(
    (id: string) => navigate(`/support/claims/${id}`),
    [navigate],
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
  };
}
