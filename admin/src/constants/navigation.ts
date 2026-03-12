import type { IconType } from "react-icons";
import {
  LuBell,
  LuBriefcase,
  LuGavel,
  LuHeadphones,
  LuImage,
  LuKey,
  LuMapPin,
  LuNetwork,
  LuNewspaper,
  LuPackageSearch,
  LuPlane,
  LuPlaneTakeoff,
  LuRailSymbol,
  LuRoute,
  LuSettings,
  LuShield,
  LuUsers,
} from "react-icons/lu";
import {
  CONTENT_ACCESS_ROLES,
  FLIGHT_ACCESS_ROLES,
  SETTINGS_ACCESS_ROLES,
  SUPPORT_ACCESS_ROLES,
} from "@/constants";
import { UserRole } from "@/types";
import { PermissionSlug } from "@/types/enum.type";

export interface INavigationItem {
  name: string;
  path: string;
  icon?: IconType;
  allowRoles?: UserRole[];
  allowPermissions?: PermissionSlug[];
}

export interface INavigationGroup {
  groupName: string;
  icon: IconType;
  items: INavigationItem[];
  allowRoles?: UserRole[];
}

export const NAVIGATION_GROUPS: INavigationGroup[] = [
  {
    groupName: "Flight Management",
    icon: LuPlane,
    allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
    items: [
      {
        name: "Airlines",
        path: "/flights/airlines",
        icon: LuPlaneTakeoff,
        allowRoles: FLIGHT_ACCESS_ROLES.AIRLINE_MANAGEMENT,
        allowPermissions: [
          PermissionSlug.AIRLINE_READ,
          PermissionSlug.AIRLINE_CREATE,
          PermissionSlug.AIRLINE_UPDATE,
          PermissionSlug.AIRLINE_DELETE,
        ],
      },
      {
        name: "Airports",
        path: "/flights/airports",
        icon: LuMapPin,
        allowRoles: FLIGHT_ACCESS_ROLES.AIRPORT_MANAGEMENT,
        allowPermissions: [
          PermissionSlug.AIRPORT_READ,
          PermissionSlug.AIRPORT_CREATE,
          PermissionSlug.AIRPORT_UPDATE,
          PermissionSlug.AIRPORT_DELETE,
        ],
      },
      {
        name: "Counters",
        path: "/flights/counters",
        icon: LuNetwork,
        allowRoles: FLIGHT_ACCESS_ROLES.COUNTER_MANAGEMENT,
        allowPermissions: [
          PermissionSlug.COUNTER_READ,
          PermissionSlug.COUNTER_CREATE,
          PermissionSlug.COUNTER_UPDATE,
          PermissionSlug.COUNTER_DELETE,
        ],
      },
      {
        name: "Routes",
        path: "/flights/routes",
        icon: LuRoute,
        allowRoles: FLIGHT_ACCESS_ROLES.ROUTE_MANAGEMENT,
        allowPermissions: [
          PermissionSlug.ROUTE_READ,
          PermissionSlug.ROUTE_CREATE,
          PermissionSlug.ROUTE_UPDATE,
          PermissionSlug.ROUTE_DELETE,
        ],
      },
      {
        name: "Flights",
        path: "/flights",
        icon: LuRailSymbol,
        allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
        allowPermissions: [
          PermissionSlug.FLIGHT_READ,
          PermissionSlug.FLIGHT_CREATE,
          PermissionSlug.FLIGHT_UPDATE,
          PermissionSlug.FLIGHT_DELETE,
        ],
      },
    ],
  },
  {
    groupName: "Content",
    icon: LuNewspaper,
    allowRoles: [
      ...new Set([
        ...CONTENT_ACCESS_ROLES.NEWS_MANAGEMENT,
        ...CONTENT_ACCESS_ROLES.NOTICE_MANAGEMENT,
        ...CONTENT_ACCESS_ROLES.BANNER_MANAGEMENT,
        ...CONTENT_ACCESS_ROLES.AUCTION_MANAGEMENT,
        ...CONTENT_ACCESS_ROLES.CAREERS_MANAGEMENT,
        ...CONTENT_ACCESS_ROLES.BIDDING_MANAGEMENT,
      ]),
    ],
    items: [
      {
        name: "News",
        path: "/content/news",
        icon: LuNewspaper,
        allowRoles: CONTENT_ACCESS_ROLES.NEWS_MANAGEMENT,
        allowPermissions: [
          PermissionSlug.NEWS_READ,
          PermissionSlug.NEWS_CREATE,
          PermissionSlug.NEWS_UPDATE,
          PermissionSlug.NEWS_DELETE,
        ],
      },
      {
        name: "Notices",
        path: "/content/notices",
        icon: LuBell,
        allowRoles: CONTENT_ACCESS_ROLES.NOTICE_MANAGEMENT,
        allowPermissions: [
          PermissionSlug.NOTICE_READ,
          PermissionSlug.NOTICE_CREATE,
          PermissionSlug.NOTICE_UPDATE,
          PermissionSlug.NOTICE_DELETE,
        ],
      },
      {
        name: "Banners",
        path: "/content/banners",
        icon: LuImage,
        allowRoles: CONTENT_ACCESS_ROLES.BANNER_MANAGEMENT,
        allowPermissions: [
          PermissionSlug.BANNER_READ,
          PermissionSlug.BANNER_CREATE,
          PermissionSlug.BANNER_UPDATE,
          PermissionSlug.BANNER_DELETE,
        ],
      },
      {
        name: "Auctions",
        path: "/content/auctions",
        icon: LuGavel,
        allowRoles: CONTENT_ACCESS_ROLES.AUCTION_MANAGEMENT,
        allowPermissions: [
          PermissionSlug.AUCTION_READ,
          PermissionSlug.AUCTION_CREATE,
          PermissionSlug.AUCTION_UPDATE,
          PermissionSlug.AUCTION_DELETE,
        ],
      },
      {
        // ADMIN_ROLES only — no STAFF access, no permissions needed
        name: "Careers",
        path: "/content/careers",
        icon: LuBriefcase,
        allowRoles: CONTENT_ACCESS_ROLES.CAREERS_MANAGEMENT,
      },
    ],
  },
  {
    groupName: "Support",
    icon: LuHeadphones,
    allowRoles: SUPPORT_ACCESS_ROLES.FULL_ACCESS,
    items: [
      {
        name: "Lost & Found",
        path: "/support/lost-found",
        icon: LuPackageSearch,
        allowRoles: SUPPORT_ACCESS_ROLES.LOST_FOUND_MANAGEMENT,
        allowPermissions: [
          PermissionSlug.LOST_FOUND_READ,
          PermissionSlug.LOST_FOUND_CREATE,
          PermissionSlug.LOST_FOUND_UPDATE,
          PermissionSlug.LOST_FOUND_DELETE,
        ],
      },
    ],
  },
  {
    // ADMIN_ROLES only — no STAFF access, no permissions needed
    groupName: "Settings",
    icon: LuSettings,
    allowRoles: SETTINGS_ACCESS_ROLES.SYSTEM_SETTINGS,
    items: [
      {
        name: "Roles",
        path: "/settings/roles",
        icon: LuShield,
        allowRoles: SETTINGS_ACCESS_ROLES.ROLE_MANAGEMENT,
      },
      {
        name: "Users",
        path: "/settings/users",
        icon: LuUsers,
        allowRoles: SETTINGS_ACCESS_ROLES.USER_MANAGEMENT,
      },
      {
        name: "Permissions",
        path: "/settings/permissions",
        icon: LuKey,
        allowRoles: SETTINGS_ACCESS_ROLES.PERMISSION_MANAGEMENT,
      },
    ],
  },
];

