import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGetAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { useSignOut } from "@/features/auth/hooks";
import { Header } from "./header";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

export const Layout = () => {
  const { isLoading, currentUser } = useGetAuth();
  const { handleSignOut } = useSignOut();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const handleMobileSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleDesktopToggle = () => {
    setIsDesktopCollapsed((prev) => !prev);
  };

  return (
    <Fragment>
      <Sidebar
        currentUser={currentUser}
        isCollapsed={isDesktopCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={handleMobileSidebarClose}
      />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          isDesktopCollapsed ? "lg:pl-20" : "lg:pl-64",
        )}
      >
        <Header
          isLoading={isLoading}
          currentUser={currentUser}
          onSignOut={handleSignOut}
          onMobileMenuToggle={handleMobileMenuToggle}
          onDesktopMenuToggle={handleDesktopToggle}
        />

        <main className="flex-1 bg-gray-50">
          <div className="container py-6">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </Fragment>
  );
};
