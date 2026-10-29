'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react';
import config from '@/lib/config';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, phone, message } = formData;
    
    // Build WhatsApp message
    let whatsappMessage = `Hello ${config.storeName}! 👋\n\n`;
    whatsappMessage += `I'm interested in your products.\n\n`;
    
    if (name) whatsappMessage += `Name: ${name}\n`;
    if (phone) whatsappMessage += `Phone: ${phone}\n`;
    if (message) whatsappMessage += `\nMessage: ${message}\n`;
    
    whatsappMessage += `\n✨ Looking forward to your response!`;
    
    // Encode and open WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
    
    // Reset form and close
    setFormData({ name: '', phone: '', message: '' });
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-shadow"
        aria-label="Contact on WhatsApp"
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <MessageCircle size={28} />
        )}
      </motion.button>

      {/* WhatsApp Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="font-semibold">Chat with us</h4>
                  <p className="text-xs opacity-90">We usually reply within minutes</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Hi there! 👋 Let us know how we can help you with our premium hair care products.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-700">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="03XX-XXXXXXX"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="I'm interested in..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>Send via WhatsApp</span>
                </button>
              </form>

              <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-400">
                <a
                  href={`mailto:${config.businessEmail}`}
                  className="hover:text-gold transition-colors flex items-center space-x-1"
                >
                  <Mail size={14} />
                  <span>Email</span>
                </a>
                <span>•</span>
                <a
                  href={`tel:${config.businessPhone}`}
                  className="hover:text-gold transition-colors flex items-center space-x-1"
                >
                  <Phone size={14} />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}