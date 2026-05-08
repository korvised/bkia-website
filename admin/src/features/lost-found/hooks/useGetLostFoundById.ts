import { useNavigate } from "react-router-dom";
import { useFetchLostFoundByIdQuery, useFetchClaimsQuery } from "@/features/lost-found/api";

export function useGetLostFoundById(id: string, deleted = false) {
  const navigate = useNavigate();

  const {
    data: item,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useFetchLostFoundByIdQuery(id, { skip: !id || deleted });

  const {
    data: claims,
    isLoading: isLoadingClaims,
    isFetching: isClaimsFetching,
    isError: isClaimsError,
    refetch: refetchClaims,
  } = useFetchClaimsQuery(id, { skip: !id || deleted });

  const handleBack = () => navigate("/support/lost-found");
  const handleRefetch = () => { refetch(); refetchClaims(); };

  return {
    item,
    claims: claims ?? [],
    isLoading,
    isFetching,
    isLoadingClaims,
    isClaimsFetching,
    isError,
    isClaimsError,
    handleBack,
    handleRefetch,
  };
}
