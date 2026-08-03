import { useEffect, useState } from "react";
import { Link } from "react-router";
import StudentAlert from "../../Components/Student/StudentAlert";
import StudentButton from "../../Components/Student/StudentButton";
import StudentFilterPills from "../../Components/Student/StudentFilterPills";
import StudentPageHeader from "../../Components/Student/StudentPageHeader";
import StudentPanel from "../../Components/Student/StudentPanel";
import EmptyState from "../../Components/Shared/EmptyState";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import StatusBadge from "../../Components/Shared/StatusBadge";
import { serviceRequestsApi } from "../../lib/endpoints";
import type { ServiceRequest } from "../../types/api";

const statuses = [
  "pending",
  "in-review",
  "in-progress",
  "completed",
  "cancelled",
] as const;

const filterOptions = ["", ...statuses] as const;

const MyServiceRequests = () => {
  const [items, setItems] = useState<ServiceRequest[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await serviceRequestsApi.my({
        status: status || undefined,
        limit: 50,
        sort: "-createdAt",
      });
      setItems(res.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load service requests",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  const handleCancel = async (id: string) => {
    if (!confirm("Cancel this service request?")) return;
    setCancellingId(id);
    try {
      await serviceRequestsApi.cancel(id);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Cancel failed");
    } finally {
      setCancellingId(null);
    }
  };

  const canCancel = (itemStatus: string) =>
    itemStatus === "pending" || itemStatus === "in-review";

  return (
    <div className="space-y-5">
      <StudentPageHeader
        title="My services"
        subtitle="Service requests you have submitted — track status here"
        action={
          <StudentButton to="/services" className="w-full sm:w-auto">
            Browse services
          </StudentButton>
        }
      />

      <StudentFilterPills
        options={filterOptions}
        value={status}
        onChange={setStatus}
        labels={{ "": "All" }}
      />

      {error && <StudentAlert message={error} />}

      {loading ? (
        <LoadingSpinner label="Loading service requests..." />
      ) : items.length === 0 ? (
        <StudentPanel>
          <EmptyState
            title="No service requests yet"
            description="Request a service and track its progress here."
          />
        </StudentPanel>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {items.map((item) => (
              <StudentPanel key={item._id}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      to={`/services/${item.serviceSnapshot.slug}`}
                      className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      {item.serviceSnapshot.title}
                    </Link>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {item.requestId}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "—"}
                </p>
                {item.adminNote && (
                  <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                    Note: {item.adminNote}
                  </p>
                )}
                {canCancel(item.status) && (
                  <div className="mt-4">
                    <StudentButton
                      variant="danger"
                      fullWidth
                      disabled={cancellingId === item._id}
                      onClick={() => handleCancel(item._id)}
                    >
                      {cancellingId === item._id ? "Cancelling..." : "Cancel request"}
                    </StudentButton>
                  </div>
                )}
              </StudentPanel>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm md:block dark:border-gray-800 dark:bg-gray-900">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50/80 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:border-gray-800 dark:bg-gray-950/80 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Admin note</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3.5 font-medium text-gray-900 dark:text-white">
                      {item.requestId}
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        to={`/services/${item.serviceSnapshot.slug}`}
                        className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                      >
                        {item.serviceSnapshot.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 dark:text-gray-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="max-w-xs px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400">
                      {item.adminNote || "—"}
                    </td>
                    <td className="px-4 py-3.5">
                      {canCancel(item.status) ? (
                        <StudentButton
                          variant="danger"
                          disabled={cancellingId === item._id}
                          onClick={() => handleCancel(item._id)}
                          className="px-3 py-1.5 text-xs"
                        >
                          {cancellingId === item._id ? "..." : "Cancel"}
                        </StudentButton>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyServiceRequests;
