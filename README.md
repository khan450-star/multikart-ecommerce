# Multikart E-commerce

A modern e-commerce platform built with Next.js 14, GraphQL, and Stripe.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

- Product catalog with categories
- Shopping cart functionality
- User authentication
- Order management
- Stripe payment integration
- GraphQL API

## Tech Stack

- Next.js 14 with App Router
- React 18
- TypeScript
- Prisma with SQLite
- NextAuth.js
- Tailwind CSS
- GraphQL
- Stripe

## API Routes

- `/api/auth/*` - Authentication
- `/api/products` - Product management
- `/api/cart` - Cart operations
- `/api/orders` - Order management
- `/api/graphql` - GraphQL endpoint
- `/api/stripe/*` - Payment processing