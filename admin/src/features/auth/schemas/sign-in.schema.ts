import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .test("valid-username", "Invalid email or employee ID format", (value) => {
      if (!value) return false;

      // Check if it's an email with @bkia.com (case insensitive)
      const emailRegex = /^[^\s@]+@bkia\.com$/i;
      if (emailRegex.test(value)) return true;

      // Check if it's an employee ID (5 digits, can start with bkia or bkia- case insensitive)
      const empIdRegex = /^(bkia-?)?(\d{5})$/i;
      if (empIdRegex.test(value)) return true;

      return false;
    }),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
  rememberMe: Yup.boolean(),
});
