const LoadingSpinner = ({ label = "Loading..." }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-500 dark:text-gray-400">
    <span className="loading loading-spinner loading-lg text-indigo-600 dark:text-indigo-400" />
    <p className="text-sm">{label}</p>
  </div>
);

export default LoadingSpinner;
