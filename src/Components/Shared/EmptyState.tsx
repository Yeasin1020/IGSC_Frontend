const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="rounded-lg border border-dashed border-gray-200 bg-white px-6 py-14 text-center dark:border-gray-700 dark:bg-gray-900">
    <p className="text-lg font-semibold text-gray-700 dark:text-gray-100">
      {title}
    </p>
    {description ? (
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    ) : null}
  </div>
);

export default EmptyState;
