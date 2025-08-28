import { useState, useEffect, useCallback } from 'react';

export function useCompanyData(companyId) {
  const [company, setCompany] = useState(null);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyData = useCallback(async () => {
    if (!companyId) {
      setError('Invalid company ID');
      setLoading(false);
      return;
    }

    try {
      console.log('🌐 Fetching company data for ID:', companyId);
      setLoading(true);
      const timestamp = new Date().getTime(); // Cache-busting
      const companyResponse = await fetch(`http://localhost:5000/api/companies/${companyId}?t=${timestamp}`);
      if (!companyResponse.ok) throw new Error('Failed to fetch company data');
      const companyData = await companyResponse.json();
      console.log('✅ Company data received:', companyData);

      const statsResponse = await fetch(`http://localhost:5000/api/reviews/company/${companyId}/stats?t=${timestamp}`);
      if (!statsResponse.ok) throw new Error('Failed to fetch rating stats');
      const statsData = await statsResponse.json();
      console.log('✅ Stats data received:', statsData);

      const ratingsResponse = await fetch(`http://localhost:5000/api/reviews/company/${companyId}/ratings?t=${timestamp}`);
      if (!ratingsResponse.ok) throw new Error('Failed to fetch rating distribution');
      const ratingsData = await ratingsResponse.json();
      console.log('✅ Ratings distribution received:', ratingsData);

      const reviewsResponse = await fetch(`http://localhost:5000/api/reviews/company/${companyId}?t=${timestamp}`);
      const reviewsData = await reviewsResponse.json();
      const sortedReviews = reviewsData.reviews.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      console.log('✅ Reviews data received (sorted):', sortedReviews);

      setCompany({
        ...companyData,
        averageRating: statsData.total_rating ? parseFloat(statsData.total_rating) : 0,
        totalReviews: statsData.total_reviews || 0,
        reviews: sortedReviews,
      });

      const totalReviews = statsData.total_reviews || 0;
      const formattedRatings = [5, 4, 3, 2, 1].map(stars => ({
        stars,
        count: ratingsData[stars.toString()] || 0,
        percentage: totalReviews > 0 ? (ratingsData[stars.toString()] || 0) * 100 / totalReviews : 0
      }));
      setRatingDistribution(formattedRatings);

      setError(null);
      setLoading(false);
      console.log('✅ State updated: company and ratingDistribution');
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('❌ Error fetching company data:', err.message);
    }
  }, [companyId]);

  const addOptimisticReview = useCallback((reviewData, userId) => {
    setCompany(prev => {
      const newReviews = [
        {
          id: reviewData.id || Date.now(),
          rating: reviewData.rating,
          text: reviewData.text,
          created_at: new Date().toISOString(),
          user_id: userId,
          first_name: 'You',
          isCurrentUser: true,
        },
        ...(prev.reviews || []),
      ];
      const newTotalReviews = (prev.totalReviews || 0) + 1;
      const newAverageRating = prev.reviews && prev.reviews.length > 0
        ? ((prev.averageRating * prev.totalReviews + reviewData.rating) / newTotalReviews).toFixed(1)
        : reviewData.rating;

      return {
        ...prev,
        reviews: newReviews,
        totalReviews: newTotalReviews,
        averageRating: parseFloat(newAverageRating),
      };
    });
    setRatingDistribution(prev => {
      const newDistribution = [...prev];
      const totalReviews = (company?.totalReviews || 0) + 1;
      const starIndex = newDistribution.findIndex(r => r.stars === reviewData.rating);
      if (starIndex !== -1) {
        newDistribution[starIndex] = {
          ...newDistribution[starIndex],
          count: newDistribution[starIndex].count + 1,
          percentage: totalReviews > 0 ? ((newDistribution[starIndex].count + 1) * 100 / totalReviews) : 0,
        };
      }
      return newDistribution;
    });
    console.log('🚀 Optimistic review added:', reviewData);
  }, [company]);

  const removeOptimisticReview = useCallback((reviewId, reviewRating) => {
    setCompany(prev => {
      if (!prev || !prev.reviews) return prev;
      const newReviews = prev.reviews.filter(review => review.id !== reviewId);
      const newTotalReviews = Math.max((prev.totalReviews || 0) - 1, 0);
      const newAverageRating = newReviews.length > 0
        ? (prev.reviews.reduce((sum, review) => sum + (review.id === reviewId ? 0 : review.rating), 0) / newReviews.length).toFixed(1)
        : 0;

      return {
        ...prev,
        reviews: newReviews,
        totalReviews: newTotalReviews,
        averageRating: parseFloat(newAverageRating),
      };
    });
    setRatingDistribution(prev => {
      const newDistribution = [...prev];
      const totalReviews = Math.max((company?.totalReviews || 0) - 1, 0);
      const starIndex = newDistribution.findIndex(r => r.stars === reviewRating);
      if (starIndex !== -1) {
        newDistribution[starIndex] = {
          ...newDistribution[starIndex],
          count: Math.max(newDistribution[starIndex].count - 1, 0),
          percentage: totalReviews > 0 ? (Math.max(newDistribution[starIndex].count - 1, 0) * 100 / totalReviews) : 0,
        };
      }
      return newDistribution;
    });
    console.log('🚀 Optimistic review removed:', reviewId);
  }, [company]);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  return {
    company,
    ratingDistribution,
    loading,
    error,
    refreshData: fetchCompanyData,
    addOptimisticReview,
    removeOptimisticReview,
  };
}