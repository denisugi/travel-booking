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

        return [
            'user_id' => User::factory(),
            'travel_package_id' => TravelPackage::factory(),
            'booking_reference' => strtoupper(fake()->unique()->bothify('BK-????-#####')),
            'travel_date' => $travelDate,
            'num_travelers' => $numTravelers,
            'total_price' => fake()->randomFloat(2, 500, 15000),
            'status' => $status,
            'payment_status' => fake()->randomElement(['pending', 'paid', 'refunded', 'partial']),
            'payment_method' => fake()->randomElement(['credit_card', 'bank_transfer', 'paypal', 'stripe']),
            'special_requests' => fake()->optional()->paragraph(),
            'guest_details' => json_encode([
                ['name' => fake()->name(), 'email' => fake()->email(), 'phone' => fake()->phoneNumber()],
            ]),
            'booking_data' => json_encode([
                'source' => fake()->randomElement(['website', 'mobile_app', 'agent']),
                'ip_address' => fake()->ipv4(),
            ]),
            'confirmed_at' => $status === 'confirmed' ? fake()->dateTimeBetween($travelDate, '+1 month') : null,
            'cancelled_at' => $status === 'cancelled' ? now() : null,
            'notes' => fake()->optional()->sentence(),
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'payment_status' => 'pending',
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
        ]);
    }
}
