import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router";
import { FiArrowLeft, FiBookOpen, FiClock, FiUsers } from "react-icons/fi";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import EmptyState from "../../Components/Shared/EmptyState";
import { categoryName } from "../../lib/api";
import { coursesApi, enrollmentsApi } from "../../lib/endpoints";
import { useAuth } from "../../context/AuthContext";
import type { Course } from "../../types/api";

const CourseDetailPage = () => {
  const { slug } = useParams();
  const { user, setSession } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    education: "",
    institute: "",
    note: "",
  });

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    coursesApi
      .get(slug)
      .then((res) => setCourse(res.data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Course not found"),
      )
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      name: user.name || prev.name,
      email: user.email || prev.email,
      phone: user.phone || prev.phone,
      address: user.address || prev.address,
    }));
  }, [user]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!course) return;
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await enrollmentsApi.create({
        course: course._id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password || undefined,
        address: form.address || undefined,
        education: form.education || undefined,
        institute: form.institute || undefined,
        note: form.note || undefined,
      });
      if (res.data.accessToken) {
        await setSession(res.data.accessToken);
      }
      setSuccess(res.message);
      setForm((prev) => ({ ...prev, password: "", note: "" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enrollment failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading course..." />;
  if (!course) {
    return (
      <div className="py-10">
        <EmptyState title="Course not found" description={error} />
        <div className="mt-6 text-center">
          <Link to="/courses" className="text-indigo-600 hover:underline">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <Link
        to="/courses"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-300"
      >
        <FiArrowLeft /> Back to courses
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold tracking-wide text-indigo-500 uppercase dark:text-indigo-300">
            {categoryName(course.category)}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            {course.title}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {course.shortDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            {course.duration && (
              <span className="inline-flex items-center gap-1">
                <FiClock /> {course.duration}
              </span>
            )}
            <span className="inline-flex items-center gap-1 capitalize">
              <FiBookOpen /> {course.level.replace("-", " ")}
            </span>
            <span className="inline-flex items-center gap-1">
              <FiUsers /> {course.totalEnrolled} enrolled
            </span>
          </div>

          {course.description && (
            <div className="prose mt-8 max-w-none text-gray-700 dark:text-gray-300">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                About
              </h2>
              <p className="whitespace-pre-line">{course.description}</p>
            </div>
          )}

          {course.outcomes?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Outcomes
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300">
                {course.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {course.syllabus?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Syllabus
              </h2>
              <div className="mt-3 space-y-3">
                {course.syllabus.map((module) => (
                  <div
                    key={module.title}
                    className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      {module.title}
                    </h3>
                    {module.topics?.length > 0 && (
                      <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                        {module.topics.map((topic) => (
                          <li key={topic}>{topic}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Enroll now
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Free registration — no payment required.
          </p>

          <form onSubmit={onSubmit} className="mt-5 space-y-3">
            {(
              [
                ["name", "Full name", "text", true],
                ["email", "Email", "email", true],
                ["phone", "Mobile number", "tel", true],
                ["password", "Password (for new accounts)", "password", !user],
                ["address", "Address", "text", false],
                ["education", "Education", "text", false],
                ["institute", "Institute", "text", false],
              ] as const
            ).map(([key, label, type, required]) => (
              <div key={key}>
                <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  {label}
                </label>
                <input
                  type={type}
                  required={required}
                  value={form[key]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                />
              </div>
            ))}

            <div>
              <label className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Note
              </label>
              <textarea
                rows={3}
                value={form.note}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, note: e.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </p>
            )}
            {success && (
              <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <p>{success}</p>
                <Link
                  to="/dashboard/enrollments"
                  className="mt-2 inline-block font-semibold underline"
                >
                  View in my dashboard
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Register for this course"}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetailPage;
