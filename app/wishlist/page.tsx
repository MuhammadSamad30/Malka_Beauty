'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Product } from '@/app/products/page';

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadWishlist = async () => {
      setLoaded(false);
      try {
        const saved = JSON.parse(localStorage.getItem('malka_wishlist') || '[]') as number[];
        const response = await fetch('/data/Data.json');
        const data = await response.json();
        if (mounted) setProducts(data.products.filter((product: Product) => saved.includes(product.id)));
      } catch (error) {
        console.error('Unable to load wishlist:', error);
      } finally {
        if (mounted) setLoaded(true);
      }
    };
    const refreshWishlist = () => { void loadWishlist(); };
    loadWishlist();
    window.addEventListener('malka-wishlist-change', refreshWishlist);
    return () => { mounted = false; window.removeEventListener('malka-wishlist-change', refreshWishlist); };
  }, []);

  return <main className="min-h-screen bg-cream">
    <section className="border-b border-[#30231e]/10 bg-[#eee4d8] pb-10 pt-12 md:pb-14 md:pt-16">
      <div className="container-custom"><p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">Saved for later</p><h1 className="font-poppins text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">Your <span className="text-gold-dark">wishlist</span></h1><p className="mt-3 text-gray-600">Keep the products you love close by.</p></div>
    </section>
    <section className="section-padding pt-10"><div className="container-custom">
      {!loaded ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((key) => <div key={key} className="aspect-[.92/1] animate-pulse rounded-2xl bg-white" />)}</div>
        : products.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} {...product} />)}</div>
        : <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center"><Heart className="mx-auto mb-4 text-gold" size={34} /><h2 className="font-poppins text-xl font-semibold text-gray-800">Your wishlist is waiting</h2><p className="mt-2 text-sm text-gray-500">Tap the heart on any product to save it here.</p><Link href="/products" className="btn-primary mt-6 inline-flex">Explore products</Link></div>}
    </div></section><WhatsAppButton />
  </main>;
}
