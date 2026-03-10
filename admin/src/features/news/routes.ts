import { CONTENT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types/enum.type";
import { NewsCreatePage, NewsDetailPage, NewsEditPage, NewsListPage } from "./pages";

const NEWS_PERMISSIONS = [
  PermissionSlug.NEWS_READ,
  PermissionSlug.NEWS_CREATE,
  PermissionSlug.NEWS_UPDATE,
  PermissionSlug.NEWS_DELETE,
];

export const newsRoutes = [
  {
    path: "/content/news",
    element: NewsListPage,
    allowRoles: CONTENT_ACCESS_ROLES.NEWS_MANAGEMENT,
    allowPermissions: NEWS_PERMISSIONS,
  },
  {
    path: "/content/news/create",
    element: NewsCreatePage,
    allowRoles: CONTENT_ACCESS_ROLES.NEWS_MANAGEMENT,
    allowPermissions: NEWS_PERMISSIONS,
  },
  {
    path: "/content/news/:id",
    element: NewsDetailPage,
    allowRoles: CONTENT_ACCESS_ROLES.NEWS_MANAGEMENT,
    allowPermissions: NEWS_PERMISSIONS,
  },
  {
    path: "/content/news/:id/edit",
    element: NewsEditPage,
    allowRoles: CONTENT_ACCESS_ROLES.NEWS_MANAGEMENT,
    allowPermissions: NEWS_PERMISSIONS,
  },
];
