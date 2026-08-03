import type { Testimonial } from "../../../Interfaces";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface Props {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: Props) => {
  const {
    rating,
    message,
    name,
    profession = "",
    institute = "",
  } = testimonial;

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  const avatarColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const getRatingStyle = (value: number) => {
    if (value >= 4.5) {
      return {
        badge:
          "bg-green-50 text-green-600 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800",
        stars: "text-green-500",
        accent: "border-t-green-500",
      };
    }

    if (value >= 3) {
      return {
        badge:
          "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-300 dark:border-yellow-800",
        stars: "text-yellow-500",
        accent: "border-t-yellow-400",
      };
    }

    return {
      badge:
        "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
      stars: "text-red-400",
      accent: "border-t-red-400",
    };
  };

  const style = getRatingStyle(rating);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
      else stars.push(<FaRegStar key={i} />);
    }
    return stars;
  };

  return (
    <div
      className={`relative rounded-lg border border-gray-200 border-t-2 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md md:p-6 dark:border-gray-700 dark:bg-gray-900 ${style.accent}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex items-center gap-1 text-sm ${style.stars}`}>
          {renderStars()}
        </div>
        <div
          className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${style.badge}`}
        >
          {rating.toFixed(1)}
        </div>
      </div>

      <p className="text-[0.92rem] leading-6 text-gray-600 md:text-[0.98rem] dark:text-gray-300">
        {message}
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-3 dark:border-gray-800">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white shadow-sm ${avatarColors[index % avatarColors.length]}`}
        >
          {initials}
        </div>
        <div className="min-w-0 leading-tight">
          <h4 className="truncate text-[0.9rem] font-semibold text-gray-800 dark:text-gray-100">
            {name}
          </h4>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            {[profession, institute].filter(Boolean).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
