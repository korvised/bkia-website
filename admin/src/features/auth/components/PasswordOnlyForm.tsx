import { Link } from "react-router-dom";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { cn } from "@/lib";
import type { FormikProps } from "formik";
import type { SignInFormData } from "@/features/auth/types";

interface PasswordOnlyFormProps {
  formik: FormikProps<SignInFormData>;
  showPassword: boolean;
  onTogglePassword: () => void;
  onSwitchUser: () => void;
  userName: string;
}

export const PasswordOnlyForm = ({
  formik,
  showPassword,
  onTogglePassword,
  onSwitchUser,
  userName,
}: PasswordOnlyFormProps) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <LuLock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            autoFocus
            tabIndex={1}
            placeholder="Enter your password"
            className={cn(
              "block w-full rounded-lg border py-2.5 pr-10 pl-10 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:outline-none",
              formik.touched.password && formik.errors.password
                ? "border-danger bg-danger-50 focus:border-danger focus:ring-danger/20"
                : "focus:border-primary focus:ring-primary/20 border-gray-300 bg-white hover:border-gray-400",
            )}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 transition-colors"
            onClick={onTogglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <LuEyeOff className="h-5 w-5 text-gray-400 transition-colors hover:text-gray-600" />
            ) : (
              <LuEye className="h-5 w-5 text-gray-400 transition-colors hover:text-gray-600" />
            )}
          </button>
        </div>
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            formik.touched.password && formik.errors.password
              ? "max-h-10 opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger mt-1.5 flex items-center text-xs">
              <span className="bg-danger mr-1.5 inline-block h-1 w-1 rounded-full"></span>
              {formik.errors.password}
            </p>
          )}
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <Link
          to="/auth/forgot-password"
          tabIndex={3}
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        tabIndex={2}
        disabled={formik.isSubmitting}
        className={cn(
          "bg-primary hover:bg-primary-700 focus:ring-primary flex w-full items-center justify-center rounded-lg border border-transparent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-[0.98]",
          formik.isSubmitting && "cursor-not-allowed opacity-50",
        )}
      >
        {formik.isSubmitting ? (
          <>
            <svg
              className="mr-2.5 -ml-1 h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>

      {/* Switch Account */}
      <div className="text-center">
        <button
          type="button"
          onClick={onSwitchUser}
          className="hover:text-primary text-sm text-gray-600 transition-colors"
        >
          Not {userName}?{" "}
          <span className="text-primary font-medium">
            Sign in with different account
          </span>
        </button>
      </div>
    </form>
  );
};
