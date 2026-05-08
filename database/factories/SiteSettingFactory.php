<?php

namespace Database\Factories;

use App\Models\SiteSetting;
use Illuminate\Database\Eloquent\Factories\Factory;

class SiteSettingFactory extends Factory
{
    protected $model = SiteSetting::class;

    public function definition(): array
    {
        return [
            'key' => fake()->unique()->word() . '_' . fake()->randomNumber(4),
            'value' => fake()->sentence(),
            'group' => fake()->randomElement(['general', 'contact', 'seo', 'email', 'social']),
            'type' => fake()->randomElement(['text', 'textarea', 'boolean', 'number']),
        ];
    }
}
