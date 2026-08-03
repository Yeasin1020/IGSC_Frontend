import CategoriesManagement from "../Pages/AdminPages/CategoriesManagement";
import CoursesManagement from "../Pages/AdminPages/CoursesManagement";
import DashBoard from "../Pages/AdminPages/DashBoard";
import EnrollmentsManagement from "../Pages/AdminPages/EnrollmentsManagement";
import ServiceRequestsManagement from "../Pages/AdminPages/ServiceRequestsManagement";
import ServicesManagement from "../Pages/AdminPages/ServicesManagement";
import UsersManagement from "../Pages/AdminPages/UsersManagement";

export const AdminRoutes = [
  {
    index: true,
    element: <DashBoard />,
  },
  {
    path: "categories",
    element: <CategoriesManagement />,
  },
  {
    path: "services-management",
    element: <ServicesManagement />,
  },
  {
    path: "courses-management",
    element: <CoursesManagement />,
  },
  {
    path: "enrollments",
    element: <EnrollmentsManagement />,
  },
  {
    path: "service-requests",
    element: <ServiceRequestsManagement />,
  },
  {
    path: "users",
    element: <UsersManagement />,
  },
];
