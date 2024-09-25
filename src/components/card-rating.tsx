import type React from 'react';
import { FaRegStar, FaStar, FaStarHalfStroke } from 'react-icons/fa6';

interface CardRatingProps {
  rating: number;
}

export default function CardRating({ rating }: CardRatingProps) {
  const roundedRating = Math.round(rating * 2) / 2;

  const fullStars = Math.floor(roundedRating); // FaStar
  const hasHalfStar = roundedRating % 1 >= 0.5; // FaStarHalfStroke
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // FaRegStar

  const fullStarsIcons: React.ReactNode[] = [];
  const emptyStarsIcons: React.ReactNode[] = [];
  const halfStarIcon = hasHalfStar ? <FaStarHalfStroke key='halfStar' color='yellow' /> : null;

  for (let i = 0; i < fullStars; i++) {
    fullStarsIcons.push(<FaStar key={`fullStar-${i}`} color='yellow' />);
  }
  for (let i = 0; i < emptyStars; i++) {
    emptyStarsIcons.push(<FaRegStar key={`emptyStar-${i}`} color='yellow' />);
  }
  const ratingIcons: React.ReactNode[] = [...fullStarsIcons, halfStarIcon, ...emptyStarsIcons];

  let ratingTitle = hasHalfStar ? roundedRating.toFixed(1) : roundedRating.toFixed(0);
  ratingTitle = `Rated ${ratingTitle} out of 5`;

  return (
    <div className='flex flex-row flex-nowrap items-center' title={ratingTitle}>
      {ratingIcons}
    </div>
  );
}
