import React from 'react'
import {Divider} from '../../index'
function Categories() {
  const categories = [
    { id: 1, name: 'Restaurants', icon: '🍽️', reviewCount: 1250 },
    { id: 2, name: 'Hotels', icon: '🏨', reviewCount: 890 },
    { id: 3, name: 'Electronics', icon: '📱', reviewCount: 2340 },
    { id: 4, name: 'Beauty & Spa', icon: '💅', reviewCount: 670 },
    { id: 5, name: 'Home Services', icon: '🏠', reviewCount: 520 },
    { id: 6, name: 'Automotive', icon: '🚗', reviewCount: 780 },
    { id: 7, name: 'Health & Medical', icon: '⚕️', reviewCount: 430 },
    { id: 8, name: 'Shopping', icon: '🛍️', reviewCount: 1680 },
    { id: 9, name: 'Entertainment', icon: '🎬', reviewCount: 940 },
    { id: 10, name: 'Travel', icon: '✈️', reviewCount: 1120 }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-amber-900 mb-2">
            Browse Categories
          </h2>
          <p className="text-amber-700">
            Discover reviews across different categories
          </p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
          See More
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 border border-amber-200 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
          >
            {/* Icon */}
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
              {category.icon}
            </div>
            
            {/* Category Name */}
            <h3 className="font-semibold text-amber-900 mb-2 text-sm">
              {category.name}
            </h3>
            
            {/* Review Count */}
            <div className="text-xs text-amber-700">
              {category.reviewCount.toLocaleString()} reviews
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-6 bg-amber-50 rounded-full px-6 py-3 border border-amber-200">
          <div className="text-sm">
            <span className="font-semibold text-amber-900">10+</span>
            <span className="text-amber-700 ml-1">Categories</span>
          </div>
          <div className="w-px h-4 bg-amber-300"></div>
          <div className="text-sm">
            <span className="font-semibold text-amber-900">
              {categories.reduce((sum, cat) => sum + cat.reviewCount, 0).toLocaleString()}
            </span>
            <span className="text-amber-700 ml-1">Total Reviews</span>
          </div>
        </div>
      </div>


      {/* Enhanced Divider */}
     <Divider></Divider>
    </div>
  )
}

export default Categories