import React, { useState } from 'react';
import { Star, X, CheckCircle } from 'lucide-react';

function ReviewModal({ 
  isOpen, 
  onClose, 
  onSubmitSuccess, 
  companyId, 
  userId 
}) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    console.log('🚀 Starting review submission...');
    console.log('📝 Review data:', { rating, comment: comment.trim(), userId, companyId });

    if (rating === 0 || comment.trim() === '') {
      onSubmitSuccess(false, 'Please provide both rating and comment');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/reviews/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          text: comment.trim(),
          userId,
          companyId
        })
      });

      if (response.ok) {
        const result = await response.json();
        
        // Reset form and close modal
        setRating(0);
        setHoveredRating(0);
        setComment('');
        setIsSubmitting(false);
        console.log('🔄 Closing modal and notifying parent...');
        // Close modal and notify parent of success
        onClose();
        onSubmitSuccess(true, 'Review submitted successfully!', result);
      } else {
        const errorData = await response.json();
        setIsSubmitting(false);
        onSubmitSuccess(false, errorData.message || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      setIsSubmitting(false);
      onSubmitSuccess(false, 'Network error. Please check your connection and try again.');
    }
  };

  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setComment('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;
  console.log('🎭 ReviewModal rendered - isOpen:', isOpen);
  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Write a Review</h3>
          <button
            onClick={handleClose}
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
              placeholder="Share your experience with this company..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors duration-200 resize-none"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-2">
              {comment.length}/500 characters
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
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
  );
}

export default ReviewModal;