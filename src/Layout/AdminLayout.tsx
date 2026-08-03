import { useState } from "react";
import {
  FiHome,
  FiBriefcase,
  FiBookOpen,
  FiUsers,
  FiLogOut,
  FiMenu,
  FiX,
  FiUser,
  FiTag,
  FiClipboard,
  FiInbox,
  FiGlobe,
} from "react-icons/fi";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../Components/Shared/ThemeToggle";

const navItems = [
  { path: "/admin-panel", label: "Dashboard", icon: FiHome, end: true },
  {
    path: "/admin-panel/categories",
    label: "Categories",
    icon: FiTag,
  },
  {
    path: "/admin-panel/courses-management",
    label: "Courses",
    icon: FiBookOpen,
  },
  {
    path: "/admin-panel/services-management",
    label: "Services",
    icon: FiBriefcase,
  },
  {
    path: "/admin-panel/enrollments",
    label: "Enrollments",
    icon: FiClipboard,
  },
  {
    path: "/admin-panel/service-requests",
    label: "Requests",
    icon: FiInbox,
  },
  { path: "/admin-panel/users", label: "Users", icon: FiUsers },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin-panel/login");
  };

  const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white text-indigo-700 shadow-md shadow-indigo-900/20"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );

  const SidebarFooter = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="shrink-0 space-y-1 border-t border-white/10 p-3">
      <Link
        to="/"
        onClick={onNavigate}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
      >
        <FiGlobe size={18} />
        <span>View website</span>
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
      >
        <FiLogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-white/10 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-sm font-bold text-white">
          IG
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">IGSC Admin</p>
          <p className="truncate text-[11px] text-white/60">Control panel</p>
        </div>
      </div>
      <SidebarNav onNavigate={onNavigate} />
      <SidebarFooter onNavigate={onNavigate} />
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#f4f6fb] dark:bg-[#0b1220]">
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 hidden w-[17.5rem] flex-col bg-gradient-to-b from-slate-900 via-indigo-950 to-violet-950 shadow-2xl transition-transform duration-300 md:flex ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col bg-gradient-to-b from-slate-900 via-indigo-950 to-violet-950 shadow-2xl transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-end border-b border-white/10 px-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        </div>
        <SidebarContent onNavigate={() => setMobileMenuOpen(false)} />
      </aside>

      {/* Main */}
      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ${
          sidebarOpen ? "md:ml-[17.5rem]" : "md:ml-0"
        }`}
      >
        <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
                aria-label="Open menu"
              >
                <FiMenu size={22} />
              </button>
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:block dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Toggle sidebar"
              >
                <FiMenu size={20} />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
                </p>
                <p className="hidden truncate text-xs text-gray-500 sm:block dark:text-gray-400">
                  Manage IGSC content and requests
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <Link
                to="/"
                className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 sm:inline-flex sm:text-sm dark:border-gray-700 dark:text-gray-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
              >
                <FiGlobe size={15} />
                Website
              </Link>
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-1 pr-3 pl-1 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || (
                    <FiUser size={14} />
                  )}
                </div>
                <span className="hidden text-xs font-medium capitalize text-gray-700 sm:inline dark:text-gray-200">
                  {user?.role?.replace("Admin", " admin") || "Admin"}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
