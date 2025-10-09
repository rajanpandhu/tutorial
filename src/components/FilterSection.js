import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

const FilterSection = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  priceRange, 
  onPriceChange, 
  searchQuery, 
  onSearchChange, 
  onClearFilters 
}) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="filter-container">
      <div className="filter-header">
        <div className="filter-header-content">
          <div className="filter-header-title">
            <Filter className="w-5 h-5" />
            <h2 className="filter-title">Filters</h2>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="filter-toggle">
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`filter-content ${isOpen ? 'open' : ''}`}>
        {/* Search Section */}
        <div className="filter-section">
          <label className="filter-label">Search Products</label>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search..."
              className="search-input"
            />
          </div>
        </div>

        {/* Category Section */}
        <div className="filter-section">
          <label className="filter-label">Category</label>
          <div className="category-buttons">
            <button
              onClick={() => onCategoryChange('all')}
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div className="filter-section">
          <label className="filter-label">Price Range</label>
          <div className="price-range-container">
            <div className="range-track">
              <div 
                className="range-active"
                style={{
                  left: `${(priceRange[0] / 2000) * 100}%`,
                  right: `${100 - (priceRange[1] / 2000) * 100}%`
                }}
              />
              
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value < priceRange[1]) {
                    onPriceChange([value, priceRange[1]]);
                  }
                }}
                className="range-input"
              />
              
              <input
                type="range"
                min="0"
                max="2000"
                value={priceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > priceRange[0]) {
                    onPriceChange([priceRange[0], value]);
                  }
                }}
                className="range-input"
              />
            </div>
            
            <div className="range-values">
              <div className="range-value range-value-min">${priceRange[0]}</div>
              <span className="range-separator">-</span>
              <div className="range-value range-value-max">${priceRange[1]}</div>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button onClick={onClearFilters} className="clear-filters-btn">
          <X className="w-4 h-4" />
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;