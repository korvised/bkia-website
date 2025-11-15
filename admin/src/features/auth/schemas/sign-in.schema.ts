import * as Yup from "yup";
import { config } from "@/config";

export const signInSchema = Yup.object().shape({
  username: Yup.string()
    .required("Email or employee ID is required")
    .test(
      "valid-username",
      "Invalid email or employee ID format",
      function (value) {
        if (!value) return false;

        // Normalize to lowercase and trim whitespace
        const normalizedValue = value.toLowerCase().trim();

        // Check if it's an email with domain from config
        if (normalizedValue.includes("@")) {
          // Create regex pattern with config domain
          // Escape dots in domain for regex
          const domain = config.mailDomain.replace(/\./g, "\\.");
          const emailRegex = new RegExp(`^[^\\s@]+${domain}$`);
          return emailRegex.test(normalizedValue);
        }

        // Check if it's an employee ID
        // Remove any bkia or bkia- prefix first
        const withoutPrefix = normalizedValue.replace(/^bkia-?/, "");

        // Check if what remains is exactly 5 digits
        const digitRegex = /^\d{4}$/;
        return digitRegex.test(withoutPrefix);
      },
    ),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters"),
  rememberMe: Yup.boolean(),
});
