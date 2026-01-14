import React from "react";
import { Link, useRouteError } from "react-router";
import { motion } from "framer-motion";
import error404 from "../../assets/error.jpg";
import { FaHome } from "react-icons/fa";

const Error404 = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="min-h-screen bg-pale flex items-center justify-center text-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white max-w-3xl w-full rounded-4xl shadow-2xl overflow-hidden flex flex-col items-center text-center p-8 md:p-16"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="max-w-xs md:max-w-sm mb-8"
        >
          <img
            src={error404}
            alt="Error Illustration"
            className="w-full h-auto mix-blend-multiply"
          />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black text-primary/20 absolute top-10 left-1/2 -translate-x-1/2 select-none z-0">
            {error.status || 404}
          </h1>

          <p className="text-granite-gray text-lg max-w-md mx-auto leading-relaxed">
            {error.statusText ||
              "It seems the parcel you are looking for has been diverted to an unknown destination."}
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            to="/"
            className="btn btn-primary btn-lg rounded-xl px-10 flex items-center gap-2 text-dark-gray shadow-xl hover:scale-105 transition-transform border-none"
          >
            <FaHome /> Go to Homepage
          </Link>
        </div>

        <p className="mt-12 text-sm text-gray-400 font-medium">
          ZapShift Logistics &copy; {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
};

export default Error404;
