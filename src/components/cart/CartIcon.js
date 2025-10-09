import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartIcon = ({ totalItems, onClick }) => {
  return (
    <button onClick={onClick} className="icon-button">
      <ShoppingCart className="w-5 h-5" />
      <span className="font-bold text-lg">{totalItems}</span>
      {totalItems > 0 && <div className="icon-badge">{totalItems}</div>}
    </button>
  );
};

export default CartIcon;