<?php

namespace App\Actions;

use App\Models\Payment;
use App\Models\Booking;
use App\Events\PaymentApproved;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;

class ApprovePayment
{
    public function execute(Payment $payment): Payment
    {
        return DB::transaction(function () use ($payment) {
            if ($payment->payment_status !== Payment::STATUS_PENDING) {
                throw new \InvalidArgumentException('Only pending payments can be approved.');
            }

            $payment->update([
                'payment_status' => Payment::STATUS_COMPLETED,
            ]);

            $booking = $payment->booking;
            $booking->update([
                'payment_status' => Booking::PAYMENT_STATUS_PAID,
            ]);

            if ($booking->status === Booking::STATUS_PENDING) {
                $booking->update([
                    'status' => Booking::STATUS_CONFIRMED,
                ]);
            }

            Event::dispatch(new PaymentApproved($payment));

            return $payment->fresh()->load('booking');
        });
    }

    public function autoApprove(Payment $payment): Payment
    {
        $payment->update([
            'payment_status' => Payment::STATUS_COMPLETED,
        ]);

        $booking = $payment->booking;
        $booking->update([
            'payment_status' => Booking::PAYMENT_STATUS_PAID,
            'status' => Booking::STATUS_CONFIRMED,
        ]);

        Event::dispatch(new PaymentApproved($payment));

        return $payment->fresh()->load('booking');
    }
}
