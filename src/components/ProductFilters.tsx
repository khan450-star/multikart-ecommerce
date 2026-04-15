'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFiltersProps {
  categories: Category[];
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);
  
  const updateFilters = (search: string, category: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    
    router.push(`/products?${params.toString()}`);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(searchQuery, selectedCategory);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters(searchQuery, category);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    router.push('/products');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Search Products</h3>
        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Search
          </button>
        </form>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange('')}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === '' 
                ? 'bg-primary-100 text-primary-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.slug)}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category.slug 
                  ? 'bg-primary-100 text-primary-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {(searchQuery || selectedCategory) && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Active Filters</h3>
          <div className="space-y-2">
            {searchQuery && (
              <div className="flex items-center justify-between bg-primary-50 px-3 py-2 rounded-md">
                <span className="text-sm">Search: "{searchQuery}"</span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    updateFilters('', selectedCategory);
                  }}
                  className="text-primary-600 hover:text-primary-700"
                >
                  ✕
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="flex items-center justify-between bg-primary-50 px-3 py-2 rounded-md">
                <span className="text-sm">
                  Category: {categories.find(c => c.slug === selectedCategory)?.name}
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    updateFilters(searchQuery, '');
                  }}
                  className="text-primary-600 hover:text-primary-700"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="w-full mt-3 btn-secondary"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}