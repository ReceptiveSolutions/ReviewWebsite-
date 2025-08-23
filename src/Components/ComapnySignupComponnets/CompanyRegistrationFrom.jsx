import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Twitter, Linkedin, Plus, Upload, Mail, Phone, MapPin, Globe, FileText, Image, User } from "lucide-react";
import FormInput from './FormInput';
import SocialLinks from './SocialLinks';

const CompanyRegistrationForm = ({
  formData = {
    name: '',
    address: '',
    business_email: '',
    business_phone: '',
    gstin_num: '',
    comp_profile_img: null,
    website_link: '',
    google_map_link: '',
    categories: '',
    description: '',
    social_links: {}
  },
  errors = {},
  loading = false,
  activeSocial = null,
  socialLinksRef,
  fileInputRef,
  onFormChange = () => {},
  onFileChange = () => {},
  onSocialLinkChange = () => {},
  onSocialLinkKeyDown = () => {},
  onSetActiveSocial = () => {},
  onSubmit = () => {}
}) => {
  return (
    <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-200 px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-600 flex items-center gap-3">
            <User className="h-8 w-8" />
            Company Registration
          </h2>
          <p className="text-gray-600 mt-2">Register your business and join our platform</p>
        </div>

        {/* Changed from div to form and added onSubmit */}
        <form onSubmit={onSubmit} className="p-8">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <User className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                </div>
                
                <FormInput
                  label="Company Name"
                  name="name"
                  value={formData.name}
                  onChange={onFormChange}
                  error={errors.name}
                  placeholder="Enter your company name"
                  required
                  icon={User}
                />

                <FormInput
                  label="GSTIN Number"
                  name="gstin_num"
                  value={formData.gstin_num}
                  onChange={onFormChange}
                  error={errors.gstin_num}
                  placeholder="22AAAAA0000A1Z5"
                  maxLength="15"
                  required
                  icon={FileText}
                />

                <FormInput
                  label="Company Address"
                  name="address"
                  type="textarea"
                  value={formData.address}
                  onChange={onFormChange}
                  error={errors.address}
                  placeholder="Enter your complete business address"
                  rows={2}
                  required
                  icon={MapPin}
                />
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <Phone className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                </div>
                
                <FormInput
                  label="Business Email"
                  name="business_email"
                  type="email"
                  value={formData.business_email}
                  onChange={onFormChange}
                  error={errors.business_email}
                  placeholder="business@company.com"
                  required
                  icon={Mail}
                />

                <FormInput
                  label="Business Phone"
                  name="business_phone"
                  type="tel"
                  value={formData.business_phone}
                  onChange={onFormChange}
                  error={errors.business_phone}
                  placeholder="+91 9876543210"
                  icon={Phone}
                />
              </div>

              {/* Company Profile Image */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <Image className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Profile Image</h3>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Company Profile Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="comp_profile_img"
                      onChange={onFileChange}
                      ref={fileInputRef}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${
                      errors.comp_profile_img 
                        ? "border-red-300 bg-red-50" 
                        : "border-gray-300 hover:border-amber-400 hover:bg-amber-50"
                    }`}>
                      <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-600">
                        {formData.comp_profile_img ? formData.comp_profile_img.name : "Upload Image"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG</p>
                    </div>
                  </div>
                  {errors.comp_profile_img && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.comp_profile_img}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Website & Links */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <Globe className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Website & Links</h3>
                </div>
                
                <FormInput
                  label="Website URL"
                  name="website_link"
                  type="url"
                  value={formData.website_link}
                  onChange={onFormChange}
                  error={errors.website_link}
                  placeholder="https://www.yourcompany.com"
                  icon={Globe}
                />

                <FormInput
                  label="Google Maps Link"
                  name="google_map_link"
                  type="url"
                  value={formData.google_map_link}
                  onChange={onFormChange}
                  error={errors.google_map_link}
                  placeholder="https://maps.google.com/..."
                  icon={MapPin}
                />
              </div>

              {/* Business Details */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                  <FileText className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Business Details</h3>
                </div>
                
                <FormInput
                  label="Business Categories"
                  name="categories"
                  value={formData.categories}
                  onChange={onFormChange}
                  placeholder="Technology, Software, Consulting"
                  icon={FileText}
                />

                <FormInput
                  label="Company Description"
                  name="description"
                  type="textarea"
                  value={formData.description}
                  onChange={onFormChange}
                  placeholder="Brief description of your company and services"
                  rows={3}
                  icon={FileText}
                />
              </div>

              {/* Social Links */}
              <div className="bg-gray-50 rounded-xl p-6">
                <SocialLinks
                  socialLinks={formData.social_links}
                  activeSocial={activeSocial}
                  onSocialLinkChange={onSocialLinkChange}
                  onSocialLinkKeyDown={onSocialLinkKeyDown}
                  onSetActiveSocial={onSetActiveSocial}
                  socialLinksRef={socialLinksRef}
                />
              </div>
            </div>
          </div>

          {/* Submit Button - Full Width */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="max-w-md mx-auto">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 text-white hover:bg-amber-600 py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Your Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <User className="h-5 w-5" />
                    Register Company
                  </span>
                )}
              </button>
            </div>

            {errors.userId && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4 max-w-md mx-auto">
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {errors.userId}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;