import React, { useState, useEffect } from 'react';

const Toaster = ({ message, type = 'success', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          if (onClose) onClose();
        }, 300); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const baseStyles = 'fixed top-28 right-4 p-4 rounded-lg shadow-lg max-w-sm w-full flex items-center justify-between z-1000 transform transition-all duration-300 ease-in-out';
  const typeStyles = {
    success: 'text-green-600 border border-green-100',
    error: 'text-red-600 border border-red-600',
    warning: 'text-yellow-600 bg-yellow-100',
    info: 'text-blue-600 bg-blue-100',
  };
  const buttonStyles = {
    success: 'text-green-600 hover:text-green-800',
    error: 'text-red-600 hover:text-red-800',
    warning: 'text-yellow-600 hover:text-yellow-800',
    info: 'text-blue-600 hover:text-blue-800',
  };

  const visibilityStyles = isVisible 
    ? 'translate-x-0 opacity-100' 
    : 'translate-x-full opacity-0';

  return (
    <div className={`${baseStyles} ${typeStyles[type] || typeStyles.success} ${visibilityStyles}`}>
      <span className="flex-1 pr-2">{message}</span>
      <button
        className={`ml-2 focus:outline-none flex-shrink-0 ${buttonStyles[type] || buttonStyles.success}`}
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {
            if (onClose) onClose();
          }, 300);
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toaster;