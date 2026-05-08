<?php

namespace App\Jobs;

use App\Models\Booking;
use App\Services\BookingService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class CheckPendingBookingsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        protected int $expirationHours = 24
    ) {
    }

    public function handle(BookingService $bookingService): void
    {
        $expirationDate = now()->subHours($this->expirationHours);

        $pendingBookings = Booking::where('status', Booking::STATUS_PENDING)
            ->where('payment_status', Booking::PAYMENT_STATUS_PENDING)
            ->where('created_at', '<', $expirationDate)
            ->get();

        foreach ($pendingBookings as $booking) {
            try {
                $bookingService->cancelBooking($booking, 'Booking expired due to payment timeout');

                Log::info('Expired booking cancelled', [
                    'booking_id' => $booking->id,
                    'booking_number' => $booking->booking_number,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to cancel expired booking', [
                    'booking_id' => $booking->id,
                    'exception' => $e->getMessage(),
                ]);
            }
        }

        Log::info('Pending bookings check completed', [
            'cancelled_count' => $pendingBookings->count(),
        ]);
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('Failed to check pending bookings', [
            'exception' => $exception->getMessage(),
        ]);
    }
}
