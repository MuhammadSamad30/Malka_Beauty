'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream pt-20">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-poppins font-bold">
            <span className="text-gold">Malka</span>
            <span className="text-black"> Beauty</span>
          </h2>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-16 h-16 border-4 border-gold/20 rounded-full"></div>
            
            {/* Inner Spinner */}
            <motion.div
              className="absolute top-0 left-0 w-16 h-16 border-4 border-gold rounded-full"
              style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <p className="text-gray-500 text-sm font-medium">
            Loading your luxury experience...
          </p>

          {/* Decorative Dots */}
          <div className="flex space-x-2">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-gold rounded-full"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
              className="w-2 h-2 bg-gold rounded-full"
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
              className="w-2 h-2 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
}