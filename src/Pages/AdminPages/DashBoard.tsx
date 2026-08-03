import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FiBookOpen,
  FiBriefcase,
  FiClipboard,
  FiInbox,
  FiTag,
  FiUsers,
  FiAlertCircle,
} from "react-icons/fi";
import AdminPageHeader from "../../Components/Admin/AdminPageHeader";
import AdminPanel from "../../Components/Admin/AdminPanel";
import AdminStatCard from "../../Components/Admin/AdminStatCard";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import StatusBadge from "../../Components/Shared/StatusBadge";
import { metaApi } from "../../lib/endpoints";
import type { DashboardStats } from "../../types/api";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DashBoard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    metaApi
      .dashboard()
      .then((res) => setStats(res.data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load stats"),
      )
      .finally(() => setLoading(false));
  }, []);

  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [],
  );

  const chartMax = useMemo(() => {
    if (!stats?.monthlyEnrollments?.length) return 1;
    return Math.max(...stats.monthlyEnrollments.map((m) => m.count), 1);
  }, [stats]);

  if (loading) return <LoadingSpinner label="Loading dashboard..." />;
  if (error || !stats) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
        {error || "No dashboard data"}
      </div>
    );
  }

  const statCards = [
    {
      label: "Courses",
      value: stats.totals.courses,
      to: "/admin-panel/courses-management",
      icon: <FiBookOpen size={18} />,
      accent: "indigo" as const,
    },
    {
      label: "Services",
      value: stats.totals.services,
      to: "/admin-panel/services-management",
      icon: <FiBriefcase size={18} />,
      accent: "violet" as const,
    },
    {
      label: "Categories",
      value: stats.totals.categories,
      to: "/admin-panel/categories",
      icon: <FiTag size={18} />,
      accent: "cyan" as const,
    },
    {
      label: "Users",
      value: stats.totals.users,
      to: "/admin-panel/users",
      icon: <FiUsers size={18} />,
      accent: "emerald" as const,
    },
    {
      label: "Enrollments",
      value: stats.totals.enrollments,
      to: "/admin-panel/enrollments",
      icon: <FiClipboard size={18} />,
      accent: "amber" as const,
    },
    {
      label: "Service requests",
      value: stats.totals.serviceRequests,
      to: "/admin-panel/service-requests",
      icon: <FiInbox size={18} />,
      accent: "rose" as const,
    },
  ];

  const actionItems = [
    {
      label: "Pending enrollments",
      count: stats.actionRequired.pendingEnrollments,
      to: "/admin-panel/enrollments?status=pending",
      urgent: stats.actionRequired.pendingEnrollments > 0,
    },
    {
      label: "Pending service requests",
      count: stats.actionRequired.pendingServiceRequests,
      to: "/admin-panel/service-requests?status=pending",
      urgent: stats.actionRequired.pendingServiceRequests > 0,
    },
    {
      label: "New partnerships",
      count: stats.actionRequired.newPartnerships,
      to: "/#partnership",
      urgent: stats.actionRequired.newPartnerships > 0,
    },
    {
      label: "Unapproved testimonials",
      count: stats.actionRequired.unapprovedTestimonials,
      to: "/",
      urgent: stats.actionRequired.unapprovedTestimonials > 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-5 text-white shadow-lg sm:p-6 dark:border-indigo-900">
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-violet-400/20 blur-2xl" />
        <div className="relative">
          <p className="text-xs font-medium tracking-wider text-indigo-200 uppercase">
            {todayLabel}
          </p>
          <h1 className="mt-2 text-xl font-bold sm:text-2xl">
            IGSC Admin Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm text-indigo-100">
            Overview of courses, services, enrollments, and requests — everything
            that needs your attention in one place.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {stats.actionRequired.pendingEnrollments} pending enrollments
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {stats.actionRequired.pendingServiceRequests} pending requests
            </span>
          </div>
        </div>
      </div>

      <AdminPageHeader
        title="Quick stats"
        subtitle="Tap a card to manage that section"
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        {statCards.map((card) => (
          <AdminStatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Needs attention */}
      <AdminPanel title="Needs attention">
        <div className="grid gap-3 sm:grid-cols-2">
          {actionItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition hover:shadow-sm ${
                item.urgent
                  ? "border-amber-200 bg-amber-50 hover:border-amber-300 dark:border-amber-900/60 dark:bg-amber-950/30"
                  : "border-gray-100 bg-gray-50 hover:border-gray-200 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    item.urgent
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  <FiAlertCircle size={16} />
                </div>
                <span className="truncate text-sm font-medium text-gray-800 dark:text-gray-100">
                  {item.label}
                </span>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                  item.urgent
                    ? "bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {item.count}
              </span>
            </Link>
          ))}
        </div>
      </AdminPanel>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Top courses */}
        <AdminPanel title="Top courses">
          {stats.topCourses.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No courses yet
            </p>
          ) : (
            <ul className="space-y-4">
              {stats.topCourses.map((course) => {
                const pct =
                  course.seats > 0
                    ? Math.min(
                        100,
                        Math.round((course.totalEnrolled / course.seats) * 100),
                      )
                    : Math.min(100, course.totalEnrolled * 10);
                return (
                  <li key={course._id}>
                    <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                      <span className="truncate font-medium text-gray-800 dark:text-gray-100">
                        {course.title}
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {course.totalEnrolled} enrolled
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </AdminPanel>

        {/* Monthly enrollments */}
        <AdminPanel title="Enrollments (last 6 months)">
          {stats.monthlyEnrollments.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No enrollment data yet
            </p>
          ) : (
            <div className="flex h-40 items-end justify-between gap-2 sm:gap-3">
              {stats.monthlyEnrollments.map((item) => {
                const height = Math.max(
                  8,
                  Math.round((item.count / chartMax) * 100),
                );
                return (
                  <div
                    key={`${item.year}-${item.month}`}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {item.count}
                    </span>
                    <div
                      className="w-full max-w-[2.5rem] rounded-t-lg bg-gradient-to-t from-indigo-600 to-indigo-400 dark:from-indigo-500 dark:to-indigo-300"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] font-medium text-gray-500 sm:text-xs dark:text-gray-400">
                      {monthNames[item.month - 1]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </AdminPanel>
      </div>

      {/* Recent activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentActivity
          title="Recent enrollments"
          viewAll="/admin-panel/enrollments"
          items={stats.recentEnrollments.map((item) => ({
            id: item._id,
            primary: item.applicant?.name || item.enrollmentId,
            secondary: item.courseSnapshot?.title,
            meta: item.enrollmentId,
            badge: item.status,
          }))}
        />
        <RecentActivity
          title="Recent service requests"
          viewAll="/admin-panel/service-requests"
          items={stats.recentServiceRequests.map((item) => ({
            id: item._id,
            primary: item.customer?.name || item.requestId,
            secondary: item.serviceSnapshot?.title,
            meta: item.requestId,
            badge: item.status,
          }))}
        />
      </div>
    </div>
  );
};

const RecentActivity = ({
  title,
  viewAll,
  items,
}: {
  title: string;
  viewAll: string;
  items: {
    id: string;
    primary: string;
    secondary?: string;
    meta?: string;
    badge: string;
  }[];
}) => (
  <AdminPanel>
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
        {title}
      </h2>
      <Link
        to={viewAll}
        className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
      >
        View all
      </Link>
    </div>

    {items.length === 0 ? (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Nothing here yet
      </p>
    ) : (
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50/80 p-3 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-950/50"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {item.primary}
              </p>
              {item.secondary && (
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {item.secondary}
                </p>
              )}
              {item.meta && (
                <p className="mt-0.5 text-[11px] text-gray-400 dark:text-gray-500">
                  {item.meta}
                </p>
              )}
            </div>
            <div className="shrink-0 self-start sm:self-center">
              <StatusBadge status={item.badge} />
            </div>
          </li>
        ))}
      </ul>
    )}
  </AdminPanel>
);

export default DashBoard;
