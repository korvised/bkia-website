import Link from "next/link";
import {
  Calendar,
  Clock,
  ChevronRight,
  AlertCircle,
  Star,
  Users,
} from "lucide-react";

// Mock data - replace with API call in real implementation
const newsItems = [
  {
    id: "1",
    title: "New Cultural Exhibition Opens at Terminal",
    titleLao: "ງານວາງສະແດງວັດທະນະທໍາໃໝ່ເປີດໃນເທີມິນອນ",
    summary:
      "Discover the rich heritage of Laos through our latest cultural exhibition featuring traditional arts and crafts.",
    summaryLao:
      "ຄົ້ນພົບມໍລະດົກອັນອຸດົມສົມບູນຂອງລາວຜ່ານການວາງສະແດງວັດທະນະທໍາລ່າສຸດ",
    publishedAt: "2024-01-15T10:00:00Z",
    category: "event",
    urgent: false,
    featured: true,
    image: "/images/cultural/exhibitions/lao-art.jpg",
  },
  {
    id: "2",
    title: "Flight Schedule Update - New Routes Added",
    titleLao: "ການອັບເດດຕາລາງຖ້ຽວບິນ - ເສັ້ນທາງໃໝ່",
    summary:
      "We are pleased to announce new direct flights to Bangkok, Vientiane, and Ho Chi Minh City starting next month.",
    summaryLao:
      "ພວກເຮົາດີໃຈທີ່ຈະປະກາດຖ້ຽວບິນໂດຍກົງໃໝ່ໄປບາງກອກ, ວຽງຈັນ, ແລະ ນະຄອນໂຮຈິມິນ",
    publishedAt: "2024-01-14T14:30:00Z",
    category: "announcement",
    urgent: true,
    featured: false,
    image: "/images/homepage/airport-exterior.jpg",
  },
  {
    id: "3",
    title: "Enhanced Security Measures for Passenger Safety",
    titleLao: "ມາດຕະການຄວາມປອດໄພທີ່ເພີ່ມຂຶ້ນ",
    summary:
      "New advanced security screening technology has been installed to ensure faster and safer passenger processing.",
    summaryLao: "ເທັກໂນໂລຊີການກວດຄວາມປອດໄພກ້າວໜ້າໃໝ່ໄດ້ຖືກຕິດຕັ້ງ",
    publishedAt: "2024-01-13T09:15:00Z",
    category: "news",
    urgent: false,
    featured: false,
    image: "/images/services/security.jpg",
  },
];

const categories = {
  announcement: {
    label: "Announcement",
    color: "bg-blue-100 text-blue-800",
    icon: AlertCircle,
  },
  news: { label: "News", color: "bg-green-100 text-green-800", icon: Star },
  event: {
    label: "Event",
    color: "bg-purple-100 text-purple-800",
    icon: Users,
  },
};

export default function NewsSection() {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return formatDate(dateString);
  };

  return (
    <section className="relative z-10 bg-gradient-to-b from-white/5 to-white/10 py-16 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Latest News & Updates
            </h2>
            <p className="text-xl text-white/90">
              Stay informed about airport announcements and events
            </p>
            <div className="font-lao mt-2 text-lg text-white/80">
              ຕິດຕາມຂ່າວສານ ແລະ ກິດຈະກໍາຂອງສະໜາມບິນ
            </div>
          </div>

          <Link
            href="/news"
            className="hidden items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-md transition-all hover:bg-white/20 md:flex"
          >
            <span className="mr-2">View All</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Featured News */}
          {newsItems
            .filter((item) => item.featured)
            .map((item) => {
              const categoryInfo =
                categories[item.category as keyof typeof categories];
              const IconComponent = categoryInfo.icon;

              return (
                <div key={item.id} className="lg:col-span-2">
                  <div className="group overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/15">
                    {/* Featured Badge */}
                    <div className="relative">
                      <div className="absolute top-4 left-4 z-10">
                        <span className="from-primary-500 to-primary-600 rounded-full bg-gradient-to-r px-3 py-1 text-sm font-semibold text-white">
                          Featured
                        </span>
                      </div>

                      {/* Urgent Badge */}
                      {item.urgent && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="flex items-center rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Urgent
                          </span>
                        </div>
                      )}

                      {/* Image Placeholder */}
                      <div className="from-primary-400 to-primary-500 flex h-64 items-center justify-center bg-gradient-to-br">
                        <div className="text-center text-white/80">
                          <IconComponent className="mx-auto mb-2 h-16 w-16" />
                          <p className="text-sm">News Image</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Category */}
                      <div className="mb-3 flex items-center">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${categoryInfo.color}`}
                        >
                          <IconComponent className="mr-1 h-3 w-3" />
                          {categoryInfo.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="group-hover:text-primary-200 mb-2 text-2xl font-bold text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-lao mb-3 text-sm text-white/70">
                        {item.titleLao}
                      </p>

                      {/* Summary */}
                      <p className="mb-4 leading-relaxed text-white/80">
                        {item.summary}
                      </p>
                      <p className="font-lao mb-4 text-sm text-white/60">
                        {item.summaryLao}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {formatDate(item.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {formatTime(item.publishedAt)}
                          </div>
                        </div>
                        <span className="text-primary-300">
                          {getTimeAgo(item.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          {/* Regular News */}
          <div className="space-y-6">
            {newsItems
              .filter((item) => !item.featured)
              .map((item) => {
                const categoryInfo =
                  categories[item.category as keyof typeof categories];
                const IconComponent = categoryInfo.icon;

                return (
                  <div
                    key={item.id}
                    className="group rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/15"
                  >
                    {/* Header */}
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${categoryInfo.color}`}
                      >
                        <IconComponent className="mr-1 h-3 w-3" />
                        {categoryInfo.label}
                      </span>
                      {item.urgent && (
                        <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                          Urgent
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h4 className="group-hover:text-primary-200 mb-2 line-clamp-2 text-lg font-bold text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-lao mb-2 text-xs text-white/70">
                      {item.titleLao}
                    </p>
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/80">
                      {item.summary}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatTime(item.publishedAt)}
                      </div>
                      <span className="text-primary-300">
                        {getTimeAgo(item.publishedAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-md transition-all hover:bg-white/20"
          >
            <span className="mr-2">View All News</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
