import React from 'react';
import { Heart, X, Trash2 } from 'lucide-react';
import StarRating from '../common/StarRating';

const FavoritesSidebar = ({ isOpen, onClose, favoriteItems, onRemoveFavorite }) => {
  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}

      <div className={`favorites-sidebar ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="favorites-header">
            <div className="cart-header-content">
              <div className="cart-header-title">
                <Heart className="w-6 h-6" />
                <h2>My Favorites</h2>
              </div>
              <button onClick={onClose} className="cart-close-btn">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="cart-subtitle">{favoriteItems.length} favorite items</p>
          </div>

          <div className="cart-items-container">
            {favoriteItems.length === 0 ? (
              <div className="cart-empty">
                <Heart className="cart-empty-icon" />
                <p className="cart-empty-text">No favorites yet</p>
                <p className="cart-empty-subtext">Start adding products you love!</p>
              </div>
            ) : (
              <div className="cart-items-list">
                {favoriteItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-content">
                      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h3 className="cart-item-title">{item.title}</h3>
                        <p className="cart-item-price">${item.price}</p>
                        
                        <div className="cart-item-actions">
                          <div className="product-rating">
                            <StarRating rating={item.rating} />
                          </div>
                          
                          <button onClick={() => onRemoveFavorite(item.id)} className="remove-item-btn">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritesSidebar;