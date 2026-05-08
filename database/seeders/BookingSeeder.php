<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\BookingTraveler;
use App\Models\TravelPackage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $customer = User::whereHas('roles', fn($q) => $q->where('name', 'customer'))->first();
        $packages = TravelPackage::all();

        if (!$customer || $packages->isEmpty()) {
            $this->command->warn('BookingSeeder: No customer or packages found, skipping.');
            return;
        }

        $bookings = [
            [
                'user_id' => $customer->id,
                'travel_package_id' => $packages[0]->id,
                'booking_number' => 'BK-' . strtoupper(Str::random(6)) . '-' . date('Ymd'),
                'status' => 'pending',
                'payment_status' => 'unpaid',
                'travel_date' => now()->addDays(30),
                'number_of_travelers' => 2,
                'subtotal' => $packages[0]->price * 2,
                'tax_amount' => $packages[0]->price * 2 * 0.11,
                'discount_amount' => 0,
                'total_amount' => $packages[0]->price * 2 * 1.11,
                'special_requests' => 'We prefer window seats',
                'created_at' => now()->subDays(2),
            ],
            [
                'user_id' => $customer->id,
                'travel_package_id' => $packages[1]->id,
                'booking_number' => 'BK-' . strtoupper(Str::random(6)) . '-' . date('Ymd'),
                'status' => 'confirmed',
                'payment_status' => 'paid',
                'travel_date' => now()->addDays(45),
                'number_of_travelers' => 2,
                'subtotal' => $packages[1]->price * 2,
                'tax_amount' => $packages[1]->price * 2 * 0.11,
                'discount_amount' => 500000,
                'total_amount' => $packages[1]->price * 2 * 1.11 - 500000,
                'special_requests' => null,
                'confirmed_at' => now()->subDays(1),
                'created_at' => now()->subDays(5),
            ],
            [
                'user_id' => $customer->id,
                'travel_package_id' => $packages[2]->id,
                'booking_number' => 'BK-' . strtoupper(Str::random(6)) . '-' . date('Ymd'),
                'status' => 'pending',
                'payment_status' => 'partial',
                'travel_date' => now()->addDays(60),
                'number_of_travelers' => 4,
                'subtotal' => $packages[2]->price * 4,
                'tax_amount' => $packages[2]->price * 4 * 0.11,
                'discount_amount' => 0,
                'total_amount' => $packages[2]->price * 4 * 1.11,
                'special_requests' => 'Need extra bed',
                'created_at' => now()->subDays(1),
            ],
            [
                'user_id' => $customer->id,
                'travel_package_id' => $packages[3]->id,
                'booking_number' => 'BK-' . strtoupper(Str::random(6)) . '-' . date('Ymd'),
                'status' => 'confirmed',
                'payment_status' => 'paid',
                'travel_date' => now()->addDays(20),
                'number_of_travelers' => 2,
                'subtotal' => $packages[3]->price * 2,
                'tax_amount' => $packages[3]->price * 2 * 0.11,
                'discount_amount' => 1000000,
                'total_amount' => $packages[3]->price * 2 * 1.11 - 1000000,
                'special_requests' => 'Anniversary trip',
                'confirmed_at' => now()->subDays(3),
                'created_at' => now()->subDays(10),
            ],
            [
                'user_id' => $customer->id,
                'travel_package_id' => $packages[4]->id,
                'booking_number' => 'BK-' . strtoupper(Str::random(6)) . '-' . date('Ymd'),
                'status' => 'cancelled',
                'payment_status' => 'refunded',
                'travel_date' => now()->addDays(90),
                'number_of_travelers' => 2,
                'subtotal' => $packages[4]->price * 2,
                'tax_amount' => $packages[4]->price * 2 * 0.11,
                'discount_amount' => 0,
                'total_amount' => $packages[4]->price * 2 * 1.11,
                'special_requests' => null,
                'cancellation_reason' => 'Plans changed',
                'cancelled_at' => now()->subDays(2),
                'created_at' => now()->subDays(15),
            ],
        ];

        foreach ($bookings as $data) {
            $booking = Booking::create($data);

            // Add travelers
            for ($i = 0; $i < $booking->number_of_travelers; $i++) {
                BookingTraveler::create([
                    'booking_id' => $booking->id,
                    'first_name' => fake()->firstName(),
                    'last_name' => fake()->lastName(),
                    'email' => $i === 0 ? $customer->email : fake()->email(),
                    'phone' => fake()->phoneNumber(),
                    'date_of_birth' => fake()->date('Y-m-d', '-20 years'),
                    'passport_number' => strtoupper(Str::random(9)),
                    'gender' => fake()->randomElement(['male', 'female']),
                    'type' => 'adult',
                    'is_primary' => $i === 0,
                ]);
            }
        }

        $this->command->info('Created ' . count($bookings) . ' sample bookings with travelers.');
    }
}
