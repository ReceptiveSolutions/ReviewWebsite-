import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ReviewCard,
  MiniReview,
  CommentsModel
} from '../../index';

export default function ReviewSection({ company, loading, error, refreshData, addOptimisticReview, removeOptimisticReview }) {
  const [expandedReviews, setExpandedReviews] = useState({});
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedReviewComments, setSelectedReviewComments] = useState(null);
  const [hiddenComments, setHiddenComments] = useState({});
  const userId = localStorage.getItem('userId') || null;

  const openCommentsModal = (review) => {
    setSelectedReviewComments(review);
    setShowCommentsModal(true);
  };

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
    setSelectedReviewComments(null);
  };

  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const toggleCommentsVisibility = (reviewId) => {
    setHiddenComments((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleCommentsVisibilityUpdate = (reviewId, isHidden) => {
    setHiddenComments((prev) => ({
      ...prev,
      [reviewId]: isHidden,
    }));
  };

  const handleReviewSubmittedFromMini = async (reviewData) => {
    console.log('🚀 Triggering refreshData from MiniReview...');
    await refreshData();
    console.log('✅ refreshData completed in MiniReview');
  };

  useEffect(() => {
    console.log('🔄 ReviewSection re-rendered with company:', company);
  }, [company]);

  if (loading) {
    return <div className="text-center text-amber-600 text-lg font-semibold">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 text-lg font-semibold">Error: {error}</div>;
  }

  if (!company || !company.reviews || company.reviews.length === 0) {
    return <div className="text-center text-gray-600">No reviews available.</div>;
  }

  return (
    <>
      <div className="bg-white rounded-xl p-6 md:p-8">
        <MiniReview 
          onReviewSubmitted={handleReviewSubmittedFromMini} 
          addOptimisticReview={addOptimisticReview}
        />
        <div className="flex flex-wrap gap-6">
          {company.reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={{
                ...review,
                isCurrentUser: userId && (review.user_id === userId || review.userId === userId || review.created_by === userId)
              }}
              expandedReviews={expandedReviews}
              hiddenComments={hiddenComments}
              onToggleExpansion={toggleReviewExpansion}
              onToggleCommentsVisibility={toggleCommentsVisibility}
              onOpenComments={openCommentsModal}
              onCommentsVisibilityUpdate={handleCommentsVisibilityUpdate}
              refreshData={refreshData}
              removeOptimisticReview={removeOptimisticReview}
              addOptimisticReview={addOptimisticReview}
            />
          ))}
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
  );
}