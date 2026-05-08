<?php

namespace Database\Seeders;

use App\Models\TravelPackage;
use Illuminate\Database\Seeder;

class TravelPackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Bali Paradise Adventure',
                'slug' => 'bali-paradise-adventure',
                'description' => 'Experience the magical island of Bali with this comprehensive tour package. Visit ancient temples, rice terraces, and pristine beaches.',
                'short_description' => 'Magical Bali adventure with temples, beaches, and culture',
                'destination' => 'Bali, Indonesia',
                'duration_days' => 7,
                'duration_nights' => 6,
                'price' => 1299.99,
                'discount_price' => 1099.99,
                'is_featured' => true,
                'status' => 'published',
                'featured_image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
                'itinerary' => json_encode([
                    ['day' => 1, 'title' => 'Arrival in Bali', 'description' => 'Meet and greet at Ngurah Rai Airport, transfer to hotel'],
                    ['day' => 2, 'title' => 'Temple Tour', 'description' => 'Visit Tanah Lot, Uluwatu Temple, and local markets'],
                    ['day' => 3, 'title' => 'Rice Terraces', 'description' => 'Explore Tegallalang Rice Terraces and local villages'],
                    ['day' => 4, 'title' => 'Beach Day', 'description' => 'Relax at Seminyak and Nusa Dua beaches'],
                    ['day' => 5, 'title' => 'Mount Batur', 'description' => 'Sunrise trek at Mount Batur volcano'],
                    ['day' => 6, 'title' => 'Cultural Experience', 'description' => 'Traditional Balinese dance and cooking class'],
                    ['day' => 7, 'title' => 'Departure', 'description' => 'Free time until airport transfer'],
                ]),
                'highlights' => json_encode([
                    'Visit iconic temples including Tanah Lot and Uluwatu',
                    'Tegallalang Rice Terraces exploration',
                    'Mount Batur sunrise trek',
                    'Traditional Balinese dance performance',
                    'All-inclusive accommodation',
                ]),
                'includes' => json_encode(['6 nights accommodation', 'Daily breakfast', 'Airport transfers', 'All entrance fees', 'English-speaking guide', 'Air-conditioned transport']),
                'excludes' => json_encode(['International flights', 'Travel insurance', 'Personal expenses', 'Tips and gratuities']),
                'gallery_images' => json_encode([
                    'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
                    'https://images.unsplash.com/photo-1555400038-63f5ba517a47',
                    'https://images.unsplash.com/photo-1573790387438-4da905039392',
                ]),
                'max_participants' => 20,
            ],
            [
                'name' => 'Paris Romantic Getaway',
                'slug' => 'paris-romantic-getaway',
                'description' => 'Fall in love with the City of Lights. This romantic package includes visits to the Eiffel Tower, Louvre, and charming Parisian cafes.',
                'short_description' => 'Romantic Paris experience with iconic landmarks',
                'destination' => 'Paris, France',
                'duration_days' => 5,
                'duration_nights' => 4,
                'price' => 1899.99,
                'discount_price' => null,
                'is_featured' => true,
                'status' => 'published',
                'featured_image' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
                'itinerary' => json_encode([
                    ['day' => 1, 'title' => 'Arrival in Paris', 'description' => 'Private transfer to hotel in city center'],
                    ['day' => 2, 'title' => 'City Tour', 'description' => 'Eiffel Tower, Champs-Elysees, and Arc de Triomphe'],
                    ['day' => 3, 'title' => 'Louvre Museum', 'description' => 'Guided tour of the world-famous museum'],
                    ['day' => 4, 'title' => 'Montmartre & Seine', 'description' => 'Explore artistic Montmartre and sunset cruise on the Seine'],
                    ['day' => 5, 'title' => 'Versailles Day Trip', 'description' => 'Full-day excursion to Palace of Versailles'],
                ]),
                'highlights' => json_encode([
                    'Eiffel Tower with summit access',
                    'Guided Louvre Museum tour',
                    'Seine River sunset cruise',
                    'Palace of Versailles day trip',
                    'Romantic dinner at a Parisian bistro',
                ]),
                'includes' => json_encode(['4 nights in 4-star hotel', 'Daily breakfast', 'Skip-the-line access', 'Seine cruise tickets', 'All transfers', 'Expert guide']),
                'excludes' => json_encode(['International flights', 'Lunch and dinner', 'Travel insurance']),
                'gallery_images' => json_encode([
                    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
                    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
                ]),
                'max_participants' => 15,
            ],
            [
                'name' => 'Tokyo Cultural Immersion',
                'slug' => 'tokyo-cultural-immersion',
                'description' => 'Discover the perfect blend of ancient traditions and cutting-edge technology in Japan\'s vibrant capital.',
                'short_description' => 'Experience ancient and modern Tokyo',
                'destination' => 'Tokyo, Japan',
                'duration_days' => 8,
                'duration_nights' => 7,
                'price' => 2499.99,
                'discount_price' => 2199.99,
                'is_featured' => false,
                'status' => 'published',
                'featured_image' => 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
                'itinerary' => json_encode([
                    ['day' => 1, 'title' => 'Arrival in Tokyo', 'description' => 'Airport pickup and hotel check-in'],
                    ['day' => 2, 'title' => 'Modern Tokyo', 'description' => 'Shibuya, Harajuku, and Tokyo Tower'],
                    ['day' => 3, 'title' => 'Traditional Tokyo', 'description' => 'Senso-ji Temple, Ueno Park, and Tokyo National Museum'],
                    ['day' => 4, 'title' => 'Day Trip to Nikko', 'description' => 'UNESCO World Heritage temples and shrines'],
                    ['day' => 5, 'title' => 'Mount Fuji', 'description' => 'Scenic views and hot spring experience'],
                    ['day' => 6, 'title' => 'Anime & Gaming', 'description' => 'Akihabara electric town and anime districts'],
                    ['day' => 7, 'title' => 'Japanese Culture', 'description' => 'Tea ceremony and sushi-making class'],
                    ['day' => 8, 'title' => 'Departure', 'description' => 'Free time for shopping before airport transfer'],
                ]),
                'highlights' => json_encode([
                    'Senso-ji Temple in Asakusa',
                    'Mount Fuji day trip with hot springs',
                    'Anime district of Akihabara',
                    'Traditional tea ceremony',
                    'Sushi-making masterclass',
                ]),
                'includes' => json_encode(['7 nights accommodation', 'Daily breakfast', 'JR Pass (7 days)', 'Cultural activities', 'Airport transfers', 'English guide']),
                'excludes' => json_encode(['International flights', 'Lunch and dinner', 'Travel insurance', 'Optional activities']),
                'gallery_images' => json_encode([
                    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
                    'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
                ]),
                'max_participants' => 12,
            ],
            [
                'name' => 'Dubai Luxury Escape',
                'slug' => 'dubai-luxury-escape',
                'description' => 'Experience opulence in the Arabian desert. World-class shopping, stunning architecture, and desert adventures await.',
                'short_description' => 'Ultimate Dubai luxury experience',
                'destination' => 'Dubai, UAE',
                'duration_days' => 5,
                'duration_nights' => 4,
                'price' => 2999.99,
                'discount_price' => null,
                'is_featured' => true,
                'status' => 'published',
                'featured_image' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
                'itinerary' => json_encode([
                    ['day' => 1, 'title' => 'Arrival in Dubai', 'description' => 'Luxury airport transfer to 5-star hotel'],
                    ['day' => 2, 'title' => 'City Highlights', 'description' => 'Burj Khalifa, Dubai Mall, and Dubai Fountain'],
                    ['day' => 3, 'title' => 'Desert Safari', 'description' => 'Dune bashing, camel ride, and Bedouin camp'],
                    ['day' => 4, 'title' => 'Palm Jumeirah', 'description' => 'Atlantis, waterpark, and beach clubs'],
                    ['day' => 5, 'title' => 'Departure', 'description' => 'Free time for last-minute shopping'],
                ]),
                'highlights' => json_encode([
                    'Burj Khalifa observation deck',
                    'Desert safari adventure',
                    'Luxury 5-star accommodation',
                    'Camel riding experience',
                    'Private beach access',
                ]),
                'includes' => json_encode(['4 nights 5-star hotel', 'Daily breakfast', 'Desert safari', 'Burj Khalifa tickets', 'Airport transfers', 'Butler service']),
                'excludes' => json_encode(['International flights', 'Travel insurance', 'Personal expenses']),
                'gallery_images' => json_encode([
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
                    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
                ]),
                'max_participants' => 10,
            ],
            [
                'name' => 'Maldives Beach Retreat',
                'slug' => 'maldives-beach-retreat',
                'description' => 'Escape to paradise with crystal-clear waters, pristine white beaches, and overwater bungalows in the Maldives.',
                'short_description' => 'Tropical paradise in the Maldives',
                'destination' => 'Maldives',
                'duration_days' => 6,
                'duration_nights' => 5,
                'price' => 3999.99,
                'discount_price' => 3499.99,
                'is_featured' => true,
                'status' => 'published',
                'featured_image' => 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
                'itinerary' => json_encode([
                    ['day' => 1, 'title' => 'Arrival at Male', 'description' => 'Seaplane transfer to resort'],
                    ['day' => 2, 'title' => 'Island Exploration', 'description' => 'Guided tour of the resort and facilities'],
                    ['day' => 3, 'title' => 'Snorkeling Adventure', 'description' => 'Coral reef snorkeling and marine life discovery'],
                    ['day' => 4, 'title' => 'Sunset Cruise', 'description' => 'Dolphin watching and sunset cruise'],
                    ['day' => 5, 'title' => 'Spa Day', 'description' => 'Full-day spa experience'],
                    ['day' => 6, 'title' => 'Departure', 'description' => 'Final swim and beach walk before departure'],
                ]),
                'highlights' => json_encode([
                    'Overwater bungalow accommodation',
                    'World-class snorkeling',
                    'Sunset dolphin cruise',
                    'Luxury spa treatment',
                    'All-inclusive dining',
                ]),
                'includes' => json_encode(['5 nights overwater villa', 'All meals included', 'Snorkeling equipment', 'Spa treatment', 'Sunset cruise', 'Seaplane transfers']),
                'excludes' => json_encode(['International flights', 'Travel insurance', 'Premium drinks']),
                'gallery_images' => json_encode([
                    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
                    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
                ]),
                'max_participants' => 8,
            ],
        ];

        foreach ($packages as $package) {
            TravelPackage::updateOrCreate(
                ['slug' => $package['slug']],
                $package
            );
        }
    }
}
