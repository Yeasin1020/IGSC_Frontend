import type { ReactNode } from "react";

interface AdminPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const AdminPanel = ({ title, children, className = "" }: AdminPanelProps) => (
  <section
    className={`rounded-2xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-5 dark:border-gray-800 dark:bg-gray-900 ${className}`}
  >
    {title ? (
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-white">
        {title}
      </h2>
    ) : null}
    {children}
  </section>
);

export default AdminPanel;
