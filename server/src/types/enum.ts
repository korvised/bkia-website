export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN', // Full system access, bypasses checks
  ADMIN = 'ADMIN', // Department managers (e.g., IT Head)
  STAFF = 'STAFF', // General employees (e.g., Airport Staff)
}

export enum UserStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  LOCKED = 'Locked',
  CLOSED = 'Closed',
}

export enum RouteType {
  INT = 'INT',
  DOM = 'DOM',
}

export enum Terminal {
  INT = 'A',
  DOM = 'B',
}

export enum FlightType {
  COMMERCIAL = 'COMMERCIAL',
  CHARTER = 'CHARTER',
  CARGO = 'CARGO',
  PRIVATE = 'PRIVATE',
  VIP = 'VIP',
}

export enum FlightDirection {
  ARRIVAL = 'arrival',
  DEPARTURE = 'departure',
}

export enum FlightStatus {
  SCHEDULED = 'SCHEDULED',
  DELAYED = 'DELAYED',
  BOARDING = 'BOARDING',
  DEPARTED = 'DEPARTED',
  ARRIVED = 'ARRIVED',
  CANCELED = 'CANCELED',
  DIVERTED = 'DIVERTED',
}

export enum ImportantPriority {
  URGENT = 'URGENT',
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
}

export enum NewsCategory {
  AIRPORT_UPDATE = 'AIRPORT_UPDATE', // Terminal renovations, new facilities
  FLIGHT_SERVICE = 'FLIGHT_SERVICE', // New routes, airline partnerships
  EVENT = 'EVENT', // Airport events, ceremonies
  ANNOUNCEMENT = 'ANNOUNCEMENT', // General announcements
  SUSTAINABILITY = 'SUSTAINABILITY', // Environmental initiatives
  TECHNOLOGY = 'TECHNOLOGY', // New tech implementations
  COMMUNITY = 'COMMUNITY', // Community programs, CSR
}

export enum LostFoundType {
  LOST = 'LOST', // passenger reporting lost item
  FOUND = 'FOUND', // staff/passenger reporting found item
}

export enum LostFoundStatus {
  OPEN = 'OPEN', // active, not resolved
  MATCHED = 'MATCHED', // potential match found
  RETURNED = 'RETURNED', // item returned to owner
  DONATED = 'DONATED', // unclaimed, donated
  DISPOSED = 'DISPOSED', // unclaimed, disposed
}

export enum LostFoundCategory {
  ELECTRONICS = 'ELECTRONICS', // phones, laptops, tablets
  BAGGAGE = 'BAGGAGE', // bags, suitcases
  CLOTHING = 'CLOTHING', // jackets, hats
  DOCUMENTS = 'DOCUMENTS', // passports, IDs, tickets
  JEWELRY = 'JEWELRY',
  KEYS = 'KEYS',
  CASH = 'CASH',
  TOYS = 'TOYS',
  OTHER = 'OTHER',
}

export enum LostFoundVisibility {
  PENDING_REVIEW = 'PENDING_REVIEW', // default, hidden from public until staff approves
  VISIBLE = 'VISIBLE', // approved, shown on public website
  HIDDEN = 'HIDDEN', // staff manually hid (spam, fake, inappropriate)
}

export enum ClaimStatus {
  PENDING = 'PENDING', // submitted, waiting staff review
  APPROVED = 'APPROVED', // staff approved, arrange pickup/delivery
  REJECTED = 'REJECTED', // staff rejected (wrong person)
  COMPLETED = 'COMPLETED', // physically returned to claimant
}

export enum PermissionSlug {
  // Flight
  FLIGHT_READ = 'flight:read',
  FLIGHT_CREATE = 'flight:create',
  FLIGHT_UPDATE = 'flight:update',
  FLIGHT_DELETE = 'flight:delete',

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

  // Lost & Found
  LOST_FOUND_READ = 'lost-found:read',
  LOST_FOUND_CREATE = 'lost-found:create',
  LOST_FOUND_UPDATE = 'lost-found:update',
  LOST_FOUND_DELETE = 'lost-found:delete',

  // User
  USER_READ = 'user:read',
  USER_CREATE = 'user:create',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

  // Role
  ROLE_READ = 'role:read',
  ROLE_CREATE = 'role:create',
  ROLE_UPDATE = 'role:update',
  ROLE_DELETE = 'role:delete',

  // Permission
  PERMISSION_READ = 'permission:read',
  PERMISSION_CREATE = 'permission:create',
  PERMISSION_UPDATE = 'permission:update',
  PERMISSION_DELETE = 'permission:delete',

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

  // Feedback
  FEEDBACK_READ = 'feedback:read',
  FEEDBACK_CREATE = 'feedback:create',
  FEEDBACK_UPDATE = 'feedback:update',
  FEEDBACK_DELETE = 'feedback:delete',

  // Career
  CAREER_READ = 'career:read',
  CAREER_CREATE = 'career:create',
  CAREER_UPDATE = 'career:update',
  CAREER_DELETE = 'career:delete',
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

export enum FeedbackCategory {
  CLEANLINESS = 'CLEANLINESS',
  SECURITY = 'SECURITY',
  WIFI = 'WIFI',
  FOOD_BEVERAGE = 'FOOD_BEVERAGE',
  STAFF_SERVICE = 'STAFF_SERVICE',
  FACILITIES = 'FACILITIES',
  OTHER = 'OTHER',
}

export enum FeedbackStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}
