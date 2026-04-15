import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
    },
  })

  const clothing = await prisma.category.upsert({
    where: { name: 'Clothing' },
    update: {},
    create: {
      name: 'Clothing',
    },
  })

  const home = await prisma.category.upsert({
    where: { name: 'Home & Garden' },
    update: {},
    create: {
      name: 'Home & Garden',
    },
  })

  // Create products with real image URLs
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      image: 'https://picsum.photos/seed/headphones/600/600',
      categoryId: electronics.id,
    },
    {
      name: 'Smartphone',
      description: 'Latest model smartphone with advanced features',
      price: 699.99,
      image: 'https://picsum.photos/seed/smartphone/600/600',
      categoryId: electronics.id,
    },
    {
      name: 'Laptop Computer',
      description: 'Powerful laptop for work and gaming',
      price: 1299.99,
      image: 'https://picsum.photos/seed/laptop/600/600',
      categoryId: electronics.id,
    },
    {
      name: 'Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt in various colors',
      price: 29.99,
      image: 'https://picsum.photos/seed/tshirt/600/600',
      categoryId: clothing.id,
    },
    {
      name: 'Denim Jeans',
      description: 'Classic denim jeans with perfect fit',
      price: 79.99,
      image: 'https://picsum.photos/seed/jeans/600/600',
      categoryId: clothing.id,
    },
    {
      name: 'Running Shoes',
      description: 'Lightweight running shoes for athletes',
      price: 149.99,
      image: 'https://picsum.photos/seed/shoes/600/600',
      categoryId: clothing.id,
    },
    {
      name: 'Garden Plant Pot',
      description: 'Decorative ceramic plant pot for your garden',
      price: 39.99,
      image: 'https://picsum.photos/seed/plantpot/600/600',
      categoryId: home.id,
    },
    {
      name: 'LED Table Lamp',
      description: 'Modern LED table lamp with adjustable brightness',
      price: 89.99,
      image: 'https://picsum.photos/seed/lamp/600/600',
      categoryId: home.id,
    },
    {
      name: 'Throw Pillow',
      description: 'Soft decorative throw pillow for your sofa',
      price: 24.99,
      image: 'https://picsum.photos/seed/pillow/600/600',
      categoryId: home.id,
    },
    {
      name: 'Coffee Maker',
      description: 'Automatic coffee maker with programmable timer',
      price: 159.99,
      image: 'https://picsum.photos/seed/coffee/600/600',
      categoryId: home.id,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: product,
    })
  }

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 12)
  await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  })

  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })