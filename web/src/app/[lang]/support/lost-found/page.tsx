import { Lang } from "@/types/language";
import {
  LostFoundList,
  LostFoundSearch,
  ReportItemButton,
} from "@/components/support";
import { lostFoundItems } from "@/data/notice/lost-found";

interface LostFoundPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    query?: string;
    category?: string;
    status?: string;
    type?: string;
  }>;
}

// Helper function to filter items
function filterItems(
  items: typeof lostFoundItems,
  query: string,
  category?: string,
  status?: string,
  type?: string,
) {
  let filtered = items;

  // Filter by type
  if (type && type !== "all") {
    filtered = filtered.filter((item) => item.type === type);
  }

  // Filter by category
  if (category && category !== "all") {
    filtered = filtered.filter((item) => item.category === category);
  }

  // Filter by status
  if (status && status !== "all") {
    filtered = filtered.filter((item) => item.status === status);
  }

  // Filter by search query
  if (query && query.trim() !== "") {
    const searchQuery = query.toLowerCase();
    filtered = filtered.filter((item) => {
      return (
        item.itemName.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.location.toLowerCase().includes(searchQuery) ||
        item.referenceNumber.toLowerCase().includes(searchQuery)
      );
    });
  }

  return filtered;
}

export default async function LostFoundPage({
  params,
  searchParams,
}: LostFoundPageProps) {
  const { lang } = await params;
  const { query, category, status, type } = await searchParams;

  // Filter items based on search query, category, status, and type (server-side)
  const filteredItems = filterItems(
    lostFoundItems,
    query || "",
    category,
    status,
    type,
  );

  return (
    <div className="container space-y-6">
      {/* Info Banner */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-blue-900">
              Lost & Found Information
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Items are kept for 90 days. To claim an item, please contact our
              Lost & Found desk at{" "}
              <a href="tel:+85684211-2000" className="font-medium underline">
                +856-84-211-2000
              </a>{" "}
              or visit Level 1, near Information Desk (Open: 6:00 AM - 10:00 PM
              daily).
            </p>
          </div>
        </div>
      </div>

      {/* Report Item Button */}
      <ReportItemButton lang={lang as Lang} />

      {/* Search Component */}
      <LostFoundSearch
        lang={lang as Lang}
        resultsCount={
          query || category !== "all" || status !== "all" || type !== "all"
            ? filteredItems.length
            : undefined
        }
        selectedCategory={category}
        selectedStatus={status}
        selectedType={type}
      />

      {/* Items List */}
      <LostFoundList
        lang={lang as Lang}
        items={filteredItems}
        searchQuery={query}
      />
    </div>
  );
}
