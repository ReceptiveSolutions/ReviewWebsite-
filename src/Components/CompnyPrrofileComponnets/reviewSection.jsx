import React, { useState } from 'react'
import { Star, Pencil, ChevronDown, ChevronUp, CheckCircle, MessageCircle, X, Reply, EyeOff, Eye } from 'lucide-react'

export default function ReviewSection(props) {
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

    const [expandedReviews, setExpandedReviews] = useState({})
    const [showCommentsModal, setShowCommentsModal] = useState(false)
    const [selectedReviewComments, setSelectedReviewComments] = useState(null)
    // Set default to hide comments (true means hidden)
    const [hiddenComments, setHiddenComments] = useState(() => {
        // Initialize all reviews with comments hidden by default
        const initialHiddenState = {}
        reviews.forEach(review => {
            initialHiddenState[review.id] = true
        })
        return initialHiddenState
    })

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

    const renderStars = (rating, size = "w-4 h-4") => {
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
        <>
            {/* Enhanced Reviews Section */}
            <div className="bg-white rounded-xl p-6 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Customer Reviews</h2>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm">
                            <Pencil className="w-4 h-4" />
                            Write Review
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm">
                            <ChevronDown className="w-4 h-4" />
                            All Reviews
                        </button>
                    </div>
                </div>

                {/* Fixed: Changed from grid to flex with proper wrapping and alignment */}
                <div className="flex flex-wrap gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="flex-1 min-w-[280px] max-w-[calc(50%-12px)] lg:min-w-[400px] bg-white rounded-lg p-5 border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 self-start">
                            <div className="flex items-start gap-4">
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center font-semibold text-amber-800 text-base shadow-sm">
                                        {review.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    {review.isVerified && (
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full shadow-sm">
                                            <CheckCircle className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-gray-900 text-base">{review.name}</h4>
                                                {review.isVerified && (
                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                                                        <CheckCircle className="w-3 h-3" />
                                                        Verified
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600">{review.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        {renderStars(review.rating)}
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-medium">{review.date}</span>
                                    </div>
                                    <div className="text-gray-700 leading-relaxed mb-4">
                                        <p className="mb-2 text-sm">
                                            {expandedReviews[review.id] ? review.comment : truncateText(review.comment)}
                                        </p>
                                        {review.comment.length > 150 && (
                                            <button
                                                onClick={() => toggleReviewExpansion(review.id)}
                                                className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-xs transition-colors duration-200"
                                            >
                                                {expandedReviews[review.id] ? (
                                                    <>
                                                        <ChevronUp className="w-3 h-3" />
                                                        Show Less
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-3 h-3" />
                                                        Read More
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Company Reply Section - with smooth height transition */}
                                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${!hiddenComments[review.id] && review.hasCompanyReply ? 'max-h-48 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
                                        {review.hasCompanyReply && (
                                            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-semibold text-xs">GO</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">Golden Oak Solutions</p>
                                                        <p className="text-xs text-gray-500">{review.companyReply.date}</p>
                                                    </div>
                                                    <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-xs font-medium ml-auto">
                                                        Company
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 text-sm leading-relaxed">{review.companyReply.message}</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Comments and Reply Section - with smooth transition */}
                                    <div className="flex flex-wrap gap-2 justify-between items-center">
                                        <div className={`flex flex-wrap gap-2 transition-all duration-300 ease-in-out overflow-hidden ${!hiddenComments[review.id] ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            {(review.comments && review.comments.length > 0) && (
                                                <button
                                                    onClick={() => openCommentsModal(review)}
                                                    className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
                                                >
                                                    <MessageCircle className="w-3 h-3" />
                                                    Comments ({review.comments.length})
                                                </button>
                                            )}
                                            <button
                                                onClick={() => openCommentsModal(review)}
                                                className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
                                            >
                                                <Reply className="w-3 h-3" />
                                                {review.hasCompanyReply ? 'View All Replies' : 'Reply'}
                                            </button>
                                        </div>
                                        
                                        {/* Hide/Show Comments Button */}
                                        <button
                                            onClick={() => toggleCommentsVisibility(review.id)}
                                            className="inline-flex items-center gap-1 text-gray-500 hover:text-amber-600 bg-gray-50 hover:bg-amber-50 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex-shrink-0"
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
                    <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm inline-flex items-center gap-2">
                        <ChevronDown className="w-4 h-4" />
                        Load More Reviews
                    </button>
                </div>
            </div>

            {/* Comments Modal */}
            {showCommentsModal && selectedReviewComments && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-w-2xl w-full max-h-[80vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gray-50 border-b border-gray-200 p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Comments & Replies</h3>
                                    <p className="text-gray-600 text-sm">Review by {selectedReviewComments.name}</p>
                                </div>
                                <button
                                    onClick={closeCommentsModal}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 max-h-96 overflow-y-auto">
                            {/* Original Review */}
                            <div className="bg-gray-50 rounded-md p-4 mb-5 border border-gray-200">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center font-semibold text-amber-800 text-sm">
                                        {selectedReviewComments.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-medium text-gray-900 text-sm">{selectedReviewComments.name}</h4>
                                            {selectedReviewComments.isVerified && (
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            {renderStars(selectedReviewComments.rating)}
                                            <span className="text-xs text-gray-500">{selectedReviewComments.date}</span>
                                        </div>
                                        <p className="text-gray-700 text-sm leading-relaxed">{selectedReviewComments.comment}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Company Reply */}
                            {selectedReviewComments.hasCompanyReply && (
                                <div className="bg-amber-50 rounded-md p-4 mb-4 border-l-4 border-amber-500">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold text-xs">GO</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="font-medium text-gray-900 text-sm">Golden Oak Solutions</h4>
                                                <div className="bg-amber-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                                                    Company
                                                </div>
                                                <span className="text-xs text-gray-500">{selectedReviewComments.companyReply.date}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed">{selectedReviewComments.companyReply.message}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Comments */}
                            {selectedReviewComments.comments && selectedReviewComments.comments.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900 text-base border-b border-gray-200 pb-2">
                                        Comments ({selectedReviewComments.comments.length})
                                    </h4>
                                    {selectedReviewComments.comments.map((comment) => (
                                        <div key={comment.id} className={`rounded-md p-4 border ${comment.isCompany ? 'bg-amber-50 border-amber-200 border-l-4 border-l-amber-500' : 'bg-gray-50 border-gray-200'}`}>
                                            <div className="flex items-start gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs ${comment.isCompany ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
                                                    {comment.isCompany ? 'GO' : comment.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h5 className="font-medium text-gray-900 text-xs">{comment.name}</h5>
                                                        {comment.isCompany && (
                                                            <span className="bg-amber-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                                                                Company
                                                            </span>
                                                        )}
                                                        {comment.isVerified && !comment.isCompany && (
                                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                                                                <CheckCircle className="w-3 h-3" />
                                                                Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-500 mb-2">{comment.date}</p>
                                                    <p className="text-gray-700 text-sm leading-relaxed">{comment.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Comment Section */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-medium text-gray-900 mb-3 text-sm">Add a Comment</h4>
                                <div className="space-y-3">
                                    <textarea
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-sm"
                                        rows="3"
                                        placeholder="Share your thoughts or experience..."
                                    ></textarea>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs text-gray-500">Comments are public and can be seen by everyone</p>
                                        <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200">
                                            Post Comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}