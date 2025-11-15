import { RouterProvider } from "react-router-dom";
import { useAuthInit } from "@/features/auth/hooks";
import { routers } from "@/routes";

export default function App() {
  useAuthInit();

  return <RouterProvider router={routers} />;
}
