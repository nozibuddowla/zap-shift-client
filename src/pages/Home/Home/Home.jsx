import React, { Suspense } from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
import TrustProcess from "../TrustProcess/TrustProcess";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <OurServices />
      <Brands />
      <TrustProcess />
      <Suspense
        fallback={
          <div className="py-20 flex justify-center items-center text-center font-bold">
            Loading Testimonials...
          </div>
        }
      >
        <Reviews reviewsPromise={reviewsPromise} />
      </Suspense>
      <WhyChooseUs />
    </div>
  );
};

export default Home;
