import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Logo } from "../../index";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Store/authSlice";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Get auth state
  const { status, userData } = useSelector((state) => state.auth);
  const showBusinessLink = !(status && userData?.type === "business");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (!isMobileSearchOpen) setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileDropdownOpen(false);
    navigate("/");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Dynamically determine the business link based on login status
  const getBusinessLink = () => {
    if (status && userData?.id) {
      return `/add-business/${userData.id}`;
    }
    return "/add-business";
  };

  // Construct profile image URL or fallback to first letter
  const getProfileDisplay = () => {
    if (userData?.prof_img) {
      return (
        <img
          src={`http://localhost:5000/uploads/${userData.prof_img}`}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#b45309] font-bold cursor-pointer shadow-md">
        {userData?.firstName?.[0]?.toUpperCase() || "U"}
      </div>
    );
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 font-medium transition-all duration-300 rounded-lg ${
      isActive
        ? "text-white bg-[#b45309]"
        : "text-white hover:text-amber-100 hover:bg-[#b45309]/90"
    }`;

  return (
    <header className="bg-amber-500 shadow-lg sticky top-0 z-500">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={handleLogoClick}
          >
            <Logo className="h-10 sm:h-12 w-auto text-white filter drop-shadow-lg hover:drop-shadow-xl transition-all duration-300" />
          </div>

          {/* Desktop Navigation */}
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
            {showBusinessLink && (
              <NavLink to={getBusinessLink()} className={navLinkClass}>
                + Business
              </NavLink>
            )}
            {!status && (
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            )}
          </nav>

          {/* Desktop Search + Sign Up/Profile */}
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

            {!status ? (
              <button
                onClick={() => navigate("/signup")}
                className="bg-[#b45309] hover:bg-[#9a4607] text-white px-4 xl:px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-sm xl:text-base"
              >
                Sign Up
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[#b45309]/90 transition-all duration-300"
                >
                  {getProfileDisplay()}
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {userData?.firstName || "User"} {userData?.lastName || ""}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {userData?.email || ""}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate(`/user-prof/${userData?.id}`);
                        setIsProfileDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setIsProfileDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </button>
                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Search Icon */}
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

            {/* Menu Icon */}
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

        {/* Mobile Search */}
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
            {showBusinessLink && (
              <NavLink
                to={getBusinessLink()}
                className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
                onClick={toggleMobileMenu}
              >
                + Business
              </NavLink>
            )}
            {!status ? (
              <>
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
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className="block px-4 py-3 text-white hover:bg-[#9a4607] rounded-lg transition-colors duration-300 font-medium"
                  onClick={toggleMobileMenu}
                >
                  Settings
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left px-4 py-3 text-white hover:bg-red-700 rounded-lg transition-colors duration-300 font-medium"
                >
                  Logout
                </button>
                <div className="px-4 py-3 flex items-center space-x-3 border-t border-[#9a4607] mt-2 pt-4">
                  {getProfileDisplay()}
                  <div>
                    <span className="text-white font-medium block">
                      {userData?.firstName || "User"} {userData?.lastName || ""}
                    </span>
                    <span className="text-amber-200 text-sm">
                      {userData?.email || ""}
                    </span>
                  </div>
                </div>
              </>
            )}
          </nav>
        </Container>
      </div>
    </header>
  );
}

export default Header;