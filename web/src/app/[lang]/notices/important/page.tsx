import { Lang } from "@/types/language";
import { ImportantNoticeList, NoticeSearch } from "@/components/notice";
import {
  importantNotices,
  type ImportantNotice,
} from "@/data/notice/important-notices";

interface ImportantNoticesPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ query?: string }>;
}

// Helper function to filter notices
function filterNotices(lang: Lang, notices: ImportantNotice[], query: string) {
  if (!query || query.trim() === "") {
    return notices;
  }

  const searchQuery = query.toLowerCase();
  return notices.filter((notice) => {
    return (
      notice.title[lang].toLowerCase().includes(searchQuery) ||
      notice.description[lang].toLowerCase().includes(searchQuery) ||
      notice.content[lang].toLowerCase().includes(searchQuery) ||
      notice.tags?.some((tag) => tag[lang].toLowerCase().includes(searchQuery))
    );
  });
}

export default async function ImportantNoticesPage({
  params,
  searchParams,
}: ImportantNoticesPageProps) {
  const { lang } = await params;
  const { query } = await searchParams;

  // Filter notices based on search query (server-side)
  const filteredNotices = filterNotices(
    lang as Lang,
    importantNotices,
    query || "",
  );

  return (
    <div className="space-y-6">
      {/* Search Component */}
      <NoticeSearch
        lang={lang as Lang}
        resultsCount={query ? filteredNotices.length : undefined}
      />

      {/* Notice List */}
      <ImportantNoticeList
        lang={lang as Lang}
        notices={filteredNotices}
        searchQuery={query}
      />
    </div>
  );
}
