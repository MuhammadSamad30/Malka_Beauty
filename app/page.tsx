import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import catalog from '../public/data/Data.json';

export default function HomePage() {
  const featuredProducts = catalog.products.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#faf8f4]">
      <section className="container-custom pb-12 pt-5 sm:pb-16 sm:pt-8">
        <div className="mb-5 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <p className="mb-1 text-[9px] font-semibold uppercase tracking-[.22em] text-[#9a7160] sm:mb-2 sm:text-[11px]">
              Thoughtful care, every day
            </p>
            <h1 className="font-poppins text-2xl font-medium tracking-[-.04em] text-[#30231e] sm:text-4xl">
              Shop our <span className="italic text-[#a45c49]">favorites</span>
            </h1>
          </div>
          <p className="hidden pb-1 text-sm text-[#786c64] sm:block">Little rituals. Beautiful hair.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featuredProducts.map((product) => <ProductCard key={product.id} {...product} />)}
        </div>

        <div className="mt-7 flex justify-center sm:mt-10">
          <Link href="/products" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#69372e] px-6 py-3 text-sm font-semibold text-[#69372e] transition hover:bg-[#69372e] hover:text-white">
            View All Products
          </Link>
        </div>
      </section>
      <WhatsAppButton />
    </main>
  );
}
