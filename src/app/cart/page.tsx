'use client'

import { useCart } from '@/components/CartProvider'
import CartItem from '@/components/CartItem'
import Link from 'next/link'

export default function CartPage() {
  const { items, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <p className="text-gray-500 mb-8">Your cart is empty.</p>
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium">Cart Items ({items.length})</h2>
            </div>
            <div className="divide-y">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/checkout" className="w-full btn-primary block text-center">
                Proceed to Checkout
              </Link>
              <button 
                onClick={clearCart}
                className="w-full btn-secondary"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}