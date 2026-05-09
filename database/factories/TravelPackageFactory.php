<?php

namespace Database\Factories;

use App\Models\TravelPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

class TravelPackageFactory extends Factory
{
    protected $model = TravelPackage::class;

    public function definition(): array
    {
        $destinations = ['Bali', 'Paris', 'Tokyo', 'New York', 'Dubai', 'Maldives', 'Rome', 'Barcelona'];
        $destination = fake()->randomElement($destinations);

        return [
            'name' => "{$destination} " . fake()->randomElement(['Adventure', 'Luxury', 'Cultural', 'Beach', 'Safari']) . " Package",
            'slug' => fake()->unique()->slug(),
            'description' => fake()->paragraphs(3, true),
            'short_description' => fake()->sentence(),
            'destination' => $destination,
            'duration_days' => fake()->numberBetween(3, 21),
            'duration_nights' => fake()->numberBetween(2, 20),
            'price' => fake()->randomFloat(2, 199, 9999),
            'discount_price' => fake()->optional(0.3)->randomFloat(2, 149, 8999),
            'is_featured' => fake()->boolean(30),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'itinerary' => json_encode([
                ['day' => 1, 'title' => 'Arrival', 'description' => fake()->sentence()],
                ['day' => 2, 'title' => 'Exploration', 'description' => fake()->sentence()],
                ['day' => 3, 'title' => 'Adventure', 'description' => fake()->sentence()],
            ]),
            'highlights' => json_encode([
                fake()->sentence(),
                fake()->sentence(),
                fake()->sentence(),
            ]),
            'featured_image' => fake()->imageUrl(800, 600, 'travel'),
            'gallery_images' => json_encode([
                fake()->imageUrl(800, 600, 'travel'),
                fake()->imageUrl(800, 600, 'travel'),
            ]),
            'max_participants' => fake()->numberBetween(5, 50),
            'min_participants' => 1,
            'difficulty' => fake()->randomElement(['easy', 'moderate', 'challenging']),
            'published_at' => fake()->optional()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'status' => 'published',
        ]);
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
        ]);
    }
}