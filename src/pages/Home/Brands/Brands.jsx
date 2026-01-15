import { motion } from "framer-motion";
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/amazon_vector.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/star.png";
import logo7 from "../../../assets/brands/start_people.png";

const Brands = () => {
  const brands = [
    { img: logo3 },
    { img: logo1 },
    { img: logo4 },
    { img: logo6 },
    { img: logo7 },
    { img: logo5 },

    { img: logo2 },
  ];

  const duplicatedBrands = [...brands, ...brands];

  return (
    <div className="py-16 space-y-10 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-accent font-extrabold text-3xl md:text-4xl lg:text-5xl">
          We've helped thousands of sales teams
        </h2>
      </div>

      {/* Slider Container */}
      <div
        className="relative flex items-center"
        style={{
          // This creates the fade effect on the left and right edges
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {duplicatedBrands.map((logo, i) => (
            <div
              key={i}
              className="shrink-0 px-8 lg:px-12 flex items-center justify-center"
            >
              <img
                src={logo.img}
                alt="brand-logo"
                className="h-3 md:h-5 lg:h-7 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Brands;
