"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  X,
  User,
  Plane,
  Car,
  UtensilsCrossed,
  Calendar,
  Briefcase,
  HelpCircle,
  Building,
  FileText,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const translations = {
  menu: {
    en: "Menu",
    lo: "ເມນູ",
    zh: "菜单",
  },
  passengerServices: {
    en: "Passenger Services",
    lo: "ບໍລິການຜູ້ໂດຍສານ",
    zh: "旅客服务",
  },
  aboutUs: {
    en: "About Us",
    lo: "ກ່ຽວກັບພວກເຮົາ",
    zh: "关于我们",
  },
  airportName: {
    en: "Bokeo International Airport",
    lo: "ສະໜາມບິນສາກົນບໍ່ແກ້ວ",
    zh: "博胶国际机场",
  },
};

const passengerItems = [
  {
    id: "flights",
    title: {
      en: "Flight Information",
      lo: "ຂໍ້ມູນຖ້ຽວບິນ",
      zh: "航班信息",
    },
    icon: Plane,
    color: "bg-teal-500",
    href: "/flights",
    description: {
      en: "Flight schedules and real-time updates",
      lo: "ຕາລາງຖ້ຽວບິນ ແລະ ຂໍ້ມູນປັດຈຸບັນ",
      zh: "航班查询、航班时刻表",
    },
  },
  {
    id: "transportation",
    title: {
      en: "Transportation",
      lo: "ການຂົນສົ່ງ",
      zh: "交通导引",
    },
    icon: Car,
    color: "bg-cyan-500",
    href: "/transportation",
    description: {
      en: "Buses, taxis, parking, and car rental",
      lo: "ລົດເມ, ແທັກຊີ, ບ່ອນຈອດລົດ, ແລະ ການເຊົ່າລົດ",
      zh: "大巴、出租车、停车、租车",
    },
  },
  {
    id: "guide",
    title: {
      en: "Passenger Guide",
      lo: "ຄູ່ມືຜູ້ໂດຍສານ",
      zh: "乘机指南",
    },
    icon: HelpCircle,
    color: "bg-green-500",
    href: "/guide",
    description: {
      en: "Travel procedures and facility services",
      lo: "ຂັ້ນຕອນການເດີນທາງ ແລະ ບໍລິການສິ່ງອຳນວຍຄວາມສະດວກ",
      zh: "旅客乘机流程、设施服务",
    },
  },
  {
    id: "notices",
    title: {
      en: "Notices & Announcements",
      lo: "ການແຈ້ງການ ແລະ ປະກາດ",
      zh: "通知公告",
    },
    icon: Calendar,
    color: "bg-blue-600",
    href: "/notices",
    description: {
      en: "Important notices and lost item information",
      lo: "ການແຈ້ງການສຳຄັນ ແລະ ຂໍ້ມູນສິ່ງຂອງທີ່ສູນຫາຍ",
      zh: "重要通知、失物信息",
    },
  },
  {
    id: "dining",
    title: {
      en: "Dining & Shopping",
      lo: "ອາຫານ ແລະ ການຊື້ເຄື່ອງ",
      zh: "餐饮购物",
    },
    icon: UtensilsCrossed,
    color: "bg-teal-600",
    href: "/services/dining-shopping",
    description: {
      en: "Restaurants, cafes, and shopping",
      lo: "ຮ້ານອາຫານ, ຮ້ານກາເຟ, ແລະ ການຊື້ເຄື່ອງ",
      zh: "餐饮零售服务、价格表",
    },
  },
  {
    id: "cultural",
    title: {
      en: "Cultural Activities",
      lo: "ກິດຈະກຳວັດທະນະທຳ",
      zh: "文化活动",
    },
    icon: Calendar,
    color: "bg-cyan-600",
    href: "/services/cultural-interaction",
    description: {
      en: "Cultural exhibitions and activities",
      lo: "ການວາງສະແດງວັດທະນະທຳ ແລະ ກິດຈະກຳ",
      zh: "丰富的候机楼文化活动",
    },
  },
  {
    id: "joyful",
    title: {
      en: "Joyful Services",
      lo: "ບໍລິການຄວາມສຸກ",
      zh: "愉悦服务",
    },
    icon: User,
    color: "bg-teal-700",
    href: "/services/joyful-service",
    description: {
      en: "VIP and premium passenger services",
      lo: "ບໍລິການ VIP ແລະ ຜູ້ໂດຍສານພິເສດ",
      zh: "提供贵宾及要客服务",
    },
  },
];

