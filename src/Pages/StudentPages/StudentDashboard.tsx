import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  FiBookOpen,
  FiBriefcase,
  FiClock,
  FiInbox,
} from "react-icons/fi";
import { HiArrowLongRight } from "react-icons/hi2";
import StudentPanel from "../../Components/Student/StudentPanel";
import StudentStatCard from "../../Components/Student/StudentStatCard";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import StatusBadge from "../../Components/Shared/StatusBadge";
import { metaApi } from "../../lib/endpoints";
import type { StudentDashboardStats } from "../../types/api";

const StudentDashboard = () => {
  const [stats, setStats] = useState<StudentDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    metaApi
      .myDashboard()
      .then((res) => setStats(res.data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load dashboard"),
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

  if (loading) return <LoadingSpinner label="Loading dashboard..." />;
  if (error || !stats) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
        {error || "Could not load dashboard"}
      </div>
    );
  }

  const pendingEnrollments = stats.enrollmentsByStatus.pending ?? 0;
  const pendingRequests = stats.serviceRequestsByStatus.pending ?? 0;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-5 text-white shadow-lg shadow-emerald-900/20 sm:p-6">
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl" />
        <div className="relative">
          <p className="text-xs font-medium tracking-wide text-emerald-100 uppercase">
            {todayLabel}
          </p>
          <h1 className="mt-1 text-xl font-bold sm:text-2xl">My dashboard</h1>
          <p className="mt-1 max-w-lg text-sm text-emerald-50/90">
            Track your course enrollments and service requests in one place.
          </p>
          {(pendingEnrollments > 0 || pendingRequests > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {pendingEnrollments > 0 && (
                <Link
                  to="/dashboard/enrollments"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-white/25"
                >
                  <FiClock size={13} />
                  {pendingEnrollments} pending enrollment
                  {pendingEnrollments > 1 ? "s" : ""}
                </Link>
              )}
              {pendingRequests > 0 && (
                <Link
                  to="/dashboard/service-requests"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm transition hover:bg-white/25"
                >
                  <FiInbox size={13} />
                  {pendingRequests} pending request
                  {pendingRequests > 1 ? "s" : ""}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StudentStatCard
          label="Total enrollments"
          value={stats.totals.enrollments}
          to="/dashboard/enrollments"
          icon={<FiBookOpen size={18} />}
          accent="emerald"
        />
        <StudentStatCard
          label="Total service requests"
          value={stats.totals.serviceRequests}
          to="/dashboard/service-requests"
          icon={<FiBriefcase size={18} />}
          accent="teal"
        />
        <StudentStatCard
          label="Pending enrollments"
          value={pendingEnrollments}
          to="/dashboard/enrollments"
          icon={<FiClock size={18} />}
          accent="amber"
        />
        <StudentStatCard
          label="Pending requests"
          value={pendingRequests}
          to="/dashboard/service-requests"
          icon={<FiInbox size={18} />}
          accent="cyan"
        />
      </div>

      {/* Recent activity */}
      <div className="grid gap-5 lg:grid-cols-2">
        <StudentPanel>
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Recent enrollments
            </h2>
            <Link
              to="/dashboard/enrollments"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
            >
              View all
              <HiArrowLongRight className="h-4 w-4" />
            </Link>
          </div>
          {stats.recentEnrollments.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/80 p-6 text-center dark:border-gray-700 dark:bg-gray-950/50">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No enrollments yet.
              </p>
              <Link
                to="/courses"
                className="mt-2 inline-block text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Browse courses
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {stats.recentEnrollments.map((item) => (
                <li
                  key={item._id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-3 transition hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-gray-800 dark:bg-gray-950/50 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      {item.courseSnapshot.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.enrollmentId}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          )}
        </StudentPanel>

        <StudentPanel>
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Recent service requests
            </h2>
            <Link
              to="/dashboard/service-requests"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
            >
              View all
              <HiArrowLongRight className="h-4 w-4" />
            </Link>
          </div>
          {stats.recentServiceRequests.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/80 p-6 text-center dark:border-gray-700 dark:bg-gray-950/50">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No requests yet.
              </p>
              <Link
                to="/services"
                className="mt-2 inline-block text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Browse services
              </Link>
            </div>
          ) : (
            <ul className="space-y-2">
              {stats.recentServiceRequests.map((item) => (
                <li
                  key={item._id}
                  className="flex items-start justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-3 transition hover:border-emerald-200 hover:bg-emerald-50/50 dark:border-gray-800 dark:bg-gray-950/50 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900 dark:text-white">
                      {item.serviceSnapshot.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.requestId}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </li>
              ))}
            </ul>
          )}
        </StudentPanel>
      </div>

      {/* Quick links */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          to="/courses"
          className="group flex items-center justify-between rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-800"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
              <FiBookOpen size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Browse courses</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enroll in free courses
              </p>
            </div>
          </div>
          <HiArrowLongRight className="h-5 w-5 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-emerald-500" />
        </Link>
        <Link
          to="/services"
          className="group flex items-center justify-between rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition hover:border-teal-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-800"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-950/60 dark:text-teal-300">
              <FiBriefcase size={18} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Browse services</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Request professional services
              </p>
            </div>
          </div>
          <HiArrowLongRight className="h-5 w-5 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-teal-500" />
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
