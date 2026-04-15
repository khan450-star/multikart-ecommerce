import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/components/AuthProvider'
import { CartProvider } from '@/components/CartProvider'
import { ApolloWrapper } from '@/components/ApolloWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Multikart E-commerce',
  description: 'Modern e-commerce platform with Next.js and GraphQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
            </CartProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}