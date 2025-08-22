import { useState, useEffect } from "react";
import { Menu, User, Edit3, X, LogOut } from "lucide-react";

export default function Sidebar({ active, setActive }) {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile/tablet size
  useEffect(() => {
    const checkIfMobile = () => {
      // Consider screens below 1024px as mobile/tablet (lg breakpoint)
      const isMobileSize = window.innerWidth < 1024;
      setIsMobile(isMobileSize);
      
      if (isMobileSize) {
        setOpen(false); // Close sidebar by default on mobile/tablet
      } else {
        setOpen(true); // Open sidebar by default on desktop
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "edit", label: "Edit Profile", icon: <Edit3 size={20} /> },
  ];

  // Toggle sidebar
  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Close sidebar when clicking outside on mobile/tablet
  useEffect(() => {
    if (isMobile && open) {
      const handleClickOutside = (event) => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !sidebar.contains(event.target)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMobile, open]);

  return (
    <>
      {/* Mobile/Tablet overlay */}
      {isMobile && open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar ${isMobile ? 'fixed' : 'relative'} z-50 flex ${
          isMobile 
            ? (open ? "w-64" : "w-0") 
            : (open ? "w-64" : "w-16")
        } bg-white text-gray-800 min-h-screen transition-all duration-300 shadow-lg border-r border-gray-200 ${
          isMobile && !open ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        } overflow-hidden`}
      >
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {open && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-semibold text-gray-900">User Profile</h1>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col mt-6 space-y-1 px-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  if (isMobile) setOpen(false); // Close sidebar after selection on mobile/tablet
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 font-medium
                  ${active === item.id 
                    ? "bg-amber-50 text-amber-700 border-r-2 border-amber-500" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                {/* Icon */}
                <span className={`${active === item.id ? "text-amber-600" : "text-gray-500"}`}>
                  {item.icon}
                </span>
                {/* Label only visible when sidebar open */}
                {open && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Footer - only visible when sidebar is open */}
          {open && (
            <div className="mt-auto p-4 border-t border-gray-200">
              <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-left w-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 font-medium">
                <LogOut size={20} className="text-gray-500" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet menu button when sidebar is closed */}
      {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 left-4 z-40 p-3 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 transition-colors duration-200"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
}