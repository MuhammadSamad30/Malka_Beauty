'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';
import { useTheme, type ThemePreference } from '@/context/ThemeContext';

const links = [{ href: '/', label: 'Home' }, { href: '/products', label: 'Shop all' }, { href: '/about', label: 'Our story' }, { href: '/contact', label: 'Contact' }];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  useEffect(() => {
    const update = () => { try { setWishlistCount((JSON.parse(localStorage.getItem('malka_wishlist') || '[]') as number[]).length); } catch { setWishlistCount(0); } };
    update(); window.addEventListener('malka-wishlist-change', update); window.addEventListener('storage', update);
    return () => { window.removeEventListener('malka-wishlist-change', update); window.removeEventListener('storage', update); };
  }, []);
  const active = (href: string) => pathname === href || (href === '/products' && pathname.startsWith('/products'));

  return <>
    <header className="sticky top-0 z-50 border-b border-[#30231e]/10 bg-[#fbf9f4]/95 backdrop-blur-md">
      <div className="container-custom flex h-[76px] items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Malka Beauty home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#69372e] font-poppins text-xl italic text-[#f5e9dc]">m</span>
          <span><span className="block font-poppins text-lg font-semibold leading-none tracking-[-.04em] text-[#30231e]">malka<span className="font-normal"> beauty</span></span><span className="mt-1 block text-[8px] font-semibold uppercase tracking-[.24em] text-[#9a7160]">Care, made personal</span></span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined} className={`relative py-2 text-[13px] transition-colors ${active(href) ? 'font-semibold text-[#69372e]' : 'text-[#645852] hover:text-[#a45c49]'}`}>{label}{active(href) && <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#a45c49]" />}</Link>)}
        </nav>
        <div className="flex items-center gap-1.5">
          <select aria-label="Color theme" value={theme} onChange={(event) => setTheme(event.target.value as ThemePreference)} className="hidden h-9 rounded-full border border-[#e9e1d7] bg-[#fffefa] px-3 text-xs text-[#30231e] sm:block">
            <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
          </select>
          <Link href="/wishlist" aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} saved` : ''}`} className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#30231e] transition hover:bg-[#f1e9df] hover:text-[#a45c49]"><Heart size={19} />{wishlistCount > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#a45c49] px-1 text-[9px] font-bold text-white">{wishlistCount}</span>}</Link>
          <button type="button" onClick={() => setIsCartOpen(true)} aria-label={`Open bag${getTotalItems() ? `, ${getTotalItems()} items` : ''}`} className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#30231e] transition hover:bg-[#f1e9df] hover:text-[#a45c49]"><ShoppingBag size={19} />{getTotalItems() > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#69372e] px-1 text-[9px] font-bold text-white">{getTotalItems()}</span>}</button>
          <button type="button" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} className="flex h-10 w-10 items-center justify-center rounded-full text-[#30231e] md:hidden">{isOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      <AnimatePresence>{isOpen && <motion.nav aria-label="Mobile navigation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-[#30231e]/10 bg-[#fbf9f4] md:hidden"><div className="container-custom space-y-1 py-4">{links.map(({ href, label }) => <Link key={href} href={href} className={`block rounded-xl px-4 py-3 text-sm ${active(href) ? 'bg-[#f1e9df] font-semibold text-[#69372e]' : 'text-[#645852]'}`}>{label}</Link>)}<Link href="/wishlist" className="flex items-center gap-2 px-4 py-3 text-sm text-[#645852]"><Heart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</Link><label className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-[#645852] sm:hidden"><span>Theme</span><select aria-label="Color theme" value={theme} onChange={(event) => setTheme(event.target.value as ThemePreference)} className="rounded-full border border-[#e9e1d7] bg-[#fffefa] px-3 py-2 text-xs text-[#30231e]"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label></div></motion.nav>}</AnimatePresence>
    </header>
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
  </>;
}
