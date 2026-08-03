import InstitutionPartnership from "../../Components/Pagewise/HomePage/InstitutionPartnership";
import MissionAndVision from "../../Components/Pagewise/HomePage/MissionAndVision";
import SkillsTicker from "../../Components/Pagewise/HomePage/SkillsTicker";
import Slider from "../../Components/Pagewise/HomePage/Slider";
import Testimonials from "../../Components/Pagewise/HomePage/Testimonials";
import WhyChooseIGSC from "../../Components/Pagewise/HomePage/WhyChooseIGSC";

const HomePage = () => {
  return (
    <div>
      <Slider />
      <SkillsTicker />
      <WhyChooseIGSC />
      <MissionAndVision />
      <InstitutionPartnership />
      <Testimonials />
    </div>
  );
};

export default HomePage;
