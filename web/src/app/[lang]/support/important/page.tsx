import { Lang } from "@/types/language";
import {
  ImportantCategoryFilter,
  ImportantNoticeList,
  NoticeSearch,
} from "@/components/notice";
import {
  importantNotices,
  type ImportantNotice,
} from "@/data/notice/important-notices";
import { ImportantPriority } from "@/types/notice";

interface ImportantNoticesPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    query?: string;
    priority?: ImportantPriority;
  }>;
}

// Helper function to filter notices
function filterNotices(
  lang: Lang,
  notices: ImportantNotice[],
  query: string,
  priority?: ImportantPriority,
) {
  let result = notices;

  // Filter by priority (map UI -> data)
  if (priority && priority !== "all") {
    result = result.filter((n) => n.priority === priority);
  }

  // Search filter
  if (query && query.trim() !== "") {
    const search = query.toLowerCase();
    result = result.filter((notice) => {
      return (
        notice.title[lang].toLowerCase().includes(search) ||
        notice.description[lang].toLowerCase().includes(search) ||
        notice.content[lang].toLowerCase().includes(search) ||
        notice.tags?.some((tag) => tag[lang].toLowerCase().includes(search))
      );
    });
  }

  return result;
}

export default async function ImportantNoticesPage({
  params,
  searchParams,
}: ImportantNoticesPageProps) {
  const { lang } = await params;
  const { query, priority } = await searchParams;

  const filteredNotices = filterNotices(
    lang as Lang,
    importantNotices,
    query || "",
    priority,
  );

  return (
    <div className="container space-y-6">
      {/* Search */}
      <NoticeSearch
        lang={lang as Lang}
        resultsCount={query ? filteredNotices.length : undefined}
      />

      {/* Category (priority) filter */}
      <ImportantCategoryFilter
        lang={lang as Lang}
        selectedPriority={(priority as never) || "all"}
      />

      {/* List */}
      <ImportantNoticeList
        lang={lang as Lang}
        notices={filteredNotices}
        searchQuery={query}
      />
    </div>
  );
}
