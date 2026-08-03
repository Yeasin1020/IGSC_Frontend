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
import { categoriesApi, coursesApi } from "../../lib/endpoints";
import type { Category, Course } from "../../types/api";

const emptyForm = {
  title: "",
  category: "",
  shortDescription: "",
  description: "",
  thumbnail: "",
  price: 0,
  duration: "",
  level: "all-levels",
  language: "Bangla",
  schedule: "",
  seats: 0,
  isPublished: true,
  isPopular: false,
  isNew: false,
};

const CoursesManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [courseRes, categoryRes] = await Promise.all([
        coursesApi.list({ limit: 100 }),
        categoriesApi.list({ type: "course", limit: 100 }),
      ]);
      setCourses(courseRes.data);
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
    setForm({
      ...emptyForm,
      category: categories[0]?._id || "",
    });
    setOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditing(course);
    setForm({
      title: course.title,
      category:
        typeof course.category === "string"
          ? course.category
          : course.category._id,
      shortDescription: course.shortDescription,
      description: course.description || "",
      thumbnail: course.thumbnail || "",
      price: course.price,
      duration: course.duration || "",
      level: course.level,
      language: course.language || "Bangla",
      schedule: course.schedule || "",
      seats: course.seats,
      isPublished: course.isPublished,
      isPopular: course.isPopular,
      isNew: course.isNew,
    });
    setOpen(true);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      seats: Number(form.seats) || 0,
      description: form.description || undefined,
      thumbnail: form.thumbnail || undefined,
      duration: form.duration || undefined,
      schedule: form.schedule || undefined,
    };

    try {
      if (editing) {
        await coursesApi.update(editing._id, payload);
      } else {
        await coursesApi.create(payload);
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
    if (!confirm("Delete this course?")) return;
    try {
      await coursesApi.remove(id);
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Courses"
        subtitle="Add and publish courses under categories"
        action={
          <AdminButton onClick={openCreate} className="w-full sm:w-auto">
            Add course
          </AdminButton>
        }
      />

      {error && !open && <AdminAlert message={error} />}

      {loading ? (
        <LoadingSpinner />
      ) : courses.length === 0 ? (
        <AdminPanel>
          <EmptyState
            title="No courses yet"
            description="Create a category first, then add courses."
          />
        </AdminPanel>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {courses.map((course) => (
              <AdminPanel key={course._id}>
                <p className="font-semibold text-gray-900 dark:text-white">{course.title}</p>
                <p className="text-xs text-gray-400">{course.slug}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                  <span className="rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-800">
                    {categoryName(course.category)}
                  </span>
                  <span className="rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-800">
                    {course.totalEnrolled} enrolled
                  </span>
                  <span
                    className={`rounded-lg px-2 py-1 ${
                      course.isPublished
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <AdminButton variant="ghost" onClick={() => openEdit(course)}>
                    Edit
                  </AdminButton>
                  <AdminButton variant="danger" onClick={() => onDelete(course._id)}>
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
                <AdminTableHeaderCell>Enrolled</AdminTableHeaderCell>
                <AdminTableHeaderCell>Published</AdminTableHeaderCell>
                <AdminTableHeaderCell>Actions</AdminTableHeaderCell>
              </tr>
            </AdminTableHead>
            <AdminTableBody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <AdminTableCell>
                    <p className="font-medium text-gray-900 dark:text-white">{course.title}</p>
                    <p className="text-xs text-gray-400">{course.slug}</p>
                  </AdminTableCell>
                  <AdminTableCell>{categoryName(course.category)}</AdminTableCell>
                  <AdminTableCell>{course.totalEnrolled}</AdminTableCell>
                  <AdminTableCell>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        course.isPublished
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </AdminTableCell>
                  <AdminTableCell>
                    <div className="flex gap-1">
                      <AdminButton variant="ghost" onClick={() => openEdit(course)}>
                        Edit
                      </AdminButton>
                      <AdminButton variant="danger" onClick={() => onDelete(course._id)}>
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
        title={editing ? "Edit course" : "Add course"}
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
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Level
            </label>
            <select
              value={form.level}
              onChange={(e) => setForm((p) => ({ ...p, level: e.target.value }))}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            >
              <option value="all-levels">All levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <Field
            label="Short description"
            value={form.shortDescription}
            onChange={(v) => setForm((p) => ({ ...p, shortDescription: v }))}
            required
            className="md:col-span-2"
          />
          <div className="md:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
              Full description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
          <Field
            label="Thumbnail URL"
            value={form.thumbnail}
            onChange={(v) => setForm((p) => ({ ...p, thumbnail: v }))}
          />
          <Field
            label="Duration"
            value={form.duration}
            onChange={(v) => setForm((p) => ({ ...p, duration: v }))}
          />
          <Field
            label="Schedule"
            value={form.schedule}
            onChange={(v) => setForm((p) => ({ ...p, schedule: v }))}
          />
          <Field
            label="Language"
            value={form.language}
            onChange={(v) => setForm((p) => ({ ...p, language: v }))}
          />
          <Field
            label="Price"
            type="number"
            value={String(form.price)}
            onChange={(v) => setForm((p) => ({ ...p, price: Number(v) || 0 }))}
          />
          <Field
            label="Seats (0 = unlimited)"
            type="number"
            value={String(form.seats)}
            onChange={(v) => setForm((p) => ({ ...p, seats: Number(v) || 0 }))}
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
            {saving ? "Saving..." : "Save course"}
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

export default CoursesManagement;
