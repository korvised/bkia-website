"use client";

import Link from "next/link";
import { X, User, Plane, Car, UtensilsCrossed, Calendar, Briefcase, HelpCircle, Building, FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const passengerItems = [
  {
    id: "flights",
    title: "航班信息",
    titleEn: "Flight Information",
    icon: Plane,
    color: "bg-teal-500",
    href: "/flights",
    description: "航班查询、航班时刻表"
  },
  {
    id: "transportation",
    title: "交通导引",
    titleEn: "Traffic Guidance",
    icon: Car,
    color: "bg-cyan-500",
    href: "/transportation",
    description: "大巴、出租车、停车、租车"
  },
  {
    id: "guide",
    title: "乘机指南",
    titleEn: "Flight Guide",
    icon: HelpCircle,
    color: "bg-green-500",
    href: "/guide",
    description: "旅客乘机流程、设施服务"
  },
  {
    id: "notices",
    title: "通知公告",
    titleEn: "Notices and Announcements",
    icon: Calendar,
    color: "bg-blue-600",
    href: "/notices",
    description: "重要通知、失物信息"
  },
  {
    id: "dining",
    title: "餐饮购物",
    titleEn: "Dining and Shopping",
    icon: UtensilsCrossed,
    color: "bg-teal-600",
    href: "/services/dining-shopping",
    description: "餐饮零售服务、价格表"
  },
  {
    id: "cultural",
    title: "文化活动",
    titleEn: "Cultural Activities",
    icon: Calendar,
    color: "bg-cyan-600",
    href: "/services/cultural-interaction",
    description: "丰富的候机楼文化活动"
  },
  {
    id: "joyful",
    title: "愉悦服务",
    titleEn: "Joyful Service",
    icon: User,
    color: "bg-teal-700",
    href: "/services/joyful-service",
    description: "提供贵宾及要客服务"
  },
  {
    id: "zhejiang",
    title: "浙里飞",
    titleEn: "Zhejiang Fly",
    icon: Plane,
    color: "bg-blue-700",
    href: "/zhejiang-fly",
    description: "一站式航空出行服务"
  }
];

const aboutUsItems = [
  {
    id: "situation",
    title: "机场概况",
    titleEn: "Airport Situation",
    icon: Building,
    color: "bg-teal-500",
    href: "/about/overview",
    description: "探索机场的运行"
  },
  {
    id: "company",
    title: "公司简介",
    titleEn: "Company Introduction",
    icon: Briefcase,
    color: "bg-cyan-500",
    href: "/about/company",
    description: "了解杭州机场公司"
  },
  {
    id: "bidding",
    title: "招标公告",
    titleEn: "Bidding Announcement",
    icon: FileText,
    color: "bg-green-500",
    href: "/about/procurement",
    description: "机场各类招标信息"
  },
  {
    id: "recruitment",
    title: "人才招聘",
    titleEn: "Talent Recruitment",
    icon: Users,
    color: "bg-blue-600",
    href: "/about/careers",
    description: "机场各岗位人才招聘信息"
  },
  {
    id: "news",
    title: "空港新闻",
    titleEn: "Airport News",
    icon: Calendar,
    color: "bg-teal-600",
    href: "/news",
    description: "新闻、图片和视频资料"
  },
  {
    id: "development",
    title: "发展历程",
    titleEn: "Development History",
    icon: Building,
    color: "bg-cyan-600",
    href: "/about/history",
    description: "回顾杭州机场的发展历史"
  },
  {
    id: "cargo",
    title: "航空货运",
    titleEn: "Air Cargo",
    icon: Plane,
    color: "bg-teal-700",
    href: "/cargo",
    description: "提供航空货运代理服务"
  }
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'passenger' | 'about'>('passenger');

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-bokeo-teal-500 to-bokeo-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">菜单</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex">
          <button
            onClick={() => setActiveTab('passenger')}
            className={cn(
              "flex-1 py-4 px-6 text-sm font-medium transition-colors",
              activeTab === 'passenger'
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            <User className="w-4 h-4 mx-auto mb-1" />
            旅客服务
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={cn(
              "flex-1 py-4 px-6 text-sm font-medium transition-colors",
              activeTab === 'about'
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            <Building className="w-4 h-4 mx-auto mb-1" />
            关于我们
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          {(activeTab === 'passenger' ? passengerItems : aboutUsItems).map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 group"
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center mr-4 transition-transform group-hover:scale-110",
                  item.color
                )}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-bokeo-teal-700 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.titleEn}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">
              Bokeo International Airport
            </div>
            <div className="text-xs text-gray-500 font-lao">
              ສະໜາມບິນສາກົນບໍ່ແກ້ວ
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
