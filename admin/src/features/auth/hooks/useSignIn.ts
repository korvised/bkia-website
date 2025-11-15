import { useState, useEffect, useMemo, useCallback } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useGetAuth } from "@/hooks";
import { tokenStorageService } from "@/services";
import { getErrorMessage } from "@/utils";
import { signIn } from "@/features/auth/slices";
import { signInSchema } from "@/features/auth/schemas";
import { authStorageService } from "@/features/auth/services";
import type {
  SignInFormData,
  SignInPayload,
  RememberedUserData,
} from "@/features/auth/types";

export const useSignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isInitialized, isAuthenticated } = useGetAuth();

  const [showPassword, setShowPassword] = useState(false);

  // Memoize remembered user to avoid re-reading from localStorage on every render
  const rememberedUser = useMemo<RememberedUserData | null>(
    () => authStorageService.getUser(),
    []
  );

  const [useRememberedUser, setUseRememberedUser] = useState(() => !!rememberedUser);
  const [currentRememberedUser, setCurrentRememberedUser] = useState(rememberedUser);

  // Redirect if already authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isInitialized, isAuthenticated, navigate]);

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
        if (values.rememberMe) {
          authStorageService.saveUser(result);
        }

        // Navigate to dashboard or home
        navigate("/home", { replace: true });
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setFieldError("password", errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Auto-fill username from remembered user on mount
  useEffect(() => {
    if (currentRememberedUser && useRememberedUser) {
      formik.setFieldValue("username", currentRememberedUser.user.email);
      formik.setFieldValue("rememberMe", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveRemembered = useCallback(() => {
    authStorageService.clearUser();
    setCurrentRememberedUser(null);
    setUseRememberedUser(false);
    formik.setFieldValue("username", "");
    formik.setFieldValue("password", "");
    formik.setFieldValue("rememberMe", false);
  }, [formik]);

  const handleSwitchUser = useCallback(() => {
    setUseRememberedUser(false);
    formik.setFieldValue("username", "");
    formik.setFieldValue("password", "");
  }, [formik]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Memoize computed values
  const userName = useMemo(() => {
    if (!currentRememberedUser) return "";
    return currentRememberedUser.employee
      ? currentRememberedUser.employee.firstName
      : currentRememberedUser.user.name;
  }, [currentRememberedUser]);

  return {
    formik,
    showPassword,
    togglePasswordVisibility,
    rememberedUser: currentRememberedUser,
    useRememberedUser,
    userName,
    handleRemoveRemembered,
    handleSwitchUser,
  };
};
