'use client';
import React, { useState } from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const [hovered, setHovered] = useState(false);

  const getStarPercentage = (index: number) => {
    const starValue = index + 1;
    if (rating >= starValue) {
      return 100;
    } else if (rating < starValue - 1) {
      return 0;
    } else {
      return (rating - Math.floor(rating)) * 100;
    }
  };

  const stars = [];

  for (let i = 0; i < 5; i++) {
    const percentage = getStarPercentage(i);
    stars.push(
      <div key={i} className='relative text-2xl'>
        <span className='absolute overflow-hidden text-yellow-500 top-0 left-0' style={{ width: `${percentage}%` }}>
          &#9733;
        </span>
        <span className='text-gray-300'>&#9733;</span>
      </div>
    );
  }

  return (
    <div
      className='flex items-center justify-end h-full w-20 ml-auto'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered ? <span className='rating-value text-sm opacity-50'>({rating.toFixed(2)})</span> : stars}
    </div>
  );
};

export default StarRating;
