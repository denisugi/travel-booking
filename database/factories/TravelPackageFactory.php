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
            'name' => "{$destination} {$fake->randomElement(['Adventure', 'Luxury', 'Cultural', 'Beach', 'Safari'])} Package",
            'slug' => fake()->unique()->slug(),
            'description' => fake()->paragraphs(3, true),
            'short_description' => fake()->sentence(),
            'destination' => $destination,
            'duration_days' => fake()->numberBetween(3, 21),
            'duration_nights' => fake()->numberBetween(2, 20),
            'price' => fake()->randomFloat(2, 199, 9999),
            'discount_price' => fake()->optional(0.3)->randomFloat(2, 149, 8999),
            'featured' => fake()->boolean(30),
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
            'inclusions' => json_encode([
                'Accommodation',
                'Meals as specified',
                'Airport transfers',
                'Guided tours',
            ]),
            'exclusions' => json_encode([
                'International flights',
                'Travel insurance',
                'Personal expenses',
            ]),
            'images' => json_encode([
                fake()->imageUrl(800, 600, 'travel'),
                fake()->imageUrl(800, 600, 'travel'),
            ]),
            'max_participants' => fake()->numberBetween(5, 50),
            'departure_dates' => json_encode([
                fake()->dateTimeBetween('+1 month', '+6 months'),
                fake()->dateTimeBetween('+2 months', '+7 months'),
            ]),
            'meta_title' => fake()->sentence(6),
            'meta_description' => fake()->paragraph(),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
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
