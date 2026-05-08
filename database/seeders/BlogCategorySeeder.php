<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Travel Guides',
                'slug' => 'travel-guides',
                'description' => 'Comprehensive guides to help you plan your perfect trip',
                'color' => '#3498db',
                'icon' => 'map',
                'parent_id' => null,
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Destinations',
                'slug' => 'destinations',
                'description' => 'Explore amazing destinations around the world',
                'color' => '#e74c3c',
                'icon' => 'globe',
                'parent_id' => null,
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Travel Tips',
                'slug' => 'travel-tips',
                'description' => 'Expert advice and tips for stress-free travel',
                'color' => '#2ecc71',
                'icon' => 'lightbulb',
                'parent_id' => null,
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Adventure',
                'slug' => 'adventure',
                'description' => 'Thrilling adventures and outdoor activities',
                'color' => '#f39c12',
                'icon' => 'mountain',
                'parent_id' => null,
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Luxury Travel',
                'slug' => 'luxury-travel',
                'description' => 'Indulgent travel experiences and five-star destinations',
                'color' => '#9b59b6',
                'icon' => 'star',
                'parent_id' => null,
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Budget Travel',
                'slug' => 'budget-travel',
                'description' => 'Smart tips for traveling on a budget',
                'color' => '#1abc9c',
                'icon' => 'wallet',
                'parent_id' => null,
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Food & Cuisine',
                'slug' => 'food-cuisine',
                'description' => 'Culinary adventures and local food experiences',
                'color' => '#e67e22',
                'icon' => 'utensils',
                'parent_id' => null,
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Travel News',
                'slug' => 'travel-news',
                'description' => 'Latest updates from the travel industry',
                'color' => '#34495e',
                'icon' => 'newspaper',
                'parent_id' => null,
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            DB::table('blog_categories')->updateOrInsert(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
