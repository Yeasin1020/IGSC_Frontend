const enrollmentStyles: Record<string, string> = {
  pending:
    "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  approved:
    "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
  enrolled:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  completed:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
  cancelled: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  "in-review":
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
  "in-progress":
    "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300",
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
      enrollmentStyles[status] ??
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
    }`}
  >
    {status.replace(/-/g, " ")}
  </span>
);

export default StatusBadge;
