import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "@/lib";
import { useSignInForm } from "@/features/auth/hooks";
import BkiaLogo from "@/assets/images/bkia-logo.png";

export const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useSignInForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <img
              src={BkiaLogo}
              alt="Bokeo International Airport"
              className="h-28 w-auto object-contain"
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-700">
            Website Admin Management
          </h1>
        </div>

        {/* Sign In Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-1.5 text-sm text-gray-600">
              Enter your credentials to access the admin panel
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Email or Employee ID
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <FaUser className="h-4.5 w-4.5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="user@bkia.com or bkia-12345"
                  className={cn(
                    "block w-full rounded-lg border py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:outline-none",
                    formik.touched.username && formik.errors.username
                      ? "border-danger bg-danger-50 focus:ring-danger/20 focus:border-danger"
                      : "focus:ring-primary/20 focus:border-primary border-gray-300 bg-white hover:border-gray-400",
                  )}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="text-danger mt-1.5 flex items-center text-xs">
                  <span className="bg-danger mr-1.5 inline-block h-1 w-1 rounded-full"></span>
                  {formik.errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-primary hover:text-primary-700 text-xs font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <FaLock className="h-4.5 w-4.5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={cn(
                    "block w-full rounded-lg border py-2.5 pr-10 pl-10 text-sm text-gray-900 placeholder-gray-400 transition-all focus:ring-2 focus:outline-none",
                    formik.touched.password && formik.errors.password
                      ? "border-danger bg-danger-50 focus:ring-danger/20 focus:border-danger"
                      : "focus:ring-primary/20 focus:border-primary border-gray-300 bg-white hover:border-gray-400",
                  )}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4.5 w-4.5 text-gray-400 transition-colors hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-4.5 w-4.5 text-gray-400 transition-colors hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-danger mt-1.5 flex items-center text-xs">
                  <span className="bg-danger mr-1.5 inline-block h-1 w-1 rounded-full"></span>
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center pt-1">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="text-primary focus:ring-primary h-4 w-4 cursor-pointer rounded border-gray-300 transition-colors"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block cursor-pointer text-sm text-gray-700 select-none"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={cn(
                "bg-primary hover:bg-primary-700 focus:ring-primary flex w-full items-center justify-center rounded-lg border border-transparent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md focus:ring-2 focus:ring-offset-2 focus:outline-none active:scale-[0.98]",
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
          </form>

          {/* Divider */}
          <div className="mt-7 border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-500">
              Need access? Contact your system administrator
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Bokeo International Airport. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};
