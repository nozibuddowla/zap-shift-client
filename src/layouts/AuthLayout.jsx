import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left Side: Form Area */}
      <div className="flex flex-col p-6 md:p-12 relative">
        <div className="mb-12">
          <Logo />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>

      {/* Right Side: Illustration Area */}
      <div className="hidden lg:flex bg-[#fafdf0] items-center justify-center p-12">
        <img
          src={authImage}
          alt="Logistics Illustration"
          className="max-w-[425.73px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
