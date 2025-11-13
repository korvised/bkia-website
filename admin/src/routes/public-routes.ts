import { type IRoute } from "@/types";
import { authRoutes } from "@/modules/auth/routes";

export const publicRoutes: IRoute[] = [...authRoutes];
