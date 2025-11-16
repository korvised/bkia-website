import {
  LuBell,
  LuBriefcase,
  LuFileText,
  LuMapPin,
  LuNetwork,
  LuNewspaper,
  LuPlane,
  LuPlaneTakeoff,
  LuRoute,
  LuSettings,
  LuShield,
  LuUsers,
} from "react-icons/lu";

export interface INavigationItem {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface INavigationGroup {
  groupName: string;
  icon: React.ComponentType<{ className?: string }>;
  items: INavigationItem[];
}

export const NAVIGATION_GROUPS: INavigationGroup[] = [
  {
    groupName: "Flight Management",
    icon: LuPlane,
    items: [
      {
        name: "Airlines",
        path: "/flights/airlines",
        icon: LuPlaneTakeoff,
      },
      {
        name: "Airports",
        path: "/flights/airports",
        icon: LuMapPin,
      },
      {
        name: "Counters",
        path: "/flights/counters",
        icon: LuNetwork,
      },
      {
        name: "Routes",
        path: "/flights/routes",
        icon: LuRoute,
      },
      {
        name: "Flights",
        path: "/flights/list",
        icon: LuPlane,
      },
    ],
  },
  {
    groupName: "Content",
    icon: LuNewspaper,
    items: [
      {
        name: "News",
        path: "/content/news",
        icon: LuNewspaper,
      },
      {
        name: "Notices",
        path: "/content/notices",
        icon: LuBell,
      },
      {
        name: "Careers",
        path: "/content/careers",
        icon: LuBriefcase,
      },
      {
        name: "Bidding",
        path: "/content/bidding",
        icon: LuFileText,
      },
    ],
  },
  {
    groupName: "Settings",
    icon: LuSettings,
    items: [
      {
        name: "Roles",
        path: "/settings/roles",
        icon: LuShield,
      },
      {
        name: "Users",
        path: "/settings/users",
        icon: LuUsers,
      },
    ],
  },
];

export const SIDEBAR_WIDTH = {
  EXPANDED: "w-64",
  COLLAPSED: "w-20",
};
