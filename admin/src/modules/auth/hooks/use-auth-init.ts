import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks.ts";
import { useGetAuth } from "@/hooks";
import { storage } from "@/lib";
import { fetchCurrentUser, signOut } from "@/modules/auth/api";

export const useAuthInit = () => {
  const dispatch = useAppDispatch();

  const { isInitialized, isLoading, isAuthenticated, currentUser } =
    useGetAuth();

  useEffect(() => {
    const { accessToken } = storage.getTokens();
    if (accessToken) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(signOut());
    }
  }, [dispatch]);

  return { isInitialized, isLoading, isAuthenticated, currentUser };
};
