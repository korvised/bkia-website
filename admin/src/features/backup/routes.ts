import type { IRoute } from "@/types";
import { DATABASE_ACCESS_ROLES } from "@/constants";
import { BackupPage, RestorePage } from "@/features/backup/pages";

export const backupRoutes: IRoute[] = [
  {
    path: "/database/backup",
    element: BackupPage,
    allowRoles: DATABASE_ACCESS_ROLES.BACKUP_MANAGEMENT,
  },
  {
    path: "/database/restore",
    element: RestorePage,
    allowRoles: DATABASE_ACCESS_ROLES.RESTORE_MANAGEMENT,
  },
];
