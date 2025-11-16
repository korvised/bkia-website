import { UserRole } from "@/types";

/**
 * Flight Management Access Control
 */
export const FLIGHT_ACCESS_ROLES = {
  // Full flight management access
  FULL_ACCESS: [UserRole.ADMIN, UserRole.MANAGER],

  // Flight operations and monitoring
  FLIGHT_OPERATIONS: [
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.AIR_TRAFFIC,
    UserRole.RAMP,
    UserRole.PASSENGER,
  ],

  // Airline management
  AIRLINE_MANAGEMENT: [UserRole.ADMIN, UserRole.MANAGER, UserRole.AIR_TRAFFIC],

  // Airport management
  AIRPORT_MANAGEMENT: [UserRole.ADMIN, UserRole.MANAGER, UserRole.AIR_TRAFFIC],

  // Counter management
  COUNTER_MANAGEMENT: [UserRole.ADMIN, UserRole.MANAGER, UserRole.PASSENGER],

  // Route management
  ROUTE_MANAGEMENT: [UserRole.ADMIN, UserRole.MANAGER, UserRole.AIR_TRAFFIC],

  // Ramp operations
  RAMP_OPERATIONS: [UserRole.ADMIN, UserRole.MANAGER, UserRole.RAMP],
};

/**
 * Content Management Access Control
 */
export const CONTENT_ACCESS_ROLES = {
  // Full content management
  FULL_ACCESS: [UserRole.ADMIN, UserRole.MANAGER],

  // News and notices
  NEWS_MANAGEMENT: [UserRole.ADMIN, UserRole.MANAGER, UserRole.INFORMATION],

  // Careers management
  CAREERS_MANAGEMENT: [UserRole.ADMIN, UserRole.MANAGER, UserRole.HR],

  // Bidding management
  BIDDING_MANAGEMENT: [UserRole.ADMIN, UserRole.MANAGER, UserRole.FINANCE],
};

/**
 * Settings Access Control
 */
export const SETTINGS_ACCESS_ROLES = {
  // System settings
  SYSTEM_SETTINGS: [UserRole.ADMIN],

  // Role management
  ROLE_MANAGEMENT: [UserRole.ADMIN],

  // User management
  USER_MANAGEMENT: [UserRole.ADMIN],
};
