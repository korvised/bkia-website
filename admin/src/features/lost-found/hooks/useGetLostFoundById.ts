import { useNavigate } from "react-router-dom";
import { useFetchLostFoundByIdQuery, useFetchClaimsQuery } from "@/features/lost-found/api";

export function useGetLostFoundById(id: string) {
  const navigate = useNavigate();

  const {
    data: item,
    isLoading,
    isError,
  } = useFetchLostFoundByIdQuery(id, { skip: !id });

  const { data: claims, isLoading: isLoadingClaims } = useFetchClaimsQuery(id, { skip: !id });

  const handleBack = () => navigate("/support/lost-found");

  return {
    item,
    claims: claims ?? [],
    isLoading,
    isLoadingClaims,
    isError,
    handleBack,
  };
}
