import { useState } from "react";
import { Eye, EyeOff, X, User, Shield, Mail, CreditCard, FileText } from "lucide-react";

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-elevated">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, sensitive = false, isVisible, onToggle }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">
          {sensitive ? (isVisible ? value : "••••••••") : value}
        </span>
        {sensitive && (
          <button onClick={onToggle} className="text-muted-foreground hover:text-foreground">
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

  const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-primary rounded-2xl p-8 mb-8 text-primary-foreground bg-[#90e0ef] shadow-elevated">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary-foreground/20 backdrop-blur-sm p-1">
              {user?.prof_img ? (
                <img
                  src={IMAGE_BASE_URL + user.prof_img}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover cursor-pointer hover:scale-105 transition-bounce"
                  onClick={() => setModalImage(user.prof_img)}
                />
              ) : (
                <span className="w-12 h-12 flex items-center justify-center text-3xl font-bold text-white bg-gray-500 rounded-full">
                  {user?.first_name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-primary-foreground/80 text-lg">{user?.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-sm font-medium">
                  {user?.type}
                </span>
                <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-sm font-medium">
                  {user?.status}
                </span>
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
            <div className="pt-2">
              <span className="text-muted-foreground text-sm">Address</span>
              <p className="font-medium text-foreground text-sm mt-1 leading-relaxed">
                {user.address}
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
            <div className="flex gap-3">
              <div className="group">
                {IMAGE_BASE_URL + user?.aadhar_img ? (
                  <img
                    src={IMAGE_BASE_URL + user.aadhar_img}
                    alt="Aadhar Document"
                    className="w-16 h-16 rounded-lg object-cover cursor-pointer border hover:border-primary transition-smooth group-hover:scale-105"
                    onClick={() => setModalImage(user.aadhar_img)}
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-200 border-2 border-border text-sm font-bold text-gray-600">
                    A
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1 text-center">Aadhar</p>
              </div>

              <div className="group">
                {IMAGE_BASE_URL + user?.pan_img ? (
                  <img
                    src={IMAGE_BASE_URL + user.pan_img}
                    alt="PAN Document"
                    className="w-16 h-16 rounded-lg object-cover cursor-pointer border hover:border-primary transition-smooth group-hover:scale-105"
                    onClick={() => setModalImage(user.pan_img)}
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-200 border-2 border-border text-sm font-bold text-gray-600">
                    P
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1 text-center">PAN</p>
              </div>

            </div>
          </InfoCard>
        </div>

        {/* Modal */}
        {modalImage && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full flex justify-center items-center">
              {/* Close Button */}
              <button
                className="absolute -top-12 right-0 p-2 rounded-full bg-card hover:bg-muted transition-smooth shadow-elevated"
                onClick={() => setModalImage(null)}
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              <img
                src={IMAGE_BASE_URL + modalImage}
                alt="Document Preview"
                className="w-[60%] object-contain rounded-2xl shadow-modal bg-card"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
