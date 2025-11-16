import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LuMenu, LuUser, LuSettings, LuLogOut } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { CurrentUserService } from "@/services";
import type { ICurrentUser } from "@/types";
import logo from "@/assets/images/bkia-logo.png";

interface HeaderProps {
  isLoading: boolean;
  currentUser: ICurrentUser | null;
  onSignOut: () => void;
  onMobileMenuToggle: () => void;
  onDesktopMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLoading,
  currentUser,
  onSignOut,
  onMobileMenuToggle,
  onDesktopMenuToggle,
}) => {
  // Create service instance and memoize user info
  const userInfo = useMemo(() => {
    if (isLoading || !currentUser) {
      return {
        displayName: "BKIA",
        email: null,
        fullName: null,
        employeeId: null,
        initials: "U",
        profileImageUrl: null,
      };
    }

    const service = new CurrentUserService(currentUser);

    return {
      displayName: service.getDisplayName(),
      email: service.getEmail(),
      fullName: service.getFullName(),
      employeeId: service.getEmployeeId(),
      initials: service.getInitials(),
      profileImageUrl: service.getProfileImageUrl(),
    };
  }, [isLoading, currentUser]);

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
          >
            <LuMenu className="h-6 w-6 text-gray-700" />
          </button>

          {/* Desktop Menu Toggle */}
          <button
            onClick={onDesktopMenuToggle}
            className="hidden rounded-lg p-2 transition-colors hover:bg-gray-100 lg:block"
            aria-label="Toggle sidebar"
          >
            <LuMenu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Logo */}
        <Link to="/home" className="block lg:hidden">
          <img
            src={logo}
            alt="BKIA Logo"
            className="h-10 w-10 flex-shrink-0 object-contain"
          />
        </Link>

        {/* Spacer for desktop */}
        <div className="hidden flex-1 lg:block" />

        {/* User Dropdown */}
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors outline-none hover:bg-gray-100 lg:px-3 lg:py-2">
            {/* Avatar */}
            {isLoading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            ) : userInfo.profileImageUrl ? (
              <img
                src={userInfo.profileImageUrl}
                alt={userInfo.displayName}
                className="ring-primary-100 h-8 w-8 rounded-full object-cover ring-2"
              />
            ) : (
              <div className="bg-primary-100 text-primary-700 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold">
                {userInfo.initials}
              </div>
            )}

            {/* User info - desktop only */}
            <div className="hidden flex-col items-start lg:flex">
              {isLoading ? (
                <Fragment>
                  <span className="inline-block h-3.5 w-24 animate-pulse rounded bg-gray-200" />
                  <span className="mt-1 inline-block h-3 w-32 animate-pulse rounded bg-gray-200" />
                </Fragment>
              ) : (
                <Fragment>
                  <span className="text-sm leading-tight font-medium text-gray-900">
                    {userInfo.displayName}
                  </span>
                  {userInfo.email && (
                    <span className="text-xs leading-tight text-gray-500">
                      {userInfo.email}
                    </span>
                  )}
                </Fragment>
              )}
            </div>
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className={cn(
              "mt-2 w-64 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 outline-none",
              "transition duration-100 ease-out [--anchor-gap:8px]",
              "data-[closed]:scale-95 data-[closed]:opacity-0",
            )}
          >
            {/* User Info Section */}
            {!isLoading && (
              <div className="border-b border-gray-100 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {userInfo.profileImageUrl ? (
                      <img
                        src={userInfo.profileImageUrl}
                        alt={userInfo.displayName}
                        className="ring-primary-100 h-10 w-10 rounded-full object-cover ring-2"
                      />
                    ) : (
                      <div className="bg-primary-100 text-primary-700 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
                        {userInfo.initials}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {userInfo.fullName || userInfo.displayName}
                    </p>
                    {userInfo.employeeId && (
                      <p className="truncate text-xs text-gray-500">
                        ID: {userInfo.employeeId}
                      </p>
                    )}
                    {userInfo.email && (
                      <p className="truncate text-xs text-gray-500">
                        {userInfo.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="p-1">
              <MenuItem>
                {({ focus }) => (
                  <Link
                    to="/profile"
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700",
                      focus && "bg-gray-100",
                    )}
                  >
                    <LuUser className="h-4 w-4 text-gray-500" />
                    <span>My Profile</span>
                  </Link>
                )}
              </MenuItem>

              <MenuItem>
                {({ focus }) => (
                  <Link
                    to="/profile/setting"
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-700",
                      focus && "bg-gray-100",
                    )}
                  >
                    <LuSettings className="h-4 w-4 text-gray-500" />
                    <span>Settings</span>
                  </Link>
                )}
              </MenuItem>

              <div className="my-1 h-px bg-gray-200" />

              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={onSignOut}
                    className={cn(
                      "text-danger-600 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium",
                      focus && "bg-danger-50",
                    )}
                  >
                    <LuLogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};
