import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinkClass = "text-gray-300 hover:text-amber-300 transition-colors duration-300 hover:underline";
  const socialIconClass = "w-6 h-6 text-gray-300 hover:text-amber-300 transition-colors duration-300 hover:scale-110 transform";

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-4">
                <div className="h-10 w-auto text-amber-400 font-bold text-2xl flex items-center">
                  <span className="bg-amber-500 text-gray-900 rounded px-2 py-1 mr-1">R</span>
                  <span className="text-amber-400">ReviewHub</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Discover authentic reviews and share your experiences with our community. 
                Your voice matters in helping others make informed decisions.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="#" className="p-2 rounded-lg hover:bg-amber-500/20 transition-colors duration-300">
                  <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-lg hover:bg-amber-500/20 transition-colors duration-300">
                  <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.20-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-lg hover:bg-amber-500/20 transition-colors duration-300">
                  <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87C3.44 4.78 4.24 4 5.5 4c1.26 0 2.03.78 2.06 1.89C7.56 6.93 6.73 7.76 5.47 7.76zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.37 0 4.15 1.55 4.15 4.89v6.21h.02z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-lg hover:bg-amber-500/20 transition-colors duration-300">
                  <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.120.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165C4.575 16.669 3.6 14.719 3.6 11.969c0-3.83 2.786-7.347 8.027-7.347 4.216 0 7.499 3.006 7.499 7.014 0 4.185-2.637 7.55-6.297 7.55-1.232 0-2.386-.64-2.78-1.378 0 0-.61 2.323-.76 2.893-.274 1.07-1.016 2.411-1.513 3.235C9.849 23.859 10.892 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-amber-400 font-semibold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <NavLink to="/reviews" className={footerLinkClass}>
                    Write Review
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/blog" className={footerLinkClass}>
                    Blog
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={footerLinkClass}>
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={footerLinkClass}>
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-amber-400 font-semibold mb-4 text-lg">Support</h3>
              <ul className="space-y-3">
                <li>
                  <NavLink to="/help" className={footerLinkClass}>
                    Help Center
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq" className={footerLinkClass}>
                    FAQ
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy" className={footerLinkClass}>
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/terms" className={footerLinkClass}>
                    Terms of Service
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8 border border-amber-500/20">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-amber-400 font-semibold text-xl mb-2">Stay Updated</h3>
              <p className="text-gray-300 mb-4">Subscribe to our newsletter for the latest reviews and updates.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-gray-700 text-gray-100 placeholder-gray-400"
                />
                <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-900 py-6 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} ReviewHub. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-gray-300 text-sm">Trusted Reviews</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z"/>
                </svg>
                <span className="text-gray-300 text-sm">Secure Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;