// src/lib/constants.ts
export const SITE_CONFIG = {
  name: "Bokeo International Airport",
  nameLao: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
  description: "Gateway to Laos - Bokeo International Airport",
  url: "https://bokeoairport.la",
  ogImage: "/images/logo/bkia-logo.png",
  links: {
    twitter: "https://twitter.com/bokeoairport",
    facebook: "https://facebook.com/bokeoairport",
    instagram: "https://instagram.com/bokeoairport"
  }
} as const;

// Define types for navigation items
export interface NavigationChild {
  title: string;
  titleLao: string;
  href: string;
}

export interface NavigationItem {
  title: string;
  titleLao: string;
  href: string;
  children?: NavigationChild[];
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    title: "Home",
    titleLao: "ໜ້າຫຼັກ",
    href: "/"
  },
  {
    title: "Flights",
    titleLao: "ຖ້ຽວບິນ",
    href: "/flights",
    children: [
      { title: "Departures", titleLao: "ອອກເດີນທາງ", href: "/flights/departures" },
      { title: "Arrivals", titleLao: "ມາຮອດ", href: "/flights/arrivals" },
      { title: "Flight Status", titleLao: "ສະຖານະຖ້ຽວບິນ", href: "/flights/status" }
    ]
  },
  {
    title: "Services",
    titleLao: "ບໍລິການ",
    href: "/services",
    children: [
      { title: "Dining & Shopping", titleLao: "ອາຫານ ແລະ ຊື້ເຄື່ອງ", href: "/services/dining-shopping" },
      { title: "Joyful Service", titleLao: "ບໍລິການມ່ວນຊື່ນ", href: "/services/joyful-service" },
      { title: "Lost & Found", titleLao: "ຂອງຫາຍ", href: "/services/lost-found" },
      { title: "Cultural Interaction", titleLao: "ແລກປ່ຽນວັດທະນະທໍາ", href: "/services/cultural-interaction" }
    ]
  },
  {
    title: "Transportation",
    titleLao: "ການຂົນສົ່ງ",
    href: "/transportation",
    children: [
      { title: "Ground Transport", titleLao: "ການຂົນສົ່ງທາງບົກ", href: "/transportation/ground-transport" },
      { title: "Parking", titleLao: "ບ່ອນຈອດລົດ", href: "/transportation/parking" },
      { title: "Directions", titleLao: "ທິດທາງ", href: "/transportation/directions" }
    ]
  },
  {
    title: "Cargo",
    titleLao: "ສິນຄ້າ",
    href: "/cargo"
  },
  {
    title: "About",
    titleLao: "ກ່ຽວກັບ",
    href: "/about"
  },
  {
    title: "Contact",
    titleLao: "ຕິດຕໍ່",
    href: "/contact"
  }
];

export const FLIGHT_STATUS = {
  ON_TIME: "On Time",
  DELAYED: "Delayed",
  CANCELLED: "Cancelled",
  BOARDING: "Boarding",
  DEPARTED: "Departed",
  ARRIVED: "Arrived"
} as const;

export const SERVICE_CATEGORIES = {
  DINING: "dining",
  SHOPPING: "shopping",
  ENTERTAINMENT: "entertainment",
  BUSINESS: "business",
  FAMILY: "family"
} as const;

export const TRANSPORTATION_TYPES = {
  BUS: "bus",
  TAXI: "taxi",
  CAR_RENTAL: "car-rental",
  RIDE_SHARE: "ride-share"
} as const;

// Type exports for use in other files
export type FlightStatus = keyof typeof FLIGHT_STATUS;
export type ServiceCategory = keyof typeof SERVICE_CATEGORIES;
export type TransportationType = keyof typeof TRANSPORTATION_TYPES;
