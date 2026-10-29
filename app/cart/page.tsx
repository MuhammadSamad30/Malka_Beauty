'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  Truck,
  MessageCircle,
  Banknote,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { calculateOrderSummary, generateWhatsAppUrl, validateCustomerDetails } from '@/lib/whatsapp';
import config from '@/lib/config';
import WhatsAppButton from '@/components/WhatsAppButton';
import SavedCustomerDetails from '@/components/SavedCustomerDetails';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalItems } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const totalItems = getTotalItems();
  const summary = calculateOrderSummary(items);
  const isFreeShipping = summary.subtotal >= config.freeShippingThreshold;

  const handleQuantityChange = (productId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    updateQuantity(productId, newQuantity);
  };

  const handlePlaceOrder = () => {
    const { name, phone, address, city, notes } = customerDetails;
    const validation = validateCustomerDetails(customerDetails);
    if (!validation.valid) {
      setCheckoutError(validation.errors[0]);
      return;
    }
    setCheckoutError('');

    const url = generateWhatsAppUrl(
      { name, phone, address, city, notes },
      items,
      summary
    );

    const orderWindow = window.open(url, '_blank');
    if (!orderWindow) {
      alert('WhatsApp could not open. Please allow pop-ups and try again; your cart is saved.');
      return;
    }
    clearCart();
    setShowCheckout(false);
    setCustomerDetails({
      name: '',
      phone: '',
      address: '',
      city: '',
      notes: ''
    });
  };

  if (items.length === 0 && !showCheckout) {
    return (
      <main className="pt-8 min-h-screen bg-cream">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-poppins font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven’t added any products to your cart yet.
              Start shopping to discover our luxury hair care collection.
            </p>
            <Link href="/products" className="btn-primary inline-block">
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-8 min-h-screen bg-cream">
      <div className="container-custom py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <Link 
              href="/products" 
              className="text-gray-600 hover:text-gold transition-colors flex items-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Continue Shopping</span>
            </Link>
            <h1 className="text-2xl font-poppins font-bold">
              Shopping Cart
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({totalItems} items)
              </span>
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center space-x-1"
            >
              <Trash2 size={16} />
              <span>Clear Cart</span>
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {!showCheckout ? (
              items.map((item, index) => {
                const price = item.discountPrice || item.price;
                const total = price * item.quantity;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 rounded-[1.35rem] border border-[#e9e1d7] bg-[#fffefa] p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 bg-cream rounded-lg overflow-hidden">
                      <Image src={`/product-images/${item.image}`} alt={item.title} fill sizes="96px" className="z-10 object-cover" />
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl">✨</span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <h3 className="font-poppins font-semibold">{item.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {item.description}
                          </p>
                          <span className="text-xs text-gold font-medium">
                            {item.category || 'Premium'}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gold">
                            {config.currencySymbol}{total.toLocaleString()}
                          </div>
                          {item.discountPrice && (
                            <div className="text-sm text-gray-400 line-through">
                              {config.currencySymbol}{(item.price * item.quantity).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            className="p-1.5 border border-gray-300 rounded hover:border-gold transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            className="p-1.5 border border-gray-300 rounded hover:border-gold transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              // Checkout Form
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              className="rounded-[1.35rem] border border-[#e9e1d7] bg-[#fffefa] p-6 shadow-sm space-y-4"
              >
                <h2 className="text-xl font-poppins font-bold text-gold mb-4">
                  Shipping Details
                </h2>
                <SavedCustomerDetails
                  values={{ name: customerDetails.name, phone: customerDetails.phone, address: customerDetails.address, city: customerDetails.city }}
                  onUse={(saved) => setCustomerDetails((current) => ({ ...current, ...saved }))}
                />
                
                <div>
                  <label className="label-luxury">Full Name *</label>
                  <input
                    type="text"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    className="input-luxury"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="label-luxury">Phone Number *</label>
                  <input
                    type="tel"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    className="input-luxury"
                    placeholder="03XX-XXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label className="label-luxury">Delivery Address *</label>
                  <input
                    type="text"
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                    className="input-luxury"
                    placeholder="House #, Street, Area"
                    required
                  />
                </div>

                <div>
                  <label className="label-luxury">City *</label>
                  <input
                    type="text"
                    value={customerDetails.city}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                    className="input-luxury"
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div>
                  <label className="label-luxury">Additional Notes</label>
                  <textarea
                    value={customerDetails.notes}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                    className="input-luxury"
                    rows={3}
                    placeholder="Any special instructions or delivery preferences"
                  />
                </div>
                {checkoutError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{checkoutError}</p>}
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 rounded-[1.35rem] border border-[#e9e1d7] bg-[#fffefa] p-6 shadow-sm"
            >
              <h2 className="text-xl font-poppins font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {config.currencySymbol}{summary.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Shipping
                    {isFreeShipping && (
                      <span className="text-forest text-xs ml-1">(Free)</span>
                    )}
                  </span>
                  <span className="font-medium">
                    {summary.shippingFee === 0 ? 'Free' : `${config.currencySymbol}${summary.shippingFee.toLocaleString()}`}
                  </span>
                </div>
                {summary.tax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      {config.currencySymbol}{summary.tax.toLocaleString()}
                    </span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-poppins font-bold">
                    <span>Total</span>
                    <span className="text-gold">
                      {config.currencySymbol}{summary.grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {!isFreeShipping && summary.subtotal > 0 && (
                  <div className="bg-gold/10 text-gold text-sm p-3 rounded-lg">
                    <p className="font-medium">Add {config.currencySymbol}{(config.freeShippingThreshold - summary.subtotal).toLocaleString()} more for free shipping!</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!showCheckout ? (
                <button
                  onClick={() => setShowCheckout(true)}
                  className="btn-primary w-full mt-6 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ChevronRight size={20} />
                </button>
              ) : (
                <div className="space-y-3 mt-6">
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="btn-outline w-full"
                  >
                    Back to Cart
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-primary w-full"
                  >
                    Place Order via WhatsApp
                  </button>
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <Truck className="text-gold mx-auto mb-1" size={20} />
                    <p className="text-xs text-gray-500">Pakistan delivery</p>
                  </div>
                  <div className="text-center">
                    <MessageCircle className="text-gold mx-auto mb-1" size={20} />
                    <p className="text-xs text-gray-500">WhatsApp order</p>
                  </div>
                  <div className="text-center">
                    <Banknote className="text-gold mx-auto mb-1" size={20} />
                    <p className="text-xs text-gray-500">PKR prices</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </main>
  );
}
