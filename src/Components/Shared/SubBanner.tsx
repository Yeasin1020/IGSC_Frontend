import type { ReactNode } from "react";
import { FiCompass } from "react-icons/fi";

interface SubBannerProps {
  title: string;
  subtitle?: string;
  bgGradient?: string;
  icon?: ReactNode;
  className?: string;
}

const SubBanner = ({
  title,
  subtitle,
  bgGradient = "bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950",
  icon = <FiCompass className="h-6 w-6" />,
  className = "",
}: SubBannerProps) => {
  return (
    <div
      className={`relative overflow-hidden border-b border-slate-200/80 dark:border-gray-800 ${bgGradient} ${className}`}
    >
      <div className="relative z-10 px-4 py-8 text-center sm:px-6 sm:py-10 md:px-10">
        <div className="mb-3 inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-white">
          {icon}
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white">
          {title}
        </h1>

        <div className="mx-auto my-3 h-0.5 w-12 rounded-full bg-indigo-500" />

        {subtitle && (
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubBanner;
