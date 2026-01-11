import React from "react";
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
      <div className="mb-12">
        <span className="text-primary font-bold tracking-widest uppercase text-sm">
          Our Process
        </span>
        <h2 className="text-secondary font-extrabold text-3xl md:text-4xl lg:text-5xl mt-2">
          How it Works
        </h2>
        <div className="w-20 h-1.5 bg-primary mt-4 rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {howItWorksItems.map((item, index) => (
          <div
            key={index}
            className="group relative p-8 rounded-[2.5rem] bg-pale border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* Step Number Badge */}
            <div className="absolute top-6 right-8 text-5xl font-black text-gray-500 group-hover:text-primary/10 transition-colors">
              0{index + 1}
            </div>

            {/* Icon Container */}
            <div className="w-14 h-14 mb-6 rounded-2xl bg-secondary/5 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
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
            <p className="text-granite-gray text-sm leading-relaxed">
              {item.desc}
            </p>

            {/* Bottom Accent Bar */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary group-hover:w-1/2 transition-all duration-300 rounded-t-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
