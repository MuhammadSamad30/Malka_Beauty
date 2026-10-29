'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MessageCircle, Truck, CheckCircle } from 'lucide-react';
import config from '@/lib/config';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      `Hello Malka Beauty, I'm ${formData.name}.`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : '',
      formData.subject ? `Topic: ${formData.subject}` : '',
      '',
      formData.message,
    ].filter(Boolean).join('\n');
    setIsSubmitting(true);
    const chatWindow = window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    if (!chatWindow) {
      setIsSubmitting(false);
      alert('WhatsApp could not open. Please allow pop-ups and try again.');
      return;
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: config.businessEmail,
      link: `mailto:${config.businessEmail}`
    },
    {
      icon: Phone,
      title: 'Phone',
      details: config.businessPhone,
      link: `tel:${config.businessPhone}`
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: 'Chat with our team',
      link: `https://wa.me/${config.whatsappNumber}`
    },
    {
      icon: Truck,
      title: 'Delivery',
      details: 'Available across Pakistan',
      link: '/products'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div>
          <h3 className="text-2xl font-poppins font-bold mb-4">
            Get in <span className="text-gold">Touch</span>
          </h3>
          <p className="text-gray-600 leading-relaxed">
              Have questions about our products or need assistance with your order? 
              We’d love to hear from you. Reach out to us and we’ll get back to you 
            as soon as possible.
          </p>
        </div>

        <div className="space-y-4">
          {contactInfo.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                <item.icon className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.details}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Social Links */}
        <div className="pt-4">
          <h4 className="font-semibold text-sm mb-3">Follow Us</h4>
          <div className="flex space-x-3">
            {Object.entries(config.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-100 hover:bg-gold hover:text-white rounded-full flex items-center justify-center transition-colors"
              >
                <span className="capitalize text-xs">{platform.charAt(0).toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
      >
        <h3 className="text-xl font-poppins font-bold mb-6">Send us a Message</h3>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-forest" size={32} />
            </div>
            <h4 className="text-xl font-poppins font-semibold text-forest mb-2">
              Continue in WhatsApp
            </h4>
            <p className="text-gray-500 text-sm">
              Your message is ready to send in WhatsApp. If it did not open, contact us directly using the details on this page.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="label-luxury">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-luxury"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="label-luxury">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-luxury"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="label-luxury">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-luxury"
                placeholder="03XX-XXXXXXX"
              />
            </div>

            <div>
              <label htmlFor="subject" className="label-luxury">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input-luxury"
              >
                <option value="">Select a subject</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Order Support">Order Support</option>
                <option value="Wholesale">Wholesale Inquiry</option>
                <option value="Partnership">Partnership</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="label-luxury">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="input-luxury resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Continue in WhatsApp</span>
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
