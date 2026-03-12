import { LuMessageSquare } from "react-icons/lu";
import { Breadcrumb, Pagination, Table } from "@/components/ui";
import { FeedbackFilters } from "../components";
import { useGetFeedbacks, useFeedbackColumns } from "../hooks";

export function FeedbackPage() {
  const {
    data,
    filters,
    isLoading,
    isFetching,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleRowClick,
  } = useGetFeedbacks();

  const columns = useFeedbackColumns();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Support" }, { label: "Feedback", icon: LuMessageSquare }]}
      />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary-100 rounded-lg p-2">
          <LuMessageSquare className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feedback</h1>
          <p className="text-sm text-gray-500">
            Manage passenger feedback submissions
          </p>
        </div>
      </div>

      {/* Filters */}
      <FeedbackFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Table
          columns={columns}
          data={data?.data ?? []}
          isLoading={isLoading || isFetching}
          onRowClick={(item) => handleRowClick(item.id)}
          rowKey={(item) => item.id}
          emptyMessage="No feedback submissions found"
        />

        {data && (
          <div className="border-t border-gray-200 px-4 py-3">
            <Pagination
              currentPage={data.meta.page}
              totalPages={data.meta.pages}
              pageSize={data.meta.limit}
              totalItems={data.meta.total}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
