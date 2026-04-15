import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/ProductDetail'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id
    },
    include: {
      category: true
    }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductDetail product={product} />
    </div>
  )
}