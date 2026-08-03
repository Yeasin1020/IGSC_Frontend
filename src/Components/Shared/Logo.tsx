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
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      <img
        className="h-7 w-7 object-contain sm:h-8 sm:w-8 md:h-9 md:w-9"
        src={logo}
        alt="IGSC Logo"
      />
      <h1
        className={`text-base font-bold tracking-tight sm:text-lg md:text-xl ${textColor}`}
      >
        IGSC
      </h1>
    </div>
  );
};

export default Logo;
