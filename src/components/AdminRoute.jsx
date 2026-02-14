import { Navigate, Outlet } from "react-router";
import { useApp } from "../providers/AppProvider";
import NotFound from "../pages/NotFound";

export default function AdminRoute() {
  const { auth } = useApp();

  
  if (!auth) {
    return <Navigate to="/login" />;
  }


  if (auth.role !== "ADMIN") {
    return <NotFound />;
  }

  
  return <Outlet />;
}