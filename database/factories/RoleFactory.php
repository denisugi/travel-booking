<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition(): array
    {
        return [
            'name' => fake()->unique()->word() . '_' . fake()->randomNumber(4),
            'display_name' => fake()->unique()->jobTitle(),
            'description' => fake()->sentence(),
            'is_active' => true,
        ];
    }
}
