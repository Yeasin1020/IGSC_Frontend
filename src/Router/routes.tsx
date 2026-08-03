import { createBrowserRouter } from "react-router";
import CommonLayout from "../Layout/CommonLayout";
import AdminLayout from "../Layout/AdminLayout";
import StudentLayout from "../Layout/StudentLayout";
import ProtectedAdmin from "../Components/Shared/ProtectedAdmin";
import ProtectedStudent from "../Components/Shared/ProtectedStudent";
import AdminLogin from "../Pages/AdminPages/AdminLogin";
import { PublicRoutes } from "./PublicRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { StudentRoutes } from "./StudentRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    children: PublicRoutes,
  },
  {
    path: "/admin-panel/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-panel",
    element: (
      <ProtectedAdmin>
        <AdminLayout />
      </ProtectedAdmin>
    ),
    children: AdminRoutes,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedStudent>
        <StudentLayout />
      </ProtectedStudent>
    ),
    children: StudentRoutes,
  },
]);
