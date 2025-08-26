// components/ReviewCard.jsx
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Reply,
  EyeOff,
  Eye,
  User,
  Heart,
  Loader2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { CompanyReply, StarRating } from "../../index";
import { useParams } from "react-router-dom";

const ReviewCard = ({
  expandedReviews,
  hiddenComments,
  onToggleExpansion,
  onToggleCommentsVisibility,
  onOpenComments,
  onCommentsVisibilityUpdate,
}) => {
  const [data, setData] = useState({ reviews: [] });
  const [loading, setLoading] = useState(true);
  const [likedReviews, setLikedReviews] = useState(new Set());
  const [likingReviews, setLikingReviews] = useState(new Set());
  const [deletingReviews, setDeletingReviews] = useState(new Set());
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const { id } = useParams();
  const companyId = id;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchReviews();
  }, [companyId]);

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getInitials = (firstName, lastName) => {
    const initials = [];
    if (firstName) initials.push(firstName[0]);
    if (lastName) initials.push(lastName[0]);
    return initials.join("").toUpperCase();
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/reviews/company/${companyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      console.log("Fetched reviews data:", res);
      
      // Add isCurrentUser property to each review
      const reviewsWithUserFlag = res.reviews ? res.reviews.map(review => ({
        ...review,
        isCurrentUser: userId && (review.user_id === userId || review.userId === userId || review.created_by === userId)
      })) : [];
      
      console.log("Reviews with user flag:", reviewsWithUserFlag);
      console.log("Current userId:", userId);
      
      setData({
        ...res,
        reviews: reviewsWithUserFlag
      });
      
      // Initialize hidden comments state for all reviews
      if (reviewsWithUserFlag && onCommentsVisibilityUpdate) {
        reviewsWithUserFlag.forEach(review => {
          onCommentsVisibilityUpdate(review.id, true);
        });
      }
    } catch (err) {
      console.log("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle like/unlike functionality
  const handleLikeReview = async (reviewId) => {
    if (!userId) {
      alert("Please log in to like reviews.");
      return;
    }

    if (likingReviews.has(reviewId)) {
      return;
    }

    setLikingReviews(prev => new Set(prev).add(reviewId));

    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${reviewId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        
        // Update liked reviews set
        setLikedReviews(prev => new Set(prev).add(reviewId));
        
        // Update the like count in the reviews data
        setData(prevData => ({
          ...prevData,
          reviews: prevData.reviews.map(review => 
            review.id === reviewId 
              ? { 
                  ...review, 
                  like_count: (review.like_count || 0) + 1
                }
              : review
          )
        }));
        
      } else if (response.status === 409) {
        // Already liked
        const errorData = await response.json().catch(() => ({}));
        if (errorData.error && errorData.error.includes('already liked')) {
          setLikedReviews(prev => new Set(prev).add(reviewId));
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to like review (${response.status})`);
      }
    } catch (error) {
      console.error("Error liking review:", error);
      alert(`Failed to like review: ${error.message}`);
    } finally {
      setLikingReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

  // Handle delete review functionality
  const handleDeleteReview = async (reviewId) => {
    if (!userId) {
      alert("Please log in to delete reviews.");
      return;
    }

    if (deletingReviews.has(reviewId)) {
      return;
    }

    setDeletingReviews(prev => new Set(prev).add(reviewId));

    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId
          }),
        }
      );

      if (response.ok) {
        // Remove the review from the local state
        setData(prevData => ({
          ...prevData,
          reviews: prevData.reviews.filter(review => review.id !== reviewId)
        }));
        
        // Clear any related states
        setLikedReviews(prev => {
          const newSet = new Set(prev);
          newSet.delete(reviewId);
          return newSet;
        });

        // Close confirmation modal
        setDeleteConfirmation(null);
        
        console.log("Review deleted successfully");
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to delete review (${response.status})`);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert(`Failed to delete review: ${error.message}`);
    } finally {
      setDeletingReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

  // Show delete confirmation modal
  const showDeleteConfirmation = (review) => {
    setDeleteConfirmation(review);
  };

  // Hide delete confirmation modal
  const hideDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const renderProfilePicture = (review) => {
    if (review.profilePicture) {
      return (
        <img
          src={review.profilePicture}
          alt={`${review.first_name || review.name}'s profile`}
          className="w-12 h-12 rounded-full object-cover shadow-sm"
          onError={(e) => {
            e.target.style.display = "none";
            if (e.target.nextSibling) {
              e.target.nextSibling.style.display = "flex";
            }
          }}
        />
      );
    }
    return null;
  };

  const renderInitialsAvatar = (review) => {
    return (
      <div
        className={`w-12 h-12 bg-gradient-to-br ${
          review.isCurrentUser
            ? "from-green-100 to-green-200 text-green-800"
            : "from-amber-100 to-amber-200 text-amber-800"
        } rounded-full flex items-center justify-center font-semibold text-base shadow-sm ${
          review.profilePicture ? "hidden" : "flex"
        }`}
      >
        {review.first_name || review.name ? 
          getInitials(review.first_name || review.name, review.last_name || "") : 
          <User className="w-6 h-6" />
        }
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!data.reviews || data.reviews.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p>No reviews available yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {data.reviews.map((review, index) => {
          const isExpanded = expandedReviews[review.id] || false;
          const isCommentsHidden = hiddenComments[review.id] !== false; // Default to hidden
          const isLiked = likedReviews.has(review.id);
          const isLiking = likingReviews.has(review.id);
          const isDeleting = deletingReviews.has(review.id);

          return (
            <div
              key={review.id || index}
              className={`flex-1 min-w-[280px] max-w-[calc(50%-12px)] lg:min-w-[400px] bg-white rounded-lg p-5 border ${
                review.isCurrentUser
                  ? "border-green-300 bg-green-50/30"
                  : "border-gray-200 hover:border-amber-300"
              } hover:shadow-md transition-all duration-300 self-start relative ${
                isDeleting ? "opacity-50" : ""
              }`}
            >
              {/* Delete Button - Only for current user's reviews */}
              {(review.isCurrentUser || (userId && (review.user_id === userId || review.userId === userId || review.created_by === userId))) && (
                <button
                  onClick={() => showDeleteConfirmation(review)}
                  disabled={isDeleting}
                  className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 group z-10"
                  title="Delete Review"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              )}

              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  {renderProfilePicture(review)}
                  {renderInitialsAvatar(review)}

                  {/* Current user indicator */}
                  {review.isCurrentUser && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 pr-8"> {/* Added right padding for delete button */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className={`font-semibold text-base ${
                            review.isCurrentUser
                              ? "text-green-900"
                              : "text-gray-900"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>
                              {review.first_name && review.last_name 
                                ? `${review.first_name} ${review.last_name}`
                                : review.name || "Anonymous"
                              }
                            </span>
                            {(review.isCurrentUser || (userId && (review.user_id === userId || review.userId === userId || review.created_by === userId))) && (
                              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                You
                              </span>
                            )}
                          </div>
                        </h4>
                        {review.isVerified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      {review.role && (
                        <p className="text-xs text-gray-600 font-medium">
                          {review.role}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-medium">
                        {review.created_at 
                          ? new Date(review.created_at).toLocaleDateString()
                          : review.date
                        }
                      </span>
                    </div>
                  </div>

                  <div className="text-gray-700 leading-relaxed mb-4">
                    <div className="mb-2 text-sm">
                      {isExpanded ? (
                        <span>{review.text || review.comment}</span>
                      ) : (
                        <span>{truncateText(review.text || review.comment)}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      {(review.text || review.comment) &&
                        (review.text || review.comment).length > 150 && (
                          <button
                            onClick={() => {
                              console.log("Read More clicked for review:", review.id);
                              onToggleExpansion(review.id);
                            }}
                            className={`inline-flex items-center gap-1 ${
                              review.isCurrentUser
                                ? "text-green-600 hover:text-green-700"
                                : "text-amber-600 hover:text-amber-700"
                            } font-medium text-xs transition-colors duration-200`}
                          >
                            {isExpanded ? (
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
                  </div>

                  <CompanyReply review={review} isHidden={isCommentsHidden} />

                  <div className="flex flex-wrap gap-2 justify-between items-center">
                    <div
                      className={`flex flex-wrap gap-2 transition-all duration-300 ease-in-out overflow-hidden ${
                        !isCommentsHidden
                          ? "max-h-20 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {review.comments && review.comments.length > 0 && (
                        <button
                          onClick={() => onOpenComments(review)}
                          className={`inline-flex items-center gap-1 ${
                            review.isCurrentUser
                              ? "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
                              : "text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100"
                          } px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200`}
                        >
                          <MessageCircle className="w-3 h-3" />
                          Comments ({review.comments.length})
                        </button>
                      )}
                      {review.replies && review.replies.length > 0 && (
                        <button
                          onClick={() => onOpenComments(review)}
                          className={`inline-flex items-center gap-1 ${
                            review.isCurrentUser
                              ? "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
                              : "text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100"
                          } px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200`}
                        >
                          <MessageCircle className="w-3 h-3" />
                          Replies ({review.replies.length})
                        </button>
                      )}
                      <button
                        onClick={() => onOpenComments(review)}
                        className={`inline-flex items-center gap-1 ${
                          review.isCurrentUser
                            ? "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
                            : "text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100"
                        } px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200`}
                      >
                        <Reply className="w-3 h-3" />
                        {review.hasCompanyReply ? "View All Replies" : "Reply"}
                      </button>
                      
                      {/* Like Button */}
                      <button
                        onClick={() => handleLikeReview(review.id)}
                        disabled={isLiking}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                          isLiked
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : review.isCurrentUser
                            ? "bg-green-50 text-green-600 hover:bg-green-100 hover:text-red-600"
                            : "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-red-600"
                        } ${
                          isLiking ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        {isLiking ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Heart 
                            className={`w-3 h-3 ${isLiked ? "fill-current" : ""}`} 
                          />
                        )}
                        <span>{review.like_count || 0}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onToggleCommentsVisibility(review.id)}
                      className="inline-flex items-center gap-1 text-gray-500 hover:text-amber-600 bg-gray-50 hover:bg-amber-50 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 flex-shrink-0"
                    >
                      {isCommentsHidden ? (
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
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Review</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 text-sm mb-3">
                Are you sure you want to delete your review? This will permanently remove your review and all associated comments.
              </p>
              
              {/* Preview of review being deleted */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={deleteConfirmation.rating} />
                  <span className="text-xs text-gray-500">
                    {deleteConfirmation.created_at 
                      ? new Date(deleteConfirmation.created_at).toLocaleDateString()
                      : deleteConfirmation.date
                    }
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                  {truncateText(deleteConfirmation.text || deleteConfirmation.comment, 100)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={hideDeleteConfirmation}
                disabled={deletingReviews.has(deleteConfirmation.id)}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteReview(deleteConfirmation.id)}
                disabled={deletingReviews.has(deleteConfirmation.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingReviews.has(deleteConfirmation.id) ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Review
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;