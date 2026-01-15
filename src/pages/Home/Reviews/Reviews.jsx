import React, { use } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import customerTop from "../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  //   console.log(reviews);

  return (
    <div className="my-12 px-4 space-y-10 relative">
      <div className="flex flex-col justify-center items-center max-w-4xl mx-auto text-center space-y-10">
        <img src={customerTop} alt="" className="w-40 md:w-52 lg:w-60" />
        <div className="space-y-6">
          <h3 className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-accent">
            {" "}
            What our customers are sayings
          </h3>
          <p className="text-granite-gray leading-relaxed">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
      </div>

      <div className="relative group max-w-7xl mx-auto">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true, el: ".custom-pagination" }}
          navigation={{
            nextEl: ".review-next",
            prevEl: ".review-prev",
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="pb-20 overflow-visible"
        >
          {reviews.map((reviewInfo) => (
            <SwiperSlide
              key={reviewInfo.id}
              className="transition-all duration-500"
            >
              <ReviewCard reviewInfo={reviewInfo} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center items-center gap-6 mt-8">
          <button className="review-prev w-12 h-12 rounded-full flex items-center justify-center bg-white text-accent shadow-2xl hover:bg-primary transition-all cursor-pointer z-10 disabled:opacity-30">
            <FaArrowLeft />
          </button>

          {/* Custom Pagination Container */}
          <div className="custom-pagination w-auto! flex gap-2"></div>

          <button className="review-next w-12 h-12 rounded-full flex items-center justify-center bg-white text-accent shadow-2xl hover:bg-primary transition-all cursor-pointer z-10 disabled:opacity-30">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
