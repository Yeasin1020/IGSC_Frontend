import { FiShoppingBag, FiStar } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router";
import { resolveIcon } from "../../../utils/iconMap";
import type { Service } from "../../../types/api";
import { categoryName } from "../../../lib/api";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const {
    _id,
    slug,
    title,
    description,
    price,
    features = [],
    rating = 0,
    totalOrders = 0,
    iconKey,
    isPopular = false,
    isNew = false,
    category,
  } = service;

  const renderStars = (value: number) => {
    const fullStars = Math.floor(value);
    const halfStar = value % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5 text-amber-400">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="h-3.5 w-3.5" />
        ))}
        {halfStar && <FaStarHalfAlt className="h-3.5 w-3.5" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="h-3.5 w-3.5" />
        ))}
      </div>
    );
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        {isPopular && (
          <span className="inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            Popular
          </span>
        )}
        {isNew && (
          <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            New
          </span>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-indigo-50 text-xl text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
            {resolveIcon(iconKey, <FiStar className="h-5 w-5" />)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-xs font-medium tracking-wide text-indigo-500 uppercase dark:text-indigo-300">
              {categoryName(category) || "Service"}
            </p>
            <h3 className="text-lg leading-tight font-bold text-gray-800 transition-colors duration-300 group-hover:text-indigo-600 md:text-xl dark:text-gray-100 dark:group-hover:text-indigo-300">
              {title}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              {rating > 0 && (
                <div className="flex items-center gap-1">
                  {renderStars(rating)}
                  <span className="ml-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                    {rating.toFixed(1)}
                  </span>
                </div>
              )}
              {totalOrders > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <FiShoppingBag className="h-3 w-3" />
                  <span>{totalOrders} orders</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {description}
        </p>

        {features.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="inline-block rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className="inline-block rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-800">
                +{features.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
          <div>
            {price > 0 ? (
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                ${price}
              </span>
            ) : (
              <span className="text-sm text-gray-400">Price on request</span>
            )}
          </div>
          <Link
            to={`/services/${slug || _id}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Request
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
