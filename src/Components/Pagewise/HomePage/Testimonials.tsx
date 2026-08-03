import { useEffect, useState } from "react";
import Heading from "../../Shared/Heading";
import TestimonialCard from "./TestimonialCard";
import LoadingSpinner from "../../Shared/LoadingSpinner";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { testimonialsApi } from "../../../lib/endpoints";
import type { Testimonial } from "../../../types/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialsApi
      .list({ limit: 20 })
      .then((res) => setTestimonials(res.data))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-14 md:py-20 dark:bg-[#0b1220]">
        <LoadingSpinner label="Loading testimonials..." />
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-gray-50 py-14 md:py-20 dark:bg-[#0b1220]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 md:mb-14">
          <Heading
            title="What our community says"
            description="Hear from our students and alumni about their real experiences with IGSC."
          />
        </div>

        <div className="relative">
          <Swiper
            modules={[EffectCoverflow, Pagination, Autoplay]}
            centeredSlides={true}
            loop={testimonials.length > 2}
            grabCursor={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            spaceBetween={18}
            breakpoints={{
              0: { slidesPerView: 1, effect: "slide" },
              640: { slidesPerView: 1.2, effect: "slide" },
              768: {
                slidesPerView: 2,
                effect: "coverflow",
                coverflowEffect: {
                  rotate: 18,
                  depth: 80,
                  stretch: 0,
                  modifier: 1,
                  slideShadows: false,
                },
              },
              1024: {
                slidesPerView: 3,
                effect: "coverflow",
                coverflowEffect: {
                  rotate: 22,
                  depth: 110,
                  stretch: 0,
                  modifier: 1,
                  slideShadows: false,
                },
              },
            }}
            className="py-10"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide
                key={testimonial._id}
                className="flex justify-center transition-all duration-300"
              >
                <div className="w-full max-w-90">
                  <TestimonialCard testimonial={testimonial} index={index} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
