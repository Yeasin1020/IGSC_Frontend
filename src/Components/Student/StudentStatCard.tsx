import type { ReactNode } from "react";
import { Link } from "react-router";
import { HiArrowLongRight } from "react-icons/hi2";

type Accent = "emerald" | "teal" | "cyan" | "amber" | "violet";

const accentMap: Record<
  Accent,
  { icon: string; ring: string; text: string; bg: string }
> = {
  emerald: {
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300",
    ring: "group-hover:border-emerald-200 dark:group-hover:border-emerald-800",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "from-emerald-500/5 to-transparent",
  },
  teal: {
    icon: "bg-teal-100 text-teal-600 dark:bg-teal-950/60 dark:text-teal-300",
    ring: "group-hover:border-teal-200 dark:group-hover:border-teal-800",
    text: "text-teal-600 dark:text-teal-400",
    bg: "from-teal-500/5 to-transparent",
  },
  cyan: {
    icon: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-300",
    ring: "group-hover:border-cyan-200 dark:group-hover:border-cyan-800",
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "from-cyan-500/5 to-transparent",
  },
  amber: {
    icon: "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300",
    ring: "group-hover:border-amber-200 dark:group-hover:border-amber-800",
    text: "text-amber-600 dark:text-amber-400",
    bg: "from-amber-500/5 to-transparent",
  },
  violet: {
    icon: "bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-300",
    ring: "group-hover:border-violet-200 dark:group-hover:border-violet-800",
    text: "text-violet-600 dark:text-violet-400",
    bg: "from-violet-500/5 to-transparent",
  },
};

interface StudentStatCardProps {
  label: string;
  value: number;
  to?: string;
  icon: ReactNode;
  accent?: Accent;
}

const StudentStatCard = ({
  label,
  value,
  to,
  icon,
  accent = "emerald",
}: StudentStatCardProps) => {
  const colors = accentMap[accent];
  const inner = (
    <>
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${colors.bg}`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors.icon}`}
        >
          {icon}
        </div>
        {to && (
          <HiArrowLongRight
            className={`mt-1 h-4 w-4 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 ${colors.text}`}
          />
        )}
      </div>
      <p className="relative mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
        {value}
      </p>
      <p className="relative mt-1 text-sm text-gray-500 dark:text-gray-400">{label}</p>
    </>
  );

  const className = `group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm transition-all duration-200 sm:p-5 dark:border-gray-800 dark:bg-gray-900 ${to ? `hover:-translate-y-0.5 hover:shadow-md ${colors.ring}` : ""}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
};

export default StudentStatCard;
