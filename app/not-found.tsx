'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Decorative Element */}
          <div className="text-9xl mb-6">✨</div>
          
          <h1 className="text-6xl md:text-7xl font-poppins font-bold text-gold mb-4">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-poppins font-semibold mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Oops! The page you’re looking for doesn’t exist or has been moved. 
            Let’s get you back on track to discover our luxury hair care collection.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Home size={20} />
              <span>Go Home</span>
            </Link>
            <Link 
              href="/products" 
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>Shop Now</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline inline-flex items-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Quick Links</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link href="/about" className="text-gray-600 hover:text-gold transition-colors">
                About Us
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/products" className="text-gray-600 hover:text-gold transition-colors">
                Products
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/contact" className="text-gray-600 hover:text-gold transition-colors">
                Contact
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/cart" className="text-gray-600 hover:text-gold transition-colors">
                Cart
              </Link>
            </div>
          </div>

          {/* Decorative Bottom */}
          <div className="mt-12 flex items-center justify-center space-x-2 text-gold/30">
            <div className="w-2 h-2 bg-gold/30 rounded-full"></div>
            <div className="w-4 h-2 bg-gold/30 rounded-full"></div>
            <div className="w-8 h-2 bg-gold/30 rounded-full"></div>
            <div className="w-4 h-2 bg-gold/30 rounded-full"></div>
            <div className="w-2 h-2 bg-gold/30 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
