import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Twitter, Linkedin, Plus, Upload, Mail, Phone, MapPin, Globe, FileText, Image, User } from "lucide-react";

// FormInput Component
// FormInput Component
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  maxLength,
  accept,
  rows,
  className = "",
  icon: Icon
}) => {
  const baseInputClasses = `mt-1 block w-full rounded-xl shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 sm:text-sm p-4 border transition-all duration-200 ${
    error ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
  } ${Icon ? "pl-12" : ""} ${className}`;

  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
          )}
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={rows || 3}
            className={baseInputClasses}
            placeholder={placeholder}
          />
        </div>
      );
    }

    return (
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          accept={accept}
          className={baseInputClasses}
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-800">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
};


export default FormInput;