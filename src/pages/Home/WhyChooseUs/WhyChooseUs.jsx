import React from "react";
import { motion } from "framer-motion";
import locationMerchant from "../../../assets/location-merchant.png";
import merchant from "../../../assets/be-a-merchant-bg.png";

const WhyChooseUs = () => {
  return (
    <div className="py-12 px-4 md:px-0">
      <div
        className="relative overflow-hidden bg-accent rounded-4xl shadow-2xl"
        style={{
          backgroundImage: `url(${merchant})`,
          backgroundSize: "contain",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 md:p-16 lg:p-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center lg:text-left z-10"
          >
            <h3 className="text-white font-extrabold text-2xl md:text-3xl lg:text-[40px] mb-4">
              Merchant and Customer Satisfaction is{" "}
              <span className="text-primary italic">Our First Priority</span>
            </h3>
            <p className="text-light-gray text-base md:text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. zapShift courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto btn btn-primary hover:bg-white text-dark-gray rounded-full border-none px-8 py-4 lg:text-xl font-bold shadow-xl transition-all duration-300">
                Become a Merchant
              </button>
              <button className="w-full sm:w-auto btn btn-outline border-2 border-primary text-primary hover:bg-primary hover:text-dark-gray rounded-full px-8 py-4 lg:text-xl font-bold transition-all duration-300">
                Earn with ZapShift
              </button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 w-full lg:w-1/2 flex justify-center lg:justify-end z-20"
          >
            {/* <img
              src={locationMerchant}
              alt="Logistics Map"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            /> */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <img
                src={locationMerchant}
                alt="Logistics Map"
                className="relative w-full max-w-132.75 h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] animate-float"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
