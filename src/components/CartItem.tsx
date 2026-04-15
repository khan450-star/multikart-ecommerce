'use client'

import { useCart } from './CartProvider'
import Image from 'next/image'

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-6">
      <div className="w-20 h-20 flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-500">${item.price.toFixed(2)} each</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          -
        </button>
        <span className="w-12 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
        >
          +
        </button>
      </div>
      
      <div className="text-right">
        <p className="font-semibold text-lg">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  )
}