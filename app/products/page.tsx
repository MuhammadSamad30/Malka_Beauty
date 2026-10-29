'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import WhatsAppButton from '@/components/WhatsAppButton';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
}

export default function ProductsPage() {
  return <Suspense fallback={<main className="min-h-screen bg-cream pt-12"><div className="container-custom animate-pulse text-sm text-gray-500">Loading collection...</div></main>}><ProductsPageContent /></Suspense>;
}

function ProductsPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/data/Data.json');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products by category if param exists
  return (
    <main className="min-h-screen bg-cream">
      {/* Page Header */}
      <section className="border-b border-[#30231e]/10 bg-[#eee4d8] pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">Thoughtful care, every day</p>
            <h1 className="mb-3 font-poppins text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
              Find your <span className="text-gold-dark">hair ritual</span>
            </h1>
            <p className="max-w-xl text-gray-600">
              {categoryParam 
                ? `Explore our ${categoryParam.toLowerCase()} collection, made to bring a little more care to your routine.` 
                : 'Explore nourishing oils, serums and treatments made to bring a little more care to your routine.'}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-gray-600 sm:text-sm"><span>Carefully selected ingredients</span><span>Secure WhatsApp ordering</span><span>Delivery across Pakistan</span></div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
        <section className="section-padding pt-8 md:pt-10">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={products} initialCategory={categoryParam} />
          )}
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </main>
  );
}
