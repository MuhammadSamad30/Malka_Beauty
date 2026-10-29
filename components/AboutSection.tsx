'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Leaf, MessageCircle, Sparkles } from 'lucide-react';

const promises = [
  { icon: Leaf, title: 'A thoughtful routine', detail: 'Simple products, easy to make part of every day.' },
  { icon: Heart, title: 'Care that feels personal', detail: 'A collection made for the small moments of self-care.' },
  { icon: MessageCircle, title: 'Real help when you need it', detail: 'Talk to us directly for product and order questions.' },
];

export default function AboutSection() {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container-custom">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[.88/1] overflow-hidden rounded-[2rem] bg-[#2c241b] shadow-[0_25px_60px_-30px_rgba(35,26,16,.55)]">
              <Image src="/AboutPage.png" alt="Malka Beauty nourishing hair oil" fill sizes="(max-width: 1024px) 90vw, 42vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-[#e9e1d6] bg-white p-4 shadow-lg sm:-right-6 sm:p-5"><div className="text-[10px] font-semibold uppercase tracking-[.18em] text-gold-dark">The Malka approach</div><p className="mt-1 font-poppins text-sm font-semibold text-gray-900 sm:text-base">Make self-care feel simple</p></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-gold-dark"><Sparkles size={15} /> A softer kind of luxury</p>
            <h2 className="font-poppins text-3xl font-semibold leading-tight tracking-tight text-[#29251f] sm:text-4xl">Care for your hair.<br /><span className="text-gold-dark">A moment for yourself.</span></h2>
            <p className="mt-5 max-w-xl leading-7 text-gray-600">Good hair care does not have to be complicated. Malka Beauty brings together everyday oils and treatments that make it easier to give your hair a little more attention.</p>
            <div className="mt-7 space-y-4">
              {promises.map(({ icon: Icon, title, detail }) => <div key={title} className="flex items-start gap-3"><span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f3eee6] text-gold-dark"><Icon size={17} /></span><div><h3 className="text-sm font-semibold text-gray-900">{title}</h3><p className="mt-0.5 text-sm leading-5 text-gray-500">{detail}</p></div></div>)}
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#775738] transition hover:gap-3">Get to know Malka <ArrowRight size={17} /></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
