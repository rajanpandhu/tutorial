import React, { useState, useEffect } from 'react';

// Import Components
import CartSidebar from '../cart/CartSidebar';
import FavoritesSidebar from '../favorites/FavoritesSidebar';
import FilterSection from '../FilterSection';
import ProductCard from '../ProductCard';
import CartIcon from '../cart/CartIcon';
import FavoritesIcon from '../favorites/FavoritesIcon';

// Import Hooks
import useCart from '../hooks/useCart';
import useFavorites from '../hooks/useFavorites';

import '../../assets/css/shop.css';

const ShopPage = () => {
  // Cart aur Favorites hooks
  const { 
    cartItems, 
    addToCart, 
    updateQuantity, 
    removeItem, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();
  
  const { 
    favoriteItems, 
    toggleFavorite, 
    removeFavorite, 
    isFavorite, 
    getTotalFavorites 
  } = useFavorites();

  // Products state
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(12);
  
  // Sidebar state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products?limit=100');
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
      
      const uniqueCategories = [...new Set(data.products.map(p => p.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setItemsToShow(12);
  }, [selectedCategory, priceRange, searchQuery, products]);

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, itemsToShow));
  }, [filteredProducts, itemsToShow]);

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 12);
  };

  const showNotification = (message, className) => {
    const notification = document.createElement('div');
    notification.className = className;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification('✓ Added to cart!', 'cart-notification');
  };

  const handleToggleFavorite = (product) => {
    const wasFavorite = isFavorite(product.id);
    toggleFavorite(product);
    
    if (wasFavorite) {
      showNotification('Removed from favorites', 'cart-notification');
    } else {
      showNotification('❤️ Added to favorites!', 'cart-notification favorite-notification');
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 2000]);
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring-animated"></div>
          </div>
          <p className="loading-text">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      {/* ✅ Header with Cart & Favorites Icons */}
      <header className="shop-header">
        <div className="shop-header-content">
          <div className="shop-header-title">
            <h1>Our Shop</h1>
            <p>Discover amazing products</p>
          </div>
          
          <div className="header-actions">
            {/* Favorites Icon - Reusable Component */}
            <FavoritesIcon 
              totalFavorites={getTotalFavorites()} 
              onClick={() => setIsFavoritesOpen(true)} 
            />

            {/* Cart Icon - Reusable Component */}
            <CartIcon 
              totalItems={getTotalItems()} 
              onClick={() => setIsCartOpen(true)} 
            />
          </div>
        </div>
      </header>

      {/* Favorites Sidebar */}
      <FavoritesSidebar
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteItems={favoriteItems}
        onRemoveFavorite={removeFavorite}
      />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        totalPrice={getTotalPrice()}
      />

      <div className="shop-content">
        <div className="shop-grid">
          <div>
            <FilterSection
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div>
            <div className="results-info">
              <p className="text-gray-700">
                Showing <span className="text-purple-600 font-bold">{displayedProducts.length}</span> of{' '}
                <span className="text-blue-600 font-bold">{filteredProducts.length}</span> products
              </p>
              {(selectedCategory !== 'all' || searchQuery || priceRange[0] > 0 || priceRange[1] < 2000) && (
                <button onClick={handleClearFilters} className="clear-filters-link">
                  Clear filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-icon">
                  <span className="text-6xl">🔍</span>
                </div>
                <p className="no-products-text">No products found</p>
                <p className="no-products-subtext">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="products-grid">
                  {displayedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorite={isFavorite(product.id)}
                    />
                  ))}
                </div>

                {displayedProducts.length < filteredProducts.length && (
                  <div className="load-more-container">
                    <button onClick={handleLoadMore} className="load-more-btn">
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;