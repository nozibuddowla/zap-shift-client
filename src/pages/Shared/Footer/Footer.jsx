import React from "react";
import Logo from "../../../components/Logo/Logo";
import { NavLink } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const links = (
    <>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/aboutus">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );
  return (
    <footer className="bg-secondary text-light-gray p-4 sm:p-6 lg:p-10 rounded-4xl sm:rounded-[3rem] mx-4 mb-8 flex flex-col items-center text-center space-y-4">
      <div className="flex flex-col items-center">
        <Logo />
        <p className="max-w-md sm:max-w-2xl mt-4 text-sm sm:text-base opacity-70 leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <nav className="w-full border-y border-dashed border-blue-9 py-4">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm font-medium uppercase tracking-wider">
          {links}
        </ul>
      </nav>

      <nav>
        <div className="flex gap-4">
          <a className="bg-[#1881ba] w-9 h-9 rounded-full flex justify-center items-center hover:scale-110 transition-transform">
            <FaLinkedinIn size="18" className="text-secondary" />
          </a>
          <a className="bg-base-100 w-9 h-9 rounded-full flex justify-center items-center hover:scale-110 transition-transform">
            <FaXTwitter size="18" className="text-secondary" />
          </a>
          <a className="bg-[#009dff] w-9 h-9 rounded-full flex justify-center items-center hover:scale-110 transition-transform">
            <FaFacebookF size="18" className="text-base-100" />
          </a>
          <a className="bg-[#ff0000] w-9 h-9 rounded-full flex justify-center items-center hover:scale-110 transition-transform">
            <FaYoutube size="18" className="text-base-100" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
