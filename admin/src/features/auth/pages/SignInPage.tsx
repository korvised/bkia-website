import { useSignIn } from "@/features/auth/hooks";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { PasswordOnlyForm } from "@/features/auth/components/PasswordOnlyForm";
import { RememberMeCard } from "@/features/auth/components/RememberMeCard";
import BkiaLogo from "@/assets/images/bkia-logo.png";

export const SignInPage = () => {
  const {
    formik,
    showPassword,
    togglePasswordVisibility,
    rememberedUser,
    useRememberedUser,
    userName,
    handleRemoveRemembered,
    handleSwitchUser,
  } = useSignIn();

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
          <h1 className="text-xl font-extrabold text-gray-600">
            Website Content Management System
          </h1>
        </div>

        {/* Sign In Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">
              {rememberedUser && useRememberedUser
                ? `Welcome back, ${userName}!`
                : "Sign In"}
            </h2>
            <p className="mt-1.5 text-sm text-gray-600">
              {rememberedUser && useRememberedUser
                ? "Please enter your password to continue"
                : "Enter your credentials to access the admin panel"}
            </p>
          </div>

          {/* Remembered User Card - shown when using remembered user */}
          {rememberedUser && useRememberedUser && (
            <div className="mb-6">
              <RememberMeCard
                userData={rememberedUser}
                onRemove={handleRemoveRemembered}
                isSelected={true}
              />
            </div>
          )}

          {/* Form - conditional rendering based on remembered user */}
          {rememberedUser && useRememberedUser ? (
            <PasswordOnlyForm
              formik={formik}
              showPassword={showPassword}
              onTogglePassword={togglePasswordVisibility}
              onSwitchUser={handleSwitchUser}
              userName={userName}
            />
          ) : (
            <SignInForm
              formik={formik}
              showPassword={showPassword}
              onTogglePassword={togglePasswordVisibility}
            />
          )}

          {/* Divider - only show when not using remembered user */}
          {!(rememberedUser && useRememberedUser) && (
            <div className="mt-7 border-t border-gray-200 pt-6">
              <p className="text-center text-sm text-gray-500">
                Need access? Contact your system administrator
              </p>
            </div>
          )}
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
