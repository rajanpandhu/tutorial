import { useState } from 'react';

const useFavorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const toggleFavorite = (product) => {
    setFavoriteItems(prev => {
      const isFavorite = prev.find(item => item.id === product.id);
      if (isFavorite) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFavorite = (productId) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== productId));
  };

  const isFavorite = (productId) => {
    return favoriteItems.some(item => item.id === productId);
  };

  const getTotalFavorites = () => {
    return favoriteItems.length;
  };

  return {
    favoriteItems,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    getTotalFavorites
  };
};

export default useFavorites;