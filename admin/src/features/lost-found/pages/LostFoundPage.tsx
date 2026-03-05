import { Link } from "react-router-dom";
import { LuPackageSearch, LuPlus } from "react-icons/lu";
import { Breadcrumb, Pagination, Table } from "@/components/ui";
import { cn } from "@/lib";
import { LostFoundFilters } from "../components";
import { useGetLostFoundItems, useLostFoundColumns } from "../hooks";

export function LostFoundPage() {
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
  } = useGetLostFoundItems();

  const columns = useLostFoundColumns();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Support" }, { label: "Lost & Found", icon: LuPackageSearch }]}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <LuPackageSearch className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lost & Found</h1>
            <p className="text-sm text-gray-500">
              Manage lost and found reports
            </p>
          </div>
        </div>
        <Link
          to="/support/lost-found/create"
          className={cn(
            "bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white",
            "hover:bg-primary-600 transition-colors",
            "focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none",
          )}
        >
          <LuPlus className="h-4 w-4" />
          Add Report
        </Link>
      </div>

      {/* Filters */}
      <LostFoundFilters
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
          emptyMessage="No lost & found reports found"
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
