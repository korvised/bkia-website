import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { tokenStorageService } from "@/services";
import { getErrorMessage } from "@/utils";
import { signIn } from "@/features/auth/slices";
import { authStorageService } from "@/features/auth/services";
import type {
  RememberedUserData,
  SignInFormData,
  SignInPayload,
} from "@/features/auth/types";
import { signInSchema } from "@/features/auth/schemas";

export const useSignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik<SignInFormData>({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: signInSchema,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        // Normalize username to lowercase for checking
        const normalizedUsername = values.username.toLowerCase().trim();

        // Determine if username is email or employee ID
        const isEmail = normalizedUsername.includes("@");

        let payload: SignInPayload;

        if (isEmail) {
          payload = {
            type: "email",
            value: normalizedUsername,
            password: values.password,
          };
        } else {
          // Clean employee ID - remove bkia- or bkia prefix (case insensitive)
          // Extract only the 5-digit number
          const cleanedId = normalizedUsername.replace(/^bkia-?/i, "");
          payload = {
            type: "employeeId",
            value: cleanedId, // Send only the 5-digit number
            password: values.password,
          };
        }

        // Set remember me preference
        tokenStorageService.setRememberMe(values.rememberMe);

        const result = await dispatch(signIn(payload)).unwrap();

        // Save user data if remember me is checked
        if (values.rememberMe && result.user) {
          const rememberedData: RememberedUserData = {
            employeeId: result.user.empId,
            email: result.user.email,
            nameEn: result.user.name,
            nameLa: result.user.name,
          };
          authStorageService.saveUser(rememberedData);
        }

        // Navigate to dashboard or home
        navigate("/");
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setFieldError("password", errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
