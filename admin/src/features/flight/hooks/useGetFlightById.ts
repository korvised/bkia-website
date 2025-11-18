import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchFlightByIdQuery } from "@/features/flight/api";

export const useGetFlightById = (id: string) => {
  const navigate = useNavigate();

  const {
    data: flight,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useFetchFlightByIdQuery(id, {
    skip: !id,
  });

  const handleBack = useCallback(() => {
    navigate("/flights");
  }, [navigate]);

  const handleEdit = useCallback(() => {
    navigate(`/flights/${id}/edit`);
  }, [navigate, id]);

  return {
    flight,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    handleBack,
    handleEdit,
  };
};
