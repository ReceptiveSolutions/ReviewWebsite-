import React from 'react'
import { Star, MapPin, Globe, Users, Pencil, Shield, CheckCircle } from 'lucide-react'

export default function CompanyProfile({ companyData = {}, ratingBreakdown = [] }) {
    // Default data structure if no props are provided
    const defaultCompanyData = {
        name: "Golden Oak Solutions",
        logo: "🏢",
        totalReviews: 247,
        averageRating: 4.3,
        bio: "We are a leading technology consulting firm specializing in innovative software solutions and digital transformation. With over 10 years of experience, we help businesses modernize their operations and achieve their digital goals through cutting-edge technology and expert guidance.",
        address: "123 Business District, Tech Valley, California 94025",
        website: "www.goldenoaksolutions.com",
        isVerified: true
    }
    
    const defaultRatingBreakdown = [
        { stars: 5, count: 124, percentage: 50 },
        { stars: 4, count: 74, percentage: 30 },
        { stars: 3, count: 37, percentage: 15 },
        { stars: 2, count: 7, percentage: 3 },
        { stars: 1, count: 5, percentage: 2 }
    ]

    // Use props if available, otherwise use default data
    const data = Object.keys(companyData).length ? companyData : defaultCompanyData;
    const ratings = ratingBreakdown.length ? ratingBreakdown : defaultRatingBreakdown;

    const renderStars = (rating, size = "w-5 h-5") => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} ${
                            star <= rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-gray-300"
                        }`}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-8 mb-8 shadow-md border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Side - Company Info */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row items-start gap-8 mb-10">
                        <div className="relative">
                            <div className="text-6xl bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl shadow-sm border border-amber-200">
                                {data.logo}
                            </div>
                            {data.isVerified && (
                                <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1.5 rounded-full shadow-md">
                                    <Shield className="w-4 h-4" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <h1 className="text-3xl font-semibold text-gray-900">
                                    {data.name}
                                </h1>
                                {data.isVerified && (
                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-md text-xs font-medium border border-amber-200">
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Verified
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                                <div className="flex items-center gap-2">
                                    {renderStars(Math.floor(data.averageRating))}
                                    <span className="text-xl font-semibold text-gray-800">
                                        {data.averageRating}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                                    <Users className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {data.totalReviews} Reviews
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-amber-600" />
                                About Us
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {data.bio}
                            </p>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-md border border-gray-200">
                            <MapPin className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 font-medium text-sm">{data.address}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <a 
                                href={`https://${data.website}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                                <Globe className="w-4 h-4" />
                                Visit Website
                            </a>
                            <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                                <Pencil className="w-4 h-4" />
                                Write a Review
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side - Enhanced Rating Breakdown */}
                <div className="lg:w-96">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">Rating Breakdown</h3>
                        <div className="space-y-4">
                            {ratings.map((rating) => (
                                <div key={rating.stars} className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-700 w-8 flex items-center">
                                        {rating.stars}<Star className="w-3 h-3 ml-1 text-amber-500 fill-amber-500" />
                                    </span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 transition-all duration-500 ease-out"
                                            style={{ width: `${rating.percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-medium text-gray-600 w-10 text-right">
                                        {rating.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-gray-300">
                            <div className="text-center bg-white rounded-lg p-4 shadow-xs border border-gray-200">
                                <div className="text-3xl font-semibold text-gray-900 mb-1">
                                    {data.averageRating}
                                </div>
                                <div className="text-xs text-gray-600 font-medium">
                                    out of 5 stars
                                </div>
                                <div className="mt-2 flex justify-center">
                                    {renderStars(Math.floor(data.averageRating), "w-4 h-4")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}