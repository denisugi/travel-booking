import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How do I book a travel package?',
    answer: 'Booking is easy! Simply browse our travel packages, select your preferred destination and dates, add it to your cart, and proceed to checkout. You\'ll receive a confirmation email with all the details within minutes.',
    category: 'Booking',
  },
  {
    question: 'Can I customize my travel package?',
    answer: 'Yes! We offer customizable packages. Contact our travel experts and they\'ll help tailor the itinerary to your preferences, whether it\'s adjusting the duration, changing accommodations, or adding special activities.',
    category: 'Booking',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and installments through our financing partners. All transactions are secured with SSL encryption.',
    category: 'Payment',
  },
  {
    question: 'Is my payment secure?',
    answer: 'Absolutely. We use industry-standard SSL encryption and work with trusted payment processors. Your financial information is never stored on our servers.',
    category: 'Payment',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Our standard policy allows free cancellation up to 30 days before departure for a full refund. Cancellations within 30 days may be subject to fees. Some packages have different policies - check the specific package details.',
    category: 'Cancellation',
  },
  {
    question: 'How do I cancel or modify my booking?',
    answer: 'Log into your account, go to "My Bookings," and select the booking you wish to modify. From there, you can cancel or request changes. For complex modifications, contact our support team directly.',
    category: 'Cancellation',
  },
  {
    question: 'Do I need travel insurance?',
    answer: 'While travel insurance is optional, we highly recommend it. It protects you against unexpected events like trip cancellations, medical emergencies, and lost luggage. We offer comprehensive travel insurance at checkout.',
    category: 'Insurance',
  },
  {
    question: 'What does travel insurance cover?',
    answer: 'Our travel insurance typically covers trip cancellation, medical emergencies, evacuation, lost or delayed baggage, and travel delays. Coverage details vary by plan - check the policy documents for specifics.',
    category: 'Insurance',
  },
  {
    question: 'How do I get my travel documents?',
    answer: 'After booking, you\'ll receive an email with your booking confirmation and voucher. Detailed travel documents, including your itinerary and hotel vouchers, will be sent 7 days before your departure.',
    category: 'General',
  },
  {
    question: 'Can I get a refund if the price drops after booking?',
    answer: 'Yes! If the price of your booked package drops before your travel date, contact us within 7 days of the price change and we\'ll refund the difference.',
    category: 'General',
  },
  {
    question: 'What if I have special dietary requirements?',
    answer: 'Most of our partner hotels and restaurants can accommodate dietary restrictions. Please inform us at least 14 days before departure so we can notify all providers. Some experiences may have limited options.',
    category: 'General',
  },
  {
    question: 'How do I contact customer support while traveling?',
    answer: 'Our 24/7 support hotline is available for all active travelers. The emergency contact number is provided in your travel documents. You can also reach us via email or our mobile app.',
    category: 'Support',
  },
];

const categories = ['All', 'Booking', 'Payment', 'Cancellation', 'Insurance', 'Support', 'General'];

const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = faqData.filter(
    (faq) => selectedCategory === 'All' || faq.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1600)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl">Find answers to common questions about our services</p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-3xl mx-auto px-4">
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <span className={`ml-4 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-600">{faq.answer}</p>
                  <span className="inline-block mt-2 text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {faq.category}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No FAQs found in this category.</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-blue-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-6 opacity-90">Our support team is here to help you 24/7</p>
          <Link href="/contact" className="inline-block bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold transition">
            Contact Support
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TravelBooking</h3>
              <p className="text-gray-400">Your trusted travel partner for unforgettable experiences around the world.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/packages" className="hover:text-white">Packages</Link></li>
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@travel-booking.com</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 123 Travel Street, NYC</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 TravelBooking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
