import { UserRole } from "@/types";

/** All authenticated users */
const ALL_ROLES = [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF];

/** Admin-level and above only */
const ADMIN_ROLES = [UserRole.SUPER_ADMIN, UserRole.ADMIN];

/**
 * Flight Management Access Control
 */
export const FLIGHT_ACCESS_ROLES = {
  FULL_ACCESS: ALL_ROLES,
  FLIGHT_OPERATIONS: ALL_ROLES,
  AIRLINE_MANAGEMENT: ALL_ROLES,
  AIRPORT_MANAGEMENT: ALL_ROLES,
  COUNTER_MANAGEMENT: ALL_ROLES,
  ROUTE_MANAGEMENT: ALL_ROLES,
};

/**
 * Content Management Access Control
 */
export const CONTENT_ACCESS_ROLES = {
  FULL_ACCESS: ALL_ROLES,
  NEWS_MANAGEMENT: ALL_ROLES,
  NOTICE_MANAGEMENT: ALL_ROLES,
  CAREERS_MANAGEMENT: ADMIN_ROLES,
  BIDDING_MANAGEMENT: ADMIN_ROLES,
};

/**
 * Support Access Control
 */
export const SUPPORT_ACCESS_ROLES = {
  FULL_ACCESS: ALL_ROLES,
  LOST_FOUND_MANAGEMENT: ALL_ROLES,
};

/**
 * Settings Access Control — Admin & Super Admin only
 */
export const SETTINGS_ACCESS_ROLES = {
  SYSTEM_SETTINGS: ADMIN_ROLES,
  ROLE_MANAGEMENT: ADMIN_ROLES,
  USER_MANAGEMENT: ADMIN_ROLES,
  PERMISSION_MANAGEMENT: ADMIN_ROLES,
};
