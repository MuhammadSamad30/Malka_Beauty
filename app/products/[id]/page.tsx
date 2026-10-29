'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, 
  ChevronRight,
  Minus,
  Plus,
  X,
  Shield,
  Award,
  RefreshCw
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import WhatsAppButton from '@/components/WhatsAppButton';
import config from '@/lib/config';
import { Product } from '../page';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { items, addToCart, removeFromCart, updateQuantity } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [tempQuantity, setTempQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const productId = parseInt(params.id as string);
  const cartItem = items.find((item) => item.id === productId);
  const inCart = Boolean(cartItem);
  const itemQuantity = cartItem?.quantity ?? 0;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch('/data/Data.json');
        const data = await response.json();
        const foundProduct = data.products.find((p: Product) => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          router.push('/products');
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, router]);

  // Update temp quantity when cart quantity changes
  useEffect(() => {
    if (inCart) {
      setTempQuantity(itemQuantity);
    }
  }, [inCart, itemQuantity]);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-cream">
        <div className="container-custom py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  const finalPrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      ...(product.discountPrice !== undefined && { discountPrice: product.discountPrice }),
      image: product.image
    }, quantity);
    setQuantity(1);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  const handleUpdateCart = () => {
    setIsUpdating(true);
    updateQuantity(product.id, tempQuantity);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleTempQuantityChange = (change: number) => {
    const newQuantity = tempQuantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setTempQuantity(newQuantity);
    }
  };

  const productFeatures = [
    {
      icon: Shield,
      title: 'Product information',
      description: 'Review details before choosing'
    },
    {
      icon: Award,
      title: 'Direct ordering',
      description: 'Place your order through WhatsApp'
    }
  ];

  // Check if temp quantity is different from actual cart quantity
  const isQuantityChanged = inCart && tempQuantity !== itemQuantity;

  return (
    <main className="pt-20 min-h-screen bg-cream">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-500 mb-6"
        >
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={16} />
          <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
          <ChevronRight size={16} />
          <span className="text-gold font-medium truncate">{product.title}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              {!imgError ? (
                <Image
                  src={`/product-images/${product.image}`}
                  alt={product.title}
                  fill
                  className="object-cover"
                  onError={() => setImgError(true)}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cream to-gold/10">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-6xl">💎</span>
                    </div>
                    <h3 className="text-xl font-poppins font-semibold text-gray-600">{product.title}</h3>
                  </div>
                </div>
              )}
              
              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-gold text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  -{discountPercentage}% OFF
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Category */}
            <div className="inline-flex items-center space-x-2 bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium">
              <span>{product.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-poppins font-bold">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-poppins font-bold text-gold">
                {config.currencySymbol}{finalPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through">
                  {config.currencySymbol}{product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector & Action Buttons */}
            {inCart ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-sm">Quantity:</span>
                  <div className="flex items-center space-x-3 border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleTempQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-medium w-8 text-center">{tempQuantity}</span>
                    <button
                      onClick={() => handleTempQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {isQuantityChanged ? (
                    <button
                      onClick={handleUpdateCart}
                      disabled={isUpdating}
                      className="flex-1 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <RefreshCw size={20} className={isUpdating ? 'animate-spin' : ''} />
                      <span>{isUpdating ? 'Updating...' : 'Update bag'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleRemoveFromCart}
                      className="flex-1 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-all flex items-center justify-center space-x-2"
                    >
                      <X size={20} />
                      <span>Remove from Cart</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-sm">Quantity:</span>
                  <div className="flex items-center space-x-3 border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="font-medium w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
                >
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              {productFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <feature.icon className="text-gold flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-semibold">{feature.title}</p>
                    <p className="text-xs text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 text-sm text-forest">
              <div className="w-2 h-2 bg-forest rounded-full animate-pulse"></div>
              <span>In Stock • Ready to Ship</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </main>
  );
}
