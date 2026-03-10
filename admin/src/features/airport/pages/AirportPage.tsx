import { LuPlus, LuBuilding2 } from "react-icons/lu";
import { Breadcrumb, Pagination, Table } from "@/components/ui";
import { cn } from "@/lib";
import { usePermissions } from "@/hooks";
import { PermissionSlug } from "@/types/enum.type";
import { AirportFilters, AirportModal } from "../components";
import { useGetAirports, useAirportColumns } from "../hooks";

export function AirportPage() {
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
    editAirport,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleDelete,
    handleToggleActive,
  } = useGetAirports();

  const columns = useAirportColumns({
    onEdit: handleOpenEdit,
    onDelete: handleDelete,
    onToggleActive: handleToggleActive,
    canEdit: can(PermissionSlug.AIRPORT_UPDATE),
    canDelete: can(PermissionSlug.AIRPORT_DELETE),
    canToggleActive: can(PermissionSlug.AIRPORT_UPDATE),
  });

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Flight Management" },
          { label: "Airports", icon: LuBuilding2 },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <LuBuilding2 className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Airports</h1>
            <p className="text-sm text-gray-500">
              Manage airports and their information
            </p>
          </div>
        </div>
        {can(PermissionSlug.AIRPORT_CREATE) && (
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
            Add Airport
          </button>
        )}
      </div>

      {/* Filters */}
      <AirportFilters
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
          emptyMessage="No airports found"
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
      <AirportModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        editAirport={editAirport}
      />
    </div>
  );
}
