<?php

namespace App\Listeners;

use App\Events\BookingCompleted;
use App\Mail\BookingCompletedMail;
use App\Services\NotificationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendBookingCompletedNotification implements ShouldQueue
{
    public function __construct(
        protected NotificationService $notificationService
    ) {
    }

    public function handle(BookingCompleted $event): void
    {
        $booking = $event->booking;

        $this->notificationService->sendToUser($booking->user, 'booking_completed', [
            'title' => 'Booking Confirmed',
            'message' => 'Your booking #' . $booking->booking_number . ' has been confirmed!',
            'booking_id' => $booking->id,
            'booking_number' => $booking->booking_number,
        ]);

        Mail::to($booking->user->email)->queue(new BookingCompletedMail($booking));
    }
}
