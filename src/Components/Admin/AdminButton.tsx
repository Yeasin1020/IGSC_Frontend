import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20",
  secondary:
    "border border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40",
  ghost:
    "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40",
  danger:
    "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40",
};

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  fullWidth?: boolean;
}

const AdminButton = ({
  variant = "primary",
  children,
  fullWidth,
  className = "",
  ...props
}: AdminButtonProps) => (
  <button
    type="button"
    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-60 ${variantClass[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default AdminButton;
