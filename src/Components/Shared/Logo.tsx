import logo from "../../../public/igsc.png";

interface LogoProps {
  textColor?: string;
  className?: string;
}

const Logo = ({
  textColor = "text-gray-800 dark:text-white",
  className = "",
}: LogoProps) => {
  return (
    <div className={`group flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-30 blur-md animate-wave" />
        <img
          className="relative z-10 h-10 w-10 object-contain animate-float-soft md:h-12 md:w-12"
          src={logo}
          alt="IGSC Logo"
        />
      </div>

      <div className="relative">
        <h1
          className={`text-lg font-bold tracking-tight transition-colors duration-300 md:text-2xl ${textColor}`}
        >
          IGSC
        </h1>
        <div className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 animate-wave-line" />
      </div>
    </div>
  );
};

export default Logo;
