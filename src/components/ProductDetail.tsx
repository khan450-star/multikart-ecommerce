'use client'

import Image from 'next/image'
import { useCart } from './CartProvider'
import { useState } from 'react'

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = async () => {
    setIsAdding(true);
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl
      });
    }
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/2">
        <div className="aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
      
      <div className="lg:w-1/2">
        <div className="mb-4">
          <span className="text-sm text-primary-600 font-medium">
            {product.category.name}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {product.name}
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              -
            </button>
            <span className="w-16 text-center text-lg font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full btn-primary py-3 disabled:opacity-50"
          >
            {isAdding ? 'Adding to Cart...' : `Add ${quantity} to Cart`}
          </button>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H19a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-gray-500">On orders over $50</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Secure Payment</p>
              <p className="text-xs text-gray-500">SSL encrypted</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-gray-500">30-day policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}