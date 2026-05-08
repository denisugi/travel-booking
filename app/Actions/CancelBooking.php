<?php

namespace App\Actions;

use App\Models\Booking;
use App\Events\BookingCancelled;
use Illuminate\Support\Facades\Event;

class CancelBooking
{
    public function execute(Booking $booking, ?string $reason = null): Booking
    {
        if ($booking->status === Booking::STATUS_CANCELLED) {
            throw new \InvalidArgumentException('Booking is already cancelled.');
        }

        if ($booking->status === Booking::STATUS_COMPLETED) {
            throw new \InvalidArgumentException('Completed bookings cannot be cancelled.');
        }

        $notes = $booking->notes ?? '';
        $notes .= "\nCancellation reason: " . ($reason ?? 'No reason provided');

        $booking->update([
            'status' => Booking::STATUS_CANCELLED,
            'notes' => $notes,
        ]);

        Event::dispatch(new BookingCancelled($booking));

        return $booking->fresh()->load(['user', 'travelPackage', 'travelers']);
    }

    public function cancelWithRefund(Booking $booking, ?string $reason = null): Booking
    {
        $this->execute($booking, $reason);

        if ($booking->payment_status === Booking::PAYMENT_STATUS_PAID) {
            $booking->update([
                'payment_status' => Booking::PAYMENT_STATUS_REFUNDED,
            ]);

            $latestPayment = $booking->payments()->where('payment_status', 'completed')->latest()->first();
            if ($latestPayment) {
                $latestPayment->update([
                    'payment_status' => 'refunded',
                ]);
            }
        }

        return $booking->fresh();
    }
}
