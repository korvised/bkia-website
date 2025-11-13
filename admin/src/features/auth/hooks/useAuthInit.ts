import { useEffect } from "react";
import { useAppDispatch, useGetAuth } from "@/hooks";
import { tokenStorageService } from "@/services";
import { fetchCurrentUser, signOut } from "@/features/auth/slices";

export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  const { isInitialized, isLoading, isAuthenticated, currentUser } =
    useGetAuth();

  useEffect(() => {
    const { accessToken } = tokenStorageService.getTokens();
    if (accessToken) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(signOut());
    }
  }, [dispatch]);

  return { isInitialized, isLoading, isAuthenticated, currentUser };
};
