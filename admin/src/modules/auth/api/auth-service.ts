import { api } from 'lib';
import type {
  ChangePasswordPayload,
  ForgotPasswordFormData,
  IAuthResponse,
  SignInPayload
} from '@/modules/auth/types';
import type { IUser } from '@/types';

export class AuthApiService {
  signIn(credentials: SignInPayload) {
    return api.post<IAuthResponse>('/auth/sign-in', credentials);
  }

  fetchCurrentUser() {
    return api.get<IUser>('/auth/current-user');
  }

  forgotPassword(payload: ForgotPasswordFormData) {
    return api.post<IUser>(`/auth/forgot-password`, payload);
  }

  changePassword(payload: ChangePasswordPayload) {
    return api.patch<IUser>('/auth/change-password', payload);
  }
}

export const authApiService = new AuthApiService();
