'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Product } from './products/page';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load featured products (first 8 products)
    const loadProducts = async () => {
      try {
        const response = await fetch('/data/Data.json');
        const data = await response.json();
        // Get first 8 products for featured section
        setFeaturedProducts(data.products.slice(0, 4));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <AboutSection />

      {/* Featured Products Section */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-10 max-w-3xl text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">Small rituals, beautiful results</p>
            <h2 className="mb-4 font-poppins text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
              Find your <span className="text-gold-dark">new favorite</span>
            </h2>
            <p className="mx-auto max-w-xl leading-relaxed text-gray-600">
              Browse the everyday essentials our customers reach for again and again.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => <ProductCard key={product.id} {...product} />)}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/products" className="btn-primary inline-flex items-center space-x-2">
              <span>View All Products</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              Contact <span className="text-gold">Us</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Have questions? We’re here to help. Reach out to us and we’ll respond 
              as quickly as possible.
            </p>
          </motion.div>

          <ContactForm />
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </main>
  );
}
