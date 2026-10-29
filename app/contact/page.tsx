'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Phone, Mail, MessageCircle, Truck, ChevronDown } from 'lucide-react';
import config from '@/lib/config';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const contactInfo = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: 'Chat with our team',
      link: `https://wa.me/${config.whatsappNumber}`,
      color: 'bg-[#f3eee6] text-[#775738]'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: config.businessPhone,
      link: `tel:${config.businessPhone}`,
      color: 'bg-[#edf1e9] text-[#5e7352]'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: config.businessEmail,
      link: `mailto:${config.businessEmail}`,
      color: 'bg-[#f3eee6] text-[#775738]'
    },
    {
      icon: Truck,
      title: 'Delivery',
      details: 'Available across Pakistan',
      color: 'bg-[#f3eee6] text-[#775738]'
    }
  ];

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Add the products you want to your bag, enter your delivery details, and continue in WhatsApp to send your order to our team.'
    },
    {
      question: 'How do I choose the right product?',
      answer: 'Browse the collection by category and read each product description. You can also message us on WhatsApp if you need help.'
    },
    {
      question: 'Where do you deliver?',
      answer: 'Delivery is available across Pakistan. Share your city and full address with your order so our team can confirm the details.'
    },
    {
      question: 'How do I confirm payment and delivery details?',
      answer: 'After you send your order in WhatsApp, our team will confirm the next steps and delivery details with you directly.'
    },
    {
      question: 'Can I ask a question before ordering?',
      answer: 'Yes. Use the WhatsApp chat link or contact form and send us your question before placing an order.'
    }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Page Header */}
      <section className="border-b border-[#30231e]/10 bg-[#eee4d8] pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-left"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">We are here to help</p>
            <h1 className="mb-3 font-poppins text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
              Let&apos;s talk <span className="text-gold-dark">hair care</span>
            </h1>
            <p className="max-w-2xl text-gray-600">
              Need help choosing a product or placing an order? Reach out and we&apos;ll help you find the right next step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group rounded-[1.35rem] border border-[#e9e1d7] bg-[#fffefa] p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <info.icon size={24} />
                </div>
                <h3 className="font-poppins font-semibold mb-1">{info.title}</h3>
                {info.link ? <a href={info.link} className="text-sm text-gray-600 hover:text-gold-dark">{info.details}</a> : <p className="text-sm text-gray-600">{info.details}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <ContactForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold mb-4">
              Frequently Asked <span className="text-gold">Questions</span>
            </h2>
            <p className="text-gray-600">
              Find answers to common questions about our products and services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="rounded-[1.35rem] border border-[#e9e1d7] bg-[#fffefa] p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 text-left">
                  <span className="font-poppins text-base font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown size={18} className={`shrink-0 text-gold-dark transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && <p className="mt-3 border-t border-gray-100 pt-3 text-sm leading-6 text-gray-600">{faq.answer}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="bg-[#69372e] py-12 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-poppins font-bold">Quick Chat Support</h3>
              <p className="text-white/90 mt-1">We’re here to help, chat with us now</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gold px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-all flex items-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </a>
              <div className="flex items-center space-x-3">
                <a 
                  href={config.socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <FaInstagram size={20} />
                </a>
                <a 
                  href={config.socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <FaFacebook size={20} />
                </a>
                <a 
                  href={config.socialLinks.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </main>
  );
}
