import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  ReviewCard,
  MiniReview,
  CommentsModel
} from '../../index'

export default function ReviewSection() {
  const [expandedReviews, setExpandedReviews] = useState({})
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [selectedReviewComments, setSelectedReviewComments] = useState(null)
  const [hiddenComments, setHiddenComments] = useState({})

  const openCommentsModal = (review) => {
    setSelectedReviewComments(review)
    // console.log("review", selectedReviewComments)
    setShowCommentsModal(true)
  }

  const closeCommentsModal = () => {
    setShowCommentsModal(false)
    setSelectedReviewComments(null)
  }

  const toggleReviewExpansion = (reviewId) => {
    console.log("Toggling expansion for review ID:", reviewId)
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

  const handleCommentsVisibilityUpdate = (reviewId, isHidden) => {
    setHiddenComments(prev => ({
      ...prev,
      [reviewId]: isHidden
    }))
  }

  return (
    <>
      <div className="bg-white rounded-xl p-6 md:p-8">
        <MiniReview />

        <div className="flex flex-wrap gap-6">
          {/* Pass only the handler functions and state to ReviewCard */}
          <ReviewCard
            // review = {reviewId}
            expandedReviews={expandedReviews}
            hiddenComments={hiddenComments}
            onToggleExpansion={toggleReviewExpansion}
            onToggleCommentsVisibility={toggleCommentsVisibility}
            onOpenComments={openCommentsModal}
            onCommentsVisibilityUpdate={handleCommentsVisibilityUpdate}
          />
        </div>

        <div className="mt-10 text-center">
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm inline-flex items-center gap-2">
            <ChevronDown className="w-4 h-4" />
            Load More Reviews
          </button>
        </div>
      </div>

      <CommentsModel
        isOpen={showCommentsModal}
        onClose={closeCommentsModal}
        selectedReview={selectedReviewComments}
      />
    </>
  )
}