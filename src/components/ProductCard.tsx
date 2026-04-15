'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from './CartProvider'

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="card overflow-hidden hover:shadow-md transition-shadow">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-primary-600 font-medium">
              {product.category.name}
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="btn-primary text-sm px-3 py-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}