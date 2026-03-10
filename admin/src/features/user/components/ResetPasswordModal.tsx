import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { LuX, LuEye, LuEyeOff } from "react-icons/lu";
import { cn } from "@/lib";
import { alertService } from "@/services/alert.service";
import { useResetUserPasswordMutation } from "@/features/user/api";
import type { IUser } from "@/features/user/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}

export function ResetPasswordModal({ isOpen, onClose, user }: Props) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [resetPassword, { isLoading }] = useResetUserPasswordMutation();

  useEffect(() => {
    if (isOpen) {
      setNewPassword("");
      setConfirmPassword("");
      setShowNew(false);
      setShowConfirm(false);
      setErrors({});
    }
  }, [isOpen]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!newPassword) errs.newPassword = "New password is required.";
    else if (newPassword.length < 4) errs.newPassword = "Password must be at least 4 characters.";
    if (!confirmPassword) errs.confirmPassword = "Please confirm the password.";
    else if (newPassword !== confirmPassword) errs.confirmPassword = "Passwords do not match.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !user) return;

    try {
      await resetPassword({ id: user.id, newPassword }).unwrap();
      await alertService.success("Password Reset", `Password for ${user.name} has been reset successfully.`);
      onClose();
    } catch {
      await alertService.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Reset Password
            </DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <LuX className="h-5 w-5" />
            </button>
          </div>

          {/* User info */}
          {user && (
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-3">
              <p className="text-sm text-gray-500">
                Resetting password for{" "}
                <span className="font-medium text-gray-800">{user.name}</span>
                {user.empId && (
                  <span className="ml-1 text-gray-400">({user.empId})</span>
                )}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 px-6 py-5">
              {/* New Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className={cn(
                      "w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1",
                      errors.newPassword
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:border-primary focus:ring-primary",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className={cn(
                      "w-full rounded-lg border px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1",
                      errors.confirmPassword
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:border-primary focus:ring-primary",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white transition-colors",
                  isLoading
                    ? "cursor-not-allowed bg-primary/60"
                    : "bg-primary hover:bg-primary-600",
                )}
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
