<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Booking;
use App\Events\PaymentSubmitted;
use App\Events\PaymentApproved;
use App\Events\PaymentRejected;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;

class PaymentService
{
    public function getAllPayments(array $filters = [], int $perPage = 15): LengthAwarePaginator
    {
        $query = Payment::with(['booking']);

        if (!empty($filters['payment_status'])) {
            $query->where('payment_status', $filters['payment_status']);
        }

        if (!empty($filters['payment_method'])) {
            $query->where('payment_method', $filters['payment_method']);
        }

        if (!empty($filters['booking_id'])) {
            $query->where('booking_id', $filters['booking_id']);
        }

        if (!empty($filters['date_from'])) {
            $query->where('payment_date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $query->where('payment_date', '<=', $filters['date_to']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function getPaymentById(int $id): ?Payment
    {
        return Payment::with(['booking'])->find($id);
    }

    public function getPaymentsByBooking(Booking $booking): \Illuminate\Database\Eloquent\Collection
    {
        return $booking->payments()->orderBy('created_at', 'desc')->get();
    }

    public function submitPayment(array $data): Payment
    {
        return DB::transaction(function () use ($data) {
            $payment = Payment::create([
                'booking_id' => $data['booking_id'],
                'amount' => $data['amount'],
                'payment_method' => $data['payment_method'],
                'payment_status' => Payment::STATUS_PENDING,
                'transaction_id' => $data['transaction_id'] ?? null,
                'payment_date' => now(),
                'payment_proof' => $data['payment_proof'] ?? null,
                'notes' => $data['notes'] ?? null,
                'metadata' => $data['metadata'] ?? null,
            ]);

            Event::dispatch(new PaymentSubmitted($payment));

            return $payment->load('booking');
        });
    }

    public function approvePayment(Payment $payment): Payment
    {
        return DB::transaction(function () use ($payment) {
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
        });
    }

    public function rejectPayment(Payment $payment, string $reason = null): Payment
    {
        $payment->update([
            'payment_status' => Payment::STATUS_FAILED,
            'notes' => ($payment->notes ?? '') . "\nRejection reason: " . ($reason ?? 'No reason provided'),
        ]);

        Event::dispatch(new PaymentRejected($payment));

        return $payment->fresh();
    }

    public function refundPayment(Payment $payment): Payment
    {
        $payment->update([
            'payment_status' => Payment::STATUS_REFUNDED,
        ]);

        $booking = $payment->booking;
        $booking->update([
            'payment_status' => Booking::PAYMENT_STATUS_REFUNDED,
        ]);

        return $payment->fresh()->load('booking');
    }

    public function uploadPaymentProof(Payment $payment, $file): Payment
    {
        if ($payment->payment_proof) {
            Storage::delete($payment->payment_proof);
        }

        $path = $file->store('payment-proofs', 'public');

        $payment->update([
            'payment_proof' => $path,
        ]);

        return $payment->fresh();
    }

    public function verifyPayment(Payment $payment): bool
    {
        return $payment->payment_status === Payment::STATUS_COMPLETED;
    }

    public function getPendingPayments(): \Illuminate\Database\Eloquent\Collection
    {
        return Payment::with(['booking'])
            ->where('payment_status', Payment::STATUS_PENDING)
            ->orderBy('payment_date', 'asc')
            ->get();
    }
}
