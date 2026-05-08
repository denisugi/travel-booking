import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

interface PackageDetailProps {
  id: number;
}

const PackageDetail: React.FC<PackageDetailProps> = ({ id }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'includes'>('overview');

  // Sample package data (in real app, fetch from API)
  const pkg = {
    id: 1,
    name: 'Bali Paradise Retreat',
    destination: 'Bali, Indonesia',
    duration: '7 Days / 6 Nights',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800',
      'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800',
      'https://images.unsplash.com/photo-1544547340-40c3e1e0b8c7?w=800',
    ],
    rating: 4.9,
    reviewCount: 328,
    category: 'Beach',
    description: 'Experience the ultimate tropical getaway in Bali with pristine beaches, ancient temples, and lush rice terraces. This comprehensive package takes you through the island\'s most stunning locations while providing luxury accommodations and personalized service.',
    highlights: [
      'Beachfront Resort Accommodation',
      'Private Temple Tours with Local Guide',
      'Ubud Rice Terrace Exploration',
      'Water Sports Activities (Snorkeling, Diving)',
      'Traditional Balinese Cooking Class',
      'Sunset Dinner at Jimbaran Bay',
      'Spa Treatment Session',
      'Airport Transfer & Local Transportation',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Bali', description: 'Meet and greet at Ngurah Rai Airport, transfer to resort. Welcome dinner at the beachfront restaurant.' },
      { day: 2, title: 'South Bali Beaches', description: 'Visit Nusa Dua, Padang-Padang, and Uluwatu Temple. Evening Kecak fire dance performance.' },
      { day: 3, title: 'Ubud Cultural Tour', description: 'Explore Ubud Palace, Art Market, Tegallalang Rice Terraces, and local temples.' },
      { day: 4, title: 'Water Adventures', description: 'Full-day snorkeling and diving at nearby islands with BBQ lunch on the beach.' },
      { day: 5, title: 'Mountain & Lake Tour', description: 'Visit Mount Batur sunrise trek, Tirta Empul sacred spring, and Lake Batur.' },
      { day: 6, title: 'Free Day & Spa', description: 'Relax at the resort, enjoy included spa treatment, or explore nearby attractions.' },
      { day: 7, title: 'Departure', description: 'Leisurely breakfast, shopping in Kuta, transfer to airport for departure.' },
    ],
    inclusions: {
      included: [
        '6 Nights Luxury Resort Accommodation',
        'Daily Breakfast & Dinner',
        'All Ground Transportation',
        'Professional English-Speaking Guide',
        'All Entrance Fees',
        'Water Sports Equipment',
        'Spa Treatment',
        'Welcome Fruit Basket',
      ],
      notIncluded: [
        'International Flights',
        'Travel Insurance',
        'Personal Expenses',
        'Tips & Gratuities',
        'Alcoholic Beverages',
        'Optional Activities',
      ],
    },
    availableDates: [
      '2026-02-15',
      '2026-02-22',
      '2026-03-01',
      '2026-03-08',
      '2026-03-15',
      '2026-03-22',
    ],
    reviews: [
      { name: 'John D.', avatar: 'JD', rating: 5, date: 'Dec 2025', comment: 'Absolutely amazing experience! Everything was perfectly organized and the destinations were breathtaking.' },
      { name: 'Sarah M.', avatar: 'SM', rating: 5, date: 'Nov 2025', comment: 'Best vacation ever! The guide was incredibly knowledgeable and the resort was absolutely stunning.' },
      { name: 'Mike R.', avatar: 'MR', rating: 4, date: 'Oct 2025', comment: 'Great package overall. The itinerary was well-paced and we got to see so much of Bali. Highly recommend!' },
    ],
  };

  const totalPrice = pkg.price * travelers;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <section className="relative h-[400px]">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-2 inline-block">{pkg.category}</span>
            <h1 className="text-4xl font-bold mb-2">{pkg.name}</h1>
            <p className="text-xl mb-2">📍 {pkg.destination}</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center">⭐ {pkg.rating} ({pkg.reviewCount} reviews)</span>
              <span>⏱ {pkg.duration}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <main className="flex-1">
            {/* Gallery */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {pkg.gallery.map((img, index) => (
                <img key={index} src={img} alt={`Gallery ${index + 1}`} className={`rounded-lg w-full h-24 object-cover ${index === 0 ? 'col-span-2 row-span-2 h-48' : ''}`} />
              ))}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-3 font-medium transition ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`px-6 py-3 font-medium transition ${activeTab === 'itinerary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Itinerary
                </button>
                <button
                  onClick={() => setActiveTab('includes')}
                  className={`px-6 py-3 font-medium transition ${activeTab === 'includes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  What's Included
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Package</h2>
                    <p className="text-gray-600 mb-6">{pkg.description}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pkg.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                    <div className="space-y-6">
                      {pkg.itinerary.map((day) => (
                        <div key={day.day} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                              {day.day}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{day.title}</h3>
                            <p className="text-gray-600">{day.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'includes' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-4">✅ Included</h3>
                        <ul className="space-y-2">
                          {pkg.inclusions.included.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-700">
                              <span className="text-green-500">✓</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-red-700 mb-4">❌ Not Included</h3>
                        <ul className="space-y-2">
                          {pkg.inclusions.notIncluded.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-700">
                              <span className="text-red-500">✗</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {pkg.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">{review.avatar}</div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="ml-auto flex items-center">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Booking Sidebar */}
          <aside className="w-full lg:w-96">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                <span className="text-gray-500">/person</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choose a date</option>
                    {pkg.availableDates.map((date) => (
                      <option key={date} value={date}>{date}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold">{travelers}</span>
                    <button
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Base Price</span>
                    <span>${pkg.price} × {travelers}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
                  Book Now
                </button>

                <p className="text-center text-sm text-gray-500">
                  🔒 Secure booking • Free cancellation up to 30 days before departure
                </p>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-2">Have questions about this package?</p>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Contact Us →
                </Link>
              </div>
            </div>
          </aside>
        </div>
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

export default PackageDetail;
