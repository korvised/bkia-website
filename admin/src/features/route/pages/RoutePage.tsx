import { LuPlus, LuRoute } from "react-icons/lu";
import { Breadcrumb, Pagination, Table } from "@/components/ui";
import { cn } from "@/lib";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import { RouteFilters, RouteModal } from "../components";
import { useGetRoutes, useRouteColumns } from "../hooks";

export function RoutePage() {
  const { can } = usePermissions();

  const {
    paginatedData,
    filters,
    isLoading,
    isFetching,
    page,
    pageSize,
    total,
    totalPages,
    modalOpen,
    editRoute,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleDelete,
    handleToggleActive,
  } = useGetRoutes();

  const columns = useRouteColumns({
    onEdit: handleOpenEdit,
    onDelete: handleDelete,
    onToggleActive: handleToggleActive,
    canEdit: can(PermissionSlug.ROUTE_UPDATE),
    canDelete: can(PermissionSlug.ROUTE_DELETE),
    canToggleActive: can(PermissionSlug.ROUTE_UPDATE),
  });

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Flight Management" },
          { label: "Routes", icon: LuRoute },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <LuRoute className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Routes</h1>
            <p className="text-sm text-gray-500">
              Manage flight routes between airports
            </p>
          </div>
        </div>
        {can(PermissionSlug.ROUTE_CREATE) && (
          <button
            type="button"
            onClick={handleOpenCreate}
            className={cn(
              "bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white",
              "hover:bg-primary-600 transition-colors",
              "focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none",
            )}
          >
            <LuPlus className="h-4 w-4" />
            Add Route
          </button>
        )}
      </div>

      {/* Filters */}
      <RouteFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Table
          columns={columns}
          data={paginatedData}
          isLoading={isLoading || isFetching}
          rowKey={(item) => item.id}
          emptyMessage="No routes found"
        />

        <div className="border-t border-gray-200 px-4 py-3">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>

      {/* Create / Edit Modal */}
      <RouteModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        editRoute={editRoute}
      />
    </div>
  );
}
