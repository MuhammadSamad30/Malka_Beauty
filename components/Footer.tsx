'use client';

import Link from 'next/link';
import { ArrowUpRight, Mail, MessageCircle, Phone } from 'lucide-react';
import config from '@/lib/config';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import type { IconType } from 'react-icons';

export default function Footer() {
  const year = new Date().getFullYear();
  const socials: { url: string; Icon: IconType; label: string }[] = [
    { url: config.socialLinks.instagram, Icon: FaInstagram, label: 'Instagram' },
    { url: config.socialLinks.facebook, Icon: FaFacebook, label: 'Facebook' },
    { url: config.socialLinks.youtube, Icon: FaYoutube, label: 'YouTube' },
  ];
  return <footer className="bg-[#30231e] text-[#f8f5ef]">
    <div className="container-custom py-14 md:py-20">
      <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-[1.4fr_.8fr_.8fr_1fr] md:gap-8">
        <div className="max-w-sm"><Link href="/" className="font-poppins text-3xl tracking-[-.05em]">malka <span className="font-normal text-[#d9a58f]">beauty</span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-white/60">Small rituals. Thoughtful hair care. A little time set aside just for you.</p><div className="mt-6 flex gap-3">{socials.map(({ url, Icon, label }) => <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[#d9a58f] hover:text-[#d9a58f]"><Icon size={17} /></a>)}</div></div>
        <div><p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em] text-[#d9a58f]">Explore</p><ul className="space-y-3 text-sm text-white/65">{[['/products', 'Shop all'], ['/about', 'Our story'], ['/wishlist', 'Wishlist'], ['/contact', 'Contact']].map(([href, label]) => <li key={href}><Link className="transition hover:text-white" href={href}>{label}</Link></li>)}</ul></div>
        <div><p className="mb-5 text-[10px] font-semibold uppercase tracking-[.2em] text-[#d9a58f]">Get in touch</p><ul className="space-y-4 text-sm text-white/65"><li className="flex gap-3"><Phone size={16} className="shrink-0 text-[#d9a58f]" />{config.businessPhone}</li><li className="flex gap-3"><Mail size={16} className="shrink-0 text-[#d9a58f]" /><a href={`mailto:${config.businessEmail}`} className="hover:text-white">{config.businessEmail}</a></li></ul></div>
        <div className="rounded-2xl bg-white/[.06] p-5"><p className="font-poppins text-xl">Need a hand?</p><p className="mt-2 text-sm leading-6 text-white/60">We&apos;re happy to help you choose your next ritual.</p><a href={`https://wa.me/${config.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#e3b6a4] hover:text-white"><MessageCircle size={16} /> Chat on WhatsApp <ArrowUpRight size={15} /></a></div>
      </div>
      <div className="flex flex-col gap-3 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"><p>© {year} {config.storeName}. Made with care.</p><p>Thoughtful care, delivered across Pakistan.</p></div>
    </div>
  </footer>;
}
