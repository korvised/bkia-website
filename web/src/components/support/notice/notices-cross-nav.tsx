import Link from "next/link";
import { Bell, Newspaper, ClipboardList, ArrowRight } from "lucide-react";
import type { Lang } from "@/types/language";

type NoticesSection = "airport" | "news" | "auctions";

interface NoticesCrossNavProps {
  lang: Lang;
  current: NoticesSection;
}

const sections = [
  {
    key: "airport" as NoticesSection,
    href: "/notices/airport",
    icon: Bell,
    label: { en: "Airport Notices", lo: "ແຈ້ງການສະໜາມບິນ", zh: "机场公告" },
    desc: {
      en: "Operational updates & advisories",
      lo: "ການປ່ຽນແປງ ແລະ ຄຳແນະນຳ",
      zh: "运营更新与建议",
    },
  },
  {
    key: "news" as NoticesSection,
    href: "/notices/news",
    icon: Newspaper,
    label: { en: "News", lo: "ຂ່າວສານ", zh: "新闻动态" },
    desc: {
      en: "Latest stories & updates",
      lo: "ຂ່າວສານ ແລະ ການອັບເດດລ່າສຸດ",
      zh: "最新资讯与动态",
    },
  },
  {
    key: "auctions" as NoticesSection,
    href: "/notices/auctions",
    icon: ClipboardList,
    label: { en: "Auctions", lo: "ແຈ້ງເປີດປະມູນ", zh: "招标拍卖" },
    desc: {
      en: "Bidding & procurement",
      lo: "ເອກະສານການປະມູນ ແລະ ການຈັດຊື້",
      zh: "招标文件与采购",
    },
  },
];

const heading: Record<Lang, string> = {
  en: "Also in Announcements",
  lo: "ເນື້ອຫາອື່ນໃນໝວດນີ້",
  zh: "同类内容",
};

export function NoticesCrossNav({ lang, current }: NoticesCrossNavProps) {
  const others = sections.filter((s) => s.key !== current);

  return (
    <section className="bg-white py-8">
      <div className="container">
        <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00AAAC]">
          {heading[lang]}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {others.map(({ key, href, icon: Icon, label, desc }) => (
            <Link
              key={key}
              href={`/${lang}${href}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 transition-colors duration-200 hover:border-[#00AAAC]/20 hover:bg-[#f0fbfc]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 transition-colors duration-200 group-hover:bg-[#00AAAC]/10">
                  <Icon className="h-4 w-4 text-gray-400 transition-colors duration-200 group-hover:text-[#00AAAC]" />
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-800 transition-colors duration-200 group-hover:text-[#00AAAC]">
                    {label[lang]}
                  </p>
                  <p className="text-xs text-gray-400">
                    {desc[lang]}
                  </p>
                </div>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-colors duration-200 group-hover:text-[#00AAAC]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
