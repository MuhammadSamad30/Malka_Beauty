import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { config } from '@/lib/config';

export const metadata: Metadata = {
  title: {
    default: config.storeName,
    template: `%s | ${config.storeName}`,
  },
  description: config.metaDescription,
  keywords: config.metaKeywords,
  authors: [{ name: config.storeName }],
  openGraph: {
    title: config.storeName,
    description: config.metaDescription,
    type: 'website',
    locale: 'en_PK',
    siteName: config.storeName,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { const mode = localStorage.getItem('malka_theme') || 'system'; const dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.dataset.theme = dark ? 'dark' : 'light'; } catch { document.documentElement.dataset.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }` }} />
      </head>
      <body className="font-sans antialiased bg-cream">
        <ThemeProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <a href="#main-content" className="sr-only z-[100] rounded-lg bg-white p-3 text-gray-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
              <Navbar />
              <div id="main-content" className="flex-grow">{children}</div>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
