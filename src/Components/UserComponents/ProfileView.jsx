import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X, User, Shield, Mail, CreditCard, FileText, MapPin, Globe, CheckCircle, Plus, Building2 } from "lucide-react";

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-amber-600" />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, sensitive = false, isVisible, onToggle }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
      <span className="text-gray-600 text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm text-gray-800">
          {sensitive ? (isVisible ? value : "••••••••") : value}
        </span>
        {sensitive && (
          <button 
            onClick={onToggle} 
            className="text-gray-400 hover:text-amber-600 transition-colors duration-200 p-1 rounded-md hover:bg-amber-50"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProfileView({ user }) {
  const [showAadhar, setShowAadhar] = useState(false);
  const [showPan, setShowPan] = useState(false);
  const [modalImage, setModalImage] = useState(null);
   const navigate = useNavigate();

  const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header - Updated to match CompanyProfile style */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-md border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center shadow-sm border border-amber-200">
                {user?.prof_img ? (
                  <img
                    src={IMAGE_BASE_URL + user.prof_img}
                    alt="Profile"
                    className="w-full h-full rounded-xl object-cover cursor-pointer"
                    onClick={() => setModalImage(user.prof_img)}
                  />
                ) : (
                  <div className="text-3xl font-bold text-amber-600">
                    {user?.first_name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
              {user?.isVerified && (
                <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1.5 rounded-full shadow-md">
                  <CheckCircle className="w-4 h-4" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {user?.first_name} {user?.last_name}
                </h1>
                {user?.isVerified && (
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-md text-xs font-medium border border-amber-200">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {user?.email}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-gray-50 rounded-md text-sm font-medium border border-gray-200 text-gray-700">
                    {user?.type}
                  </span>
                  <span className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
                    user?.status === 'active' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {user?.status}
                  </span>
                </div>
              </div>
              
              {/* Add Company Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button onClick={() => navigate("/comp-signup")}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                >
                  <Plus className="w-4 h-4"/>
                  Add Your Company
                </button>
                <button 
                onClick={() => navigate("/comp-dashboard/:id")}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  <Building2 className="w-4 h-4" />
                  View Your Companies
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <MapPin className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm">{user?.address || 'No address provided'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Personal Information */}
          <InfoCard icon={User} title="Personal Information">
            <InfoRow label="First Name" value={user?.first_name} />
            <InfoRow label="Last Name" value={user?.last_name} />
            <InfoRow label="Google Auth" value={user?.google_auth ? "Enabled" : "Disabled"} />
          </InfoCard>

          {/* Account Details */}
          <InfoCard icon={Shield} title="Account Details">
            <InfoRow label="Status" value={user?.status} />
            <InfoRow label="Subscription" value={user?.subscription} />
            <InfoRow label="Companies" value={user?.noOfComp?.toString()} />
          </InfoCard>

          {/* Contact Information */}
          <InfoCard icon={Mail} title="Contact Information">
            <InfoRow label="Email" value={user?.email} />
            <div className="pt-3 border-t border-gray-200 mt-3">
              <span className="text-gray-600 text-sm font-medium">Address</span>
              <p className="font-semibold text-gray-800 text-sm mt-2 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                {user?.address || 'No address provided'}
              </p>
            </div>
          </InfoCard>
        </div>

        {/* Sensitive Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <InfoCard icon={CreditCard} title="Identity Documents">
            <InfoRow
              label="Aadhar Number"
              value={user?.aadhar_num}
              sensitive={true}
              isVisible={showAadhar}
              onToggle={() => setShowAadhar(!showAadhar)}
            />
            <InfoRow
              label="PAN Number"
              value={user?.pan_num}
              sensitive={true}
              isVisible={showPan}
              onToggle={() => setShowPan(!showPan)}
            />
          </InfoCard>

          <InfoCard icon={FileText} title="Document Gallery">
            <div className="flex gap-4">
              <div className="group text-center">
                {user?.aadhar_img ? (
                  <img
                    src={IMAGE_BASE_URL + user.aadhar_img}
                    alt="Aadhar Document"
                    className="w-20 h-20 rounded-lg object-cover cursor-pointer border-2 border-gray-200 hover:border-amber-400 transition-all duration-200 group-hover:scale-105 shadow-sm hover:shadow-md"
                    onClick={() => setModalImage(user.aadhar_img)}
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 text-lg font-bold text-gray-500">
                    A
                  </div>
                )}
                <p className="text-xs text-gray-600 mt-2 font-medium">Aadhar</p>
              </div>

              <div className="group text-center">
                {user?.pan_img ? (
                  <img
                    src={IMAGE_BASE_URL + user.pan_img}
                    alt="PAN Document"
                    className="w-20 h-20 rounded-lg object-cover cursor-pointer border-2 border-gray-200 hover:border-amber-400 transition-all duration-200 group-hover:scale-105 shadow-sm hover:shadow-md"
                    onClick={() => setModalImage(user.pan_img)}
                  />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 text-lg font-bold text-gray-500">
                    P
                  </div>
                )}
                <p className="text-xs text-gray-600 mt-2 font-medium">PAN</p>
              </div>
            </div>
          </InfoCard>
        </div>

        {/* Modal */}
        {modalImage && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full flex justify-center items-center">
              {/* Close Button */}
              <button
                className="absolute -top-12 right-0 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                onClick={() => setModalImage(null)}
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              <img
                src={IMAGE_BASE_URL + modalImage}
                alt="Document Preview"
                className="max-w-[80%] max-h-[80vh] object-contain rounded-xl shadow-2xl bg-white border border-gray-200"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}