import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Globe, FileText, Edit3, Phone, Mail, Calendar, Shield, Menu, User, X, LogOut, Star, TrendingUp, Users, Eye } from 'lucide-react';

// Company Documents Component
function CompanyDocuments({ documents }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Company Documents</h2>
      </div>
      <div className="p-6">
        {documents && documents.length > 0 ? (
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                  {doc.type}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-sm text-gray-600">No documents uploaded yet</p>
            <button className="mt-2 text-sm text-amber-600 hover:text-amber-700 transition-colors">
              Upload Documents
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Quick Actions Component
function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
            <Edit3 className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-gray-700">Update Profile</span>
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
            <FileText className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-gray-700">Manage Documents</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default CompanyDocuments;