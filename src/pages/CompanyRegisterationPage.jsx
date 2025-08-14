import React, { useState, useRef, useEffect } from 'react';
import { Instagram, Facebook, Youtube, Twitter, Linkedin, Plus } from "lucide-react";
import Toaster from '../Components/Toaster';

function CompanyRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    website_link: "",
    google_map_link: "",
    categories: "",
    gstin_num: "",
    business_email: "",
    business_phone: "",
    social_links: {
      instagram: "",
      facebook: "",
      youtube: "",
      twitter: "",
      linkedin: ""
    },
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);
  const [activeSocial, setActiveSocial] = useState(null);
  const socialLinksRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: value
      }
    }));
    const isValidUrl = /^https?:\/\/.+/.test(value.trim());
    console.log(`Social link validation at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}:`, {
      platform,
      value,
      isValid: isValidUrl
    });
  };

  const handleSocialLinkKeyDown = (e, platform) => {
  if (e.key === 'Enter') {
    const value = formData.social_links[platform]?.trim() || "";
    const isValidUrl = /^https?:\/\/.+/.test(value);
    console.log(`Enter key pressed for social link at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}:`, {
      platform,
      value,
      isValid: isValidUrl
    });
    if (isValidUrl) {
      setActiveSocial(null); // Close input field on valid URL
    } else {
      setToast({ message: `Please enter a valid ${platform} URL starting with http:// or https://`, type: 'error' });
    }
  }
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (socialLinksRef.current && !socialLinksRef.current.contains(event.target)) {
      console.log(`Click outside social links at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`);
      if (activeSocial) {
        const value = formData.social_links[activeSocial]?.trim() || "";
        const isValidUrl = /^https?:\/\/.+/.test(value);
        if (!isValidUrl && value) {
          setToast({ message: `Invalid ${activeSocial} URL. It was not saved.`, type: 'error' });
          setFormData((prev) => ({
            ...prev,
            social_links: {
              ...prev.social_links,
              [activeSocial]: ""
            }
          }));
        }
        setActiveSocial(null);
      }
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, [activeSocial, formData.social_links]);


const validateGSTINFormat = (gstin) => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gstin.toUpperCase());
};

const validateForm = () => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "Company name is required";
  }

  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
  }

  if (!formData.business_email.trim()) {
    newErrors.business_email = "Business email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.business_email)) {
    newErrors.business_email = "Invalid email format";
  }

  if (!formData.gstin_num.trim()) {
    newErrors.gstin_num = "GSTIN is required";
  } else if (!validateGSTINFormat(formData.gstin_num)) {
    newErrors.gstin_num = "Invalid GSTIN format";
  }

  if (formData.website_link && !/^https?:\/\/.+/.test(formData.website_link)) {
    newErrors.website_link = "Website URL should start with http:// or https://";
  }

  if (formData.google_map_link && !/^https?:\/\/.+/.test(formData.google_map_link)) {
    newErrors.google_map_link = "Google Map URL should start with http:// or https://";
  }

  if (formData.business_phone && !/^[+]?[\d\s\-()]{10,15}$/.test(formData.business_phone)) {
    newErrors.business_phone = "Invalid phone number";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // setLoading(true)

  if (!validateForm()) return;

  try {
    setLoading(true);

    // Prepare data for submission
    const submitData = {
      ...formData,
      categories: formData.categories.trim() ? formData.categories.split(',').map(cat => cat.trim()).filter(cat => cat) : [],
      gstin_num: formData.gstin_num.toUpperCase(),
      // Only include non-empty social links
      social_links: Object.fromEntries(
        Object.entries(formData.social_links).filter(([key, value]) => value.trim() !== '')
      )
    };

    const res = await fetch("http://localhost:5000/api/companies/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.error || responseData.message || "Failed to register company");
    }

    console.log("Company Registered:", responseData);
    setToast({
      message: "Company registered successfully!",
      type: 'success',
    });

    // Reset form after successful submission
    setFormData({
      name: "",
      address: "",
      website_link: "",
      google_map_link: "",
      categories: "",
      gstin_num: "",
      business_email: "",
      business_phone: "",
      social_links: {
        instagram: "",
        facebook: "",
        youtube: "",
        twitter: "",
        linkedin: ""
      },
    });
    setActiveSocial(null);

  } catch (err) {
    console.error("Registration error:", err);
    setToast({ message: err.message, type: 'error' });
  } finally {
    setLoading(false);
  }
};

const socialPlatforms = [
    {
      key: "instagram",
      icon: <Instagram size={24} />,
      filledClass: "text-pink-500 fill-pink-500",
      label: "Instagram",
      regex: /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]{1,30}$/,
      errorMessage: "Please enter a valid Instagram URL (e.g., https://www.instagram.com/username)"
    },
    {
      key: "facebook",
      icon: <Facebook size={24} />,
      filledClass: "text-blue-600 fill-blue-600",
      label: "Facebook",
      regex: /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.-]{5,50}$/,
      errorMessage: "Please enter a valid Facebook URL (e.g., https://www.facebook.com/username)"
    },
    {
      key: "youtube",
      icon: <Youtube size={24} />,
      filledClass: "text-red-500 fill-red-500",
      label: "YouTube",
      regex: /^https:\/\/(www\.)?youtube\.com\/(channel\/[A-Za-z0-9_-]{10,}|user\/[A-Za-z0-9_-]{3,}|c\/[A-Za-z0-9_-]{3,})$/,
      errorMessage: "Please enter a valid YouTube URL (e.g., https://www.youtube.com/channel/UC12345)"
    },
    {
      key: "twitter",
      icon: <Twitter size={24} />,
      filledClass: "text-sky-400 fill-sky-400",
      label: "Twitter",
      regex: /^https:\/\/(www\.)?(twitter|x)\.com\/[A-Za-z0-9_]{1,15}$/,
      errorMessage: "Please enter a valid Twitter/X URL (e.g., https://x.com/username)"
    },
    {
      key: "linkedin",
      icon: <Linkedin size={24} />,
      filledClass: "text-blue-700 fill-blue-700",
      label: "LinkedIn",
      regex: /^https:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9.-]{3,100}$/,
      errorMessage: "Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)"
    },
  ];

