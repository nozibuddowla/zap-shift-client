import React from "react";
import { motion } from "framer-motion";
import bookingIcon from "../../../assets/bookingIcon.png";

const HowItWorks = () => {
  const howItWorksItems = [
    {
      title: "Booking Pick & Drop",
      desc: "Schedule a pickup from your doorstep and have it delivered anywhere in the city with lightning-fast speed.",
    },
    {
      title: "Cash On Delivery",
      desc: "Reliable COD services with secure handling and the fastest payment disbursement cycle for your business.",
    },
    {
      title: "Delivery Hub",
      desc: "Our localized sorting centers ensure your packages are organized and dispatched through the most efficient routes.",
    },
    {
      title: "Booking SME & Corporate",
      desc: "Customized logistics solutions designed to scale with your business, providing bulk booking and priority support.",
    },
  ];

  return (
    <div className="px-4 py-16 overflow-hidden space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="text-primary font-bold tracking-widest uppercase text-sm">
          Our Process
        </span>
        <h2 className="text-secondary font-extrabold text-3xl md:text-4xl lg:text-5xl mt-2">
          How it Works
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-20 h-1.5 bg-primary mt-4 rounded-full"
        ></motion.div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {howItWorksItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="group relative p-8 rounded-[2.5rem] bg-pale border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Step Number Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 0.1, x: 0 }}
              className="absolute top-6 right-8 text-6xl font-black text-gray-800 pointer-events-none"
            >
              0{index + 1}
            </motion.div>

            {/* Icon Container */}
            <div className="w-14 h-14 mb-6 rounded-2xl bg-secondary/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
              <img
                src={bookingIcon}
                alt={item.title}
                className="w-8 h-8 object-contain group-hover:brightness-0 group-hover:invert transition-all"
              />
            </div>

            {/* Content */}
            <h3 className="text-accent font-bold text-xl leading-6 mb-4">
              {item.title}
            </h3>
            <p className="text-granite-gray leading-relaxed">{item.desc}</p>

            {/* Bottom Accent Bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-primary"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
            ></motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
