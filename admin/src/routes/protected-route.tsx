import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useGetAuth } from "@/hooks";
import { Loading } from "@/components/layout";
import { UserRole, type PermissionSlug } from "@/types";

interface ProtectedRouteProps {
  allowRoles?: string[];
  allowPermissions?: PermissionSlug[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowRoles,
  allowPermissions,
  children,
}) => {
  const { isInitialized, isLoading, isAuthenticated, currentUser } =
    useGetAuth();

  if (isInitialized && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const user = currentUser?.user;

  if (user) {
    // 1. Role check
    if (allowRoles && allowRoles.length > 0) {
      const hasAllowedRole = user.roles.some((r) => allowRoles.includes(r.role));
      if (!hasAllowedRole) {
        return <Navigate to="/unauthorized" replace />;
      }
    }

    // 2. Permission check — SUPER_ADMIN and ADMIN always pass
    if (allowPermissions && allowPermissions.length > 0) {
      const isAdminOrAbove = user.roles.some(
        (r) => r.role === UserRole.SUPER_ADMIN || r.role === UserRole.ADMIN,
      );

      if (!isAdminOrAbove) {
        const userSlugs = (user.permissions ?? []).map((p) => p.slug);
        const hasPermission = allowPermissions.some((slug) =>
          userSlugs.includes(slug),
        );
        if (!hasPermission) {
          return <Navigate to="/unauthorized" replace />;
        }
      }
    }
  }

  return <Fragment>{children}</Fragment>;
};
