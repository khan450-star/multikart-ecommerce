'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useCart } from './CartProvider'

export default function Navbar() {
  const { data: session } = useSession();
  const { items } = useCart();
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Multikart
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary-600">
              Products
            </Link>
            
            <Link href="/cart" className="relative text-gray-700 hover:text-primary-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 7H3m4 6v6a1 1 0 001 1h8a1 1 0 001-1v-6" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/account" className="text-gray-700 hover:text-primary-600">
                  Account
                </Link>
                <Link href="/orders" className="text-gray-700 hover:text-primary-600">
                  Orders
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-primary-600"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="btn-primary"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}