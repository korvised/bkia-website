import { useState } from "react";
import { LuPlus, LuPencil, LuTrash2, LuRefreshCw, LuShield } from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { Table, type Column } from "@/components/ui/table/table.tsx";
import { Pagination } from "@/components/ui/table/pagination.tsx";
import { alertService } from "@/services/alert.service";
import { usePagination } from "@/hooks";
import {
  useFetchRolesQuery,
  useDeleteRoleMutation,
} from "@/features/role/api";
import type { IRole } from "@/features/role/types";
import { Select } from "@/components/ui/form";
import { RoleBadge, RoleFormModal } from "@/features/role/components";

// ─── Active Status Badge ──────────────────────────────────────────────────────
function ActiveBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isActive
          ? "bg-primary-50 text-primary-700"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-primary" : "bg-gray-400"}`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function RolePage() {
  const [filterActive, setFilterActive] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editRole, setEditRole] = useState<IRole | null>(null);

  const queryParams =
    filterActive !== "" ? { isActive: filterActive === "true" } : {};
  const { data: roles = [], isLoading, refetch } = useFetchRolesQuery(queryParams);
  const [deleteRole] = useDeleteRoleMutation();

  const { page, pageSize, paginatedData, total, totalPages, handlePageChange, handlePageSizeChange } =
    usePagination(roles);

  const handleDelete = async (role: IRole) => {
    const result = await alertService.confirmModal(
      "Delete Role?",
      `"${role.role}" will be permanently deleted.`,
    );
    if (!result.isConfirmed) return;
    try {
      await deleteRole(role.role).unwrap();
      await alertService.success("Deleted!");
    } catch {
      await alertService.error("Failed to delete role.", "Error");
    }
  };

  const columns: Column<IRole>[] = [
    {
      key: "role",
      header: "Role",
      render: (r) => <RoleBadge role={r.role} />,
    },
    {
      key: "description",
      header: "Description",
      render: (r) => (
        <span className="text-sm text-gray-500">{r.description ?? "—"}</span>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (r) => <ActiveBadge isActive={r.isActive} />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-24",
      render: (r) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setEditRole(r)}
            title="Edit role"
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-primary-50 hover:text-primary"
          >
            <LuPencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(r)}
            title="Delete role"
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-danger-50 hover:text-danger"
          >
            <LuTrash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: "Settings" }, { label: "Roles", icon: LuShield }]} />

      {/* ── Header ── */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Define and manage system roles. Roles are assigned to users to control
            their access level.
          </p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-600"
        >
          <LuPlus className="h-4 w-4" />
          Add Role
        </button>
      </div>

      {/* ── Filters ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="w-40 shrink-0">
          <Select
            value={filterActive}
            onChange={setFilterActive}
            options={[
              { value: "", label: "All Statuses" },
              { value: "true", label: "Active" },
              { value: "false", label: "Inactive" },
            ]}
          />
        </div>
        <button
          onClick={() => refetch()}
          title="Refresh"
          className="rounded-lg border border-gray-300 p-2 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
        >
          <LuRefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* ── Table Card ── */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <Table
          columns={columns}
          data={paginatedData}
          isLoading={isLoading}
          rowKey={(r) => r.id}
          emptyMessage="No roles found."
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          className="border-t border-gray-100 px-4 py-3"
        />
      </div>

      {/* ── Modals ── */}
      <RoleFormModal
        isOpen={createOpen || !!editRole}
        onClose={() => {
          setCreateOpen(false);
          setEditRole(null);
        }}
        editRole={editRole}
      />
    </div>
  );
}
