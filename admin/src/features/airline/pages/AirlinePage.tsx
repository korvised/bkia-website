import { LuPlus, LuPlaneTakeoff } from "react-icons/lu";
import { Breadcrumb, Pagination, Table } from "@/components/ui";
import { cn } from "@/lib";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import { AirlineFilters, AirlineModal } from "../components";
import { useGetAirlines, useAirlineColumns } from "../hooks";

export function AirlinePage() {
  const { can } = usePermissions();

  const {
    data,
    filters,
    isLoading,
    isFetching,
    modalOpen,
    editAirline,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleDelete,
    handleToggleActive,
  } = useGetAirlines();

  const columns = useAirlineColumns({
    onEdit: handleOpenEdit,
    onDelete: handleDelete,
    onToggleActive: handleToggleActive,
    canEdit: can(PermissionSlug.AIRLINE_UPDATE),
    canDelete: can(PermissionSlug.AIRLINE_DELETE),
    canToggleActive: can(PermissionSlug.AIRLINE_UPDATE),
  });

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Flight Management" },
          { label: "Airlines", icon: LuPlaneTakeoff },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <LuPlaneTakeoff className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Airlines</h1>
            <p className="text-sm text-gray-500">
              Manage airlines and their information
            </p>
          </div>
        </div>
        {can(PermissionSlug.AIRLINE_CREATE) && (
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
            Add Airline
          </button>
        )}
      </div>

      {/* Filters */}
      <AirlineFilters
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
          rowKey={(item) => item.id}
          emptyMessage="No airlines found"
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

      {/* Create / Edit Modal */}
      <AirlineModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        editAirline={editAirline}
      />
    </div>
  );
}
