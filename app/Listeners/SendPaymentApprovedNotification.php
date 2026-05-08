<?php

namespace App\Listeners;

use App\Events\PaymentApproved;
use App\Mail\PaymentApprovedMail;
use App\Services\NotificationService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendPaymentApprovedNotification implements ShouldQueue
{
    public function __construct(
        protected NotificationService $notificationService
    ) {
    }

    public function handle(PaymentApproved $event): void
    {
        $payment = $event->payment;
        $booking = $payment->booking;

        $this->notificationService->sendPaymentConfirmation($booking->user, [
            'id' => $payment->id,
            'booking_id' => $booking->id,
            'amount' => $payment->amount,
            'booking_number' => $booking->booking_number,
        ]);

        Mail::to($booking->user->email)->queue(new PaymentApprovedMail($payment));
    }
}
