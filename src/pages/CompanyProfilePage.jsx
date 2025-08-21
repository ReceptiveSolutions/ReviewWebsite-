import React, { useState } from 'react'
import { Star, MapPin, Globe, Users, Pencil, ChevronDown, ChevronUp, Shield, CheckCircle, MessageCircle, X, Reply, EyeOff, Eye } from 'lucide-react'

function CompanyProfilePage(props) {
    const [expandedReviews, setExpandedReviews] = useState({})
    const [showCommentsModal, setShowCommentsModal] = useState(false)
    const [selectedReviewComments, setSelectedReviewComments] = useState(null)
    // Set default to hide comments (true means hidden)
    const [hiddenComments, setHiddenComments] = useState(() => {
        // Initialize all reviews with comments hidden by default
        const initialHiddenState = {}
        for (let i = 1; i <= 4; i++) {
            initialHiddenState[i] = true
        }
        return initialHiddenState
    })

    // Sample data - you can replace this with props or API data
    const companyData = {
        name: "Golden Oak Solutions",
        logo: "🏢",
        totalReviews: 247,
        averageRating: 4.3,
        bio: "We are a leading technology consulting firm specializing in innovative software solutions and digital transformation. With over 10 years of experience, we help businesses modernize their operations and achieve their digital goals through cutting-edge technology and expert guidance.",
        address: "123 Business District, Tech Valley, California 94025",
        website: "www.goldenoaksolutions.com",
        isVerified: true
    }

    const ratingBreakdown = [
        { stars: 5, count: 124, percentage: 50 },
        { stars: 4, count: 74, percentage: 30 },
        { stars: 3, count: 37, percentage: 15 },
        { stars: 2, count: 7, percentage: 3 },
        { stars: 1, count: 5, percentage: 2 }
    ]

    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            rating: 5,
            date: "2 weeks ago",
            comment: "Exceptional service and professional team. They delivered our project on time and exceeded our expectations. The attention to detail was remarkable, and their innovative approach to solving complex problems impressed our entire leadership team. I would highly recommend Golden Oak Solutions for any technology consulting needs.",
            role: "CEO at TechCorp",
            isVerified: true,
            hasCompanyReply: true,
            companyReply: {
                date: "1 week ago",
                message: "Thank you so much for your kind words, Sarah! We're thrilled that our team exceeded your expectations. Your project was a pleasure to work on, and we look forward to future collaborations."
            },
            comments: [
                {
                    id: 1,
                    name: "Mark Thompson",
                    date: "1 week ago",
                    message: "I can confirm this! Golden Oak Solutions helped us too and they were amazing.",
                    isVerified: false
                },
                {
                    id: 2,
                    name: "Golden Oak Solutions",
                    date: "1 week ago",
                    message: "Thank you Mark! We appreciate all our valued clients.",
                    isCompany: true
                }
            ]
        },
        {
            id: 2,
            name: "Michael Chen",
            rating: 4,
            date: "1 month ago",
            comment: "Great experience working with Golden Oak Solutions. Their technical expertise is impressive, and they were very responsive throughout the project. The team demonstrated deep knowledge of modern technologies and provided valuable insights that helped optimize our systems. Communication was excellent and project delivery was smooth.",
            role: "CTO at InnovateX",
            isVerified: true,
            hasCompanyReply: true,
            companyReply: {
                date: "3 weeks ago",
                message: "Thank you Michael! We really enjoyed working on your optimization project. Your team was also fantastic to collaborate with."
            },
            comments: [
                {
                    id: 1,
                    name: "Lisa Park",
                    date: "3 weeks ago",
                    message: "We're considering Golden Oak Solutions for our next project after reading this review!",
                    isVerified: true
                }
            ]
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            rating: 5,
            date: "1 month ago",
            comment: "Outstanding results! The team was knowledgeable, efficient, and provided excellent support even after project completion. They went above and beyond to ensure our success and their post-implementation support has been invaluable. Truly a partner you can rely on for long-term success.",
            role: "Product Manager at DigiSoft",
            isVerified: false,
            hasCompanyReply: true,
            companyReply: {
                date: "3 weeks ago",
                message: "Emily, we're so happy to hear about your success! Post-implementation support is crucial to us, and we're glad it made a difference for your team."
            },
            comments: []
        },
        {
            id: 4,
            name: "David Wilson",
            rating: 4,
            date: "2 months ago",
            comment: "Professional service with good attention to detail. The project was completed successfully, though there were minor delays in communication initially. Once we established clear communication channels, everything proceeded smoothly. The final deliverables exceeded our expectations and the team was very accommodating to our specific requirements.",
            role: "Director at WebSolutions",
            isVerified: true,
            hasCompanyReply: true,
            companyReply: {
                date: "2 months ago",
                message: "Thank you David for the honest feedback. We've since improved our communication processes to ensure smoother project starts. We appreciate your patience and are glad the final results met your expectations!"
            },
            comments: [
                {
                    id: 1,
                    name: "Jennifer Adams",
                    date: "2 months ago",
                    message: "Communication improvements are always good to see! Shows they listen to feedback.",
                    isVerified: false
                },
                {
                    id: 2,
                    name: "Golden Oak Solutions",
                    date: "2 months ago",
                    message: "Absolutely Jennifer! Client feedback helps us grow and improve continuously.",
                    isCompany: true
                },
                {
                    id: 3,
                    name: "Robert Kim",
                    date: "1 month ago",
                    message: "Just finished a project with them - communication was excellent from start to finish!",
                    isVerified: true
                }
            ]
        }
    ]

    const openCommentsModal = (review) => {
        setSelectedReviewComments(review)
        setShowCommentsModal(true)
    }

    const closeCommentsModal = () => {
        setShowCommentsModal(false)
        setSelectedReviewComments(null)
    }

    const toggleReviewExpansion = (reviewId) => {
        setExpandedReviews(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }))
    }

    const toggleCommentsVisibility = (reviewId) => {
        setHiddenComments(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }))
    }

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text
        return text.substring(0, maxLength) + "..."
    }

    const renderStars = (rating, size = "w-5 h-5") => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} ${
                            star <= rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-amber-200"
                        }`}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-amber-25 to-white p-4 md:p-6 relative overflow-hidden">
            {/* Enhanced decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top section background elements */}
                <div className="absolute top-16 left-8 text-amber-100 w-12 h-12 rotate-12 opacity-40">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute top-32 right-16 text-amber-100 w-16 h-16 -rotate-12 opacity-35">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute top-24 left-1/3 text-amber-100 w-8 h-8 rotate-45 opacity-30">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute top-8 right-1/3 text-amber-100 w-14 h-14 -rotate-45 opacity-25">
                    <Shield className="w-full h-full" />
                </div>
                
                {/* Smile emojis */}
                <div className="absolute top-40 left-20 text-6xl opacity-20 rotate-12"><Star className="w-full h-full" /></div>
                <div className="absolute top-20 right-32 text-4xl opacity-15 -rotate-12"><Pencil className="w-full h-full" /></div>
                <div className="absolute top-60 left-2/3 text-5xl opacity-18 rotate-6">🙂</div>
                
                {/* Middle section elements */}
                <div className="absolute top-1/3 right-1/4 text-amber-100 w-10 h-10 rotate-90 opacity-30">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute top-1/2 left-1/4 text-amber-100 w-18 h-18 -rotate-45 opacity-35">
                    <Users className="w-full h-full" />
                </div>
                <div className="absolute top-2/5 right-12 text-amber-100 w-12 h-12 rotate-180 opacity-25">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute top-1/2 left-12 text-amber-100 w-14 h-14 rotate-45 opacity-30">
                    <Globe className="w-full h-full" />
                </div>
                
                {/* More smile emojis in middle */}
                <div className="absolute top-1/3 left-16 text-5xl opacity-15 rotate-45"><Star className="w-full h-full" /></div>
                <div className="absolute top-2/5 right-20 text-4xl opacity-20 -rotate-30"><Pencil className="w-full h-full" /></div>
                <div className="absolute top-1/2 right-1/3 text-6xl opacity-12 rotate-15">😌</div>
                
                {/* Bottom section elements */}
                <div className="absolute bottom-40 right-20 text-amber-100 w-20 h-20 -rotate-12 opacity-40">
                    <CheckCircle className="w-full h-full" />
                </div>
                <div className="absolute bottom-32 left-16 text-amber-100 w-10 h-10 rotate-90 opacity-25">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute bottom-20 right-40 text-amber-100 w-16 h-16 -rotate-45 opacity-30">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute bottom-24 left-1/3 text-amber-100 w-12 h-12 rotate-30 opacity-35">
                    <Users className="w-full h-full" />
                </div>
                <div className="absolute bottom-16 right-1/4 text-amber-100 w-14 h-14 -rotate-60 opacity-25">
                    <Shield className="w-full h-full" />
                </div>
                <div className="absolute bottom-48 left-8 text-amber-100 w-8 h-8 rotate-45 opacity-40">
                    <Star className="w-full h-full" />
                </div>
                
                {/* Bottom smile emojis */}
                <div className="absolute bottom-32 left-32 text-5xl opacity-18 rotate-30"><Star className="w-full h-full" /></div>
                <div className="absolute bottom-20 right-24 text-4xl opacity-22 -rotate-20"><Pencil className="w-full h-full" /></div>
                <div className="absolute bottom-40 left-2/3 text-6xl opacity-15 rotate-45">🥰</div>
                <div className="absolute bottom-60 right-8 text-5xl opacity-20 -rotate-15"><Pencil className="w-full h-full" /></div>
                
                {/* Additional scattered elements */}
                <div className="absolute top-72 left-4 text-amber-100 w-6 h-6 rotate-180 opacity-30">
                    <Star className="w-full h-full" />
                </div>
                <div className="absolute top-96 right-6 text-amber-100 w-10 h-10 rotate-90 opacity-25">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute bottom-72 left-6 text-amber-100 w-8 h-8 -rotate-45 opacity-35">
                    <CheckCircle className="w-full h-full" />
                </div>
                <div className="absolute bottom-96 right-4 text-amber-100 w-12 h-12 rotate-60 opacity-20">
                    <Globe className="w-full h-full" />
                </div>
                
                {/* More scattered emojis */}
                <div className="absolute top-80 right-1/2 text-4xl opacity-16 rotate-20"><Pencil className="w-full h-full" /></div>
                <div className="absolute bottom-80 left-1/2 text-5xl opacity-19 -rotate-25">🤩</div>
                <div className="absolute top-1/4 left-8 text-3xl opacity-22 rotate-35"><Pencil className="w-full h-full" /></div>
                <div className="absolute bottom-1/4 right-12 text-4xl opacity-14 -rotate-40">🥳</div>
                
                {/* Company profile specific elements */}
                <div className="absolute top-1/5 right-1/5 text-amber-100 w-16 h-16 rotate-25 opacity-20">
                    <Users className="w-full h-full" />
                </div>
                <div className="absolute top-3/5 left-1/5 text-amber-100 w-14 h-14 -rotate-35 opacity-25">
                    <Globe className="w-full h-full" />
                </div>
                
                {/* Review section specific elements */}
                <div className="absolute bottom-1/3 left-1/6 text-amber-100 w-18 h-18 rotate-15 opacity-30">
                    <Pencil className="w-full h-full" />
                </div>
                <div className="absolute bottom-1/5 right-1/6 text-amber-100 w-16 h-16 -rotate-25 opacity-25">
                    <CheckCircle className="w-full h-full" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Enhanced Header Section */}
                <div className="bg-white rounded-xl  p-6 md:p-8 mb-8  relative z-10 backdrop-blur-sm bg-white/95">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Side - Company Info */}
                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                                <div className="relative">
                                    <div className="text-7xl bg-gradient-to-br from-amber-100 to-amber-200 p-6 rounded-2xl shadow-inner">
                                        {companyData.logo}
                                    </div>
                                    {companyData.isVerified && (
                                        <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-2 rounded-full shadow-lg">
                                            <Shield className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
                                            {companyData.name}
                                        </h1>
                                        {companyData.isVerified && (
                                            <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                                                <CheckCircle className="w-4 h-4" />
                                                Verified
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            {renderStars(Math.floor(companyData.averageRating))}
                                            <span className="text-2xl font-bold text-amber-700">
                                                {companyData.averageRating}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                            <Users className="w-5 h-5" />
                                            <span className="font-semibold">
                                                {companyData.totalReviews} Reviews
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                                    <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                                        <Globe className="w-5 h-5" />
                                        About Us
                                    </h3>
                                    <p className="text-amber-800 leading-relaxed text-lg">
                                        {companyData.bio}
                                    </p>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-white rounded-lg border border-amber-200">
                                    <MapPin className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                                    <span className="text-amber-800 font-medium">{companyData.address}</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                        <Globe className="w-5 h-5" />
                                        Visit Website
                                    </button>
                                    <button className="inline-flex items-center justify-center gap-3 bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                        <Pencil className="w-5 h-5" />
                                        Write a Review
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Enhanced Rating Breakdown */}
                        <div className="lg:w-96">
                            <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-8 rounded-xl shadow-lg border border-amber-200 sticky top-6">
                                <h3 className="text-xl font-bold text-amber-900 mb-6 text-center">Rating Breakdown</h3>
                                <div className="space-y-4">
                                    {ratingBreakdown.map((rating) => (
                                        <div key={rating.stars} className="flex items-center gap-4">
                                            <span className="text-lg font-bold text-amber-800 w-8 flex items-center">
                                                {rating.stars}<Star className="w-4 h-4 ml-1 text-amber-500 fill-amber-500" />
                                            </span>
                                            <div className="flex-1 bg-amber-200 rounded-full h-4 overflow-hidden shadow-inner">
                                                <div
                                                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 ease-out shadow-sm"
                                                    style={{ width: `${rating.percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-semibold text-amber-700 w-12 text-right bg-white px-2 py-1 rounded-full">
                                                {rating.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t-2 border-amber-300">
                                    <div className="text-center bg-white rounded-xl p-4 shadow-inner">
                                        <div className="text-4xl font-bold text-amber-900 mb-1">
                                            {companyData.averageRating}
                                        </div>
                                        <div className="text-sm text-amber-700 font-medium">
                                            out of 5 stars
                                        </div>
                                        <div className="mt-2">
                                            {renderStars(Math.floor(companyData.averageRating), "w-4 h-4")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Reviews Section */}
                <div className="bg-white rounded-xl  p-6 md:p-8  relative z-10 backdrop-blur-sm bg-white/95">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h2 className="text-3xl font-bold text-amber-900">Customer Reviews</h2>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <Pencil className="w-4 h-4" />
                                Write Review
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <ChevronDown className="w-4 h-4" />
                                All Reviews
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div className="relative flex-shrink-0">
                                        <div className="w-14 h-14 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center font-bold text-amber-800 text-lg shadow-md">
                                            {review.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        {review.isVerified && (
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full shadow-lg">
                                                <CheckCircle className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-amber-900 text-lg">{review.name}</h4>
                                                    {review.isVerified && (
                                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-amber-600 font-medium">{review.role}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 mb-4">
                                            {renderStars(review.rating, "w-4 h-4")}
                                            <span className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded-full font-medium">{review.date}</span>
                                        </div>
                                        <div className="text-amber-800 leading-relaxed mb-4">
                                            <p className="mb-2">
                                                {expandedReviews[review.id] ? review.comment : truncateText(review.comment)}
                                            </p>
                                            {review.comment.length > 150 && (
                                                <button
                                                    onClick={() => toggleReviewExpansion(review.id)}
                                                    className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-colors duration-200"
                                                >
                                                    {expandedReviews[review.id] ? (
                                                        <>
                                                            <ChevronUp className="w-4 h-4" />
                                                            Show Less
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChevronDown className="w-4 h-4" />
                                                            Read More
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                        
                                        {/* Company Reply Section - with smooth height transition */}
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${!hiddenComments[review.id] && review.hasCompanyReply ? 'max-h-48 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
                                            {review.hasCompanyReply && (
                                                <div className="bg-white border border-amber-200 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white font-bold text-sm">GO</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-amber-900 text-sm">Golden Oak Solutions</p>
                                                            <p className="text-xs text-amber-600">{review.companyReply.date}</p>
                                                        </div>
                                                        <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-semibold ml-auto">
                                                            Company
                                                        </div>
                                                    </div>
                                                    <p className="text-amber-800 text-sm leading-relaxed">{review.companyReply.message}</p>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Comments and Reply Section - with smooth transition */}
                                        <div className="flex flex-wrap gap-2 justify-between items-center">
                                            <div className={`flex flex-wrap gap-2 transition-all duration-300 ease-in-out overflow-hidden ${!hiddenComments[review.id] ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                {(review.comments && review.comments.length > 0) && (
                                                    <button
                                                        onClick={() => openCommentsModal(review)}
                                                        className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200"
                                                    >
                                                        <MessageCircle className="w-3 h-3" />
                                                        Read More Comments ({review.comments.length})
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => openCommentsModal(review)}
                                                    className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200"
                                                >
                                                    <Reply className="w-3 h-3" />
                                                    {review.hasCompanyReply ? 'View All Replies' : 'Reply'}
                                                </button>
                                            </div>
                                            
                                            {/* Hide/Show Comments Button */}
                                            <button
                                                onClick={() => toggleCommentsVisibility(review.id)}
                                                className="inline-flex items-center gap-1 text-gray-500 hover:text-amber-600 bg-gray-50 hover:bg-amber-50 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 flex-shrink-0"
                                            >
                                                {hiddenComments[review.id] ? (
                                                    <>
                                                        <Eye className="w-3 h-3" />
                                                        Show Comments
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeOff className="w-3 h-3" />
                                                        Hide Comments
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <button className="bg-white border-2 border-amber-600 hover:bg-amber-50 text-amber-600 px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-3">
                            <ChevronDown className="w-5 h-5" />
                            Load More Reviews
                        </button>
                    </div>
                </div>

                {/* Comments Modal */}
                {showCommentsModal && selectedReviewComments && (
                    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl border border-amber-200 max-w-2xl w-full max-h-[80vh] overflow-hidden">
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold">Comments & Replies</h3>
                                        <p className="text-amber-100 text-sm">Review by {selectedReviewComments.name}</p>
                                    </div>
                                    <button
                                        onClick={closeCommentsModal}
                                        className="text-white hover:bg-amber-800 p-2 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 max-h-96 overflow-y-auto">
                                {/* Original Review */}
                                <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-200">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center font-bold text-amber-800">
                                            {selectedReviewComments.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-bold text-amber-900">{selectedReviewComments.name}</h4>
                                                {selectedReviewComments.isVerified && (
                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                {renderStars(selectedReviewComments.rating, "w-4 h-4")}
                                                <span className="text-sm text-amber-600">{selectedReviewComments.date}</span>
                                            </div>
                                            <p className="text-amber-800 text-sm leading-relaxed">{selectedReviewComments.comment}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Reply */}
                                {selectedReviewComments.hasCompanyReply && (
                                    <div className="bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg p-4 mb-4 border-l-4 border-amber-600">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">GO</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="font-bold text-amber-900">Golden Oak Solutions</h4>
                                                    <div className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                        Company
                                                    </div>
                                                    <span className="text-sm text-amber-600">{selectedReviewComments.companyReply.date}</span>
                                                </div>
                                                <p className="text-amber-800 text-sm leading-relaxed">{selectedReviewComments.companyReply.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Comments */}
                                {selectedReviewComments.comments && selectedReviewComments.comments.length > 0 && (
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-amber-900 text-lg border-b border-amber-200 pb-2">
                                            Comments ({selectedReviewComments.comments.length})
                                        </h4>
                                        {selectedReviewComments.comments.map((comment) => (
                                            <div key={comment.id} className={`rounded-lg p-4 border ${comment.isCompany ? 'bg-gradient-to-r from-amber-100 to-amber-50 border-amber-300 border-l-4 border-l-amber-600' : 'bg-gray-50 border-gray-200'}`}>
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${comment.isCompany ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
                                                        {comment.isCompany ? 'GO' : comment.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h5 className="font-semibold text-gray-900 text-sm">{comment.name}</h5>
                                                            {comment.isCompany && (
                                                                <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                                    Company
                                                                </span>
                                                            )}
                                                            {comment.isVerified && !comment.isCompany && (
                                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                                    <CheckCircle className="w-3 h-3" />
                                                                    Verified
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500 mb-2">{comment.date}</p>
                                                        <p className="text-gray-800 text-sm leading-relaxed">{comment.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Comment Section */}
                                <div className="mt-6 pt-6 border-t border-amber-200">
                                    <h4 className="font-bold text-amber-900 mb-3">Add a Comment</h4>
                                    <div className="space-y-3">
                                        <textarea
                                            className="w-full p-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                            rows="3"
                                            placeholder="Share your thoughts or experience..."
                                        ></textarea>
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-gray-500">Comments are public and can be seen by everyone</p>
                                            <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300">
                                                Post Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CompanyProfilePage