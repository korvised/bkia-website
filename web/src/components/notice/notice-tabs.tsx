"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  LucideIcon,
  Megaphone,
  MessageSquareWarning,
  SearchCheck,
} from "lucide-react";
import { cn } from "@/lib";
import { useLanguage } from "@/context/language-context";
import { noticeTranslations } from "@/data/translations/notice";

export type NoticeTab =
  | "important"
  | "information"
  | "lost-found"
  | "complaint";

export function NoticeTabs() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();

  const tabs: { id: NoticeTab; label: string; icon: LucideIcon }[] = [
    {
      id: "important",
      label: t(noticeTranslations.tabs.important),
      icon: Bell,
    },
    {
      id: "information",
      label: t(noticeTranslations.tabs.information),
      icon: Megaphone,
    },
    {
      id: "lost-found",
      label: t(noticeTranslations.tabs.lostFound),
      icon: SearchCheck,
    },
    {
      id: "complaint",
      label: t(noticeTranslations.tabs.complaint),
      icon: MessageSquareWarning,
    },
  ];

  const getIsActive = (tabId: string) => {
    return pathname.includes(`/notices/${tabId}`);
  };

  return (
    <div className="mb-6 border-b border-gray-200">
      <nav
        className="horizontal-scroll flex space-x-8 overflow-x-auto"
        aria-label="Notice tabs"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = getIsActive(tab.id);

          return (
            <Link
              key={tab.id}
              href={`/${lang}/notices/${tab.id}`}
              className={cn(
                "flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "border-bokeo-teal-600 text-bokeo-teal-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
              )}
            >
              <Icon className="h-5 w-5" />
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
