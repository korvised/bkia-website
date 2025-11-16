import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MdChevronRight, MdClose } from "react-icons/md";
import { NAVIGATION_GROUPS, SIDEBAR_WIDTH } from "@/constants";
import { cn } from "@/lib/utils";
import { LuMenu } from "react-icons/lu";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  onDesktopToggle: () => void;
  isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  onMobileClose,
  onDesktopToggle,
  isCollapsed,
}) => {
  const location = useLocation();

  const isActiveLink = (path: string) => location.pathname === path;

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-gray-200 px-4">
        {/* Collapsed State */}
        {isCollapsed ? (
          <Link to="/" className="text-primary-600 text-xl font-bold">
            BKIA
          </Link>
        ) : (
          <div className="flex w-full items-center justify-between">
            <Link to="/" className="flex flex-col">
              <span className="text-primary-600 text-lg leading-tight font-bold">
                BKIA
              </span>
              <span className="text-xs leading-tight text-gray-500 truncate">
                Website CMS
              </span>
            </Link>

            <button
              onClick={onDesktopToggle}
              className="hidden rounded-lg p-2 transition-colors hover:bg-gray-100 lg:block"
              aria-label="Toggle sidebar"
            >
              <LuMenu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
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
        {NAVIGATION_GROUPS.map((group, groupIndex) => (
          <Disclosure key={groupIndex} defaultOpen={!isCollapsed}>
            {({ open }) => (
              <div className="space-y-1">
                <DisclosureButton
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5",
                    "text-sm font-medium text-gray-700 hover:bg-gray-100",
                    "transition-all duration-200",
                    open && "bg-gray-50",
                  )}
                  disabled={isCollapsed}
                >
                  <div className="flex items-center gap-3">
                    <group.icon className="h-5 w-5 flex-shrink-0 text-gray-500" />
                    {!isCollapsed && (
                      <span className="truncate">{group.groupName}</span>
                    )}
                  </div>
                  {!isCollapsed && (
                    <MdChevronRight
                      className={cn(
                        "h-4 w-4 text-gray-500 transition-transform duration-200",
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
                              ? "bg-primary-50 text-primary-700 font-medium"
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
                            ? "bg-primary-50 text-primary-700"
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
        ))}
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