export const SIDEBAR_WIDTH = {
  EXPANDED: "w-64",
  COLLAPSED: "w-20",
};

// Helper function to check if a group has any active items
export const isGroupActive = (
  items: INavigationItem[],
  currentPath: string,
): boolean => {
  return items.some((item) => currentPath.startsWith(item.path));
};

// Helper function to check if user has access to a navigation item
export const hasAccessToItem = (
  allowRoles: UserRole[] | undefined,
  userRoles: UserRole[] | undefined,
  allowPermissions?: PermissionSlug[],
  userPermissions?: string[],
): boolean => {
  // Role check
  if (!allowRoles || allowRoles.length === 0) return true;
  if (!userRoles || userRoles.length === 0) return false;
  if (!allowRoles.some((role) => userRoles.includes(role))) return false;

  // No permissions defined for this item — role check is sufficient
  if (!allowPermissions || allowPermissions.length === 0) return true;

  // ADMIN / SUPER_ADMIN bypass permission check
  if (
    userRoles.includes(UserRole.ADMIN) ||
    userRoles.includes(UserRole.SUPER_ADMIN)
  )
    return true;

  // STAFF must have at least one matching permission
  if (!userPermissions || userPermissions.length === 0) return false;
  return allowPermissions.some((slug) => userPermissions.includes(slug));
};

// Helper function to filter navigation groups based on user roles and permissions
export const getFilteredNavigationGroups = (
  userRoles: UserRole[] | undefined,
  userPermissions?: string[],
): INavigationGroup[] => {
  return NAVIGATION_GROUPS.filter((group) => {
    // Check if user has access to the group (role-only check at group level)
    if (!hasAccessToItem(group.allowRoles, userRoles)) return false;

    // Filter items within the group (role + permission check)
    const accessibleItems = group.items.filter((item) =>
      hasAccessToItem(
        item.allowRoles,
        userRoles,
        item.allowPermissions,
        userPermissions,
      ),
    );

    // Only include group if it has at least one accessible item
    return accessibleItems.length > 0;
  }).map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      hasAccessToItem(
        item.allowRoles,
        userRoles,
        item.allowPermissions,
        userPermissions,
      ),
    ),
  }));
};
