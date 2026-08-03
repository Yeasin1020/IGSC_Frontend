import type { ReactNode } from "react";
import {
  FaBriefcase,
  FaCode,
  FaGlobe,
  FaLaptopCode,
  FaPaintBrush,
  FaPenFancy,
  FaSearch,
  FaStar,
  FaUniversity,
  FaVideo,
} from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { MdCampaign, MdDesignServices } from "react-icons/md";
import { RiServiceFill } from "react-icons/ri";

const icons: Record<string, ReactNode> = {
  FaVideo: <FaVideo />,
  FaLaptopCode: <FaLaptopCode />,
  FaCode: <FaCode />,
  FaGlobe: <FaGlobe />,
  FaPaintBrush: <FaPaintBrush />,
  FaPenFancy: <FaPenFancy />,
  FaSearch: <FaSearch />,
  FaBriefcase: <FaBriefcase />,
  FaUniversity: <FaUniversity />,
  FaStar: <FaStar />,
  MdCampaign: <MdCampaign />,
  MdDesignServices: <MdDesignServices />,
  RiServiceFill: <RiServiceFill />,
};

export const resolveIcon = (iconKey?: string, fallback?: ReactNode): ReactNode => {
  if (iconKey && icons[iconKey]) return icons[iconKey];
  return fallback ?? <FiStar className="w-6 h-6" />;
};
