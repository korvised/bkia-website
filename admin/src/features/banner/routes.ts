import { CONTENT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types/enum.type";
import { BannerListPage, BannerCreatePage, BannerEditPage } from "./pages";

const BANNER_PERMISSIONS = [
  PermissionSlug.BANNER_READ,
  PermissionSlug.BANNER_CREATE,
  PermissionSlug.BANNER_UPDATE,
  PermissionSlug.BANNER_DELETE,
];

export const bannerRoutes = [
  {
    path: "/content/banners",
    element: BannerListPage,
    allowRoles: CONTENT_ACCESS_ROLES.BANNER_MANAGEMENT,
    allowPermissions: BANNER_PERMISSIONS,
  },
  {
    path: "/content/banners/create",
    element: BannerCreatePage,
    allowRoles: CONTENT_ACCESS_ROLES.BANNER_MANAGEMENT,
    allowPermissions: BANNER_PERMISSIONS,
  },
  {
    path: "/content/banners/:id/edit",
    element: BannerEditPage,
    allowRoles: CONTENT_ACCESS_ROLES.BANNER_MANAGEMENT,
    allowPermissions: BANNER_PERMISSIONS,
  },
];
