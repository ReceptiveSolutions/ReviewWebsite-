import React from 'react';
import {Divider} from '../../index'

function TopRatedCategories() {
  const topRatedCategories = [
    { 
      id: 1, 
      name: 'Fine Dining', 
      icon: '🍽️', 
      rating: 4.8, 
      reviewCount: 2340,
      avgPrice: '$$$',
      topReview: 'Exceptional service and cuisine'
    },
    { 
      id: 2, 
      name: 'Luxury Hotels', 
      icon: '🏨', 
      rating: 4.7, 
      reviewCount: 1890,
      avgPrice: '$$$$',
      topReview: 'Outstanding hospitality experience'
    },
    { 
      id: 3, 
      name: 'Premium Electronics', 
      icon: '📱', 
      rating: 4.6, 
      reviewCount: 3240,
      avgPrice: '$$$',
      topReview: 'Top-notch quality and performance'
    },
    { 
      id: 4, 
      name: 'Luxury Spa', 
      icon: '💅', 
      rating: 4.9, 
      reviewCount: 870,
      avgPrice: '$$$$',
      topReview: 'Absolutely relaxing and rejuvenating'
    },
    { 
      id: 5, 
      name: 'Medical Centers', 
      icon: '⚕️', 
      rating: 4.5, 
      reviewCount: 1430,
      avgPrice: '$$',
      topReview: 'Professional and caring staff'
    },
    { 
      id: 6, 
      name: 'Boutique Shopping', 
      icon: '🛍️', 
      rating: 4.4, 
      reviewCount: 2680,
      avgPrice: '$$$',
      topReview: 'Unique products and great service'
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-amber-400 text-sm">★</span>
        ))}
        {hasHalfStar && <span className="text-amber-400 text-sm">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-amber-200 text-sm">☆</span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-amber-900">Top Rated Categories</h2>
          <p className="text-amber-700 text-sm">Highest-rated categories by our community</p>
        </div>
        {/* See More Button */}
      <div className="text-center">
        <button className="inline-flex items-center px-4 py-2 border border-amber-300 text-sm font-medium rounded-lg text-amber-700 bg-white hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
          See More Companies
          <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {topRatedCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-amber-100 cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              {/* Icon */}
              <div className="text-2xl bg-amber-100 p-2 rounded-lg">
                {category.icon}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-amber-900 truncate">{category.name}</h3>
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                    {category.avgPrice}
                  </span>
                </div>
                
                {/* Rating */}
                <div className="flex items-center mt-1 space-x-2">
                  {renderStars(category.rating)}
                  <span className="text-amber-700 text-xs">
                    {category.rating} ({category.reviewCount.toLocaleString()})
                  </span>
                </div>
                
                {/* Top Review */}
                <p className="text-xs text-amber-600 mt-2 truncate">
                  "{category.topReview}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      


        {/* Bottom CTA Section */}
      <div className="text-center bg-white rounded-2xl p-10 shadow-lg border-2 border-amber-200">
        <h3 className="text-2xl font-bold text-amber-900 mb-3">
          Want to see your business here?
        </h3>
        <p className="text-amber-700 mb-6">
          Join thousands of businesses getting reviewed by our community
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
            List Your Business
          </button>
          <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>

      {/* Enhanced Divider */}
      <Divider></Divider>
    </div>
  );
}

export default TopRatedCategories;