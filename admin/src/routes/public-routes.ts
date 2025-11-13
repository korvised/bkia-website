import { type IRoute } from "@/types";
import { authRoutes } from "@/features/auth/routes";

export const publicRoutes: IRoute[] = [...authRoutes];
