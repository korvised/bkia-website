import { useState } from "react";
import { LuChevronDown, LuKey, LuPlus, LuX } from "react-icons/lu";
import { Modal } from "@/components/ui/modal";
import { alertService } from "@/services/alert.service";
import {
  useAddUserPermissionsMutation,
  useFetchUserByIdQuery,
  useRemoveUserPermissionsMutation,
} from "@/features/user/api";
import type { IUser } from "@/features/user/types";
import { useFetchPermissionsQuery } from "@/features/permission/api";
import type { IPermission } from "@/features/permission/types";

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

// ─── Component ────────────────────────────────────────────────────────────────
interface ManagePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}

export function ManagePermissionsModal({
  isOpen,
  onClose,
  user,
}: ManagePermissionsModalProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const { data: liveUser } = useFetchUserByIdQuery(user?.id ?? "", {
    skip: !isOpen || !user,
  });
  const { data: allPermissions = [], isLoading: permsLoading } =
    useFetchPermissionsQuery({}, { skip: !isOpen || !user });

  const [addPermissions, { isLoading: adding }] = useAddUserPermissionsMutation();
  const [removePermissions, { isLoading: removing }] =
    useRemoveUserPermissionsMutation();
  const isLoading = adding || removing;

  if (!user) return null;

  const currentUser = liveUser ?? user;
  const userPermIds = new Set(currentUser.permissions?.map((p) => p.id) ?? []);
  const groups = groupPermissions(allPermissions);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  };

  const handleToggle = async (perm: IPermission) => {
    try {
      if (userPermIds.has(perm.id)) {
        await removePermissions({
          id: user.id,
          permissions: [{ permission: perm.id }],
        }).unwrap();
      } else {
        await addPermissions({
          id: user.id,
          permissions: [{ permission: perm.id }],
        }).unwrap();
      }
    } catch {
      await alertService.error("Failed to update permissions.", "Error");
    }
  };

  const handleGroupToggleAll = async (group: PermissionGroup) => {
    const groupIds = group.permissions.map((p) => p.id);
    const allAssigned = groupIds.every((id) => userPermIds.has(id));
    try {
      if (allAssigned) {
        await removePermissions({
          id: user.id,
          permissions: groupIds.map((id) => ({ permission: id })),
        }).unwrap();
      } else {
        const unassigned = group.permissions.filter((p) => !userPermIds.has(p.id));
        await addPermissions({
          id: user.id,
          permissions: unassigned.map((p) => ({ permission: p.id })),
        }).unwrap();
      }
    } catch {
      await alertService.error("Failed to update permissions.", "Error");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Permissions — ${user.name}`}
      maxWidth="max-w-2xl"
    >
      {permsLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : allPermissions.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">
          No permissions available. Create some first.
        </p>
      ) : (
        <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
          {groups.map((group) => {
            const isExpanded = expandedGroups.has(group.group);
            const assignedCount = group.permissions.filter((p) =>
              userPermIds.has(p.id),
            ).length;
            const total = group.permissions.length;
            const allAssigned = assignedCount === total;
            const someAssigned = assignedCount > 0 && !allAssigned;

            return (
              <div
                key={group.group}
                className="overflow-hidden rounded-lg border border-gray-200"
              >
                {/* Group header */}
                <div
                  className={`flex items-center justify-between px-4 py-3 transition-colors ${
                    someAssigned || allAssigned ? "bg-primary-50/50" : "bg-gray-50"
                  }`}
                >
                  {/* Left: expand toggle + group info */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.group)}
                    className="flex flex-1 items-center gap-2 text-left"
                  >
                    <LuChevronDown
                      className={`h-4 w-4 flex-shrink-0 text-gray-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                    <LuKey className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span className="font-medium text-gray-800">{group.label}</span>
                    {/* count badge */}
                    <span
                      className={`ml-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        allAssigned
                          ? "bg-primary text-white"
                          : someAssigned
                            ? "bg-primary-100 text-primary-700"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {assignedCount}/{total}
                    </span>
                  </button>

                  {/* Right: assign/remove all */}
                  <button
                    type="button"
                    onClick={() => handleGroupToggleAll(group)}
                    disabled={isLoading}
                    className={`ml-2 flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                      allAssigned
                        ? "bg-danger-50 text-danger hover:bg-danger-100"
                        : "bg-primary-50 text-primary hover:bg-primary-100"
                    }`}
                  >
                    {allAssigned ? (
                      <>
                        <LuX className="h-3 w-3" /> Remove all
                      </>
                    ) : (
                      <>
                        <LuPlus className="h-3 w-3" /> Assign all
                      </>
                    )}
                  </button>
                </div>

                {/* Permission rows */}
                {isExpanded && (
                  <div className="divide-y divide-gray-100 border-t border-gray-100">
                    {group.permissions.map((perm) => {
                      const assigned = userPermIds.has(perm.id);
                      return (
                        <div
                          key={perm.id}
                          className={`flex items-center justify-between px-4 py-2.5 transition-colors ${
                            assigned ? "bg-primary-50/30" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              {perm.name}
                            </p>
                            <code className="text-xs text-gray-400">{perm.slug}</code>
                            {perm.description && (
                              <p className="mt-0.5 text-xs text-gray-500">
                                {perm.description}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleToggle(perm)}
                            disabled={isLoading}
                            className={`ml-3 flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
                              assigned
                                ? "bg-danger-50 text-danger hover:bg-danger-100"
                                : "bg-primary-50 text-primary hover:bg-primary-100"
                            }`}
                          >
                            {assigned ? (
                              <>
                                <LuX className="h-3 w-3" /> Remove
                              </>
                            ) : (
                              <>
                                <LuPlus className="h-3 w-3" /> Assign
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex justify-end border-t border-gray-100 pt-4">
        <button
          onClick={onClose}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
