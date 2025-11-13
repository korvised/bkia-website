import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useGetAuth } from "@/hooks";
import { Loading } from "@/components/layout";

interface ProtectedRouteProps {
  allowRoles?: string[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowRoles,
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

  if (allowRoles && allowRoles.length > 0 && currentUser) {
    const hasAllowedRole = currentUser.roles.some((r) =>
      allowRoles.includes(r.role),
    );
    if (!hasAllowedRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Fragment>{children}</Fragment>;
};
