import React from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, totalPrice, onCheckout }) => {

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Close sidebar
    onClose();
    
    // Call parent's checkout handler
    if (onCheckout) {
      onCheckout();
    }
  };
  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}

      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="cart-header">
            <div className="cart-header-content">
              <div className="cart-header-title">
                <ShoppingCart className="w-6 h-6" />
                <h2>Shopping Cart</h2>
              </div>
              <button onClick={onClose} className="cart-close-btn">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="cart-subtitle">{cartItems.length} items in cart</p>
          </div>

          <div className="cart-items-container">
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <ShoppingCart className="cart-empty-icon" />
                <p className="cart-empty-text">Your cart is empty</p>
                <p className="cart-empty-subtext">Add some products to get started!</p>
              </div>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-content">
                      <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h3 className="cart-item-title">{item.title}</h3>
                        <p className="cart-item-price">${item.price}</p>
                        
                        <div className="cart-item-actions">
                          <div className="quantity-controls">
                            <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="quantity-btn">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="quantity-btn">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <button onClick={() => onRemoveItem(item.id)} className="remove-item-btn">
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

          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span className="cart-total-label">Total:</span>
                <span className="cart-total-amount">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="checkout-btn test" onClick={handleCheckout}>Checkout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;