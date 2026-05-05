import { CONTENT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types/enum.type";
import { CareersPage, CareerCreatePage, CareerEditPage } from "./pages";

const CAREER_PERMISSIONS = [
  PermissionSlug.CAREER_READ,
  PermissionSlug.CAREER_CREATE,
  PermissionSlug.CAREER_UPDATE,
  PermissionSlug.CAREER_DELETE,
];

export const careersRoutes = [
  {
    path: "/content/careers",
    element: CareersPage,
    allowRoles: CONTENT_ACCESS_ROLES.CAREERS_MANAGEMENT,
    allowPermissions: CAREER_PERMISSIONS,
  },
  {
    path: "/content/careers/create",
    element: CareerCreatePage,
    allowRoles: CONTENT_ACCESS_ROLES.CAREERS_MANAGEMENT,
    allowPermissions: CAREER_PERMISSIONS,
  },
  {
    path: "/content/careers/:id/edit",
    element: CareerEditPage,
    allowRoles: CONTENT_ACCESS_ROLES.CAREERS_MANAGEMENT,
    allowPermissions: CAREER_PERMISSIONS,
  },
];
