import { type IRoute } from "@/types";
import {
  ForgotPasswordPage,
  ResetPasswordPage,
  SignInPage,
} from "@/modules/auth/pages";

export const authRoutes: IRoute[] = [
  { path: "/", element: SignInPage },
  { path: "/forgot-password", element: ForgotPasswordPage },
  { path: "/reset-password", element: ResetPasswordPage },
];
