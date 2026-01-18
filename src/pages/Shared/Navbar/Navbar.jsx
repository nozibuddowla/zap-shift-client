import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../components/Logo/Logo";
import { NavLink, useNavigate } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

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
    { name: "Services", path: "/services", private: false },
    { name: "Coverage", path: "/coverage", private: false },
    { name: "About Us", path: "/about-us", private: false },
    { name: "Pricing", path: "/pricing", private: false },
    { name: "Blog", path: "/blog", private: false },
    { name: "Contact", path: "/contact", private: false },
    // Private Routes
    { name: "Send Parcel", path: "/send-parcel", private: true },
    { name: "My Parcels", path: "/dashboard/my-parcels", private: true },
    { name: "Be a Rider", path: "/be-a-rider", private: true },
  ];

  const visibleLinks = linkItems.filter((item) => {
    if (item.private) return !!user; 
    return true;
  });

  const links = (
    <>
      {visibleLinks.map((item) => (
        <li key={item.name} className="mb-5 lg:mb-0">
          <NavLink
            to={item.path}
            onClick={closeDropdown}
            className={({ isActive }) =>
              isActive
                ? "text-accent bg-primary rounded-full p-2 font-bold"
                : "hover:text-accent bg-transparent!"
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="sticky top-0 z-50 w-full py-4">
      <div className="navbar bg-white/90 backdrop-blur-md rounded-2xl md:rounded-full shadow-sm border border-gray-100 px-2 sm:px-4 md:px-8 max-w-7xl mx-auto">
        {/* START: Menu & Logo */}
        <div className="navbar-start flex items-center gap-1">
          <div className="xl:hidden" ref={dropdownRef}>
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
        <div className="navbar-center hidden xl:flex">
          <ul className="menu menu-horizontal gap-2 font-medium text-gray-600">
            {links}
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-ghost btn-sm sm:btn-md rounded-full px-4 hidden sm:flex border-none"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-1 sm:gap-3">
              <NavLink
                to="/signin"
                className="btn btn-ghost btn-sm sm:btn-md rounded-full px-4 hidden sm:flex border-none"
              >
                Sign In
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
