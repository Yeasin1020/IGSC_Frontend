import { Outlet } from "react-router";
import Navber from "../Components/Shared/Navber";
import Footer from "../Components/Shared/Footer";

const CommonLayout = () => {
  return (
    <div className="min-h-dvh w-full overflow-x-clip bg-gray-50 text-gray-800 dark:bg-[#0b1220] dark:text-gray-100">
      <Navber />
      <main className="relative w-full overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
