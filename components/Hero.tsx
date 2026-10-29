'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f1e9df]">
      <div className="container-custom grid min-h-[670px] items-center gap-10 py-12 md:py-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-4">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="relative z-10 max-w-xl py-5 lg:py-0">
          <p className="mb-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.24em] text-[#8b5746]"><Sparkles size={14} /> Hair rituals, made with care</p>
          <h1 className="font-poppins text-[3.2rem] font-medium leading-[1.02] tracking-[-.06em] text-[#30231e] sm:text-7xl lg:text-[5.35rem]">Good hair<br />is a <em className="font-normal text-[#a45c49]">feeling.</em></h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[#71655e] sm:text-lg">Make a little room for yourself. Thoughtful oils and treatments turn everyday care into something to look forward to.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/products" className="inline-flex items-center gap-3 rounded-full bg-[#30231e] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#69372e]">Shop the collection <ArrowUpRight size={17} /></Link>
            <Link href="/about" className="text-sm font-semibold text-[#69372e] underline decoration-[#c7a394] underline-offset-4 hover:decoration-[#69372e]">Our story</Link>
          </div>
          <div className="mt-12 flex items-center gap-4 border-t border-[#30231e]/15 pt-5 text-xs font-medium uppercase tracking-[.14em] text-[#786c64]"><span>Rooted in care</span><span className="h-1 w-1 rounded-full bg-[#a45c49]" /><span>Made for every day</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12 }} className="relative mx-auto w-full max-w-[680px] lg:-mr-10">
          <div className="relative aspect-[.95/1] overflow-hidden rounded-t-[48%] rounded-b-[2rem] bg-[#d5c2ac] shadow-[0_35px_80px_-45px_rgba(48,35,30,.45)] sm:aspect-[1.06/1]">
            <Image src="/HomePage.png" alt="Malka Beauty hair care collection" fill priority sizes="(max-width: 1024px) 90vw, 56vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#30231e]/35 via-transparent to-white/10" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white sm:bottom-9 sm:left-9 sm:right-9"><div><p className="text-[10px] uppercase tracking-[.25em] text-white/75">Your daily ritual</p><p className="mt-1 font-poppins text-xl sm:text-2xl">A softer kind of care</p></div><span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60"><ArrowDown size={18} /></span></div>
          </div>
          <div className="absolute -left-2 top-12 hidden max-w-[170px] rotate-[-5deg] bg-[#fbf9f4] px-5 py-4 shadow-lg sm:block lg:-left-8"><p className="font-poppins text-lg italic text-[#69372e]">A moment, just for you.</p><p className="mt-2 text-[9px] uppercase tracking-[.2em] text-[#8b7b70]">Malka Beauty</p></div>
        </motion.div>
      </div>
      <div className="h-2 bg-[#a45c49]" />
    </section>
  );
}
