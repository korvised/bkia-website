import { useNavigate, useLocation } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoBack = (fallbackPath: string = "/home") => {
    const from = location.state?.from;

    if (from && typeof from === "object") {
      navigate(from.pathname + from.search);
    } else {
      navigate(fallbackPath);
    }
  };

  const onNavigate = (path: string) => {
    navigate(path, { state: { from: location } });
  };

  return { onGoBack, onNavigate };
};
