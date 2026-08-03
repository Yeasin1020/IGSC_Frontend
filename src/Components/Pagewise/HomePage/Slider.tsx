import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import banner1 from "../../../assets/Banner/b1.jpeg";
import banner2 from "../../../assets/Banner/b2.jpeg";
import banner3 from "../../../assets/Banner/b3.jpeg";
import banner4 from "../../../assets/Banner/b4.jpeg";
import banner5 from "../../../assets/Banner/b5.jpeg";

const banners = [banner1, banner2, banner3, banner4, banner5];

const Slider = () => {
  return (
    <div className="w-full">

      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="md:h-[calc(100vh-100px)] h-full"
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>

    </div>
  );
};

export default Slider;