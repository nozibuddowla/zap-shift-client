import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AboutUS = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabItems = [
    {
      tab: "Story",
      desc: "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. \n\n Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.",
    },
    {
      tab: "Mission",
      desc: "Our mission is to bridge the gap between merchants and customers by providing a seamless logistics experience. We strive to empower small businesses with affordable shipping rates and high-tech tracking solutions. \n\n We believe that every parcel carries a story, and our job is to ensure that story reaches its conclusion safely and swiftly.",
    },
    {
      tab: "Success",
      desc: "With over 1 million parcels delivered and a 99% satisfaction rate, our success is measured by the trust of our clients. We have expanded our reach to every district in Bangladesh, ensuring total coverage. \n\n Our growth is fueled by innovation and a relentless pursuit of operational excellence.",
    },
    {
      tab: "Team & Others",
      desc: "Behind ZapShift is a diverse team of logistics experts, developers, and customer support heroes. We work 24/7 to monitor transit and solve issues before they reach the customer. \n\n Beyond logistics, we are committed to eco-friendly packaging and supporting local communities through our delivery network.",
    },
  ];
  return (
    <div className="bg-white rounded-4xl p-8 md:p-16 lg:p-20 shadow-2xl overflow-hidden">
      <div className="space-y-4 border-b border-granite-gray pb-12 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className=" text-accent font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-tight"
        >
          About Us
        </motion.h1>
        <p className="max-w-157.25 text-granite-gray leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>
      {/* Tabs Container */}{" "}
      <div className="flex flex-col">
        {/* Tab Headers */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
          {tabItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`transition-all duration-300 hover:cursor-pointer ${
                activeTab === index
                  ? "font-extrabold text-green-10 scale-105"
                  : " text-granite-gray"
              }`}
            >
              {item.tab}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="min-h-72 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-granite-gray text-xl leading-loose whitespace-pre-line"
            >
              {tabItems[activeTab].desc}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
