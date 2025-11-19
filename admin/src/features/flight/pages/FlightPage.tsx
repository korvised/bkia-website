import { LuPlane, LuPlus } from "react-icons/lu";
import { Breadcrumb, Pagination, Table } from "@/components/ui";
import { cn } from "@/lib";
import { FlightFilters } from "../components";
import { useFlightColumns, useGetFlights } from "../hooks";
import { Link } from "react-router-dom";

export function FlightPage() {
  const {
    data,
    airlines,
    isLoading,
    isFetching,
    isLoadingAirlines,
    filters,
    sortDirection,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleRowClick,
  } = useGetFlights();

  const columns = useFlightColumns();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Flights", icon: LuPlane }]} />

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 rounded-lg p-2">
            <LuPlane className="text-primary h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Flights</h1>
            <p className="text-sm text-gray-500">
              Manage flight schedules and information
            </p>
          </div>
        </div>
        <Link
          to="/flights/create"
          className={cn(
            "bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white",
            "hover:bg-primary-600 transition-colors",
            "focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none",
          )}
        >
          <LuPlus className="h-4 w-4" />
          Add Flight
        </Link>
      </div>

      {/* Filters */}
      <FlightFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        airlines={airlines}
        isLoadingAirlines={isLoadingAirlines}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <Table
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading || isFetching}
          sortKey={filters.sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
          onRowClick={handleRowClick}
          rowKey={(flight) => flight.id}
          emptyMessage="No flights found"
        />

        {/* Pagination */}
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
