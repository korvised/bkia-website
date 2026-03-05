import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchLostFoundItemsQuery } from "@/features/lost-found/api";
import type { ILostFoundFilter } from "@/features/lost-found/types";

const defaultFilters: ILostFoundFilter = {
  type: "",
  category: "",
  status: "",
  visibility: "",
  search: "",
  page: 1,
  limit: 10,
};

export function useGetLostFoundItems() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ILostFoundFilter>(defaultFilters);

  const { data, isLoading, isFetching } = useFetchLostFoundItemsQuery(filters);

  const handleFilterChange = (key: keyof ILostFoundFilter, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleResetFilters = () => setFilters(defaultFilters);

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const handlePageSizeChange = (limit: number) =>
    setFilters((prev) => ({ ...prev, limit, page: 1 }));

  const handleRowClick = (id: string) => navigate(`/support/lost-found/${id}`);

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
