import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/form";
import { alertService } from "@/services/alert.service";
import { useCreateUserMutation, useUpdateUserMutation } from "@/features/user/api";
import type { IUser } from "@/features/user/types";
import { UserStatus } from "@/types";

interface UserFormValues {
  empId: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  status: UserStatus;
}

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editUser: IUser | null;
}

export function UserFormModal({ isOpen, onClose, editUser }: UserFormModalProps) {
  const isEdit = !!editUser;

  const [form, setForm] = useState<UserFormValues>({
    empId: editUser?.empId ?? "",
    name: editUser?.name ?? "",
    email: editUser?.email ?? "",
    phoneNumber: editUser?.phoneNumber ?? "",
    password: "",
    status: editUser?.status ?? UserStatus.ACTIVE,
  });

  useEffect(() => {
    setForm({
      empId: editUser?.empId ?? "",
      name: editUser?.name ?? "",
      email: editUser?.email ?? "",
      phoneNumber: editUser?.phoneNumber ?? "",
      password: "",
      status: editUser?.status ?? UserStatus.ACTIVE,
    });
  }, [isOpen, editUser]);

  const [createUser, { isLoading: creating }] = useCreateUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const isLoading = creating || updating;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateUser({
          id: editUser.id,
          body: {
            empId: form.empId || undefined,
            name: form.name,
            email: form.email,
            phoneNumber: form.phoneNumber,
            status: form.status,
          },
        }).unwrap();
        await alertService.success("Updated!", "User updated successfully.");
      } else {
        await createUser({
          empId: form.empId || undefined,
          name: form.name,
          email: form.email,
          phoneNumber: form.phoneNumber,
          password: form.password,
        }).unwrap();
        await alertService.success("Created!", "User created successfully.");
      }
      onClose();
    } catch {
      await alertService.error("Something went wrong.", "Error");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit User" : "Create New User"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Employee ID */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            name="empId"
            value={form.empId}
            onChange={handleChange}
            placeholder="e.g. EMP001"
            className={inputClass}
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        {/* Email + Phone (2-col) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Phone <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Status (edit only) */}
        {isEdit && (
          <Select
            label="Status"
            options={Object.values(UserStatus).map((s) => ({
              value: s,
              label: s,
            }))}
            value={form.status}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, status: val as UserStatus }))
            }
          />
        )}

        {/* Password (create only) */}
        {!isEdit && (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Min. 4 characters"
              className={inputClass}
            />
          </div>
        )}

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
            {isEdit ? "Save Changes" : "Create User"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
