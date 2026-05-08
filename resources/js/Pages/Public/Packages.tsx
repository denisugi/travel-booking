import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

interface TravelPackage {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  highlights: string[];
}

const allPackages: TravelPackage[] = [
  {
    id: 1,
    name: 'Bali Paradise Retreat',
    destination: 'Bali, Indonesia',
    duration: '7 Days / 6 Nights',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    rating: 4.9,
    reviewCount: 328,
    category: 'Beach',
    description: 'Experience the ultimate tropical getaway in Bali with pristine beaches, ancient temples, and lush rice terraces.',
    highlights: ['Beachfront Resort', 'Temple Tours', 'Rice Terrace Visits', 'Water Sports'],
  },
  {
    id: 2,
    name: 'Swiss Alps Adventure',
    destination: 'Zurich, Switzerland',
    duration: '5 Days / 4 Nights',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
    rating: 4.8,
    reviewCount: 256,
    category: 'Mountain',
    description: 'Discover the majestic Swiss Alps with breathtaking views, skiing, and Swiss hospitality.',
    highlights: ['Mountain Lodge', 'Ski Passes', ' scenic Train Rides', 'Fondue Dinner'],
  },
  {
    id: 3,
    name: 'Maldives Beach Escape',
    destination: 'Malé, Maldives',
    duration: '10 Days / 9 Nights',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    rating: 5.0,
    reviewCount: 412,
    category: 'Beach',
    description: 'Relax in paradise with crystal-clear waters, overwater villas, and world-class diving.',
    highlights: ['Overwater Villa', 'Diving Excursions', 'Spa Treatment', 'Sunset Cruise'],
  },
  {
    id: 4,
    name: 'Tokyo Cultural Journey',
    destination: 'Tokyo, Japan',
    duration: '8 Days / 7 Nights',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    rating: 4.7,
    reviewCount: 189,
    category: 'Cultural',
    description: 'Immerse yourself in Japanese culture with ancient temples, modern districts, and authentic cuisine.',
    highlights: ['Temple Visits', 'Sushi Workshop', 'Tea Ceremony', 'Akihabara Tour'],
  },
  {
    id: 5,
    name: 'Paris Romantic Getaway',
    destination: 'Paris, France',
    duration: '5 Days / 4 Nights',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    rating: 4.9,
    reviewCount: 567,
    category: 'Romantic',
    description: 'Fall in love with the City of Light, from the Eiffel Tower to charming cafés.',
    highlights: ['Eiffel Tower Visit', 'Seine River Cruise', 'Louvre Tour', 'Wine Tasting'],
  },
  {
    id: 6,
    name: 'Safari Adventure Kenya',
    destination: 'Nairobi, Kenya',
    duration: '6 Days / 5 Nights',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    rating: 4.8,
    reviewCount: 234,
    category: 'Adventure',
    description: 'Witness the Big Five on an unforgettable African safari adventure.',
    highlights: ['Game Drives', 'Masai Mara', 'Luxury Tented Camp', 'Balloon Safari'],
  },
  {
    id: 7,
    name: 'Greek Islands Cruise',
    destination: 'Athens, Greece',
    duration: '7 Days / 6 Nights',
    price: 2099,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
    rating: 4.9,
    reviewCount: 345,
    category: 'Cruise',
    description: 'Explore the stunning Greek islands with crystal-clear waters and ancient ruins.',
    highlights: ['Island Hopping', 'Santorini Visit', 'Ancient Ruins', 'Mediterranean Cuisine'],
  },
  {
    id: 8,
    name: 'New York City Explorer',
    destination: 'New York, USA',
    duration: '4 Days / 3 Nights',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    rating: 4.6,
    reviewCount: 892,
    category: 'City',
    description: 'Experience the energy of NYC with iconic landmarks, Broadway shows, and world-class dining.',
    highlights: [' Statue of Liberty', 'Broadway Show', 'Central Park', 'Times Square'],
  },
];

const categories = ['All', 'Beach', 'Mountain', 'Cultural', 'Adventure', 'Romantic', 'City', 'Cruise'];

const Packages: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('featured');

  const filteredPackages = allPackages
    .filter((pkg) => selectedCategory === 'All' || pkg.category === selectedCategory)
    .filter((pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Travel Packages</h1>
          <p className="text-xl">Find your perfect getaway from our curated collection</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 bg-white rounded-xl shadow-md p-6 h-fit">
            <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
            
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <input
                type="range"
                min="0"
                max="3000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </aside>

          {/* Package Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredPackages.length} packages found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-56">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {pkg.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-md text-sm font-medium text-gray-700">
                      ⭐ {pkg.rating} ({pkg.reviewCount})
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-blue-600 font-medium mb-1">{pkg.destination}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pkg.description}</p>
                    <p className="text-sm text-gray-500 mb-4">⏱ {pkg.duration}</p>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
                        <span className="text-sm text-gray-500">/person</span>
                      </div>
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPackages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No packages found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange([0, 3000]);
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
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

export default Packages;
