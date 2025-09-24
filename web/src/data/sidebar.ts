import {
  Building,
  FileText,
  HelpCircle,
  LucideIcon,
  Newspaper,
  Plane,
  Users,
} from "lucide-react";
import { MultilingualText } from "@/types/language";

interface SidebarItem {
  id: string;
  title: MultilingualText;
  icon: LucideIcon;
  href: string;
}

export const sidebarItems: SidebarItem[] = [
  {
    id: "party",
    title: {
      en: "Airport\nParty\nBuilding",
      lo: "ອາຄານ\nສະໜາມບິນ",
      zh: "机场\n党委\n大楼",
    },
    icon: Users,
    href: "/about/management",
  },
  {
    id: "news",
    title: {
      en: "Airport\nNews",
      lo: "ຂ່າວສານ\nສະໜາມບິນ",
      zh: "机场\n新闻",
    },
    icon: Newspaper,
    href: "/news",
  },
  {
    id: "bidding",
    title: {
      en: "Bidding\nInformation",
      lo: "ຂໍ້ມູນ\nການປະມູນ",
      zh: "招标\n信息",
    },
    icon: FileText,
    href: "/about/procurement",
  },
  {
    id: "flights",
    title: {
      en: "Flight\nInformation",
      lo: "ຂໍ້ມູນ\nຖ່ຽວບິນ",
      zh: "航班\n信息",
    },
    icon: Plane,
    href: "/flights",
  },
  {
    id: "business",
    title: {
      en: "Business\nInformation",
      lo: "ຂໍ້ມູນ\nທຸລະກິດ",
      zh: "商业\n信息",
    },
    icon: Building,
    href: "/services/business",
  },
  {
    id: "help",
    title: {
      en: "Help &\nSupport",
      lo: "ຊ່ວຍເຫຼືອ",
      zh: "帮助与\n支持",
    },
    icon: HelpCircle,
    href: "/contact",
  },
];
