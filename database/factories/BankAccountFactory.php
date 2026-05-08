<?php

namespace Database\Factories;

use App\Models\BankAccount;
use Illuminate\Database\Eloquent\Factories\Factory;

class BankAccountFactory extends Factory
{
    protected $model = BankAccount::class;

    public function definition(): array
    {
        return [
            'bank_name' => fake()->company() . ' Bank',
            'account_name' => fake()->company(),
            'account_number' => '****' . fake()->numberBetween(1000, 9999),
            'account_number_full' => fake()->numerify('##########'),
            'routing_number' => '****' . fake()->numberBetween(1000, 9999),
            'routing_number_full' => fake()->numerify('##########'),
            'swift_code' => strtoupper(fake()->lexify('????US??')),
            'iban' => fake()->iban(),
            'currency' => fake()->randomElement(['USD', 'EUR', 'GBP']),
            'is_default' => false,
            'is_active' => true,
            'account_type' => fake()->randomElement(['checking', 'savings', 'business']),
        ];
    }

    public function default(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_default' => true,
        ]);
    }
}
