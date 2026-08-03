import { useEffect, useState } from "react";
import { RiServiceFill } from "react-icons/ri";
import SubBanner from "../../Components/Shared/SubBanner";
import ServiceCard from "../../Components/Pagewise/Services/ServiceCard";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import EmptyState from "../../Components/Shared/EmptyState";
import { categoriesApi, servicesApi } from "../../lib/endpoints";
import type { Category, Service } from "../../types/api";

const ServicesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    categoriesApi
      .list({ type: "service", limit: 100 })
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await servicesApi.list({
          category: activeCategory === "all" ? undefined : activeCategory,
          searchTerm: search || undefined,
          limit: 50,
        });
        setServices(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeCategory, search]);

  return (
    <div>
      <SubBanner
        title="Our Services"
        subtitle="Professional video editing, digital marketing, graphic design, and IT solutions tailored to elevate your brand and achieve measurable results."
        icon={<RiServiceFill className="h-7 w-7 md:h-10 md:w-10" />}
      />

      <div className="mx-auto my-5 max-w-7xl px-4 md:my-8 lg:my-12">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category.slug
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {category.name}
                {typeof category.itemCount === "number" ? (
                  <span className="ml-1 opacity-80">({category.itemCount})</span>
                ) : null}
              </button>
            ))}
          </div>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-400 md:w-72 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        {loading ? (
          <LoadingSpinner label="Loading services..." />
        ) : error ? (
          <EmptyState title="Could not load services" description={error} />
        ) : services.length === 0 ? (
          <EmptyState
            title="No services found"
            description="Try another category or search term."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
