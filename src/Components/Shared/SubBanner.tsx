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
  icon = <FiCompass className="h-10 w-10" />,
  className = "",
}: SubBannerProps) => {
  return (
    <div
      className={`relative overflow-hidden shadow-lg dark:shadow-black/40 ${bgGradient} ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-64 w-64 animate-pulse rounded-full bg-indigo-300/20 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 animate-pulse rounded-full bg-purple-300/20 blur-3xl delay-1000 dark:bg-purple-500/10" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-amber-200/20 blur-3xl delay-700 dark:bg-amber-500/5" />

        <div className="absolute top-10 left-10 h-2 w-2 animate-float rounded-full bg-indigo-400" />
        <div className="absolute right-10 bottom-10 h-3 w-3 animate-float-delayed rounded-full bg-purple-400" />
        <div className="absolute top-1/3 right-1/4 h-1.5 w-1.5 animate-float-slow rounded-full bg-amber-400" />
        <div className="absolute bottom-1/3 left-1/5 h-2 w-2 animate-float-reverse rounded-full bg-pink-400" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%234f46e5' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="absolute top-0 right-0 left-0 h-px animate-shimmer bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

      <div className="relative z-10 px-6 py-6 text-center md:px-10 md:py-8">
        <div className="group mb-4 inline-flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400/30" />
            <div className="relative rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              {icon}
            </div>
          </div>
        </div>

        <h1 className="animate-slide-up bg-gradient-to-r from-slate-800 via-indigo-800 to-purple-800 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl md:text-4xl dark:from-white dark:via-indigo-200 dark:to-purple-200">
          {title}
        </h1>

        <div className="relative mx-auto my-3 h-0.5 w-16">
          <div className="absolute inset-0 animate-expand-width rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" />
        </div>

        {subtitle && (
          <p className="animation-delay-200 mx-auto mt-3 max-w-2xl animate-fade-in-up text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg dark:text-slate-300">
            {subtitle}
          </p>
        )}

        <div className="mt-5 flex justify-center gap-1.5">
          <div className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-indigo-400" />
          <div className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-purple-400 delay-150" />
          <div className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-pink-400 delay-300" />
        </div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-px animate-shimmer-reverse bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
    </div>
  );
};

export default SubBanner;
