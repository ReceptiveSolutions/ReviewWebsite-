import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Logo } from "../../index";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close search when menu opens
    if (!isMobileMenuOpen) {
      setIsMobileSearchOpen(false);
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    // Close menu when search opens
    if (!isMobileSearchOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
    // Close both mobile menu and search
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
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
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with click handler */}
          <div 
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={handleLogoClick}
          >
            <Logo className="h-10 sm:h-12 w-auto text-white filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300" />
          </div>

          {/* Desktop Navigation - Hidden on smaller screens */}
          <nav className="hidden lg:flex items-center space-x-1">
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

          {/* Desktop Search and Sign Up - Hidden on smaller screens */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 xl:w-56 px-4 py-2 pr-10 bg-white/90 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b45309] focus:bg-white text-gray-800 placeholder-gray-500 transition-all duration-300"
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
              className="bg-[#b45309] hover:bg-[#9a4607] text-white px-4 xl:px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm xl:text-base"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Search Icon */}
            <button
              onClick={toggleMobileSearch}
              className="p-2 text-white hover:bg-[#b45309] rounded-lg transition-colors duration-300"
              aria-label="Toggle search"
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 ${
                  isMobileSearchOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileSearchOpen ? (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                )}
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-white hover:bg-[#b45309] rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
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
        </div>

        {/* Mobile Search - Only visible when toggled */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileSearchOpen ? "max-h-20 opacity-100 pb-4" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pr-10 bg-white/90 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b45309] focus:bg-white text-gray-800 placeholder-gray-500 transition-all duration-300"
                autoFocus={isMobileSearchOpen}
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
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-[#b45309] shadow-inner`}
      >
        <Container>
          <nav className="py-2 space-y-1">
            <NavLink
              to="/reviews"
              className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
              onClick={toggleMobileMenu}
            >
              Write Review
            </NavLink>
            <NavLink
              to="/blog"
              className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
              onClick={toggleMobileMenu}
            >
              Blog
            </NavLink>
            <NavLink
              to="/about"
              className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
              onClick={toggleMobileMenu}
            >
              About
            </NavLink>
            <NavLink
              to="/login"
              className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
              onClick={toggleMobileMenu}
            >
              Login
            </NavLink>
            <div className="pt-2 pb-4 px-4">
              <button
                onClick={() => {
                  navigate("/signup");
                  toggleMobileMenu();
                }}
                className="w-full bg-[#9a4607] hover:bg-[#823b06] text-white py-2 rounded-lg font-medium transition-colors duration-300"
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