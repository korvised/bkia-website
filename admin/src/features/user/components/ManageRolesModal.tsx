import { LuPlus, LuX } from "react-icons/lu";
import { Modal } from "@/components/ui/modal";
import { alertService } from "@/services/alert.service";
import {
  useAddUserRolesMutation,
  useFetchUserByIdQuery,
  useRemoveUserRolesMutation,
} from "@/features/user/api";
import type { IUser } from "@/features/user/types";
import { useFetchRolesQuery } from "@/features/role/api";
import type { IRole } from "@/features/role/types";
import { RoleBadge } from "@/features/role/components";

interface ManageRolesModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}

export function ManageRolesModal({ isOpen, onClose, user }: ManageRolesModalProps) {
  // Fetch live user data so roles update immediately after assign/remove
  const { data: liveUser } = useFetchUserByIdQuery(user?.id ?? "", {
    skip: !isOpen || !user,
  });
  const { data: allRoles = [], isLoading: rolesLoading } = useFetchRolesQuery(
    {},
    { skip: !isOpen || !user },
  );
  const [addRoles, { isLoading: adding }] = useAddUserRolesMutation();
  const [removeRoles, { isLoading: removing }] = useRemoveUserRolesMutation();
  const isLoading = adding || removing;

  if (!user) return null;

  // Use live data when available, fall back to prop
  const currentUser = liveUser ?? user;
  const userRoleIds = new Set(currentUser.roles.map((r) => r.id));

  const handleToggle = async (role: IRole) => {
    try {
      if (userRoleIds.has(role.id)) {
        await removeRoles({ id: user.id, roles: [{ role: role.id }] }).unwrap();
      } else {
        await addRoles({ id: user.id, roles: [{ role: role.id }] }).unwrap();
      }
    } catch {
      await alertService.error("Failed to update roles.", "Error");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Roles — ${user.name}`}
      maxWidth="max-w-md"
    >
      {rolesLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : allRoles.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">No roles available.</p>
      ) : (
        <div className="space-y-2">
          {allRoles.map((role) => {
            const assigned = userRoleIds.has(role.id);
            return (
              <div
                key={role.id}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
                  assigned
                    ? "border-primary-200 bg-primary-50/40"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <RoleBadge role={role.role} />
                  {role.description && (
                    <p className="mt-1 text-xs text-gray-500">{role.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleToggle(role)}
                  disabled={isLoading}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
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
