import AboutUsPage from "../Pages/CommonPages/AboutUsPage";
import CommunityPage from "../Pages/CommonPages/CommunityPage";
import CourseDetailPage from "../Pages/CommonPages/CourseDetailPage";
import HealthCampaignPage from "../Pages/CommonPages/HealthCampaignPage";
import HomePage from "../Pages/CommonPages/HomePage";
import ServiceDetailPage from "../Pages/CommonPages/ServiceDetailPage";
import ServicesPage from "../Pages/CommonPages/ServicesPage";
import CoursesPage from "../Pages/CoursesPage";

export const PublicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/services/:slug",
    element: <ServiceDetailPage />,
  },
  {
    path: "/courses",
    element: <CoursesPage />,
  },
  {
    path: "/courses/:slug",
    element: <CourseDetailPage />,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  {
    path: "/health-campaign",
    element: <HealthCampaignPage />,
  },
  {
    path: "/about-us",
    element: <AboutUsPage />,
  },
];
