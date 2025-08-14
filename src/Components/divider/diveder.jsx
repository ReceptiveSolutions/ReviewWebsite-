import React from 'react'

const Divider = () => {
  return (
    <div className="w-full py-6 md:py-8 flex items-center justify-center">
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className="w-32 sm:w-40 md:w-54 lg:w-62 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
        <div className="flex space-x-1.5 md:space-x-2">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-600"></div>
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-600 opacity-70"></div>
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-600 opacity-40"></div>
        </div>
        <div className="w-32 sm:w-40 md:w-54 lg:w-62 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
      </div>
    </div>
  )
}

export default Divider