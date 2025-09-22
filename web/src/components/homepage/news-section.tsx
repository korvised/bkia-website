import Link from 'next/link';
import {Calendar, Clock, ChevronRight, AlertCircle, Star, Users} from 'lucide-react';

// Mock data - replace with API call in real implementation
const newsItems = [
    {
        id: '1',
        title: 'New Cultural Exhibition Opens at Terminal',
        titleLao: 'ງານວາງສະແດງວັດທະນະທໍາໃໝ່ເປີດໃນເທີມິນອນ',
        summary: 'Discover the rich heritage of Laos through our latest cultural exhibition featuring traditional arts and crafts.',
        summaryLao: 'ຄົ້ນພົບມໍລະດົກອັນອຸດົມສົມບູນຂອງລາວຜ່ານການວາງສະແດງວັດທະນະທໍາລ່າສຸດ',
        publishedAt: '2024-01-15T10:00:00Z',
        category: 'event',
        urgent: false,
        featured: true,
        image: '/images/cultural/exhibitions/lao-art.jpg'
    },
    {
        id: '2',
        title: 'Flight Schedule Update - New Routes Added',
        titleLao: 'ການອັບເດດຕາລາງຖ້ຽວບິນ - ເສັ້ນທາງໃໝ່',
        summary: 'We are pleased to announce new direct flights to Bangkok, Vientiane, and Ho Chi Minh City starting next month.',
        summaryLao: 'ພວກເຮົາດີໃຈທີ່ຈະປະກາດຖ້ຽວບິນໂດຍກົງໃໝ່ໄປບາງກອກ, ວຽງຈັນ, ແລະ ນະຄອນໂຮຈິມິນ',
        publishedAt: '2024-01-14T14:30:00Z',
        category: 'announcement',
        urgent: true,
        featured: false,
        image: '/images/homepage/airport-exterior.jpg'
    },
    {
        id: '3',
        title: 'Enhanced Security Measures for Passenger Safety',
        titleLao: 'ມາດຕະການຄວາມປອດໄພທີ່ເພີ່ມຂຶ້ນ',
        summary: 'New advanced security screening technology has been installed to ensure faster and safer passenger processing.',
        summaryLao: 'ເທັກໂນໂລຊີການກວດຄວາມປອດໄພກ້າວໜ້າໃໝ່ໄດ້ຖືກຕິດຕັ້ງ',
        publishedAt: '2024-01-13T09:15:00Z',
        category: 'news',
        urgent: false,
        featured: false,
        image: '/images/services/security.jpg'
    }
];

const categories = {
    announcement: {label: 'Announcement', color: 'bg-blue-100 text-blue-800', icon: AlertCircle},
    news: {label: 'News', color: 'bg-green-100 text-green-800', icon: Star},
    event: {label: 'Event', color: 'bg-purple-100 text-purple-800', icon: Users}
};

export default function NewsSection() {
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const getTimeAgo = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;

        return formatDate(dateString);
    };

    return (
        <section className="relative z-10 py-16 bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Latest News & Updates
                        </h2>
                        <p className="text-xl text-white/90">
                            Stay informed about airport announcements and events
                        </p>
                        <div className="text-lg text-white/80 font-lao mt-2">
                            ຕິດຕາມຂ່າວສານ ແລະ ກິດຈະກໍາຂອງສະໜາມບິນ
                        </div>
                    </div>

                    <Link
                        href="/news"
                        className="hidden md:flex items-center bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all border border-white/20"
                    >
                        <span className="mr-2">View All</span>
                        <ChevronRight className="w-4 h-4"/>
                    </Link>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Featured News */}
                    {newsItems.filter(item => item.featured).map((item) => {
                        const categoryInfo = categories[item.category as keyof typeof categories];
                        const IconComponent = categoryInfo.icon;

                        return (
                            <div key={item.id} className="lg:col-span-2">
                                <div
                                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group">

                                    {/* Featured Badge */}
                                    <div className="relative">
                                        <div className="absolute top-4 left-4 z-10">
                      <span
                          className="bg-gradient-to-r from-bokeo-teal-500 to-bokeo-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                                        </div>

                                        {/* Urgent Badge */}
                                        {item.urgent && (
                                            <div className="absolute top-4 right-4 z-10">
                        <span
                            className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1"/>
                          Urgent
                        </span>
                                            </div>
                                        )}

                                        {/* Image Placeholder */}
                                        <div
                                            className="h-64 bg-gradient-to-br from-bokeo-teal-400 to-bokeo-blue-500 flex items-center justify-center">
                                            <div className="text-white/80 text-center">
                                                <IconComponent className="w-16 h-16 mx-auto mb-2"/>
                                                <p className="text-sm">News Image</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Category */}
                                        <div className="flex items-center mb-3">
                      <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                        <IconComponent className="w-3 h-3 mr-1"/>
                          {categoryInfo.label}
                      </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-bokeo-teal-200 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-white/70 font-lao mb-3">
                                            {item.titleLao}
                                        </p>

                                        {/* Summary */}
                                        <p className="text-white/80 leading-relaxed mb-4">
                                            {item.summary}
                                        </p>
                                        <p className="text-white/60 text-sm font-lao mb-4">
                                            {item.summaryLao}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-white/60 text-sm">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1"/>
                                                    {formatDate(item.publishedAt)}
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1"/>
                                                    {formatTime(item.publishedAt)}
                                                </div>
                                            </div>
                                            <span className="text-bokeo-teal-300">
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
                        {newsItems.filter(item => !item.featured).map((item) => {
                            const categoryInfo = categories[item.category as keyof typeof categories];
                            const IconComponent = categoryInfo.icon;

                            return (
                                <div key={item.id}
                                     className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">

                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-3">
                    <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                      <IconComponent className="w-3 h-3 mr-1"/>
                        {categoryInfo.label}
                    </span>
                                        {item.urgent && (
                                            <span
                                                className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Urgent
                      </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-bokeo-teal-200 transition-colors line-clamp-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-white/70 font-lao mb-2">
                                        {item.titleLao}
                                    </p>
                                    <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-4">
                                        {item.summary}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center justify-between text-white/60 text-xs">
                                        <div className="flex items-center">
                                            <Clock className="w-3 h-3 mr-1"/>
                                            {formatTime(item.publishedAt)}
                                        </div>
                                        <span className="text-bokeo-teal-300">
                      {getTimeAgo(item.publishedAt)}
                    </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile View All Button */}
                <div className="text-center mt-8 md:hidden">
                    <Link
                        href="/news"
                        className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all border border-white/20"
                    >
                        <span className="mr-2">View All News</span>
                        <ChevronRight className="w-4 h-4"/>
                    </Link>
                </div>
            </div>
        </section>
    );
}
