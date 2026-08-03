import type { ReactNode } from "react";

interface AdminTableShellProps {
  children: ReactNode;
  className?: string;
}

const AdminTableShell = ({ children, className = "" }: AdminTableShellProps) => (
  <div
    className={`overflow-x-auto rounded-2xl border border-gray-200/80 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}
  >
    <table className="min-w-full text-left text-sm">{children}</table>
  </div>
);

export const AdminTableHead = ({ children }: { children: ReactNode }) => (
  <thead className="border-b border-gray-100 bg-gray-50/80 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:border-gray-800 dark:bg-gray-950/80 dark:text-gray-400">
    {children}
  </thead>
);

export const AdminTableBody = ({ children }: { children: ReactNode }) => (
  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">{children}</tbody>
);

export const AdminTableCell = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <td className={`px-4 py-3.5 align-top text-gray-700 dark:text-gray-200 ${className}`}>
    {children}
  </td>
);

export const AdminTableHeaderCell = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <th className={`px-4 py-3 font-medium ${className}`}>{children}</th>
);

export default AdminTableShell;
