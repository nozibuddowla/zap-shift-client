import React from "react";
import { motion } from "framer-motion";
import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";

const TrustProcess = () => {
  const items = [
    {
      img: liveTracking,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      img: safeDelivery,
      title: "Safe & Secure Delivery",
      desc: "Your parcels are handled with the utmost care. Our specialized handling protocols ensure that even the most fragile items reach their destination in perfect condition.",
    },
    {
      img: safeDelivery,
      title: "24/7 Customer Support",
      desc: "Questions about your shipment? Our dedicated support team is available around the clock to help you with any inquiries or issues you may encounter.",
    },
  ];
  return (
    <div className="py-20 border-y border-dashed border-accent space-y-12 overflow-hidden">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`bg-pale rounded-3xl p-8 md:p-12 flex flex-col items-center gap-8 md:gap-16 
            ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? -2 : 2 }}
            className="w-full md:w-1/3 flex justify-center"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-48 h-48 md:w-64 md:h-64 object-contain transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`flex-1 space-y-4 text-center md:text-left border-dashed border-accent
            ${
              index % 2 === 0
                ? "md:border-l md:pl-16 pt-8 md:pt-0 border-t md:border-t-0"
                : "md:border-r md:pr-16 pt-8 md:pt-0 border-t md:border-t-0"
            }`}
          >
            <h3 className="text-accent font-extrabold text-2xl md:text-4xl leading-tight">
              {" "}
              {item.title}{" "}
            </h3>
            <p className="text-granite-gray font-medium leading-relaxed">
              {" "}
              {item.desc}{" "}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustProcess;
