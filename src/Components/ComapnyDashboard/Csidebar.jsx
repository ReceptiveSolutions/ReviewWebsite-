import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Globe, FileText, Edit3, Phone, Mail, Calendar, Shield, Menu, User, X, LogOut, Star, TrendingUp, Users, Eye } from 'lucide-react';

// Sidebar Component
function Csidebar({ active, setActive }) {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileSize = window.innerWidth < 1024;
      setIsMobile(isMobileSize);
      
      if (isMobileSize) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Building2 size={20} /> },
    { id: "profile", label: "Company Profile", icon: <User size={20} /> },
    { id: "documents", label: "Documents", icon: <FileText size={20} /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp size={20} /> },
    { id: "edit", label: "Edit Profile", icon: <Edit3 size={20} /> },
  ];

  const toggleSidebar = () => {
    setOpen(!open);
  };

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
      {isMobile && open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setOpen(false)} />
      )}

      <div
        className={`sidebar ${isMobile ? 'fixed  left-0' : 'relative'} z-50 flex ${
          isMobile 
            ? (open ? "w-64" : "w-0") 
            : (open ? "w-64" : "w-16")
        } bg-white text-gray-800 min-h-screen transition-all duration-300 shadow-lg border-r border-gray-200 ${
          isMobile && !open ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
        } overflow-hidden`}
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {open && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-semibold text-gray-900">Company Dashboard</h1>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="flex flex-col mt-6 space-y-1 px-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  if (isMobile) setOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 font-medium
                  ${active === item.id 
                    ? "bg-amber-50 text-amber-700 border-r-2 border-amber-500" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <span className={`${active === item.id ? "text-amber-600" : "text-gray-500"}`}>
                  {item.icon}
                </span>
                {open && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
          </nav>

          
        </div>
      </div>

      
    </>
  );
}
export default Csidebar