const aboutUsItems = [
  {
    id: "overview",
    title: {
      en: "Airport Overview",
      lo: "ພາບລວມສະໜາມບິນ",
      zh: "机场概况",
    },
    icon: Building,
    color: "bg-teal-500",
    href: "/about/overview",
    description: {
      en: "Explore airport operations",
      lo: "ສຳຫຼວດການດຳເນີນງານສະໜາມບິນ",
      zh: "探索机场的运行",
    },
  },
  {
    id: "company",
    title: {
      en: "Company Information",
      lo: "ຂໍ້ມູນບໍລິສັດ",
      zh: "公司简介",
    },
    icon: Briefcase,
    color: "bg-cyan-500",
    href: "/about/company",
    description: {
      en: "Learn about our company",
      lo: "ຮຽນຮູ້ກ່ຽວກັບບໍລິສັດຂອງພວກເຮົາ",
      zh: "了解机场公司",
    },
  },
  {
    id: "procurement",
    title: {
      en: "Procurement",
      lo: "ການຈັດຊື້ຈັດຈ້າງ",
      zh: "招标公告",
    },
    icon: FileText,
    color: "bg-green-500",
    href: "/about/procurement",
    description: {
      en: "Bidding and procurement information",
      lo: "ຂໍ້ມູນການປະມູນ ແລະ ການຈັດຊື້",
      zh: "机场各类招标信息",
    },
  },
  {
    id: "careers",
    title: {
      en: "Careers",
      lo: "ໂອກາດເຮັດວຽກ",
      zh: "人才招聘",
    },
    icon: Users,
    color: "bg-blue-600",
    href: "/about/careers",
    description: {
      en: "Job opportunities and recruitment",
      lo: "ໂອກາດເຮັດວຽກ ແລະ ການສະໝັກງານ",
      zh: "机场各岗位人才招聘信息",
    },
  },
  {
    id: "news",
    title: {
      en: "Airport News",
      lo: "ຂ່າວສານສະໜາມບິນ",
      zh: "空港新闻",
    },
    icon: Calendar,
    color: "bg-teal-600",
    href: "/news",
    description: {
      en: "Latest news and updates",
      lo: "ຂ່າວສານ ແລະ ການອັບເດດຫຼ້າສຸດ",
      zh: "新闻、图片和视频资料",
    },
  },
  {
    id: "history",
    title: {
      en: "Development History",
      lo: "ປະຫວັດການພັດທະນາ",
      zh: "发展历程",
    },
    icon: Building,
    color: "bg-cyan-600",
    href: "/about/history",
    description: {
      en: "Our development journey",
      lo: "ການເດີນທາງພັດທະນາຂອງພວກເຮົາ",
      zh: "回顾机场的发展历史",
    },
  },
  {
    id: "cargo",
    title: {
      en: "Air Cargo",
      lo: "ຂົນສົ່ງສິນຄ້າທາງອາກາດ",
      zh: "航空货运",
    },
    icon: Plane,
    color: "bg-teal-700",
    href: "/cargo",
    description: {
      en: "Air cargo and freight services",
      lo: "ບໍລິການຂົນສົ່ງສິນຄ້າທາງອາກາດ",
      zh: "提供航空货运代理服务",
    },
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"passenger" | "about">(
    "passenger",
  );

  const renderMenuItem = (item: (typeof passengerItems)[0]) => {
    const IconComponent = item.icon;
    return (
      <Link
        key={item.id}
        href={`/${lang}${item.href}`}
        onClick={onClose}
        className="group flex items-center border-b border-gray-100 p-4 transition-colors hover:bg-gray-50"
      >
        <div
          className={cn(
            "mr-4 flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110",
            item.color,
          )}
        >
          <IconComponent className="h-5 w-5 text-white" />
        </div>

        <div className="flex-1">
          <div
            className={cn(
              "group-hover:text-bokeo-teal-700 font-semibold text-gray-900 transition-colors",
              lang === "lo" && "font-lao",
            )}
          >
            {t(item.title)}
          </div>
          <div
            className={cn(
              "mt-1 text-xs text-gray-400",
              lang === "lo" && "font-lao",
            )}
          >
            {t(item.description)}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        {/* Sidebar Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="pointer-events-auto relative flex h-full w-80 flex-col bg-white shadow-2xl">
                  {/* Header */}
                  <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="from-bokeo-teal-500 to-bokeo-blue-500 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r">
                        <span className="text-sm font-bold text-white">
                          {lang === "zh" ? "菜" : lang === "lo" ? "ເມ" : "M"}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "text-lg font-semibold text-gray-900",
                          lang === "lo" && "font-lao",
                        )}
                      >
                        {t(translations.menu)}
                      </span>
                    </div>
                    <button
                      onClick={onClose}
                      className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Custom Tab Navigation */}
                  <div className="flex flex-shrink-0">
                    <button
                      onClick={() => setActiveTab("passenger")}
                      className={cn(
                        "flex flex-1 flex-col items-center px-6 py-4 text-sm font-medium transition-colors",
                        activeTab === "passenger"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                      )}
                    >
                      <User className="mb-1 h-4 w-4" />
                      <span className={cn(lang === "lo" && "font-lao")}>
                        {t(translations.passengerServices)}
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("about")}
                      className={cn(
                        "flex flex-1 flex-col items-center px-6 py-4 text-sm font-medium transition-colors",
                        activeTab === "about"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                      )}
                    >
                      <Building className="mb-1 h-4 w-4" />
                      <span className={cn(lang === "lo" && "font-lao")}>
                        {t(translations.aboutUs)}
                      </span>
                    </button>
                  </div>

                  {/* Tab Content - Scrollable */}
                  <div className="flex-1 overflow-y-auto">
                    {activeTab === "passenger" && (
                      <div className="space-y-0">
                        {passengerItems.map(renderMenuItem)}
                      </div>
                    )}

                    {activeTab === "about" && (
                      <div className="space-y-0">
                        {aboutUsItems.map(renderMenuItem)}
                      </div>
                    )}
                  </div>

                  {/* Footer - Stuck to bottom */}
                  <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 p-4">
                    <div className="text-center">
                      <div
                        className={cn(
                          "text-sm font-medium text-gray-900",
                          lang === "lo" && "font-lao",
                        )}
                      >
                        {t(translations.airportName)}
                      </div>
                      <div className="font-lao mt-1 text-xs text-gray-500">
                        ສະໜາມບິນສາກົນບໍ່ແກ້ວ
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
