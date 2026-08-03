interface StudentFilterPillsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  labels?: Partial<Record<T, string>>;
}

const StudentFilterPills = <T extends string>({
  options,
  value,
  onChange,
  labels,
}: StudentFilterPillsProps<T>) => (
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
              ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/25"
              : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-200 hover:text-emerald-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-emerald-800"
          }`}
        >
          {labels?.[option] ?? (option ? option.replace(/-/g, " ") : "All")}
        </button>
      );
    })}
  </div>
);

export default StudentFilterPills;
