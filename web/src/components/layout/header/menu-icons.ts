import {
  PlaneTakeoff,
  PlaneLanding,
  CalendarDays,
  Building2,
  Accessibility,
  ShieldCheck,
  LayoutGrid,
  Car,
  Map,
  Globe,
  Phone,
  Bell,
  HelpCircle,
  Package,
  MessageSquare,
  Building,
  Newspaper,
  Briefcase,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export const MENU_ICONS: Record<string, LucideIcon> = {
  // Flights
  "/flights/departures": PlaneTakeoff,
  "/flights/arrivals": PlaneLanding,
  "/flights/schedules": CalendarDays,
  "/flights/airlines": Building2,

  // Guides
  "/guides/departures": PlaneTakeoff,
  "/guides/arrivals": PlaneLanding,
  "/guides/custom-services": Accessibility,
  "/guides/security": ShieldCheck,
  "/guides/facilities": LayoutGrid,

  // Transports
  "/transports/to-from-airport": Car,
  "/transports/parking": Map,
  "/transports/regional": Globe,
  "/transports/contacts": Phone,

  // Support
  "/support/notices": Bell,
  "/support/faq": HelpCircle,
  "/support/lost-found": Package,
  "/support/feedback": MessageSquare,

  // About
  "/about/profile": Building,
  "/about/news": Newspaper,
  "/about/careers": Briefcase,
  "/about/auctions": Hammer,
};
