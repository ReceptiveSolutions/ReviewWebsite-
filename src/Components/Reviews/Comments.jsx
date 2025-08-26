
import React from 'react'
import { CheckCircle } from 'lucide-react'

export default  Comment = ({ comment }) => {
  return (
    <div className={`rounded-md p-4 border ${comment.isCompany ? 'bg-amber-50 border-amber-200 border-l-4 border-l-amber-500' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs relative ${comment.isCompany ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
          {comment.isCompany ? 'GO' : comment.name.split(' ').map(n => n[0]).join('')}
          {comment.isCompany && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full shadow-sm">
              <CheckCircle className="w-2 h-2" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h5 className="font-medium text-gray-900 text-xs">{comment.name}</h5>
            {comment.isCompany && (
              <>
                
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-2">{comment.date}</p>
          <p className="text-gray-700 text-sm leading-relaxed">{comment.message}</p>
        </div>
      </div>
    </div>
  )
}
