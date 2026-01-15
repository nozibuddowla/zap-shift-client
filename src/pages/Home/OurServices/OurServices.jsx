import React from "react";
import { motion } from "framer-motion";
import serviceIcon from "../../../assets/service.png";

const OurServices = () => {
  const ourServicesContent = [
    {
      title: "Express  & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in major cities. Express delivery available in Dhaka within 4–6 hours from pick-up.",
    },
    {
      title: "Nationwide Delivery",
      desc: "Home delivery in every district across Bangladesh, ensuring your products reach customers within 48–72 hours.",
    },
    {
      title: "Fulfillment Solution",
      desc: "Customized inventory management, online order processing, packaging, and dedicated after-sales support.",
    },
    {
      title: "Cash on Delivery",
      desc: "100% secure COD anywhere in Bangladesh with guaranteed safety and fast disbursement for merchants.",
    },
    {
      title: "Corporate Logistics",
      desc: "Enterprise-grade warehouse management and bulk logistics solutions tailored for corporate requirements.",
    },
    {
      title: "Parcel Return",
      desc: "Efficient reverse logistics allowing customers to exchange or return products seamlessly with merchants.",
    },
  ];

  // Animation variants for the container (staggering children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Animation variants for individual cards
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="bg-accent py-16 px-4 sm:px-10 md:px-16 rounded-[3rem] sm:rounded-[4rem] mx-4 my-12"
    >
      {/* Header Section */}
      <div className="mb-16 space-y-4 text-center max-w-3xl mx-auto">
        <motion.h2
          variants={cardVariants}
          className="text-white font-extrabold text-3xl md:text-4xl lg:text-5xl"
        >
          Our Services
        </motion.h2>
        <motion.span className="text-light-gray font-bold leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </motion.span>
      </div>

      {/* Services Grid */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ourServicesContent.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group flex flex-col items-center text-center py-8 px-6 rounded-[3rem] bg-white hover:bg-primary border border-white/10 backdrop-blur-sm  transition-all duration-300 cursor-default space-y-4 shadow-sm"
          >
            {/* Icon Circle */}
            <motion.div
              whileHover={{ rotate: 5 }}
              className="w-22 h-22 rounded-full bg-[linear-gradient(180deg,rgba(238,237,252,1)_0%,rgba(238,237,252,0)_100%)]
   flex items-center justify-center transition-colors duration-500"
            >
              <img
                src={serviceIcon}
                alt={item.title}
                className="w-10 h-10 object-contain"
              />
            </motion.div>

            {/* Content */}
            <h3 className="text-accent group-hover:text-secondary font-bold text-xl transition-colors">
              {item.title}
            </h3>
            <p className="text-granite-gray group-hover:text-secondary leading-relaxed transition-colors">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default OurServices;
