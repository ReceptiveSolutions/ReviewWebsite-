import React, { useState, useEffect } from "react";
import { X, CheckCircle, Loader2, Heart, Trash2, AlertCircle } from "lucide-react";
import { StarRating, CompanyReplyInmodel } from "../../index";

const CommentsModel = ({ isOpen, onClose, selectedReview }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reviewData, setReviewData] = useState(selectedReview);
  const [newUser, setNewUser] = useState(null);
  const [likedComments, setLikedComments] = useState(new Set());
  const [likingComments, setLikingComments] = useState(new Set());
  const [isReviewLiked, setIsReviewLiked] = useState(false);
  const [isLikingReview, setIsLikingReview] = useState(false);
  const [deletingComments, setDeletingComments] = useState(new Set());
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const userId = localStorage.getItem("userId");

  // Update reviewData when selectedReview changes
  useEffect(() => {
    setReviewData(selectedReview);
  }, [selectedReview]);

  // Fetch current user data
  const getCurrentUser = async () => {
    if (!userId) {
      console.error("No userId found in localStorage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const user = await response.json();
        setNewUser(user);
        console.log("Fetched user:", user);
      } else {
        console.error("Failed to fetch user:", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Check if user has already liked comments/reviews
  const checkUserLikes = async () => {
    if (!userId || !reviewData) return;

    try {
      // Check if user liked the main review
      const reviewLikeResponse = await fetch(
        `http://localhost:5000/api/reviews/${reviewData.id}/like-status/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (reviewLikeResponse.ok) {
        const reviewLikeData = await reviewLikeResponse.json();
        setIsReviewLiked(reviewLikeData.isLiked || false);
      }

      // Check which comments user has liked
      if (reviewData.replies && reviewData.replies.length > 0) {
        const commentLikePromises = reviewData.replies.map(async (reply) => {
          try {
            const response = await fetch(
              `http://localhost:5000/api/reviews/${reply.id}/like-status/${userId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              return { commentId: reply.id, isLiked: data.isLiked || false };
            }
            return { commentId: reply.id, isLiked: false };
          } catch (error) {
            console.error(`Error checking like status for comment ${reply.id}:`, error);
            return { commentId: reply.id, isLiked: false };
          }
        });

        const commentLikeResults = await Promise.all(commentLikePromises);
        const likedCommentsSet = new Set();
        
        commentLikeResults.forEach(({ commentId, isLiked }) => {
          if (isLiked) {
            likedCommentsSet.add(commentId);
          }
        });

        setLikedComments(likedCommentsSet);
      }
    } catch (error) {
      console.error("Error checking user likes:", error);
    }
  };

  // Fetch user data and like status when userId or selectedReview changes
  useEffect(() => {
    getCurrentUser();
    checkUserLikes();
  }, [userId, selectedReview]);

  // Early return after all hooks
  if (!isOpen || !reviewData) return null;

  // Helper function to get display name
  const getDisplayName = (review) => {
    if (review.first_name && review.last_name) {
      console.log("firstname", review.first_name);
      return `${review.first_name} ${review.last_name}`;
    }
    if (review.name) {
      return review.name;
    }
    if (review.first_name) {
      return review.first_name;
    }
    return "Anonymous";
  };

  // Helper function to get initials
  const getInitials = (review) => {
    const displayName = getDisplayName(review);
    if (displayName === "Anonymous") return "A";

    return displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      alert("Please enter a comment before submitting.");
      return;
    }

    if (!reviewData.id) {
      alert("Error: Review ID is missing.");
      console.error("reviewData does not contain an ID:", reviewData);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${reviewData.id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: commentText.trim(),
            userId: userId,
          }),
        }
      );

      if (response.ok) {
        const newComment = await response.json();
        setSubmitSuccess(true);
        setCommentText("");

        const currentUserFirstName = newUser?.user.first_name;
        const currentUserLastName = newUser?.user.last_name;

        // Enhanced comment with user information
        const enhancedComment = {
          ...newComment,
          first_name: currentUserFirstName,
          last_name: currentUserLastName,
          created_at: newComment.created_at || new Date().toISOString(),
          like_count: 0,
          user_id: userId, // Add user_id for delete functionality
        };

        // Update the local reviewData with the new reply
        setReviewData((prevReview) => ({
          ...prevReview,
          replies: [...(prevReview.replies || []), enhancedComment],
        }));

        // Show success message briefly
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle like/unlike toggle functionality
  const handleLikeToggle = async (itemId, isCurrentlyLiked) => {
    if (!userId) {
      alert("Please log in to like content.");
      return { success: false };
    }

    console.log("Attempting to toggle like:", {
      itemId,
      isCurrentlyLiked,
      currentUserId: userId
    });

    try {
      let response;
      
      if (isCurrentlyLiked) {
        // User wants to unlike - use DELETE request
        response = await fetch(
          `http://localhost:5000/api/reviews/${itemId}/like`,
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
      } else {
        // User wants to like - use POST request
        response = await fetch(
          `http://localhost:5000/api/reviews/${itemId}/like`,
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
      }

      console.log("Like toggle API response:", response.status, response.statusText);

      if (response.ok) {
        const result = await response.json();
        console.log("Like toggle API success:", result);
        
        return { 
          success: true, 
          isLiked: !isCurrentlyLiked, // Toggle the current state
          result 
        };
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Like toggle API error:", response.status, errorData);
        throw new Error(errorData.message || `Failed to ${isCurrentlyLiked ? 'unlike' : 'like'} (${response.status})`);
      }
    } catch (error) {
      console.error("Error in handleLikeToggle:", error);
      throw error;
    }
  };

  // Handle like/unlike comment
  const handleLikeComment = async (commentId) => {
    if (likingComments.has(commentId)) {
      return;
    }

    const isCurrentlyLiked = likedComments.has(commentId);
    setLikingComments(prev => new Set(prev).add(commentId));

    try {
      const result = await handleLikeToggle(commentId, isCurrentlyLiked);
      
      if (result.success) {
        // Update liked comments set
        setLikedComments(prev => {
          const newSet = new Set(prev);
          if (result.isLiked) {
            newSet.add(commentId);
          } else {
            newSet.delete(commentId);
          }
          return newSet;
        });

        // Update the like count in reviewData
        setReviewData(prevReview => ({
          ...prevReview,
          replies: prevReview.replies.map(reply => 
            reply.id === commentId 
              ? { 
                  ...reply, 
                  like_count: result.isLiked 
                    ? (reply.like_count || 0) + 1 
                    : Math.max((reply.like_count || 0) - 1, 0)
                }
              : reply
          )
        }));
      }
    } catch (error) {
      console.error("Error toggling comment like:", error);
      alert(`Failed to ${isCurrentlyLiked ? 'unlike' : 'like'} comment: ${error.message}`);
    } finally {
      setLikingComments(prev => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
    }
  };

  // Handle like/unlike review
  const handleLikeReview = async () => {
    if (isLikingReview) {
      return;
    }

    setIsLikingReview(true);

    try {
      const result = await handleLikeToggle(reviewData.id, isReviewLiked);
      
      if (result.success) {
        setIsReviewLiked(result.isLiked);
        
        // Update the like count in reviewData
        setReviewData(prevReview => ({
          ...prevReview,
          like_count: result.isLiked 
            ? (prevReview.like_count || 0) + 1 
            : Math.max((prevReview.like_count || 0) - 1, 0)
        }));
      }
    } catch (error) {
      console.error("Error toggling review like:", error);
      alert(`Failed to ${isReviewLiked ? 'unlike' : 'like'} review: ${error.message}`);
    } finally {
      setIsLikingReview(false);
    }
  };

  
  // Handle delete comment functionality
const handleDeleteComment = async (commentId) => {
  if (!userId) {
    alert("Please log in to delete comments.");
    return;
  }

  if (deletingComments.has(commentId)) {
    return;
  }

  setDeletingComments(prev => new Set(prev).add(commentId));

  try {
    const response = await fetch(
      // Use the COMMENT ID here, not the review ID
      `http://localhost:5000/api/reviews/${commentId}/reply`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId
          // No need for replyId in body since it's in the URL
        }),
      }
    );

    if (response.ok) {
      // Remove the comment from the local state
      setReviewData(prevReview => ({
        ...prevReview,
        replies: prevReview.replies.filter(reply => reply.id !== commentId)
      }));
      
      // Clear any related states
      setLikedComments(prev => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });

      // Close confirmation modal
      setDeleteConfirmation(null);
      
      console.log("Comment deleted successfully");
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to delete comment (${response.status})`);
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    alert(`Failed to delete comment: ${error.message}`);
  } finally {
    setDeletingComments(prev => {
      const newSet = new Set(prev);
      newSet.delete(commentId);
      return newSet;
    });
  }
};
  // Show delete confirmation modal
  const showDeleteConfirmation = (comment) => {
    setDeleteConfirmation(comment);
  };

  // Hide delete confirmation modal
  const hideDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmitComment();
    }
  };

  // Use replies from the data structure
  const replies = reviewData.replies || [];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-w-2xl w-full max-h-[80vh] overflow-hidden">
          {/* Modal Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Comments & Replies
                </h3>
                <p className="text-gray-600 text-sm">
                  Review by {getDisplayName(reviewData)}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors"
                disabled={isSubmitting}
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
                  {getInitials(reviewData)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {getDisplayName(reviewData)}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={reviewData.rating} />
                    <span className="text-xs text-gray-500">
                      {reviewData.created_at
                        ? new Date(reviewData.created_at).toLocaleDateString()
                        : reviewData.date}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    {reviewData.text || reviewData.comment}
                  </p>
                  
                  {/* Like Button for Review */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleLikeReview}
                      disabled={isLikingReview}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                        isReviewLiked
                          ? "bg-red-50 text-red-600 hover:bg-red-100"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-red-600"
                      } ${
                        isLikingReview ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      {isLikingReview ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Heart 
                          className={`w-3 h-3 ${isReviewLiked ? "fill-current" : ""}`} 
                        />
                      )}
                      <span>{reviewData.like_count || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <CompanyReplyInmodel review={reviewData} />

            {/* Comments/Replies */}
            {replies && replies.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 text-base border-b border-gray-200 pb-2">
                  Comments ({replies.length})
                </h4>
                {replies.map((reply) => (
                  <Comment 
                    key={reply.id} 
                    comment={reply} 
                    onLike={handleLikeComment}
                    onDelete={showDeleteConfirmation}
                    isLiked={likedComments.has(reply.id)}
                    isLiking={likingComments.has(reply.id)}
                    isDeleting={deletingComments.has(reply.id)}
                    userId={userId}
                  />
                ))}
              </div>
            )}

            {/* Add Comment Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3 text-sm">
                Add a Comment
              </h4>
              <div className="space-y-3">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  rows="3"
                  placeholder="Share your thoughts or experience..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isSubmitting}
                  maxLength={1000}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">
                      Comments are public and can be seen by everyone
                    </p>
                    {submitSuccess && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs">
                          Comment posted successfully!
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {commentText.length}/1000
                    </span>
                    <button
                      onClick={handleSubmitComment}
                      disabled={
                        isSubmitting || !commentText.trim() || submitSuccess
                      }
                      className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center gap-2"
                    >
                      {isSubmitting && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      {isSubmitting ? "Posting..." : "Post Comment"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Comment Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Comment</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 text-sm mb-3">
                Are you sure you want to delete your comment? This will permanently remove it from the conversation.
              </p>
              
              {/* Preview of comment being deleted */}
              <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {deleteConfirmation.first_name && deleteConfirmation.last_name 
                      ? `${deleteConfirmation.first_name} ${deleteConfirmation.last_name}`
                      : deleteConfirmation.name || "You"
                    }
                  </span>
                  <span className="text-xs text-gray-500">
                    {deleteConfirmation.created_at 
                      ? new Date(deleteConfirmation.created_at).toLocaleDateString()
                      : deleteConfirmation.date
                    }
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                  {deleteConfirmation.text?.length > 100 
                    ? `${deleteConfirmation.text.substring(0, 100)}...`
                    : deleteConfirmation.text || deleteConfirmation.message
                  }
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={hideDeleteConfirmation}
                disabled={deletingComments.has(deleteConfirmation.id)}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteComment(deleteConfirmation.id)}
                disabled={deletingComments.has(deleteConfirmation.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deletingComments.has(deleteConfirmation.id) ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Comment
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

// Comment component for individual comments
const Comment = ({ comment, onLike, onDelete, isLiked, isLiking, isDeleting, userId }) => {
  const getDisplayName = (comment) => {
    if (comment.first_name && comment.last_name) {
      return `${comment.first_name} ${comment.last_name}`;
    }
    if (comment.name) {
      return comment.name;
    }
    if (comment.first_name) {
      return comment.first_name;
    }
    return "Anonymous";
  };

  const getInitials = (comment) => {
    const displayName = getDisplayName(comment);
    if (displayName === "Anonymous") return "A";

    return displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLikeClick = () => {
    onLike(comment.id);
  };

  const handleDeleteClick = () => {
    onDelete(comment);
  };

  // Check if current user can delete this comment
  const canDeleteComment = userId && (
    comment.user_id === userId || 
    comment.userId === userId || 
    comment.created_by === userId
  );

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-md relative ${
        comment.isCompany
          ? "bg-blue-50 border border-blue-200"
          : "bg-white border border-gray-200"
      } ${isDeleting ? "opacity-50" : ""}`}
    >
      {/* Delete Button - Only for current user's comments */}
      {canDeleteComment && !comment.isCompany && (
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 group z-10"
          title="Delete Comment"
        >
          {isDeleting ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Trash2 className="w-3 h-3 group-hover:scale-110 transition-transform" />
          )}
        </button>
      )}

      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs ${
          comment.isCompany
            ? "bg-blue-500 text-white"
            : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700"
        }`}
      >
        {getInitials(comment)}
      </div>
      <div className="flex-1 pr-6"> {/* Added right padding for delete button */}
        <div className="flex items-center gap-2 mb-1">
          <h5
            className={`font-medium text-sm ${
              comment.isCompany ? "text-blue-900" : "text-gray-900"
            }`}
          >
            {getDisplayName(comment)}
            {canDeleteComment && !comment.isCompany && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                You
              </span>
            )}
          </h5>
          {comment.isCompany && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
              Company
            </span>
          )}
        </div>
        <p className="text-gray-700 text-sm leading-relaxed mb-2">
          {comment.text || comment.message}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {comment.created_at
              ? new Date(comment.created_at).toLocaleDateString()
              : comment.date}
          </span>
          
          {/* Like Button */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleLikeClick}
              disabled={isLiking}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                isLiked
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-red-600"
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
              <span>{comment.like_count || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModel;