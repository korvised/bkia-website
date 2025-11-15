import type { ICurrentUser } from "@/types";

export interface IActivateAccountForm {
  password: string;
  confirmPassword: string;
}

export interface IActivateAccountPayload {
  newPassword: string;
}

export interface SignInFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export type RememberedUserData = IAuthResponse;

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

export type SignInType = "email" | "employeeId";

export type SignInPayload = Pick<SignInFormData, "password"> & {
  type: SignInType;
  value: string;
};

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthResponse extends ICurrentUser {
  accessToken: string;
}
