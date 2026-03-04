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
