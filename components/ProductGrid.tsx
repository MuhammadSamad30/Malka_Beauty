'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, X, ArrowUpDown } from 'lucide-react';
import ProductCard from './ProductCard';
import type { Product } from '@/app/products/page';

interface ProductGridProps {
  products: Product[];
  initialCategory?: string | null;
}

export default function ProductGrid({ products, initialCategory }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => { setSelectedCategory(initialCategory || 'All'); }, [initialCategory]);

  const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category))], [products]);
  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products
      .filter((product) => {
        const matchesSearch = !query || [product.title, product.description, product.category]
          .some((value) => value.toLowerCase().includes(query));
        return matchesSearch && (selectedCategory === 'All' || product.category === selectedCategory);
      })
      .sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        if (sortBy === 'discount') return (b.price - (b.discountPrice || b.price)) - (a.price - (a.discountPrice || a.price));
        return a.id - b.id;
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  const clearFilters = () => { setSearchTerm(''); setSelectedCategory('All'); setSortBy('featured'); };
  const hasFilters = Boolean(searchTerm || selectedCategory !== 'All');

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} />
            <input type="search" placeholder="Search oils, serums, ingredients..." value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="input-luxury !rounded-xl !border-gray-200 !py-3 !pl-11" />
          </label>
          <div className="flex items-center gap-2">
            <label className="relative flex min-w-0 flex-1 items-center sm:flex-none">
              <ArrowUpDown size={16} className="pointer-events-none absolute left-3 text-gray-500" />
              <span className="sr-only">Sort products</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-8 text-sm font-medium text-gray-700 outline-none focus:border-gold sm:w-48">
                <option value="featured">Featured</option><option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option><option value="discount">Biggest savings</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
            <button type="button" onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm font-medium text-gray-700 hover:border-gold md:hidden" aria-expanded={isFilterOpen}>
              <Filter size={17} /> Filter{selectedCategory !== 'All' && <span className="h-2 w-2 rounded-full bg-gold" />}
            </button>
            <div className="hidden items-center gap-1 rounded-xl bg-gray-100 p-1 sm:flex">
              <button type="button" onClick={() => setViewMode('grid')} className={`rounded-lg p-2 ${viewMode === 'grid' ? 'bg-white text-gold shadow-sm' : 'text-gray-500'}`} aria-label="Grid view"><Grid size={18} /></button>
              <button type="button" onClick={() => setViewMode('list')} className={`rounded-lg p-2 ${viewMode === 'list' ? 'bg-white text-gold shadow-sm' : 'text-gray-500'}`} aria-label="List view"><List size={18} /></button>
            </div>
          </div>
        </div>

        <div className="mt-4 hidden flex-wrap gap-2 md:flex">
          {categories.map((category) => <button key={category} type="button" onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedCategory === category ? 'bg-black text-white' : 'bg-gray-50 text-gray-600 hover:bg-gold/10 hover:text-gold-dark'}`}>
            {category}{category === 'All' ? ` (${products.length})` : ` (${products.filter((item) => item.category === category).length})`}
          </button>)}
        </div>
        <AnimatePresence>
          {isFilterOpen && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden md:hidden">
            <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">{categories.map((category) => <button key={category} type="button" onClick={() => { setSelectedCategory(category); setIsFilterOpen(false); }} className={`rounded-full px-3 py-2 text-sm font-medium ${selectedCategory === category ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>{category}</button>)}</div>
          </motion.div>}
        </AnimatePresence>
      </div>

      <div className="flex min-h-6 items-center justify-between text-sm text-gray-500">
        <p>Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> of {products.length} products{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}</p>
        {hasFilters && <button type="button" onClick={clearFilters} className="inline-flex items-center gap-1 font-medium text-gold-dark hover:text-black"><X size={15} /> Clear filters</button>}
      </div>

      {filteredProducts.length === 0 ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
        <Search className="mx-auto mb-4 text-gold" size={34} /><h3 className="font-poppins text-xl font-semibold text-gray-800">No products found</h3>
        <p className="mt-2 text-sm text-gray-500">Try another search or choose a different category.</p>
        <button type="button" onClick={clearFilters} className="btn-primary mt-6">Show all products</button>
      </div> : <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-4'}>
        <AnimatePresence mode="wait">{filteredProducts.map((product, index) => <motion.div key={product.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ delay: Math.min(index * 0.035, 0.2) }} className={viewMode === 'list' ? 'col-span-full' : ''}><ProductCard {...product} viewMode={viewMode} /></motion.div>)}</AnimatePresence>
      </div>}
    </div>
  );
}
