import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const toggleFavorite = (product) => {
    setFavoriteItems(prev => {
      const isFavorite = prev.find(item => item.id === product.id);
      if (isFavorite) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
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

  const clearFavorites = () => {
    setFavoriteItems([]);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favoriteItems, 
        toggleFavorite, 
        removeFavorite, 
        isFavorite, 
        getTotalFavorites,
        clearFavorites 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};