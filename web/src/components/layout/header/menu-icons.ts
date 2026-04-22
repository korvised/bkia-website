import {
  PlaneTakeoff,
  PlaneLanding,
  CalendarDays,
  Building2,
  Accessibility,
  ShieldCheck,
  Globe,
  LayoutGrid,
  Luggage,
  Car,
  Map,
  Star,
  Bell,
  Newspaper,
  ClipboardList,
  Phone,
  HelpCircle,
  Package,
  MessageSquare,
  Building,
  Briefcase,
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
  "/guides/regional": Globe,

  // Services (was Transports)
  "/services/packing": Luggage,
  "/services/taxi": Car,
  "/services/parking": Map,
  "/services/facilities": LayoutGrid,
  "/services/vip-lounge": Star,

  // Notices (was Support)
  "/notices/airport": Bell,
  "/notices/news": Newspaper,
  "/notices/auctions": ClipboardList,

  // About
  "/about/profile": Building,
  "/about/contact": Phone,
  "/about/faq": HelpCircle,
  "/about/lost-found": Package,
  "/about/feedback": MessageSquare,
  "/careers": Briefcase,
};
