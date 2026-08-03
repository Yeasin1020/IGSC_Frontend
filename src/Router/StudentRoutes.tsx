import StudentDashboard from "../Pages/StudentPages/StudentDashboard";
import MyEnrollments from "../Pages/StudentPages/MyEnrollments";
import MyServiceRequests from "../Pages/StudentPages/MyServiceRequests";

export const StudentRoutes = [
  {
    index: true,
    element: <StudentDashboard />,
  },
  {
    path: "enrollments",
    element: <MyEnrollments />,
  },
  {
    path: "service-requests",
    element: <MyServiceRequests />,
  },
];
