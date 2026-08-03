import { useEffect, useState, type FormEvent } from "react";
import AdminAlert from "../../Components/Admin/AdminAlert";
import AdminButton from "../../Components/Admin/AdminButton";
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
import Modal from "../../Components/Shared/Modal";
import { categoriesApi } from "../../lib/endpoints";
import type { Category, CategoryType } from "../../types/api";

const emptyForm = {
  name: "",
  type: "course" as CategoryType,
  description: "",
  icon: "",
  serial: 0,
  isActive: true,
};

const CategoriesManagement = () => {
  const [items, setItems] = useState<Category[]>([]);
  const [typeFilter, setTypeFilter] = useState<"all" | CategoryType>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await categoriesApi.list({
        type: typeFilter === "all" ? undefined : typeFilter,
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
  }, [typeFilter]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setForm({
      name: category.name,
      type: category.type,
      description: category.description || "",
      icon: category.icon || "",
      serial: category.serial || 0,
      isActive: category.isActive,
    });
    setOpen(true);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editing) {
        await categoriesApi.update(editing._id, {
          name: form.name,
          description: form.description || undefined,
          icon: form.icon || undefined,
          serial: Number(form.serial),
          isActive: form.isActive,
        });
      } else {
        await categoriesApi.create({
          name: form.name,
          type: form.type,
          description: form.description || undefined,
          icon: form.icon || undefined,
          serial: Number(form.serial),
          isActive: form.isActive,
        });
      }
      setOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      await categoriesApi.remove(id);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Categories"
        subtitle="Manage course and service categories"
        action={
          <AdminButton onClick={openCreate} className="w-full sm:w-auto">
            Add category
          </AdminButton>
        }
      />

      <AdminFilterPills
        options={["all", "course", "service"] as const}
        value={typeFilter}
        onChange={setTypeFilter}
      />

      {error && !open && <AdminAlert message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : items.length === 0 ? (
        <AdminPanel>
          <EmptyState title="No categories yet" description="Create your first category." />
        </AdminPanel>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {items.map((item) => (
              <AdminPanel key={item._id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.slug}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.isActive
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {item.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="rounded-lg bg-gray-100 px-2 py-1 capitalize dark:bg-gray-800">
                    {item.type}
                  </span>
                  <span className="rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-800">
                    {item.itemCount ?? 0} items
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <AdminButton variant="ghost" onClick={() => openEdit(item)}>
                    Edit
                  </AdminButton>
                  <AdminButton variant="danger" onClick={() => onDelete(item._id)}>
                    Delete
                  </AdminButton>
                </div>
              </AdminPanel>
            ))}
          </div>

          <AdminTableShell className="hidden md:block">
            <AdminTableHead>
              <tr>
                <AdminTableHeaderCell>Name</AdminTableHeaderCell>
                <AdminTableHeaderCell>Type</AdminTableHeaderCell>
                <AdminTableHeaderCell>Items</AdminTableHeaderCell>
                <AdminTableHeaderCell>Status</AdminTableHeaderCell>
                <AdminTableHeaderCell>Actions</AdminTableHeaderCell>
              </tr>
            </AdminTableHead>
            <AdminTableBody>
              {items.map((item) => (
                <tr key={item._id}>
                  <AdminTableCell>
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.slug}</p>
                  </AdminTableCell>
                  <AdminTableCell className="capitalize">{item.type}</AdminTableCell>
                  <AdminTableCell>{item.itemCount ?? 0}</AdminTableCell>
                  <AdminTableCell>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.isActive
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {item.isActive ? "Active" : "Hidden"}
                    </span>
                  </AdminTableCell>
                  <AdminTableCell>
                    <div className="flex gap-1">
                      <AdminButton variant="ghost" onClick={() => openEdit(item)}>
                        Edit
                      </AdminButton>
                      <AdminButton variant="danger" onClick={() => onDelete(item._id)}>
                        Delete
                      </AdminButton>
                    </div>
                  </AdminTableCell>
                </tr>
              ))}
            </AdminTableBody>
          </AdminTableShell>
        </>
      )}

      <Modal
        open={open}
        title={editing ? "Edit category" : "Add category"}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={onSubmit} className="space-y-3">
          <Field
            label="Name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            required
          />
          {!editing && (
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    type: e.target.value as CategoryType,
                  }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              >
                <option value="course">Course</option>
                <option value="service">Service</option>
              </select>
            </div>
          )}
          <Field
            label="Description"
            value={form.description}
            onChange={(v) => setForm((p) => ({ ...p, description: v }))}
          />
          <Field
            label="Icon key (e.g. FaLaptopCode)"
            value={form.icon}
            onChange={(v) => setForm((p) => ({ ...p, icon: v }))}
          />
          <Field
            label="Serial"
            type="number"
            value={String(form.serial)}
            onChange={(v) => setForm((p) => ({ ...p, serial: Number(v) || 0 }))}
          />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((p) => ({ ...p, isActive: e.target.checked }))
              }
            />
            Active
          </label>
          {error && open && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) => (
  <div>
    <label className="mb-1 block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
      {label}
    </label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
    />
  </div>
);

export default CategoriesManagement;
