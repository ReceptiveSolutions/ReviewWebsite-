import React, { useState } from 'react'
import { Star, Pencil, ChevronDown, ChevronUp, CheckCircle, MessageCircle, X, Reply, EyeOff, Eye } from 'lucide-react'
import { useParams } from 'react-router-dom'

function MiniReview() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const userId = localStorage.getItem("userId")
  const {id} = useParams()

  console.log(" uuid", userId, "cid", id )

  const handleSubmitReview = async () => {
    if (rating === 0 || comment.trim() === '') {
      alert('Please provide both rating and comment')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('http://localhost:5000/api/reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: rating, // Sent as number
          text: comment.trim(), // Sent as string
          userId:userId,
          companyId:id
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Review submitted successfully:', result)
        
        // Reset form and close modal
        setIsSubmitting(false)
        setIsReviewModalOpen(false)
        setRating(0)
        setComment('')
        alert('Review submitted successfully!')
      } else {
        const errorData = await response.json()
        console.error('Error submitting review:', errorData)
        setIsSubmitting(false)
        alert('Failed to submit review. Please try again.')
      }
    } catch (error) {
      console.error('Network error:', error)
      setIsSubmitting(false)
      alert('Network error. Please check your connection and try again.')
    }
  }

  const closeModal = () => {
    setIsReviewModalOpen(false)
    setRating(0)
    setHoveredRating(0)
    setComment('')
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">Customer Reviews</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => setIsReviewModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm"
          >
            <Pencil className="w-4 h-4" />
            Write Review
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm">
            <ChevronDown className="w-4 h-4" />
            All Reviews
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Write a Review</h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Rating Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Rating
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform duration-150 hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        } transition-colors duration-150`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </p>
                )}
              </div>

              {/* Comment Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors duration-200 resize-none"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-2">
                  {comment.length}/500 characters
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={isSubmitting || rating === 0 || comment.trim() === ''}
                className="flex-1 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MiniReview