import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuBriefcase,
  LuBuilding2,
  LuCalendar,
  LuCheck,
  LuEye,
  LuEyeOff,
  LuKeyRound,
  LuMail,
  LuPhone,
  LuShieldCheck,
  LuUser,
  LuX,
} from "react-icons/lu";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAppDispatch, useGetAuth } from "@/hooks";
import { changePassword, signOut } from "@/features/auth/slices";
import { CurrentUserService } from "@/services";
import { alertService } from "@/services";
import { cn } from "@/lib";
import { UserRole } from "@/types";

// ── Password strength ─────────────────────────────────────────────────────────

function getStrength(pwd: string): 0 | 1 | 2 | 3 {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score === 0) return 0;
  if (score === 1) return 1;
  if (score <= 3) return 2;
  return 3;
}

const STRENGTH_META = {
  0: { label: "", bars: 0, color: "" },
  1: { label: "Weak", bars: 1, color: "bg-red-400" },
  2: { label: "Fair", bars: 2, color: "bg-amber-400" },
  3: { label: "Strong", bars: 3, color: "bg-emerald-500" },
} as const;

// ── Field row ─────────────────────────────────────────────────────────────────

function FieldRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// ── Password input ────────────────────────────────────────────────────────────

function PasswordInput({
  id,
  label,
  value,
  onChange,
  disabled,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  error?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-gray-500"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          disabled={disabled}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-gray-900 outline-none transition-all",
            "placeholder:text-gray-300",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-gray-200",
            disabled && "cursor-not-allowed bg-gray-50 opacity-60",
          )}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          tabIndex={-1}
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600"
        >
          {show ? <LuEyeOff className="h-4 w-4" /> : <LuEye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── Badges ────────────────────────────────────────────────────────────────────

const ROLE_STYLE: Record<string, string> = {
  [UserRole.SUPER_ADMIN]: "bg-purple-500/15 text-purple-300 border-purple-500/20",
  [UserRole.ADMIN]: "bg-primary/15 text-primary border-primary/20",
  [UserRole.STAFF]: "bg-blue-500/15 text-blue-300 border-blue-500/20",
};
const ROLE_LABEL: Record<string, string> = {
  [UserRole.SUPER_ADMIN]: "Super Admin",
  [UserRole.ADMIN]: "Admin",
  [UserRole.STAFF]: "Staff",
};
const STATUS_STYLE: Record<string, string> = {
  Active: "bg-emerald-400/15 text-emerald-300 border-emerald-400/20",
  Probation: "bg-amber-400/15 text-amber-300 border-amber-400/20",
  Resigned: "bg-white/10 text-white/40 border-white/10",
};

// ── Change Password Modal ─────────────────────────────────────────────────────

function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const strength = getStrength(form.newPassword);
  const strengthMeta = STRENGTH_META[strength];

  const handleClose = () => {
    if (isSubmitting) return;
    setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
    onClose();
  };

  const validate = (): boolean => {
    const errs: Partial<typeof form> = {};
    if (!form.oldPassword) errs.oldPassword = "Current password is required";
    if (!form.newPassword) errs.newPassword = "New password is required";
    else if (form.newPassword.length < 8) errs.newPassword = "At least 8 characters";
    else if (strength < 2) errs.newPassword = "Password is too weak";
    if (!form.confirmPassword) errs.confirmPassword = "Please confirm your new password";
    else if (form.confirmPassword !== form.newPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await dispatch(
        changePassword({ oldPassword: form.oldPassword, newPassword: form.newPassword }),
      ).unwrap();
      await alertService.success(
        "Password changed",
        "Your password has been updated. Please sign in again.",
      );
      dispatch(signOut());
      navigate("/", { replace: true });
    } catch {
      await alertService.error("Incorrect current password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <LuKeyRound className="h-4 w-4 text-primary" />
              <DialogTitle className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Change Password
              </DialogTitle>
            </div>
            <button
              onClick={handleClose}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <LuX className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5 px-6 py-5">
            <PasswordInput
              id="old-password"
              label="Current Password"
              value={form.oldPassword}
              onChange={(v) => {
                setForm((f) => ({ ...f, oldPassword: v }));
                if (errors.oldPassword)
                  setErrors((e) => ({ ...e, oldPassword: undefined }));
              }}
              disabled={isSubmitting}
              error={errors.oldPassword}
            />

            <div className="h-px bg-gray-100" />

            <div className="space-y-1.5">
              <PasswordInput
                id="new-password"
                label="New Password"
                value={form.newPassword}
                onChange={(v) => {
                  setForm((f) => ({ ...f, newPassword: v }));
                  if (errors.newPassword)
                    setErrors((e) => ({ ...e, newPassword: undefined }));
                }}
                disabled={isSubmitting}
                error={errors.newPassword}
              />
              {form.newPassword && (
                <div className="pt-1">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-all duration-300",
                          i <= strengthMeta.bars ? strengthMeta.color : "bg-gray-100",
                        )}
                      />
                    ))}
                  </div>
                  {strengthMeta.label && (
                    <p
                      className={cn(
                        "mt-1 text-xs font-medium",
                        strength === 1 && "text-red-500",
                        strength === 2 && "text-amber-500",
                        strength === 3 && "text-emerald-600",
                      )}
                    >
                      {strengthMeta.label}
                    </p>
                  )}
                </div>
              )}
            </div>

            <PasswordInput
              id="confirm-password"
              label="Confirm New Password"
              value={form.confirmPassword}
              onChange={(v) => {
                setForm((f) => ({ ...f, confirmPassword: v }));
                if (errors.confirmPassword)
                  setErrors((e) => ({ ...e, confirmPassword: undefined }));
              }}
              disabled={isSubmitting}
              error={errors.confirmPassword}
            />

            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Password requirements
              </p>
              <ul className="space-y-1">
                {[
                  { ok: form.newPassword.length >= 8, text: "At least 8 characters" },
                  {
                    ok:
                      /[A-Z]/.test(form.newPassword) &&
                      /[a-z]/.test(form.newPassword),
                    text: "Upper & lowercase letters",
                  },
                  { ok: /[0-9]/.test(form.newPassword), text: "At least one number" },
                ].map(({ ok, text }) => (
                  <li
                    key={text}
                    className={cn(
                      "flex items-center gap-2 text-xs transition-colors",
                      ok ? "text-emerald-600" : "text-gray-400",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all",
                        ok
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-gray-200 bg-white",
                      )}
                    >
                      {ok && <LuCheck className="h-2.5 w-2.5" />}
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all",
                "bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/30 focus:outline-none",
                isSubmitting && "cursor-not-allowed opacity-60",
              )}
            >
              {isSubmitting ? "Saving…" : "Update Password"}
            </button>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export const ProfilePage = () => {
  const { currentUser } = useGetAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const info = useMemo(() => {
    if (!currentUser) return null;
    const svc = new CurrentUserService(currentUser);
    return {
      fullName: svc.getFullName(),
      displayName: svc.getDisplayName(),
      initials: svc.getInitials(),
      employeeId: currentUser.employee?.id ?? currentUser.user.empId ?? null,
      email: currentUser.user.email,
      phone: currentUser.employee?.phoneNumber ?? currentUser.user.phoneNumber ?? null,
      department: currentUser.employee?.department ?? null,
      position: currentUser.employee?.position ?? null,
      gender: currentUser.employee?.gender ?? null,
      dateOfBirth: currentUser.employee?.dateOfBirth ?? null,
      workLine: currentUser.employee?.workLine ?? null,
      profileUrl: svc.getProfileImageUrl(),
      roles: currentUser.user.roles ?? [],
      status: currentUser.employee?.status ?? null,
    };
  }, [currentUser]);

  if (!info) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50/60 px-4 py-10">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        {/* ── Identity header (dark) ── */}
        <div className="relative overflow-hidden bg-[#0d1b3e] px-8 py-10">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl" />

          <div className="relative flex items-center gap-6">
            {/* Avatar */}
            {info.profileUrl ? (
              <img
                src={info.profileUrl}
                alt={info.displayName}
                className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-4 ring-white/10"
              />
            ) : (
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-3xl font-bold text-primary ring-4 ring-primary/10">
                {info.initials}
              </div>
            )}

            {/* Identity text */}
            <div className="min-w-0 flex-1">
              {info.employeeId && (
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  {info.employeeId}
                </p>
              )}
              <h1 className="text-2xl font-bold text-white leading-tight">
                {info.fullName ?? info.displayName}
              </h1>
              {info.position && (
                <p className="mt-1 text-sm text-white/50">{info.position}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {info.roles.map((r) => (
                  <span
                    key={r.id}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                      ROLE_STYLE[r.role] ?? "bg-white/10 text-white/60 border-white/10",
                    )}
                  >
                    <LuShieldCheck className="h-3 w-3" />
                    {ROLE_LABEL[r.role] ?? r.role}
                  </span>
                ))}
                {info.status && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                      STATUS_STYLE[info.status] ?? "bg-white/10 text-white/40 border-white/10",
                    )}
                  >
                    {info.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Profile fields ── */}
        <div className="px-8 py-8">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            Profile Information
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FieldRow icon={LuUser}      label="Full Name"    value={info.fullName} />
            <FieldRow icon={LuMail}      label="Email"        value={info.email} />
            <FieldRow icon={LuPhone}     label="Phone"        value={info.phone} />
            <FieldRow icon={LuPhone}     label="Work Line"    value={info.workLine} />
            <FieldRow icon={LuBuilding2} label="Department"   value={info.department} />
            <FieldRow icon={LuBriefcase} label="Position"     value={info.position} />
            <FieldRow
              icon={LuCalendar}
              label="Date of Birth"
              value={
                info.dateOfBirth
                  ? new Date(info.dateOfBirth).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : null
              }
            />
            <FieldRow icon={LuUser} label="Gender" value={info.gender} />
          </div>
        </div>

        {/* ── Footer action ── */}
        <div className="border-t border-gray-100 px-8 py-5">
          <button
            onClick={() => setModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/8 px-4 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/15"
          >
            <LuKeyRound className="h-4 w-4" />
            Change Password
          </button>
        </div>
      </div>

      <ChangePasswordModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};
