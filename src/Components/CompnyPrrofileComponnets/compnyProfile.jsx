import React, { useState, useEffect } from 'react'

export default function CompnyProfile(props) {
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

    return (
        <>
            
        </>
    )
}
