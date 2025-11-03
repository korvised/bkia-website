import { Lang } from "@/types/language";
import { InformationNoticeList, NoticeSearch } from "@/components/notice";
import { informationNotices } from "@/data/notice/information-notices";

interface InformationNoticesPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ query?: string; category?: string }>;
}

// Helper function to filter notices
function filterNotices(
  notices: typeof informationNotices,
  query: string,
  category?: string,
) {
  let filtered = notices;

  // Filter by category if provided
  if (category && category !== "all") {
    filtered = filtered.filter((notice) => notice.category === category);
  }

  // Filter by search query if provided
  if (query && query.trim() !== "") {
    const searchQuery = query.toLowerCase();
    filtered = filtered.filter((notice) => {
      return (
        notice.title.toLowerCase().includes(searchQuery) ||
        notice.description.toLowerCase().includes(searchQuery) ||
        notice.content.toLowerCase().includes(searchQuery) ||
        notice.tags?.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
    });
  }

  return filtered;
}

export default async function InformationNoticesPage({
  params,
  searchParams,
}: InformationNoticesPageProps) {
  const { lang } = await params;
  const { query, category } = await searchParams;

  // Filter notices based on search query and category (server-side)
  const filteredNotices = filterNotices(
    informationNotices,
    query || "",
    category,
  );

  return (
    <div className="space-y-6">
      {/* Search Component */}
      <NoticeSearch
        lang={lang as Lang}
        resultsCount={query ? filteredNotices.length : undefined}
      />

      {/* Notice List */}
      <InformationNoticeList
        lang={lang as Lang}
        notices={filteredNotices}
        searchQuery={query}
        selectedCategory={category}
      />
    </div>
  );
}
