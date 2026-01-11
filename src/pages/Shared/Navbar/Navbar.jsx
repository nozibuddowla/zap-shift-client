import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { NavLink } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const closeDropdown = () => {
    setIsOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const linkItems = [
    "Services",
    "Coverage",
    "About Us",
    "Pricing",
    "Blog",
    "Contact",
  ];

  const links = (
    <>
      {linkItems.map((item) => (
        <li key={item}>
          <NavLink
            to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
            onClick={closeDropdown}
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold bg-transparent!"
                : "hover:text-accent bg-transparent!"
            }
          >
            {item}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full py-4 px-2 md:px-0">
      <div className="navbar bg-white/90 backdrop-blur-md rounded-2xl md:rounded-full shadow-sm border border-gray-100 px-2 sm:px-4 md:px-8 max-w-7xl mx-auto">
        {/* START: Menu & Logo */}
        <div className="navbar-start flex items-center gap-1">
          <div className="lg:hidden" ref={dropdownRef}>
            <button
              className="btn btn-ghost btn-circle btn-sm sm:btn-md"
              onClick={toggleMenu}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isOpen ? (
                  <HiX size={24} className="text-secondary" />
                ) : (
                  <HiOutlineMenuAlt4 size={24} className="text-secondary" />
                )}
              </div>
            </button>

            {/* Menu List */}
            {isOpen && (
              <ul className="absolute left-0 top-full mt-4 w-52 p-4 bg-white rounded-2xl shadow-2xl border border-gray-100 z-60 animate-in fade-in zoom-in duration-200">
                {links}
              </ul>
            )}
          </div>

          {/* Brand Logo */}
          <NavLink
            to="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Logo />
          </NavLink>
        </div>

        {/* CENTER: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium text-gray-600">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-1 sm:gap-3">
          <NavLink
            to="/signin"
            className="btn btn-ghost btn-sm sm:btn-md rounded-full px-4 hidden sm:flex border-none"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/be-a-rider"
            className="btn btn-primary btn-sm sm:btn-md text-dark-gray rounded-full px-3 sm:px-6 flex items-center gap-2 shadow-md border-none"
          >
            <span >Be a rider</span>
            <div className="bg-secondary rounded-full p-1 group">
              <FiArrowUpRight className="text-primary" size={12} />
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
