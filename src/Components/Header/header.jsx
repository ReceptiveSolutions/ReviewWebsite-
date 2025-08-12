import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Logo } from "../../index";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 font-medium transition-all duration-300 rounded-lg ${
      isActive
        ? "text-white bg-[#b45309]"
        : "text-white hover:text-amber-100 hover:bg-[#b45309]/90"
    }`;

  return (
    <header className="bg-amber-500 shadow-lg sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-25">
          {" "}
          {/* Increased from h-16 to h-20 */}
          {/* Logo */}
          <div className="flex items-center">
            <Logo className="h-15 w-auto text-white filter drop-shadow-sm" />{" "}
            {/* Increased logo size */}
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/reviews" className={navLinkClass}>
              Write Review
            </NavLink>
            <NavLink to="/blog" className={navLinkClass}>
              Blog
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </nav>
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 pr-10 bg-white/90 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b45309] focus:bg-white text-gray-800 placeholder-gray-500 transition-all duration-300"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#b45309] transition-colors duration-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            <button
              onClick={() => navigate("/signup")}
              className="bg-[#b45309] hover:bg-[#9a4607] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Sign Up
            </button>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-white hover:bg-[#b45309] rounded-lg transition-colors duration-300"
          >
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-45" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-3 pr-12 bg-white/90 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b45309] focus:bg-white text-gray-800 placeholder-gray-500 transition-all duration-300"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#b45309] transition-colors duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-[#b45309]`}
      >
        {" "}
        {/* Changed to #b45309 */}
        <Container>
          <nav className="py-4 space-y-1">
            <NavLink
              to="/reviews"
              className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Write a Review
            </NavLink>
            <NavLink
              to="/blog"
              className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/about"
              className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/login"
              className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </NavLink>
            <div className="pt-3 px-4">
              <button
                className="w-full bg-[#9a4607] hover:bg-[#823b06] text-white py-3 rounded-lg font-medium transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;
