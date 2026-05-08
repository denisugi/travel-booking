<?php

namespace Database\Factories;

use App\Models\BlogCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class BlogCategoryFactory extends Factory
{
    protected $model = BlogCategory::class;

    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Travel Guides',
            'Destinations',
            'Travel Tips',
            'Adventure',
            'Luxury Travel',
            'Budget Travel',
            'Food & Cuisine',
            'Travel News',
            'Beach Vacations',
            'Mountain Trips',
        ]);

        return [
            'name' => $name,
            'slug' => fake()->unique()->slug(),
            'description' => fake()->sentence(),
            'color' => fake()->hexColor(),
            'icon' => fake()->randomElement(['map', 'globe', 'star', 'camera', 'heart']),
            'parent_id' => null,
            'sort_order' => fake()->numberBetween(1, 100),
            'is_active' => true,
        ];
    }
}
