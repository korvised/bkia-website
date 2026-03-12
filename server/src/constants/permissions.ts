export const PERMISSIONS = {
  AIRLINE: {
    READ: 'airline:read',
    CREATE: 'airline:create',
    UPDATE: 'airline:update',
    DELETE: 'airline:delete',
  },
  AIRPORT: {
    READ: 'airport:read',
    CREATE: 'airport:create',
    UPDATE: 'airport:update',
    DELETE: 'airport:delete',
  },
  COUNTER: {
    READ: 'counter:read',
    CREATE: 'counter:create',
    UPDATE: 'counter:update',
    DELETE: 'counter:delete',
  },
  ROUTE: {
    READ: 'route:read',
    CREATE: 'route:create',
    UPDATE: 'route:update',
    DELETE: 'route:delete',
  },
  FLIGHT: {
    READ: 'flight:read',
    CREATE: 'flight:create',
    UPDATE: 'flight:update',
    DELETE: 'flight:delete',
  },
  LOST_FOUND: {
    READ: 'lost-found:read',
    CREATE: 'lost-found:create',
    UPDATE: 'lost-found:update',
    DELETE: 'lost-found:delete',
  },
  NEWS: {
    READ: 'news:read',
    CREATE: 'news:create',
    UPDATE: 'news:update',
    DELETE: 'news:delete',
  },
  NOTICE: {
    READ: 'notice:read',
    CREATE: 'notice:create',
    UPDATE: 'notice:update',
    DELETE: 'notice:delete',
  },
  BANNER: {
    READ: 'banner:read',
    CREATE: 'banner:create',
    UPDATE: 'banner:update',
    DELETE: 'banner:delete',
  },
  AUCTION: {
    READ: 'auction:read',
    CREATE: 'auction:create',
    UPDATE: 'auction:update',
    DELETE: 'auction:delete',
  },
  FEEDBACK: {
    READ: 'feedback:read',
    CREATE: 'feedback:create',
    UPDATE: 'feedback:update',
    DELETE: 'feedback:delete',
  },
} as const;

// This type allows you to use the values in your code safely
export type PermissionType =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS][keyof (typeof PERMISSIONS)[keyof typeof PERMISSIONS]];
