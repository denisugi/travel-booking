<?php

namespace App\Listeners;

use App\Events\BookingCancelled;
use App\Mail\BookingCancelledMail;
use App\Services\NotificationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendBookingCancelledNotification implements ShouldQueue
{
    public function __construct(
        protected NotificationService $notificationService
    ) {
    }

    public function handle(BookingCancelled $event): void
    {
        $booking = $event->booking;

        $this->notificationService->sendBookingCancellation($booking->user, [
            'id' => $booking->id,
            'booking_number' => $booking->booking_number,
            'reason' => $booking->notes,
        ]);

        Mail::to($booking->user->email)->queue(new BookingCancelledMail($booking));
    }
}
