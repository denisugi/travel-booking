<?php

namespace App\Actions;

use App\Models\Booking;
use App\Services\BookingService;
use App\Events\BookingCompleted;
use Illuminate\Support\Facades\Event;

class ConfirmBooking
{
    protected BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function execute(Booking $booking): Booking
    {
        if ($booking->status !== Booking::STATUS_PENDING) {
            throw new \InvalidArgumentException('Only pending bookings can be confirmed.');
        }

        if ($booking->payment_status !== Booking::PAYMENT_STATUS_PAID) {
            throw new \InvalidArgumentException('Only paid bookings can be confirmed.');
        }

        $booking->update([
            'status' => Booking::STATUS_CONFIRMED,
        ]);

        Event::dispatch(new BookingCompleted($booking));

        return $booking->fresh()->load(['user', 'travelPackage', 'travelers']);
    }

    public function autoConfirm(Booking $booking): Booking
    {
        $booking->update([
            'status' => Booking::STATUS_CONFIRMED,
        ]);

        Event::dispatch(new BookingCompleted($booking));

        return $booking->fresh();
    }
}
