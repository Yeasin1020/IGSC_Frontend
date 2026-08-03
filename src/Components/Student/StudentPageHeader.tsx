import type { ReactNode } from "react";

interface StudentPageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

const StudentPageHeader = ({ title, subtitle, action }: StudentPageHeaderProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      )}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
);

export default StudentPageHeader;
