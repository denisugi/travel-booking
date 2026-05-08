import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

interface BlogDetailProps {
  id: number;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<'comments' | 'related'>('comments');
  const [comment, setComment] = useState('');

  // Sample blog post data (in real app, fetch from API)
  const post = {
    id: 1,
    title: '10 Best Travel Destinations for 2026',
    excerpt: 'Discover the most breathtaking places to visit in the coming year, from hidden gems to iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200',
    date: 'Jan 15, 2026',
    category: 'Travel Tips',
    author: {
      name: 'Alexandra Chen',
      avatar: 'AC',
      role: 'Travel Expert',
      bio: 'Alexandra has been exploring the world for over 15 years and sharing her experiences to help others travel smarter.',
    },
    readTime: '8 min read',
    content: `
      <p className="mb-4">As we step into 2026, the world of travel continues to evolve with exciting new destinations and experiences. Whether you're seeking adventure, relaxation, cultural immersion, or all three, these top destinations should be on your radar.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Kyoto, Japan</h2>
      <p class="mb-4">Beyond the famous temples and tea houses, Kyoto offers seasonal beauty that captivates every visitor. The city's commitment to preserving tradition while embracing modernity creates a unique travel experience.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Patagonia, Argentina & Chile</h2>
      <p class="mb-4">The last frontier of South America beckons with its dramatic landscapes, from towering glaciers to ancient forests. Trekking in Patagonia remains one of the most rewarding adventures for outdoor enthusiasts.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Azores, Portugal</h2>
      <p class="mb-4">This volcanic archipelago in the middle of the Atlantic offers untouched natural beauty, hot springs, whale watching, and some of the best sustainable tourism practices in Europe.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Slovenia</h2>
      <p class="mb-4">A hidden European gem with alpine lakes, medieval towns, and Mediterranean coastline. Ljubljana's charming old town and Lake Bled's iconic island church make for unforgettable memories.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. New Zealand's South Island</h2>
      <p class="mb-4">The land of the Long White Cloud continues to inspire with its dramatic fjords, snow-capped peaks, and pristine wilderness. Film locations from Lord of the Rings add a touch of magic.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Morocco</h2>
      <p class="mb-4">From the bustling souks of Marrakech to the saharan dunes of Erg Chebbi, Morocco offers a sensory feast. The country's rich history, vibrant culture, and diverse landscapes make it a must-visit.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Iceland</h2>
      <p class="mb-4">The land of fire and ice continues to enchant with its otherworldly landscapes, Northern Lights, geothermal spas, and dramatic coastlines. Ring Road adventures remain iconic.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Croatia</h2>
      <p class="mb-4">Beyond Dubrovnik's city walls, Croatia offers over 1,000 islands, crystal-clear Adriatic waters, historic Plitvice Lakes, and the gastronomic delights of Istria.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Vancouver Island, Canada</h2>
      <p class="mb-4">Where rainforests meet the Pacific. This sustainable travel destination offers incredible wildlife, including whale watching, bear sightings, and the charm of Victoria.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Tanzania</h2>
      <p class="mb-4">Home to Mount Kilimanjaro and the Serengeti, Tanzania offers the ultimate African safari experience. Witness the Great Migration and connect with local Maasai culture.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Travel Tips for 2026</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Book accommodations and popular attractions early</li>
        <li>Consider sustainable travel options and eco-certified operators</li>
        <li>Get travel insurance that covers unexpected changes</li>
        <li>Research local customs and cultural norms before visiting</li>
        <li>Pack light and leave room for souvenirs</li>
      </ul>
      
      <p class="mt-8">Whether you choose one destination or several, 2026 promises to be an extraordinary year for travel. Start planning your adventures today!</p>
    `,
    tags: ['Travel', 'Destinations', '2026', 'Adventure', 'Planning'],
    views: 15420,
    likes: 892,
  };

  const comments = [
    {
      id: 1,
      author: 'Sarah Miller',
      avatar: 'SM',
      date: 'Jan 16, 2026',
      content: 'Great article! I\'ve been wanting to visit Kyoto for years. This finally convinced me to book the trip!',
      likes: 24,
    },
    {
      id: 2,
      author: 'Mike Johnson',
      avatar: 'MJ',
      date: 'Jan 16, 2026',
      content: 'Patagonia is on my bucket list. The photos alone make me want to start packing!',
      likes: 18,
    },
    {
      id: 3,
      author: 'Emma Davis',
      avatar: 'ED',
      date: 'Jan 15, 2026',
      content: 'I went to Slovenia last year and can confirm it\'s amazing! Lake Bled is even more beautiful in person.',
      likes: 31,
    },
  ];

  const relatedPosts = [
    {
      id: 2,
      title: 'How to Travel on a Budget',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400',
      category: 'Budget Travel',
    },
    {
      id: 4,
      title: 'Sustainable Travel: A Complete Guide',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
      category: 'Eco Travel',
    },
    {
      id: 6,
      title: 'Solo Travel Safety Tips',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400',
      category: 'Solo Travel',
    },
  ];

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <section className="relative h-[400px]">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                  {post.author.avatar}
                </div>
                <span>{post.author.name}</span>
              </div>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Content */}
        <article className="bg-white rounded-xl shadow-md p-8 mb-8">
          {/* Share and Actions */}
          <div className="flex items-center justify-between pb-6 border-b mb-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 text-sm">👁 {post.views.toLocaleString()} views</span>
              <span className="text-gray-500 text-sm">❤️ {post.likes} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <span>📤</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <span>🔖</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Bio */}
          <div className="bg-gray-50 rounded-xl p-6 mt-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {post.author.avatar}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{post.author.name}</h3>
                <p className="text-blue-600 text-sm mb-2">{post.author.role}</p>
                <p className="text-gray-600 text-sm">{post.author.bio}</p>
              </div>
            </div>
          </div>
        </article>

        {/* Comments & Related */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-6 py-4 font-medium transition ${
                activeTab === 'comments'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Comments ({comments.length})
            </button>
            <button
              onClick={() => setActiveTab('related')}
              className={`px-6 py-4 font-medium transition ${
                activeTab === 'related'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Related Posts
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'comments' ? (
              <div>
                {/* Comment Form */}
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Leave a comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
                    placeholder="Share your thoughts..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                  >
                    Post Comment
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((c) => (
                    <div key={c.id} className="border-b pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold flex-shrink-0">
                          {c.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{c.author}</span>
                            <span className="text-gray-500 text-sm">•</span>
                            <span className="text-gray-500 text-sm">{c.date}</span>
                          </div>
                          <p className="text-gray-600 mb-2">{c.content}</p>
                          <button className="text-gray-500 text-sm hover:text-blue-600 transition">
                            👍 {c.likes} helpful
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((related) => (
                  <Link href={`/blog/${related.id}`} key={related.id} className="group">
                    <div className="h-32 overflow-hidden rounded-lg mb-2">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <span className="text-xs text-blue-600 font-medium">{related.category}</span>
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                      {related.title}
                    </h4>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Blog
          </Link>
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

export default BlogDetail;
