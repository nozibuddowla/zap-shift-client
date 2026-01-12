import React, { use } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import customerTop from "../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
//   console.log(reviews);

  return (
    <div className="px-4 space-y-10">
      <div className="flex flex-col justify-center items-center max-w-4xl mx-auto text-center space-y-10">
        <img src={customerTop} alt="" className="w-40 md:w-52 lg:w-60" />
        <div className="space-y-6">
          <h3 className="font-extrabold text-2xl md:text-3xl lg:text-[40px] text-accent">
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
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="pb-16 overflow-visible"
      >
        {reviews.map((reviewInfo) => (
          <SwiperSlide key={reviewInfo.id} className="py-10">
            <ReviewCard reviewInfo={reviewInfo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
