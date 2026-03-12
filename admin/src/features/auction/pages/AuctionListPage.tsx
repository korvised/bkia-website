import { LuGavel, LuPlus } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { Table } from "@/components/ui/table/table";
import { Pagination } from "@/components/ui/table/pagination";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import { useGetAuctions, useAuctionColumns } from "@/features/auction/hooks";
import { AuctionFilters } from "@/features/auction/components";

export function AuctionListPage() {
  const {
    data,
    filters,
    isLoading,
    isFetching,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useGetAuctions();

  const { can } = usePermissions();
  const canCreate = can(PermissionSlug.AUCTION_CREATE);
  const canEdit = can(PermissionSlug.AUCTION_UPDATE);
  const canDelete = can(PermissionSlug.AUCTION_DELETE);

  const columns = useAuctionColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    canEdit,
    canDelete,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <Breadcrumb
            items={[
              { label: "Content" },
              { label: "Auctions", icon: LuGavel },
            ]}
          />
          <p className="mt-1 text-sm text-gray-500">
            Manage procurement and bidding auctions.
          </p>
        </div>
        {canCreate && (
          <button
            type="button"
            onClick={handleCreate}
            className="bg-primary hover:bg-primary-600 flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            <LuPlus className="h-4 w-4" />
            New Auction
          </button>
        )}
      </div>

      {/* Filters */}
      <AuctionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <Table
          columns={columns}
          data={data?.data ?? []}
          isLoading={isLoading || isFetching}
          rowKey={(item) => item.id}
          emptyMessage="No auctions found. Try adjusting your filters or create a new auction."
        />
        {data && data.meta.total > 0 && (
          <Pagination
            currentPage={data.meta.page}
            pageSize={data.meta.limit}
            totalItems={data.meta.total}
            totalPages={data.meta.pages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            className="border-t border-gray-100 px-4 py-3"
          />
        )}
      </div>
    </div>
  );
}
