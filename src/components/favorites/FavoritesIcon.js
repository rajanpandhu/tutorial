import React from 'react';
import { Heart } from 'lucide-react';

const FavoritesIcon = ({ totalFavorites, onClick }) => {
  return (
    <button onClick={onClick} className="icon-button favorite-button">
      <Heart className="w-5 h-5" />
      <span className="font-bold text-lg">{totalFavorites}</span>
      {totalFavorites > 0 && <div className="icon-badge">{totalFavorites}</div>}
    </button>
  );
};

export default FavoritesIcon;