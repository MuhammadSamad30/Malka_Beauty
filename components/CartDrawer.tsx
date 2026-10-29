'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Minus, 
  Trash2,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { calculateOrderSummary, generateWhatsAppUrl, validateCustomerDetails } from '@/lib/whatsapp';
import config from '@/lib/config';
import SavedCustomerDetails from '@/components/SavedCustomerDetails';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
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

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowCheckout(true);
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

    // Open WhatsApp in new window
    const orderWindow = window.open(url, '_blank');
    if (!orderWindow) {
      alert('WhatsApp could not open. Please allow pop-ups and try again; your cart is saved.');
      return;
    }
    
    // Clear cart and close
    clearCart();
    onClose();
    setShowCheckout(false);
    setCustomerDetails({
      name: '',
      phone: '',
      address: '',
      city: '',
      notes: ''
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="text-gold" size={24} />
                <h2 className="text-xl font-poppins font-semibold">
                  Your Cart
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({totalItems} items)
                  </span>
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={64} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-poppins font-semibold text-gray-600">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Start shopping to add items to your cart
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-primary mt-6"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : showCheckout ? (
                // Checkout Form
                <div className="space-y-4">
                  <h3 className="text-lg font-poppins font-semibold text-gold">
                    Shipping Details
                  </h3>
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
                </div>
              ) : (
                // Cart Items List
                items.map((item) => {
                  const price = item.discountPrice || item.price;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex gap-4 p-3 bg-cream rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                        <Image
                          src={`/product-images/${item.image}`}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-gold">
                              {config.currencySymbol}{price.toLocaleString()}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                {!showCheckout ? (
                  // Cart Summary
                  <>
                    <div className="space-y-2">
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
                      <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between text-lg font-poppins font-semibold">
                          <span>Total</span>
                          <span className="text-gold">
                            {config.currencySymbol}{summary.grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ChevronRight size={20} />
                    </button>
                  </>
                ) : (
                  // Checkout Actions
                  <>
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
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
