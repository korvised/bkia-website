import { CONTENT_ACCESS_ROLES } from "@/constants";
import { PermissionSlug } from "@/types/enum.type";
import { AuctionListPage, AuctionCreatePage, AuctionEditPage } from "./pages";

const AUCTION_PERMISSIONS = [
  PermissionSlug.AUCTION_READ,
  PermissionSlug.AUCTION_CREATE,
  PermissionSlug.AUCTION_UPDATE,
  PermissionSlug.AUCTION_DELETE,
];

export const auctionRoutes = [
  {
    path: "/content/auctions",
    element: AuctionListPage,
    allowRoles: CONTENT_ACCESS_ROLES.AUCTION_MANAGEMENT,
    allowPermissions: AUCTION_PERMISSIONS,
  },
  {
    path: "/content/auctions/create",
    element: AuctionCreatePage,
    allowRoles: CONTENT_ACCESS_ROLES.AUCTION_MANAGEMENT,
    allowPermissions: AUCTION_PERMISSIONS,
  },
  {
    path: "/content/auctions/:id/edit",
    element: AuctionEditPage,
    allowRoles: CONTENT_ACCESS_ROLES.AUCTION_MANAGEMENT,
    allowPermissions: AUCTION_PERMISSIONS,
  },
];
