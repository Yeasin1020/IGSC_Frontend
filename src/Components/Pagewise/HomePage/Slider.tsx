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
    <div className="w-full overflow-hidden">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        emulateTouch
        // Let vertical page scroll win on phones (esp. landscape).
        preventMovementUntilSwipeScrollTolerance
        swipeScrollTolerance={48}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="h-[200px] sm:h-[280px] md:h-[360px] lg:h-[min(520px,calc(100dvh-5.5rem))]"
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
