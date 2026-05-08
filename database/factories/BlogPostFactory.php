<?php

namespace Database\Factories;

use App\Models\BlogPost;
use App\Models\User;
use App\Models\BlogCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class BlogPostFactory extends Factory
{
    protected $model = BlogPost::class;

    public function definition(): array
    {
        $title = fake()->sentence(fake()->numberBetween(4, 8));

        return [
            'user_id' => User::factory(),
            'blog_category_id' => BlogCategory::factory(),
            'title' => $title,
            'slug' => fake()->unique()->slug(),
            'excerpt' => fake()->paragraph(),
            'content' => fake()->paragraphs(5, true),
            'featured_image' => fake()->imageUrl(1200, 800, 'nature'),
            'status' => fake()->randomElement(['draft', 'published', 'scheduled']),
            'published_at' => fake()->dateTimeBetween('-1 year', '+1 month'),
            'view_count' => fake()->numberBetween(0, 10000),
            'like_count' => fake()->numberBetween(0, 500),
            'comment_count' => fake()->numberBetween(0, 100),
            'is_featured' => fake()->boolean(20),
            'is_approved' => true,
            'seo_title' => fake()->sentence(6),
            'seo_description' => fake()->paragraph(),
            'tags' => json_encode(fake()->words(fake()->numberBetween(3, 8))),
        ];
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => now(),
            'is_approved' => true,
        ]);
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'status' => 'published',
        ]);
    }
}
