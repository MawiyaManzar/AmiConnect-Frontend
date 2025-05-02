
import React from 'react';

interface StarRatingProps {
  rating: number;
}

export const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          filled={star <= rating} 
        />
      ))}
    </div>
  );
};

interface StarProps {
  filled: boolean;
}

const Star = ({ filled }: StarProps) => {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill={filled ? "#9b87f5" : "none"} 
      stroke={filled ? "#9b87f5" : "#d1d5db"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="mr-1"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};
