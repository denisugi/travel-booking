<?php

namespace App\Listeners;

use App\Events\BookingCreated;
use App\Mail\BookingConfirmationMail;
use App\Services\NotificationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendBookingCreatedNotification implements ShouldQueue
{
    public function __construct(
        protected NotificationService $notificationService
    ) {
    }

    public function handle(BookingCreated $event): void
    {
        $booking = $event->booking;

        $this->notificationService->sendBookingConfirmation($booking->user, [
            'id' => $booking->id,
            'booking_number' => $booking->booking_number,
            'travel_date' => $booking->travel_date,
            'return_date' => $booking->return_date,
            'total_amount' => $booking->total_amount,
            'package_name' => $booking->travelPackage?->name,
        ]);

        Mail::to($booking->user->email)->queue(new BookingConfirmationMail($booking));
    }
}
