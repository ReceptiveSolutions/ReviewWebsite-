import React, { useState, useEffect } from "react";
import Toaster from "../Components/Toaster";

function BusinessAccountRegister() {
  const [formData, setFormData] = useState({
    aadharNumber: "",
    panNumber: "",
    phoneNumber: "",
    aadharFile: null,
    panFile: null,
    profilePhoto: null,
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.aadharNumber.match(/^\d{12}$/)) {
      newErrors.aadharNumber = "Aadhar number must be 12 digits";
    }
    if (!formData.panNumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) {
      newErrors.panNumber = "PAN number must be 10 characters (e.g., ABCDE1234F)";
    }
    if (!formData.phoneNumber.match(/^\+?\d{10,15}$/)) {
      newErrors.phoneNumber = "Invalid phone number";
    }
    if (!formData.aadharFile) {
      newErrors.aadharFile = "Aadhar card upload is required";
    }
    if (!formData.panFile) {
      newErrors.panFile = "PAN card upload is required";
    }
    if (!formData.profilePhoto) {
      newErrors.profilePhoto = "Profile photo upload is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(`Submitting business account at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}:`, formData);

    if (!validateForm()) {
      setToast({ message: "Please fix the form errors before submitting.", type: "error" });
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("aadharNumber", formData.aadharNumber);
    formDataToSend.append("panNumber", formData.panNumber);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("aadharFile", formData.aadharFile);
    formDataToSend.append("panFile", formData.panFile);
    formDataToSend.append("profilePhoto", formData.profilePhoto);

    try {
      const res = await fetch("http://localhost:5000/api/business/register", {
        method: "POST",
        body: formDataToSend,
      });
      const responseData = await res.json();
      console.log(`Backend response at ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}:`, responseData);

      if (!res.ok) {
        throw new Error(responseData.error || "Failed to register business account");
      }

      setToast({ message: "Business account registered successfully!", type: "success" });
      setFormData({
        aadharNumber: "",
        panNumber: "",
        phoneNumber: "",
        numberOfCompanies: 0,
        aadharFile: null,
        panFile: null,
        profilePhoto: null,
      });
      // Redirect to company registration page
      window.location.href = "/company/register";
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-amber-100 opacity-30"></div>
      <div className="absolute -right-20 bottom-1/4 w-64 h-64 rounded-full bg-amber-100 opacity-30"></div>
      <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-lg shadow-lg border border-amber-200 relative z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-amber-900">Register Business Account</h2>
          <p className="mt-2 text-sm text-amber-800">Provide your details to create a business account</p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Aadhar Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.aadharNumber ? "border-red-500" : "border-gray-300"}`}
              placeholder="123456789012"
            />
            {errors.aadharNumber && <p className="mt-1 text-sm text-red-600">{errors.aadharNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">PAN Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.panNumber ? "border-red-500" : "border-gray-300"}`}
              placeholder="ABCDE1234F"
            />
            {errors.panNumber && <p className="mt-1 text-sm text-red-600">{errors.panNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-3 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
              placeholder="+91 9876543210"
            />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Aadhar Card Upload <span className="text-red-500">*</span></label>
            <input
              type="file"
              name="aadharFile"
              accept="image/*,application/pdf"
              onChange={handleChange}
              className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 ${errors.aadharFile ? "border-red-500" : ""}`}
            />
            {errors.aadharFile && <p className="mt-1 text-sm text-red-600">{errors.aadharFile}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">PAN Card Upload <span className="text-red-500">*</span></label>
            <input
              type="file"
              name="panFile"
              accept="image/*,application/pdf"
              onChange={handleChange}
              className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 ${errors.panFile ? "border-red-500" : ""}`}
            />
            {errors.panFile && <p className="mt-1 text-sm text-red-600">{errors.panFile}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Photo <span className="text-red-500">*</span></label>
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
              className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 ${errors.profilePhoto ? "border-red-500" : ""}`}
            />
            {errors.profilePhoto && <p className="mt-1 text-sm text-red-600">{errors.profilePhoto}</p>}
          </div>

          <div className="pt-4">
            <button
              type="submit"
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
                "Register Business Account"
              )}
            </button>
          </div>
        </form>

        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "success" })}
        />
      </div>
    </div>
  );
}

export default BusinessAccountRegister;