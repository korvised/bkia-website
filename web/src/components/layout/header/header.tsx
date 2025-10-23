"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronRight } from "lucide-react";
import { GoSearch } from "react-icons/go";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/app-context";
import { LanguageSelector } from "@/components/layout/header/language-selector";
import { SearchDialog } from "@/components/common";
import { Sidebar } from "@/components/layout/header/sidebar";

// Navigation structure
interface NavItem {
  id: string;
  label: {
    en: string;
    lo: string;
    zh: string;
  };
  href: string;
  hasDropdown: boolean;
  children?: {
    label: {
      en: string;
      lo: string;
      zh: string;
    };
    href: string;
    description: {
      en: string;
      lo: string;
      zh: string;
    };
  }[];
  adImage?: string;
  adTitle?: {
    en: string;
    lo: string;
    zh: string;
  };
  adDescription?: {
    en: string;
    lo: string;
    zh: string;
  };
}

// Main Navigation Items
const mainNavigation: NavItem[] = [
  {
    id: "flights",
    label: { en: "Flights", lo: "ຖ້ຽວບິນ", zh: "航班" },
    href: "/flights",
    hasDropdown: true,
    children: [
      {
        label: { en: "Arrivals", lo: "ຖ້ຽວບິນມາຮອດ", zh: "到达航班" },
        href: "/flights/arrivals",
        description: { en: "Check incoming flights", lo: "ກວດເບິ່ງຖ້ຽວບິນທີ່ມາຮອດ", zh: "查看到达航班" }
      },
      {
        label: { en: "Departures", lo: "ຖ້ຽວບິນອອກ", zh: "出发航班" },
        href: "/flights/departures",
        description: { en: "Check outgoing flights", lo: "ກວດເບິ່ງຖ້ຽວບິນທີ່ອອກ", zh: "查看出发航班" }
      },
      {
        label: { en: "Flight Status", lo: "ສະຖານະຖ້ຽວບິນ", zh: "航班状态" },
        href: "/flights/status",
        description: { en: "Track your flight", lo: "ຕິດຕາມຖ້ຽວບິນຂອງທ່ານ", zh: "跟踪您的航班" }
      },
      {
        label: { en: "Airlines", lo: "ສາຍການບິນ", zh: "航空公司" },
        href: "/flights/airlines",
        description: { en: "View all airlines", lo: "ເບິ່ງສາຍການບິນທັງໝົດ", zh: "查看所有航空公司" }
      }
    ],
    adImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
    adTitle: { en: "Real-Time Flight Info", lo: "ຂໍ້ມູນຖ້ຽວບິນແບບສົດ", zh: "实时航班信息" },
    adDescription: { en: "Track flights in real-time", lo: "ຕິດຕາມຖ້ຽວບິນແບບສົດ", zh: "实时跟踪航班" }
  },
  {
    id: "passenger-guide",
    label: { en: "Passenger Guide", lo: "ຄູ່ມືຜູ້ໂດຍສານ", zh: "旅客指南" },
    href: "/guides",
    hasDropdown: true,
    children: [
      {
        label: { en: "Check-in", lo: "ເຊັກອິນ", zh: "办理登机" },
        href: "/guides/checkin",
        description: { en: "Check-in procedures", lo: "ຂັ້ນຕອນການເຊັກອິນ", zh: "办理登机手续" }
      },
      {
        label: { en: "Security", lo: "ຄວາມປອດໄພ", zh: "安检" },
        href: "/guides/security",
        description: { en: "Security guidelines", lo: "ຄຳແນະນຳດ້ານຄວາມປອດໄພ", zh: "安检指南" }
      },
      {
        label: { en: "Baggage", lo: "ກະເປົາ", zh: "行李" },
        href: "/guides/baggage",
        description: { en: "Baggage information", lo: "ຂໍ້ມູນກ່ຽວກັບກະເປົາ", zh: "行李信息" }
      },
      {
        label: { en: "Terminal Guide", lo: "ຄູ່ມືເຕີມິນອນ", zh: "航站楼指南" },
        href: "/guides/terminal",
        description: { en: "Navigate the terminal", lo: "ນຳທາງເຕີມິນອນ", zh: "航站楼导航" }
      }
    ],
    adImage: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&h=300&fit=crop",
    adTitle: { en: "Smooth Journey", lo: "ການເດີນທາງທີ່ລຽບງ່າຍ", zh: "顺畅旅程" },
    adDescription: { en: "Hassle-free experience", lo: "ປະສົບການບໍ່ມີບັນຫາ", zh: "无忧体验" }
  },
  {
    id: "transport",
    label: { en: "Transport", lo: "ການຂົນສົ່ງ", zh: "交通" },
    href: "/transportations",
    hasDropdown: true,
    children: [
      {
        label: { en: "Ground Transport", lo: "ການຂົນສົ່ງພາກພື້ນດິນ", zh: "地面交通" },
        href: "/transportations/ground",
        description: { en: "Buses, taxis, shuttles", lo: "ລົດເມ, ແທັກຊີ, ລົດຮັບສົ່ງ", zh: "巴士、出租车" }
      },
      {
        label: { en: "Parking", lo: "ບ່ອນຈອດລົດ", zh: "停车" },
        href: "/transportations/parking",
        description: { en: "Parking facilities", lo: "ສິ່ງອຳນວຍຄວາມສະດວກຈອດລົດ", zh: "停车设施" }
      },
      {
        label: { en: "Car Rental", lo: "ເຊົ່າລົດ", zh: "租车" },
        href: "/transportations/rental",
        description: { en: "Rent a vehicle", lo: "ເຊົ່າພາຫະນະ", zh: "租赁车辆" }
      },
      {
        label: { en: "Directions", lo: "ທິດທາງ", zh: "方向" },
        href: "/transportations/directions",
        description: { en: "How to get here", lo: "ວິທີການມາເຖິງ", zh: "如何到达" }
      }
    ],
    adImage: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    adTitle: { en: "Easy Transportation", lo: "ການຂົນສົ່ງສະດວກ", zh: "便捷交通" },
    adDescription: { en: "24/7 transport options", lo: "ທາງເລືອກຂົນສົ່ງ 24/7", zh: "24/7交通选择" }
  },
  {
    id: "shop-dine",
    label: { en: "Shop & Dine", lo: "ຊື້ເຄື່ອງ & ອາຫານ", zh: "购物餐饮" },
    href: "/dining-shopping",
    hasDropdown: true,
    children: [
      {
        label: { en: "Restaurants", lo: "ຮ້ານອາຫານ", zh: "餐厅" },
        href: "/dining-shopping/restaurants",
        description: { en: "Dining options", lo: "ທາງເລືອກອາຫານ", zh: "用餐选择" }
      },
      {
        label: { en: "Cafés", lo: "ຮ້ານກາເຟ", zh: "咖啡厅" },
        href: "/dining-shopping/cafes",
        description: { en: "Coffee and snacks", lo: "ກາເຟ ແລະ ອາຫານວ່າງ", zh: "咖啡小吃" }
      },
      {
        label: { en: "Shops", lo: "ຮ້ານຄ້າ", zh: "商店" },
        href: "/dining-shopping/shops",
        description: { en: "Shopping destinations", lo: "ຈຸດໝາຍຊື້ເຄື່ອງ", zh: "购物目的地" }
      },
      {
        label: { en: "Duty Free", lo: "ປອດພາສີ", zh: "免税店" },
        href: "/dining-shopping/duty-free",
        description: { en: "Tax-free shopping", lo: "ຊື້ເຄື່ອງປອດພາສີ", zh: "免税购物" }
      }
    ],
    adImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    adTitle: { en: "Shop & Dine in Style", lo: "ຊື້ເຄື່ອງ & ອາຫານ", zh: "时尚购物" },
    adDescription: { en: "Premium experiences", lo: "ປະສົບການພຣີເມ້ຽມ", zh: "优质体验" }
  },
  {
    id: "relax-fun",
    label: { en: "Relax & Fun", lo: "ພັກຜ່ອນ & ສະໜຸກ", zh: "休闲娱乐" },
    href: "/services",
    hasDropdown: true,
    children: [
      {
        label: { en: "Lounges", lo: "ຫ້ອງພັກຜ່ອນ", zh: "休息室" },
        href: "/services/lounges",
        description: { en: "Premium lounge access", lo: "ເຂົ້າຫ້ອງພັກຜ່ອນພຣີເມ້ຽມ", zh: "高级休息室" }
      },
      {
        label: { en: "Entertainment", lo: "ບັນເທິງ", zh: "娱乐" },
        href: "/services/entertainment",
        description: { en: "Activities and games", lo: "ກິດຈະກຳ ແລະ ເກມ", zh: "活动游戏" }
      },
      {
        label: { en: "Spa & Wellness", lo: "ສະປາ & ສຸຂະພາບ", zh: "水疗" },
        href: "/services/spa",
        description: { en: "Relaxation services", lo: "ບໍລິການພັກຜ່ອນ", zh: "放松服务" }
      },
      {
        label: { en: "Family Services", lo: "ບໍລິການຄອບຄົວ", zh: "家庭服务" },
        href: "/services/family",
        description: { en: "Kids play areas", lo: "ພື້ນທີ່ຫຼິ້ນເດັກ", zh: "儿童游乐区" }
      }
    ],
    adImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop",
    adTitle: { en: "Relax Before Flight", lo: "ພັກຜ່ອນກ່ອນຖ້ຽວບິນ", zh: "航班前放松" },
    adDescription: { en: "Premium amenities", lo: "ສິ່ງອຳນວຍຄວາມສະດວກພຣີເມ້ຽມ", zh: "优质设施" }
  },
  {
    id: "map",
    label: { en: "Map", lo: "ແຜນທີ່", zh: "地图" },
    href: "/map",
    hasDropdown: false
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { lang, isSearchOpen, openSearch } = useApp();
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
      }
    };
  }, []);

  const handleMenuEnter = (id: string, hasDropdown: boolean) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    if (hasDropdown) {
      setActiveMenu(id);
    }
  };

  const handleMenuLeave = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  const handleDropdownEnter = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
  };

  const handleDropdownLeave = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 100);
  };

  const isHeaderWhite = isScrolled || activeMenu !== null;

  return (
    <Fragment>
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in",
          isHeaderWhite ? "bg-white shadow-lg" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1920px]">
          <div className="flex items-center justify-between px-6 sm:px-8 lg:px-16">
            {/* Logo */}
            <Link href={`/${lang}`} className="group flex items-center">
              <div
                className={cn(
                  "relative flex-shrink-0 transition-all duration-300 ease-in",
                  isScrolled ? "h-14 w-14 my-3" : "h-24 w-24 my-4"
                )}
              >
                <Image
                  src={isHeaderWhite ? "/images/logo/bokeo.png" : "/images/logo/bokeo_white.png"}
                  alt="Bokeo Airport"
                  fill
                  className="object-contain transition-opacity duration-300 ease-in group-hover:opacity-80"
                  priority
                />
              </div>
            </Link>

            {/* Centered Navigation */}
            <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <ul className="flex items-center">
                {mainNavigation.map((item) => (
                  <li
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => handleMenuEnter(item.id, item.hasDropdown)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <Link
                      href={`/${lang}${item.href}`}
                      className={cn(
                        "relative flex items-center gap-1 px-5 py-8 text-base font-medium transition-colors duration-300 ease-in",
                        isHeaderWhite ? "text-gray-800 hover:text-primary-600" : "text-white hover:text-primary-200"
                      )}
                    >
                      <span>{item.label[lang]}</span>
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 right-0 h-1 origin-left transition-transform duration-300 ease-in",
                          activeMenu === item.id ? "scale-x-100" : "scale-x-0",
                          isHeaderWhite ? "bg-primary-600" : "bg-white"
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <LanguageSelector isScrolled={isHeaderWhite} />

              <button
                onClick={openSearch}
                className={cn(
                  "rounded-lg p-2 transition-all duration-300 ease-in",
                  isHeaderWhite ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/20"
                )}
                title="Search (Ctrl+K)"
              >
                <GoSearch className="h-6 w-6" />
              </button>

              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={cn(
                  "rounded-lg p-2 transition-all duration-300 ease-in lg:hidden",
                  isHeaderWhite ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/20"
                )}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div
          className={cn(
            "absolute left-0 right-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in",
            activeMenu ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-4"
          )}
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="mx-auto max-w-[1920px] px-6 sm:px-8 lg:px-16">
            {mainNavigation.filter(item => item.hasDropdown).map((item) => (
              <div key={item.id} className={cn("py-12", activeMenu === item.id ? "block" : "hidden")}>
                <div className="grid grid-cols-12 gap-12">
                  {/* Left Section - Menu Items */}
                  <div className="col-span-8">
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-gray-900">{item.label[lang]}</h3>
                      <div className="mt-2 h-1 w-20 bg-primary-500"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      {item.children?.map((child, idx) => (
                        <Link
                          key={idx}
                          href={`/${lang}${child.href}`}
                          className="group flex items-start gap-3 rounded-lg p-4 transition-all duration-300 ease-in hover:bg-primary-50"
                        >
                          <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-all duration-300 ease-in group-hover:bg-primary-600 group-hover:text-white">
                            <ChevronRight className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 transition-colors duration-300 ease-in group-hover:text-primary-600">
                              {child.label[lang]}
                            </div>
                            <div className="mt-1 text-sm text-gray-600">{child.description[lang]}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Right Section - Advertisement */}
                  <div className="col-span-4">
                    <div className="sticky top-8 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-xl">
                      <div className="relative h-64">
                        <Image src={item.adImage || ""} alt={item.adTitle?.[lang] || ""} fill className="object-cover opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h4 className="mb-2 text-2xl font-bold">{item.adTitle?.[lang]}</h4>
                          <p className="text-sm text-gray-200">{item.adDescription?.[lang]}</p>
                          <button className="mt-4 rounded-lg bg-white px-6 py-2 text-sm font-medium text-primary-600 transition-all duration-300 ease-in hover:bg-primary-50">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Sidebar for Mobile */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Search Dialog */}
      <SearchDialog />
    </Fragment>
  );
}
