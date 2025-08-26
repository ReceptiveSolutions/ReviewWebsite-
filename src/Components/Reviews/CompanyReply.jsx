// components/CompanyReply.jsx
import React from 'react'
import { CheckCircle } from 'lucide-react'

const  CompanyReply = ({ review, isHidden }) => {
  if (!review.hasCompanyReply) return null

  return (
    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${!isHidden ? 'max-h-48 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center relative">
            <span className="text-white font-semibold text-xs">GO</span>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full shadow-sm">
              <CheckCircle className="w-2 h-2" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900 text-sm">Golden Oak Solutions</p>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            </div>
            <p className="text-xs text-gray-500">{review.companyReply.date}</p>
          </div>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{review.companyReply.message}</p>
      </div>
    </div>
  )
}
export default CompanyReply