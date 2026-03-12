import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchFeedbacksQuery } from "@/features/feedback/api";
import type { IFeedbackFilter } from "@/features/feedback/types";

const defaultFilters: IFeedbackFilter = {
  status: "",
  category: "",
  search: "",
  page: 1,
  limit: 20,
};

export function useGetFeedbacks() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<IFeedbackFilter>(defaultFilters);

  const { data, isLoading, isFetching } = useFetchFeedbacksQuery(filters);

  const handleFilterChange = (key: keyof IFeedbackFilter, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleResetFilters = () => setFilters(defaultFilters);

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const handlePageSizeChange = (limit: number) =>
    setFilters((prev) => ({ ...prev, limit, page: 1 }));

  const handleRowClick = (id: string) => navigate(`/support/feedback/${id}`);

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
