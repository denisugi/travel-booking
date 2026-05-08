<?php

namespace App\Jobs;

use App\Models\Booking;
use App\Mail\BookingReminderMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendTravelReminderJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Booking $booking
    ) {
    }

    public function handle(): void
    {
        Mail::to($this->booking->user->email)->send(new BookingReminderMail($this->booking));
    }

    public function failed(\Throwable $exception): void
    {
        \Log::error('Failed to send travel reminder email', [
            'booking_id' => $this->booking->id,
            'exception' => $exception->getMessage(),
        ]);
    }
}