return (
  <div className="min-h-screen flex items-center justify-center bg-amber-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Background decorations */}
    <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-amber-100 opacity-30"></div>
    <div className="absolute -right-20 bottom-1/4 w-64 h-64 rounded-full bg-amber-100 opacity-30"></div>
    <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-amber-200 opacity-20 rotate-45"></div>
    <div className="absolute right-1/4 bottom-1/3 w-40 h-40 bg-amber-200 opacity-20 rotate-12"></div>
    <div className="absolute left-1/3 top-20 w-24 h-24 bg-amber-300 opacity-15 -rotate-12"></div>
    <div className="absolute right-1/3 bottom-20 w-20 h-20 bg-amber-300 opacity-15 rotate-45"></div>
    <div className="absolute left-10 bottom-10 w-16 h-16 bg-amber-400 opacity-10 -rotate-45"></div>
    <div className="absolute right-10 top-10 w-16 h-16 bg-amber-400 opacity-10 rotate-12"></div>
    <div className="absolute left-0 top-1/4 w-0 h-0 border-l-[100px] border-l-transparent border-b-[200px] border-b-amber-100 opacity-20"></div>
    <div className="absolute right-0 bottom-1/4 w-0 h-0 border-r-[150px] border-r-transparent border-t-[300px] border-t-amber-100 opacity-20"></div>

    <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-amber-200 relative z-10">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-amber-900">
          Register Your Company
        </h2>
        <p className="mt-2 text-sm text-amber-800">
          Fill in the details to list your company
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.name ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter your company name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.address ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter your company address"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="business_email"
            value={formData.business_email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.business_email ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="business@company.com"
          />
          {errors.business_email && (
            <p className="mt-1 text-sm text-red-600">{errors.business_email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Business Phone
          </label>
          <input
            type="tel"
            name="business_phone"
            value={formData.business_phone}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.business_phone ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="+91 9876543210"
          />
          {errors.business_phone && (
            <p className="mt-1 text-sm text-red-600">{errors.business_phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            GSTIN Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="gstin_num"
            value={formData.gstin_num}
            onChange={handleChange}
            maxLength="15"
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.gstin_num ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="22AAAAA0000A1Z5"
          />
          {errors.gstin_num && (
            <p className="mt-1 text-sm text-red-600">{errors.gstin_num}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website Link
          </label>
          <input
            type="url"
            name="website_link"
            value={formData.website_link}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.website_link ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="https://www.yourcompany.com"
          />
          {errors.website_link && (
            <p className="mt-1 text-sm text-red-600">{errors.website_link}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Google Map Link
          </label>
          <input
            type="url"
            name="google_map_link"
            value={formData.google_map_link}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.google_map_link ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="https://maps.google.com/..."
          />
          {errors.google_map_link && (
            <p className="mt-1 text-sm text-red-600">{errors.google_map_link}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categories (comma separated)
          </label>
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border"
            placeholder="Technology, Software, Consulting"
          />
        </div>

        <div ref={socialLinksRef}>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Social Links
          </label>
          <div className="flex flex-wrap gap-4">
            {socialPlatforms.map((platform) => {
              const isValidUrl = platform.regex.test(formData.social_links[platform.key]?.trim() || "");
              return (
                <div key={platform.key} className="flex flex-col items-center">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveSocial(platform.key)}
                      className={`p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 border-2 border-transparent hover:border-gray-200 ${
                        isValidUrl ? platform.filledClass : "text-gray-400"
                      }`}
                      title={`${isValidUrl ? "Edit" : "Add"} ${platform.label} link`}
                    >
                      {platform.icon}
                    </button>
                    {!isValidUrl && (
                      <button
                        type="button"
                        onClick={() => setActiveSocial(platform.key)}
                        className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors duration-200"
                        title={`Add ${platform.label} link`}
                      >
                        <Plus size={12} className="text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {activeSocial && (
            <div className="mt-4 w-full max-w-xs mx-auto">
              <input
                type="url"
                placeholder={`Enter ${socialPlatforms.find(p => p.key === activeSocial)?.label} link`}
                value={formData.social_links[activeSocial] || ""}
                onChange={(e) => handleSocialLinkChange(activeSocial, e.target.value)}
                onKeyDown={(e) => handleSocialLinkKeyDown(e, activeSocial)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2 border"
              />
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register Company"
            )}
          </button>
        </div>
      </div>

      <Toaster
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  </div>
);
}
export default CompanyRegistrationPage;