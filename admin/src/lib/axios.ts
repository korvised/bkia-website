import axios from "axios";
import { config } from "@/config";
import { signOut } from "@/features/auth/slices";
import { store } from "@/redux/store";
import { tokenStorageService } from "@/services";

const api = axios.create({
  baseURL: config.apiBaseUrl,
});

// Skip these routes from setting Authorization header
const excludedAuthRoutes = ["/auth/sign-in"];

api.interceptors.request.use((config) => {
  const requestUrl = config.url ?? "";

  // Only add token if route is not excluded
  const shouldAttachToken = !excludedAuthRoutes.some((route) =>
    requestUrl.includes(route),
  );

  if (shouldAttachToken) {
    const { accessToken } = tokenStorageService.getTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl: string = error.config?.url || "";

    const isSignInRequest = requestUrl.includes("/auth/sign-in");

    if (status === 401 && !isSignInRequest) {
      store.dispatch(signOut());
    }

    return Promise.reject(error);
  },
);

export default api;
