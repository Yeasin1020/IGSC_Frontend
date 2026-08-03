import { TfiLayoutLineSolid } from "react-icons/tfi";

interface HeadingProps {
  title: string;
  description?: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="w-full max-w-3xl py-2 text-center md:py-4">
        <h2 className="flex items-center justify-center gap-3 md:gap-5">
          <TfiLayoutLineSolid className="text-[18px] text-blue-600 md:text-[26px] dark:text-blue-400" />
          <span className="text-[1.5rem] leading-tight font-semibold text-yellow-500 md:text-[2rem] dark:text-yellow-400">
            {title}
          </span>
          <TfiLayoutLineSolid className="text-[18px] text-blue-600 md:text-[26px] dark:text-blue-400" />
        </h2>

        {description && (
          <p className="mt-4 px-2 text-[0.95rem] leading-relaxed text-gray-600 md:mt-5 md:px-0 md:text-[1.05rem] dark:text-gray-300">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Heading;
