import { CONTENT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types/enum.type";
import { NoticeCreatePage, NoticeDetailPage, NoticeEditPage, NoticeListPage } from "./pages";

const NOTICE_PERMISSIONS = [
  PermissionSlug.NOTICE_READ,
  PermissionSlug.NOTICE_CREATE,
  PermissionSlug.NOTICE_UPDATE,
  PermissionSlug.NOTICE_DELETE,
];

export const noticeRoutes = [
  {
    path: "/content/notices",
    element: NoticeListPage,
    allowRoles: CONTENT_ACCESS_ROLES.NOTICE_MANAGEMENT,
    allowPermissions: NOTICE_PERMISSIONS,
  },
  {
    path: "/content/notices/create",
    element: NoticeCreatePage,
    allowRoles: CONTENT_ACCESS_ROLES.NOTICE_MANAGEMENT,
    allowPermissions: NOTICE_PERMISSIONS,
  },
  {
    path: "/content/notices/:id",
    element: NoticeDetailPage,
    allowRoles: CONTENT_ACCESS_ROLES.NOTICE_MANAGEMENT,
    allowPermissions: NOTICE_PERMISSIONS,
  },
  {
    path: "/content/notices/:id/edit",
    element: NoticeEditPage,
    allowRoles: CONTENT_ACCESS_ROLES.NOTICE_MANAGEMENT,
    allowPermissions: NOTICE_PERMISSIONS,
  },
];
