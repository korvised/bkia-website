import { type IRoute } from "@/types";
import { ProfilePage } from "@/pages";

export const mainRoutes: IRoute[] = [
  {
    path: "profile",
    element: ProfilePage,
  },
];
