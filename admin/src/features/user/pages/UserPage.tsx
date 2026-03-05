import { useState } from "react";
import {
  LuKey,
  LuPlus,
  LuPencil,
  LuShield,
  LuSearch,
  LuRefreshCw,
} from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { Table, type Column } from "@/components/ui/table/table.tsx";
import { Pagination } from "@/components/ui/table/pagination.tsx";
import { usePagination } from "@/hooks";
import { useFetchUsersQuery } from "@/features/user/api";
import type { IUser } from "@/features/user/types";
import { RoleBadge } from "@/features/role/components";
import {
  StatusBadge,
  UserFormModal,
  ManageRolesModal,
  ManagePermissionsModal,
} from "@/features/user/components";
import { Select } from "@/components/ui/form";
import { UserStatus } from "@/types";

// ─── Page ─────────────────────────────────────────────────────────────────────
export function UserPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState<IUser | null>(null);
  const [rolesUser, setRolesUser] = useState<IUser | null>(null);
  const [permissionsUser, setPermissionsUser] = useState<IUser | null>(null);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useFetchUsersQuery({
    email: search || undefined,
    status: statusFilter || undefined,
  });

  const { page, pageSize, paginatedData, total, totalPages, handlePageChange, handlePageSizeChange } =
    usePagination(users);

  const columns: Column<IUser>[] = [
    {
      key: "name",
      header: "Name",
      render: (u) => (
        <div>
          <p className="font-medium text-gray-900">{u.name}</p>
          <p className="text-xs text-gray-400">{u.empId ?? "—"}</p>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (u) => <span className="text-sm text-gray-600">{u.email}</span>,
    },
    {
      key: "phoneNumber",
      header: "Phone",
      render: (u) => (
        <span className="text-sm text-gray-500">{u.phoneNumber}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (u) => <StatusBadge status={u.status} />,
    },
    {
      key: "roles",
      header: "Roles",
      render: (u) =>
        u.roles.length ? (
          <div className="flex flex-wrap gap-1">
            {u.roles.map((r) => (
              <RoleBadge key={r.id} role={r.role} showIcon={false} />
            ))}
          </div>
        ) : (
          <span className="text-xs text-gray-400">No roles</span>
        ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (u) => (
        <span className="text-sm text-gray-400">
          {new Date(u.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-32",
      render: (u) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setEditUser(u)}
            title="Edit user"
            className="hover:bg-primary-50 hover:text-primary rounded-lg p-2 text-gray-400 transition-colors"
          >
            <LuPencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => setRolesUser(u)}
            title="Manage roles"
            className="hover:bg-secondary-50 hover:text-secondary rounded-lg p-2 text-gray-400 transition-colors"
          >
            <LuShield className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPermissionsUser(u)}
            title="Manage permissions"
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
          >
            <LuKey className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: "Settings" }, { label: "Users", icon: LuShield }]} />

      {/* ── Header ── */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage system users, their status, and role assignments.
          </p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="bg-primary hover:bg-primary-600 flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors"
        >
          <LuPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* ── Filters ── */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm min-w-[200px] flex-1">
          <LuSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 pl-9 text-sm outline-none focus:ring-1"
          />
        </div>
        <div className="w-40 shrink-0">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "", label: "All Statuses" },
              ...Object.values(UserStatus).map((s) => ({ value: s, label: s })),
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
          rowKey={(u) => u.id}
          emptyMessage="No users found."
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
      <UserFormModal
        isOpen={createOpen || !!editUser}
        onClose={() => {
          setCreateOpen(false);
          setEditUser(null);
        }}
        editUser={editUser}
      />
      <ManageRolesModal
        isOpen={!!rolesUser}
        onClose={() => setRolesUser(null)}
        user={rolesUser}
      />
      <ManagePermissionsModal
        isOpen={!!permissionsUser}
        onClose={() => setPermissionsUser(null)}
        user={permissionsUser}
      />
    </div>
  );
}
