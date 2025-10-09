import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
// import StarRating from '../common/StarRating';

import StarRating from './common/StarRating';

const ProductCard = ({ product, onAddToCart, onToggleFavorite, isFavorite }) => {
  return (
    <div className="product-card">
      {/* Product Image Section */}
      <div className="product-image-container">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="product-image" 
        />
        
        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="discount-badge">
            -{Math.round(product.discountPercentage)}% OFF
          </div>
        )}
        
        {/* Low Stock Badge */}
        {product.stock < 10 && product.discountPercentage === 0 && (
          <div className="stock-badge">Low Stock</div>
        )}
        
        {/* Favorite Icon Button */}
        <button 
          onClick={() => onToggleFavorite(product)}
          className={`favorite-icon-btn ${isFavorite ? 'active' : ''}`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      {/* Product Info Section */}
      <div className="product-info">
        {/* Category & Rating */}
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <StarRating rating={Math.round(product.rating)} />
          </div>
        </div>
        
        {/* Product Title */}
        <h3 className="product-title">{product.title}</h3>
        
        {/* Price & Add to Cart */}
        <div className="product-footer">
          <div className="product-price-container">
            <span className="product-price">${product.price}</span>
            <span className="product-stock">{product.stock} in stock</span>
          </div>
          <button 
            onClick={() => onAddToCart(product)} 
            className="add-to-cart-btn"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;