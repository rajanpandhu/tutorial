import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Toggle favorite
  const toggleFavorite = (product) => {
    setFavoriteItems((prevItems) => {
      const exists = prevItems.find(item => item.id === product.id);
      
      if (exists) {
        // Remove from favorites
        return prevItems.filter(item => item.id !== product.id);
      } else {
        // Add to favorites
        // ✅ Auto open favorites sidebar when item added
        setIsFavoritesOpen(true);
        return [...prevItems, product];
      }
    });
  };

  // Remove from favorites
  const removeFavorite = (productId) => {
    setFavoriteItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavoriteItems([]);
  };

  // Check if item is favorite
  const isFavorite = (productId) => {
    return favoriteItems.some(item => item.id === productId);
  };

  // Get total favorites
  const getTotalFavorites = () => {
    return favoriteItems.length;
  };

  // Toggle favorites sidebar
  const toggleFavorites = () => {
    setIsFavoritesOpen(!isFavoritesOpen);
  };

  const value = {
    favoriteItems,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite,
    getTotalFavorites,
    isFavoritesOpen,
    setIsFavoritesOpen,
    toggleFavorites
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export default FavoritesContext;
