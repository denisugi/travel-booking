import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';

interface TravelPackage {
  id: number;
  name: string;
  slug: string;
  destination: string;
  duration: string;
  duration_days: number;
  duration_nights: number;
  price: number;
  discount_price: number | null;
  is_on_sale: boolean;
  savings_amount: number;
  featured_image: string;
  is_featured: boolean;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  category: string;
  view_count: number;
}

const Home: React.FC = () => {
  const { featuredPackages, blogPosts } = usePage().props as any;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AppLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Exclusive travel packages to breathtaking destinations worldwide
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/packages"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Explore Packages
            </Link>
            <Link
              href="/about"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition-colors border border-white/40"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative -mt-16 z-20 px-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option>All Destinations</option>
                <option>Bali, Indonesia</option>
                <option>Paris, France</option>
                <option>Tokyo, Japan</option>
                <option>Dubai, UAE</option>
                <option>Maldives</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option>Any Duration</option>
                <option>3-5 Days</option>
                <option>6-8 Days</option>
                <option>9+ Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option>Any Price</option>
                <option>Under $1,000</option>
                <option>$1,000 - $2,000</option>
                <option>$2,000 - $3,000</option>
                <option>$3,000+</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Search Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked travel experiences curated for unforgettable journeys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPackages.map((pkg: any) => (
            <Link
              key={pkg.id}
              href={`/packages/${pkg.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.featured_image || 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800'}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {pkg.is_on_sale && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {Math.round((pkg.savings_amount / pkg.price) * 100)}% OFF
                  </div>
                )}
                {pkg.is_featured && !pkg.is_on_sale && (
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {pkg.destination}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {pkg.name}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {pkg.duration}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {pkg.is_on_sale ? (
                      <div>
                        <span className="text-gray-400 line-through text-sm">
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-emerald-600 font-bold text-lg ml-2">
                          {formatPrice(pkg.discount_price!)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-900 font-bold text-lg">
                        {formatPrice(pkg.price)}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm"> / person</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/packages"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            View All Packages
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              We're committed to delivering exceptional travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Booking</h3>
              <p className="text-gray-600 text-sm">Your payment and personal data are always protected</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600 text-sm">Find a lower price? We'll match it</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Our travel experts are always here to help</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Curated Experiences</h3>
              <p className="text-gray-600 text-sm">Every trip is thoughtfully designed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="opacity-80">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="opacity-80">Destinations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="opacity-80">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
              <div className="opacity-80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Travel Blog
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Insights and inspiration for your next adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.featured_image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {post.category?.name && (
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category.name}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.published_at}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Read All Articles
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section 
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600)' }}
      >
        <div className="absolute inset-0 bg-emerald-900/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you plan the perfect trip. Contact our travel experts today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/packages/create"
              className="bg-white text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
            >
              Book Now
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
</AppLayout>
  );
};

export default Home;
