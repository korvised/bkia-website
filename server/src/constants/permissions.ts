export const PERMISSIONS = {
  AIRLINE: {
    CREATE: 'airline:create',
    UPDATE: 'airline:update',
    DELETE: 'airline:delete',
    VIEW: 'airline:view',
  },
  AIRPORT: {
    CREATE: 'airport:create',
    UPDATE: 'airport:update',
    DELETE: 'airport:delete',
    VIEW: 'airport:view',
  },
  COUNTER: {
    CREATE: 'counter:create',
    UPDATE: 'counter:update',
    DELETE: 'counter:delete',
    VIEW: 'counter:view',
    ASSIGN: 'counter:assign', // Specific to airport counters
  },
  FLIGHT: {
    CREATE: 'flight:create',
    UPDATE: 'flight:update',
    DELETE: 'flight:delete',
    VIEW: 'flight:view',
    UPDATE_STATUS: 'flight:update-status', // e.g., Delayed, Boarding
  },
  LOST_FOUND: {
    CREATE: 'lost-found:create',
    UPDATE: 'lost-found:update',
    RESOLVE: 'lost-found:resolve',
    VIEW: 'lost-found:view',
  },
  NEWS: {
    CREATE: 'news:create',
    UPDATE: 'news:update',
    DELETE: 'news:delete',
    PUBLISH: 'news:publish',
    VIEW: 'news:view',
  },
  NOTICE: {
    CREATE: 'notice:create',
    UPDATE: 'notice:update',
    DELETE: 'notice:delete',
    VIEW: 'notice:view',
  },
} as const;

// This type allows you to use the values in your code safely
export type PermissionType =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS][keyof (typeof PERMISSIONS)[keyof typeof PERMISSIONS]];
