<?php

namespace App\Jobs;

use App\Models\Booking;
use App\Mail\BookingCancelledMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class ProcessBookingCancellationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Booking $booking,
        public ?string $reason = null
    ) {
    }

    public function handle(): void
    {
        Mail::to($this->booking->user->email)->send(new BookingCancelledMail($this->booking, $this->reason));
    }

    public function failed(\Throwable $exception): void
    {
        \Log::error('Failed to process booking cancellation email', [
            'booking_id' => $this->booking->id,
            'exception' => $exception->getMessage(),
        ]);
    }
}
