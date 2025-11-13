import { Outlet } from "react-router-dom";
import { useSignOut } from "@/features/auth/hooks";
import { Header } from "./header.tsx";

export const Layout = () => {
  const { handleSignOut } = useSignOut();

  return (
    <div>
      <Header onSignOut={handleSignOut} />
      <Outlet />
    </div>
  );
};
