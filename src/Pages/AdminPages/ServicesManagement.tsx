import { useEffect, useState, type FormEvent } from "react";
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
import Modal from "../../Components/Shared/Modal";
import { categoryName } from "../../lib/api";
import { categoriesApi, servicesApi } from "../../lib/endpoints";
import type { Category, Service } from "../../types/api";

const emptyForm = {
  title: "",
  category: "",
  description: "",
  fullDescription: "",
  price: 0,
  features: "",
  image: "",
  iconKey: "FaBriefcase",
  deliveryTime: "",
  isPublished: true,
  isPopular: false,
  isNew: false,
};

const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [serviceRes, categoryRes] = await Promise.all([
        servicesApi.list({ limit: 100 }),
        categoriesApi.list({ type: "service", limit: 100 }),
      ]);
      setServices(serviceRes.data);
      setCategories(categoryRes.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm, category: categories[0]?._id || "" });
    setOpen(true);
  };

  const openEdit = (service: Service) => {
    setEditing(service);
    setForm({
      title: service.title,
      category:
        typeof service.category === "string"
          ? service.category
          : service.category._id,
      description: service.description,
      fullDescription: service.fullDescription || "",
      price: service.price,
      features: (service.features || []).join(", "),
      image: service.image || "",
      iconKey: service.iconKey || "FaBriefcase",
      deliveryTime: service.deliveryTime || "",
      isPublished: service.isPublished,
      isPopular: service.isPopular,
      isNew: service.isNew,
    });
    setOpen(true);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      fullDescription: form.fullDescription || undefined,
      price: Number(form.price) || 0,
      features: form.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      image: form.image || undefined,
      iconKey: form.iconKey || undefined,
      deliveryTime: form.deliveryTime || undefined,
      isPublished: form.isPublished,
      isPopular: form.isPopular,
      isNew: form.isNew,
    };

    try {
      if (editing) {
        await servicesApi.update(editing._id, payload);
      } else {
        await servicesApi.create(payload);
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
    if (!confirm("Delete this service?")) return;
    try {
      await servicesApi.remove(id);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Services"
        subtitle="Manage services shown on the website"
        action={
          <AdminButton onClick={openCreate} className="w-full sm:w-auto">
            Add service
          </AdminButton>
        }
      />

      {error && !open && <AdminAlert message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : services.length === 0 ? (
        <AdminPanel>
          <EmptyState title="No services yet" />
        </AdminPanel>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {services.map((service) => (
              <AdminPanel key={service._id}>
                <p className="font-semibold text-gray-900 dark:text-white">{service.title}</p>
                <p className="text-xs text-gray-400">{service.slug}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-800">
                    {categoryName(service.category)}
                  </span>
                  <span className="rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-800">
                    ${service.price}
                  </span>
                  <span className="rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-800">
                    {service.totalOrders} orders
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <AdminButton variant="ghost" onClick={() => openEdit(service)}>
                    Edit
                  </AdminButton>
                  <AdminButton variant="danger" onClick={() => onDelete(service._id)}>
                    Delete
                  </AdminButton>
                </div>
              </AdminPanel>
            ))}
          </div>

          <AdminTableShell className="hidden md:block">
            <AdminTableHead>
              <tr>
                <AdminTableHeaderCell>Title</AdminTableHeaderCell>
                <AdminTableHeaderCell>Category</AdminTableHeaderCell>
                <AdminTableHeaderCell>Price</AdminTableHeaderCell>
                <AdminTableHeaderCell>Orders</AdminTableHeaderCell>
                <AdminTableHeaderCell>Actions</AdminTableHeaderCell>
              </tr>
            </AdminTableHead>
            <AdminTableBody>
              {services.map((service) => (
                <tr key={service._id}>
                  <AdminTableCell>
                    <p className="font-medium text-gray-900 dark:text-white">{service.title}</p>
                    <p className="text-xs text-gray-400">{service.slug}</p>
                  </AdminTableCell>
                  <AdminTableCell>{categoryName(service.category)}</AdminTableCell>
                  <AdminTableCell>${service.price}</AdminTableCell>
                  <AdminTableCell>{service.totalOrders}</AdminTableCell>
                  <AdminTableCell>
                    <div className="flex gap-1">
                      <AdminButton variant="ghost" onClick={() => openEdit(service)}>
                        Edit
                      </AdminButton>
                      <AdminButton variant="danger" onClick={() => onDelete(service._id)}>
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
        title={editing ? "Edit service" : "Add service"}
        onClose={() => setOpen(false)}
        wide
      >
        <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
          <Field
            label="Title"
            value={form.title}
            onChange={(v) => setForm((p) => ({ ...p, title: v }))}
            required
            className="md:col-span-2"
          />
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Category
            </label>
            <select
              required
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Icon key"
            value={form.iconKey}
            onChange={(v) => setForm((p) => ({ ...p, iconKey: v }))}
          />
          <Field
            label="Short description"
            value={form.description}
            onChange={(v) => setForm((p) => ({ ...p, description: v }))}
            required
            className="md:col-span-2"
          />
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Full description
            </label>
            <textarea
              rows={4}
              value={form.fullDescription}
              onChange={(e) =>
                setForm((p) => ({ ...p, fullDescription: e.target.value }))
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
          <Field
            label="Features (comma separated)"
            value={form.features}
            onChange={(v) => setForm((p) => ({ ...p, features: v }))}
            className="md:col-span-2"
          />
          <Field
            label="Image URL"
            value={form.image}
            onChange={(v) => setForm((p) => ({ ...p, image: v }))}
          />
          <Field
            label="Delivery time"
            value={form.deliveryTime}
            onChange={(v) => setForm((p) => ({ ...p, deliveryTime: v }))}
          />
          <Field
            label="Price"
            type="number"
            value={String(form.price)}
            onChange={(v) => setForm((p) => ({ ...p, price: Number(v) || 0 }))}
          />
          <div className="flex flex-wrap gap-4 md:col-span-2">
            {(
              [
                ["isPublished", "Published"],
                ["isPopular", "Popular"],
                ["isNew", "New"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [key]: e.target.checked }))
                  }
                />
                {label}
              </label>
            ))}
          </div>
          {error && open && (
            <p className="text-sm text-red-600 md:col-span-2">{error}</p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white disabled:opacity-60 md:col-span-2"
          >
            {saving ? "Saving..." : "Save service"}
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
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
  className?: string;
}) => (
  <div className={className}>
    <label className="mb-1 block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
      {label}
    </label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 outline-none focus:border-indigo-400"
    />
  </div>
);

export default ServicesManagement;
