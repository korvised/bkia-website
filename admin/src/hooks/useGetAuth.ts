import { useAppSelector } from "@/hooks";

export const useGetAuth = () => {
  const { isInitialized, isLoading, isAuthenticated, currentUser } =
    useAppSelector((state) => state.auth);
  return { isInitialized, isLoading, isAuthenticated, currentUser };
};
