import React from 'react';
import logo from "../../assets/logo.png"

const Logo = () => {
    return (
      <div className="flex items-end ">
        <img src={logo} alt="zapShift" className="h-8 sm:h-10 w-auto" />
        <h3 className="text-lg sm:text-xl md:text-3xl font-bold -ms-2 mb-0.5 sm:mb-0">
          zapShift
        </h3>
      </div>
    );
};

export default Logo;