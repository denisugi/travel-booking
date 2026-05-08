<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use App\Models\BlogCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => '10 Must-Visit Places in Bali for First-Time Travelers',
                'slug' => '10-must-visit-places-bali-first-time-travelers',
                'excerpt' => 'Bali is a dream destination for many travelers. Here are the top 10 places you must visit on your first trip to this Indonesian paradise.',
                'content' => '<p>Bali is one of the most popular tourist destinations in the world, and for good reason. With its stunning beaches, ancient temples, lush rice terraces, and vibrant culture, there is something for everyone...</p><p>Whether you are seeking adventure, relaxation, or cultural immersion, Bali has it all. Here are the top 10 places every first-time visitor should include in their itinerary...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'view_count' => 1542,
                'share_count' => 89,
                'is_featured' => true,
                'allow_comments' => true,
            ],
            [
                'title' => 'How to Travel Paris on a Budget: A Complete Guide',
                'slug' => 'travel-paris-budget-complete-guide',
                'excerpt' => 'Paris doesn\'t have to break the bank. Learn how to experience the City of Lights without spending a fortune.',
                'content' => '<p>Paris is often considered an expensive destination, but with careful planning, you can experience all the magic of this beautiful city without draining your bank account...</p><p>From free attractions to affordable dining options, this guide will show you how to make the most of your Parisian adventure while staying within budget...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
                'status' => 'published',
                'published_at' => now()->subDays(12),
                'view_count' => 2341,
                'share_count' => 156,
                'is_featured' => true,
                'allow_comments' => true,
            ],
            [
                'title' => 'The Ultimate Tokyo Food Guide: What to Eat and Where',
                'slug' => 'ultimate-tokyo-food-guide-what-to-eat',
                'excerpt' => 'From sushi to ramen, tempura to takoyaki - discover the best culinary experiences Tokyo has to offer.',
                'content' => '<p>Tokyo is a paradise for food lovers. The city boasts more Michelin stars than any other city in the world, but you do not need to spend a fortune to eat well...</p><p>In this comprehensive guide, we will take you through the must-try dishes and the best spots to find them, from high-end restaurants to humble street food stalls...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
                'status' => 'published',
                'published_at' => now()->subDays(20),
                'view_count' => 1876,
                'share_count' => 112,
                'is_featured' => false,
                'allow_comments' => true,
            ],
            [
                'title' => 'Dubai vs. Maldives: Which Luxury Destination is Right for You?',
                'slug' => 'dubai-vs-maldives-luxury-destination',
                'excerpt' => 'Comparing two of the world\'s most luxurious destinations to help you choose your next dream vacation.',
                'content' => '<p>When it comes to luxury travel, Dubai and the Maldives are often at the top of every traveler\'s wishlist. Both offer stunning accommodations, world-class service, and unforgettable experiences...</p><p>But which one is right for you? Let\'s compare these two paradises across various categories to help you make an informed decision...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
                'status' => 'published',
                'published_at' => now()->subDays(8),
                'view_count' => 987,
                'share_count' => 67,
                'is_featured' => true,
                'allow_comments' => true,
            ],
            [
                'title' => 'Essential Packing Tips for Long-Term Travel',
                'slug' => 'essential-packing-tips-long-term-travel',
                'excerpt' => 'Learn how to pack light and smart for extended trips around the world.',
                'content' => '<p>Packing for a long-term trip can be daunting, but with the right strategies, you can fit everything you need into a single carry-on bag...</p><p>We share our top tips for efficient packing, must-have travel accessories, and how to choose versatile clothing items that mix and match...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
                'status' => 'published',
                'published_at' => now()->subDays(15),
                'view_count' => 3241,
                'share_count' => 203,
                'is_featured' => false,
                'allow_comments' => true,
            ],
            [
                'title' => 'Adventure Travel: 7 Thrilling Activities for Adrenaline Junkies',
                'slug' => 'adventure-travel-thrilling-activities-adrenaline',
                'excerpt' => 'For those seeking an adrenaline rush, here are 7 thrilling adventure activities around the world.',
                'content' => '<p>If you are an adrenaline junkie looking for your next thrill, these adventure activities will get your heart racing...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1533591380348-14193929dd67',
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'view_count' => 1567,
                'share_count' => 98,
                'is_featured' => false,
                'allow_comments' => true,
            ],
            [
                'title' => 'How to Stay Safe While Traveling Alone',
                'slug' => 'stay-safe-traveling-alone',
                'excerpt' => 'Solo travel can be incredibly rewarding. Here are essential safety tips to keep in mind.',
                'content' => '<p>Solo travel is one of the most rewarding experiences you can have, offering freedom, self-discovery, and the chance to connect with new people...</p><p>However, safety should always be a priority. In this guide, we share practical tips to help you stay safe while exploring the world alone...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-150GL9015474-1c1e68c87f68',
                'status' => 'published',
                'published_at' => now()->subDays(25),
                'view_count' => 2134,
                'share_count' => 145,
                'is_featured' => false,
                'allow_comments' => true,
            ],
            [
                'title' => 'The Best Street Food Cities in the World',
                'slug' => 'best-street-food-cities-world',
                'excerpt' => 'Embark on a culinary journey through the world\'s best street food destinations.',
                'content' => '<p>One of the best ways to experience a new culture is through its street food. From bustling night markets to humble roadside stalls...</p><p>Join us as we explore the top cities for street food lovers, featuring must-try dishes and the best neighborhoods to find authentic local flavors...</p>',
                'featured_image' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'view_count' => 1789,
                'share_count' => 121,
                'is_featured' => false,
                'allow_comments' => true,
            ],
        ];

        // Get the first admin user for author
        $author = User::first() ?? User::factory()->admin()->create();

        // Get categories
        $categories = DB::table('blog_categories')->pluck('id', 'slug');

        foreach ($posts as $index => $post) {
            $categorySlug = match(true) {
                str_contains($post['slug'], 'bali') => 'destinations',
                str_contains($post['slug'], 'paris') => 'destinations',
                str_contains($post['slug'], 'tokyo') => 'food-cuisine',
                str_contains($post['slug'], 'dubai') || str_contains($post['slug'], 'maldives') => 'luxury-travel',
                str_contains($post['slug'], 'packing') || str_contains($post['slug'], 'safety') => 'travel-tips',
                str_contains($post['slug'], 'adventure') => 'adventure',
                str_contains($post['slug'], 'street') => 'food-cuisine',
                default => 'travel-guides',
            };

            BlogPost::updateOrCreate(
                ['slug' => $post['slug']],
                array_merge($post, [
                    'user_id' => $author->id,
                    'blog_category_id' => $categories[$categorySlug] ?? 1,
                ])
            );
        }
    }
}
