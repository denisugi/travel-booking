<?php

namespace App\Actions;

use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use App\Events\PaymentSubmitted;

class UploadPayment
{
    public function execute(array $data): Payment
    {
        return DB::transaction(function () use ($data) {
            $booking = Booking::findOrFail($data['booking_id']);

            $paymentProofPath = null;
            if (isset($data['payment_proof']) && $data['payment_proof'] instanceof UploadedFile) {
                $paymentProofPath = $data['payment_proof']->store('payment-proofs', 'public');
            }

            $payment = Payment::create([
                'booking_id' => $booking->id,
                'amount' => $data['amount'],
                'payment_method' => $data['payment_method'],
                'payment_status' => Payment::STATUS_PENDING,
                'transaction_id' => $data['transaction_id'] ?? null,
                'payment_date' => now(),
                'payment_proof' => $paymentProofPath,
                'notes' => $data['notes'] ?? null,
                'metadata' => $data['metadata'] ?? null,
            ]);

            Event::dispatch(new PaymentSubmitted($payment));

            return $payment->load('booking');
        });
    }

    public function uploadProof(Payment $payment, UploadedFile $file): Payment
    {
        if ($payment->payment_proof) {
            Storage::disk('public')->delete($payment->payment_proof);
        }

        $path = $file->store('payment-proofs', 'public');

        $payment->update(['payment_proof' => $path]);

        return $payment->fresh();
    }
}
