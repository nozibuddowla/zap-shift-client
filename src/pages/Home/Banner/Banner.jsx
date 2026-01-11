import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// Import required modules
import { Pagination, Autoplay, A11y } from "swiper/modules";

// Import your assets
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";

const slides = [
  {
    img: banner1,
  },
  {
    img: banner2,
  },
  {
    img: banner3,
  },
];

const Banner = () => {
  return (
    <div>
      <Swiper
        // Infinite Loop & Autoplay
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class=" ${className} custom-bullet"></span>`;
          },
        }}
        modules={[Pagination, Autoplay, A11y]}
        className="rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full aspect-video md:aspect-21/9 lg:min-h-137.5 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-in-out"
              style={{ backgroundImage: `url(${slide.img})` }}
            ></div>
            <div className="absolute inset-0 bg-black/5 md:bg-transparent"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
