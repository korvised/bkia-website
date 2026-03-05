import { useState } from "react";
import {
  LuPencil,
  LuTrash2,
  LuSearch,
  LuRefreshCw,
  LuChevronDown,
  LuKey,
} from "react-icons/lu";
import { Breadcrumb } from "@/components/ui";
import { alertService } from "@/services/alert.service";
import {
  useFetchPermissionsQuery,
  useDeletePermissionMutation,
} from "@/features/permission/api";
import type { IPermission } from "@/features/permission/types";
import { PermissionFormModal } from "@/features/permission/components";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getGroup(slug: string): string {
  return slug.split(":")[0] ?? "other";
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}

interface PermissionGroup {
  group: string;
  label: string;
  permissions: IPermission[];
}

function groupPermissions(permissions: IPermission[]): PermissionGroup[] {
  const map = new Map<string, IPermission[]>();
  for (const perm of permissions) {
    const g = getGroup(perm.slug);
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(perm);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([group, perms]) => ({
      group,
      label: capitalize(group),
      permissions: perms,
    }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function PermissionPage() {
  const [search, setSearch] = useState("");
  const [editPermission, setEditPermission] = useState<IPermission | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const { data: permissions = [], isLoading, refetch } = useFetchPermissionsQuery(
    { search: search || undefined },
  );
  const [deletePermission] = useDeletePermissionMutation();

  const groups = groupPermissions(permissions);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  };

  const handleDelete = async (perm: IPermission) => {
    const result = await alertService.confirmModal(
      "Delete Permission?",
      `"${perm.name}" will be permanently deleted.`,
    );
    if (!result.isConfirmed) return;
    try {
      await deletePermission(perm.id).unwrap();
      await alertService.success("Deleted!");
    } catch {
      await alertService.error("Failed to delete permission.", "Error");
    }
  };

  return (
    <div className="p-6">
      <Breadcrumb items={[{ label: "Settings" }, { label: "Permissions", icon: LuKey }]} />

      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Permission Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Permissions are seeded automatically. Assign them to individual users.
        </p>
      </div>

      {/* ── Filters ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative min-w-[220px] max-w-sm flex-1">
          <LuSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search permissions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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

      {/* ── Content ── */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : groups.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
          <LuKey className="mx-auto mb-3 h-8 w-8 text-gray-300" />
          <p className="text-sm text-gray-400">No permissions found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {groups.map((group) => {
            const isExpanded = expandedGroups.has(group.group);

            return (
              <div
                key={group.group}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Group header */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group.group)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50"
                >
                  <LuChevronDown
                    className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                  <LuKey className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="font-semibold text-gray-800">
                    {group.label}
                  </span>
                  <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                    {group.permissions.length}
                  </span>
                </button>

                {/* Permission rows */}
                {isExpanded && (
                  <div className="divide-y divide-gray-100 border-t border-gray-100">
                    {group.permissions.map((perm) => (
                      <div
                        key={perm.id}
                        className="flex items-center justify-between px-5 py-3 hover:bg-gray-50"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {perm.name}
                          </p>
                          <div className="mt-0.5 flex items-center gap-3">
                            <code className="text-xs text-gray-400">
                              {perm.slug}
                            </code>
                            {perm.description && (
                              <span className="text-xs text-gray-400">
                                — {perm.description}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4 flex items-center gap-1">
                          <button
                            onClick={() => setEditPermission(perm)}
                            title="Edit"
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-primary-50 hover:text-primary"
                          >
                            <LuPencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(perm)}
                            title="Delete"
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-danger-50 hover:text-danger"
                          >
                            <LuTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Edit Modal ── */}
      <PermissionFormModal
        isOpen={!!editPermission}
        onClose={() => setEditPermission(null)}
        editPermission={editPermission}
      />
    </div>
  );
}
