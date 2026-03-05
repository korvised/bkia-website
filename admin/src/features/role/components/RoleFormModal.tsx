import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { Modal } from "@/components/ui/modal";
import { alertService } from "@/services/alert.service";
import { useCreateRoleMutation, useUpdateRoleMutation } from "@/features/role/api";
import type { IRole, ICreateRolePayload } from "@/features/role/types";
import { UserRole } from "@/types";
import { RoleBadge } from "./RoleBadge.tsx";

interface RoleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editRole: IRole | null;
}

export function RoleFormModal({ isOpen, onClose, editRole }: RoleFormModalProps) {
  const isEdit = !!editRole;

  const [roleEnum, setRoleEnum] = useState<UserRole>(
    (editRole?.role as UserRole) ?? UserRole.STAFF,
  );
  const [description, setDescription] = useState(editRole?.description ?? "");
  const [isActive, setIsActive] = useState(editRole?.isActive ?? true);

  useEffect(() => {
    setRoleEnum((editRole?.role as UserRole) ?? UserRole.STAFF);
    setDescription(editRole?.description ?? "");
    setIsActive(editRole?.isActive ?? true);
  }, [isOpen, editRole]);

  const [createRole, { isLoading: creating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: updating }] = useUpdateRoleMutation();
  const isLoading = creating || updating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateRole({
          roleName: editRole.role,
          body: { description: description || undefined, status: isActive },
        }).unwrap();
        await alertService.success("Updated!", "Role updated successfully.");
      } else {
        const payload: ICreateRolePayload = {
          role: roleEnum,
          description: description || undefined,
          status: isActive,
        };
        await createRole(payload).unwrap();
        await alertService.success("Created!", "Role created successfully.");
      }
      onClose();
    } catch {
      await alertService.error("Something went wrong.", "Error");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Role" : "Create New Role"}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role selector */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Role <span className="text-danger">*</span>
          </label>
          {isEdit ? (
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
              <RoleBadge role={editRole.role} />
              <span className="text-xs text-gray-400">(cannot be changed)</span>
            </div>
          ) : (
            <select
              value={roleEnum}
              onChange={(e) => setRoleEnum(e.target.value as UserRole)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {Object.values(UserRole)
                .filter((r) => r !== UserRole.SUPER_ADMIN)
                .map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
            </select>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe this role's responsibilities..."
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Active toggle */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-gray-900">Active</p>
            <p className="text-xs text-gray-500">
              Inactive roles cannot be assigned to users
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsActive((v) => !v)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isActive ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:opacity-60"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <LuCheck className="h-4 w-4" />
            )}
            {isEdit ? "Save Changes" : "Create Role"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
