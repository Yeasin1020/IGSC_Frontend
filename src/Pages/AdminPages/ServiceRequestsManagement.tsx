import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import AdminAlert from "../../Components/Admin/AdminAlert";
import AdminFilterPills from "../../Components/Admin/AdminFilterPills";
import AdminPageHeader from "../../Components/Admin/AdminPageHeader";
import AdminPanel from "../../Components/Admin/AdminPanel";
import AdminTableShell, {
  AdminTableBody,
  AdminTableCell,
  AdminTableHead,
  AdminTableHeaderCell,
} from "../../Components/Admin/AdminTableShell";
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

const filterOptions = ["all", ...statuses] as const;
type StatusFilter = (typeof filterOptions)[number];

const ServiceRequestsManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";
  const [items, setItems] = useState<ServiceRequest[]>([]);
  const [status, setStatus] = useState<StatusFilter>(
    filterOptions.includes(initialStatus as StatusFilter)
      ? (initialStatus as StatusFilter)
      : "all",
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await serviceRequestsApi.list({
        status: status === "all" ? undefined : status,
        limit: 100,
      });
      setItems(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [status]);

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (status === "all") next.delete("status");
        else next.set("status", status);
        return next;
      },
      { replace: true },
    );
  }, [status, setSearchParams]);

  const updateStatus = async (id: string, nextStatus: string) => {
    try {
      await serviceRequestsApi.update(id, { status: nextStatus });
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed");
    }
  };

  const statusSelectClass =
    "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100";

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Service requests"
        subtitle="Track customer service orders"
      />

      <AdminFilterPills
        options={filterOptions}
        value={status}
        onChange={setStatus}
        labels={{ all: "All" }}
      />

      {error && <AdminAlert message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : items.length === 0 ? (
        <AdminPanel>
          <EmptyState title="No service requests found" />
        </AdminPanel>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {items.map((item) => (
              <AdminPanel key={item._id}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.requestId}
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
                      {item.customer.name}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {item.serviceSnapshot.title}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {item.customer.phone} · {item.customer.address}
                </p>
                <div className="mt-4">
                  <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                    Update status
                  </label>
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item._id, e.target.value)}
                    className={statusSelectClass}
                  >
                    {statuses.map((value) => (
                      <option key={value} value={value}>
                        {value.replace(/-/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </AdminPanel>
            ))}
          </div>

          <AdminTableShell className="hidden md:block">
            <AdminTableHead>
              <tr>
                <AdminTableHeaderCell>ID</AdminTableHeaderCell>
                <AdminTableHeaderCell>Customer</AdminTableHeaderCell>
                <AdminTableHeaderCell>Service</AdminTableHeaderCell>
                <AdminTableHeaderCell>Status</AdminTableHeaderCell>
                <AdminTableHeaderCell>Update</AdminTableHeaderCell>
              </tr>
            </AdminTableHead>
            <AdminTableBody>
              {items.map((item) => (
                <tr key={item._id}>
                  <AdminTableCell className="font-medium text-gray-900 dark:text-white">
                    {item.requestId}
                  </AdminTableCell>
                  <AdminTableCell>
                    <p>{item.customer.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.customer.phone} · {item.customer.address}
                    </p>
                  </AdminTableCell>
                  <AdminTableCell>{item.serviceSnapshot.title}</AdminTableCell>
                  <AdminTableCell>
                    <StatusBadge status={item.status} />
                  </AdminTableCell>
                  <AdminTableCell>
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item._id, e.target.value)}
                      className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                    >
                      {statuses.map((value) => (
                        <option key={value} value={value}>
                          {value.replace(/-/g, " ")}
                        </option>
                      ))}
                    </select>
                  </AdminTableCell>
                </tr>
              ))}
            </AdminTableBody>
          </AdminTableShell>
        </>
      )}
    </div>
  );
};

export default ServiceRequestsManagement;
