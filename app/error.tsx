'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Error Icon */}
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-500" size={48} />
          </div>

          <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
            Something Went <span className="text-red-500">Wrong</span>
          </h1>
          
          <p className="text-gray-600 text-lg mb-2 leading-relaxed">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
          
          <p className="text-sm text-gray-400 mb-8">
            Error: {error.message || 'Unknown error'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <RefreshCw size={20} />
              <span>Try Again</span>
            </button>
            <Link 
              href="/" 
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <Home size={20} />
              <span>Go Home</span>
            </Link>
            <Link 
              href="/products" 
              className="btn-outline inline-flex items-center space-x-2"
            >
              <ShoppingBag size={20} />
              <span>Shop Now</span>
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <Link href="/contact" className="text-gold hover:text-gold-dark transition-colors font-medium">
                Contact our support team
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}