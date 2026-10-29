'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import config from '@/lib/config';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ id, title, description, price, discountPrice, category, image, viewMode = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const { addToCart, updateQuantity, isInCart, getItemQuantity } = useCart();
  const inCart = isInCart(id);
  const itemQuantity = getItemQuantity(id);
  const finalPrice = discountPrice || price;
  const hasDiscount = Boolean(discountPrice && discountPrice < price);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('malka_wishlist') || '[]') as number[];
      setIsWishlisted(saved.includes(id));
    } catch { setIsWishlisted(false); }
  }, [id]);

  // When the product is already in the bag, this selector represents its
  // total quantity. Keep it in sync with edits made in the cart drawer/page.
  useEffect(() => {
    setQuantity(inCart ? itemQuantity : 1);
  }, [inCart, itemQuantity]);

  useEffect(() => {
    if (!showQuickView) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setShowQuickView(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [showQuickView]);

  const toggleWishlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('malka_wishlist') || '[]') as number[];
      const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id];
      localStorage.setItem('malka_wishlist', JSON.stringify(next));
      setIsWishlisted(next.includes(id));
      window.dispatchEvent(new Event('malka-wishlist-change'));
    } catch { setIsWishlisted((current) => !current); }
  };

  const handleAddToCart = () => {
    if (inCart) {
      updateQuantity(id, quantity);
      return;
    }
    addToCart({ id, title, description, price, ...(discountPrice !== undefined && { discountPrice }), image }, quantity);
  };

  const productImage = <div className={`relative overflow-hidden bg-[#f1e9df] ${viewMode === 'list' ? 'aspect-square w-full sm:w-56 sm:flex-none' : 'aspect-[.92/1]'}`}>
    {!imgError ? <Image src={`/product-images/${image}`} alt={title} fill sizes={viewMode === 'list' ? '224px' : '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw'} className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" onError={() => setImgError(true)} /> : <div className="absolute inset-0 flex items-center justify-center px-5 text-center font-poppins text-xl text-[#a68b6e]">Malka Beauty</div>}
    <span className="absolute left-3 top-3 rounded-full bg-[#fbf9f4]/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.16em] text-[#69372e] backdrop-blur">{category}</span>
    {hasDiscount && <span className="absolute right-3 top-3 rounded-full bg-[#5e7352] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Save {Math.round(((price - finalPrice) / price) * 100)}%</span>}
    <button type="button" onClick={toggleWishlist} aria-label={isWishlisted ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`} aria-pressed={isWishlisted} className="absolute right-3 top-12 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:top-12">
      <Heart size={17} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'text-rose-600' : ''} />
    </button>
    <button type="button" onClick={() => setShowQuickView(true)} className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-gray-800 opacity-100 shadow-sm transition hover:bg-white hover:text-gold-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"><Eye size={15} /> Quick view</button>
  </div>;

  return <>
    <article className={`group overflow-hidden rounded-[1.35rem] border border-[#e9e1d7] bg-[#fffefa] transition-all duration-300 hover:-translate-y-1 hover:border-[#c7a394] hover:shadow-[0_22px_45px_-28px_rgba(56,42,24,.45)] ${viewMode === 'list' ? 'sm:flex' : ''}`}>
      {productImage}
      <div className={`flex flex-col ${viewMode === 'list' ? 'flex-1 justify-center p-5 sm:p-7' : 'p-4 sm:p-5'}`}>
        <Link href={`/products/${id}`} aria-label={`View ${title}`}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a45c49]">Malka Beauty · {category}</p>
          <h3 className="mt-2 line-clamp-1 font-poppins text-lg font-medium text-[#30231e] transition-colors group-hover:text-[#a45c49] sm:text-xl">{title}</h3>
          <p className={`mt-2 text-sm leading-6 text-gray-500 ${viewMode === 'list' ? 'line-clamp-3' : 'line-clamp-2'}`}>{description}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="font-poppins text-lg font-semibold text-[#2c2721]">{config.currencySymbol}{finalPrice.toLocaleString()}</span>
            {hasDiscount && <span className="text-sm text-gray-400 line-through">{config.currencySymbol}{price.toLocaleString()}</span>}
          </div>
        </Link>
      </div>
      <div className={`grid min-w-0 grid-cols-[5.8rem_minmax(0,1fr)] items-center gap-2 border-t border-[#eee7df] p-3 sm:px-4 ${viewMode === 'list' ? 'sm:w-64 sm:border-l sm:border-t-0 sm:p-5' : ''}`}>
        <div className="flex h-10 w-full items-center justify-between rounded-xl border border-gray-200 px-1">
          <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity" className="p-2 text-gray-500 hover:text-gray-900"><Minus size={14} /></button>
          <span className="min-w-6 text-center text-sm font-medium">{quantity}</span>
          <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity" className="p-2 text-gray-500 hover:text-gray-900"><Plus size={14} /></button>
        </div>
        <button type="button" onClick={handleAddToCart} className="inline-flex h-10 w-full min-w-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#69372e] px-2 text-xs font-semibold text-white transition hover:bg-[#a45c49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:gap-2 sm:px-3 sm:text-sm"><ShoppingBag size={15} className="shrink-0" /> <span>{inCart ? 'Update bag' : 'Add to bag'}</span></button>
      </div>
    </article>

    {showQuickView && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowQuickView(false); }}>
      <section role="dialog" aria-modal="true" aria-labelledby={`quick-view-${id}`} className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:grid-cols-2">
        <button type="button" onClick={() => setShowQuickView(false)} aria-label="Close quick view" className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow"><X size={19} /></button>
        <div className="relative aspect-square bg-[#f2ece3]">{!imgError && <Image src={`/product-images/${image}`} alt={title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" onError={() => setImgError(true)} />}</div>
        <div className="flex flex-col justify-center p-6 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#9a8266]">{category}</p><h2 id={`quick-view-${id}`} className="mt-3 font-poppins text-2xl font-semibold text-[#2c2721]">{title}</h2><p className="mt-4 text-sm leading-6 text-gray-600">{description}</p><div className="mt-5 flex items-center gap-3"><span className="font-poppins text-xl font-semibold">{config.currencySymbol}{finalPrice.toLocaleString()}</span>{hasDiscount && <span className="text-sm text-gray-400 line-through">{config.currencySymbol}{price.toLocaleString()}</span>}</div><div className="mt-7 flex gap-3"><button type="button" onClick={handleAddToCart} className="btn-primary inline-flex flex-1 items-center justify-center gap-2 !rounded-xl"><ShoppingBag size={17} /> {inCart ? 'Update bag' : 'Add to bag'}</button><Link href={`/products/${id}`} onClick={() => setShowQuickView(false)} className="inline-flex items-center rounded-xl border border-gray-200 px-4 text-sm font-semibold text-gray-700 hover:border-gold">Details</Link></div></div>
      </section>
    </div>}
  </>;
}
