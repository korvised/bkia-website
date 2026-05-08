import { Link, useSearchParams } from "react-router-dom";
import { LuClipboardList, LuPackageSearch, LuPlus } from "react-icons/lu";
import { Breadcrumb, Pagination, Table } from "@/components/ui";
import { cn } from "@/lib";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import { LostFoundFilters, ClaimFilters } from "../components";
import {
  useGetLostFoundItems,
  useLostFoundColumns,
  useGetAllClaims,
  useClaimColumns,
} from "../hooks";

type TabKey = "items" | "claims";

const TABS: { key: TabKey; label: string; icon: typeof LuPackageSearch }[] = [
  { key: "items", label: "Items", icon: LuPackageSearch },
  { key: "claims", label: "Claims", icon: LuClipboardList },
];

export function LostFoundPage() {
  const { can } = usePermissions();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get("tab") as TabKey) || "items";

  const setTab = (tab: TabKey) => {
    setSearchParams(tab === "items" ? {} : { tab }, { replace: true });
  };

  // ── Items data ──
  const items = useGetLostFoundItems();
  const itemColumns = useLostFoundColumns(items.handleDelete);

  // ── Claims data ──
  const claims = useGetAllClaims();
  const claimColumns = useClaimColumns();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Support" }, { label: "Lost & Found", icon: LuPackageSearch }]}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary-100 p-2">
            <LuPackageSearch className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lost & Found</h1>
            <p className="text-sm text-gray-500">
              Manage items and passenger claims
            </p>
          </div>
        </div>

        {activeTab === "items" && can(PermissionSlug.LOST_FOUND_CREATE) && (
          <Link
            to="/support/lost-found/create"
            className={cn(
              "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white",
              "transition-colors hover:bg-primary-600",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            )}
          >
            <LuPlus className="h-4 w-4" />
            Add Report
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-gray-200 bg-gray-100 p-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          const count =
            tab.key === "items"
              ? items.data?.meta?.total
              : claims.data?.meta?.total;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setTab(tab.key)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {count != null && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-gray-200 text-gray-500",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Items tab */}
      {activeTab === "items" && (
        <>
          <LostFoundFilters
            filters={items.filters}
            onFilterChange={items.handleFilterChange}
            onReset={items.handleResetFilters}
          />
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <Table
              columns={itemColumns}
              data={items.data?.data ?? []}
              isLoading={items.isLoading || items.isFetching}
              onRowClick={(item) => items.handleRowClick(item.id)}
              rowKey={(item) => item.id}
              emptyMessage="No lost & found reports found"
            />
            {items.data && (
              <div className="border-t border-gray-200 px-4 py-3">
                <Pagination
                  currentPage={items.data.meta.page}
                  totalPages={items.data.meta.pages}
                  pageSize={items.data.meta.limit}
                  totalItems={items.data.meta.total}
                  onPageChange={items.handlePageChange}
                  onPageSizeChange={items.handlePageSizeChange}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* Claims tab */}
      {activeTab === "claims" && (
        <>
          <ClaimFilters
            filters={claims.filters}
            onFilterChange={claims.handleFilterChange}
            onReset={claims.handleResetFilters}
          />
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <Table
              columns={claimColumns}
              data={claims.data?.data ?? []}
              isLoading={claims.isLoading || claims.isFetching}
              onRowClick={(claim) => claims.handleRowClick(claim.id)}
              rowKey={(claim) => claim.id}
              emptyMessage="No claims found"
            />
            {claims.data && (
              <div className="border-t border-gray-200 px-4 py-3">
                <Pagination
                  currentPage={claims.data.meta.page}
                  totalPages={claims.data.meta.pages}
                  pageSize={claims.data.meta.limit}
                  totalItems={claims.data.meta.total}
                  onPageChange={claims.handlePageChange}
                  onPageSizeChange={claims.handlePageSizeChange}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
