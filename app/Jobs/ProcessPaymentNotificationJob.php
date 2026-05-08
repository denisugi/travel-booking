<?php

namespace App\Jobs;

use App\Models\Payment;
use App\Mail\PaymentNotificationMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class ProcessPaymentNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Payment $payment,
        public string $notificationType
    ) {
    }

    public function handle(): void
    {
        $booking = $this->payment->booking;

        Mail::to($booking->user->email)->send(
            new PaymentNotificationMail($this->payment, $this->notificationType)
        );
    }

    public function failed(\Throwable $exception): void
    {
        \Log::error('Failed to process payment notification email', [
            'payment_id' => $this->payment->id,
            'notification_type' => $this->notificationType,
            'exception' => $exception->getMessage(),
        ]);
    }
}
