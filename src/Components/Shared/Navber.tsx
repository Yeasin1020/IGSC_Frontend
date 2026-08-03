import { Link, NavLink } from "react-router";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const Navber = () => {
  const { user, isAdmin, logout } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-2.5 py-1.5 text-[13px] font-medium transition ${
      isActive
        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-gray-800 dark:hover:text-white"
    }`;

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className={linkClass}>
          Services
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses" className={linkClass}>
          Courses
        </NavLink>
      </li>
      <li>
        <NavLink to="/health-campaign" className={linkClass}>
          Health Campaign
        </NavLink>
      </li>
      <li>
        <NavLink to="/about-us" className={linkClass}>
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/community" className={linkClass}>
          Community
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-2 px-3 sm:h-14 sm:px-5 lg:px-6">
        {/* Left: menu + logo */}
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <div className="dropdown lg:hidden">
            <button
              type="button"
              tabIndex={0}
              aria-label="Open menu"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-gray-800"
            >
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
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            >
              {navItems}
              {isAdmin ? (
                <li className="mt-1 border-t border-slate-100 pt-1 dark:border-gray-800">
                  <Link to="/admin-panel" className={linkClass({ isActive: false })}>
                    Admin panel
                  </Link>
                </li>
              ) : user ? (
                <>
                  <li className="mt-1 border-t border-slate-100 pt-1 dark:border-gray-800">
                    <Link to="/dashboard" className={linkClass({ isActive: false })}>
                      My dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => logout()}
                      className="w-full rounded-md px-2.5 py-1.5 text-left text-[13px] font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="mt-1 border-t border-slate-100 pt-1 dark:border-gray-800">
                  <Link
                    to="/admin-panel/login"
                    className={linkClass({ isActive: false })}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <Link to="/" className="min-w-0 shrink-0">
            <Logo />
          </Link>
        </div>

        {/* Center links — desktop */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-0.5">{navItems}</ul>
        </nav>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <ThemeToggle className="!h-8 !w-8 !min-h-0" />

          <div className="dropdown dropdown-end hidden sm:block">
            <button
              type="button"
              tabIndex={0}
              className="rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-gray-800"
            >
              {user ? user.name.split(" ")[0] : "Account"}
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-2 w-44 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-900"
            >
              {isAdmin && (
                <li>
                  <Link to="/admin-panel" className={linkClass({ isActive: false })}>
                    Admin panel
                  </Link>
                </li>
              )}
              {user && !isAdmin && (
                <li>
                  <Link to="/dashboard" className={linkClass({ isActive: false })}>
                    My dashboard
                  </Link>
                </li>
              )}
              {user ? (
                <li>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="w-full rounded-md px-2.5 py-1.5 text-left text-[13px] font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/admin-panel/login"
                    className={linkClass({ isActive: false })}
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <a
            href="/#partnership"
            className="inline-flex h-8 items-center rounded-md bg-slate-900 px-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 sm:px-3 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Collaborate
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navber;
