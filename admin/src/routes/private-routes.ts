import { type IRoute } from "@/types";
import { HomePage } from "@/pages";

export const authRoutes: IRoute[] = [
  {
    path: "home",
    element: HomePage,
  },
];

export const privateRoutes: IRoute[] = [...authRoutes];
