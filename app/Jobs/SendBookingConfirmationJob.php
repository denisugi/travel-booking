<?php

namespace App\Jobs;

use App\Models\Booking;
use App\Mail\BookingConfirmationMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendBookingConfirmationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Booking $booking
    ) {
    }

    public function handle(): void
    {
        Mail::to($this->booking->user->email)->send(new BookingConfirmationMail($this->booking));
    }

    public function failed(\Throwable $exception): void
    {
        \Log::error('Failed to send booking confirmation email', [
            'booking_id' => $this->booking->id,
            'exception' => $exception->getMessage(),
        ]);
    }
}
