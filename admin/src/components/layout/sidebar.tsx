import { Fragment, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MdChevronRight, MdClose } from "react-icons/md";
import {
  getFilteredNavigationGroups,
  isGroupActive,
  SIDEBAR_WIDTH,
} from "@/constants";
import { cn } from "@/lib/utils";
import { type ICurrentUser } from "@/types";
import logo from "@/assets/images/bkia-logo.png";

interface SidebarProps {
  currentUser: ICurrentUser | null;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  isCollapsed,
  isMobileOpen,
  onMobileClose,
}) => {
  const location = useLocation();

  const currentUserRoles = useMemo(
    () => currentUser?.user.roles.map((r) => r.role),
    [currentUser?.user.roles],
  );

  // Get filtered navigation groups based on user roles
  const navigationGroups = useMemo(
    () => getFilteredNavigationGroups(currentUserRoles),
    [currentUserRoles],
  );

  // Collect all navigation paths for best match calculation
  const allNavPaths = useMemo(() => {
    return navigationGroups.flatMap((group) =>
      group.items.map((item) => item.path),
    );
  }, [navigationGroups]);

  // Find the best matching path for current location
  const bestMatchPath = useMemo(() => {
    const currentPath = location.pathname;

    // Filter paths that match current location
    const matches = allNavPaths.filter((path) => {
      if (path === currentPath) return true;

      if (path !== "/" && currentPath.startsWith(path)) {
        const nextChar = currentPath[path.length];
        return nextChar === undefined || nextChar === "/";
      }

      return false;
    });

    if (matches.length === 0) return null;

    // Return the longest (most specific) match
    return matches.reduce((best, current) =>
      current.length > best.length ? current : best,
    );
  }, [location.pathname, allNavPaths]);

  const isActiveLink = useCallback(
    (path: string) => path === bestMatchPath,
    [bestMatchPath],
  );

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center px-4">
        {/* Collapsed State */}
        {isCollapsed ? (
          <Link to="/home" className="flex w-full items-center justify-center">
            <img
              src={logo}
              alt="BKIA Logo"
              className="h-10 w-10 object-contain"
            />
          </Link>
        ) : (
          <Link to="/home" className="flex items-center gap-3">
            <img
              src={logo}
              alt="BKIA Logo"
              className="hidden h-10 w-10 flex-shrink-0 object-contain lg:block"
            />
            <div className="flex flex-col">
              <span className="text-primary-600 text-lg leading-tight font-bold">
                Website
              </span>
              <span className="truncate text-xs leading-tight tracking-tight text-gray-500">
                Content Management System
              </span>
            </div>
          </Link>
        )}

        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="ml-auto rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
          aria-label="Close menu"
        >
          <MdClose className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
        {navigationGroups.map((group, groupIndex) => {
          const groupIsActive = isGroupActive(group.items, location.pathname);

          return (
            <Disclosure
              key={groupIndex}
              defaultOpen={!isCollapsed || groupIsActive}
            >
              {({ open }) => (
                <div className="space-y-1">
                  <DisclosureButton
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5",
                      "text-sm font-medium transition-all duration-200",
                      groupIsActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-700 hover:bg-gray-100",
                      open && !groupIsActive && "bg-gray-50",
                    )}
                    disabled={isCollapsed}
                  >
                    <div className="flex items-center gap-3">
                      <group.icon
                        className={cn(
                          "h-5 w-5 flex-shrink-0",
                          groupIsActive ? "text-primary-600" : "text-gray-500",
                        )}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{group.groupName}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <MdChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          groupIsActive ? "text-primary-600" : "text-gray-500",
                          open && "rotate-90",
                        )}
                      />
                    )}
                  </DisclosureButton>

                  {!isCollapsed && (
                    <DisclosurePanel
                      transition
                      className={cn(
                        "origin-top transition duration-200 ease-out",
                        "data-[closed]:-translate-y-2 data-[closed]:opacity-0",
                      )}
                    >
                      <div className="ml-4 space-y-1">
                        {group.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.path}
                            onClick={onMobileClose}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2",
                              "text-sm transition-all duration-200",
                              isActiveLink(item.path)
                                ? "bg-primary-100 text-primary-700 font-medium"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                            )}
                          >
                            {item.icon && (
                              <item.icon
                                className={cn(
                                  "h-5 w-5 flex-shrink-0",
                                  isActiveLink(item.path)
                                    ? "text-primary-600"
                                    : "text-gray-500",
                                )}
                              />
                            )}
                            <span className="truncate">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </DisclosurePanel>
                  )}

                  {/* Collapsed state - show items directly */}
                  {isCollapsed && (
                    <div className="space-y-1">
                      {group.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          to={item.path}
                          onClick={onMobileClose}
                          className={cn(
                            "flex items-center justify-center rounded-lg px-3 py-2",
                            "text-sm transition-all duration-200",
                            isActiveLink(item.path)
                              ? "bg-primary-100 text-primary-700"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                          )}
                          title={item.name}
                        >
                          {item.icon && (
                            <item.icon
                              className={cn(
                                "h-5 w-5 flex-shrink-0",
                                isActiveLink(item.path)
                                  ? "text-primary-600"
                                  : "text-gray-500",
                              )}
                            />
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Disclosure>
          );
        })}
      </nav>
    </div>
  );

  return (
    <Fragment>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl",
          "transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r border-gray-200 bg-white lg:block",
          "transition-all duration-300 ease-in-out",
          isCollapsed ? SIDEBAR_WIDTH.COLLAPSED : SIDEBAR_WIDTH.EXPANDED,
        )}
      >
        {sidebarContent}
      </aside>
    </Fragment>
  );
};
