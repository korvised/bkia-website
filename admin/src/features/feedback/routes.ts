import type { IRoute } from "@/types";
import { SUPPORT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types/enum.type";
import { FeedbackPage, FeedbackDetailPage } from "@/features/feedback/pages";

const FEEDBACK_PERMISSIONS = [
  PermissionSlug.FEEDBACK_READ,
  PermissionSlug.FEEDBACK_CREATE,
  PermissionSlug.FEEDBACK_UPDATE,
  PermissionSlug.FEEDBACK_DELETE,
];

export const feedbackRoutes: IRoute[] = [
  {
    path: "/support/feedback",
    element: FeedbackPage,
    allowRoles: SUPPORT_ACCESS_ROLES.FEEDBACK_MANAGEMENT,
    allowPermissions: FEEDBACK_PERMISSIONS,
  },
  {
    path: "/support/feedback/:id",
    element: FeedbackDetailPage,
    allowRoles: SUPPORT_ACCESS_ROLES.FEEDBACK_MANAGEMENT,
    allowPermissions: FEEDBACK_PERMISSIONS,
  },
];
