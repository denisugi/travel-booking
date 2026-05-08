<?php

namespace App\Actions;

use App\Models\Payment;
use App\Events\PaymentRejected;
use Illuminate\Support\Facades\Event;

class RejectPayment
{
    public function execute(Payment $payment, ?string $reason = null): Payment
    {
        if ($payment->payment_status !== Payment::STATUS_PENDING) {
            throw new \InvalidArgumentException('Only pending payments can be rejected.');
        }

        $notes = $payment->notes ?? '';
        $notes .= "\nRejection reason: " . ($reason ?? 'No reason provided');

        $payment->update([
            'payment_status' => Payment::STATUS_FAILED,
            'notes' => $notes,
        ]);

        Event::dispatch(new PaymentRejected($payment));

        return $payment->fresh()->load('booking');
    }
}
