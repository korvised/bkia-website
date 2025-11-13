import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { signOut } from "@/features/auth/slices";

export const useSignOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOut());
    } finally {
      navigate("/", { replace: true }); // Always redirect to sign-in
    }
  };

  return { handleSignOut };
};
