import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const Navber = () => {
  const { user, isAdmin, logout } = useAuth();

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/courses">Courses</NavLink>
      </li>
      <li>
        <NavLink to="/health-campaign">Health Campaign</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/community">Community</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 w-full bg-white px-3 text-gray-800 shadow-sm md:px-6 dark:bg-gray-900 dark:text-gray-100 dark:shadow-black/30">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-box bg-white p-2 shadow dark:bg-gray-800 dark:text-gray-100">
            {navItems}
            {isAdmin ? (
              <li className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-700 lg:hidden">
                <Link to="/admin-panel">Admin panel</Link>
              </li>
            ) : user ? (
              <>
                <li className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-700 lg:hidden">
                  <Link to="/dashboard">My dashboard</Link>
                </li>
                <li>
                  <button type="button" onClick={() => logout()}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-700 lg:hidden">
                <Link to="/admin-panel/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center">
          <Logo />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end gap-1">
        <ThemeToggle />

        <div className="dropdown dropdown-end hidden sm:block">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm px-2 text-xs font-medium normal-case"
          >
            {user ? user.name.split(" ")[0] : "Account"}
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-2 w-44 rounded-box bg-white p-2 shadow dark:bg-gray-800"
          >
            {isAdmin && (
              <li>
                <Link to="/admin-panel">Admin panel</Link>
              </li>
            )}
            {user && !isAdmin && (
              <li>
                <Link to="/dashboard">My dashboard</Link>
              </li>
            )}
            {user ? (
              <li>
                <button type="button" onClick={() => logout()}>
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/admin-panel/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

        <a href="/#partnership" className="btn">
          Collaborate
        </a>
      </div>
    </div>
  );
};

export default Navber;
