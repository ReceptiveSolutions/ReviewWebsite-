// components/CompanyReplyInModal.jsx
import React from 'react'
import { CheckCircle } from 'lucide-react'

const CompanyReplyInModal = ({ review }) => {
  if (!review.hasCompanyReply) return null

  return (
    <div className="bg-amber-50 rounded-md p-4 mb-4 border-l-4 border-amber-500">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center relative">
          <span className="text-white font-semibold text-xs">GO</span>
          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full shadow-sm">
            <CheckCircle className="w-2 h-2" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-gray-900 text-sm">Golden Oak Solutions</h4>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
            <span className="text-xs text-gray-500">{review.companyReply.date}</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{review.companyReply.message}</p>
        </div>
      </div>
    </div>
  )
}
export default CompanyReplyInModal