export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN", // Full system access, bypasses checks
  ADMIN = "ADMIN", // Department managers (e.g., IT Head)
  STAFF = "STAFF", // General employees (e.g., Airport Staff)
}

export enum UserStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  LOCKED = 'Locked',
  CLOSED = 'Closed'
}

export enum RouteType {
  INT = 'INT',
  DOM = 'DOM'
}

export enum Terminal {
  INT = 'A',
  DOM = 'B'
}

export enum FlightType {
  COMMERCIAL = 'COMMERCIAL',
  CHARTER = 'CHARTER',
  CARGO = 'CARGO',
  PRIVATE = 'PRIVATE',
  VIP = 'VIP'
}

export enum FlightDirection {
  ARRIVAL = 'arrival',
  DEPARTURE = 'departure'
}

export enum FlightStatus {
  SCHEDULED = 'SCHEDULED',
  DELAYED = 'DELAYED',
  BOARDING = 'BOARDING',
  DEPARTED = 'DEPARTED',
  ARRIVED = 'ARRIVED',
  CANCELED = 'CANCELED',
  DIVERTED = 'DIVERTED'
}

export enum LostFoundType {
  LOST = 'LOST',
  FOUND = 'FOUND',
}

export enum LostFoundStatus {
  OPEN = 'OPEN',
  MATCHED = 'MATCHED',
  RETURNED = 'RETURNED',
  DONATED = 'DONATED',
  DISPOSED = 'DISPOSED',
}

export enum LostFoundCategory {
  ELECTRONICS = 'ELECTRONICS',
  BAGGAGE = 'BAGGAGE',
  CLOTHING = 'CLOTHING',
  DOCUMENTS = 'DOCUMENTS',
  JEWELRY = 'JEWELRY',
  KEYS = 'KEYS',
  CASH = 'CASH',
  TOYS = 'TOYS',
  OTHER = 'OTHER',
}

export enum LostFoundVisibility {
  PENDING_REVIEW = 'PENDING_REVIEW',
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
}

export enum ClaimStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export enum ImportantPriority {
  URGENT = 'URGENT',
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
}

export enum NewsCategory {
  AIRPORT_UPDATE = 'AIRPORT_UPDATE',
  FLIGHT_SERVICE = 'FLIGHT_SERVICE',
  EVENT = 'EVENT',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  SUSTAINABILITY = 'SUSTAINABILITY',
  TECHNOLOGY = 'TECHNOLOGY',
  COMMUNITY = 'COMMUNITY',
}

export enum PermissionSlug {
  // Airline
  AIRLINE_READ = 'airline:read',
  AIRLINE_CREATE = 'airline:create',
  AIRLINE_UPDATE = 'airline:update',
  AIRLINE_DELETE = 'airline:delete',
  // Airport
  AIRPORT_READ = 'airport:read',
  AIRPORT_CREATE = 'airport:create',
  AIRPORT_UPDATE = 'airport:update',
  AIRPORT_DELETE = 'airport:delete',
  // Counter
  COUNTER_READ = 'counter:read',
  COUNTER_CREATE = 'counter:create',
  COUNTER_UPDATE = 'counter:update',
  COUNTER_DELETE = 'counter:delete',
  // Route
  ROUTE_READ = 'route:read',
  ROUTE_CREATE = 'route:create',
  ROUTE_UPDATE = 'route:update',
  ROUTE_DELETE = 'route:delete',
  // Flight
  FLIGHT_READ = 'flight:read',
  FLIGHT_CREATE = 'flight:create',
  FLIGHT_UPDATE = 'flight:update',
  FLIGHT_DELETE = 'flight:delete',
  // Lost & Found
  LOST_FOUND_READ = 'lost-found:read',
  LOST_FOUND_CREATE = 'lost-found:create',
  LOST_FOUND_UPDATE = 'lost-found:update',
  LOST_FOUND_DELETE = 'lost-found:delete',
  // News
  NEWS_READ = 'news:read',
  NEWS_CREATE = 'news:create',
  NEWS_UPDATE = 'news:update',
  NEWS_DELETE = 'news:delete',
  // Notice
  NOTICE_READ = 'notice:read',
  NOTICE_CREATE = 'notice:create',
  NOTICE_UPDATE = 'notice:update',
  NOTICE_DELETE = 'notice:delete',
  // Banner
  BANNER_READ = 'banner:read',
  BANNER_CREATE = 'banner:create',
  BANNER_UPDATE = 'banner:update',
  BANNER_DELETE = 'banner:delete',
  // Auction
  AUCTION_READ = 'auction:read',
  AUCTION_CREATE = 'auction:create',
  AUCTION_UPDATE = 'auction:update',
  AUCTION_DELETE = 'auction:delete',
}

export enum AuctionCategory {
  EQUIPMENT = 'EQUIPMENT',
  CONSTRUCTION = 'CONSTRUCTION',
  SERVICE = 'SERVICE',
  IT = 'IT',
  CONSULTING = 'CONSULTING',
  MAINTENANCE = 'MAINTENANCE',
  OTHER = 'OTHER',
}

export enum AuctionStatus {
  UPCOMING = 'UPCOMING',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}
