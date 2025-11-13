import { useAppSelector } from "@/app/hooks";

export const useGetAuth = () => {
  const { isInitialized, isLoading, isAuthenticated, user } = useAppSelector(
    (state) => state.auth,
  );

  return { isInitialized, isLoading, isAuthenticated, currentUser: user };
};
