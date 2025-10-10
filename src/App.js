// File: src/App.js
// Main App component with Cart & Favorites in Header

import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import logo from './assets/logo.png';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Shop from './components/pages/Shop';
import Register from './components/loginregister/RegistrationForm';

// Import Cart & Favorites Components
import CartSidebar from './components/cart/CartSidebar';
import FavoritesSidebar from './components/favorites/FavoritesSidebar';

// Import Contexts
import { CartProvider, useCart } from './contexts/CartContext';
import { FavoritesProvider, useFavorites } from './contexts/FavoritesContext';

// ✅ Inner component jo providers ke andar hai
function AppContent() {
  // ✅ Ab hooks properly providers ke andar use ho rahe hain
  const { 
    cartItems, 
    updateQuantity, 
    removeItem, 
    getTotalItems, 
    getTotalPrice,
    isCartOpen,
    setIsCartOpen
  } = useCart();
  
  const { 
    favoriteItems, 
    removeFavorite, 
    getTotalFavorites,
    isFavoritesOpen,
    setIsFavoritesOpen
  } = useFavorites();

  return (
    <div className="App">
      {/* ✅ Header with Cart & Favorites Icons */}
      <Header 
        logo={logo}
        title="FOOD FIND"
        backgroundColor="#34495e"
        showBorder={true}
        borderColor="#3498db"
       
      />
      
      {/* Navigation */}
      <Navigation 
      
       totalCartItems={getTotalItems()}
        totalFavorites={getTotalFavorites()}
        onCartClick={() => setIsCartOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
      />

      {/* ✅ Favorites Sidebar - Sab pages pe available */}
      <FavoritesSidebar
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteItems={favoriteItems}
        onRemoveFavorite={removeFavorite}
      />

      {/* ✅ Cart Sidebar - Sab pages pe available */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        totalPrice={getTotalPrice()}
      />

      {/* Main Content with Routes */}
      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>


      {/* Footer */}
      <footer style={{
        backgroundColor: '#34495e',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <p>© 2024 Tasty Bites Restaurant | Made with React ⚛️</p>
      </footer>
    </div>
  );
}

// ✅ Main App wrapper with Providers
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;