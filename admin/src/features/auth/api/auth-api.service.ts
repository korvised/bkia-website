import { api } from "@/lib";
import type {
  ChangePasswordPayload,
  ForgotPasswordFormData,
  IAuthResponse,
  SignInPayload,
} from "@/features/auth/types";
import type { ICurrentUser, IUser } from "@/types";

class AuthApiService {
  signIn(credentials: SignInPayload) {
    return api.post<IAuthResponse>("/auth/sign-in", credentials);
  }

  fetchCurrentUser() {
    return api.get<ICurrentUser>("/auth/current-user");
  }

  forgotPassword(payload: ForgotPasswordFormData) {
    return api.post<IUser>(`/auth/forgot-password`, payload);
  }

  changePassword(payload: ChangePasswordPayload) {
    return api.patch<IUser>("/auth/change-password", payload);
  }
}

export const authApiService = new AuthApiService();
