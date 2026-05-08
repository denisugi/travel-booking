<?php

namespace App\Listeners;

use App\Events\PaymentSubmitted;
use App\Mail\PaymentSubmittedMail;
use App\Services\NotificationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendPaymentSubmittedNotification implements ShouldQueue
{
    public function __construct(
        protected NotificationService $notificationService
    ) {
    }

    public function handle(PaymentSubmitted $event): void
    {
        $payment = $event->payment;
        $booking = $payment->booking;

        $this->notificationService->sendToUser($booking->user, 'payment_submitted', [
            'title' => 'Payment Submitted',
            'message' => 'Your payment of ' . number_format($payment->amount, 2) . ' has been submitted for booking #' . $booking->booking_number,
            'payment_id' => $payment->id,
            'booking_id' => $booking->id,
            'amount' => $payment->amount,
        ]);

        Mail::to($booking->user->email)->queue(new PaymentSubmittedMail($payment));
    }
}
