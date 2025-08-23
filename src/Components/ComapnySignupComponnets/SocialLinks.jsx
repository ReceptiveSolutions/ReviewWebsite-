import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Twitter, Linkedin, Plus, Upload, Mail, Phone, MapPin, Globe, FileText, Image, User } from "lucide-react";

// SocialLinks Component
const SocialLinks = ({
  socialLinks,
  activeSocial,
  onSocialLinkChange,
  onSocialLinkKeyDown,
  onSetActiveSocial,
  socialLinksRef
}) => {
  const socialPlatforms = [
    {
      key: "instagram",
      icon: <Instagram size={20} />,
      filledClass: "text-pink-500 bg-pink-50 border-pink-200",
      label: "Instagram",
      regex: /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._-]{1,30}$/,
      errorMessage: "Please enter a valid Instagram URL (e.g., https://www.instagram.com/username)"
    },
    {
      key: "facebook",
      icon: <Facebook size={20} />,
      filledClass: "text-blue-600 bg-blue-50 border-blue-200",
      label: "Facebook",
      regex: /^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9.-]{5,50}$/,
      errorMessage: "Please enter a valid Facebook URL (e.g., https://www.facebook.com/username)"
    },
    {
      key: "youtube",
      icon: <Youtube size={20} />,
      filledClass: "text-red-500 bg-red-50 border-red-200",
      label: "YouTube",
      regex: /^https:\/\/(www\.)?youtube\.com\/(channel\/[A-Za-z0-9_-]{10,}|user\/[A-Za-z0-9_-]{3,}|c\/[A-Za-z0-9_-]{3,})$/,
      errorMessage: "Please enter a valid YouTube URL (e.g., https://www.youtube.com/channel/UC12345)"
    },
    {
      key: "twitter",
      icon: <Twitter size={20} />,
      filledClass: "text-sky-400 bg-sky-50 border-sky-200",
      label: "Twitter",
      regex: /^https:\/\/(www\.)?(twitter|x)\.com\/[A-Za-z0-9_]{1,15}$/,
      errorMessage: "Please enter a valid Twitter/X URL (e.g., https://x.com/username)"
    },
    {
      key: "linkedin",
      icon: <Linkedin size={20} />,
      filledClass: "text-blue-700 bg-blue-50 border-blue-200",
      label: "LinkedIn",
      regex: /^https:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9.-]{3,100}$/,
      errorMessage: "Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)"
    },
  ];

  return (
    <div ref={socialLinksRef} className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <Globe className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-gray-800">Social Media</h3>
      </div>
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
          {socialPlatforms.map((platform) => {
            const isValidUrl = platform.regex.test(socialLinks[platform.key]?.trim() || "");
            return (
              <div key={platform.key} className="flex flex-col items-center space-y-1">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => onSetActiveSocial(platform.key)}
                    className={`w-10 h-10 rounded-lg transition-all duration-200 border-2 flex items-center justify-center ${
                      isValidUrl 
                        ? platform.filledClass + " shadow-sm" 
                        : "text-gray-400 bg-white border-gray-200 hover:border-amber-200 hover:bg-amber-50"
                    }`}
                    title={`${isValidUrl ? "Edit" : "Add"} ${platform.label} link`}
                  >
                    {platform.icon}
                  </button>
                  {!isValidUrl && (
                    <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-0.5">
                      <Plus size={8} className="text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-600 font-medium text-center">{platform.label}</span>
              </div>
            );
          })}
        </div>
        
        {activeSocial && (
          <div className="border-t border-gray-200 pt-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {socialPlatforms.find(p => p.key === activeSocial)?.label} URL
              </label>
              <input
                type="url"
                placeholder={`Enter ${socialPlatforms.find(p => p.key === activeSocial)?.label} link`}
                value={socialLinks[activeSocial] || ""}
                onChange={(e) => onSocialLinkChange(activeSocial, e.target.value)}
                onKeyDown={(e) => onSocialLinkKeyDown(e, activeSocial)}
                className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 sm:text-sm p-3 border transition-all duration-200"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;