export enum UserRole {
  // System-level roles
  ADMIN = "ADMIN", // Full access across all modules
  MANAGER = "MANAGER", // Oversees departments, moderate privileges

  // Departmental roles
  PASSENGER = "PASSENGER", // Ground Handling – Passenger Services
  RAMP = "RAMP", // Ground Handling – Ramp Operations
  CARGO = "CARGO", // Cargo Handling / Freight
  SECURITY = "SECURITY", // Airport Security / Screening
  AIR_TRAFFIC = "AIR_TRAFFIC", // ATC / Flight Coordination
  MAINTENANCE = "MAINTENANCE", // Aircraft Maintenance
  INFORMATION = "INFORMATION", // Information Desk / Support Staff
  FINANCE = "FINANCE", // Accounting / Billing / Payments
  HR = "HR", // Human Resources
}

export enum UserStatus {
  PENDING = "Pending",
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  LOCKED = "Locked",
  CLOSED = "Closed",
}

export enum RouteType {
  INT = "INT",
  DOM = "DOM",
}

export enum Terminal {
  INT = "A",
  DOM = "B",
}

export enum FlightType {
  COMMERCIAL = "COMMERCIAL",
  CHARTER = "CHARTER",
  CARGO = "CARGO",
  PRIVATE = "PRIVATE",
  VIP = "VIP",
}

export enum FlightDirection {
  ARRIVAL = "arrival",
  DEPARTURE = "departure",
}

export enum FlightStatus {
  SCHEDULED = "SCHEDULED",
  DELAYED = "DELAYED",
  BOARDING = "BOARDING",
  DEPARTED = "DEPARTED",
  ARRIVED = "ARRIVED",
  CANCELED = "CANCELED",
  DIVERTED = "DIVERTED",
}

export enum ImportantPriority {
  URGENT = "URGENT",
  HIGH = "HIGH",
  NORMAL = "NORMAL",
}
