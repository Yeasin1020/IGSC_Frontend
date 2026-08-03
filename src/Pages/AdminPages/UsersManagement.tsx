import { useEffect, useState } from "react";
import AdminAlert from "../../Components/Admin/AdminAlert";
import AdminButton from "../../Components/Admin/AdminButton";
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
import { usersApi } from "../../lib/endpoints";
import type { User } from "../../types/api";

const UsersManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await usersApi.list({ limit: 100 });
      setUsers(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = async (user: User) => {
    const next = user.status === "active" ? "blocked" : "active";
    try {
      await usersApi.updateStatus(user._id, next);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed");
    }
  };

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Users"
        subtitle="Accounts created from enrollment and service requests"
      />

      {error && <AdminAlert message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <AdminPanel>
          <EmptyState title="No users yet" />
        </AdminPanel>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {users.map((user) => (
              <AdminPanel key={user._id}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                      user.status === "active"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
                <p className="mt-2 text-xs capitalize text-gray-500 dark:text-gray-400">
                  Role: {user.role}
                </p>
                {user.role !== "superAdmin" && (
                  <div className="mt-4">
                    <AdminButton variant="secondary" onClick={() => toggleStatus(user)}>
                      {user.status === "active" ? "Block user" : "Unblock user"}
                    </AdminButton>
                  </div>
                )}
              </AdminPanel>
            ))}
          </div>

          <AdminTableShell className="hidden md:block">
            <AdminTableHead>
              <tr>
                <AdminTableHeaderCell>Name</AdminTableHeaderCell>
                <AdminTableHeaderCell>Email</AdminTableHeaderCell>
                <AdminTableHeaderCell>Role</AdminTableHeaderCell>
                <AdminTableHeaderCell>Status</AdminTableHeaderCell>
                <AdminTableHeaderCell>Action</AdminTableHeaderCell>
              </tr>
            </AdminTableHead>
            <AdminTableBody>
              {users.map((user) => (
                <tr key={user._id}>
                  <AdminTableCell className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </AdminTableCell>
                  <AdminTableCell>{user.email}</AdminTableCell>
                  <AdminTableCell className="capitalize">{user.role}</AdminTableCell>
                  <AdminTableCell>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        user.status === "active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </AdminTableCell>
                  <AdminTableCell>
                    {user.role !== "superAdmin" && (
                      <AdminButton variant="ghost" onClick={() => toggleStatus(user)}>
                        {user.status === "active" ? "Block" : "Unblock"}
                      </AdminButton>
                    )}
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

export default UsersManagement;
