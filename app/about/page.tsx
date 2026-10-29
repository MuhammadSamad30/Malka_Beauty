'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Sparkles, 
  Leaf, 
  Award, 
  Heart, 
  Users, 
  Shield, 
  Star,
  Clock,
  Gift,
  Truck
} from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: 'Thoughtful hair care',
      description: 'Explore oils, serums, mists and treatments for your routine.'
    },
    {
      icon: Award,
      title: 'Clear product details',
      description: 'Compare product descriptions and prices before you choose.'
    },
    {
      icon: Heart,
      title: 'Save your favorites',
      description: 'Keep the products you like in your wishlist for later.'
    },
    {
      icon: Users,
      title: 'Easy shopping',
      description: 'Search and filter the collection to find what you need.'
    },
    {
      icon: Shield,
      title: 'Direct assistance',
      description: 'Ask product and order questions through WhatsApp.'
    },
    {
      icon: Star,
      title: 'Delivery across Pakistan',
      description: 'Place an order from anywhere in Pakistan.'
    }
  ];

  const milestones = [
    {
      year: '01',
      title: 'Explore',
      description: 'Browse the collection and find a product that fits your routine.'
    },
    {
      year: '02',
      title: 'Choose',
      description: 'Read product details, compare prices and save favorites.'
    },
    {
      year: '03',
      title: 'Order',
      description: 'Send your order directly to our team through WhatsApp.'
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'Product discovery',
      description: 'Search the range and filter products by category.'
    },
    {
      icon: Clock,
      title: 'Saved favorites',
      description: 'Keep your shortlist in one place with the wishlist.'
    },
    {
      icon: Gift,
      title: 'Easy checkout',
      description: 'Review your bag and share order details through WhatsApp.'
    },
    {
      icon: Truck,
      title: 'Here to help',
      description: 'Contact the Malka Beauty team whenever you need assistance.'
    }
  ];

  return (
    <main>
      {/* Page Header */}
      <section className="border-b border-[#30231e]/10 bg-[#eee4d8] pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-left"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">A little more about us</p>
            <h1 className="mb-3 font-poppins text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
              Care that feels <span className="text-gold-dark">like you</span>
            </h1>
            <p className="max-w-2xl text-gray-600">
              Get to know the thought and care behind the Malka Beauty collection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center space-x-2 text-gold font-medium">
                <Sparkles size={20} />
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl font-poppins font-bold">
                Redefining Hair Care <br />
                <span className="text-gold">With Luxury &amp; Purpose</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">Malka Beauty brings together hair oils, serums, mists and treatments in one easy-to-browse collection. We want it to feel simple to find a product, learn what it does and decide whether it belongs in your routine.</p>
              <p className="text-gray-600 leading-relaxed">Choose what you need, save favorites for later and place your order directly through WhatsApp. If you have a question along the way, our contact page makes it easy to reach us.</p>
              <div className="flex items-center space-x-4 pt-4">
                <div className="bg-gold/10 px-4 py-2 rounded-full">
                  <span className="font-semibold text-gold">22+</span>
                  <span className="text-sm text-gray-600 ml-1">Products</span>
                </div>
                <div className="bg-gold/10 px-4 py-2 rounded-full">
                  <span className="font-semibold text-gold">PKR</span>
                  <span className="text-sm text-gray-600 ml-1">pricing</span>
                </div>
                <div className="bg-gold/10 px-4 py-2 rounded-full">
                  <span className="font-semibold text-gold">WhatsApp</span>
                  <span className="text-sm text-gray-600 ml-1">orders</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl"></div>
              <div className="relative w-full h-full overflow-hidden rounded-[2rem] bg-[#eee4d8] shadow-xl flex items-center justify-center p-8">
                  <Image src="/AboutPage.png" alt="Malka Beauty hair oil collection" fill sizes="(max-width: 1024px) 100vw, 50vw" className="z-10 rounded-2xl object-cover" />
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">👑</div>
                    <h3 className="text-3xl font-poppins font-bold">Malka</h3>
                    <p className="text-sm opacity-90 mt-2">Beauty &amp; Hair Oil</p>
                    <p className="text-xs opacity-75 mt-4">Luxury Since 2024</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Our <span className="text-gold">Values</span>
            </h2>
            <p className="text-gray-600">
              The principles that guide everything we do at Malka Beauty
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="text-gold" size={24} />
                </div>
                <h3 className="font-poppins font-semibold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Why Choose <span className="text-gold">Malka</span>
            </h2>
            <p className="text-gray-600">
              Experience the difference that premium quality and care makes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-gold" size={28} />
                </div>
                <h3 className="font-poppins font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="section-padding bg-gold/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Our <span className="text-gold">Journey</span>
            </h2>
            <p className="text-gray-600">
              Milestones that have shaped our path to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.4 }}
                className="relative text-center"
              >
                <div className="text-4xl font-poppins font-bold text-gold mb-2">
                  {milestone.year}
                </div>
                <div className="h-1 w-12 bg-gold mx-auto mb-4"></div>
                <h3 className="font-poppins font-semibold text-xl mb-2">
                  {milestone.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </main>
  );
}
