import { LucideIcon } from "lucide-react";
import { MultilingualText } from "@/types/language";

export interface NavigationItem {
  id: string;
  title: MultilingualText;
  icon: LucideIcon;
  color: string;
  href: string;
  description: MultilingualText;
}
