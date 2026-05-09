<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\TravelPackage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition(): array
    {
        $travelDate = fake()->dateTimeBetween('+1 week', '+6 months');
        $status = fake()->randomElement(['pending', 'confirmed', 'cancelled', 'completed']);
        $numTravelers = fake()->numberBetween(1, 6);
        $subtotal = fake()->randomFloat(2, 500, 15000);
        $tax = $subtotal * 0.1;
        $discount = fake()->boolean(30) ? $subtotal * 0.1 : 0;

        return [
            'user_id' => User::factory(),
            'travel_package_id' => TravelPackage::factory()->published(),
            'booking_number' => strtoupper(fake()->unique()->bothify('BK-????-#####')),
            'travel_date' => $travelDate,
            'number_of_travelers' => $numTravelers,
            'subtotal' => $subtotal,
            'tax_amount' => $tax,
            'discount_amount' => $discount,
            'total_amount' => $subtotal + $tax - $discount,
            'status' => $status,
            'payment_status' => fake()->randomElement(['unpaid', 'paid', 'refunded', 'partial']),
            'special_requests' => fake()->optional()?->paragraph(),
            'cancellation_reason' => null,
            'confirmed_at' => $status === 'confirmed' ? fake()->dateTimeBetween($travelDate, '+1 month') : null,
            'cancelled_at' => $status === 'cancelled' ? now() : null,
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'payment_status' => 'unpaid',
        ]);
    }

    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
            'payment_status' => 'paid',
            'confirmed_at' => now(),
        ]);
    }

    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
            'cancelled_at' => now(),
            'cancellation_reason' => fake()->sentence(),
        ]);
    }
}