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
        <NavLink to="/about">About Us</NavLink>
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
    <footer className="footer footer-horizontal footer-center bg-secondary text-light-gray  p-10 rounded-[3rem] mx-4 mb-4">
      <aside>
        <Logo />
        <p className="max-w-3xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </aside>
      <nav className="w-full border-y border-dashed border-blue-9 py-4">
        <ul className="menu menu-horizontal px-1"> {links} </ul>
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-4">
          <a className="bg-[#1881ba] w-9 h-9 rounded-full flex justify-center items-center">
            <FaLinkedinIn size="18" className="text-secondary" />
          </a>
          <a className="bg-base-100 w-9 h-9 rounded-full flex justify-center items-center">
            <FaXTwitter size="18" className="text-secondary" />
          </a>
          <a className="bg-[#009dff] w-9 h-9 rounded-full flex justify-center items-center">
            <FaFacebookF size="18" className="text-base-100" />
          </a>
          <a className="bg-[#ff0000] w-9 h-9 rounded-full flex justify-center items-center">
            <FaYoutube size="18" className="text-base-100" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
