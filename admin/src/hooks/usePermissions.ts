import { useMemo } from "react";
import { useGetAuth } from "@/hooks";
import { UserRole, PermissionSlug } from "@/types/enum.type";

/**
 * Returns a `can(slug)` function to check if the current user
 * has a specific permission.
 *
 * - ADMIN / SUPER_ADMIN always return `true` (bypass all permission checks).
 * - STAFF must have the matching permission slug assigned to their account.
 */
export function usePermissions() {
  const { currentUser } = useGetAuth();

  const userRoles = useMemo(
    () => currentUser?.user.roles?.map((r) => r.role) ?? [],
    [currentUser?.user.roles],
  );

  const userPermissions = useMemo(
    () => currentUser?.user.permissions?.map((p) => p.slug) ?? [],
    [currentUser?.user.permissions],
  );

  const isAdminOrAbove = useMemo(
    () =>
      userRoles.includes(UserRole.ADMIN) ||
      userRoles.includes(UserRole.SUPER_ADMIN),
    [userRoles],
  );

  const can = useMemo(
    () =>
      (slug: PermissionSlug): boolean => {
        if (isAdminOrAbove) return true;
        return userPermissions.includes(slug);
      },
    [isAdminOrAbove, userPermissions],
  );

  return { can };
}
