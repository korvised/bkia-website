import type { IUser } from '@/types';

export interface IActivateAccountForm {
  password: string;
  confirmPassword: string;
}

export interface IActivateAccountPayload {
  newPassword: string;
}

export interface SignInFormData {
  rememberMe: boolean;
  employeeId: string;
  email: string;
  password: string;
}

export interface RememberedUserData {
  employeeId: string;
  email: string;
  nameEn: string;
  nameLa: string;
  avatar?: string;
  position?: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export type SignInFormErrors = Partial<Record<keyof SignInFormData, string>> & {
  submit?: string;
};

export type ForgotPasswordFormErrors = Partial<
  Record<keyof ForgotPasswordFormData, string>
> & {
  submit?: string;
};

export type ResetPasswordFormErrors = Partial<
  Record<keyof ResetPasswordFormData, string>
> & {
  submit?: string;
};

export type SignInPayload = Omit<SignInFormData, 'rememberMe'>;

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}
