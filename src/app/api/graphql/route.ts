import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const typeDefs = `
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    imageUrl: String!
    category: Category!
    createdAt: String!
  }
  
  type Category {
    id: ID!
    name: String!
    slug: String!
    products: [Product!]!
  }
  
  type Query {
    products(limit: Int, offset: Int, category: String, search: String): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
  }
`;

const resolvers = {
  Query: {
    products: async (_: any, { limit = 20, offset = 0, category, search }: any) => {
      return await prisma.product.findMany({
        where: {
          ...(category && { category: { slug: category } }),
          ...(search && {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } }
            ]
          })
        },
        include: {
          category: true
        },
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc'
        }
      });
    },
    product: async (_: any, { id }: any) => {
      return await prisma.product.findUnique({
        where: { id },
        include: { category: true }
      });
    },
    categories: async () => {
      return await prisma.category.findMany({
        include: { products: true }
      });
    }
  }
};

export async function POST(request: Request) {
  try {
    const { query, variables } = await request.json();
    
    // Simple GraphQL query parser for demo purposes
    if (query.includes('products')) {
      const products = await resolvers.Query.products(null, variables || {});
      return NextResponse.json({ data: { products } });
    }
    
    if (query.includes('categories')) {
      const categories = await resolvers.Query.categories();
      return NextResponse.json({ data: { categories } });
    }
    
    return NextResponse.json({ error: 'Query not supported' }, { status: 400 });
  } catch (error) {
    console.error('GraphQL error:', error);
    return NextResponse.json({ error: 'GraphQL execution failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'GraphQL endpoint - use POST with query and variables',
    schema: typeDefs
  });
}