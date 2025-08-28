import React, { useState } from 'react';
import { Pencil, ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Toaster from "../Toaster";
import ReviewModal from "../CompnyPrrofileComponnets/ReviewModal";


function MiniReview({ onReviewSubmitted, addOptimisticReview }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [toasterMessage, setToasterMessage] = useState(null);
  const [toasterType, setToasterType] = useState('success');
  const userId = localStorage.getItem("userId");
  const { id } = useParams();

  const handleReviewSubmitSuccess = async (success, message, reviewData = null) => {
    setToasterMessage(message);
    setToasterType(success ? 'success' : 'error');
    
    if (success && onReviewSubmitted && reviewData) {
      console.log('🚀 Applying optimistic update in MiniReview:', reviewData);
      addOptimisticReview(reviewData, userId);
      console.log('🚀 Triggering onReviewSubmitted from MiniReview...');
      await onReviewSubmitted(reviewData);
      console.log('✅ onReviewSubmitted completed in MiniReview');
    }
  };

  return (
    <>
      <Toaster 
        message={toasterMessage} 
        type={toasterType} 
        onClose={() => setToasterMessage(null)} 
      />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">Customer Reviews</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => {
              if (!userId) {
                setToasterMessage('Please log in to write a review.');
                setToasterType('error');
                return;
              }
              setIsReviewModalOpen(true);
            }}
            disabled={!userId}
            className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
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
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitSuccess={handleReviewSubmitSuccess}
        companyId={id}
        userId={userId}
      />
    </>
  );
}

export default MiniReview;