interface AdminAlertProps {
  message: string;
  variant?: "error" | "info";
}

const AdminAlert = ({ message, variant = "error" }: AdminAlertProps) => (
  <p
    className={`rounded-xl px-4 py-3 text-sm ${
      variant === "error"
        ? "border border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
        : "border border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300"
    }`}
  >
    {message}
  </p>
);

export default AdminAlert;
