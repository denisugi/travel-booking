<?php

namespace App\Actions;

use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use App\Events\BookingCreated;

class CreateBooking
{
    protected BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function execute(array $data): Booking
    {
        return DB::transaction(function () use ($data) {
            $travelPackage = \App\Models\TravelPackage::findOrFail($data['travel_package_id']);

            $subtotal = $travelPackage->price * $data['number_of_travelers'];
            $taxAmount = $subtotal * 0.1;
            $totalAmount = $subtotal + $taxAmount - ($data['discount_amount'] ?? 0);

            $booking = Booking::create([
                'user_id' => $data['user_id'],
                'travel_package_id' => $data['travel_package_id'],
                'booking_number' => Booking::generateBookingNumber(),
                'status' => Booking::STATUS_PENDING,
                'travel_date' => $data['travel_date'],
                'return_date' => $data['return_date'] ?? null,
                'number_of_travelers' => $data['number_of_travelers'],
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'discount_amount' => $data['discount_amount'] ?? 0,
                'total_amount' => $totalAmount,
                'payment_status' => 'unpaid',
                'payment_method' => $data['payment_method'] ?? null,
                'special_requests' => $data['special_requests'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);

            if (!empty($data['travelers'])) {
                foreach ($data['travelers'] as $traveler) {
                    $booking->travelers()->create($traveler);
                }
            }

            Event::dispatch(new BookingCreated($booking));

            return $booking->load(['user', 'travelPackage', 'travelers']);
        });
    }
}
