import React from 'react';
import { Link } from '@inertiajs/react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alexandra Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: 'Marcus Rivera',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: 'Sophie Williams',
      role: 'Travel Expert',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
    {
      name: 'David Park',
      role: 'Customer Success Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Travelers' },
    { number: '100+', label: 'Destinations' },
    { number: '15+', label: 'Years Experience' },
    { number: '4.9/5', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Discover our story and mission</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, TravelBooking started with a simple mission: to make travel accessible, enjoyable, and unforgettable for everyone. What began as a small team of passionate travelers has grown into a trusted platform serving over 50,000 happy customers worldwide.
            </p>
            <p className="text-gray-600 mb-4">
              Our founder, Alexandra Chen, experienced firsthand the challenges of planning international travel. She envisioned a platform that would simplify the process while maintaining the excitement and personal touch that makes travel special.
            </p>
            <p className="text-gray-600">
              Today, we partner with over 500 hotels, airlines, and local tour operators to bring you the best travel experiences at competitive prices. Our team of travel experts personally curates every package to ensure quality and memorable moments.
            </p>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800" alt="Our journey" className="rounded-xl shadow-lg" />
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl">
              <span className="text-4xl font-bold">15+</span>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <span className="text-4xl font-bold">{stat.number}</span>
                <p className="text-blue-100 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Mission & Values</h2>
          <p className="text-gray-600">What drives us every day</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer First</h3>
            <p className="text-gray-600">Your satisfaction is our top priority. We go above and beyond to exceed your expectations.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Promise</h3>
            <p className="text-gray-600">We handpick every partner and personally verify each travel package for quality.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Transparency</h3>
            <p className="text-gray-600">No hidden fees, no surprises. We believe in honest pricing and clear communication.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Meet Our Team</h2>
            <p className="text-gray-600">The passionate people behind your perfect trip</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-400 mb-8">Let us help you plan the perfect trip</p>
          <div className="flex gap-4 justify-center">
            <Link href="/packages" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Explore Packages
            </Link>
            <Link href="/contact" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold transition">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
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

export default About;
