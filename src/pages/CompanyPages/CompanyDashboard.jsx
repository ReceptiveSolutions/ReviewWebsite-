// Main Dashboard Component
import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Globe, FileText, Edit3, Phone, Mail, Calendar, Shield, Menu, User, X, LogOut, Star, TrendingUp, Users, Eye } from 'lucide-react';
import {Csidebar, Cprofile,CompanyDocuments} from '../../index'
function CompanyDashboard() {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");

  // Mock data for demonstration (replace with your API call)
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        
        if (!userId) {
          setError("User ID not found");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/companies/user/${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch company data');
        }
        
        const data = await response.json();
        console.log("API Response:", data);
        
        // Transform API data to match component structure
        const transformedData = {
          id: data.id,
          name: data.name,
          description: data.description,
          logo: data.comp_profile_img ? `http://localhost:5000/uploads/${data.comp_profile_img}` : null,
          address: {
            street: data.address,
            city: "",
            state: "",
            zipCode: "",
            country: ""
          },
          phone: data.business_phone,
          email: data.business_email,
          website: data.website_link,
          socials: {
            linkedin: null,
            twitter: null,
            facebook: null
          },
          documents: [],
          stats: {
            // Will be added later when needed
          },
          establishedDate: data.created_at,
          category: data.categories ? JSON.parse(data.categories[0])[0] : "Business",
          verified: data.isverified,
          gstinNum: data.gstin_num,
          googleMapLink: data.google_map_link,
          avgRating: data.avg_rating
        };

        // Parse social links if they exist
        if (data.social_links) {
          try {
            const socialLinks = JSON.parse(data.social_links);
            transformedData.socials = {
              linkedin: socialLinks.linkedin || null,
              twitter: socialLinks.twitter || null,
              facebook: socialLinks.facebook || null
            };
          } catch (e) {
            console.log("Error parsing social links:", e);
          }
        }

        setCompanyData(transformedData);
        setLoading(false);
        
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError("Failed to load company data");
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="text-gray-600">Loading company dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !companyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">{error || "No company data found"}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Csidebar active={activeSection} setActive={setActiveSection} />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Dashboard</h1>
            <p className="text-gray-600">Manage your business profile and reviews</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Cprofile companyData={companyData} />
            </div>
            
            <div className="space-y-6">
              <CompanyDocuments documents={companyData.documents} />
              {/* <QuickActions /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDashboard;