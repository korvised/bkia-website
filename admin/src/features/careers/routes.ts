import { CONTENT_ACCESS_ROLES } from "@/constants";
import { CareersPage, CareerCreatePage, CareerEditPage } from "./pages";

export const careersRoutes = [
  {
    path: "/content/careers",
    element: CareersPage,
    allowRoles: CONTENT_ACCESS_ROLES.CAREERS_MANAGEMENT,
  },
  {
    path: "/content/careers/create",
    element: CareerCreatePage,
    allowRoles: CONTENT_ACCESS_ROLES.CAREERS_MANAGEMENT,
  },
  {
    path: "/content/careers/:id/edit",
    element: CareerEditPage,
    allowRoles: CONTENT_ACCESS_ROLES.CAREERS_MANAGEMENT,
  },
];
