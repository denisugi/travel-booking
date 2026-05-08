import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Best Travel Destinations for 2026',
    excerpt: 'Discover the most breathtaking places to visit in the coming year, from hidden gems to iconic landmarks.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    date: 'Jan 15, 2026',
    category: 'Travel Tips',
    author: { name: 'Alexandra Chen', avatar: 'AC', role: 'Travel Expert' },
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'How to Travel on a Budget',
    excerpt: 'Expert tips on how to explore the world without breaking the bank. Smart strategies for affordable adventures.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    date: 'Jan 12, 2026',
    category: 'Budget Travel',
    author: { name: 'Marcus Rivera', avatar: 'MR', role: 'Finance Editor' },
    readTime: '6 min read',
  },
  {
    id: 3,
    title: 'Ultimate Packing Guide for Travelers',
    excerpt: 'Everything you need to pack for your next adventure, and what to leave behind. The complete checklist.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
    date: 'Jan 10, 2026',
    category: 'Travel Tips',
    author: { name: 'Sophie Williams', avatar: 'SW', role: 'Lifestyle Writer' },
    readTime: '5 min read',
  },
  {
    id: 4,
    title: 'Sustainable Travel: A Complete Guide',
    excerpt: 'How to explore the world while minimizing your environmental impact. Eco-friendly travel tips.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    date: 'Jan 8, 2026',
    category: 'Eco Travel',
    author: { name: 'David Park', avatar: 'DP', role: 'Sustainability Editor' },
    readTime: '10 min read',
  },
  {
    id: 5,
    title: 'Best Street Food Destinations in Asia',
    excerpt: 'A culinary journey through the tastiest street food scenes across Thailand, Vietnam, Japan, and more.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    date: 'Jan 5, 2026',
    category: 'Food & Travel',
    author: { name: 'Sophie Williams', avatar: 'SW', role: 'Lifestyle Writer' },
    readTime: '7 min read',
  },
  {
    id: 6,
    title: 'Solo Travel Safety Tips',
    excerpt: 'Essential advice for traveling alone safely. Confidence-building tips for solo adventurers.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    date: 'Jan 3, 2026',
    category: 'Solo Travel',
    author: { name: 'Alexandra Chen', avatar: 'AC', role: 'Travel Expert' },
    readTime: '6 min read',
  },
  {
    id: 7,
    title: 'Hidden Beaches of Southeast Asia',
    excerpt: 'Discover untouched paradise locations away from the tourist crowds. Secret beach destinations.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    date: 'Dec 28, 2025',
    category: 'Beach Travel',
    author: { name: 'Marcus Rivera', avatar: 'MR', role: 'Finance Editor' },
    readTime: '9 min read',
  },
  {
    id: 8,
    title: 'How to Choose the Right Travel Insurance',
    excerpt: 'Understanding coverage options and finding the perfect policy for your needs. A comprehensive guide.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    date: 'Dec 25, 2025',
    category: 'Travel Tips',
    author: { name: 'David Park', avatar: 'DP', role: 'Sustainability Editor' },
    readTime: '8 min read',
  },
];

const categories = ['All', 'Travel Tips', 'Budget Travel', 'Eco Travel', 'Food & Travel', 'Solo Travel', 'Beach Travel'];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== 'All');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600)' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Travel Blog</h1>
          <p className="text-xl">Tips, guides, and inspiration for your next adventure</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Featured Post */}
        {selectedCategory === 'All' && searchQuery === '' && featuredPost && (
          <section className="mb-12">
            <Link href={`/blog/${featuredPost.id}`} className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto">
                  <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-4 w-fit">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {featuredPost.author.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author.name}</p>
                        <p className="text-sm text-gray-500">{featuredPost.author.role}</p>
                      </div>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">{featuredPost.date}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Featured Label */}
        {(selectedCategory !== 'All' || searchQuery !== '') && regularPosts.length > 0 && (
          <h2 className="text-xl font-bold text-gray-900 mb-6">Search Results</h2>
        )}

        {/* Blog Grid */}
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition" />
                </div>
                <div className="p-5">
                  <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                        {post.author.avatar}
                      </div>
                      <span className="text-sm text-gray-600">{post.author.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Newsletter */}
        <section className="mt-16 bg-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get the latest travel tips, exclusive deals, and destination inspiration delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold transition">
              Subscribe
            </button>
          </form>
          <p className="text-sm text-blue-200 mt-4">No spam, unsubscribe anytime</p>
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

export default Blog;
