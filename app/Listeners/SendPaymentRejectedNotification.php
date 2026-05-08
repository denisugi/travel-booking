<?php

namespace App\Listeners;

use App\Events\PaymentRejected;
use App\Mail\PaymentRejectedMail;
use App\Services\NotificationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendPaymentRejectedNotification implements ShouldQueue
{
    public function __construct(
        protected NotificationService $notificationService
    ) {
    }

    public function handle(PaymentRejected $event): void
    {
        $payment = $event->payment;
        $booking = $payment->booking;

        $this->notificationService->sendToUser($booking->user, 'payment_rejected', [
            'title' => 'Payment Rejected',
            'message' => 'Your payment of ' . number_format($payment->amount, 2) . ' for booking #' . $booking->booking_number . ' has been rejected.',
            'payment_id' => $payment->id,
            'booking_id' => $booking->id,
            'amount' => $payment->amount,
            'reason' => $payment->notes,
        ]);

        Mail::to($booking->user->email)->queue(new PaymentRejectedMail($payment));
    }
}
