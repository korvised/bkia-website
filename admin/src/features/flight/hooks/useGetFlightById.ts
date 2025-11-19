import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertService } from "@/services";
import { getErrorMessage } from "@/lib/utils";
import {
  useFetchFlightByIdQuery,
  useDeleteFlightMutation,
} from "@/features/flight/api";

export const useGetFlightById = (id: string) => {
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  const {
    data: flight,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useFetchFlightByIdQuery(id, {
    skip: !id || isDeleted,
  });

  const [deleteFlight, { isLoading: isDeleting }] = useDeleteFlightMutation();

  const handleBack = useCallback(() => {
    navigate("/flights");
  }, [navigate]);

  const handleEdit = useCallback(() => {
    navigate(`/flights/${id}/edit`);
  }, [navigate, id]);

  const handleDelete = useCallback(async () => {
    const confirmed = await alertService.confirmModal(
      "Delete Flight",
      `Are you sure you want to delete flight ${flight?.flightNo}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setIsDeleted(true);
      await deleteFlight(id).unwrap();
      alertService.success("Flight deleted successfully");
      navigate("/flights");
    } catch (error) {
      setIsDeleted(false);
      alertService.error(getErrorMessage(error));
    }
  }, [deleteFlight, id, navigate, flight?.flightNo]);

  return {
    flight,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    handleBack,
    handleEdit,
    handleDelete,
    isDeleting,
  };
};
