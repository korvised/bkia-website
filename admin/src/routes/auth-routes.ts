import { type IRoute } from "@/types";
import { HomePage, ProfilePage } from "@/pages";

export const authRoutes: IRoute[] = [
  {
    path: "home",
    element: HomePage,
  },
  {
    path: "profile",
    element: ProfilePage,
  },
];
