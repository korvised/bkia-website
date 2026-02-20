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

export enum NewsCategory {
  AIRPORT_UPDATE = "AIRPORT_UPDATE", // Terminal renovations, new facilities
  FLIGHT_SERVICE = "FLIGHT_SERVICE", // New routes, airline partnerships
  EVENT = "EVENT", // Airport events, ceremonies
  ANNOUNCEMENT = "ANNOUNCEMENT", // General announcements
  SUSTAINABILITY = "SUSTAINABILITY", // Environmental initiatives
  TECHNOLOGY = "TECHNOLOGY", // New tech implementations
  COMMUNITY = "COMMUNITY", // Community programs, CSR
}

export enum LostFoundType {
  LOST = "LOST", // passenger reporting lost item
  FOUND = "FOUND", // staff/passenger reporting found item
}

export enum LostFoundStatus {
  OPEN = "OPEN", // active, not resolved
  MATCHED = "MATCHED", // potential match found
  RETURNED = "RETURNED", // item returned to owner
  DONATED = "DONATED", // unclaimed, donated
  DISPOSED = "DISPOSED", // unclaimed, disposed
}

export enum LostFoundCategory {
  ELECTRONICS = "ELECTRONICS", // phones, laptops, tablets
  BAGGAGE = "BAGGAGE", // bags, suitcases
  CLOTHING = "CLOTHING", // jackets, hats
  DOCUMENTS = "DOCUMENTS", // passports, IDs, tickets
  JEWELRY = "JEWELRY",
  KEYS = "KEYS",
  CASH = "CASH",
  TOYS = "TOYS",
  OTHER = "OTHER",
}

export enum LostFoundVisibility {
  PENDING_REVIEW = "PENDING_REVIEW", // default, hidden from public until staff approves
  VISIBLE = "VISIBLE", // approved, shown on public website
  HIDDEN = "HIDDEN", // staff manually hid (spam, fake, inappropriate)
}

export enum ClaimStatus {
  PENDING = "PENDING", // submitted, waiting staff review
  APPROVED = "APPROVED", // staff approved, arrange pickup/delivery
  REJECTED = "REJECTED", // staff rejected (wrong person)
  COMPLETED = "COMPLETED", // physically returned to claimant
}
