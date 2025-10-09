import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Star key={i} className="star-icon star-filled" />
      );
    } else {
      stars.push(
        <Star key={i} className="star-icon star-empty" />
      );
    }
  }

  return (
    <div className="star-rating">
      {stars}
      <span className="rating-text">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;