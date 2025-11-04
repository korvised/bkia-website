export enum UserRole {
  // System-level roles
  ADMIN = 'ADMIN', // Full access across all modules
  MANAGER = 'MANAGER', // Oversees departments, moderate privileges

  // Departmental roles
  PASSENGER = 'PASSENGER', // Ground Handling – Passenger Services
  RAMP = 'RAMP', // Ground Handling – Ramp Operations
  CARGO = 'CARGO', // Cargo Handling / Freight
  SECURITY = 'SECURITY', // Airport Security / Screening
  AIR_TRAFFIC = 'AIR_TRAFFIC', // ATC / Flight Coordination
  MAINTENANCE = 'MAINTENANCE', // Aircraft Maintenance
  INFORMATION = 'INFORMATION', // Information Desk / Support Staff
  FINANCE = 'FINANCE', // Accounting / Billing / Payments
  HR = 'HR', // Human Resources
}

export enum UserStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  LOCKED = 'Locked',
  CLOSED = 'Closed',
}

export enum CounterArea {
  DOMESTIC = 'DOMESTIC',
  INTERNATIONAL = 'INTERNATIONAL',
}

export enum FlightStatus {
  SCHEDULED = 'SCHEDULED',
  DELAYED = 'DELAYED',
  BOARDING = 'BOARDING',
  DEPARTED = 'DEPARTED',
  ARRIVED = 'ARRIVED',
  CANCELED = 'CANCELED',
  DIVERTED = 'DIVERTED',
  UNKNOWN = 'UNKNOWN',
}
