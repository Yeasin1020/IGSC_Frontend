interface AdminFilterPillsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  labels?: Partial<Record<T, string>>;
}

const AdminFilterPills = <T extends string>({
  options,
  value,
  onChange,
  labels,
}: AdminFilterPillsProps<T>) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => {
      const active = value === option;
      return (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition ${
            active
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/25"
              : "border border-gray-200 bg-white text-gray-600 hover:border-indigo-200 hover:text-indigo-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-indigo-800"
          }`}
        >
          {labels?.[option] ?? option.replace(/-/g, " ")}
        </button>
      );
    })}
  </div>
);

export default AdminFilterPills;
