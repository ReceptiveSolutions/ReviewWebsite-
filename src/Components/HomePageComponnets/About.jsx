import React from 'react';
import {Divider} from '../../index'

function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-amber-900 mb-4">
          About Our Review Community
        </h2>
        <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          Trusted by millions to discover the best businesses and services
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 text-center">
          <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-amber-900 mb-3">Honest Reviews</h3>
          <p className="text-amber-700">
            Real experiences from verified customers to help you make better decisions
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 text-center">
          <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⭐</span>
          </div>
          <h3 className="text-xl font-semibold text-amber-900 mb-3">Curated Ratings</h3>
          <p className="text-amber-700">
            Our algorithm surfaces the most reliable ratings and reviews
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 text-center">
          <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-xl font-semibold text-amber-900 mb-3">Community First</h3>
          <p className="text-amber-700">
            Join a community that values transparency and authentic feedback
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 inline-flex items-center">
          Learn More About Us
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>


      {/* Enhanced Divider */}
      <Divider></Divider>
    </div>
  );
}

export default AboutSection;