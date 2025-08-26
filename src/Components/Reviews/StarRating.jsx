// components/StarRating.jsx
import React from 'react'
import { Star } from 'lucide-react'

const  StarRating = ({ rating, size = "w-4 h-4" }) => {
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
export default StarRating