import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const offices = [
    {
      city: 'New York',
      address: '123 Travel Street, Manhattan, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'nyc@travel-booking.com',
      isHQ: true,
    },
    {
      city: 'London',
      address: '45 Adventure Ave, Westminster, London SW1A 1AA',
      phone: '+44 20 7123 4567',
      email: 'london@travel-booking.com',
      isHQ: false,
    },
    {
      city: 'Tokyo',
      address: '2-3-4 Shibuya, Tokyo 150-0002',
      phone: '+81 3 1234 5678',
      email: 'tokyo@travel-booking.com',
      isHQ: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We're here to help you plan your dream vacation</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Contact Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📞</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
            <p className="text-gray-500 text-sm mt-1">Mon-Fri: 9am - 8pm EST</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✉️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">info@travel-booking.com</p>
            <p className="text-gray-500 text-sm mt-1">Response within 24 hours</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600">Chat with our team</p>
            <p className="text-gray-500 text-sm mt-1">Available 24/7</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.subject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="support">Customer Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition">
                  <span className="text-xl">📘</span>
                  <span>Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition">
                  <span className="text-xl">🐦</span>
                  <span>Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition">
                  <span className="text-xl">📸</span>
                  <span>Instagram</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition">
                  <span className="text-xl">💼</span>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Immediate Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                For urgent booking changes or cancellations, please call our 24/7 hotline.
              </p>
              <p className="text-xl font-bold text-blue-600">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 relative">
                {office.isHQ && (
                  <span className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Headquarters
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{office.city}</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-start gap-2">
                    <span>📍</span>
                    <span>{office.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📞</span>
                    <span>{office.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>✉️</span>
                    <span>{office.email}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Link */}
        <section className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Looking for quick answers?</p>
          <Link href="/faq" className="text-blue-600 hover:text-blue-700 font-semibold">
            Check our FAQ page →
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
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

export default Contact;
