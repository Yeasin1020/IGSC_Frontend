import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import EmptyState from "../../Components/Shared/EmptyState";
import { categoryName } from "../../lib/api";
import { serviceRequestsApi, servicesApi } from "../../lib/endpoints";
import { useAuth } from "../../context/AuthContext";
import { resolveIcon } from "../../utils/iconMap";
import type { Service } from "../../types/api";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { user, setSession } = useAuth();
  const [service, setService] = useState<Service | null>(null);
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
    company: "",
    requirements: "",
  });

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    servicesApi
      .get(slug)
      .then((res) => setService(res.data))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Service not found"),
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
    if (!service) return;
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await serviceRequestsApi.create({
        service: service._id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        company: form.company || undefined,
        password: form.password || undefined,
        requirements: form.requirements || undefined,
      });

      if (res.data.accessToken) {
        await setSession(res.data.accessToken);
      }
      setSuccess(res.message);
      setForm((prev) => ({ ...prev, password: "", requirements: "" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner label="Loading service..." />;
  if (!service) {
    return (
      <div className="py-10">
        <EmptyState title="Service not found" description={error} />
        <div className="mt-6 text-center">
          <Link
            to="/services"
            className="text-indigo-600 hover:underline dark:text-indigo-300"
          >
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <Link
        to="/services"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-300"
      >
        <FiArrowLeft /> Back to services
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-50 text-2xl text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
            {resolveIcon(service.iconKey)}
          </div>
          <p className="text-sm font-semibold tracking-wide text-indigo-500 uppercase dark:text-indigo-300">
            {categoryName(service.category)}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            {service.title}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {service.description}
          </p>
          {service.fullDescription && (
            <p className="mt-4 whitespace-pre-line text-gray-700 dark:text-gray-300">
              {service.fullDescription}
            </p>
          )}

          {service.features?.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Includes
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-gray-600 dark:text-gray-300">
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
            {service.price > 0 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                From ${service.price}
              </span>
            )}
            {service.deliveryTime && (
              <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                {service.deliveryTime}
              </span>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Request this service
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Share your name, address and mobile — we will contact you.
          </p>

          <form onSubmit={onSubmit} className="mt-5 space-y-3">
            {(
              [
                ["name", "Full name", "text", true],
                ["email", "Email", "email", true],
                ["phone", "Mobile number", "tel", true],
                ["address", "Address", "text", true],
                ["company", "Company (optional)", "text", false],
                ["password", "Password (for new accounts)", "password", !user],
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
                Requirements
              </label>
              <textarea
                rows={4}
                value={form.requirements}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    requirements: e.target.value,
                  }))
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
                  to="/dashboard/service-requests"
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
              {submitting ? "Submitting..." : "Submit request"}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
