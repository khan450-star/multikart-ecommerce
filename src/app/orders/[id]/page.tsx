import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: {
      id: params.id
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/orders" className="text-primary-600 hover:text-primary-700 font-medium">
          ← Back to Orders
        </Link>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="border-b pb-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order #{order.id.slice(-8)}</h1>
              <p className="text-gray-500 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.product.name}</h3>
                  <p className="text-gray-500">{item.product.description}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                    <span className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <div className="flex justify-end">
            <div className="text-right space-y-1">
              <div className="flex justify-between w-48">
                <span>Subtotal:</span>
                <span>${(order.total / 1.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-48">
                <span>Tax:</span>
                <span>${(order.total * 0.1 / 1.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-48">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between w-48 font-semibold text-lg border-t pt-1">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}