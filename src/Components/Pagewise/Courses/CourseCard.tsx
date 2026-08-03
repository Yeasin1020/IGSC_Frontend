import { FiBookOpen, FiClock, FiUsers } from "react-icons/fi";
import { Link } from "react-router";
import { categoryName } from "../../../lib/api";
import type { Course } from "../../../types/api";

const CourseCard = ({ course }: { course: Course }) => {
  const seatsLeft =
    course.seats > 0
      ? Math.max(course.seats - course.totalEnrolled, 0)
      : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-black/20 dark:hover:shadow-black/40">
      <div className="relative h-44 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/80">
            <FiBookOpen size={42} />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.isPopular && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-900/70 dark:text-amber-200">
              Popular
            </span>
          )}
          {course.isNew && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/70 dark:text-emerald-200">
              New
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-wide text-indigo-500 uppercase dark:text-indigo-300">
          {categoryName(course.category) || "Course"}
        </p>
        <h3 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-300">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {course.shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
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

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
          <div>
            {course.price > 0 ? (
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                ${course.price}
              </span>
            ) : (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                Free enrollment
              </span>
            )}
            {seatsLeft !== null && (
              <p className="mt-1 text-[11px] text-gray-400">
                {seatsLeft} seats left
              </p>
            )}
          </div>
          <Link
            to={`/courses/${course.slug || course._id}`}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Enroll
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
