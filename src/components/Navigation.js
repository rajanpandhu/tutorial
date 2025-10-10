import React from 'react';
import {  Link, useLocation } from 'react-router-dom';
import CartIcon from './cart/CartIcon';
import FavoritesIcon from './favorites/FavoritesIcon';

const Navigation = ({
     totalCartItems = 0,
  totalFavorites = 0,
  onCartClick,
  onFavoritesClick
}) => {

      const location = useLocation();

  const navigationItems = [
    { label: 'Home', icon: '🏠', path: '/' },
    { label: 'Menu', icon: '📋', path: '/menu' },
    { label: 'About', icon: 'ℹ️', path: '/about' },
     { label: 'Shop', icon: 'ℹ️', path: '/shop' },
     { label: 'SignUp', icon: 'ℹ️', path: '/register' },
    { label: 'Contact', icon: '📞', path: '/contact' }
  ];
    return (
        <nav style={{
            backgroundColor: '#2c3e50',
            padding: '10px 30px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
            }}>
            {navigationItems.map((item, index) => (
                <Link
                key={index}
                to={item.path}
                // onClick={item.onClick}
                style={{
                     padding: '10px 20px',
                        backgroundColor: location.pathname === item.path ? '#1a252f' : 'transparent',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                }} 
               onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                    e.target.style.backgroundColor = '#1a252f';
                    }
                }}
                onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                    e.target.style.backgroundColor = 'transparent';
                    }
                }}
                >
                <span>{item.icon}</span>
                <span>{item.label}</span>

                </Link>
            ))
            }

             <div style={{display:'flex'}}>
                {/* Favorites Icon */}
                <FavoritesIcon 
                totalFavorites={totalFavorites} 
                onClick={onFavoritesClick} 
                />

                {/* Cart Icon */}
                <CartIcon 
                totalItems={totalCartItems} 
                onClick={onCartClick} 
                />
            </div>
            </nav>
   
    )
}

export default Navigation;