import React, { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Globe,
  FileText,
  Edit3,
  Phone,
  Mail,
  Calendar,
  Shield,
  Menu,
  User,
  X,
  LogOut,
  Star,
  TrendingUp,
  Users,
  Eye,
} from "lucide-react";
import { useParams } from "react-router-dom";

// Company Profile Component
function Cprofile() {
  const [companyData, setCompanyData]= useState(0)
  const { id } = useParams();


  useEffect(() => {
  const fetchCompanyData = async () => {
    try {
      const comp_id = id;
      
      // Make sure the URL is correct - you have localhost without port
      // It should probably be localhost:5000 to match your other API calls
      const response = await fetch(
        `http://localhost:5000/api/companies/${comp_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Company data fetched:", data);
      
      // Set the company data to state here
      setCompanyData(data);
      
    } catch (err) {
      console.error("Error fetching company data:", err);
      
      // Handle specific error cases
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        console.error("CORS or network error - check if server is running on correct port");
      }
    }
  };

  // Only fetch if id exists
  if (id) {
    fetchCompanyData();
  }
}, [id]); 
  console.log("first", companyData);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-full">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Company Profile{" "}
        </h2>
      </div>
      <div className="p-4 sm:p-6">
        {/* Company Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
          <div className="flex-shrink-0 flex justify-center sm:justify-start">
            {companyData.comp_profile_img ? (
              <img
                src={`http://localhost:5000/${companyData.comp_profile_img}`}
                alt={`${companyData.name} logo`}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border-2 border-amber-200"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                {companyData.name}
              </h3>
              {companyData.verified && (
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center justify-center space-x-1 w-fit mx-auto sm:mx-0">
                  <Shield className="h-3 w-3" />
                  <span>Verified</span>
                </div>
              )}
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3 break-words">
              {companyData.description}
            </p>

            {/* Company Details - Mobile Stack */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center justify-center sm:justify-start space-x-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>
                  Est. {new Date(companyData.establishedDate).getFullYear()}
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-1">
                <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="break-words">{companyData.category}</span>
              </div>
              {companyData.gstinNum && (
                <div className="flex items-center justify-center sm:justify-start space-x-1">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="break-all text-xs">
                    GSTIN: {companyData.gstinNum}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact and Social Info - Mobile Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
              Contact Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                {/* <div className="text-xs sm:text-sm text-gray-600 break-words">
                  <p>{companyData.address.street}</p>
                  {(companyData.address.city ||
                    companyData.address.state ||
                    companyData.address.zipCode) && (
                    <p>
                      {companyData.address.city}
                      {companyData.address.state &&
                        `, ${companyData.address.state}`}{" "}
                      {companyData.address.zipCode}
                    </p>
                  )}
                  {companyData.address.country && (
                    <p>{companyData.address.country}</p>
                  )}
                </div> */}
              </div>

              {companyData.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  <a
                    href={`tel:${companyData.phone}`}
                    className="text-xs sm:text-sm text-gray-600 hover:text-amber-600 transition-colors break-all"
                  >
                    {companyData.phone}
                  </a>
                </div>
              )}

              {companyData.email && (
                <div className="flex items-start space-x-3">
                  <Mail className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${companyData.email}`}
                    className="text-xs sm:text-sm text-gray-600 hover:text-amber-600 transition-colors break-all"
                  >
                    {companyData.email}
                  </a>
                </div>
              )}

              {companyData.website && (
                <div className="flex items-start space-x-3">
                  <Globe className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <a
                    href={companyData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-amber-600 hover:text-amber-700 transition-colors break-all"
                  >
                    {companyData.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
              Social Media
            </h4>
            <div className="space-y-3">
              {companyData.socials?.linkedin && (
                <a
                  href={companyData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <div className="w-4 h-4 bg-blue-600 rounded flex-shrink-0"></div>
                  <span className="break-all">LinkedIn</span>
                </a>
              )}
              {companyData.socials?.twitter && (
                <a
                  href={companyData.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <div className="w-4 h-4 bg-sky-400 rounded flex-shrink-0"></div>
                  <span className="break-all">Twitter</span>
                </a>
              )}
              {companyData.socials?.facebook && (
                <a
                  href={companyData.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <div className="w-4 h-4 bg-blue-500 rounded flex-shrink-0"></div>
                  <span className="break-all">Facebook</span>
                </a>
              )}
              {!companyData.socials?.linkedin &&
                !companyData.socials?.twitter &&
                !companyData.socials?.facebook && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    No social media links added
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cprofile;
