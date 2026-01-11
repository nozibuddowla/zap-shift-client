import React from "react";
import Logo from "../../../components/Logo/Logo";
import { NavLink } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "hover:text-accent transition-colors"
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "hover:text-accent transition-colors"
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "hover:text-accent transition-colors"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "hover:text-accent transition-colors"
          }
        >
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "hover:text-accent transition-colors"
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-bold"
              : "hover:text-accent transition-colors"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );
  return (
    <header className="sticky top-0 z-50 w-full py-4 px-2 md:px-0">
      <div className="navbar bg-white/90 backdrop-blur-md rounded-2xl md:rounded-full shadow-sm border border-gray-100 px-4 md:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-gray-100"
            >
              {" "}
              {links}{" "}
            </ul>
          </div>
          {/* Brand Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {" "}
            <Logo />{" "}
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium text-gray-600">
            {" "}
            {links}{" "}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          <NavLink
            to="/signin"
            className="btn btn-outline rounded-full px-6 hidden sm:flex border-none"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/be-a-rider"
            className="btn btn-primary text-dark-gray rounded-full px-6 flex items-center gap-2 shadow-md hover:shadow-lg transition-all border-none"
          >
            Be a rider
            <div className="bg-secondary rounded-full p-1 group">
              <FiArrowUpRight className="text-primary" size={14} />
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
