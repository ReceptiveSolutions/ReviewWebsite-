import React, { useState, useRef, useEffect } from 'react';
import Toaster from '../components/Toaster';
import { BackgroundDecorations, CompanyRegistrationForm } from '../index';

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
    description: "",
    social_links: {
      instagram: "",
      facebook: "",
      youtube: "",
      twitter: "",
      linkedin: ""
    },
    userId: localStorage.getItem('userId') || null,
    comp_profile_img: null
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);
  const [activeSocial, setActiveSocial] = useState(null);
  const socialLinksRef = useRef(null);
  const fileInputRef = useRef(null);

  // Social platform configurations
  const socialPlatforms = [
    {
      key: "instagram",
      label: "Instagram",
      regex: /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]{1,30}$/,
      errorMessage: "Please enter a valid Instagram URL (e.g., https://www.instagram.com/username)"
    },
    {
      key: "facebook",
      label: "Facebook",
      regex: /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.-]{5,50}$/,
      errorMessage: "Please enter a valid Facebook URL (e.g., https://www.facebook.com/username)"
    },
    {
      key: "youtube",
      label: "YouTube",
      regex: /^https:\/\/(www\.)?youtube\.com\/(channel\/[A-Za-z0-9_-]{10,}|user\/[A-Za-z0-9_-]{3,}|c\/[A-Za-z0-9_-]{3,})$/,
      errorMessage: "Please enter a valid YouTube URL (e.g., https://www.youtube.com/channel/UC12345)"
    },
    {
      key: "twitter",
      label: "Twitter",
      regex: /^https:\/\/(www\.)?(twitter|x)\.com\/[A-Za-z0-9_]{1,15}$/,
      errorMessage: "Please enter a valid Twitter/X URL (e.g., https://x.com/username)"
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      regex: /^https:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9.-]{3,100}$/,
      errorMessage: "Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)"
    },
  ];

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, comp_profile_img: "Image size should not exceed 5MB" }));
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, comp_profile_img: "Please upload a valid image file" }));
        return;
      }
      setFormData(prev => ({ ...prev, comp_profile_img: file }));
      setErrors(prev => ({ ...prev, comp_profile_img: "" }));
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
  };

  const handleSocialLinkKeyDown = (e, platform) => {
    if (e.key === 'Enter') {
      const value = formData.social_links[platform]?.trim() || "";
      const platformConfig = socialPlatforms.find(p => p.key === platform);
      const isValidUrl = platformConfig.regex.test(value);
      if (isValidUrl) {
        setActiveSocial(null);
      } else {
        setToast({ message: platformConfig.errorMessage, type: 'error' });
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (socialLinksRef.current && !socialLinksRef.current.contains(event.target)) {
        if (activeSocial) {
          const value = formData.social_links[activeSocial]?.trim() || "";
          const platformConfig = socialPlatforms.find(p => p.key === activeSocial);
          const isValidUrl = platformConfig.regex.test(value);
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

    if (!formData.userId) {
      newErrors.userId = "User authentication required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const submitData = new FormData();
      submitData.append('name', formData.name.trim());
      submitData.append('address', formData.address.trim());
      submitData.append('website_link', formData.website_link || '');
      submitData.append('google_map_link', formData.google_map_link || '');
      submitData.append('categories', JSON.stringify(formData.categories.trim() ? formData.categories.split(',').map(cat => cat.trim()).filter(cat => cat) : []));
      submitData.append('gstin_num', formData.gstin_num.toUpperCase());
      submitData.append('business_email', formData.business_email.toLowerCase().trim());
      submitData.append('business_phone', formData.business_phone || '');
      submitData.append('description', formData.description.trim());
      submitData.append('social_links', JSON.stringify(Object.fromEntries(
        Object.entries(formData.social_links).filter(([key, value]) => value.trim() !== '')
      )));
      submitData.append('userId', formData.userId);
      if (formData.comp_profile_img) {
        submitData.append('comp_profile_img', formData.comp_profile_img);
      }

      const res = await fetch("http://localhost:5000/api/companies/register", {
        method: "POST",
        body: submitData,
      });

      const responseData = await res.json();

      if (!res.ok) {
        if (responseData.error === "A company with this email already exists.") {
          setErrors(prev => ({ ...prev, business_email: responseData.error }));
        } else if (responseData.error === "A company with this GSTIN already exists.") {
          setErrors(prev => ({ ...prev, gstin_num: responseData.error }));
        } else if (responseData.error === "GSTIN verification failed.") {
          setErrors(prev => ({ ...prev, gstin_num: responseData.error }));
        } else if (responseData.error === "GSTIN is not valid or not registered.") {
          setErrors(prev => ({ ...prev, gstin_num: responseData.error }));
        } else {
          setToast({ message: responseData.error || responseData.message || "Failed to register company", type: 'error' });
        }
        throw new Error(responseData.error || responseData.message || "Failed to register company");
      }

      console.log("Company Registered:", responseData);
      setToast({
        message: "Company registered successfully!",
        type: 'success',
      });

      // Reset form
      setFormData({
        name: "",
        address: "",
        website_link: "",
        google_map_link: "",
        categories: "",
        gstin_num: "",
        business_email: "",
        business_phone: "",
        description: "",
        social_links: {
          instagram: "",
          facebook: "",
          youtube: "",
          twitter: "",
          linkedin: ""
        },
        userId: localStorage.getItem('userId') || null,
        comp_profile_img: null
      });
      setActiveSocial(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (err) {
      console.error("Registration error:", err);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <BackgroundDecorations />

      {/* Container for the form - removed the small wrapper to accommodate horizontal form */}
      <div className="relative z-10">
        <CompanyRegistrationForm
          formData={formData}
          errors={errors}
          loading={loading}
          activeSocial={activeSocial}
          socialLinksRef={socialLinksRef}
          fileInputRef={fileInputRef}
          onFormChange={handleChange}
          onFileChange={handleFileChange}
          onSocialLinkChange={handleSocialLinkChange}
          onSocialLinkKeyDown={handleSocialLinkKeyDown}
          onSetActiveSocial={setActiveSocial}
          onSubmit={handleSubmit}
        />

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