import type { IconType } from "react-icons";
import {
  LuBell,
  LuBriefcase,
  LuFileText,
  LuMapPin,
  LuNetwork,
  LuNewspaper,
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
} from "@/constants";
import { UserRole } from "@/types";

export interface INavigationItem {
  name: string;
  path: string;
  icon?: IconType;
  allowRoles?: UserRole[];
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
      },
      {
        name: "Airports",
        path: "/flights/airports",
        icon: LuMapPin,
        allowRoles: FLIGHT_ACCESS_ROLES.AIRPORT_MANAGEMENT,
      },
      {
        name: "Counters",
        path: "/flights/counters",
        icon: LuNetwork,
        allowRoles: FLIGHT_ACCESS_ROLES.COUNTER_MANAGEMENT,
      },
      {
        name: "Routes",
        path: "/flights/routes",
        icon: LuRoute,
        allowRoles: FLIGHT_ACCESS_ROLES.ROUTE_MANAGEMENT,
      },
      {
        name: "Flights",
        path: "/flights",
        icon: LuRailSymbol,
        allowRoles: FLIGHT_ACCESS_ROLES.FLIGHT_OPERATIONS,
      },
    ],
  },
  {
    groupName: "Content",
    icon: LuNewspaper,
    allowRoles: [
      ...new Set([
        ...CONTENT_ACCESS_ROLES.NEWS_MANAGEMENT,
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
      },
      {
        name: "Notices",
        path: "/content/notices",
        icon: LuBell,
        allowRoles: CONTENT_ACCESS_ROLES.NEWS_MANAGEMENT,
      },
      {
        name: "Careers",
        path: "/content/careers",
        icon: LuBriefcase,
        allowRoles: CONTENT_ACCESS_ROLES.CAREERS_MANAGEMENT,
      },
      {
        name: "Bidding",
        path: "/content/bidding",
        icon: LuFileText,
        allowRoles: CONTENT_ACCESS_ROLES.BIDDING_MANAGEMENT,
      },
    ],
  },
  {
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
): boolean => {
  if (!allowRoles || allowRoles.length === 0) return true;
  if (!userRoles || userRoles.length === 0) return false;
  return allowRoles.some((role) => userRoles.includes(role));
};

// Helper function to filter navigation groups based on user role
export const getFilteredNavigationGroups = (
  userRoles: UserRole[] | undefined,
): INavigationGroup[] => {
  return NAVIGATION_GROUPS.filter((group) => {
    // Check if user has access to the group
    if (!hasAccessToItem(group.allowRoles, userRoles)) return false;

    // Filter items within the group
    const accessibleItems = group.items.filter((item) =>
      hasAccessToItem(item.allowRoles, userRoles),
    );

    // Only include group if it has at least one accessible item
    return accessibleItems.length > 0;
  }).map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      hasAccessToItem(item.allowRoles, userRoles),
    ),
  }));
};
