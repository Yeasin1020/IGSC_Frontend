import { useEffect, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import SubBanner from "../Components/Shared/SubBanner";
import CourseCard from "../Components/Pagewise/Courses/CourseCard";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import EmptyState from "../Components/Shared/EmptyState";
import { categoriesApi, coursesApi } from "../lib/endpoints";
import type { Category, Course } from "../types/api";

const CoursesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    categoriesApi
      .list({ type: "course", limit: 100 })
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await coursesApi.list({
          category: activeCategory === "all" ? undefined : activeCategory,
          searchTerm: search || undefined,
          level: level || undefined,
          limit: 50,
        });
        setCourses(res.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load courses");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeCategory, search, level]);

  return (
    <div>
      <SubBanner
        title="Our Courses"
        subtitle="Empower your future with industry-leading courses designed by experts. From technology to humanities, gain practical skills that open doors to global opportunities."
        icon={<FiBookOpen className="h-7 w-7" />}
        bgGradient="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950"
      />

      <div className="mx-auto my-5 max-w-7xl px-4 md:my-8 lg:my-12">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            >
              <option value="">All levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="all-levels">All levels</option>
            </select>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-400 sm:w-64 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading courses..." />
        ) : error ? (
          <EmptyState title="Could not load courses" description={error} />
        ) : courses.length === 0 ? (
          <EmptyState
            title="No courses found"
            description="Try another category or search term."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
